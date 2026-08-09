const Accordion = {
  init(root) {
    const items = root.querySelectorAll('.accordion-item');
    const rootId = normalizeIdPart(root.id || 'accordion');

    items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      if (!header || !content) return;

      const panelId = getPanelId(content, `${rootId}-panel-${index + 1}`);
      content.id = panelId;
      header.setAttribute('aria-controls', panelId);
      syncState(header, content, content.classList.contains('open'), true);

      header.addEventListener('click', () => {
        const open = content.classList.contains('open');
        syncState(header, content, !open);
      });
    });
  }
};

function normalizeIdPart(value) {
  return String(value || 'accordion')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'accordion';
}

function getPanelId(content, baseId) {
  if (content.id) return content.id;

  let panelId = baseId;
  let suffix = 2;

  while (document.getElementById(panelId)) {
    panelId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return panelId;
}

function syncState(header, content, open, immediate) {
  content.classList.toggle('open', open);
  header.setAttribute('aria-expanded', String(open));

  if (content._accordionHideHandler) {
    content.removeEventListener('transitionend', content._accordionHideHandler);
    content._accordionHideHandler = null;
  }

  if (open) {
    content.hidden = false;
    // Force a reflow so the browser registers the unhidden state as a
    // separate frame from the max-height change below; otherwise the two
    // style changes are batched and the open transition never plays.
    void content.offsetHeight;
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = '0';
    if (immediate) {
      content.hidden = true;
    } else {
      hideAfterTransition(content);
    }
  }
}

function hideAfterTransition(content) {
  const duration = parseFloat(getComputedStyle(content).transitionDuration) || 0;
  if (duration === 0) {
    content.hidden = true;
    return;
  }

  const handler = (event) => {
    if (event.target !== content || event.propertyName !== 'max-height') return;
    content.hidden = true;
    content.removeEventListener('transitionend', handler);
    content._accordionHideHandler = null;
  };

  content._accordionHideHandler = handler;
  content.addEventListener('transitionend', handler);
}

export { Accordion };

window.Accordion = Accordion;
