export default function Modal({
  show,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm z-50">
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-gray-700 mb-4">
          {message}
        </p>

        <div className="flex justify-end gap-2">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm || onClose}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
