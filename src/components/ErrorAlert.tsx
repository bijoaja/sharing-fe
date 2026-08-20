import { useEffect } from 'react';
import { useErrorStore } from '../stores/errorStore';

export function ErrorAlert() {
  const error = useErrorStore((state) => state.error);
  const clearError = useErrorStore((state) => state.clearError);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-error-container dark:bg-error-container border border-error dark:border-error text-on-error dark:text-on-error px-4 py-3 rounded-lg z-50 max-w-sm shadow-sm">
      <div className="flex justify-between items-start gap-3">
        <p className="text-body-sm">{error}</p>
        <button
          onClick={clearError}
          className="text-on-error dark:text-on-error hover:opacity-80 transition-opacity flex-shrink-0"
          aria-label="Close alert"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>
    </div>
  );
}
