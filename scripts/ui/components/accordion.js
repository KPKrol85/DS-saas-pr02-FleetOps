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
      syncState(header, content, content.classList.contains('open'));

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

function syncState(header, content, open) {
  content.classList.toggle('open', open);
  content.style.maxHeight = open ? content.scrollHeight + 'px' : '0';
  header.setAttribute('aria-expanded', String(open));
}

window.Accordion = Accordion;
