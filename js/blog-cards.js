(() => {
  const selector = '#recent-posts > .recent-post-items > .recent-post-item > .recent-post-info > .content';
  let resizeTimer = 0;

  const formatExcerpt = (content) => {
    if (content.dataset.formatted === 'true') return;

    const rawText = content.textContent;
    if (!rawText.trim()) return;

    if (rawText.includes('\n')) {
      content.dataset.formatted = 'true';
      return;
    }

    const formatted = rawText
      .replace(/[ \t]+/g, ' ')
      .replace(/([。！？!?])\s+/g, '$1\n')
      .replace(/([:：])\s+(?=\d+[.)、])/g, '$1\n')
      .replace(/\s+(\d+[.)、]\s+)/g, '\n$1')
      .trim();

    content.textContent = formatted;
    content.dataset.formatted = 'true';
  };

  const refresh = () => {
    document.querySelectorAll(selector).forEach((content) => {
      formatExcerpt(content);
      content.classList.remove('is-overflowing');
      content.classList.toggle('is-overflowing', content.scrollHeight > content.clientHeight + 1);
    });
  };

  const scheduleRefresh = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refresh, 120);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh, { once: true });
  } else {
    refresh();
  }

  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('resize', scheduleRefresh);
})();
