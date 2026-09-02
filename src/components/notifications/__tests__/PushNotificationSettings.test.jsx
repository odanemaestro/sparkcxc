import React from "react";
import { render, screen } from "@testing-library/react";
import PushNotificationSettings from "../PushNotificationSettings";
import {
  getCurrentPushDeviceState,
  getNotificationPreferences,
} from "../../../lib/pushNotifications";

jest.mock("../../../lib/pushNotifications", () => ({
  DEFAULT_NOTIFICATION_PREFERENCES: {
    push_enabled: false,
    show_push_previews: true,
    booking_updates: true,
    exam_results: true,
    learning_progress: true,
    family_updates: true,
    tutor_updates: true,
  },
  getCurrentPushDeviceState: jest.fn(),
  getNotificationPreferences: jest.fn(),
  saveNotificationPreference: jest.fn(),
  enablePushForUser: jest.fn(),
  disablePushOnThisDevice: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  getNotificationPreferences.mockResolvedValue({
    push_enabled: false,
    show_push_previews: true,
    booking_updates: true,
    exam_results: true,
    learning_progress: true,
    family_updates: true,
    tutor_updates: true,
  });
  getCurrentPushDeviceState.mockResolvedValue({
    supported: true,
    permission: "default",
    subscribed: false,
    ios: false,
    standalone: false,
    iosInstallRequired: false,
    publicKeyConfigured: true,
  });
});

test("shows the opt-in phone notification control", async () => {
  render(<PushNotificationSettings user={{ id: "user-1" }} profile={{ role: "student" }} />);
  expect(await screen.findByText("Allow phone notifications")).toBeInTheDocument();
});

test("explains the iPhone Home Screen requirement", async () => {
  getCurrentPushDeviceState.mockResolvedValue({
    supported: true,
    permission: "default",
    subscribed: false,
    ios: true,
    standalone: false,
    iosInstallRequired: true,
    publicKeyConfigured: true,
  });
  render(<PushNotificationSettings user={{ id: "user-1" }} profile={{ role: "student" }} />);
  expect(await screen.findByText("One step first on iPhone")).toBeInTheDocument();
  expect(screen.getByText(/Add to Home Screen/)).toBeInTheDocument();
});

test("parents receive a learning progress preference", async () => {
  getNotificationPreferences.mockResolvedValue({
    push_enabled: true,
    show_push_previews: true,
    booking_updates: true,
    exam_results: true,
    learning_progress: true,
    family_updates: true,
    tutor_updates: true,
  });
  getCurrentPushDeviceState.mockResolvedValue({
    supported: true,
    permission: "granted",
    subscribed: true,
    ios: false,
    standalone: true,
    iosInstallRequired: false,
    publicKeyConfigured: true,
  });
  render(<PushNotificationSettings user={{ id: "parent-1" }} profile={{ role: "parent" }} />);
  expect(await screen.findByText("Learning progress")).toBeInTheDocument();
});
