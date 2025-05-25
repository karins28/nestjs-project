// useNotificationHandler.js (renamed for clarity)
import { useSnackbar, type VariantType } from 'notistack';

export const useNotificationHandler = () => {

  const { enqueueSnackbar } = useSnackbar();

  const showNotification = (message:string | React.ReactNode, variant: VariantType = 'default', options = {}) => {
    enqueueSnackbar(message, { variant, ...options });
  };

  const showSuccess = (message: string, options = {}) => {
    showNotification(message, 'success', options);
  };

  const showError = (message:string, options = {}) => {
    showNotification(message, 'error', options);
  };

  const showWarning = (message:string, options = {}) => {
    showNotification(message, 'warning', options);
  };

  const showInfo = (message:string, options = {}) => {
    showNotification(message, 'info', options);
  };

  return { showSuccess, showError, showWarning, showInfo };
};