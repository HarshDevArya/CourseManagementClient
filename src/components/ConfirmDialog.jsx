import React from "react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  processing = false,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={processing ? undefined : onCancel}
      />
      <div className="relative z-10 w-full max-w-sm rounded bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="p-4 flex justify-end gap-2">
          <button
            disabled={processing}
            onClick={onCancel}
            className="px-3 py-1.5 text-sm rounded border">
            {cancelText}
          </button>
          <button
            disabled={processing}
            onClick={onConfirm}
            className="px-3 py-1.5 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-70">
            {processing ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
