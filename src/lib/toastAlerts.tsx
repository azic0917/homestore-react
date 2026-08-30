import React from "react";
import toast from "react-hot-toast";
import { Messages } from "./config";

/**
 * Parses API errors and displays a red error toast.
 */
export const toastErrorHandling = (err: any) => {
  const error = err?.response?.data ?? err;
  const message = error?.message ?? Messages.error1;

  toast.error(message);
};

/**
 * Standard success toast alert.
 */
export const toastSuccessAlert = (msg: string, duration: number = 2000) => {
  toast.success(msg, {
    duration,
  });
};

/**
 * Small top-right success alert.
 * (react-hot-toast already renders compact top-right toasts by default if configured in <Toaster/>)
 */
export const toastTopSmallSuccessAlert = (
  msg: string,
  duration: number = 2000,
) => {
  toast.success(msg, {
    duration,
  });
};

/**
 * Handles failures with optional redirect.
 */
export const toastFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = "",
) => {
  if (show_button) {
    // If you need a manual action button before redirecting/dismissing
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>{msg}</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              if (forward_url) window.location.replace(forward_url);
            }}
            style={{
              padding: "4px 8px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      ),
      { duration: Infinity },
    );
  } else {
    toast.error(msg);
    if (forward_url) {
      setTimeout(() => {
        window.location.replace(forward_url);
      }, 1500);
    }
  }
};
