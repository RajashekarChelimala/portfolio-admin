import Swal from "sweetalert2";

export const sweetAlert = ({
    type = 'warning', // 'success', 'error', 'info', 'warning', etc.
    title = 'Are you sure?',
    text = 'Do you want to proceed?',
    timer = null, // Default to null to not use a timer
    showConfirmButton = false,
    showCancelButton = false,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
  }) => {
    return Swal.fire({
      icon: type,
      title: title,
      text: text,
      timer: timer, // Only set a timer if provided
      showConfirmButton: showConfirmButton,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });
  };