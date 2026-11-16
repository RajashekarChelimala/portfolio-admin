import Swal from "sweetalert2";

export const sweetAlert = (arg1 = {}, arg2, arg3) => {
  let title = 'Notification';
  let text = '';
  let type = 'info';
  let timer = null;
  let showConfirmButton = true;
  let showCancelButton = false;
  let confirmButtonText = 'OK';
  let cancelButtonText = 'Cancel';

  if (typeof arg1 === 'string') {
    title = arg1;
    text = arg2 || '';
    type = arg3 || 'info';
    if (type === 'success') timer = 2500;
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    title = arg1.title || (arg1.type === 'error' ? 'Error!' : 'Notification');
    text = arg1.text || '';
    type = arg1.type || 'info';
    timer = arg1.timer || null;
    showConfirmButton = arg1.showConfirmButton ?? (timer ? false : true);
    showCancelButton = arg1.showCancelButton || false;
    confirmButtonText = arg1.confirmButtonText || 'OK';
    cancelButtonText = arg1.cancelButtonText || 'Cancel';
  }

  return Swal.fire({
    icon: type,
    title,
    text,
    timer,
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    background: '#111827',
    color: '#ffffff',
    confirmButtonColor: '#6366f1'
  });
};
