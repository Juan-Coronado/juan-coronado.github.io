/** Keep the document locked until the last native dialog has closed. */
export function syncDialogState() {
  document.body.classList.toggle('has-dialog', Boolean(document.querySelector('dialog[open]')));
}

export function closeDialogsForNavigation() {
  for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close('navigate');
  syncDialogState();
}
