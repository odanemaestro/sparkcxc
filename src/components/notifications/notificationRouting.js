const PAPER_TYPES = new Set([
  "paper1_completed",
  "paper2_completed",
  "child_paper1_completed",
  "child_paper2_completed",
]);

const FAMILY_TYPES = new Set(["family_link_request", "family_link_update"]);

const PARENT_LEARNING_TYPES = new Set([
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

function metadataFor(notification) {
  return notification?.metadata && typeof notification.metadata === "object"
    ? notification.metadata
    : {};
}

export function getNotificationRoute(notification, role, currentUserId = null) {
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

  if (PARENT_LEARNING_TYPES.has(type)) {
    return {
      view: "dashboard",
      dashboardTarget: {
        scope: "parent",
        section: "progress",
        studentId: metadata.student_id || notification.student_id || null,
        milestoneId: metadata.milestone_id || null,
        skill: metadata.skill || null,
        anchor: "parent-learning-activity",
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

    // Booking rows normally contain both student_id and tutor_id. Do not
    // infer the recipient from the mere presence of tutor_id, otherwise a
    // student's notification is incorrectly sent to the tutor-only
    // "sessions" section and the dashboard appears blank. Prefer an exact
    // recipient id match, then fall back to the signed-in role for older rows.
    const userId = currentUserId ? String(currentUserId) : null;
    const recipientIsTutor = Boolean(userId && notification.tutor_id && String(notification.tutor_id) === userId);
    const recipientIsStudent = Boolean(userId && notification.student_id && String(notification.student_id) === userId);
    const tutorBooking = recipientIsTutor || (!recipientIsStudent && role === "tutor");

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
