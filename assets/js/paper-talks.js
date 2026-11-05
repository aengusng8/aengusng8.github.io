(() => {
  const dialog = document.querySelector('.paper-talk-player');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const player = dialog.querySelector('video');
  const title = dialog.querySelector('h3');
  for (const link of document.querySelectorAll('#selected-publications .paper-talk')) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.dataset.title;
      player.poster = link.querySelector('img').src;
      player.src = link.href;
      dialog.showModal();
      // Native controls remain available if playback requires another tap.
      player.play().catch(() => {});
    });
  }
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
  });
})();
