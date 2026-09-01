const PAPER_TYPES = new Set([
  "paper1_completed",
  "paper2_completed",
  "child_paper1_completed",
  "child_paper2_completed",
]);

const FAMILY_TYPES = new Set(["family_link_request", "family_link_update"]);

function metadataFor(notification) {
  return notification?.metadata && typeof notification.metadata === "object"
    ? notification.metadata
    : {};
}

export function getNotificationRoute(notification, role) {
  if (!notification) return { view: null, dashboardTarget: null };

  const type = String(notification.type || "");
  const metadata = metadataFor(notification);
  const isParent = role === "parent" || type.startsWith("child_");

  if (type === "tutor_application_update") {
    return { view: "become-tutor", dashboardTarget: null };
  }

  if (PAPER_TYPES.has(type)) {
    if (isParent) {
      return {
        view: "dashboard",
        dashboardTarget: {
          scope: "parent",
          section: "progress",
          studentId: metadata.student_id || notification.student_id || null,
          attemptKey: metadata.attempt_key || null,
          anchor: "parent-exam-results",
        },
      };
    }

    return {
      view: "dashboard",
      dashboardTarget: {
        scope: "student",
        section: "progress",
        anchor: "student-progress",
      },
    };
  }

  if (type === "family_link_request") {
    return {
      view: "dashboard",
      dashboardTarget: {
        scope: "student",
        section: "overview",
        linkId: metadata.link_id || null,
        anchor: "family-request",
      },
    };
  }

  if (type === "family_link_update") {
    return {
      view: "dashboard",
      dashboardTarget: {
        scope: "parent",
        studentId: metadata.student_id || null,
        linkId: metadata.link_id || null,
        anchor: "parent-family",
      },
    };
  }

  if (notification.booking_id) {
    if (isParent || notification.action_label === "View progress") {
      return {
        view: "dashboard",
        dashboardTarget: {
          scope: "parent",
          studentId: metadata.student_id || notification.student_id || null,
          bookingId: notification.booking_id,
          anchor: "parent-booking",
        },
      };
    }

    const tutorBooking = role === "tutor" || Boolean(notification.tutor_id);
    return {
      view: "dashboard",
      dashboardTarget: {
        scope: tutorBooking ? "tutor" : "student",
        section: tutorBooking ? "sessions" : "bookings",
        bookingId: notification.booking_id,
        anchor: "booking",
      },
    };
  }

  if (FAMILY_TYPES.has(type)) {
    return { view: "dashboard", dashboardTarget: null };
  }

  return {
    view: notification.action_view || null,
    dashboardTarget: null,
  };
}
