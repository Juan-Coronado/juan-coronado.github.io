const local = ['localhost', '127.0.0.1'].includes(location.hostname);
for (const link of document.querySelectorAll('[data-local-demo]')) link.hidden = !local;
