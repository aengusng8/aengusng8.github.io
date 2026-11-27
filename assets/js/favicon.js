(() => {
  const icon = document.querySelector('#site-favicon[data-animation-src]');
  if (!icon) return;

  // Keep the stable icon URL for bookmarks and crawlers. The animation uses a
  // separate, last-listed icon, leaving the fallback URL unchanged.
  const animated = document.createElement('link');
  animated.id = 'animated-site-favicon';
  animated.rel = 'icon';
  animated.type = 'image/png';
  animated.sizes.value = '32x32';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const frames = [];
  let startedAt = 0;
  let timer;
  let loading = false;
  let failed = false;
  let pageActive = true;

  // Source: https://markogata.com/projects/2025/flow-matching/featured.gif
  // PNG frames allow animation in browsers that do not animate GIF favicons.
  function draw() {
    const frame = Math.floor((performance.now() - startedAt) / 100) % frames.length;
    animated.href = frames[frame];
    animated.sizes.value = '32x32';
    if (!animated.isConnected) document.head.append(animated);
    // Background tabs still have visible tab icons; update slowly to save work.
    timer = window.setTimeout(draw, document.hidden ? 1000 : 100);
  }

  function sync() {
    window.clearTimeout(timer);
    if (!pageActive || reducedMotion.matches) {
      // Removing the link can leave Chrome showing its cached animation frame.
      if (animated.isConnected) {
        animated.href = icon.href;
        animated.sizes.value = icon.sizes.value;
      }
      startedAt = 0;
      return;
    }
    if (frames.length) {
      if (!startedAt) startedAt = performance.now();
      draw();
    } else if (!loading && !failed) {
      loading = true;
      const strip = new Image();
      strip.onload = () => {
        try {
          const size = strip.naturalHeight;
          const count = strip.naturalWidth / size;
          if (size !== 32 || !Number.isInteger(count) || count < 2) {
            throw new Error('Invalid favicon frames');
          }
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = size;
          const context = canvas.getContext('2d');
          for (let i = 0; i < count; i++) {
            context.clearRect(0, 0, size, size);
            context.drawImage(strip, i * size, 0, size, size, 0, 0, size, size);
            frames.push(canvas.toDataURL('image/png'));
          }
        } catch (_) {
          frames.length = 0;
          failed = true;
        }
        loading = false;
        sync();
      };
      strip.onerror = () => { loading = false; failed = true; };
      strip.src = icon.dataset.animationSrc;
    }
  }

  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', () => { pageActive = false; sync(); });
  window.addEventListener('pageshow', () => { pageActive = true; sync(); });
  sync();
})();
