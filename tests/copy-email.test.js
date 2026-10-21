import test from 'node:test';
import assert from 'node:assert/strict';
import { copyEmail } from '../src/ui/copy-email.js';

const labels = { emailCopied: 'Copiado', emailCopyFailed: 'Selecciona el correo' };
test('copiar el correo espera la escritura, informa el resultado y recupera el botón', async () => {
  const button = { disabled: false };
  const status = { textContent: '' };
  let release;
  const operation = copyEmail('persona@example.test', button, status, labels, { writeText: address => {
    assert.equal(address, 'persona@example.test');
    return new Promise(resolve => { release = resolve; });
  } });
  assert.equal(button.disabled, true);
  release();
  await operation;
  assert.equal(status.textContent, labels.emailCopied);
  assert.equal(button.disabled, false);
});
test('permisos de portapapeles denegados o API ausente dejan un mensaje y permiten reintentar', async () => {
  for (const clipboard of [undefined, { writeText: async () => { throw new Error('denied'); } }]) {
    const button = { disabled: false };
    const status = { textContent: 'mensaje anterior' };
    await copyEmail('persona@example.test', button, status, labels, clipboard ?? null);
    assert.equal(status.textContent, labels.emailCopyFailed);
    assert.equal(button.disabled, false);
  }
});
