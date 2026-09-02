import { createClient } from "@supabase/supabase-js";
import { send } from "@daaku/webpush";


type Base64Options = {
  alphabet?: "base64" | "base64url";
  omitPadding?: boolean;
};

function installBase64Compatibility(): void {
  const ctor = Uint8Array as typeof Uint8Array & {
    fromBase64?: (input: string, options?: Base64Options) => Uint8Array;
  };

  if (typeof ctor.fromBase64 !== "function") {
    ctor.fromBase64 = (input: string, options: Base64Options = {}): Uint8Array => {
      let encoded = input.trim();
      if (options.alphabet === "base64url") {
        encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
      }
      encoded += "=".repeat((4 - (encoded.length % 4)) % 4);
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }
      return bytes;
    };
  }

  const proto = Uint8Array.prototype as unknown as {
    toBase64?: (options?: Base64Options) => string;
  };

  if (typeof proto.toBase64 !== "function") {
    Object.defineProperty(Uint8Array.prototype, "toBase64", {
      configurable: true,
      writable: true,
      value: function toBase64(options: Base64Options = {}): string {
        const bytes = this as Uint8Array;
        let binary = "";
        const chunkSize = 0x8000;
        for (let offset = 0; offset < bytes.length; offset += chunkSize) {
          const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length));
          binary += String.fromCharCode(...chunk);
        }
        let encoded = btoa(binary);
        if (options.alphabet === "base64url") {
          encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_");
        }
        if (options.omitPadding) {
          encoded = encoded.replace(/=+$/g, "");
        }
        return encoded;
      },
    });
  }
}

installBase64Compatibility();

type NotificationRecord = {
  id: string;
  recipient_user_id: string | null;
  type: string | null;
  title: string | null;
  message: string | null;
};

type WebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: NotificationRecord | null;
  old_record?: NotificationRecord | null;
};

type DeliverySummary = { ok: true; sent: number; expired: number; failed: number } | { ok: true; skipped: true; reason: string };

const JSON_HEADERS = { "Content-Type": "application/json" };
const BOOKING_TYPES = new Set([
  "booking_created",
  "booking_confirmed",
  "booking_declined",
  "booking_cancelled",
  "booking_cancelled_by_tutor",
  "booking_rescheduled",
  "session_completed",
  "session_reminder",
]);
const EXAM_TYPES = new Set([
  "paper1_completed",
  "paper2_completed",
  "child_paper1_completed",
  "child_paper2_completed",
]);
const LEARNING_TYPES = new Set([
  "child_lesson_completed",
  "child_topic_quiz_completed",
  "child_adaptive_session_completed",
  "child_section_completed",
  "child_section_test_completed",
  "child_course_completed",
  "child_mastery_milestone",
  "child_weak_skill_alert",
  "child_skill_improved",
]);
const FAMILY_TYPES = new Set(["family_link_request", "family_link_update"]);
const TUTOR_TYPES = new Set(["tutor_application_update"]);

function preferenceColumn(type: string | null): string | null {
  if (!type) return null;
  if (BOOKING_TYPES.has(type)) return "booking_updates";
  if (EXAM_TYPES.has(type)) return "exam_results";
  if (LEARNING_TYPES.has(type)) return "learning_progress";
  if (FAMILY_TYPES.has(type)) return "family_updates";
  if (TUTOR_TYPES.has(type)) return "tutor_updates";
  return null;
}

function serviceKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  const raw = Deno.env.get("SUPABASE_SECRET_KEYS") || "{}";
  const parsed = JSON.parse(raw) as Record<string, string>;
  const key = parsed.default || Object.values(parsed)[0];
  if (!key) throw new Error("Supabase secret key is unavailable.");
  return key;
}

function appUrlFor(notificationId: string): string {
  const configured = Deno.env.get("SPARK_APP_URL") || "https://odanemaestro.github.io/sparkcxc/";
  const url = new URL(configured);
  url.searchParams.set("spark_notification", notificationId);
  return url.toString();
}

function permanentPushFailure(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const maybe = error as { permanent?: boolean; statusCode?: number };
  return maybe.permanent === true || maybe.statusCode === 404 || maybe.statusCode === 410;
}

function errorText(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 500);
  return String(error || "Push delivery failed").slice(0, 500);
}

async function deliverNotification(notification: NotificationRecord): Promise<DeliverySummary> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const vapidPrivateJwk = Deno.env.get("VAPID_PRIVATE_JWK");
  const vapidSubject = Deno.env.get("VAPID_SUBJECT") || Deno.env.get("SPARK_APP_URL") || "https://odanemaestro.github.io/sparkcxc/";
  if (!supabaseUrl || !vapidPrivateJwk || !notification.recipient_user_id) {
    throw new Error("Push delivery is not fully configured.");
  }

  const admin = createClient(supabaseUrl, serviceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: prefs, error: prefsError } = await admin
    .from("notification_preferences")
    .select("push_enabled,show_push_previews,booking_updates,exam_results,learning_progress,family_updates,tutor_updates")
    .eq("user_id", notification.recipient_user_id)
    .maybeSingle();
  if (prefsError) throw prefsError;
  if (!prefs?.push_enabled) return { ok: true, skipped: true, reason: "Push disabled" };

  const category = preferenceColumn(notification.type);
  if (category && (prefs as Record<string, unknown>)[category] === false) {
    return { ok: true, skipped: true, reason: `Category disabled: ${category}` };
  }

  const { data: subscriptions, error: subscriptionError } = await admin
    .from("push_subscriptions")
    .select("id,endpoint,p256dh,auth")
    .eq("user_id", notification.recipient_user_id)
    .eq("is_active", true);
  if (subscriptionError) throw subscriptionError;
  if (!subscriptions?.length) return { ok: true, skipped: true, reason: "No active devices" };

  const { count: unreadCount } = await admin
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("recipient_user_id", notification.recipient_user_id)
    .is("read_at", null);

  const showPreview = prefs.show_push_previews !== false;
  const message = JSON.stringify({
    title: showPreview ? (notification.title || "SPARK update") : "SPARK",
    body: showPreview ? (notification.message || "You have a new SPARK notification.") : "You have a new notification.",
    notificationId: notification.id,
    type: notification.type || "update",
    url: appUrlFor(notification.id),
    badgeCount: Math.max(1, Number(unreadCount || 1)),
  });

  let sent = 0;
  let expired = 0;
  let failed = 0;

  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await send({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      }, message, {
        vapid: vapidPrivateJwk,
        subscriber: vapidSubject,
        ttl: 60 * 60 * 24,
        urgency: BOOKING_TYPES.has(notification.type || "") ? "high" : "normal",
      });
      sent += 1;
      await admin.from("push_subscriptions").update({
        last_success_at: new Date().toISOString(),
        failure_count: 0,
        last_error: null,
        is_active: true,
      }).eq("id", subscription.id);
    } catch (error) {
      if (permanentPushFailure(error)) {
        expired += 1;
        await admin.from("push_subscriptions").delete().eq("id", subscription.id);
      } else {
        failed += 1;
        const { data: current } = await admin
          .from("push_subscriptions")
          .select("failure_count")
          .eq("id", subscription.id)
          .maybeSingle();
        const failures = Number(current?.failure_count || 0) + 1;
        await admin.from("push_subscriptions").update({
          last_failure_at: new Date().toISOString(),
          failure_count: failures,
          last_error: errorText(error),
          is_active: failures < 5,
        }).eq("id", subscription.id);
        console.error("Push delivery failed", subscription.id, error);
      }
    }
  }));

  return { ok: true, sent, expired, failed };
}

export default {
  async fetch(req: Request): Promise<Response> {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: JSON_HEADERS });
    }

    const configuredSecret = Deno.env.get("PUSH_WEBHOOK_SECRET");
    const suppliedSecret = req.headers.get("x-spark-push-secret");
    if (!configuredSecret || suppliedSecret !== configuredSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: JSON_HEADERS });
    }

    let payload: WebhookPayload;
    try {
      payload = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: JSON_HEADERS });
    }

    const notification = payload?.record;
    if (payload.type !== "INSERT" || payload.schema !== "public" || payload.table !== "notifications" || !notification?.id || !notification.recipient_user_id) {
      return new Response(JSON.stringify({ skipped: true, reason: "Not a notification insert" }), { status: 200, headers: JSON_HEADERS });
    }

    const delivery = deliverNotification(notification).then(result => {
      console.log("SPARK push delivery", notification.id, result);
      return result;
    }).catch(error => {
      console.error("SPARK push delivery failed", notification.id, error);
      throw error;
    });

    const edgeRuntime = (globalThis as typeof globalThis & { EdgeRuntime?: { waitUntil: (promise: Promise<unknown>) => void } }).EdgeRuntime;
    if (edgeRuntime?.waitUntil) {
      edgeRuntime.waitUntil(delivery);
      return new Response(JSON.stringify({ accepted: true }), { status: 202, headers: JSON_HEADERS });
    }

    try {
      const result = await delivery;
      return new Response(JSON.stringify(result), { status: 200, headers: JSON_HEADERS });
    } catch {
      return new Response(JSON.stringify({ error: "Push delivery failed" }), { status: 500, headers: JSON_HEADERS });
    }
  },
};
