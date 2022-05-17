import { toast } from 'react-toastify';

export function logDevError(error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
}

export function successMessage(message) {
  return toast.success(message);
}

export function errorMessage(message, error) {
  if (error) {
    logDevError(error);
  }

  return toast.error(message);
}

export function createSuccessMessage(itemType) {
  return toast.success(`${itemType ? `${itemType} ` : ''}Successfully Created`);
}

export function createErrorMessage(itemType, response) {
  const message =
    response && response.global
      ? `Error Creating${itemType ? ` ${itemType}` : ''}`
      : 'There were errors with your submission; check the form for errors.';
  return toast.error(message);
}

export function updateSuccessMessage(itemType) {
  return toast.success(`${itemType ? `${itemType} ` : ''}Successfully Updated`);
}

export function updateErrorMessage(itemType, response) {
  const message =
    response && response.global
      ? `Error Updating${itemType ? ` ${itemType}` : ''}`
      : 'There were errors with your submission; check the form for errors.';
  return toast.error(message);
}

export function deleteSuccessMessage(itemType) {
  return toast.success(`${itemType ? `${itemType} ` : ''}Successfully Deleted`);
}

export function deleteErrorMessage(itemType) {
  return toast.error(`Error Deleting${itemType ? ` ${itemType}` : ''}`);
}

export function duplicateSuccessMessage(itemType) {
  return toast.success(
    `${itemType ? `${itemType} ` : ''}Successfully Duplicated`
  );
}

export function duplicateErrorMessage(itemType) {
  return toast.error(`Error Duplicating${itemType ? ` ${itemType}` : ''}`);
}

export function formErrorMessage() {
  toast.error('Please check your form for errors..');
}
