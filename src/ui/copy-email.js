export async function copyEmail(address, button, status, labels, clipboard = navigator.clipboard) {
  button.disabled = true;
  status.textContent = '';
  try {
    await clipboard.writeText(address);
    status.textContent = labels.emailCopied;
  } catch {
    status.textContent = labels.emailCopyFailed;
  } finally {
    button.disabled = false;
  }
}
