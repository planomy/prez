/**
 * Prez — classroom board (vanilla JS)
 */

const STORAGE_KEY = 'prez-board-v1';
const VERSION = 1;

const ACCENT_DARK = ['coral', 'ocean', 'violet', 'mint', 'gold', 'slate', 'rose', 'teal'];
const ACCENT_PASTEL = [
  'coral-p',
  'ocean-p',
  'violet-p',
  'mint-p',
  'gold-p',
  'slate-p',
  'rose-p',
  'teal-p',
];
const ACCENTS = [...ACCENT_DARK, ...ACCENT_PASTEL];

const BLOCK_TYPE_OPTIONS = [
  { type: 'note', icon: 'Aa', label: 'Note', iconClass: 'note' },
  { type: 'heading', icon: 'H', label: 'Heading', iconClass: 'heading' },
  { type: 'image', icon: '▣', label: 'Image', iconClass: 'image' },
  { type: 'document', icon: '📄', label: 'Document', iconClass: 'document' },
  { type: 'link', icon: '🔗', label: 'Link', iconClass: 'link' },
  { type: 'list', icon: '≡', label: 'List', iconClass: 'list' },
  { type: 'table', icon: '⊞', label: 'Table', iconClass: 'table' },
  { type: 'timer', icon: '⏱', label: 'Timer', iconClass: 'timer' },
  { type: 'whiteboard', icon: '▢', label: 'Whiteboard', iconClass: 'whiteboard' },
];

const BACKGROUNDS = [
  { id: 'aurora', style: 'linear-gradient(135deg, #1a365d 0%, #2c5282 40%, #ed8936 100%)' },
  { id: 'civics', style: 'linear-gradient(160deg, #234e70 0%, #fb8500 55%, #ffb703 100%)' },
  { id: 'chalk', style: 'linear-gradient(180deg, #2d3748 0%, #4a5568 100%)' },
  { id: 'paper', style: 'linear-gradient(180deg, #f7f5f0 0%, #e8e4dc 100%)' },
  { id: 'midnight', style: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { id: 'forest', style: 'linear-gradient(135deg, #134e4a 0%, #065f46 50%, #047857 100%)' },
  { id: 'sunset', style: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #fbbf24 100%)' },
  { id: 'lavender', style: 'linear-gradient(135deg, #44337a 0%, #6b46c1 50%, #d6bcfa 100%)' },
  { id: 'ocean', style: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #7dd3fc 100%)' },
  { id: 'rose', style: 'linear-gradient(135deg, #881337 0%, #e11d48 45%, #fda4af 100%)' },
  { id: 'mint', style: 'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #a7f3d0 100%)' },
  { id: 'slate', style: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #94a3b8 100%)' },
  { id: 'dawn', style: 'linear-gradient(135deg, #fef3c7 0%, #fdba74 40%, #c084fc 100%)' },
  { id: 'night', style: 'radial-gradient(ellipse at 20% 20%, #312e81 0%, #0f172a 55%, #020617 100%)' },
  { id: 'board', style: 'linear-gradient(180deg, #78716c 0%, #57534e 30%, #44403c 100%)' },
  { id: 'sky', style: 'linear-gradient(180deg, #38bdf8 0%, #818cf8 50%, #c4b5fd 100%)' },
  { id: 'ember', style: 'linear-gradient(145deg, #450a0a 0%, #b91c1c 45%, #fb923c 100%)' },
  { id: 'lagoon', style: 'linear-gradient(160deg, #042f2e 0%, #0d9488 40%, #5eead4 100%)' },
  { id: 'grape', style: 'linear-gradient(135deg, #3b0764 0%, #a21caf 50%, #f0abfc 100%)' },
  { id: 'wheat', style: 'linear-gradient(180deg, #d6d3d1 0%, #d97706 35%, #fef3c7 100%)' },
  { id: 'storm', style: 'linear-gradient(180deg, #0f172a 0%, #334155 40%, #64748b 100%)' },
  { id: 'peach', style: 'linear-gradient(135deg, #fdba74 0%, #fb7185 50%, #fda4af 100%)' },
  { id: 'northern', style: 'linear-gradient(160deg, #020617 0%, #065f46 35%, #22d3ee 70%, #a78bfa 100%)' },
  { id: 'copper', style: 'linear-gradient(135deg, #431407 0%, #c2410c 50%, #fcd34d 100%)' },
  { id: 'indigo', style: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #818cf8 100%)' },
  { id: 'candy', style: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #38bdf8 100%)' },
  { id: 'earth', style: 'linear-gradient(160deg, #365314 0%, #78716c 45%, #a8a29e 100%)' },
  { id: 'frost', style: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 40%, #f0f9ff 100%)' },
  { id: 'volcano', style: 'radial-gradient(ellipse at 50% 100%, #dc2626 0%, #450a0a 45%, #0c0a09 100%)' },
  { id: 'meadow', style: 'linear-gradient(135deg, #ecfccb 0%, #84cc16 40%, #15803d 100%)' },
  { id: 'prism', style: 'linear-gradient(135deg, #f43f5e 0%, #eab308 25%, #22c55e 50%, #3b82f6 75%, #a855f7 100%)' },
  { id: 'deepsea', style: 'linear-gradient(180deg, #020617 0%, #0c4a6e 50%, #164e63 100%)' },
  { id: 'terracotta', style: 'linear-gradient(160deg, #7c2d12 0%, #c2410c 40%, #fed7aa 100%)' },
  { id: 'galaxy', style: 'radial-gradient(ellipse at 30% 20%, #6b21a8 0%, #1e1b4b 40%, #0f172a 100%)' },
  { id: 'citrus', style: 'linear-gradient(135deg, #fef08a 0%, #a3e635 50%, #16a34a 100%)' },
  { id: 'velvet', style: 'linear-gradient(135deg, #4c0519 0%, #9f1239 50%, #fda4af 100%)' },
  { id: 'horizon', style: 'linear-gradient(180deg, #1e3a8a 0%, #7c3aed 35%, #f97316 70%, #fde047 100%)' },
  { id: 'moss', style: 'linear-gradient(160deg, #14532d 0%, #3f6212 50%, #a3e635 100%)' },
  { id: 'ink', style: 'linear-gradient(135deg, #09090b 0%, #18181b 40%, #3f3f46 100%)' },
  { id: 'coralreef', style: 'linear-gradient(160deg, #0891b2 0%, #06b6d4 35%, #f472b6 75%, #fb923c 100%)' },
  { id: 'sahara', style: 'linear-gradient(180deg, #f59e0b 0%, #d97706 35%, #92400e 100%)' },
  { id: 'twilight', style: 'linear-gradient(180deg, #312e81 0%, #be185d 50%, #f97316 100%)' },
  { id: 'chrome', style: 'linear-gradient(135deg, #94a3b8 0%, #e2e8f0 30%, #64748b 60%, #f8fafc 100%)' },
  { id: 'academic', style: 'linear-gradient(160deg, #1e3a5f 0%, #2563eb 40%, #93c5fd 100%)' },
];

const ACCENT_COLORS = {
  coral: { solid: '#7f1d1d', surface: '#b91c1c', header: '#991b1b', lightText: true },
  ocean: { solid: '#0c2d4d', surface: '#1e4a7a', header: '#163a5f', lightText: true },
  violet: { solid: '#3b0764', surface: '#6b21a8', header: '#581c87', lightText: true },
  mint: { solid: '#14532d', surface: '#15803d', header: '#166534', lightText: true },
  gold: { solid: '#78350f', surface: '#b45309', header: '#92400e', lightText: true },
  slate: { solid: '#0f1419', surface: '#2d3748', header: '#1a202c', lightText: true },
  rose: { solid: '#831843', surface: '#9d174d', header: '#881337', lightText: true },
  teal: { solid: '#134e4a', surface: '#0f766e', header: '#115e59', lightText: true },
  'coral-p': { solid: '#f87171', surface: '#fecaca', header: '#fca5a5', lightText: false },
  'ocean-p': { solid: '#60a5fa', surface: '#bfdbfe', header: '#93c5fd', lightText: false },
  'violet-p': { solid: '#a78bfa', surface: '#e9d5ff', header: '#d8b4fe', lightText: false },
  'mint-p': { solid: '#4ade80', surface: '#bbf7d0', header: '#86efac', lightText: false },
  'gold-p': { solid: '#fbbf24', surface: '#fef08a', header: '#fde047', lightText: false },
  'slate-p': { solid: '#94a3b8', surface: '#e2e8f0', header: '#cbd5e1', lightText: false },
  'rose-p': { solid: '#f472b6', surface: '#fce7f3', header: '#fbcfe8', lightText: false },
  'teal-p': { solid: '#2dd4bf', surface: '#ccfbf1', header: '#99f6e4', lightText: false },
};

const SIZE_PRESETS = {
  sm: { w: 260, h: 180, label: 'Small' },
  md: { w: 320, h: 240, label: 'Medium' },
  lg: { w: 400, h: 320, label: 'Large' },
  wide: { w: 480, h: 200, label: 'Wide' },
  tall: { w: 300, h: 380, label: 'Tall' },
  column: { w: 340, h: 280, label: 'Column' },
};

const SNAP_THRESHOLD = 10;
const GRID_SIZE = 24;

const DOCUMENT_ACCEPT =
  '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt,.ods,.odp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const MAX_DOCUMENT_BYTES = 12 * 1024 * 1024;

const DOC_KINDS = {
  pdf: { label: 'PDF', color: '#c53030', bg: '#fed7d7' },
  doc: { label: 'Word', color: '#2b579a', bg: '#bee3f8' },
  docx: { label: 'Word', color: '#2b579a', bg: '#bee3f8' },
  ppt: { label: 'PowerPoint', color: '#c05621', bg: '#feebc8' },
  pptx: { label: 'PowerPoint', color: '#c05621', bg: '#feebc8' },
  xls: { label: 'Excel', color: '#276749', bg: '#c6f6d5' },
  xlsx: { label: 'Excel', color: '#276749', bg: '#c6f6d5' },
  txt: { label: 'Text', color: '#4a5568', bg: '#e2e8f0' },
  rtf: { label: 'Rich text', color: '#4a5568', bg: '#e2e8f0' },
  odt: { label: 'Document', color: '#553c9a', bg: '#e9d8fd' },
  ods: { label: 'Spreadsheet', color: '#276749', bg: '#c6f6d5' },
  odp: { label: 'Presentation', color: '#c05621', bg: '#feebc8' },
  default: { label: 'Document', color: '#4a5568', bg: '#edf2f7' },
};

const DEFAULTS = {
  title: 'Untitled board',
  background: BACKGROUNDS[1].style,
  layoutMode: null,
  blocks: [],
  presentOrder: null,
  blankContent: '',
  blankDraw: null,
  timerSeconds: 300,
};

let timerState = { running: false, endAt: null, remainingSec: 300 };
let timerFloatDismissed = false;
let state = loadState();
let selectedId = null;
let dragState = null;
let resizeState = null;
let presentIndex = 0;
let presentExpanded = false;
let timerTickInterval = null;
let blankDrawCtx = null;
let blankDrawing = false;
let blankBlockId = null;
let outlineDragId = null;

const PRESENT_EXPAND_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l16-16M20 4h-6M20 4v6"/></svg>`;
const PRESENT_RESTORE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 15L4 20M4 20h5M4 20v-5M15 9l5-5M20 4h-5M20 4v5"/></svg>`;
let saveTimer = null;

// DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const canvas = $('#canvas');
const canvasWrap = $('#canvasWrap');
const canvasInner = $('#canvasInner');
const boardTitle = $('#boardTitle');
const btnUndoLayout = $('#btnUndoLayout');
const layoutSelect = $('#layoutSelect');
const btnFormat = $('#btnFormat');
const formatMenu = $('#formatMenu');

const FORMAT_MENU_SECTIONS = [
  {
    items: [{ value: 'free', label: 'Free placement' }],
  },
  {
    label: 'Grid',
    desc: 'Same-size tiles in rows — every card matches',
    items: [
      { value: 'grid-auto', label: 'Fill screen' },
      { value: 'grid-2', label: '2 columns' },
      { value: 'grid-3', label: '3 columns' },
      { value: 'grid-4', label: '4 columns' },
    ],
  },
  {
    label: 'Columns',
    desc: 'Masonry — each card keeps its own height',
    items: [
      { value: 'columns-auto', label: 'Auto columns' },
      { value: 'columns-2', label: '2 columns' },
      { value: 'columns-3', label: '3 columns' },
      { value: 'columns-4', label: '4 columns' },
    ],
  },
  {
    label: 'Lesson',
    items: [{ value: 'rows', label: 'Lesson order' }],
  },
];

const LAYOUT_PAD = 48;
const LAYOUT_GAP = 24;
const LAYOUT_MAX_DIST = 520;

let layoutUndoStack = [];
const presentOverlay = $('#presentOverlay');
const presentStage = $('#presentStage');
const presentCounter = $('#presentCounter');
const toast = $('#toast');

// --- State ---

function normalizeBoardState(data) {
  const merged = { ...DEFAULTS, ...data };
  if (!Array.isArray(merged.blocks)) merged.blocks = [];
  merged.blocks = merged.blocks.filter((b) => b && b.id);
  const ids = new Set(merged.blocks.map((b) => b.id));
  let order = Array.isArray(merged.presentOrder) ? merged.presentOrder.filter((id) => ids.has(id)) : [];
  merged.blocks.forEach((b) => {
    if (!order.includes(b.id)) order.push(b.id);
  });
  merged.presentOrder = order;
  merged.blankContent = merged.blankContent || '';
  merged.blankDraw = merged.blankDraw || null;
  merged.timerSeconds = merged.timerSeconds || 300;
  timerState.remainingSec = merged.timerSeconds;
  return merged;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === VERSION) return normalizeBoardState(parsed);
    }
  } catch (_) {}
  return normalizeBoardState({
    ...DEFAULTS,
    blocks: createDemoBlocks(),
  });
}

function createDemoBlocks() {
  return [
    {
      id: uid(),
      type: 'heading',
      x: 80,
      y: 80,
      w: 340,
      h: 160,
      z: 1,
      accent: 'ocean',
      title: 'Unit 1: Civics',
      content: '<p>Welcome to your classroom board. Click any block to present fullscreen.</p>',
    },
    {
      id: uid(),
      type: 'list',
      x: 460,
      y: 80,
      w: 300,
      h: 280,
      z: 2,
      accent: 'coral',
      title: 'This term…',
      content: '<ul><li>Civics and citizenship</li><li>Democracy and law-making</li><li>Assessment week 6</li><li>Excursion forms due Friday</li></ul>',
    },
    {
      id: uid(),
      type: 'note',
      x: 80,
      y: 280,
      w: 360,
      h: 240,
      z: 3,
      accent: 'gold',
      title: 'Lesson focus',
      content: '<p>Students will explain how laws are made and evaluate one case study from this term.</p>',
    },
  ];
}

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, ...state }));
    } catch (err) {
      console.warn('Could not save board to browser storage', err);
    }
  }, 400);
}

function uid() {
  return 'b_' + Math.random().toString(36).slice(2, 11);
}

function getBlock(id) {
  return state.blocks.find((b) => b.id === id);
}

function bringToFront(id) {
  const maxZ = Math.max(0, ...state.blocks.map((b) => b.z || 0));
  const block = getBlock(id);
  if (block) block.z = maxZ + 1;
}

// --- Render ---

function applyBackground() {
  if (!canvas) return;
  canvas.style.background = state.background;
  if (state.background.startsWith('url(')) {
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
  }
}

function syncBoardTitle() {
  if (document.activeElement !== boardTitle) {
    boardTitle.value = state.title;
  }
}

function render() {
  syncBoardTitle();
  applyBackground();

  const existing = new Set($$('[data-block-id]', canvasInner).map((el) => el.dataset.blockId));
  const current = new Set(state.blocks.map((b) => b.id));

  existing.forEach((id) => {
    if (!current.has(id)) $(`[data-block-id="${id}"]`, canvasInner)?.remove();
  });

  state.blocks.forEach((block) => {
    let el = $(`[data-block-id="${block.id}"]`, canvasInner);
    if (!el) {
      el = createBlockElement(block);
      canvasInner.appendChild(el);
    } else {
      updateBlockElement(el, block);
    }
    positionBlock(el, block);
    el.classList.toggle('is-selected', block.id === selectedId);
  });

  updateEmptyState();
  resizeCanvasToContent();
  updateAlignToolbar();
  if (!$('#outlinePanel')?.hidden) renderOutline();
  persist();
}

function updateEmptyState() {
  let empty = $('.canvas-empty', canvasInner);
  if (state.blocks.length === 0) {
    if (!empty) {
      empty = document.createElement('div');
      empty.className = 'canvas-empty';
      empty.innerHTML = '<h2>Your board is empty</h2><p>Click <strong>Post</strong> to add your first block</p>';
      canvasInner.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

function applyAccentStyles(el, accent) {
  const key = accent || 'ocean';
  const colors = ACCENT_COLORS[key] || ACCENT_COLORS.ocean;
  el.dataset.accent = key;
  el.dataset.accentLight = colors.lightText ? '1' : '0';
  el.style.setProperty('--accent-solid', colors.solid);
  el.style.setProperty('--accent-surface', colors.surface);
  el.style.setProperty('--accent-header', colors.header);
}

function positionBlock(el, block) {
  el.style.left = block.x + 'px';
  el.style.top = block.y + 'px';
  el.style.width = block.w + 'px';
  el.style.height = block.h + 'px';
  el.style.zIndex = block.z || 1;
  applyAccentStyles(el, block.accent);
}

function createBlockElement(block) {
  const el = document.createElement('article');
  el.className = 'block';
  el.dataset.blockId = block.id;
  el.dataset.blockType = block.type;
  el.setAttribute('role', 'article');

  el.innerHTML = `
    <header class="block-header">
      <div class="block-avatar" aria-hidden="true">T</div>
      <div class="block-meta">
        <div class="block-author">Teacher</div>
        <div class="block-time">Just now</div>
      </div>
      <div class="block-header-actions">
        <div class="block-size-wrap">
          <button type="button" class="block-icon-btn block-size-btn" aria-label="Card size" title="Card size">⊞</button>
          <div class="block-size-dropdown"></div>
        </div>
        <div class="block-type-wrap">
          <button type="button" class="block-icon-btn block-type-btn" aria-label="Change post type" title="Change type">+</button>
          <div class="block-type-dropdown"></div>
        </div>
        <div class="block-menu-wrap">
        <button type="button" class="block-icon-btn block-menu-btn" aria-label="Block menu">⋮</button>
        <div class="block-dropdown">
          <div class="color-picker" data-action="colors">
            <span class="dropdown-label">Dark</span>
            <div class="color-grid" data-tone="dark"></div>
            <span class="dropdown-label">Pastel</span>
            <div class="color-grid" data-tone="pastel"></div>
          </div>
          <button type="button" data-action="duplicate">Duplicate</button>
          <button type="button" data-action="present">Present this block</button>
          <div class="dropdown-divider"></div>
          <button type="button" class="danger" data-action="delete">Delete</button>
        </div>
        </div>
      </div>
    </header>
    <div class="block-body"></div>
    <footer class="block-footer">
      <button type="button" class="btn-present-block" data-action="present" title="Present fullscreen">▶ Present</button>
    </footer>
    <span class="resize-handle resize-se" data-resize="se"></span>
    <span class="resize-handle resize-e" data-resize="e"></span>
    <span class="resize-handle resize-s" data-resize="s"></span>
  `;

  buildColorPicker(el, block);

  populateSizeDropdown(el, block);

  populateTypeDropdown(el, block);

  updateBlockElement(el, block);
  bindBlockEvents(el, block);
  return el;
}

function buildColorPicker(el, block) {
  const picker = $('.color-picker', el);
  if (!picker || picker.dataset.built) return;
  picker.dataset.built = '1';

  const darkGrid = $('.color-grid[data-tone="dark"]', picker);
  const pastelGrid = $('.color-grid[data-tone="pastel"]', picker);

  ACCENT_DARK.forEach((id) => appendColorDot(darkGrid, id, block));
  ACCENT_PASTEL.forEach((id) => appendColorDot(pastelGrid, id, block));
}

function appendColorDot(container, id, block) {
  const colors = ACCENT_COLORS[id] || ACCENT_COLORS.coral;
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'color-dot' + (block.accent === id ? ' is-active' : '');
  dot.dataset.color = id;
  dot.style.background = colors.surface;
  dot.title = id.endsWith('-p') ? id.replace('-p', ' (pastel)') : id;
  container.appendChild(dot);
}

function refreshColorDots(el, block) {
  $$('.color-dot', el).forEach((dot) => {
    const id = dot.dataset.color;
    const colors = ACCENT_COLORS[id];
    if (colors) dot.style.background = colors.surface;
    dot.classList.toggle('is-active', block.accent === id);
  });
}

function populateTypeDropdown(el, block) {
  const dropdown = $('.block-type-dropdown', el);
  if (!dropdown || dropdown.dataset.built) return;
  dropdown.dataset.built = '1';

  dropdown.innerHTML = '<span class="dropdown-label">Change to</span><div class="block-type-grid"></div>';
  const grid = $('.block-type-grid', dropdown);

  BLOCK_TYPE_OPTIONS.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'block-type-option';
    btn.dataset.type = opt.type;
    btn.innerHTML = `<span class="type-icon ${opt.iconClass}">${opt.icon}</span><span class="block-type-label">${opt.label}</span>`;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      convertBlockToType(block, opt.type);
    });
    grid.appendChild(btn);
  });
}

function refreshTypeDropdown(el, block) {
  $$('.block-type-option', el).forEach((btn) => {
    btn.classList.toggle('is-current', btn.dataset.type === block.type);
  });
}

function populateSizeDropdown(el, block) {
  const dropdown = $('.block-size-dropdown', el);
  if (!dropdown || dropdown.dataset.built) return;
  dropdown.dataset.built = '1';

  const presetSection = document.createElement('div');
  presetSection.className = 'size-section';
  presetSection.innerHTML = '<span class="dropdown-label">Size</span>';

  Object.entries(SIZE_PRESETS).forEach(([key, preset]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = preset.label;
    btn.dataset.size = key;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applySizePreset(block, key);
      dropdown.classList.remove('is-open');
      render();
      showToast(preset.label + ' size applied');
    });
    presetSection.appendChild(btn);
  });
  dropdown.appendChild(presetSection);

  const matchSection = document.createElement('div');
  matchSection.className = 'size-section';
  matchSection.innerHTML = '<span class="dropdown-label">Match nearby block</span>';

  const matchW = document.createElement('button');
  matchW.type = 'button';
  matchW.textContent = 'Match width (column)';
  matchW.addEventListener('click', (e) => {
    e.stopPropagation();
    if (matchToNearest(block, 'w')) {
      dropdown.classList.remove('is-open');
      render();
      showToast('Width matched');
    } else showToast('No nearby block to match');
  });

  const matchH = document.createElement('button');
  matchH.type = 'button';
  matchH.textContent = 'Match height (row)';
  matchH.addEventListener('click', (e) => {
    e.stopPropagation();
    if (matchToNearest(block, 'h')) {
      dropdown.classList.remove('is-open');
      render();
      showToast('Height matched');
    } else showToast('No nearby block to match');
  });

  matchSection.append(matchW, matchH);
  dropdown.appendChild(matchSection);
}

function applySizePreset(block, key) {
  const preset = SIZE_PRESETS[key];
  if (!preset) return;
  block.w = preset.w;
  block.h = preset.h;
  persist();
}

function blockEdges(b) {
  return {
    left: b.x,
    right: b.x + b.w,
    top: b.y,
    bottom: b.y + b.h,
    cx: b.x + b.w / 2,
    cy: b.y + b.h / 2,
  };
}

function gapBetween(a, b, axis) {
  if (axis === 'x') {
    if (a.right <= b.left) return b.left - a.right;
    if (b.right <= a.left) return a.left - b.right;
    return 0;
  }
  if (a.bottom <= b.top) return b.top - a.bottom;
  if (b.bottom <= a.top) return a.top - b.bottom;
  return 0;
}

function overlapSize(a, b, axis) {
  if (axis === 'x') {
    return Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  }
  return Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
}

/** Prefer blocks in same column (width) or same row (height), including above/below. */
function findNearestBlock(block, dimension) {
  const me = blockEdges(block);
  let best = null;
  let bestScore = Infinity;

  for (const other of state.blocks) {
    if (other.id === block.id) continue;
    const o = blockEdges(other);

    if (dimension === 'w') {
      const xOverlap = overlapSize(me, o, 'x');
      const xGap = gapBetween(me, o, 'x');
      if (xOverlap < 8 && xGap > 72) continue;

      const yGap = gapBetween(me, o, 'y');
      const score = yGap + xGap * 1.5 - xOverlap * 0.05;
      if (score < bestScore && score < LAYOUT_MAX_DIST) {
        bestScore = score;
        best = other;
      }
    } else {
      const yOverlap = overlapSize(me, o, 'y');
      const yGap = gapBetween(me, o, 'y');
      if (yOverlap < 8 && yGap > 72) continue;

      const xGap = gapBetween(me, o, 'x');
      const score = xGap + yGap * 1.5 - yOverlap * 0.05;
      if (score < bestScore && score < LAYOUT_MAX_DIST) {
        bestScore = score;
        best = other;
      }
    }
  }

  return best;
}

function matchToNearest(block, dimension) {
  const best = findNearestBlock(block, dimension);
  if (!best) return false;
  if (dimension === 'w') block.w = best.w;
  if (dimension === 'h') block.h = best.h;
  persist();
  return true;
}

// --- Layout: responsive grid + undo ---

function setLayoutSelectValue(mode) {
  const ui = mode || 'free';
  if (layoutSelect) layoutSelect.value = ui;
  syncFormatMenuActive(ui);
}

function syncFormatMenuActive(mode) {
  if (!formatMenu) return;
  const ui = mode || 'free';
  $$('.format-menu-item', formatMenu).forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.layout === ui);
  });
}

function buildFormatMenu() {
  if (!formatMenu || formatMenu.dataset.built) return;
  formatMenu.dataset.built = '1';

  let html = '';
  FORMAT_MENU_SECTIONS.forEach((section, si) => {
    if (si > 0) html += '<div class="format-menu-divider"></div>';
    if (section.label) html += `<p class="format-menu-heading">${section.label}</p>`;
    if (section.desc) html += `<p class="format-menu-desc">${section.desc}</p>`;
    section.items.forEach((item) => {
      html += `<button type="button" class="format-menu-item" role="menuitem" data-layout="${item.value}">
        <span class="format-menu-check" aria-hidden="true">✓</span>
        <span class="format-menu-item-label">${item.label}</span>
      </button>`;
    });
  });
  formatMenu.innerHTML = html;
}

function toggleFormatMenu(open) {
  if (!formatMenu || !btnFormat) return;
  const show = typeof open === 'boolean' ? open : formatMenu.hidden;
  formatMenu.hidden = !show;
  btnFormat.setAttribute('aria-expanded', show ? 'true' : 'false');
  syncToolbarOverlayLock();
}

function closeFormatMenu() {
  toggleFormatMenu(false);
}

function isAnyToolbarOverlayOpen() {
  return (
    !$('#formatMenu')?.hidden ||
    !$('#toolsMenu')?.hidden ||
    !$('#fileMenu')?.hidden ||
    !$('#timerPopover')?.hidden
  );
}

function syncToolbarOverlayLock() {
  document.body.classList.toggle('toolbar-overlay-open', isAnyToolbarOverlayOpen());
  document.body.classList.toggle('timer-popover-open', !$('#timerPopover')?.hidden);
}

function closeToolbarMenus() {
  closeFormatMenu();
  const toolsMenu = $('#toolsMenu');
  const fileMenu = $('#fileMenu');
  const timerPop = $('#timerPopover');
  if (toolsMenu) {
    toolsMenu.hidden = true;
    toolsMenu.setAttribute('hidden', '');
  }
  if (fileMenu) {
    fileMenu.hidden = true;
    fileMenu.setAttribute('hidden', '');
  }
  if (timerPop) {
    timerPop.hidden = true;
    timerPop.setAttribute('hidden', '');
  }
  $('#btnTools')?.setAttribute('aria-expanded', 'false');
  $('#btnFile')?.setAttribute('aria-expanded', 'false');
  syncToolbarOverlayLock();
}

function toggleToolsMenu() {
  const menu = $('#toolsMenu');
  const btn = $('#btnTools');
  if (!menu || !btn) return;
  const willOpen = menu.hidden;
  closeToolbarMenus();
  if (willOpen) {
    menu.hidden = false;
    menu.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
  syncToolbarOverlayLock();
}

function toggleFileMenu() {
  const menu = $('#fileMenu');
  const btn = $('#btnFile');
  if (!menu || !btn) return;
  const willOpen = menu.hidden;
  closeToolbarMenus();
  if (willOpen) {
    menu.hidden = false;
    menu.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
  syncToolbarOverlayLock();
}

function initToolbarMenus() {
  $('#btnTools')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleToolsMenu();
  });

  $('#btnFile')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFileMenu();
  });

  $('#toolsMenu')?.addEventListener('click', (e) => {
    const item = e.target.closest('[data-tool]');
    if (!item || item.disabled) return;
    e.stopPropagation();
    const tool = item.dataset.tool;
    closeToolbarMenus();
    if (tool === 'outline') toggleOutline();
    else if (tool === 'blank') openBlank();
    else if (tool === 'timer') toggleTimerPopover();
    else if (tool === 'fit') runAutoArrange();
    else if (tool === 'undo') undoLayout();
  });

  $('#fileMenu')?.addEventListener('click', (e) => {
    const item = e.target.closest('[data-file]');
    if (!item) return;
    e.stopPropagation();
    const action = item.dataset.file;
    if (action === 'save') return;
    closeToolbarMenus();
    if (action === 'new') newBoard();
    else if (action === 'open') openFilePicker();
  });

  initSaveAsButton();
}

function initSaveAsButton() {
  const btn = document.querySelector('#fileMenu [data-file="save"]');
  if (!btn || btn.dataset.saveBound) return;
  btn.dataset.saveBound = '1';
  btn.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      beginSaveBoardAs();
      closeToolbarMenus();
    },
    true
  );
}

function initFormatMenu() {
  buildFormatMenu();
  syncFormatMenuActive(state.layoutMode || 'free');

  btnFormat?.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = formatMenu.hidden;
    closeToolbarMenus();
    toggleFormatMenu(willOpen);
  });

  formatMenu?.addEventListener('click', (e) => {
    const btn = e.target.closest('.format-menu-item');
    if (!btn) return;
    e.stopPropagation();
    applyLayout(btn.dataset.layout);
    closeFormatMenu();
  });
}

function snapshotLayout() {
  return state.blocks.map((b) => ({
    id: b.id,
    x: b.x,
    y: b.y,
    w: b.w,
    h: b.h,
  }));
}

function pushLayoutUndo() {
  layoutUndoStack.push(snapshotLayout());
  if (layoutUndoStack.length > 24) layoutUndoStack.shift();
  updateUndoButton();
}

function undoLayout() {
  const prev = layoutUndoStack.pop();
  if (!prev) return;
  prev.forEach((snap) => {
    const b = getBlock(snap.id);
    if (b) {
      b.x = snap.x;
      b.y = snap.y;
      b.w = snap.w;
      b.h = snap.h;
    }
  });
  updateUndoButton();
  resizeCanvasToContent();
  render();
  showToast('Layout undone');
}

function updateUndoButton() {
  const disabled = layoutUndoStack.length === 0;
  if (btnUndoLayout) btnUndoLayout.disabled = disabled;
  const menuUndo = $('#menuUndo');
  if (menuUndo) menuUndo.disabled = disabled;
}

function getViewportLayoutMetrics() {
  const vw = canvasWrap?.clientWidth || window.innerWidth;
  const vh = canvasWrap?.clientHeight || window.innerHeight - 56;
  const usableW = Math.max(320, vw - LAYOUT_PAD * 2);
  const usableH = Math.max(280, vh - LAYOUT_PAD * 2);
  return { vw, vh, usableW, usableH, pad: LAYOUT_PAD, gap: LAYOUT_GAP };
}

function parseLayoutMode(mode) {
  if (!mode || mode === 'free') return { type: 'free' };
  if (mode === 'rows') return { type: 'rows' };
  if (mode.startsWith('columns-')) {
    if (mode === 'columns-auto') return { type: 'columns', auto: true, cols: null };
    const m = mode.match(/^columns-(\d+)$/);
    return { type: 'columns', auto: false, cols: m ? parseInt(m[1], 10) : 2 };
  }
  if (mode === 'grid-auto') return { type: 'grid', auto: true, cols: null };
  const m = mode.match(/^grid-(\d+)$/);
  return { type: 'grid', auto: false, cols: m ? parseInt(m[1], 10) : 3 };
}

function resolveColumnCount(mode, usableW, gap, n, targetW) {
  const parsed = parseLayoutMode(mode);
  let cols = parsed.cols;
  if (parsed.auto || !cols) {
    cols = Math.max(1, Math.floor((usableW + gap) / (targetW + gap)));
  }
  return Math.min(Math.max(1, cols), Math.max(1, n));
}

function computeGridSpec(mode) {
  const { usableW, usableH, pad, gap } = getViewportLayoutMetrics();
  const n = state.blocks.length;
  if (n === 0) return null;

  const cols = resolveColumnCount(mode, usableW, gap, n, 300);
  const cellW = Math.floor((usableW - (cols - 1) * gap) / cols);
  const rows = Math.ceil(n / cols);
  const cellH = Math.max(160, Math.min(400, Math.round(cellW * 0.72)));

  return { cols, rows, cellW, cellH, pad, gap, usableW, usableH };
}

function computeColumnsSpec(mode) {
  const { usableW, pad, gap } = getViewportLayoutMetrics();
  const n = state.blocks.length;
  if (n === 0) return null;

  const cols = resolveColumnCount(mode, usableW, gap, n, 280);
  const colW = Math.floor((usableW - (cols - 1) * gap) / cols);

  return { cols, colW, pad, gap };
}

function sortBlocksForLayout() {
  return [...state.blocks].sort((a, b) => {
    const rowA = Math.floor(a.y / 80);
    const rowB = Math.floor(b.y / 80);
    if (rowA !== rowB) return rowA - rowB;
    return a.x - b.x;
  });
}

function reorderBlocksInState(ordered) {
  const order = new Map(ordered.map((b, i) => [b.id, i]));
  state.blocks.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

function arrangeBlocksGrid(ordered, mode) {
  const spec = computeGridSpec(mode);
  if (!spec) return;

  ordered.forEach((block, i) => {
    const col = i % spec.cols;
    const row = Math.floor(i / spec.cols);
    block.w = spec.cellW;
    block.h = spec.cellH;
    block.x = spec.pad + col * (spec.cellW + spec.gap);
    block.y = spec.pad + row * (spec.cellH + spec.gap);
    block.z = i + 1;
  });
}

function arrangeBlocksColumns(ordered, mode) {
  const spec = computeColumnsSpec(mode);
  if (!spec) return;

  const colHeights = new Array(spec.cols).fill(spec.pad);

  ordered.forEach((block, i) => {
    let col = 0;
    for (let c = 1; c < spec.cols; c++) {
      if (colHeights[c] < colHeights[col]) col = c;
    }

    block.w = spec.colW;
    block.x = spec.pad + col * (spec.colW + spec.gap);
    block.y = colHeights[col];
    colHeights[col] += block.h + spec.gap;
    block.z = i + 1;
  });
}

function arrangeBlocksRows(ordered) {
  const { usableW, pad, gap } = getViewportLayoutMetrics();
  const rowW = Math.min(usableW, 760);
  const x = pad + Math.max(0, Math.floor((usableW - rowW) / 2));
  let y = pad;

  ordered.forEach((block, i) => {
    block.w = rowW;
    block.h = Math.max(block.h, 160);
    block.x = x;
    block.y = y;
    y += block.h + gap;
    block.z = i + 1;
  });
}

function arrangeBlocks(mode) {
  const parsed = parseLayoutMode(mode);
  if (parsed.type === 'free') return;

  const ordered = sortBlocksForLayout();

  if (parsed.type === 'grid') arrangeBlocksGrid(ordered, mode);
  else if (parsed.type === 'columns') arrangeBlocksColumns(ordered, mode);
  else if (parsed.type === 'rows') arrangeBlocksRows(ordered);

  reorderBlocksInState(ordered);
  persist();
}

function getLayoutToast(mode) {
  const parsed = parseLayoutMode(mode);
  if (parsed.type === 'free') return 'Free placement';
  if (parsed.type === 'rows') return 'Lesson order — scroll for more';
  if (parsed.type === 'columns') {
    const spec = computeColumnsSpec(mode);
    return spec ? `${spec.cols} columns · heights preserved` : 'Columns';
  }
  if (parsed.type === 'grid') {
    const spec = computeGridSpec(mode);
    return spec ? `${spec.cols}×${spec.rows} grid · scroll for more` : 'Grid';
  }
  return 'Layout applied';
}

function resizeCanvasToContent() {
  const { vw, vh, pad } = getViewportLayoutMetrics();
  let maxX = pad;
  let maxY = pad;

  state.blocks.forEach((b) => {
    maxX = Math.max(maxX, b.x + b.w + pad);
    maxY = Math.max(maxY, b.y + b.h + pad);
  });

  canvasInner.style.minWidth = Math.max(vw, maxX) + 'px';
  canvasInner.style.minHeight = Math.max(vh, maxY) + 'px';
}

function applyLayout(mode, { force = false } = {}) {
  if (!state.blocks.length) {
    showToast('Add blocks first');
    return;
  }

  const switching =
    mode === 'free' ? !!state.layoutMode : mode !== state.layoutMode;
  if (switching || force) pushLayoutUndo();

  if (mode === 'free') {
    state.layoutMode = null;
    setLayoutSelectValue('free');
    showToast('Free placement — drag cards anywhere');
    return;
  }

  state.layoutMode = mode;
  setLayoutSelectValue(mode);
  arrangeBlocks(mode);
  resizeCanvasToContent();
  render();
  showToast(getLayoutToast(mode));
}

function runAutoArrange() {
  applyLayout('grid-auto', { force: true });
}

function iframeSrcMatches(iframe, expected) {
  if (!iframe || !expected) return false;
  const src = iframe.getAttribute('src') || iframe.src || '';
  return src === expected || src.startsWith(expected.split('#')[0]);
}

function canPreserveBlockBody(el, block) {
  const titleInput = $('[data-field="title"]', el);
  if (titleInput && titleInput.value !== (block.title || '')) return false;

  if (block.type === 'link' && block.url) {
    const embedUrl = getLinkEmbedUrl(block.url);
    const iframe = $('.block-link-embed iframe', el);
    const urlInput = $('[data-field="url"]', el);
    if (urlInput && urlInput.value.trim() !== (block.url || '').trim()) return false;
    return !!(embedUrl && iframeSrcMatches(iframe, embedUrl));
  }

  if (block.type === 'document' && block.docData && isPdfDocument(block)) {
    const iframe = $('.doc-iframe', el);
    return iframeSrcMatches(iframe, block.docData);
  }

  if (block.type === 'document' && isDocxDocument(block) && block.docPreviewHtml) {
    const preview = $('.docx-preview-content', el);
    return !!(preview && preview.innerHTML === block.docPreviewHtml);
  }

  if (block.type === 'image' && block.imageData) {
    const img = $('.block-image-wrap img', el);
    return !!(img && img.getAttribute('src') === block.imageData);
  }

  return false;
}

function updateBlockElement(el, block) {
  applyAccentStyles(el, block.accent);
  el.dataset.blockType = block.type;

  const active = document.activeElement;
  if (
    active &&
    el.contains(active) &&
    active.matches('input:not([type="file"]), textarea, [contenteditable="true"]')
  ) {
    refreshColorDots(el, block);
    syncBlockFooter(el, block);
    return;
  }

  if (canPreserveBlockBody(el, block)) {
    refreshColorDots(el, block);
    syncBlockFooter(el, block);
    return;
  }

  const body = $('.block-body', el);
  body.innerHTML = getBodyHTML(block);

  refreshColorDots(el, block);

  syncBlockFooter(el, block);
  bindBodyInputs(el, block);
}

function getDocumentFooterActionsHTML(block) {
  if (block.type !== 'document' || !block.docData) return '';
  const name = escapeAttr(block.docName || 'document');
  return `<a class="block-footer-btn" href="${block.docData}" download="${name}">Download</a>
    <label class="block-footer-btn block-footer-btn-replace">
      <input type="file" accept="${DOCUMENT_ACCEPT}" data-field="document" hidden />
      Replace
    </label>`;
}

function syncBlockFooter(el, block) {
  const footer = $('.block-footer', el);
  if (!footer) return;

  const left = [];
  if (block.type === 'image' && block.imageData) {
    left.push(
      '<label class="block-footer-btn block-footer-btn-replace"><input type="file" accept="image/*" data-field="image" hidden />Replace image</label>'
    );
  }
  if (block.type === 'document' && block.docData) {
    left.push(getDocumentFooterActionsHTML(block));
  }
  if (block.type === 'whiteboard') {
    left.push(
      '<button type="button" class="block-footer-btn" data-action="open-whiteboard">Open whiteboard</button>'
    );
  }

  const start = left.length ? `<div class="block-footer-start">${left.join('')}</div>` : '';
  footer.innerHTML = `${start}<button type="button" class="btn-present-block" data-action="present" title="Present fullscreen">▶ Present</button>`;
}

function getWhiteboardPreviewHTML(block) {
  const text = (block.blankContent || '').replace(/<[^>]+>/g, '').trim();
  const parts = [];
  if (text) {
    const snippet = text.slice(0, 120);
    parts.push(
      `<p class="block-whiteboard-text">${escapeHtml(snippet)}${text.length > 120 ? '…' : ''}</p>`
    );
  }
  if (block.blankDraw) {
    parts.push(`<img class="block-whiteboard-thumb" src="${block.blankDraw}" alt="" />`);
  }
  if (!parts.length) {
    parts.push('<p class="block-whiteboard-empty">Empty — open to type or draw for the class</p>');
  }
  return parts.join('');
}

function updateWhiteboardPreview(block) {
  const el = $(`[data-block-id="${block.id}"]`, canvasInner);
  if (!el || block.type !== 'whiteboard') return;
  const preview = $('.block-whiteboard-preview', el);
  if (preview) preview.innerHTML = getWhiteboardPreviewHTML(block);
}

function getBlankBlock() {
  return blankBlockId ? getBlock(blankBlockId) : null;
}

function getBlankContent() {
  const b = getBlankBlock();
  return b ? b.blankContent || '' : state.blankContent || '';
}

function setBlankContent(html) {
  const b = getBlankBlock();
  if (b) {
    b.blankContent = html;
    updateWhiteboardPreview(b);
  } else {
    state.blankContent = html;
  }
  persist();
}

function getBlankDraw() {
  const b = getBlankBlock();
  return b ? b.blankDraw || null : state.blankDraw || null;
}

function setBlankDraw(dataUrl) {
  const b = getBlankBlock();
  if (b) {
    b.blankDraw = dataUrl;
    updateWhiteboardPreview(b);
  } else {
    state.blankDraw = dataUrl;
  }
  persist();
}

function getBodyHTML(block) {
  const title = escapeHtml(block.title || '');
  switch (block.type) {
    case 'heading':
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Heading" data-field="title" />
        <div class="block-content" contenteditable="true" data-field="content" data-placeholder="Add subtitle or notes…">${block.content || ''}</div>`;
    case 'image':
      return block.imageData
        ? `<input class="block-title-input" type="text" value="${title}" placeholder="Image title" data-field="title" />
        <div class="block-image-wrap"><img src="${block.imageData}" alt="${title || 'Image'}" /></div>`
        : `<input class="block-title-input" type="text" value="${title}" placeholder="Image title" data-field="title" />
        <div class="block-image-placeholder">
            <p>Drop an image or choose a file</p>
            <label><input type="file" accept="image/*" data-field="image" /> Choose image</label>
            <p style="margin-top:12px;font-size:0.8rem">or paste an image (Ctrl+V)</p>
          </div>`;
    case 'document':
      return getDocumentBodyHTML(block, title);
    case 'link': {
      const embedUrl = getLinkEmbedUrl(block.url);
      const openUrl = getLinkOpenUrl(block.url);
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Link title" data-field="title" />
        <div class="block-link-preview">
          <input type="url" value="${escapeAttr(block.url || '')}" placeholder="https://example.com" data-field="url" />
          ${embedUrl ? getLinkEmbedHTML(embedUrl, openUrl) : block.url?.trim() ? '<p class="block-link-hint">Check the URL — preview needs https://</p>' : ''}
        </div>`;
    }
    case 'list':
      return `<input class="block-title-input" type="text" value="${title}" placeholder="List title" data-field="title" />
        <div class="block-content" contenteditable="true" data-field="content" data-placeholder="Bullet points…">${block.content || '<ul><li>Item one</li><li>Item two</li></ul>'}</div>`;
    case 'table':
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Table title" data-field="title" />
        <div class="block-table-wrap">${block.tableHtml || defaultTableHtml()}</div>`;
    case 'timer': {
      const sec = block.timerSec || 300;
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Timer label" data-field="title" />
        <div class="block-timer-display">
          <span class="block-timer-time">${formatTimer(sec)}</span>
          <div class="block-timer-presets">
            <button type="button" data-timer-sec="60">1m</button>
            <button type="button" data-timer-sec="120">2m</button>
            <button type="button" data-timer-sec="300">5m</button>
            <button type="button" data-timer-sec="600">10m</button>
            <button type="button" data-action="start-timer">Start</button>
          </div>
        </div>`;
    }
    case 'whiteboard':
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Whiteboard title" data-field="title" />
        <div class="block-whiteboard-preview">${getWhiteboardPreviewHTML(block)}</div>
        <button type="button" class="btn-open-whiteboard" data-action="open-whiteboard">Open whiteboard</button>`;
    default:
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Title" data-field="title" />
        <div class="block-content" contenteditable="true" data-field="content" data-placeholder="Write your note…">${block.content || ''}</div>`;
  }
}

function getDocKind(block) {
  const ext = (block.docName || '').split('.').pop()?.toLowerCase() || '';
  const meta = DOC_KINDS[ext] || DOC_KINDS.default;
  return { key: ext || 'default', ...meta };
}

function isPdfDocument(block) {
  const ext = (block.docName || '').split('.').pop()?.toLowerCase();
  return ext === 'pdf' || block.docMime === 'application/pdf';
}

function isDocxDocument(block) {
  const ext = (block.docName || '').split('.').pop()?.toLowerCase();
  return (
    ext === 'docx' ||
    block.docMime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
}

function isDocxFile(file) {
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ext === 'docx' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

function dataUrlToArrayBuffer(dataUrl) {
  const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function convertDocxArrayBufferToHtml(arrayBuffer) {
  if (typeof mammoth === 'undefined') throw new Error('Preview library not loaded');
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = (result.value || '').trim();
  if (!html) throw new Error('Empty document');
  return html;
}

async function ensureDocxPreview(block) {
  if (!isDocxDocument(block) || !block.docData) return null;
  if (block.docPreviewHtml) return block.docPreviewHtml;
  try {
    block.docPreviewHtml = await convertDocxArrayBufferToHtml(dataUrlToArrayBuffer(block.docData));
    persist();
    return block.docPreviewHtml;
  } catch {
    block.docPreviewHtml = null;
    return null;
  }
}

let docxBackfillPromise = null;

function scheduleDocxBackfill() {
  const needs = state.blocks.some((b) => isDocxDocument(b) && b.docData && !b.docPreviewHtml);
  if (!needs || typeof mammoth === 'undefined') return;
  if (docxBackfillPromise) return;
  docxBackfillPromise = (async () => {
    for (const block of state.blocks) {
      if (isDocxDocument(block) && block.docData && !block.docPreviewHtml) {
        await ensureDocxPreview(block);
      }
    }
    render();
  })().finally(() => {
    docxBackfillPromise = null;
  });
}

function isAllowedDocument(file) {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (DOC_KINDS[ext]) return true;
  if (file.type === 'application/pdf') return true;
  if (file.type.includes('word') || file.type.includes('presentation') || file.type.includes('spreadsheet')) {
    return true;
  }
  if (file.type.startsWith('application/vnd.') || file.type === 'application/msword') return true;
  return false;
}

function getDocumentBodyHTML(block, title) {
  const titleField = `<input class="block-title-input" type="text" value="${title}" placeholder="Document title" data-field="title" />`;

  if (!block.docData) {
    return `${titleField}
      <div class="block-doc-placeholder" data-doc-drop>
        <div class="doc-placeholder-icon" aria-hidden="true">📄</div>
        <p>PDF, Word, PowerPoint, Excel</p>
        <label class="doc-upload-btn">
          <input type="file" accept="${DOCUMENT_ACCEPT}" data-field="document" />
          Choose file
        </label>
        <p class="doc-hint">or drop a file here · max 12 MB · Word (.docx) previews in Present</p>
      </div>`;
  }

  const kind = getDocKind(block);
  const name = escapeHtml(block.docName || 'Document');
  const badge = escapeHtml((kind.key || 'doc').slice(0, 4).toUpperCase());

  if (isPdfDocument(block)) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-pdf">
        <iframe src="${block.docData}#toolbar=0" title="${name}" class="doc-iframe"></iframe>
      </div>
      <p class="doc-filename">${name}</p>`;
  }

  if (isDocxDocument(block) && block.docPreviewHtml) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-docx">
        <div class="docx-preview-content">${block.docPreviewHtml}</div>
      </div>
      <p class="doc-filename">${name}</p>
      <p class="doc-preview-note">Readable preview · layout may differ from Word</p>`;
  }

  if (isDocxDocument(block) && block.docData) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-docx block-doc-preview-loading">
        <p>Building Word preview…</p>
      </div>
      <p class="doc-filename">${name}</p>`;
  }

  return `${titleField}
    <div class="block-doc-card" style="--doc-color:${kind.color};--doc-bg:${kind.bg}">
      <div class="doc-file-icon">${badge}</div>
      <p class="doc-file-kind">${escapeHtml(kind.label)}</p>
      <p class="doc-filename">${name}</p>
    </div>`;
}

function normalizeLinkUrl(raw) {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidHttpUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function getLinkEmbedUrl(raw) {
  const url = normalizeLinkUrl(raw);
  if (!isValidHttpUrl(url)) return null;

  try {
    const u = new URL(url);

    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (u.hostname.includes('youtube.com') || u.hostname === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') {
        const v = u.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}`;
      }
      if (u.pathname.startsWith('/embed/')) return url;
      if (u.pathname.startsWith('/shorts/')) {
        const id = u.pathname.split('/')[2];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (u.hostname === 'vimeo.com' || u.hostname === 'www.vimeo.com') {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }

    if (u.hostname === 'docs.google.com') {
      if (/\/document\/d\//.test(u.pathname) && url.includes('/edit')) {
        return url.replace(/\/edit.*$/, '/preview');
      }
      if (/\/spreadsheets\/d\//.test(u.pathname) && url.includes('/edit')) {
        return url.replace(/\/edit.*$/, '/preview');
      }
      if (/\/presentation\/d\//.test(u.pathname) && url.includes('/edit')) {
        return url.replace(/\/edit.*$/, '/embed');
      }
    }

    return url;
  } catch {
    return null;
  }
}

function getLinkOpenUrl(raw) {
  const url = normalizeLinkUrl(raw);
  return isValidHttpUrl(url) ? url : '';
}

function getLinkEmbedHTML(embedUrl, openUrl, { present = false } = {}) {
  const sandbox = present
    ? 'allow-scripts allow-same-origin allow-popups allow-forms allow-presentation'
    : 'allow-scripts allow-same-origin allow-popups allow-forms';
  const allow = present ? ' allowfullscreen' : '';
  return `<div class="${present ? 'present-link-embed' : 'block-link-embed'}">
      <iframe src="${escapeAttr(embedUrl)}" title="Web page preview" class="link-iframe" sandbox="${sandbox}"${allow} referrerpolicy="no-referrer"></iframe>
      <a class="${present ? 'present-link-open' : 'block-link-open'}" href="${escapeAttr(openUrl)}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
    </div>`;
}

function defaultTableHtml() {
  return `<table class="block-table" contenteditable="false">
    <thead><tr><th contenteditable="true">Term</th><th contenteditable="true">Topic</th><th contenteditable="true">Notes</th></tr></thead>
    <tbody>
      <tr><td contenteditable="true">1</td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
      <tr><td contenteditable="true">2</td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
    </tbody>
  </table>`;
}

function syncLinkPreview(el, block) {
  const wrap = $('.block-link-preview', el);
  if (!wrap) return;

  const urlInput = $('[data-field="url"]', wrap);
  const normalized = normalizeLinkUrl(block.url);
  if (urlInput && normalized && urlInput.value.trim() !== block.url?.trim()) {
    block.url = normalized;
    urlInput.value = normalized;
    persist();
  }

  const embedUrl = getLinkEmbedUrl(block.url);
  const openUrl = getLinkOpenUrl(block.url);
  $('.block-link-hint', wrap)?.remove();

  let embed = $('.block-link-embed', wrap);
  if (!embedUrl) {
    embed?.remove();
    if ((block.url || '').trim() && !embed) {
      const hint = document.createElement('p');
      hint.className = 'block-link-hint';
      hint.textContent = 'This site may block embeds — use Open in new tab after adding a URL';
      wrap.appendChild(hint);
    }
    return;
  }

  if (!embed) {
    wrap.insertAdjacentHTML('beforeend', getLinkEmbedHTML(embedUrl, openUrl));
    return;
  }

  const iframe = $('iframe', embed);
  if (iframe && iframe.src !== embedUrl) iframe.src = embedUrl;
  const open = $('.block-link-open', embed);
  if (open) open.href = openUrl;
}

function bindBodyInputs(el, block) {
  const titleInput = $('[data-field="title"]', el);
  if (titleInput) {
    titleInput.oninput = () => {
      block.title = titleInput.value;
      persist();
    };
  }

  const contentEl = $('[data-field="content"]', el);
  if (contentEl) {
    contentEl.oninput = () => {
      block.content = contentEl.innerHTML;
      persist();
    };
  }

  const urlInput = $('[data-field="url"]', el);
  if (urlInput) {
    let linkPreviewTimer;
    urlInput.oninput = () => {
      block.url = urlInput.value;
      persist();
      clearTimeout(linkPreviewTimer);
      linkPreviewTimer = setTimeout(() => syncLinkPreview(el, block), 400);
    };
    urlInput.onblur = () => syncLinkPreview(el, block);
  }

  const fileInput = $('[data-field="image"]', el);
  if (fileInput) {
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) readImageFile(file, block, el);
      fileInput.value = '';
    };
  }

  $$('[data-field="document"]', el).forEach((docInput) => {
    docInput.onchange = () => {
      const file = docInput.files?.[0];
      if (file) readDocumentFile(file, block, el);
      docInput.value = '';
    };
  });

  const table = $('.block-table', el);
  if (table) {
    table.oninput = () => {
      block.tableHtml = table.outerHTML;
      persist();
    };
  }
}

function bindBlockEvents(el, block) {
  const header = $('.block-header', el);
  const menuBtn = $('.block-menu-btn', el);
  const dropdown = $('.block-dropdown', el);
  const sizeBtn = $('.block-size-btn', el);
  const sizeDropdown = $('.block-size-dropdown', el);
  const typeBtn = $('.block-type-btn', el);
  const typeDropdown = $('.block-type-dropdown', el);

  header.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.block-header-actions')) return;
    startDrag(e, block, el);
  });

  sizeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sizeDropdown.classList.contains('is-open')) {
      closeAllDropdowns();
      return;
    }
    openBlockDropdown(el, sizeDropdown, sizeBtn);
  });

  typeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeDropdown.classList.contains('is-open')) {
      closeAllDropdowns();
      return;
    }
    refreshTypeDropdown(el, block);
    openBlockDropdown(el, typeDropdown, typeBtn);
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('is-open')) {
      closeAllDropdowns();
      return;
    }
    openBlockDropdown(el, dropdown, menuBtn);
  });

  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    e.stopPropagation();

    if (btn.dataset.color) {
      block.accent = btn.dataset.color;
      closeAllDropdowns();
      render();
      return;
    }

    const action = btn.dataset.action;
    if (action === 'delete') {
      state.blocks = state.blocks.filter((b) => b.id !== block.id);
      removeFromPresentOrder(block.id);
      if (selectedId === block.id) selectedId = null;
      closeAllDropdowns();
      render();
    } else if (action === 'duplicate') {
      duplicateBlock(block);
      closeAllDropdowns();
    } else if (action === 'present') {
      closeAllDropdowns();
      openPresent(block.id);
      return;
    }
    closeAllDropdowns();
  });

  el.addEventListener('click', (e) => {
    if (
      e.target.closest('.block-dropdown') ||
      e.target.closest('.block-size-dropdown') ||
      e.target.closest('.block-type-dropdown') ||
      e.target.closest('.block-header-actions') ||
      e.target.closest('.resize-handle')
    ) {
      return;
    }
    if (dragState?.moved) return;

    if (e.target.closest('[data-action="open-whiteboard"]')) {
      e.preventDefault();
      e.stopPropagation();
      openBlank(block.id);
      return;
    }

    const timerBtn = e.target.closest('[data-timer-sec], [data-action="start-timer"]');
    if (timerBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (timerBtn.dataset.timerSec) {
        block.timerSec = Number(timerBtn.dataset.timerSec) || 300;
        setTimerDuration(block.timerSec);
        updateBlockElement(el, block);
        persist();
      } else if (timerBtn.dataset.action === 'start-timer') {
        setTimerDuration(block.timerSec || 300);
        startBlockTimer(block);
      }
      return;
    }

    if (
      e.target.closest(
        'input, textarea, [contenteditable], label, a, .block-footer-btn, .doc-upload-btn, .btn-open-whiteboard'
      )
    ) {
      if (selectedId !== block.id) selectBlock(block.id);
      return;
    }

    selectBlock(block.id);

    if (e.target.closest('.btn-present-block') || e.target.closest('[data-action="present"]')) {
      openPresent(block.id);
    }
  });

  el.addEventListener('dblclick', (e) => {
    if (e.target.closest('.block-header')) return;
    if (block.type === 'whiteboard') {
      openBlank(block.id);
      return;
    }
    el.classList.add('is-editing');
    const content = $('[data-field="content"]', el) || $('[contenteditable="true"]', el);
    content?.focus();
  });

  $$('[data-resize]', el).forEach((handle) => {
    handle.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      startResize(e, block, el, handle.dataset.resize);
    });
  });

  if (block.type === 'document') {
    el.addEventListener('dragover', (e) => {
      if ([...e.dataTransfer.types].includes('Files')) {
        e.preventDefault();
        el.classList.add('is-doc-dragover');
      }
    });
    el.addEventListener('dragleave', (e) => {
      if (!el.contains(e.relatedTarget)) el.classList.remove('is-doc-dragover');
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('is-doc-dragover');
      const file = e.dataTransfer.files?.[0];
      if (file) readDocumentFile(file, block, el);
    });
  }

  if (block.type === 'image') {
    el.addEventListener('dragover', (e) => {
      if ([...e.dataTransfer.types].includes('Files')) {
        e.preventDefault();
        el.classList.add('is-img-dragover');
      }
    });
    el.addEventListener('dragleave', (e) => {
      if (!el.contains(e.relatedTarget)) el.classList.remove('is-img-dragover');
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('is-img-dragover');
      const file = e.dataTransfer.files?.[0];
      if (file?.type.startsWith('image/')) readImageFile(file, block, el);
    });
  }

  el.addEventListener(
    'paste',
    (e) => {
      if (block.type !== 'image') return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) readImageFile(file, block, el);
          break;
        }
      }
    },
    true
  );
}

// --- Drag & resize ---

function startDrag(e, block, el) {
  if (e.button !== 0) return;
  e.preventDefault();
  selectBlock(block.id);
  bringToFront(block.id);

  const rect = canvasInner.getBoundingClientRect();
  dragState = {
    id: block.id,
    el,
    startX: e.clientX,
    startY: e.clientY,
    origX: block.x,
    origY: block.y,
    moved: false,
  };

  el.classList.add('is-dragging');
  el.setPointerCapture(e.pointerId);

  const onMove = (ev) => {
    const dx = ev.clientX - dragState.startX;
    const dy = ev.clientY - dragState.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.moved = true;

    const rawX = Math.max(0, dragState.origX + dx);
    const rawY = Math.max(0, dragState.origY + dy);
    if (ev.shiftKey) {
      block.x = rawX;
      block.y = rawY;
      positionBlock(el, block);
      clearSnapGuides();
    } else {
      const snapped = snapDragPosition(block, rawX, rawY);
      block.x = snapped.x;
      block.y = snapped.y;
      positionBlock(el, block);
      showSnapGuides(snapped.vGuides, snapped.hGuides);
    }
  };

  const onUp = (ev) => {
    el.classList.remove('is-dragging');
    clearSnapGuides();
    el.releasePointerCapture(ev.pointerId);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onUp);
    if (dragState?.moved) {
      state.layoutMode = null;
      setLayoutSelectValue('free');
    }
    persist();
    setTimeout(() => {
      dragState = null;
    }, 0);
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);
}

function startResize(e, block, el, direction) {
  if (e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  selectBlock(block.id);

  resizeState = {
    id: block.id,
    el,
    direction,
    startX: e.clientX,
    startY: e.clientY,
    origW: block.w,
    origH: block.h,
  };

  const onMove = (ev) => {
    const dx = ev.clientX - resizeState.startX;
    const dy = ev.clientY - resizeState.startY;

    if (direction.includes('e')) {
      block.w = Math.max(180, resizeState.origW + dx);
    }
    if (direction.includes('s')) {
      block.h = Math.max(100, resizeState.origH + dy);
    }
    if (direction.includes('se')) {
      block.w = Math.max(180, resizeState.origW + dx);
      block.h = Math.max(100, resizeState.origH + dy);
    }
    positionBlock(el, block);
  };

  const onUp = () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    resizeState = null;
    state.layoutMode = null;
    setLayoutSelectValue('free');
    persist();
  };

  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onUp);
}

function clearBlockSelection() {
  if (!selectedId) return;
  $(`[data-block-id="${selectedId}"]`, canvasInner)?.classList.remove('is-selected');
  selectedId = null;
  updateAlignToolbar();
}

function selectBlock(id) {
  const prev = selectedId;
  selectedId = id;
  bringToFront(id);

  if (prev && prev !== id) {
    $(`[data-block-id="${prev}"]`, canvasInner)?.classList.remove('is-selected');
  }

  const el = $(`[data-block-id="${id}"]`, canvasInner);
  const block = getBlock(id);
  if (el && block) {
    el.classList.add('is-selected');
    positionBlock(el, block);
  }
  updateAlignToolbar();
}

function closeAllDropdowns() {
  $$('.block-dropdown.is-open, .block-size-dropdown.is-open, .block-type-dropdown.is-open').forEach((d) => {
    d.classList.remove('is-open', 'drop-up');
  });
  $$('.block.is-dropdown-open').forEach((b) => b.classList.remove('is-dropdown-open'));
}

function openBlockDropdown(blockEl, dropdown, anchorBtn) {
  closeAllDropdowns();
  blockEl.classList.add('is-dropdown-open');
  const block = getBlock(blockEl.dataset.blockId);
  if (block) bringToFront(block.id);

  dropdown.classList.add('is-open');
  requestAnimationFrame(() => positionFloatingMenu(dropdown, anchorBtn));
}

function positionFloatingMenu(dropdown, anchorBtn) {
  dropdown.classList.remove('drop-up');
  const rect = anchorBtn.getBoundingClientRect();
  const menuH = dropdown.offsetHeight;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (menuH + 12 > spaceBelow && spaceAbove > spaceBelow) {
    dropdown.classList.add('drop-up');
  }
}

function getSnapGuidesEl() {
  let el = $('#snapGuides');
  if (!el) {
    el = document.createElement('div');
    el.id = 'snapGuides';
    el.className = 'snap-guides';
    canvasInner.appendChild(el);
  }
  return el;
}

function clearSnapGuides() {
  const el = $('#snapGuides');
  if (el) el.innerHTML = '';
}

function showSnapGuides(vLines, hLines) {
  const container = getSnapGuidesEl();
  container.innerHTML = '';
  vLines.forEach((x) => {
    const line = document.createElement('div');
    line.className = 'snap-guide snap-guide-v';
    line.style.left = x + 'px';
    container.appendChild(line);
  });
  hLines.forEach((y) => {
    const line = document.createElement('div');
    line.className = 'snap-guide snap-guide-h';
    line.style.top = y + 'px';
    container.appendChild(line);
  });
}

function snapDragPosition(block, x, y) {
  const w = block.w;
  const h = block.h;
  let nx = x;
  let ny = y;
  const vGuides = new Set();
  const hGuides = new Set();
  let snappedX = false;
  let snappedY = false;

  const gridX = Math.round(x / GRID_SIZE) * GRID_SIZE;
  const gridY = Math.round(y / GRID_SIZE) * GRID_SIZE;

  const edges = () => ({
    left: nx,
    right: nx + w,
    top: ny,
    bottom: ny + h,
    cx: nx + w / 2,
    cy: ny + h / 2,
  });

  for (const other of state.blocks) {
    if (other.id === block.id) continue;
    const targetsV = [other.x, other.x + other.w, other.x + other.w / 2];
    const targetsH = [other.y, other.y + other.h, other.y + other.h / 2];

    let me = edges();
    for (const tv of targetsV) {
      if (!snappedX && Math.abs(me.left - tv) <= SNAP_THRESHOLD) {
        nx = tv;
        snappedX = true;
        vGuides.add(tv);
      } else if (!snappedX && Math.abs(me.right - tv) <= SNAP_THRESHOLD) {
        nx = tv - w;
        snappedX = true;
        vGuides.add(tv);
      } else if (!snappedX && Math.abs(me.cx - tv) <= SNAP_THRESHOLD) {
        nx = tv - w / 2;
        snappedX = true;
        vGuides.add(tv);
      }
    }

    me = edges();
    for (const th of targetsH) {
      if (!snappedY && Math.abs(me.top - th) <= SNAP_THRESHOLD) {
        ny = th;
        snappedY = true;
        hGuides.add(th);
      } else if (!snappedY && Math.abs(me.bottom - th) <= SNAP_THRESHOLD) {
        ny = th - h;
        snappedY = true;
        hGuides.add(th);
      } else if (!snappedY && Math.abs(me.cy - th) <= SNAP_THRESHOLD) {
        ny = th - h / 2;
        snappedY = true;
        hGuides.add(th);
      }
    }
  }

  if (!snappedX && Math.abs(x - gridX) <= 6) nx = gridX;
  if (!snappedY && Math.abs(y - gridY) <= 6) ny = gridY;

  return {
    x: Math.max(0, nx),
    y: Math.max(0, ny),
    vGuides: [...vGuides],
    hGuides: [...hGuides],
  };
}

// --- Add blocks ---

function clearBlockTypeFields(block) {
  block.content = '';
  block.url = '';
  delete block.tableHtml;
  delete block.imageData;
  delete block.docData;
  delete block.docName;
  delete block.docMime;
  delete block.docPreviewHtml;
  delete block.timerSec;
  delete block.blankContent;
  delete block.blankDraw;
}

function applyBlockTypeDefaults(block, type) {
  const carryToWhiteboard =
    type === 'whiteboard' && !block.blankContent
      ? block.content || ''
      : '';
  block.type = type;
  clearBlockTypeFields(block);

  if (type === 'list') {
    block.content = '<ul><li></li><li></li><li></li></ul>';
    if (block.h < 220) block.h = 260;
  } else if (type === 'table') {
    block.tableHtml = defaultTableHtml();
    if (block.h < 200) block.h = 240;
  } else if (type === 'note' || type === 'heading') {
    block.content = '<p></p>';
  } else if (type === 'link') {
    block.url = '';
    if (block.h < 280) block.h = 320;
    if (block.w < 340) block.w = 360;
  } else if (type === 'image') {
    if (block.h < 220) block.h = 280;
  } else if (type === 'document') {
    if (block.w < 340) block.w = 360;
    if (block.h < 280) block.h = 320;
  } else if (type === 'timer') {
    block.timerSec = block.timerSec || 300;
    if (block.w < 280) block.w = 300;
    if (block.h < 200) block.h = 220;
  } else if (type === 'whiteboard') {
    block.blankContent = block.blankContent || carryToWhiteboard || '';
    block.blankDraw = block.blankDraw || null;
    if (block.w < 320) block.w = 360;
    if (block.h < 240) block.h = 280;
  }
}

function focusBlockAfterTypeChange(block, type) {
  requestAnimationFrame(() => {
    const el = $(`[data-block-id="${block.id}"]`);
    if (!el) return;
    if (type === 'document') {
      $('[data-field="document"]', el)?.click();
      return;
    }
    if (type === 'image') {
      $('[data-field="image"]', el)?.click();
      return;
    }
    const input = $('.block-title-input', el) || $('[data-field="content"]', el);
    input?.focus();
  });
}

function convertBlockToType(block, type) {
  const opt = BLOCK_TYPE_OPTIONS.find((o) => o.type === type);
  const label = opt?.label || type;

  if (block.type === type) {
    closeAllDropdowns();
    focusBlockAfterTypeChange(block, type);
    return;
  }

  applyBlockTypeDefaults(block, type);
  state.layoutMode = null;
  setLayoutSelectValue('free');
  selectedId = block.id;
  render();
  closeAllDropdowns();
  showToast(`Changed to ${label}`);
  focusBlockAfterTypeChange(block, type);
}

function addBlock(type) {
  const offsets = state.blocks.length * 24;
  const block = {
    id: uid(),
    type,
    x: 120 + offsets,
    y: 120 + offsets,
    w: type === 'heading' || type === 'whiteboard' ? 360 : 320,
    h:
      type === 'image'
        ? 280
        : type === 'document' || type === 'link'
          ? 320
          : type === 'whiteboard'
            ? 280
            : type === 'table'
              ? 220
              : 200,
    z: Math.max(0, ...state.blocks.map((b) => b.z || 0)) + 1,
    accent: ACCENTS[state.blocks.length % ACCENTS.length],
    title: '',
    content: '',
  };

  applyBlockTypeDefaults(block, type);

  state.blocks.push(block);
  addToPresentOrder(block.id);
  selectedId = block.id;
  render();

  focusBlockAfterTypeChange(block, type);

  showToast('Block added');
}

function duplicateBlock(block) {
  const copy = {
    ...JSON.parse(JSON.stringify(block)),
    id: uid(),
    x: block.x + 24,
    y: block.y + 24,
    z: Math.max(0, ...state.blocks.map((b) => b.z || 0)) + 1,
  };
  state.blocks.push(copy);
  addToPresentOrder(copy.id);
  selectedId = copy.id;
  render();
  showToast('Block duplicated');
}

function readImageFile(file, block, el) {
  if (!file.type.startsWith('image/')) {
    showToast('Choose an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    block.imageData = reader.result;
    block.type = 'image';
    selectedId = block.id;
    render();
    persist();
    showToast('Image added');
  };
  reader.onerror = () => showToast('Could not read image');
  reader.readAsDataURL(file);
}

function readDocumentFile(file, block, el) {
  if (file.size > MAX_DOCUMENT_BYTES) {
    showToast('File too large (max 12 MB)');
    return;
  }
  if (!isAllowedDocument(file)) {
    showToast('Use PDF, Word, PowerPoint, or Excel');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    block.docData = reader.result;
    block.docName = file.name;
    block.docMime = file.type || '';
    block.docPreviewHtml = null;
    block.type = 'document';
    if (!block.title) block.title = file.name.replace(/\.[^.]+$/, '');

    updateBlockElement(el, block);

    if (isDocxFile(file)) {
      showToast('Building Word preview…');
      try {
        block.docPreviewHtml = await convertDocxArrayBufferToHtml(await file.arrayBuffer());
        updateBlockElement(el, block);
        showToast('Document ready');
      } catch {
        showToast('Preview unavailable — download to open in Word');
      }
    } else {
      showToast('Document added');
    }

    persist();
  };
  reader.onerror = () => showToast('Could not read file');
  reader.readAsDataURL(file);
}

// --- Present ---

function setPresentExpanded(expanded) {
  presentExpanded = expanded;
  presentOverlay.classList.toggle('present-expanded', expanded);
  presentStage.classList.toggle('present-stage--expanded', expanded);
  const btn = $('.present-expand', presentStage);
  if (!btn) return;
  btn.setAttribute('aria-label', expanded ? 'Restore size' : 'Expand to full screen');
  btn.title = expanded ? 'Restore size' : 'Expand to full screen';
  btn.setAttribute('aria-pressed', expanded ? 'true' : 'false');
  btn.innerHTML = expanded ? PRESENT_RESTORE_ICON : PRESENT_EXPAND_ICON;
}

function bindPresentExpand() {
  const btn = $('.present-expand', presentStage);
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setPresentExpanded(!presentExpanded);
  });
}

function openPresent(blockId) {
  const block = getBlock(blockId);
  if (block?.type === 'whiteboard') {
    if (presentOverlay && !presentOverlay.hidden) closePresent();
    openBlank(blockId);
    return;
  }

  const blocks = getPresentBlocks();
  const idx = blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return;
  presentIndex = idx;
  presentExpanded = false;
  presentOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  void renderPresent();

  if (presentOverlay.requestFullscreen) {
    presentOverlay.requestFullscreen().catch(() => {});
  }
}

function closePresent() {
  presentExpanded = false;
  presentOverlay.classList.remove('present-expanded');
  presentStage.classList.remove('present-stage--expanded');
  presentOverlay.hidden = true;
  document.body.style.overflow = '';
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

async function renderPresent() {
  const blocks = getPresentBlocks();
  const block = blocks[presentIndex];
  if (!block) return;

  if (block.type === 'document' && isDocxDocument(block) && block.docData && !block.docPreviewHtml) {
    presentStage.innerHTML =
      '<article class="present-card present-card-loading"><p>Building Word preview…</p></article>';
    await ensureDocxPreview(block);
  }

  const expandBtn = `<button type="button" class="present-expand" aria-label="Expand to full screen" title="Expand to full screen" aria-pressed="false">${PRESENT_EXPAND_ICON}</button>`;
  const typeClass = block.type ? ` present-card--${block.type}` : '';
  const titleAttr = block.title ? ` aria-label="${escapeAttr(block.title)}"` : '';
  presentStage.innerHTML = `<article class="present-card${typeClass}"${titleAttr}>${expandBtn}${getPresentHTML(block, { showTitle: !presentExpanded })}</article>`;
  setPresentExpanded(presentExpanded);
  bindPresentExpand();
  presentCounter.textContent = `${presentIndex + 1} / ${blocks.length}`;
}

function getPresentHTML(block, { showTitle = true } = {}) {
  const title =
    showTitle && block.title ? `<h1 class="present-card-title">${escapeHtml(block.title)}</h1>` : '';
  switch (block.type) {
    case 'image':
      return title + (block.imageData ? `<img src="${block.imageData}" alt="" />` : '<p>No image</p>');
    case 'document': {
      if (!block.docData) return title + '<p>No document attached</p>';
      const name = escapeHtml(block.docName || 'Document');
      if (isPdfDocument(block)) {
        return `${title}<div class="present-doc-pdf"><iframe src="${block.docData}" title="${name}"></iframe></div>`;
      }
      if (isDocxDocument(block) && block.docPreviewHtml) {
        return `${title}
          <div class="present-doc-docx">
            <div class="docx-preview-content">${block.docPreviewHtml}</div>
          </div>
          <p class="present-doc-foot">
            <a class="present-doc-download-secondary" href="${block.docData}" download="${escapeAttr(block.docName || 'document.docx')}">Download original</a>
            <span class="present-doc-foot-note">Layout may differ from Word</span>
          </p>`;
      }
      const kind = getDocKind(block);
      const badge = escapeHtml((kind.key || 'doc').slice(0, 4).toUpperCase());
      return `${title}
        <div class="present-doc-file" style="--doc-color:${kind.color};--doc-bg:${kind.bg}">
          <div class="present-doc-icon">${badge}</div>
          <p class="present-doc-name">${name}</p>
          <p class="present-doc-kind">${escapeHtml(kind.label)}</p>
          <a class="present-doc-download" href="${block.docData}" download="${escapeAttr(block.docName || 'document')}">Download to open</a>
        </div>`;
    }
    case 'link': {
      if (!block.url?.trim()) return title + '<p>No URL set</p>';
      const embedUrl = getLinkEmbedUrl(block.url);
      const openUrl = getLinkOpenUrl(block.url);
      if (embedUrl) {
        return `${title}${getLinkEmbedHTML(embedUrl, openUrl, { present: true })}`;
      }
      return (
        title +
        `<p class="present-link-fallback">This site blocks embedded previews.</p>` +
        (openUrl
          ? `<p><a class="present-doc-download" href="${escapeAttr(openUrl)}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a></p>`
          : '')
      );
    }
    case 'table':
      return title + `<div class="present-body present-body--text">${block.tableHtml || defaultTableHtml()}</div>`;
    case 'list':
      return title + `<div class="present-body present-body--text">${block.content || '<ul><li></li></ul>'}</div>`;
    case 'timer':
      return (
        title +
        `<p class="present-timer" data-present-timer>${formatTimer(getTimerRemainingSec())}</p>`
      );
    case 'whiteboard': {
      let body = '';
      if ((block.blankContent || '').trim()) {
        body += `<div class="present-body present-body--text">${block.blankContent}</div>`;
      }
      if (block.blankDraw) {
        body += `<img class="present-whiteboard-draw" src="${block.blankDraw}" alt="" />`;
      }
      if (!body) body = '<p>Empty whiteboard</p>';
      return title + body;
    }
    case 'heading':
    case 'note':
      return title + `<div class="present-body present-body--text">${block.content || '<p>Empty block</p>'}</div>`;
    default:
      return title + `<div class="present-body present-body--text">${block.content || '<p>Empty block</p>'}</div>`;
  }
}

function presentNext() {
  const blocks = getPresentBlocks();
  if (blocks.length === 0) return;
  presentIndex = (presentIndex + 1) % blocks.length;
  renderPresent();
}

function presentPrev() {
  const blocks = getPresentBlocks();
  if (blocks.length === 0) return;
  presentIndex = (presentIndex - 1 + blocks.length) % blocks.length;
  renderPresent();
}

// --- Present order ---

function normalizePresentOrder() {
  const ids = new Set(state.blocks.map((b) => b.id));
  let order = Array.isArray(state.presentOrder) ? state.presentOrder.filter((id) => ids.has(id)) : [];
  state.blocks.forEach((b) => {
    if (!order.includes(b.id)) order.push(b.id);
  });
  state.presentOrder = order;
}

function getPresentBlocks() {
  normalizePresentOrder();
  return state.presentOrder.map((id) => getBlock(id)).filter(Boolean);
}

function addToPresentOrder(id) {
  normalizePresentOrder();
  if (!state.presentOrder.includes(id)) state.presentOrder.push(id);
}

function removeFromPresentOrder(id) {
  if (!state.presentOrder) return;
  state.presentOrder = state.presentOrder.filter((x) => x !== id);
}

function getBlockOutlineLabel(block) {
  if (block.title?.trim()) return block.title.trim();
  if (block.type === 'heading' || block.type === 'note') {
    const text = (block.content || '').replace(/<[^>]+>/g, '').trim();
    if (text) return text.slice(0, 48);
  }
  const labels = {
    image: 'Image',
    document: block.docName || 'Document',
    link: 'Link',
    list: 'List',
    table: 'Table',
    timer: 'Timer',
    whiteboard: 'Whiteboard',
  };
  return labels[block.type] || 'Card';
}

// --- Timer ---

function formatTimer(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function getTimerRemainingSec() {
  if (timerState.running && timerState.endAt) {
    return Math.max(0, (timerState.endAt - Date.now()) / 1000);
  }
  return timerState.remainingSec;
}

function updateTimerDisplays() {
  const sec = getTimerRemainingSec();
  const text = formatTimer(sec);
  const low = sec > 0 && sec <= 10;

  ['#timerPopoverDisplay', '#timerFloatDisplay'].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('is-low', low);
  });

  $$('.block-timer-time').forEach((el) => {
    el.textContent = text;
  });

  $$('[data-present-timer]').forEach((el) => {
    el.textContent = text;
    el.classList.toggle('is-low', low);
  });

  const float = $('#timerFloat');
  const toolbar = $('.toolbar');
  if (float) {
    const total = state.timerSeconds || 300;
    const showFloat =
      !timerFloatDismissed && (timerState.running || (sec > 0 && sec < total - 0.5));
    float.hidden = !showFloat;
    if (showFloat) float.removeAttribute('hidden');
    else float.setAttribute('hidden', '');
    toolbar?.classList.toggle('has-timer', showFloat);
  }
}

function dismissTimerFloat() {
  timerFloatDismissed = true;
  updateTimerDisplays();
}

function stopTimerTick() {
  if (timerTickInterval) {
    clearInterval(timerTickInterval);
    timerTickInterval = null;
  }
}

function startTimerTick() {
  stopTimerTick();
  timerTickInterval = setInterval(() => {
    const sec = getTimerRemainingSec();
    updateTimerDisplays();
    if (timerState.running && sec <= 0) {
      timerState.running = false;
      timerState.endAt = null;
      timerState.remainingSec = 0;
      stopTimerTick();
      showToast("Time's up!");
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = 880;
        g.gain.value = 0.08;
        o.start();
        setTimeout(() => o.stop(), 200);
      } catch (_) {}
    }
  }, 200);
}

function setTimerDuration(sec) {
  timerState.running = false;
  timerState.endAt = null;
  timerState.remainingSec = sec;
  state.timerSeconds = sec;
  updateTimerDisplays();
  persist();
}

function startTimer() {
  const sec = timerState.running ? getTimerRemainingSec() : timerState.remainingSec;
  if (sec <= 0) return;
  timerFloatDismissed = false;
  timerState.running = true;
  timerState.endAt = Date.now() + sec * 1000;
  $('#timerStart')?.toggleAttribute('hidden', true);
  $('#timerPause')?.removeAttribute('hidden');
  $('#timerFloatPause').textContent = 'Pause';
  startTimerTick();
  updateTimerDisplays();
}

function pauseTimer() {
  if (!timerState.running) return;
  timerState.remainingSec = getTimerRemainingSec();
  timerState.running = false;
  timerState.endAt = null;
  stopTimerTick();
  $('#timerStart')?.removeAttribute('hidden');
  $('#timerPause')?.setAttribute('hidden', '');
  $('#timerFloatPause').textContent = 'Resume';
  updateTimerDisplays();
}

function resetTimer() {
  pauseTimer();
  setTimerDuration(state.timerSeconds || 300);
  $('#timerStart')?.removeAttribute('hidden');
  $('#timerPause')?.setAttribute('hidden', '');
  $('#timerFloatPause').textContent = 'Pause';
}

function toggleTimerPopover() {
  const pop = $('#timerPopover');
  if (!pop) return;
  const open = pop.hidden;
  closeToolbarMenus();
  closeOutline();
  pop.hidden = !open;
  if (open) pop.removeAttribute('hidden');
  else pop.setAttribute('hidden', '');
  if (open) updateTimerDisplays();
  syncToolbarOverlayLock();
}

function initTimerUI() {
  $$('.timer-presets button').forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimerDuration(Number(btn.dataset.seconds) || 300);
      showToast(formatTimer(timerState.remainingSec) + ' set');
    });
  });

  $('#timerCustomMin')?.addEventListener('change', () => {
    const min = Math.max(1, Math.min(120, Number($('#timerCustomMin').value) || 5));
    setTimerDuration(min * 60);
  });

  $('#timerStart')?.addEventListener('click', startTimer);
  $('#timerPause')?.addEventListener('click', pauseTimer);
  $('#timerReset')?.addEventListener('click', resetTimer);
  $('#timerFloatPause')?.addEventListener('click', () => {
    if (timerState.running) pauseTimer();
    else startTimer();
  });
  $('#timerFloatReset')?.addEventListener('click', resetTimer);
  $('#timerFloatClose')?.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissTimerFloat();
  });

  setTimerDuration(state.timerSeconds || 300);
}

function startBlockTimer(block) {
  const sec = block.timerSec || 300;
  setTimerDuration(sec);
  startTimer();
  showToast('Timer started');
}

// --- Blank screen ---

function openBlank(blockId) {
  closeFormatMenu();
  closeOutline();
  const overlay = $('#blankOverlay');
  if (!overlay) return;

  if (blockId) {
    blankBlockId = blockId;
  } else if (selectedId) {
    const sel = getBlock(selectedId);
    blankBlockId = sel?.type === 'whiteboard' ? selectedId : null;
  } else {
    blankBlockId = null;
  }

  overlay.hidden = false;
  overlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  const editor = $('#blankEditor');
  const content = getBlankContent();
  if (editor && editor.innerHTML !== content) editor.innerHTML = content;
  initBlankCanvas();
  requestAnimationFrame(() => {
    resizeBlankCanvas();
    editor?.focus();
  });
}

function closeBlank() {
  const overlay = $('#blankOverlay');
  if (!overlay || overlay.hidden) return;
  const editor = $('#blankEditor');
  if (editor) setBlankContent(editor.innerHTML);
  saveBlankDraw();
  const block = getBlankBlock();
  overlay.hidden = true;
  overlay.setAttribute('hidden', '');
  blankDrawing = false;
  blankBlockId = null;
  blankDrawCtx = null;
  const canvas = $('#blankCanvas');
  if (canvas) delete canvas.dataset.bound;
  document.body.style.overflow = presentOverlay?.hidden !== false ? '' : 'hidden';
  if (block) {
    const el = $(`[data-block-id="${block.id}"]`, canvasInner);
    if (el) updateBlockElement(el, block);
  }
  persist();
}

function setBlankTab(tab) {
  $$('.blank-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.blankTab === tab));
  $$('[data-blank-pane]').forEach((p) => {
    p.hidden = p.dataset.blankPane !== tab;
  });
  if (tab === 'draw') {
    requestAnimationFrame(() => {
      initBlankCanvas();
      resizeBlankCanvas();
    });
  }
}

function blankCanvasPos(canvas, e) {
  const r = canvas.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) return null;
  const t = e.touches?.[0];
  const cx = t ? t.clientX : e.clientX;
  const cy = t ? t.clientY : e.clientY;
  const scaleX = canvas.width / r.width;
  const scaleY = canvas.height / r.height;
  return { x: (cx - r.left) * scaleX, y: (cy - r.top) * scaleY };
}

function initBlankCanvas() {
  const canvas = $('#blankCanvas');
  if (!canvas) return;
  if (!blankDrawCtx) blankDrawCtx = canvas.getContext('2d');
  if (canvas.dataset.bound) return;
  canvas.dataset.bound = '1';

  const down = (e) => {
    if ($('[data-blank-pane="draw"]')?.hidden) return;
    e.preventDefault();
    resizeBlankCanvas();
    const p = blankCanvasPos(canvas, e);
    if (!p || !blankDrawCtx) return;
    blankDrawing = true;
    blankDrawCtx.beginPath();
    blankDrawCtx.moveTo(p.x, p.y);
    canvas.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    if (!blankDrawing || !blankDrawCtx) return;
    const p = blankCanvasPos(canvas, e);
    if (!p) return;
    blankDrawCtx.lineTo(p.x, p.y);
    blankDrawCtx.stroke();
  };

  const up = (e) => {
    if (!blankDrawing) return;
    blankDrawing = false;
    canvas.releasePointerCapture?.(e.pointerId);
    saveBlankDraw();
  };

  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
}

function resizeBlankCanvas() {
  const canvas = $('#blankCanvas');
  if (!canvas) return;
  if (!blankDrawCtx) blankDrawCtx = canvas.getContext('2d');
  const w = Math.max(canvas.clientWidth, 1);
  const h = Math.max(canvas.clientHeight, 1);
  if (w < 2 || h < 2) return;

  let snapshot = null;
  if (canvas.width > 0 && canvas.height > 0) {
    try {
      snapshot = canvas.toDataURL('image/png');
    } catch (_) {}
  } else {
    const saved = getBlankDraw();
    if (saved) snapshot = saved;
  }

  canvas.width = w;
  canvas.height = h;
  blankDrawCtx.lineCap = 'round';
  blankDrawCtx.lineJoin = 'round';
  blankDrawCtx.lineWidth = 4;
  blankDrawCtx.strokeStyle = '#f4f6f8';

  if (snapshot) {
    const img = new Image();
    img.onload = () => blankDrawCtx.drawImage(img, 0, 0, w, h);
    img.src = snapshot;
  }
}

function saveBlankDraw() {
  const canvas = $('#blankCanvas');
  if (!canvas) return;
  try {
    setBlankDraw(canvas.toDataURL('image/png'));
  } catch (_) {}
}

function initBlankUI() {
  $('#blankClearDraw')?.addEventListener('click', () => {
    const canvas = $('#blankCanvas');
    if (!blankDrawCtx || !canvas) return;
    blankDrawCtx.clearRect(0, 0, canvas.width, canvas.height);
    setBlankDraw(null);
  });

  $('#blankClose')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeBlank();
  });
  $$('.blank-tab').forEach((tab) => {
    tab.addEventListener('click', () => setBlankTab(tab.dataset.blankTab));
  });
  $('#blankEditor')?.addEventListener('input', () => {
    setBlankContent($('#blankEditor').innerHTML);
  });
  $('#blankEditor')?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeBlank();
    }
  });
}

// --- Outline ---

function openOutline() {
  const panel = $('#outlinePanel');
  if (!panel) return;
  panel.hidden = false;
  $('#app')?.classList.add('outline-open');
  renderOutline();
}

function closeOutline() {
  $('#outlinePanel').hidden = true;
  $('#app')?.classList.remove('outline-open');
}

function toggleOutline() {
  if ($('#outlinePanel')?.hidden) openOutline();
  else closeOutline();
}

function renderOutline() {
  const list = $('#outlineList');
  if (!list) return;
  normalizePresentOrder();
  list.innerHTML = '';

  state.presentOrder.forEach((id, i) => {
    const block = getBlock(id);
    if (!block) return;
    const li = document.createElement('li');
    li.className = 'outline-item' + (selectedId === id ? ' is-selected' : '');
    li.dataset.blockId = id;
    li.draggable = true;
    li.innerHTML = `<span class="outline-item-num">${i + 1}</span>
      <div class="outline-item-body">
        <p class="outline-item-title">${escapeHtml(getBlockOutlineLabel(block))}</p>
        <p class="outline-item-meta">${escapeHtml(block.type)}</p>
      </div>`;

    li.addEventListener('click', () => {
      selectBlock(id);
      renderOutline();
    });
    li.addEventListener('dblclick', () => openPresent(id));

    li.addEventListener('dragstart', (e) => {
      outlineDragId = id;
      li.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    li.addEventListener('dragend', () => {
      outlineDragId = null;
      li.classList.remove('is-dragging');
    });
    li.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    li.addEventListener('drop', (e) => {
      e.preventDefault();
      const targetId = li.dataset.blockId;
      if (!outlineDragId || outlineDragId === targetId) return;
      const from = state.presentOrder.indexOf(outlineDragId);
      const to = state.presentOrder.indexOf(targetId);
      if (from < 0 || to < 0) return;
      state.presentOrder.splice(from, 1);
      state.presentOrder.splice(to, 0, outlineDragId);
      persist();
      renderOutline();
    });

    list.appendChild(li);
  });
}

function initOutlineUI() {
  $('#outlineClose')?.addEventListener('click', closeOutline);
}

// --- Align ---

function updateAlignToolbar() {
  const section = $('#toolsAlignSection');
  if (!section) return;
  section.hidden = !selectedId;
  if (!selectedId) section.setAttribute('hidden', '');
  else section.removeAttribute('hidden');
}

function getCanvasAlignBounds() {
  const pad = LAYOUT_PAD;
  let maxX = 800;
  let maxY = 600;
  state.blocks.forEach((b) => {
    maxX = Math.max(maxX, b.x + b.w + pad);
    maxY = Math.max(maxY, b.y + b.h + pad);
  });
  const viewW = canvasWrap?.clientWidth || maxX;
  const viewH = canvasWrap?.clientHeight || maxY;
  return {
    minX: pad,
    minY: pad,
    maxX: Math.max(pad, maxX - pad),
    maxY: Math.max(pad, maxY - pad),
    viewW,
    viewH,
  };
}

function alignSelected(mode) {
  const block = selectedId ? getBlock(selectedId) : null;
  if (!block) return;
  const b = getCanvasAlignBounds();

  switch (mode) {
    case 'left':
      block.x = b.minX;
      break;
    case 'right':
      block.x = Math.max(b.minX, b.maxX - block.w);
      break;
    case 'center-h':
      block.x = Math.max(b.minX, b.minX + (b.maxX - b.minX - block.w) / 2);
      break;
    case 'top':
      block.y = b.minY;
      break;
    case 'bottom':
      block.y = Math.max(b.minY, b.maxY - block.h);
      break;
    case 'center-v':
      block.y = Math.max(b.minY, b.minY + (b.maxY - b.minY - block.h) / 2);
      break;
    default:
      return;
  }

  block.x = Math.round(block.x / GRID_SIZE) * GRID_SIZE;
  block.y = Math.round(block.y / GRID_SIZE) * GRID_SIZE;
  state.layoutMode = null;
  setLayoutSelectValue('free');
  const el = $(`[data-block-id="${block.id}"]`, canvasInner);
  if (el) positionBlock(el, block);
  persist();
  showToast('Aligned');
}

function initAlignUI() {
  $$('[data-align]').forEach((btn) => {
    btn.addEventListener('click', () => alignSelected(btn.dataset.align));
  });
}

// --- Save / load ---

function newBoard() {
  if (state.blocks.length && !confirm('Start a new board? Your current cards will be cleared.')) {
    return;
  }

  closePresent();
  closeFormatMenu();
  closeAllDropdowns();

  closeBlank();
  closeOutline();
  resetTimer();

  state = normalizeBoardState({
    title: DEFAULTS.title,
    background: DEFAULTS.background,
    layoutMode: null,
    blocks: [],
    presentOrder: [],
    blankContent: '',
    blankDraw: null,
    timerSeconds: 300,
  });

  selectedId = null;
  layoutUndoStack = [];
  updateUndoButton();
  setLayoutSelectValue('free');
  syncBoardTitle();
  applyBackground();
  render();
  persist();
  showToast('New board');
}

function buildBoardExportJson() {
  const data = {
    version: VERSION,
    exportedAt: new Date().toISOString(),
    title: getBoardTitle(),
    background: state.background,
    layoutMode: state.layoutMode || null,
    blocks: state.blocks,
    presentOrder: state.presentOrder,
    blankContent: state.blankContent,
    blankDraw: state.blankDraw,
    timerSeconds: state.timerSeconds,
  };
  return JSON.stringify(data, null, 2);
}

function getBoardTitle() {
  const fromInput = boardTitle?.value?.trim();
  return fromInput || state.title?.trim() || DEFAULTS.title;
}

function suggestedExportFilename() {
  const base = sanitizeFilename(getBoardTitle());
  return `${base}.prez.json`;
}

function downloadBoardFile(json, filename) {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function canUseSaveFilePicker() {
  return window.isSecureContext && typeof window.showSaveFilePicker === 'function';
}

async function writeBoardToFileHandle(handle) {
  const writable = await handle.createWritable();
  await writable.write(buildBoardExportJson());
  await writable.close();
}

function saveBoardToDownloads(filename, toastMsg) {
  downloadBoardFile(buildBoardExportJson(), filename);
  showToast(toastMsg);
}

function onSavePickerError(err, filename) {
  if (err?.name === 'AbortError') return;
  console.warn('Save As failed:', err);
  if (err?.name === 'SecurityError') {
    showToast('Save dialog blocked — click Save as… again');
    return;
  }
  saveBoardToDownloads(
    filename,
    `Saved to Downloads (${err?.name || 'dialog unavailable'})`
  );
}

/** Must run synchronously inside the Save as… click handler. */
function beginSaveBoardAs() {
  const suggestedName = suggestedExportFilename();

  if (!window.isSecureContext) {
    saveBoardToDownloads(
      suggestedName,
      'Saved to Downloads — use http://localhost or https:// for Save As'
    );
    return;
  }

  if (typeof window.showSaveFilePicker !== 'function') {
    saveBoardToDownloads(
      suggestedName,
      'Saved to Downloads — use Chrome or Edge for Save As'
    );
    return;
  }

  let pickerPromise;
  try {
    pickerPromise = window.showSaveFilePicker({ suggestedName });
  } catch (err) {
    onSavePickerError(err, suggestedName);
    return;
  }

  pickerPromise
    .then((handle) => writeBoardToFileHandle(handle))
    .then(() => showToast('Board saved'))
    .catch((err) => onSavePickerError(err, suggestedName));
}

function saveBoardAs() {
  beginSaveBoardAs();
}

function exportBoard() {
  beginSaveBoardAs();
}

function importBoard(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      state = normalizeBoardState({
        title: data.title || DEFAULTS.title,
        background: data.background || DEFAULTS.background,
        layoutMode: data.layoutMode || null,
        blocks: data.blocks || [],
        presentOrder: data.presentOrder,
        blankContent: data.blankContent,
        blankDraw: data.blankDraw,
        timerSeconds: data.timerSeconds,
      });
      setTimerDuration(state.timerSeconds || 300);
      selectedId = null;
      layoutUndoStack = [];
      updateUndoButton();
      setLayoutSelectValue(state.layoutMode || 'free');
      syncBoardTitle();
      render();
      scheduleDocxBackfill();
      showToast('Board opened');
    } catch {
      showToast('Could not read file');
    }
  };
  reader.readAsText(file);
}

function sanitizeFilename(name) {
  return (name || 'board').replace(/[^\w\s-]/g, '').trim().slice(0, 60) || 'board';
}

// --- Background picker ---

function initBackgroundPicker() {
  const grid = $('#bgGrid');
  if (!grid) return;
  BACKGROUNDS.forEach((bg) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'bg-swatch';
    swatch.style.background = bg.style;
    swatch.title = bg.id;
    if (state.background === bg.style) swatch.classList.add('is-active');
    swatch.addEventListener('click', () => {
      $$('.bg-swatch', grid).forEach((s) => s.classList.remove('is-active'));
      swatch.classList.add('is-active');
      state.background = bg.style;
      applyBackground();
      persist();
    });
    grid.appendChild(swatch);
  });
}

// --- Utils ---

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

// --- Init UI ---

function openBgDialog() {
  const dialog = $('#bgDialog');
  if (!dialog) {
    showToast('Background dialog missing');
    return;
  }
  try {
    dialog.showModal();
  } catch (err) {
    console.error(err);
    showToast('Could not open background picker');
  }
}

function openAddDialog() {
  const dialog = $('#addDialog');
  if (!dialog) return;
  try {
    dialog.showModal();
  } catch (err) {
    console.error(err);
    showToast('Could not open add dialog');
  }
}

function openFilePicker() {
  const input = $('#fileInput');
  if (!input) {
    showToast('Open not available');
    return;
  }
  input.click();
}

function bindToolbar() {
  initToolbarMenus();

  boardTitle?.addEventListener('input', () => {
    state.title = boardTitle.value.trim() || DEFAULTS.title;
    persist();
  });
  boardTitle?.addEventListener('blur', () => {
    state.title = boardTitle.value.trim() || DEFAULTS.title;
    syncBoardTitle();
    persist();
  });

  $('#fabAdd')?.addEventListener('click', openAddDialog);
  $('#btnBg')?.addEventListener('click', openBgDialog);
  $('#fileInput')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) importBoard(file);
    e.target.value = '';
  });
  $('#btnPresent')?.addEventListener('click', () => {
    const blocks = getPresentBlocks();
    if (blocks.length) openPresent(selectedId && blocks.some((b) => b.id === selectedId) ? selectedId : blocks[0].id);
    else showToast('Add a block first');
  });

  $$('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('dialog')?.close());
  });

  $('#bgDialog')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = $('#bgCustomUrl').value.trim();
    if (url) {
      state.background = `url("${url.replace(/"/g, '')}")`;
      applyBackground();
      persist();
    }
    $('#bgDialog').close();
  });

  $$('.type-card').forEach((card) => {
    card.addEventListener('click', () => {
      addBlock(card.dataset.type);
      $('#addDialog').close();
    });
  });
}

function hideAllOverlays() {
  ['#presentOverlay', '#timerFloat', '#blankOverlay', '#outlinePanel', '#timerPopover'].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.hidden = true;
    el.setAttribute('hidden', '');
  });
}

function init() {
  hideAllOverlays();
  bindToolbar();

  try {
    initBackgroundPicker();
    initTimerUI();
    initBlankUI();
    initOutlineUI();
    initAlignUI();
    initFormatMenu();
    setLayoutSelectValue(state.layoutMode || 'free');
    render();
    scheduleDocxBackfill();
    updateTimerDisplays();
  } catch (err) {
    console.error('Prez failed while loading board UI', err);
    showToast('Board had trouble loading — toolbar still works');
  }

  let layoutResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(layoutResizeTimer);
    layoutResizeTimer = setTimeout(() => {
      if (state.layoutMode && state.blocks.length) {
        arrangeBlocks(state.layoutMode);
        resizeCanvasToContent();
        render();
      } else {
        resizeCanvasToContent();
      }
    }, 220);
  });

  $('#presentClose')?.addEventListener('click', closePresent);
  $('#presentPrev')?.addEventListener('click', presentPrev);
  $('#presentNext')?.addEventListener('click', presentNext);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!$('#blankOverlay')?.hidden) {
        closeBlank();
        return;
      }
      if (!$('#outlinePanel')?.hidden) {
        closeOutline();
        return;
      }
      if (presentOverlay && !presentOverlay.hidden) {
        if (presentExpanded) {
          setPresentExpanded(false);
        } else {
          closePresent();
        }
      }
      closeAllDropdowns();
      closeToolbarMenus();
    }
    if (e.key === 'b' && !e.target.matches('input, [contenteditable], select')) {
      e.preventDefault();
      openBlank();
    }
    if (e.key === 't' && !e.target.matches('input, [contenteditable], select')) {
      e.preventDefault();
      toggleTimerPopover();
    }
    if (e.key === 'o' && !e.target.matches('input, [contenteditable], select')) {
      e.preventDefault();
      toggleOutline();
    }
    if (presentOverlay && !presentOverlay.hidden) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        presentNext();
      }
      if (e.key === 'ArrowLeft') presentPrev();
    }
    if (e.key === 'p' && !e.target.matches('input, [contenteditable], select')) {
      const blocks = getPresentBlocks();
      if (blocks.length) {
        const id = selectedId && blocks.some((b) => b.id === selectedId) ? selectedId : blocks[0].id;
        openPresent(id);
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && !e.target.matches('input, [contenteditable]')) {
      e.preventDefault();
      undoLayout();
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && !e.target.matches('input, [contenteditable]')) {
      removeFromPresentOrder(selectedId);
      state.blocks = state.blocks.filter((b) => b.id !== selectedId);
      selectedId = null;
      render();
      showToast('Block deleted');
    }
  });

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.toolbar-format-wrap') &&
      !e.target.closest('.toolbar-tools-wrap') &&
      !e.target.closest('.toolbar-file-wrap')
    ) {
      closeToolbarMenus();
    }
    if (!e.target.closest('.block-header-actions')) {
      closeAllDropdowns();
    }
    if (
      !e.target.closest('.block') &&
      !e.target.closest('.fab') &&
      !e.target.closest('dialog') &&
      !e.target.closest('.toolbar-timer') &&
      !e.target.closest('#timerFloat')
    ) {
      clearBlockSelection();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && presentOverlay && !presentOverlay.hidden) {
      // keep overlay visible even if fullscreen exits
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
