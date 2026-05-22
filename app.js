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
  { type: 'bloom', icon: '△', label: "Bloom's taxonomy", iconClass: 'bloom' },
  { type: 'brainbreak', icon: '⚡', label: 'Brain break', iconClass: 'brainbreak' },
  { type: 'document', icon: '📄', label: 'Document', iconClass: 'document' },
  { type: 'heading', icon: 'H', label: 'Heading', iconClass: 'heading' },
  { type: 'image', icon: '▣', label: 'Image', iconClass: 'image' },
  { type: 'link', icon: '🔗', label: 'Link', iconClass: 'link' },
  { type: 'list', icon: '≡', label: 'List', iconClass: 'list' },
  { type: 'note', icon: 'Aa', label: 'Note', iconClass: 'note' },
  { type: 'poll', icon: '◉', label: 'Poll', iconClass: 'poll' },
  { type: 'sticky', icon: '▪', label: 'Quick sticky', iconClass: 'sticky' },
  { type: 'quiz', icon: '?', label: 'Quiz', iconClass: 'quiz' },
  { type: 'table', icon: '⊞', label: 'Table', iconClass: 'table' },
  { type: 'timer', icon: '⏱', label: 'Timer', iconClass: 'timer' },
  { type: 'whiteboard', icon: '▢', label: 'Whiteboard', iconClass: 'whiteboard' },
  { type: 'worldmap', icon: '🌍', label: 'World map', iconClass: 'worldmap' },
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

/** Gallery walk — PDF first for clearer file-picker filtering */
const GALLERY_DOC_ACCEPT =
  '.pdf,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt,.ods,.odp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const MAX_DOCUMENT_BYTES = 12 * 1024 * 1024;
const MAX_BACKGROUND_BYTES = 5 * 1024 * 1024;

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
  mindMapCenterId: null,
  mindMapBranchSize: 'm',
  mindMapOrbitRadius: null,
  boardTemplate: null,
  gridWall: null,
  defaultAccent: null,
  presentUseBoardBackground: false,
  presentUseCardColour: false,
};

const MIND_MAP_SIZES = {
  s: { w: 268, h: 172 },
  m: { w: 340, h: 215 },
  l: { w: 400, h: 258 },
};
const MIND_MAP_BRANCH = { w: MIND_MAP_SIZES.m.w, h: MIND_MAP_SIZES.m.h, accent: 'gold' };
const MIND_MAP_HUB = { w: 480, h: 220, accent: 'ocean' };
/** Gap from hub edge to the anchor ring (all branch counts). */
const MIND_MAP_RING_GAP = 18;
const ASSESSMENT_STAGE_HEADERS = [
  'Understand the task',
  'Plan your approach',
  'Gather evidence / resources',
  'Draft your response',
  'Check against the criteria',
];

let pendingTemplateApply = null;

/** Bloom's taxonomy — top (Create) to bottom (Remember). */
const BLOOM_LEVELS_DEFAULT = [
  {
    name: 'Create',
    description: 'Produce new or original work',
    verbs: [
      'design',
      'assemble',
      'construct',
      'conjecture',
      'develop',
      'formulate',
      'author',
      'investigate',
    ],
    header: '#b91c4a',
    surface: '#fecdd3',
    label: '#9f1239',
  },
  {
    name: 'Evaluate',
    description: 'Justify a stand or decision',
    verbs: ['appraise', 'argue', 'defend', 'judge', 'select', 'support', 'value', 'critique', 'weigh'],
    header: '#c2410c',
    surface: '#fed7aa',
    label: '#9a3412',
  },
  {
    name: 'Analyse',
    description: 'Draw connections among ideas',
    verbs: [
      'differentiate',
      'organise',
      'relate',
      'compare',
      'contrast',
      'distinguish',
      'examine',
      'experiment',
      'question',
      'test',
    ],
    header: '#ca8a04',
    surface: '#fef08a',
    label: '#854d0e',
  },
  {
    name: 'Apply',
    description: 'Use information in new situations',
    verbs: [
      'execute',
      'implement',
      'solve',
      'use',
      'demonstrate',
      'interpret',
      'operate',
      'schedule',
      'sketch',
    ],
    header: '#65a30d',
    surface: '#d9f99d',
    label: '#3f6212',
  },
  {
    name: 'Understand',
    description: 'Explain ideas or concepts',
    verbs: [
      'classify',
      'describe',
      'discuss',
      'explain',
      'identify',
      'locate',
      'recognise',
      'report',
      'select',
      'translate',
    ],
    header: '#0284c7',
    surface: '#bae6fd',
    label: '#075985',
  },
  {
    name: 'Remember',
    description: 'Recall facts and basic concepts',
    verbs: ['define', 'duplicate', 'list', 'memorise', 'repeat', 'state'],
    header: '#1d4ed8',
    surface: '#bfdbfe',
    label: '#1e3a8a',
  },
];

function getBrainBreakLibrary() {
  return window.PREZ_BRAIN_BREAK_ROUTINES || [];
}

function brainBreakLibraryAsCategories() {
  return getBrainBreakLibrary().map((group) => ({
    name: group.category,
    hint: group.hint,
    accent: group.accent,
    surface: group.surface,
    activities: (group.activities || []).map((a) => ({ title: a.title, detail: a.detail })),
  }));
}

const TEXT_CARD_TYPES = new Set(['heading', 'note', 'list']);
const TEXT_CARD_ALIGNS = ['left', 'center', 'right'];
const TEXT_CARD_SIZES = ['sm', 'md', 'lg'];
const TEXT_CARD_ALIGN_LABELS = { left: 'Left', center: 'Centre', right: 'Right' };
const TEXT_CARD_SIZE_LABELS = { sm: 'S', md: 'M', lg: 'L' };
const FOOTER_ALIGN_ICON_ATTRS =
  'width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"';
const TEXT_CARD_ALIGN_ICONS = {
  left: `<svg ${FOOTER_ALIGN_ICON_ATTRS}><path d="M4 6h16M4 12h10M4 18h14"/></svg>`,
  center: `<svg ${FOOTER_ALIGN_ICON_ATTRS}><path d="M4 6h16M7 12h10M6 18h14"/></svg>`,
  right: `<svg ${FOOTER_ALIGN_ICON_ATTRS}><path d="M4 6h16M14 12h6M10 18h10"/></svg>`,
};

let timerState = { running: false, endAt: null, remainingSec: 300 };
let timerFloatDismissed = false;
let state = loadState();
let selectedId = null;
let dragState = null;
let resizeState = null;
let presentIndex = 0;
let presentExpanded = false;
let presentRevealBlockId = null;
let presentListRevealCount = 1;
let presentQuizRevealBlockId = null;
let presentQuizQuestionIndex = 0;
let presentQuizQuestionAnswered = false;
let presentQuizPickedIndex = null;
let presentBrainBreakRevealBlockId = null;
let presentBrainBreakIndex = 0;
let presentMapRevealBlockId = null;
let presentMapPinCount = 1;
let timerTickInterval = null;
let blankDrawCtx = null;
let blankDrawing = false;
let blankBlockId = null;
let blankDrawTool = 'pen';
let blankDrawColor = '#f4f6f8';
let blankDrawSize = 'm';
const blankDrawUndoStack = [];
let blankStrokeBefore = null;
let blankStrokeMoved = false;
let blankDrawUndoBusy = false;
/** Block id (or null for tools blank) that the canvas pixel buffer belongs to. */
let blankCanvasOwnerId = null;
/** True after the user changes the drawing (skip save on close if still false). */
let blankDrawDirty = false;
/** Whiteboard workspace mounted inside Present (type / table / draw). */
let presentWhiteboardMounted = false;

const BLANK_DRAW_WIDTHS = { s: 3, m: 6, l: 12 };
const BLANK_DRAW_UNDO_MAX = 24;
let outlineDragId = null;

const PRESENT_EXPAND_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l16-16M20 4h-6M20 4v6"/></svg>`;
const PRESENT_RESTORE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 15L4 20M4 20h5M4 20v-5M15 9l5-5M20 4h-5M20 4v5"/></svg>`;

const FOOTER_SVG_ATTRS =
  'width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const FOOTER_ICON_PRESENT = `<svg ${FOOTER_SVG_ATTRS}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;
const FOOTER_ICON_IMAGE = `<svg ${FOOTER_SVG_ATTRS}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 17l-5.5-5.5a2 2 0 0 0-2.8 0L3 19"/></svg>`;
const FOOTER_ICON_REPLACE = `<svg ${FOOTER_SVG_ATTRS}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>`;
const FOOTER_ICON_REMOVE = `<svg ${FOOTER_SVG_ATTRS}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

function getPresentFooterButtonHTML(block) {
  if (block?.galleryStation) return '';
  return `<button type="button" class="btn-present-block block-footer-btn-icon" data-action="present" title="Present (P)" aria-label="Present">${FOOTER_ICON_PRESENT}</button>`;
}

function getImageAddFooterHTML() {
  return `<label class="block-footer-btn block-footer-btn-icon" title="Add image" aria-label="Add image"><input type="file" accept="image/*" data-field="image" hidden />${FOOTER_ICON_IMAGE}</label>`;
}

function getImageReplaceFooterHTML() {
  return `<label class="block-footer-btn block-footer-btn-icon block-footer-btn-replace" title="Replace image" aria-label="Replace image"><input type="file" accept="image/*" data-field="image" hidden />${FOOTER_ICON_REPLACE}</label>`;
}

function getImageRemoveFooterHTML() {
  return `<button type="button" class="block-footer-btn block-footer-btn-icon" data-action="remove-image" title="Remove image" aria-label="Remove image">${FOOTER_ICON_REMOVE}</button>`;
}

function blockUsesTextStyle(block) {
  return TEXT_CARD_TYPES.has(block?.type);
}

function normalizeTextCardStyle(block) {
  if (!blockUsesTextStyle(block)) return;
  if (!block.textAlign && block.headingAlign) block.textAlign = block.headingAlign;
  if (!block.textSize && block.headingSize) block.textSize = block.headingSize;
  if (!TEXT_CARD_ALIGNS.includes(block.textAlign)) block.textAlign = 'left';
  if (!TEXT_CARD_SIZES.includes(block.textSize)) block.textSize = 'md';
}

function getTextCardStyleClassList(block) {
  normalizeTextCardStyle(block);
  return `text-align-${block.textAlign} text-size-${block.textSize}`;
}

function getPresentTextCardStyleClasses(block) {
  if (!blockUsesTextStyle(block)) return '';
  normalizeTextCardStyle(block);
  return ` present-text-align-${block.textAlign} present-text-size-${block.textSize}`;
}

function syncTextCardStyleOnBlock(el, block) {
  if (!blockUsesTextStyle(block)) return;
  const parts = getTextCardStyleClassList(block).split(' ');
  const strip = [
    ...TEXT_CARD_ALIGNS.map((a) => `text-align-${a}`),
    ...TEXT_CARD_SIZES.map((s) => `text-size-${s}`),
    ...TEXT_CARD_ALIGNS.map((a) => `heading-align-${a}`),
    ...TEXT_CARD_SIZES.map((s) => `heading-size-${s}`),
  ];
  $$('.block-title-input, .block-content', el).forEach((node) => {
    strip.forEach((c) => node.classList.remove(c));
    parts.forEach((c) => node.classList.add(c));
  });
}

function getTextCardStyleFooterHTML(block) {
  normalizeTextCardStyle(block);
  const alignBtns = TEXT_CARD_ALIGNS.map(
    (a) =>
      `<button type="button" class="block-footer-segment-btn block-footer-segment-btn--icon${block.textAlign === a ? ' is-active' : ''}" data-action="text-align" data-text-align="${a}" title="${TEXT_CARD_ALIGN_LABELS[a]}" aria-label="${TEXT_CARD_ALIGN_LABELS[a]}" aria-pressed="${block.textAlign === a ? 'true' : 'false'}">${TEXT_CARD_ALIGN_ICONS[a]}</button>`
  ).join('');
  const sizeBtns = TEXT_CARD_SIZES.map(
    (s) =>
      `<button type="button" class="block-footer-segment-btn${block.textSize === s ? ' is-active' : ''}" data-action="text-size" data-text-size="${s}" aria-pressed="${block.textSize === s ? 'true' : 'false'}">${TEXT_CARD_SIZE_LABELS[s]}</button>`
  ).join('');
  return `<div class="block-footer-segment" role="group" aria-label="Alignment">${alignBtns}</div>
    <div class="block-footer-segment" role="group" aria-label="Text size">${sizeBtns}</div>`;
}

const TABLE_CELL_ALIGNS = ['left', 'center', 'right'];

function getTableColumnCountFromHtml(html) {
  if (!html?.trim()) return 0;
  const div = document.createElement('div');
  div.innerHTML = html;
  const table = div.querySelector('table');
  if (!table) return 0;
  const headerRow = getTableHeaderRow(table);
  return headerRow ? getTableRowCells(headerRow).length : 0;
}

function normalizeTableColAligns(block) {
  if (block?.type !== 'table') return;
  const count = getTableColumnCountFromHtml(block.tableHtml || defaultTableHtml());
  if (!count) {
    delete block.tableColAligns;
    return;
  }
  let aligns = Array.isArray(block.tableColAligns) ? block.tableColAligns.filter((a) => typeof a === 'string') : [];
  if (!aligns.length) {
    aligns = Array(count).fill('left');
    aligns[0] = 'center';
  }
  while (aligns.length < count) aligns.push('left');
  aligns.length = count;
  block.tableColAligns = aligns.map((a, i) =>
    TABLE_CELL_ALIGNS.includes(a) ? a : i === 0 ? 'center' : 'left'
  );
}

function getTableColAlignClassList(aligns) {
  return (aligns || [])
    .map((a, i) => (TABLE_CELL_ALIGNS.includes(a) ? `table-cell-col-${i}-${a}` : ''))
    .filter(Boolean)
    .join(' ');
}

function stripTableColAlignClasses(className) {
  return (className || '')
    .split(/\s+/)
    .filter((c) => c && !/^table-cell-col-\d+-/.test(c))
    .join(' ');
}

function applyTableColAlignClassesToTable(table, block) {
  if (!table) return;
  normalizeTableColAligns(block);
  const aligns = block.tableColAligns || [];
  table.className = stripTableColAlignClasses(table.className);
  const extra = getTableColAlignClassList(aligns);
  if (extra) table.className = `${table.className} ${extra}`.trim();
}

function applyTableColAlignsToHtml(block, html) {
  if (!html?.trim()) return html;
  normalizeTableColAligns(block);
  const extra = getTableColAlignClassList(block.tableColAligns);
  if (!extra) return html;
  return html.replace(/<table(\s[^>]*)?>/i, (match) => {
    if (/class="/i.test(match)) {
      return match.replace(/class="([^"]*)"/i, (_, cls) => {
        const cleaned = stripTableColAlignClasses(cls);
        return `class="${`${cleaned} ${extra}`.trim()}"`;
      });
    }
    return match.replace('<table', `<table class="block-table ${extra}"`);
  });
}

function syncTableColAlignOnBlock(el, block) {
  if (!el || block?.type !== 'table') return;
  applyTableColAlignClassesToTable($('.block-table', el), block);
}

function getTableColAlignFooterHTML(block) {
  normalizeTableColAligns(block);
  const col0 = block.tableColAligns?.[0] || 'left';
  const alignBtns = TABLE_CELL_ALIGNS.map(
    (a) =>
      `<button type="button" class="block-footer-segment-btn block-footer-segment-btn--icon${col0 === a ? ' is-active' : ''}" data-action="table-col-align" data-col-index="0" data-text-align="${a}" title="Column 1: ${TEXT_CARD_ALIGN_LABELS[a]}" aria-label="Column 1: ${TEXT_CARD_ALIGN_LABELS[a]}" aria-pressed="${col0 === a ? 'true' : 'false'}">${TEXT_CARD_ALIGN_ICONS[a]}</button>`
  ).join('');
  return `<div class="block-footer-segment block-footer-segment--table-col" role="group" aria-label="First column alignment">
    <span class="block-footer-segment-prefix" aria-hidden="true">Col 1</span>${alignBtns}</div>`;
}

function getListRevealFooterHTML(block) {
  const on = listUsesRevealInPresent(block);
  return `<div class="block-footer-reveal block-footer-reveal--compact" title="${on ? 'Reveal bullets one at a time in Present' : 'Show all bullets at once in Present'}">
    <span class="block-footer-reveal-label block-footer-reveal-label--stacked" aria-hidden="true"><span>Bullet</span><span>reveal</span></span>
    <button type="button" class="block-footer-toggle block-footer-toggle--compact${on ? ' is-on' : ''}" role="switch" aria-checked="${on ? 'true' : 'false'}" aria-label="Bullet reveal in Present" data-action="toggle-list-reveal">
      <span class="block-footer-toggle-track" aria-hidden="true"><span class="block-footer-toggle-thumb"></span></span>
    </button>
  </div>`;
}
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
let hotInsertUndoStack = [];
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
    normalizePollData(b);
    normalizeQuizData(b);
    normalizeBrainBreakData(b);
    normalizeWorldMapData(b);
    normalizeTextCardStyle(b);
    if (b.type === 'table') normalizeTableColAligns(b);
    if (b.type === 'whiteboard' && !b.blankDraw) b.blankDraw = null;
    else if (b.type === 'whiteboard' && b.blankDraw === '') b.blankDraw = null;
  });
  merged.presentOrder = order;
  merged.blankContent = merged.blankContent || '';
  merged.blankDraw = merged.blankDraw || null;
  merged.timerSeconds = merged.timerSeconds || 300;
  merged.mindMapCenterId = merged.mindMapCenterId || null;
  if (merged.mindMapCenterId && !ids.has(merged.mindMapCenterId)) {
    merged.mindMapCenterId = null;
  }
  merged.mindMapBranchSize =
    merged.mindMapBranchSize && MIND_MAP_SIZES[merged.mindMapBranchSize] ? merged.mindMapBranchSize : 'm';
  merged.mindMapOrbitRadius =
    typeof merged.mindMapOrbitRadius === 'number' && merged.mindMapOrbitRadius > 0
      ? merged.mindMapOrbitRadius
      : null;
  merged.boardTemplate = merged.boardTemplate || null;
  merged.gridWall = normalizeGridWallState(merged.gridWall);
  if (merged.gridWall && !merged.boardTemplate) {
    merged.boardTemplate = merged.gridWall.variant;
  }
  if (merged.defaultAccent && !ACCENTS.includes(merged.defaultAccent)) {
    merged.defaultAccent = null;
  }
  merged.presentUseBoardBackground = !!merged.presentUseBoardBackground;
  merged.presentUseCardColour = !!merged.presentUseCardColour;
  timerState.remainingSec = merged.timerSeconds;
  return merged;
}

function getDefaultBlockAccent() {
  if (state.defaultAccent && ACCENTS.includes(state.defaultAccent)) {
    return state.defaultAccent;
  }
  return ACCENTS[state.blocks.length % ACCENTS.length];
}

/** Remember the first swatch the teacher picks on this board for new cards. */
function rememberBoardAccent(accent) {
  if (!accent || !ACCENTS.includes(accent) || state.defaultAccent) return;
  state.defaultAccent = accent;
  persist();
}

function getBoardGlobalAccent() {
  if (!state.blocks.length) return state.defaultAccent || null;
  const first = state.blocks[0].accent;
  if (!first || !ACCENTS.includes(first)) return state.defaultAccent || null;
  const allSame = state.blocks.every((b) => b.accent === first);
  return allSame ? first : state.defaultAccent || null;
}

function applyGlobalAccent(accent) {
  if (!accent || !ACCENTS.includes(accent)) return;
  state.defaultAccent = accent;
  state.blocks.forEach((b) => {
    b.accent = accent;
  });
  syncFormatMenuGlobalColors();
  persist();
  render();
  const label = accent.endsWith('-p') ? accent.replace('-p', ' (pastel)') : accent;
  showToast(`All cards: ${label}`);
}

function syncFormatMenuGlobalColors() {
  if (!formatMenu) return;
  const active = getBoardGlobalAccent();
  $$('[data-global-color]', formatMenu).forEach((dot) => {
    dot.classList.toggle('is-active', dot.dataset.globalColor === active);
  });
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
  } else {
    canvas.style.backgroundSize = '';
    canvas.style.backgroundPosition = '';
  }
  applyPresentBackground();
}

function applyPresentBackground() {
  if (!presentOverlay) return;
  const useBoardBg = !!state.presentUseBoardBackground;
  presentOverlay.classList.toggle('present-overlay--board-bg', useBoardBg);
  if (!useBoardBg) {
    presentOverlay.style.background = '';
    presentOverlay.style.backgroundSize = '';
    presentOverlay.style.backgroundPosition = '';
    return;
  }
  presentOverlay.style.background = state.background;
  if (state.background.startsWith('url(')) {
    presentOverlay.style.backgroundSize = 'cover';
    presentOverlay.style.backgroundPosition = 'center';
  } else {
    presentOverlay.style.backgroundSize = '';
    presentOverlay.style.backgroundPosition = '';
  }
}

function syncBoardTitle() {
  if (document.activeElement !== boardTitle) {
    boardTitle.value = state.title;
  }
}

function isGridWallBoard() {
  return !!state.gridWall && (state.boardTemplate === 'task-collaboration-wall' || state.boardTemplate === 'feedback-reflection-wall');
}

function render() {
  syncBoardTitle();
  applyBackground();
  syncGridWallChrome();

  if (isGridWallBoard()) {
    renderGridWallBoard();
    syncMindMapSizeControls();
    return;
  }
  hideGridWallSurface();

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
  syncMindMapSizeControls();
  resizeCanvasToContent();
  updateAlignToolbar();
  syncBoardTemplateBar();
  if (!$('#outlinePanel')?.hidden) renderOutline();
  refreshAllTableColumnResizes();
  persist();
}

function updateEmptyState() {
  let empty = $('.canvas-empty', canvasInner);
  if (state.blocks.length === 0) {
    if (!empty) {
      empty = document.createElement('div');
      empty.className = 'canvas-empty';
      empty.innerHTML = '<h2>Your board is empty</h2><p>Click <strong>+</strong> to add your first block</p>';
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

function clearAccentStyles(el) {
  if (!el) return;
  el.removeAttribute('data-accent');
  el.removeAttribute('data-accent-light');
  el.style.removeProperty('--accent-solid');
  el.style.removeProperty('--accent-surface');
  el.style.removeProperty('--accent-header');
}

function applyPresentCardAccent(card, block) {
  if (!card) return;
  if (!state.presentUseCardColour) {
    clearAccentStyles(card);
    return;
  }
  applyAccentStyles(card, block?.accent);
}

function positionBlock(el, block) {
  el.style.left = block.x + 'px';
  el.style.top = block.y + 'px';
  el.style.width = block.w + 'px';
  el.style.height = block.h + 'px';
  el.style.zIndex = block.z || 1;
  applyAccentStyles(el, block.accent);
  if (block.id === state.mindMapCenterId) syncMindMapSizeControls();
}

function createBlockElement(block) {
  const el = document.createElement('article');
  el.className = 'block';
  if (state.mindMapCenterId && block.id === state.mindMapCenterId) {
    el.classList.add('block--mind-map-hub');
  }
  if (block.galleryStation) el.classList.add('block--gallery-station');
  if (block.assessmentTask) el.classList.add('block--assessment-task');
  if (block.assessmentStage) el.classList.add('block--assessment-stage');
  if (block.reflectionColumn) el.classList.add('block--reflection-column');
  if (block.type === 'sticky') el.classList.add('block--sticky');
  el.dataset.blockId = block.id;
  el.dataset.blockType = block.type;
  el.setAttribute('role', 'article');
  el.tabIndex = -1;

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
      ${getPresentFooterButtonHTML(block)}
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

function syncFormatMenuPresentToggle(selector, on) {
  const btn = formatMenu?.querySelector(selector);
  if (!btn) return;
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  btn.classList.toggle('is-on', on);
  const thumb = btn.querySelector('.format-menu-present-switch');
  thumb?.classList.toggle('is-on', on);
}

function syncFormatMenuPresentOptions() {
  syncFormatMenuPresentToggle('[data-present-board-bg]', !!state.presentUseBoardBackground);
  syncFormatMenuPresentToggle('[data-present-card-colour]', !!state.presentUseCardColour);
}

function buildFormatMenuPresentToggleHTML({ on, dataAttr, labelHtml }) {
  return `<button type="button" class="format-menu-present-toggle${on ? ' is-on' : ''}" role="menuitemcheckbox" ${dataAttr} aria-pressed="${on ? 'true' : 'false'}">
      <span class="format-menu-present-toggle-label">${labelHtml}</span>
      <span class="format-menu-present-switch${on ? ' is-on' : ''}" aria-hidden="true"><span class="format-menu-present-switch-thumb"></span></span>
    </button>`;
}

function buildFormatMenuPresentOptionsHTML() {
  const bgOn = !!state.presentUseBoardBackground;
  const colourOn = !!state.presentUseCardColour;
  return `<div class="format-menu-divider"></div>
    <p class="format-menu-heading">Presentation mode</p>
    <div class="format-menu-present-options">
      ${buildFormatMenuPresentToggleHTML({
        on: bgOn,
        dataAttr: 'data-present-board-bg',
        labelHtml: 'Use background in<br>presentation mode',
      })}
      ${buildFormatMenuPresentToggleHTML({
        on: colourOn,
        dataAttr: 'data-present-card-colour',
        labelHtml: 'Use card colour in<br>presentation',
      })}
    </div>`;
}

function buildFormatMenuColorPickerHTML() {
  const toneRow = (label, ids) => {
    const dots = ids
      .map((id) => {
        const colors = ACCENT_COLORS[id] || ACCENT_COLORS.ocean;
        const title = id.endsWith('-p') ? id.replace('-p', ' (pastel)') : id;
        return `<button type="button" class="color-dot format-global-color" data-global-color="${id}" style="background:${colors.surface}" title="${title}" aria-label="${title}"></button>`;
      })
      .join('');
    return `<p class="format-menu-color-tone">${label}</p><div class="format-menu-color-grid">${dots}</div>`;
  };

  return `<div class="format-menu-divider"></div>
    <p class="format-menu-heading">GLOBAL CARD COLOUR</p>
    <p class="format-menu-desc">Apply one colour to every card on this board.</p>
    <div class="format-menu-color-picker">
      ${toneRow('Bold', ACCENT_DARK)}
      ${toneRow('Pastel', ACCENT_PASTEL)}
    </div>`;
}

function buildFormatMenu() {
  if (!formatMenu || formatMenu.dataset.built === '4') return;
  formatMenu.dataset.built = '4';

  let html = buildFormatMenuColorPickerHTML();
  html += buildFormatMenuPresentOptionsHTML();
  html += '<div class="format-menu-divider"></div>';
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
  syncFormatMenuGlobalColors();
  syncFormatMenuPresentOptions();
}

function toggleFormatMenu(open) {
  if (!formatMenu || !btnFormat) return;
  const show = typeof open === 'boolean' ? open : formatMenu.hidden;
  formatMenu.hidden = !show;
  btnFormat.setAttribute('aria-expanded', show ? 'true' : 'false');
  if (show) {
    syncFormatMenuGlobalColors();
    syncFormatMenuPresentOptions();
  }
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
    if (action === 'templates') openTemplatesDialog();
    else if (action === 'new') newBoard();
    else if (action === 'open') openFilePicker();
    else if (action === 'grid-wall-pdf') exportGridWallPdf();
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
    const colorBtn = e.target.closest('[data-global-color]');
    if (colorBtn) {
      e.stopPropagation();
      applyGlobalAccent(colorBtn.dataset.globalColor);
      closeFormatMenu();
      return;
    }
    if (e.target.closest('[data-present-board-bg]')) {
      e.stopPropagation();
      state.presentUseBoardBackground = !state.presentUseBoardBackground;
      applyPresentBackground();
      syncFormatMenuPresentOptions();
      persist();
      showToast(
        state.presentUseBoardBackground
          ? 'Present will use this board background'
          : 'Present will use the dark backdrop'
      );
      return;
    }
    if (e.target.closest('[data-present-card-colour]')) {
      e.stopPropagation();
      state.presentUseCardColour = !state.presentUseCardColour;
      syncFormatMenuPresentOptions();
      persist();
      showToast(
        state.presentUseCardColour
          ? 'Present will use each card’s colour'
          : 'Present will use white cards'
      );
      return;
    }
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

function undoHotInsert() {
  const entry = hotInsertUndoStack.pop();
  if (!entry) return;
  state.blocks = state.blocks.filter((b) => !entry.insertedIds.includes(b.id));
  state.presentOrder = entry.presentOrder;
  if (selectedId && entry.insertedIds.includes(selectedId)) {
    selectedId = state.blocks.length ? state.blocks[state.blocks.length - 1].id : null;
  }
  updateUndoButton();
  persist();
  resizeCanvasToContent();
  render();
  showToast('HOT activity removed');
}

function undoLayout() {
  if (hotInsertUndoStack.length) {
    undoHotInsert();
    return;
  }
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
  const disabled = layoutUndoStack.length === 0 && hotInsertUndoStack.length === 0;
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
    const urlInput = $('[data-field="url"]', el);
    if (urlInput && urlInput.value.trim() !== (block.url || '').trim()) return false;
    const embedUrl = getLinkEmbedUrl(block.url);
    if (embedUrl) {
      const iframe = $('.block-link-embed iframe', el);
      return iframeSrcMatches(iframe, embedUrl);
    }
    const open = $('.block-link-card .block-link-open', el);
    return open?.href === getLinkOpenUrl(block.url);
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

  if ((block.type === 'note' || block.type === 'list') && block.imageData) {
    const img = $('.block-inline-image-wrap img', el);
    return !!(img && img.getAttribute('src') === block.imageData);
  }

  if (block.type === 'whiteboard') {
    const blankEl = $('[data-field="blank-content"]', el);
    const active = document.activeElement;
    const editingOnCard = blankEl && (active === blankEl || blankEl.contains(active));
    if (editingOnCard) {
      const saved = cleanTableColResizeMarkup(block.blankContent || '');
      const live = cleanTableColResizeMarkup(blankEl.innerHTML);
      if (live !== saved) return false;
      if (block.blankDraw) {
        const img = $('.block-whiteboard-thumb', el);
        return !!(img && img.getAttribute('src') === block.blankDraw);
      }
      return !$('.block-whiteboard-thumb', el);
    }
    return false;
  }

  return false;
}

function blockAcceptsInlineImage(block) {
  return block.type === 'note' || block.type === 'list' || (block.type === 'table' && block.hotRoutineId);
}

function getInlineImageHTML(block) {
  if (!block.imageData) return '';
  const alt = escapeHtml(block.title || 'Image');
  const hotCls = block.hotRoutineId ? ' block-inline-image-wrap--hot' : '';
  return `<div class="block-inline-image-wrap${hotCls}"><img src="${block.imageData}" alt="${alt}" /></div>`;
}

function getTextCardBodyHTML(block, { titlePlaceholder, contentPlaceholder, fallbackContent }) {
  const title = escapeHtml(block.title || '');
  const styleCls = blockUsesTextStyle(block) ? ` ${getTextCardStyleClassList(block)}` : '';
  return `<input class="block-title-input${styleCls}" type="text" value="${title}" placeholder="${titlePlaceholder}" data-field="title" />
    ${getInlineImageHTML(block)}
    <div class="block-content${styleCls}" contenteditable="true" data-field="content" data-placeholder="${contentPlaceholder}">${block.content || fallbackContent}</div>`;
}

function getNoteListImageFooterHTML(block) {
  if (!blockAcceptsInlineImage(block)) return '';
  if (block.imageData) {
    return getImageReplaceFooterHTML() + getImageRemoveFooterHTML();
  }
  return getImageAddFooterHTML();
}

function getPresentInlineImageHTML(block) {
  if (!block.imageData || !blockAcceptsInlineImage(block)) return '';
  const hotCls = block.hotRoutineId ? ' present-inline-image--hot' : '';
  return `<div class="present-inline-image${hotCls}"><img src="${block.imageData}" alt="" /></div>`;
}

function blockUsesPresentEdit(block) {
  return !!block?.presentEditable;
}

function getPresentTitleHTML(block, { showTitle = true } = {}) {
  if (!showTitle) return '';
  const text = escapeHtml(block.title || '');
  if (!text && !blockUsesPresentEdit(block)) return '';
  if (blockUsesPresentEdit(block)) {
    return `<h1 class="present-card-title present-card-title--editable" contenteditable="true" data-present-field="title" spellcheck="true">${text || 'Untitled'}</h1>`;
  }
  return text ? `<h1 class="present-card-title">${text}</h1>` : '';
}

function getPresentTextBodyHTML(block, bodyHTML, extraClass = '') {
  const cls = `present-body present-body--text${extraClass ? ` ${extraClass}` : ''}`;
  if (blockUsesPresentEdit(block)) {
    return `<div class="${cls} present-body--present-editable" contenteditable="true" data-present-field="content" spellcheck="true">${bodyHTML}</div>`;
  }
  return `<div class="${cls}">${bodyHTML}</div>`;
}

function wrapPresentTextCardHTML(block, bodyHTML, { showTitle = true } = {}) {
  const title = getPresentTitleHTML(block, { showTitle });
  const image = getPresentInlineImageHTML(block);
  const body = getPresentTextBodyHTML(block, bodyHTML);
  if (!image) return title + body;
  return `<div class="present-card-stack">${title}${image}${body}</div>`;
}

function syncPresentWhiteboardFromBlank() {
  const block = blankBlockId ? getBlock(blankBlockId) : getPresentBlocks()[presentIndex];
  if (!block || block.type !== 'whiteboard') return;
  const editor = $('#blankEditor');
  if (editor) {
    block.blankContent = cleanTableColResizeMarkup(editor.innerHTML);
  }
  saveBlankDraw();
  persist();
  const el = $(`[data-block-id="${block.id}"]`, canvasInner);
  if (el) updateWhiteboardPreview(block);
}

function hidePresentWhiteboard() {
  if (!presentWhiteboardMounted) return;
  syncPresentWhiteboardFromBlank();
  const overlay = $('#blankOverlay');
  const present = $('#presentOverlay');
  if (overlay) {
    overlay.hidden = true;
    overlay.setAttribute('hidden', '');
    overlay.classList.remove('blank-overlay--present');
    if (present && overlay.parentElement === present) {
      document.body.insertBefore(overlay, present.nextSibling);
    }
  }
  $('#blankClose')?.removeAttribute('hidden');
  blankBlockId = null;
  blankCanvasOwnerId = null;
  blankDrawUndoStack.length = 0;
  blankStrokeBefore = null;
  blankStrokeMoved = false;
  syncBlankDrawUndoBtn();
  presentWhiteboardMounted = false;
}

function mountPresentWhiteboard(block) {
  const overlay = $('#blankOverlay');
  const present = $('#presentOverlay');
  if (!overlay || !present || !block || block.type !== 'whiteboard') return;

  if (presentWhiteboardMounted && blankBlockId === block.id) {
    requestAnimationFrame(() => resizeBlankCanvas());
    return;
  }

  hidePresentWhiteboard();

  blankBlockId = block.id;
  blankCanvasOwnerId = block.id;
  blankDrawDirty = false;
  blankDrawUndoStack.length = 0;
  blankStrokeBefore = null;
  blankStrokeMoved = false;
  syncBlankDrawUndoBtn();

  present.appendChild(overlay);
  overlay.hidden = false;
  overlay.removeAttribute('hidden');
  overlay.classList.add('blank-overlay--present');
  $('#blankClose')?.setAttribute('hidden', '');

  const editor = $('#blankEditor');
  const content = block.blankContent || '';
  if (editor && editor.innerHTML !== content) editor.innerHTML = content;
  ensureBlankTableControls(editor);
  cleanBlankEditorDom(editor);
  normalizeBlankEditorStructure(editor);
  setBlankTab(block.blankDraw && !(block.blankContent || '').trim() ? 'draw' : 'type');
  resetBlankCanvasBuffer();
  initBlankCanvas();
  requestAnimationFrame(() => {
    resizeBlankCanvas();
    if ($('[data-blank-pane="type"]') && !($('[data-blank-pane="type"]')?.hidden)) {
      editor?.querySelector(':scope > .blank-editor-surface')?.focus();
    }
  });

  presentWhiteboardMounted = true;
}

function syncPresentEditableFromStage() {
  const block = getPresentBlocks()[presentIndex];
  if (block?.type === 'whiteboard' && presentWhiteboardMounted) {
    syncPresentWhiteboardFromBlank();
    return;
  }
  const card = $('.present-card', presentStage);
  if (!block || !card || !blockUsesPresentEdit(block)) return;

  const titleEl = $('[data-present-field="title"]', card);
  if (titleEl) block.title = titleEl.textContent.trim();

  if (block.type === 'table') {
    const introEl = $('.present-table-intro[data-present-field="content"]', card);
    if (introEl) block.content = introEl.innerHTML;
    const table = $('.block-table', card);
    if (table) block.tableHtml = serializeTableHtml(table);
  } else {
    const contentEl = $('[data-present-field="content"]', card);
    if (contentEl) block.content = contentEl.innerHTML;
  }

  persist();
}

function bindPresentEditable() {
  const block = getPresentBlocks()[presentIndex];
  const card = $('.present-card', presentStage);
  if (!block || !card || !blockUsesPresentEdit(block)) return;

  const onEdit = () => syncPresentEditableFromStage();

  $('[data-present-field="title"]', card)?.addEventListener('input', onEdit);
  $$('[data-present-field="content"]', card).forEach((el) => el.addEventListener('input', onEdit));

  card.querySelectorAll('.block-table, .blank-table').forEach((table) => {
    table.addEventListener('input', onEdit);
  });
  refreshTableColumnResize(card);
}

function presentCardHasInlineImage(block) {
  return !!(block.imageData && blockAcceptsInlineImage(block));
}

function listUsesRevealInPresent(block) {
  return block?.type === 'list' && !block.listRevealAll;
}

function countListItemsInContent(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html || '';
  const items = [...wrap.querySelectorAll('li')];
  if (!items.length) return 0;
  const withText = items.filter((li) => li.textContent.trim()).length;
  return withText || items.length;
}

function buildPresentListBodyHTML(block) {
  const html = block.content || '<ul><li></li></ul>';
  if (!listUsesRevealInPresent(block)) return html;

  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const items = wrap.querySelectorAll('li');
  if (!items.length) return html;

  const total = items.length;
  const show = Math.max(1, Math.min(presentListRevealCount, total));
  let i = 0;
  items.forEach((li) => {
    i += 1;
    if (i > show) {
      li.classList.add('present-reveal-hidden');
      li.setAttribute('aria-hidden', 'true');
    } else {
      li.classList.remove('present-reveal-hidden');
      li.removeAttribute('aria-hidden');
    }
  });
  return wrap.innerHTML;
}

function ensurePresentRevealState(block) {
  if (!block || block.id !== presentRevealBlockId) {
    presentRevealBlockId = block?.id || null;
    presentListRevealCount = block && listUsesRevealInPresent(block) ? 1 : 0;
  }
}

function getPresentListRevealHintHTML(block) {
  if (!listUsesRevealInPresent(block)) return '';
  const total = countListItemsInContent(block.content);
  if (total <= 1) return '';
  const done = presentListRevealCount >= total;
  const hiddenCls = done ? ' present-reveal-hint--hidden' : '';
  const aria = done ? ' aria-hidden="true"' : '';
  const editNote = blockUsesPresentEdit(block)
    ? ' · click outside text, or use Space'
    : '';
  return `<p class="present-reveal-hint${hiddenCls}"${aria}>Click or press Space for next bullet${editNote}</p>`;
}

function updateBlockElement(el, block) {
  applyAccentStyles(el, block.accent);
  el.dataset.blockType = block.type;
  el.classList.toggle('block--sticky', block.type === 'sticky');
  el.classList.toggle('block--gallery-station', !!block.galleryStation);
  el.classList.toggle('is-gallery-viewable', !!block.galleryStation && galleryStationHasMedia(block));
  el.classList.toggle('block--assessment-task', !!block.assessmentTask);
  el.classList.toggle('block--assessment-stage', !!block.assessmentStage);
  el.classList.toggle('block--reflection-column', !!block.reflectionColumn);

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
    syncTextCardStyleOnBlock(el, block);
    syncBlockFooter(el, block);
    return;
  }

  const body = $('.block-body', el);
  body.innerHTML = getBodyHTML(block);

  refreshColorDots(el, block);

  syncBlockFooter(el, block);
  bindBodyInputs(el, block);
  if (block.type === 'table') syncTableColAlignOnBlock(el, block);
  if (block.type === 'worldmap' && isWorldMapDebugMode() && getWorldMapMapSrc(block)) {
    requestAnimationFrame(() => syncWorldMapDebugInfo(el, block));
  }
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

  const primary = [];
  const secondary = [];

  if (block.type === 'image' && block.imageData) {
    primary.push(getImageReplaceFooterHTML());
  }
  if (blockAcceptsInlineImage(block)) {
    primary.push(getNoteListImageFooterHTML(block));
  }
  if (block.type === 'document' && block.docData) {
    primary.push(getDocumentFooterActionsHTML(block));
  }
  if (block.type === 'whiteboard') {
    primary.push(
      '<button type="button" class="block-footer-btn" data-action="open-whiteboard">Open whiteboard</button>'
    );
  }
  if (blockUsesTextStyle(block)) {
    primary.push(getTextCardStyleFooterHTML(block));
  }
  if (block.type === 'list') {
    primary.push(getListRevealFooterHTML(block));
  }
  if (block.type === 'table') {
    primary.push(getTableColAlignFooterHTML(block));
  }
  if (block.type === 'worldmap') {
    primary.push(
      '<label class="block-footer-btn block-footer-btn-replace" title="Replace map image">Replace map<input type="file" accept="image/*" data-field="image" hidden /></label>'
    );
    if (getWorldMapMapSrc(block)) {
      primary.push(
        '<button type="button" class="block-footer-btn" data-action="reset-map-image">Default map</button>'
      );
    }
    primary.push(getMapRevealFooterHTML(block));
  }
  if (block.galleryStation) {
    if (galleryStationHasMedia(block)) {
      primary.push(
        '<button type="button" class="block-footer-btn" data-action="gallery-view">View full screen</button>'
      );
    }
    if (block.type === 'image') {
      primary.push(
        `<label class="block-footer-btn">${galleryStationHasMedia(block) ? 'Replace image' : 'Add image'}<input type="file" accept="image/*" data-field="image" hidden /></label>`
      );
      primary.push(
        `<label class="block-footer-btn">Add PDF / document<input type="file" accept="${GALLERY_DOC_ACCEPT}" data-field="gallery-document" hidden /></label>`
      );
    } else if (block.type === 'document') {
      primary.push(getDocumentFooterActionsHTML(block));
      primary.push(
        `<label class="block-footer-btn">Add image<input type="file" accept="image/*" data-field="gallery-image-replace" hidden /></label>`
      );
    }
  }

  const rows = [];
  if (primary.length) {
    rows.push(`<div class="block-footer-primary">${primary.join('')}</div>`);
  }
  if (secondary.length) {
    rows.push(`<div class="block-footer-secondary">${secondary.join('')}</div>`);
  }
  const start = rows.length ? `<div class="block-footer-start">${rows.join('')}</div>` : '';
  footer.innerHTML = `${start}${getPresentFooterButtonHTML(block)}`;
  footer.classList.toggle('block-footer--stacked', secondary.length > 0);
}

function isWhiteboardCardEmpty(block) {
  if (block.blankDraw) return false;
  const html = (block.blankContent || '').trim();
  if (!html) return true;
  if (blankHtmlToPlainText(html)) return false;
  return !/blank-table|blank-editor-surface/i.test(html);
}

function getWhiteboardPreviewInnerHTML(block) {
  const empty = isWhiteboardCardEmpty(block);
  const drawImg = block.blankDraw
    ? `<img class="block-whiteboard-thumb" src="${block.blankDraw}" alt="" />`
    : '';
  const emptyHint = empty
    ? '<p class="block-whiteboard-empty-hint">Click to type · Open whiteboard for tables &amp; draw</p>'
    : '';
  return `${emptyHint}<div class="block-whiteboard-text-wrap">
    <div class="block-whiteboard-content block-whiteboard-preview-inner block-content" contenteditable="true" data-field="blank-content" data-placeholder="Type for the class…" spellcheck="true">${block.blankContent || ''}</div>
  </div>${drawImg}`;
}

function getWhiteboardPreviewClass(block) {
  return 'block-whiteboard-preview' + (isWhiteboardCardEmpty(block) ? ' block-whiteboard-preview--empty' : '');
}

function syncWhiteboardDrawThumb(el, block) {
  const preview = $('.block-whiteboard-preview', el);
  if (!preview) return;
  const thumb = $('.block-whiteboard-thumb', preview);
  if (block.blankDraw) {
    if (thumb) thumb.setAttribute('src', block.blankDraw);
    else preview.insertAdjacentHTML('beforeend', `<img class="block-whiteboard-thumb" src="${block.blankDraw}" alt="" />`);
  } else {
    thumb?.remove();
  }
}

function updateWhiteboardPreview(block) {
  const el = $(`[data-block-id="${block.id}"]`, canvasInner);
  if (!el || block.type !== 'whiteboard') return;
  const active = document.activeElement;
  if (active && el.contains(active) && active.closest('[data-field="blank-content"]')) {
    syncWhiteboardDrawThumb(el, block);
    return;
  }
  const preview = $('.block-whiteboard-preview', el);
  if (preview) {
    preview.className = getWhiteboardPreviewClass(block);
    preview.innerHTML = getWhiteboardPreviewInnerHTML(block);
    bindBodyInputs(el, block);
  }
}

function getBlankBlock() {
  return blankBlockId ? getBlock(blankBlockId) : null;
}

function getBlankContent() {
  const b = getBlankBlock();
  return b ? b.blankContent || '' : state.blankContent || '';
}

function setBlankContent(html) {
  const cleaned = cleanTableColResizeMarkup(html);
  const b = getBlankBlock();
  if (b) {
    b.blankContent = cleaned;
    updateWhiteboardPreview(b);
  } else {
    state.blankContent = cleaned;
  }
  persist();
}

function getBlankDraw() {
  if (blankBlockId) {
    const b = getBlock(blankBlockId);
    return b?.blankDraw || null;
  }
  return state.blankDraw || null;
}

function setBlankDraw(dataUrl) {
  if (blankBlockId) {
    const b = getBlock(blankBlockId);
    if (!b) return;
    b.blankDraw = dataUrl;
    if (b.type === 'whiteboard') updateWhiteboardPreview(b);
  } else {
    state.blankDraw = dataUrl;
  }
  persist();
}

function resetBlankCanvasBuffer() {
  const canvas = $('#blankCanvas');
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}

function isBlankDrawCanvasEmpty(canvas) {
  if (!canvas?.width || !canvas.height || !blankDrawCtx) return true;
  const { width, height } = canvas;
  const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 4096)));
  const data = blankDrawCtx.getImageData(0, 0, width, height).data;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 8) return false;
    }
  }
  return true;
}

function getBodyHTML(block) {
  const title = escapeHtml(block.title || '');
  switch (block.type) {
    case 'heading': {
      const styleCls = getTextCardStyleClassList(block);
      return `<input class="block-title-input ${styleCls}" type="text" value="${title}" placeholder="Heading" data-field="title" />
        <div class="block-content ${styleCls}" contenteditable="true" data-field="content" data-placeholder="Add subtitle or notes…">${block.content || ''}</div>`;
    }
    case 'image': {
      if (block.galleryStation) return getGalleryStationBodyHTML(block, title);
      const imagePrompts = block.content?.trim()
        ? `<div class="block-image-prompts block-content" contenteditable="true" data-field="content" data-placeholder="Add prompts below the source…">${block.content}</div>`
        : '';
      return block.imageData
        ? `<input class="block-title-input" type="text" value="${title}" placeholder="Image title" data-field="title" />
        <div class="block-image-wrap"><img src="${block.imageData}" alt="${title || 'Image'}" /></div>${imagePrompts}`
        : `<input class="block-title-input" type="text" value="${title}" placeholder="Image title" data-field="title" />
        <div class="block-image-placeholder">
            <p>Drop an image or choose a file</p>
            <label><input type="file" accept="image/*" data-field="image" /> Choose image</label>
            <p style="margin-top:12px;font-size:0.8rem">Select card, then paste (⌘V / Ctrl+V)</p>
          </div>`;
    }
    case 'document':
      if (block.galleryStation) return getGalleryStationDocumentBodyHTML(block, title);
      return getDocumentBodyHTML(block, title);
    case 'link': {
      const embedUrl = getLinkEmbedUrl(block.url);
      const openUrl = getLinkOpenUrl(block.url);
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Link title" data-field="title" />
        <div class="block-link-preview">
          <input type="url" value="${escapeAttr(block.url || '')}" placeholder="https://example.com" data-field="url" />
          ${embedUrl ? getLinkEmbedHTML(embedUrl, openUrl) : openUrl ? getLinkCardHTML(openUrl) : ''}
        </div>`;
    }
    case 'list':
      return getTextCardBodyHTML(block, {
        titlePlaceholder: 'List title',
        contentPlaceholder: 'Bullet points…',
        fallbackContent: '<ul><li>Item one</li><li>Item two</li></ul>',
      });
    case 'sticky':
      return `<div class="block-sticky-body block-content" contenteditable="true" data-field="content" data-placeholder="Quick thought…">${block.content || '<p></p>'}</div>`;
    case 'table': {
      const intro = block.content?.trim()
        ? `<div class="block-content block-table-intro" contenteditable="true" data-field="content" data-placeholder="Student instructions…">${block.content}</div>`
        : '';
      return `<input class="block-title-input" type="text" value="${title}" placeholder="Table title" data-field="title" />
        ${getInlineImageHTML(block)}${intro}<div class="block-table-wrap">${block.tableHtml || defaultTableHtml()}</div>`;
    }
    case 'poll':
      return getPollEditorHTML(block);
    case 'bloom':
      return getBloomEditorHTML(block);
    case 'brainbreak':
      return getBrainBreakEditorHTML(block);
    case 'worldmap':
      return getWorldMapEditorHTML(block);
    case 'quiz':
      return getQuizEditorHTML(block);
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
        <div class="${getWhiteboardPreviewClass(block)}">${getWhiteboardPreviewInnerHTML(block)}</div>`;
    default:
      return getTextCardBodyHTML(block, {
        titlePlaceholder: 'Title',
        contentPlaceholder: 'Write your note…',
        fallbackContent: '',
      });
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

function getGalleryStationEmptyHTML(block, title) {
  const label = escapeHtml(block.title || title || 'Station');
  const titleField = `<input class="block-title-input" type="text" value="${title}" placeholder="Station title" data-field="title" />`;
  return `${titleField}
    <div class="gallery-station-empty" data-gallery-empty>
      <p class="gallery-station-empty-label">${label}</p>
      <p>Image, PDF, or document</p>
      <div class="gallery-station-empty-actions">
        <label class="gallery-station-btn"><input type="file" accept="image/*" data-field="image" /> Image</label>
        <label class="gallery-station-btn"><input type="file" accept="${GALLERY_DOC_ACCEPT}" data-field="gallery-document" /> PDF / document</label>
      </div>
    </div>`;
}

function getGalleryStationBodyHTML(block, title) {
  if (!block.imageData) return getGalleryStationEmptyHTML(block, title);
  const titleField = `<input class="block-title-input" type="text" value="${title}" placeholder="Station title" data-field="title" />`;
  return `${titleField}<div class="block-image-wrap"><img src="${block.imageData}" alt="${title || 'Station'}" /></div>`;
}

function getGalleryStationDocumentBodyHTML(block, title) {
  if (!block.docData) return getGalleryStationEmptyHTML(block, title);
  const titleField = `<input class="block-title-input" type="text" value="${title}" placeholder="Station title" data-field="title" />`;
  const kind = getDocKind(block);
  const name = escapeHtml(block.docName || 'Document');

  if (isPdfDocument(block)) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-pdf">
        <iframe src="${block.docData}#toolbar=0" title="${name}" class="doc-iframe"></iframe>
      </div>`;
  }

  if (isDocxDocument(block) && block.docPreviewHtml) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-docx">
        <div class="docx-preview-content">${block.docPreviewHtml}</div>
      </div>`;
  }

  if (isDocxDocument(block) && block.docData) {
    return `${titleField}
      <div class="block-doc-preview block-doc-preview-docx block-doc-preview-loading">
        <p>Building Word preview…</p>
      </div>`;
  }

  return `${titleField}
    <div class="block-doc-card" style="--doc-color:${kind.color};--doc-bg:${kind.bg}">
      <div class="doc-file-icon">${escapeHtml((kind.key || 'doc').slice(0, 4).toUpperCase())}</div>
      <p class="doc-file-kind">${escapeHtml(kind.label)}</p>
      <p class="doc-filename">${name}</p>
    </div>`;
}

function galleryStationHasMedia(block) {
  if (!block?.galleryStation) return false;
  if (block.type === 'image') return !!block.imageData;
  if (block.type === 'document') return !!block.docData;
  return false;
}

function applyGalleryStationFile(file, block, el) {
  if (!file || !block?.galleryStation) return false;
  if (file.type.startsWith('image/')) {
    if (block.type === 'document') {
      block.type = 'image';
      delete block.docData;
      delete block.docName;
      delete block.docMime;
      delete block.docPreviewHtml;
    }
    readImageFile(file, block, el);
    return true;
  }
  if (isAllowedDocument(file)) {
    if (block.type === 'image') block.type = 'document';
    readDocumentFile(file, block, el);
    return true;
  }
  showToast('Use an image or PDF / document');
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

/** Static GitHub Pages (e.g. planomy.github.io/prez) allow iframe embeds. */
function isGithubPagesHost(hostname) {
  const h = (hostname || '').toLowerCase();
  return h === 'github.io' || h.endsWith('.github.io');
}

/** YouTube IDs are 11 chars; strip trailing junk from pasted URLs/markdown. */
function sanitizeYoutubeVideoId(raw) {
  if (!raw) return '';
  const chunk = String(raw).trim().split(/[?&#\s\[\]('"<>]/)[0];
  const match = chunk.match(/^[\w-]{11}/);
  return match ? match[0] : '';
}

function youtubeEmbedUrl(videoId) {
  const id = sanitizeYoutubeVideoId(videoId);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

function isMediaEmbedUrl(embedUrl) {
  try {
    const h = new URL(embedUrl).hostname;
    return (
      h.includes('youtube.com') ||
      h === 'youtube-nocookie.com' ||
      h === 'player.vimeo.com'
    );
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
      const embed = youtubeEmbedUrl(id);
      if (embed) return embed;
    }

    if (u.hostname.includes('youtube.com') || u.hostname === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') {
        const embed = youtubeEmbedUrl(u.searchParams.get('v'));
        if (embed) return embed;
      }
      if (u.pathname.startsWith('/embed/')) {
        const id = u.pathname.split('/')[2];
        const embed = youtubeEmbedUrl(id);
        if (embed) return embed;
      }
      if (u.pathname.startsWith('/shorts/')) {
        const embed = youtubeEmbedUrl(u.pathname.split('/')[2]);
        if (embed) return embed;
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

    if (isGithubPagesHost(u.hostname)) {
      return url;
    }

    // Most sites (ChatGPT, Google search, etc.) block iframes — only embed known platforms above.
    return null;
  } catch {
    return null;
  }
}

function getLinkHostname(openUrl) {
  try {
    return new URL(openUrl).hostname.replace(/^www\./, '');
  } catch {
    return openUrl;
  }
}

function getLinkCardHTML(openUrl, { present = false } = {}) {
  const host = getLinkHostname(openUrl);
  const cardClass = present ? 'present-link-card' : 'block-link-card';
  const openClass = present ? 'present-link-open' : 'block-link-open';
  return `<div class="${cardClass}">
    <span class="link-card-icon" aria-hidden="true">🔗</span>
    <div class="link-card-meta">
      <p class="link-card-host">${escapeHtml(host)}</p>
      <p class="link-card-note">This site can’t be embedded — open in a new tab</p>
    </div>
    <a class="${openClass} link-card-open-btn" href="${escapeAttr(openUrl)}" target="_blank" rel="noopener noreferrer">Open ↗</a>
  </div>`;
}

function getLinkOpenUrl(raw) {
  const url = normalizeLinkUrl(raw);
  return isValidHttpUrl(url) ? url : '';
}

function getLinkEmbedHTML(embedUrl, openUrl, { present = false } = {}) {
  const media = isMediaEmbedUrl(embedUrl);
  const sandbox = present
    ? 'allow-scripts allow-same-origin allow-popups allow-forms allow-presentation'
    : 'allow-scripts allow-same-origin allow-popups allow-forms';
  const allowAttr = media
    ? ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
      (present ? ' allowfullscreen' : '')
    : present
      ? ' allowfullscreen'
      : '';
  const referrerPolicy = media ? 'strict-origin-when-cross-origin' : 'no-referrer';
  return `<div class="${present ? 'present-link-embed' : 'block-link-embed'}">
      <iframe src="${escapeAttr(embedUrl)}" title="Web page preview" class="link-iframe" sandbox="${sandbox}"${allowAttr} referrerpolicy="${referrerPolicy}"></iframe>
      <a class="${present ? 'present-link-open' : 'block-link-open'}" href="${escapeAttr(openUrl)}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
    </div>`;
}

function defaultTableHtml() {
  return `<table class="block-table" contenteditable="false">
    <colgroup><col style="width:33.333%" /><col style="width:33.333%" /><col style="width:33.334%" /></colgroup>
    <thead><tr><th contenteditable="true">Term</th><th contenteditable="true">Topic</th><th contenteditable="true">Notes</th></tr></thead>
    <tbody>
      <tr><td contenteditable="true">1</td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
      <tr><td contenteditable="true">2</td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
    </tbody>
  </table>`;
}

const TABLE_COL_RESIZE_SKIP_CLASSES = ['bracket-table', 'matrix-table', 'frayer-table'];
const TABLE_COL_MIN_WIDTH_PX = 48;
let tableColResizeState = null;

function getTableRowCells(tr) {
  return [...tr.children].filter((el) => el.matches('th, td'));
}

function getTableHeaderRow(table) {
  const theadRow = table.querySelector('thead tr');
  if (theadRow && getTableRowCells(theadRow).length) return theadRow;
  const firstBody = table.querySelector('tbody tr');
  if (firstBody?.querySelector('th')) return firstBody;
  return null;
}

function tableSupportsColumnResize(table) {
  if (!table?.matches('.block-table, .blank-table')) return false;
  if (table.classList.contains('blank-table')) return false;
  if (TABLE_COL_RESIZE_SKIP_CLASSES.some((c) => table.classList.contains(c))) return false;
  const headerRow = getTableHeaderRow(table);
  if (!headerRow) return false;
  const cells = getTableRowCells(headerRow);
  if (cells.length < 1) return false;
  for (const cell of cells) {
    const span = parseInt(cell.colSpan, 10) || 1;
    if (span !== 1 || cell.rowSpan > 1) return false;
  }
  const rows = [...table.querySelectorAll('thead tr, tbody tr, tfoot tr')];
  const n = cells.length;
  return rows.every((tr) => getTableRowCells(tr).length === n);
}

function ensureTableColgroup(table) {
  const headerRow = getTableHeaderRow(table);
  const n = headerRow ? getTableRowCells(headerRow).length : 0;
  if (!n) return [];

  table.style.tableLayout = 'fixed';
  table.style.width = table.style.width || '100%';
  let colgroup = table.querySelector('colgroup');
  if (!colgroup) {
    colgroup = document.createElement('colgroup');
    table.insertBefore(colgroup, table.firstElementChild);
  }

  let cols = [...colgroup.querySelectorAll('col')];
  while (cols.length < n) {
    const col = document.createElement('col');
    colgroup.appendChild(col);
    cols.push(col);
  }
  while (cols.length > n) {
    const extra = cols.pop();
    extra?.remove();
  }
  return cols;
}

/** Snapshot every column as px from what is on screen (fixes % widths before resize). */
function getRenderedColWidthsPx(table) {
  const headerRow = getTableHeaderRow(table);
  if (!headerRow) return [];
  const cells = getTableRowCells(headerRow);
  const widths = cells.map((cell) =>
    Math.max(TABLE_COL_MIN_WIDTH_PX, Math.round(cell.getBoundingClientRect().width))
  );
  const tableW = Math.round(table.getBoundingClientRect().width);
  const sum = widths.reduce((a, b) => a + b, 0);
  if (widths.length && sum !== tableW) {
    const last = widths.length - 1;
    widths[last] = Math.max(TABLE_COL_MIN_WIDTH_PX, widths[last] + (tableW - sum));
  }
  return widths;
}

function applyColWidthsPx(table, cols, widths) {
  cols.forEach((col, i) => {
    col.style.width = `${widths[i]}px`;
  });
}

function materializeColWidthsPx(table) {
  const cols = ensureTableColgroup(table);
  const widths = getRenderedColWidthsPx(table);
  applyColWidthsPx(table, cols, widths);
  return { cols, widths };
}

/** Dragging the right edge of col i: column i and i+1 trade width (Excel-style). */
function computeResizedColWidths(startWidths, colIndex, delta) {
  const min = TABLE_COL_MIN_WIDTH_PX;
  const widths = [...startWidths];
  const n = widths.length;
  if (colIndex < 0 || colIndex >= n) return widths;

  if (colIndex < n - 1) {
    const pairTotal = startWidths[colIndex] + startWidths[colIndex + 1];
    let left = startWidths[colIndex] + delta;
    let right = pairTotal - left;
    if (left < min) {
      left = min;
      right = pairTotal - min;
    }
    if (right < min) {
      right = min;
      left = pairTotal - min;
    }
    widths[colIndex] = Math.round(left);
    widths[colIndex + 1] = Math.round(right);
    return widths;
  }

  widths[colIndex] = Math.max(min, Math.round(startWidths[colIndex] + delta));
  return widths;
}

function persistTableLayout(table) {
  const blockEl = table.closest('[data-block-id]');
  if (blockEl) {
    const block = getBlock(blockEl.dataset.blockId);
    if (block?.type === 'table') {
      block.tableHtml = serializeTableHtml(table);
      persist();
      return;
    }
  }
  const editor = $('#blankEditor');
  if (editor?.contains(table)) setBlankContent(editor.innerHTML);
}

function endTableColumnResizeSession() {
  if (!tableColResizeState) return;
  const { table, onPersist, changed, pointerId, handleEl } = tableColResizeState;
  document.removeEventListener('pointermove', onTableColumnResizeMove, true);
  document.removeEventListener('pointerup', onTableColumnResizeUp, true);
  document.removeEventListener('pointercancel', onTableColumnResizeUp, true);
  if (handleEl && pointerId != null) {
    try {
      if (handleEl.hasPointerCapture(pointerId)) handleEl.releasePointerCapture(pointerId);
    } catch {
      /* ignore */
    }
  }
  handleEl?.classList.remove('table-col-resize--active');
  tableColResizeState = null;
  document.body.classList.remove('table-col-resize-active');
  if (changed) onPersist?.();
}

function onTableColumnResizeMove(e) {
  if (!tableColResizeState || e.pointerId !== tableColResizeState.pointerId) return;
  e.preventDefault();
  const { table, cols, colIndex, startX, startWidths } = tableColResizeState;
  const delta = e.clientX - startX;
  const widths = computeResizedColWidths(startWidths, colIndex, delta);
  applyColWidthsPx(table, cols, widths);
  tableColResizeState.changed = true;
}

function onTableColumnResizeUp(e) {
  if (!tableColResizeState || e.pointerId !== tableColResizeState.pointerId) return;
  e.preventDefault();
  endTableColumnResizeSession();
}

function startTableColumnResize(e, table, colIndex, onPersist) {
  if (tableColResizeState) endTableColumnResizeSession();
  const { cols, widths } = materializeColWidthsPx(table);
  if (!cols[colIndex]) return;

  const handleEl = e.target.closest('.table-col-resize');
  const pointerId = e.pointerId;
  tableColResizeState = {
    table,
    cols,
    colIndex,
    startX: e.clientX,
    startWidths: widths,
    onPersist,
    changed: false,
    pointerId,
    handleEl,
  };
  document.body.classList.add('table-col-resize-active');
  handleEl?.classList.add('table-col-resize--active');
  try {
    handleEl?.setPointerCapture(pointerId);
  } catch {
    /* ignore */
  }
  document.addEventListener('pointermove', onTableColumnResizeMove, true);
  document.addEventListener('pointerup', onTableColumnResizeUp, true);
  document.addEventListener('pointercancel', onTableColumnResizeUp, true);
}

function bindTableColumnResize(table) {
  if (!table || !tableSupportsColumnResize(table)) return;
  ensureTableColgroup(table);
  const headerRow = getTableHeaderRow(table);
  if (!headerRow) return;

  getTableRowCells(headerRow).forEach((cell, colIndex) => {
    if (cell.querySelector('.table-col-resize')) return;
    cell.classList.add('table-col-header');
    const handle = document.createElement('span');
    handle.className = 'table-col-resize';
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-orientation', 'vertical');
    handle.setAttribute('aria-label', `Resize column ${colIndex + 1}`);
    handle.title = 'Drag to resize (adjusts this column and the next)';
    handle.dataset.colIndex = String(colIndex);
    cell.appendChild(handle);
  });
}

function initTableColumnResize() {
  if (initTableColumnResize.done) return;
  initTableColumnResize.done = true;

  document.addEventListener(
    'pointerdown',
    (e) => {
      if (e.button !== 0) return;
      const handle = e.target.closest('.table-col-resize');
      if (!handle) return;
      const table = handle.closest('table.block-table, table.blank-table');
      if (!table || !tableSupportsColumnResize(table)) return;
      const headerRow = getTableHeaderRow(table);
      const cell = handle.closest('th, td');
      if (!headerRow || !cell || cell.parentElement !== headerRow) return;
      const colIndex = Number(handle.dataset.colIndex);
      if (!Number.isFinite(colIndex) || colIndex < 0) return;
      e.preventDefault();
      e.stopPropagation();
      startTableColumnResize(e, table, colIndex, () => persistTableLayout(table));
    },
    true
  );
}

function refreshAllTableColumnResizes() {
  $$('[data-block-id]').forEach((el) => {
    const block = getBlock(el.dataset.blockId);
    if (block?.type !== 'table') return;
    const wrap = $('.block-table-wrap', el);
    if (wrap) refreshTableColumnResize(wrap);
  });
  refreshBlankTableColumnResize();
}

function cleanTableColResizeMarkup(html) {
  if (!html?.includes('table-col-resize')) return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('.table-col-resize').forEach((h) => h.remove());
  div.querySelectorAll('.table-col-header').forEach((c) => c.classList.remove('table-col-header'));
  return div.innerHTML;
}

function serializeTableHtml(table) {
  if (!table) return '';
  const clone = table.cloneNode(true);
  clone.querySelectorAll('.table-col-resize').forEach((h) => h.remove());
  clone.querySelectorAll('.table-col-header').forEach((c) => c.classList.remove('table-col-header'));
  clone.className = stripTableColAlignClasses(clone.className);
  return clone.outerHTML;
}

function refreshTableColumnResize(root) {
  if (!root) return;
  root.querySelectorAll('.block-table, .blank-table').forEach((table) => {
    table.querySelectorAll('.table-col-resize').forEach((h) => h.remove());
    table.querySelectorAll('.table-col-header').forEach((c) => c.classList.remove('table-col-header'));
    bindTableColumnResize(table);
  });
}

function refreshBlankTableColumnResize() {
  const editor = $('#blankEditor');
  if (!editor) return;
  refreshTableColumnResize(editor);
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
  let card = $('.block-link-card', wrap);

  if (!openUrl) {
    embed?.remove();
    card?.remove();
    return;
  }

  if (embedUrl) {
    card?.remove();
    if (!embed) {
      wrap.insertAdjacentHTML('beforeend', getLinkEmbedHTML(embedUrl, openUrl));
      return;
    }
    const iframe = $('iframe', embed);
    if (iframe && iframe.src !== embedUrl) iframe.src = embedUrl;
    const open = $('.block-link-open', embed);
    if (open) open.href = openUrl;
    return;
  }

  embed?.remove();
  if (!card) {
    wrap.insertAdjacentHTML('beforeend', getLinkCardHTML(openUrl));
    return;
  }
  const open = $('.block-link-open', card);
  if (open) open.href = openUrl;
  const hostEl = $('.link-card-host', card);
  if (hostEl) hostEl.textContent = getLinkHostname(openUrl);
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

  const blankContentEl = $('[data-field="blank-content"]', el);
  if (blankContentEl && block.type === 'whiteboard') {
    blankContentEl.oninput = () => {
      block.blankContent = cleanTableColResizeMarkup(blankContentEl.innerHTML);
      const preview = $('.block-whiteboard-preview', el);
      if (preview) preview.className = getWhiteboardPreviewClass(block);
      const hint = $('.block-whiteboard-empty-hint', el);
      if (isWhiteboardCardEmpty(block)) {
        if (!hint && preview) {
          preview.insertAdjacentHTML(
            'afterbegin',
            '<p class="block-whiteboard-empty-hint">Click to type · Open whiteboard for tables &amp; draw</p>'
          );
        }
      } else {
        hint?.remove();
      }
      persist();
    };
  }

  const bloomTaskEl = $('[data-field="bloom-task"]', el);
  if (bloomTaskEl) {
    bloomTaskEl.oninput = () => {
      block.bloomTask = bloomTaskEl.innerHTML;
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

  $$('[data-field="image"]', el).forEach((fileInput) => {
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) readImageFile(file, block, el);
      fileInput.value = '';
    };
  });

  $$('[data-field="document"]', el).forEach((docInput) => {
    docInput.onchange = () => {
      const file = docInput.files?.[0];
      if (file) readDocumentFile(file, block, el);
      docInput.value = '';
    };
  });

  $$('[data-field="gallery-document"]', el).forEach((docInput) => {
    docInput.onchange = () => {
      const file = docInput.files?.[0];
      if (!file) return;
      applyGalleryStationFile(file, block, el);
      docInput.value = '';
    };
  });

  $$('[data-field="gallery-image-replace"]', el).forEach((fileInput) => {
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const preserved = {
        galleryStation: block.galleryStation,
        galleryIndex: block.galleryIndex,
        title: block.title,
        accent: block.accent,
        x: block.x,
        y: block.y,
        w: block.w,
        h: block.h,
      };
      block.type = 'image';
      delete block.docData;
      delete block.docName;
      delete block.docMime;
      delete block.docPreviewHtml;
      readImageFile(file, block, el);
      Object.assign(block, preserved);
      fileInput.value = '';
    };
  });

  const tableWrap = $('.block-table-wrap', el);
  const table = $('.block-table', tableWrap || el);
  if (table) {
    const persistTable = () => {
      block.tableHtml = serializeTableHtml(table);
      normalizeTableColAligns(block);
      syncTableColAlignOnBlock(el, block);
      persist();
    };
    table.oninput = persistTable;
    refreshTableColumnResize(tableWrap || el);
    normalizeTableColAligns(block);
    syncTableColAlignOnBlock(el, block);
  }

  if (block.type === 'poll') {
    $$('[data-poll-option]', el).forEach((input) => {
      input.oninput = () => {
        const i = Number(input.dataset.pollOption);
        if (!Number.isFinite(i)) return;
        block.pollOptions[i] = input.value;
        persist();
      };
    });
  }

  if (block.type === 'quiz') {
    $$('[data-quiz-question]', el).forEach((input) => {
      input.oninput = () => {
        const qi = Number(input.dataset.quizQuestion);
        if (!Number.isFinite(qi) || !block.quizQuestions[qi]) return;
        block.quizQuestions[qi].question = input.value;
        persist();
      };
    });
    $$('[data-quiz-option]', el).forEach((input) => {
      input.oninput = () => {
        const qi = Number(input.dataset.quizQ);
        const i = Number(input.dataset.quizOption);
        if (!Number.isFinite(qi) || !Number.isFinite(i) || !block.quizQuestions[qi]) return;
        block.quizQuestions[qi].options[i] = input.value;
        persist();
      };
    });
    $$('[data-quiz-correct]', el).forEach((radio) => {
      radio.onchange = () => {
        if (!radio.checked) return;
        const qi = Number(radio.dataset.quizQ);
        const i = Number(radio.dataset.quizCorrect);
        if (!Number.isFinite(qi) || !Number.isFinite(i) || !block.quizQuestions[qi]) return;
        block.quizQuestions[qi].correct = i;
        persist();
      };
    });
  }

  if (block.type === 'worldmap') {
    $$('[data-map-pin-label]', el).forEach((input) => {
      input.oninput = () => {
        const pin = block.mapPins.find((p) => p.id === input.dataset.mapPinLabel);
        if (pin) {
          pin.label = input.value;
          input.size = Math.max(8, input.value.length + 1);
          persist();
        }
      };
    });
  }
}

function handleQuizCardAction(block, action, questionIndex, optionIndex, mode) {
  normalizeQuizData(block);
  const qi = Number(questionIndex);
  const q = Number.isFinite(qi) ? block.quizQuestions[qi] : null;

  if (action === 'quiz-add-question') {
    block.quizQuestions.push(defaultQuizQuestion());
    persist();
    render();
    showToast('Question added');
    return;
  }

  if (action === 'quiz-remove-question' && block.quizQuestions.length > 1 && q) {
    block.quizQuestions.splice(qi, 1);
    persist();
    render();
    showToast('Question removed');
    return;
  }

  if (!q) return;

  if (action === 'quiz-mode' && (mode === 'mc' || mode === 'tf')) {
    if (q.mode === mode) return;
    q.mode = mode;
    if (mode === 'tf') {
      q.options = ['True', 'False'];
      q.correct = 0;
    } else {
      q.options = defaultQuizOptions();
      q.correct = 0;
    }
    normalizeQuizQuestion(q);
    persist();
    render();
    showToast(mode === 'tf' ? 'True / False' : 'Multi-choice');
    return;
  }

  if (action === 'quiz-add' && q.mode === 'mc') {
    q.options.push(`Option ${q.options.length + 1}`);
    persist();
    render();
    showToast('Option added');
    return;
  }

  if (action === 'quiz-remove' && q.mode === 'mc' && q.options.length > 2 && Number.isFinite(optionIndex)) {
    q.options.splice(optionIndex, 1);
    if (q.correct >= q.options.length) {
      q.correct = q.options.length - 1;
    } else if (q.correct > optionIndex) {
      q.correct -= 1;
    }
    persist();
    render();
    showToast('Option removed');
  }
}

function syncPollVoteLabels(el, block) {
  normalizePollData(block);
  $$('[data-poll-option]', el).forEach((input) => {
    const i = Number(input.dataset.pollOption);
    const badge = input.closest('.block-poll-option')?.querySelector('.block-poll-votes');
    if (badge && Number.isFinite(i)) badge.textContent = String(block.pollVotes[i] || 0);
  });
}

function handlePollCardAction(block, el, action, index) {
  normalizePollData(block);
  if (action === 'poll-add') {
    block.pollOptions.push(`Option ${block.pollOptions.length + 1}`);
    block.pollVotes.push(0);
    persist();
    render();
    showToast('Option added');
    return;
  }
  if (action === 'poll-remove' && block.pollOptions.length > 2 && Number.isFinite(index)) {
    block.pollOptions.splice(index, 1);
    block.pollVotes.splice(index, 1);
    persist();
    render();
    showToast('Option removed');
    return;
  }
  if (action === 'poll-reset') {
    block.pollVotes = block.pollOptions.map(() => 0);
    persist();
    syncPollVoteLabels(el, block);
    showToast('Votes reset');
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
      rememberBoardAccent(btn.dataset.color);
      closeAllDropdowns();
      render();
      return;
    }

    const action = btn.dataset.action;
    if (action === 'delete') {
      closeAllDropdowns();
      deleteBlock(block.id);
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

    if (e.target.closest('[data-action="gallery-view"]')) {
      e.preventDefault();
      e.stopPropagation();
      openGalleryViewer(block.id);
      return;
    }

    if (e.target.closest('[data-action="remove-image"]')) {
      e.preventDefault();
      e.stopPropagation();
      delete block.imageData;
      render();
      persist();
      showToast('Image removed');
      return;
    }

    const alignBtn = e.target.closest('[data-action="text-align"]');
    if (alignBtn && blockUsesTextStyle(block)) {
      e.preventDefault();
      e.stopPropagation();
      block.textAlign = alignBtn.dataset.textAlign;
      normalizeTextCardStyle(block);
      syncTextCardStyleOnBlock(el, block);
      syncBlockFooter(el, block);
      persist();
      return;
    }

    const tableColAlignBtn = e.target.closest('[data-action="table-col-align"]');
    if (tableColAlignBtn && block.type === 'table') {
      e.preventDefault();
      e.stopPropagation();
      const colIndex = Number(tableColAlignBtn.dataset.colIndex) || 0;
      const align = tableColAlignBtn.dataset.textAlign;
      if (!TABLE_CELL_ALIGNS.includes(align)) return;
      normalizeTableColAligns(block);
      if (!block.tableColAligns) block.tableColAligns = ['center'];
      block.tableColAligns[colIndex] = align;
      syncTableColAlignOnBlock(el, block);
      syncBlockFooter(el, block);
      persist();
      return;
    }

    const sizeBtn = e.target.closest('[data-action="text-size"]');
    if (sizeBtn && blockUsesTextStyle(block)) {
      e.preventDefault();
      e.stopPropagation();
      block.textSize = sizeBtn.dataset.textSize;
      normalizeTextCardStyle(block);
      syncTextCardStyleOnBlock(el, block);
      syncBlockFooter(el, block);
      persist();
      return;
    }

    if (e.target.closest('[data-action="toggle-list-reveal"]')) {
      e.preventDefault();
      e.stopPropagation();
      block.listRevealAll = !block.listRevealAll;
      syncBlockFooter(el, block);
      persist();
      showToast(listUsesRevealInPresent(block) ? 'Bullet reveal on' : 'Bullet reveal off');
      return;
    }

    if (e.target.closest('[data-action="toggle-map-reveal"]')) {
      e.preventDefault();
      e.stopPropagation();
      block.mapRevealAll = !block.mapRevealAll;
      syncBlockFooter(el, block);
      persist();
      showToast(!block.mapRevealAll ? 'Pin reveal on' : 'Pin reveal off');
      return;
    }

    if (e.target.closest('[data-action="reset-map-image"]')) {
      e.preventDefault();
      e.stopPropagation();
      delete block.imageData;
      delete block.mapImageData;
      persist();
      updateBlockElement(el, block);
      showToast('Default map restored');
      return;
    }

    if (e.target.closest('[data-action="map-remove-pin"]')) {
      e.preventDefault();
      e.stopPropagation();
      const btn = e.target.closest('[data-action="map-remove-pin"]');
      removeWorldMapPin(block, btn.dataset.pinId, el);
      return;
    }

    if (
      block.type === 'worldmap' &&
      e.target.closest('.worldmap-image-base[data-map-add]') &&
      !e.target.closest('.worldmap-pin')
    ) {
      e.preventDefault();
      e.stopPropagation();
      addWorldMapPin(block, e.clientX, e.clientY, el);
      return;
    }

    const pollBtn = e.target.closest('[data-action="poll-add"], [data-action="poll-remove"], [data-action="poll-reset"]');
    if (pollBtn && block.type === 'poll') {
      e.preventDefault();
      e.stopPropagation();
      handlePollCardAction(block, el, pollBtn.dataset.action, Number(pollBtn.dataset.pollIndex));
      return;
    }

    const quizBtn = e.target.closest(
      '[data-action="quiz-add"], [data-action="quiz-remove"], [data-action="quiz-mode"], [data-action="quiz-add-question"], [data-action="quiz-remove-question"]'
    );
    if (quizBtn && block.type === 'quiz') {
      e.preventDefault();
      e.stopPropagation();
      handleQuizCardAction(
        block,
        quizBtn.dataset.action,
        Number(quizBtn.dataset.quizQ),
        Number(quizBtn.dataset.quizIndex),
        quizBtn.dataset.mode
      );
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

    if (e.target.closest('.table-col-resize') || tableColResizeState) return;

    if (
      e.target.closest(
        'input, textarea, [contenteditable], label, a, .block-footer-btn, .block-footer-segment-btn, .doc-upload-btn, .block-poll, .block-quiz, .worldmap-pin, .gallery-station-btn'
      )
    ) {
      if (selectedId !== block.id) selectBlock(block.id);
      return;
    }

    if (block.galleryStation && galleryStationHasMedia(block) && !e.target.closest('.block-header-actions')) {
      openGalleryViewer(block.id);
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
    const content =
      $('[data-field="blank-content"]', el) ||
      $('[data-field="content"]', el) ||
      $('[contenteditable="true"]', el);
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

  if (block.type === 'image' || block.type === 'worldmap' || blockAcceptsInlineImage(block)) {
    el.addEventListener('dragover', (e) => {
      if ([...e.dataTransfer.types].includes('Files')) {
        e.preventDefault();
        el.classList.add(block.galleryStation ? 'is-file-dragover' : 'is-img-dragover');
      }
    });
    el.addEventListener('dragleave', (e) => {
      if (!el.contains(e.relatedTarget)) {
        el.classList.remove('is-img-dragover', 'is-file-dragover');
      }
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('is-img-dragover', 'is-file-dragover');
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      if (block.galleryStation) {
        applyGalleryStationFile(file, block, el);
        return;
      }
      if (file.type.startsWith('image/')) readImageFile(file, block, el);
    });
  }

  el.addEventListener(
    'paste',
    (e) => {
      if (e.defaultPrevented) return;
      if (block.id !== selectedId) return;
      tryPasteImageToSelectedCard(e);
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
    if (blockAcceptsImagePaste(block)) {
      requestAnimationFrame(() => {
        const editing = document.activeElement?.closest(
          `[data-block-id="${id}"] [contenteditable="true"], [data-block-id="${id}"] input, [data-block-id="${id}"] textarea`
        );
        if (!editing) el.focus({ preventScroll: true });
      });
    }
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
  delete block.tableColAligns;
  delete block.imageData;
  delete block.docData;
  delete block.docName;
  delete block.docMime;
  delete block.docPreviewHtml;
  delete block.timerSec;
  delete block.blankContent;
  delete block.blankDraw;
  delete block.listRevealAll;
  delete block.pollOptions;
  delete block.pollVotes;
  delete block.quizMode;
  delete block.quizOptions;
  delete block.quizCorrect;
  delete block.quizQuestions;
  delete block.bloomLevels;
  delete block.bloomTask;
  delete block.brainBreakCategories;
  delete block.mapPins;
  delete block.mapRevealAll;
  delete block.mapImageData;
  delete block.textAlign;
  delete block.textSize;
  delete block.headingAlign;
  delete block.headingSize;
}

function defaultBrainBreakCategories() {
  return brainBreakLibraryAsCategories();
}

function normalizeBrainBreakData(block) {
  if (block?.type !== 'brainbreak') return;
  if (!Array.isArray(block.brainBreakCategories) || block.brainBreakCategories.length === 0) {
    block.brainBreakCategories = defaultBrainBreakCategories();
    return;
  }
  const library = brainBreakLibraryAsCategories();
  block.brainBreakCategories = block.brainBreakCategories.map((cat, ci) => {
    const fallback = library[ci] || library[0] || { name: '', hint: '', accent: '#64748b', surface: '#f1f5f9', activities: [] };
    const activities = Array.isArray(cat.activities) ? cat.activities : [];
    return {
      name: cat.name || fallback.name,
      hint: cat.hint || fallback.hint,
      accent: cat.accent || fallback.accent,
      surface: cat.surface || fallback.surface,
      activities:
        activities.length > 0
          ? activities.map((a, ai) => ({
              title: a.title || fallback.activities[ai]?.title || 'Activity',
              detail: a.detail || fallback.activities[ai]?.detail || '',
            }))
          : fallback.activities.map((a) => ({ ...a })),
    };
  });
}

function flattenBrainBreakActivities(block) {
  normalizeBrainBreakData(block);
  const flat = [];
  block.brainBreakCategories.forEach((cat) => {
    cat.activities.forEach((act) => {
      flat.push({
        category: cat.name,
        hint: cat.hint,
        accent: cat.accent,
        surface: cat.surface,
        title: act.title,
        detail: act.detail,
      });
    });
  });
  return flat;
}

function getBrainBreakActivityCardHTML(item, { compact = false } = {}) {
  return `<article class="brainbreak-activity${compact ? ' brainbreak-activity--compact' : ''}">
      <h4 class="brainbreak-activity-title">${escapeHtml(item.title)}</h4>
      <p class="brainbreak-activity-detail">${escapeHtml(item.detail)}</p>
    </article>`;
}

function getBrainBreakEditorHTML(block) {
  normalizeBrainBreakData(block);
  const title = escapeHtml(block.title || '');
  const sections = block.brainBreakCategories
    .map(
      (cat) => `<section class="brainbreak-category" style="--bb-accent:${cat.accent};--bb-surface:${cat.surface}">
        <header class="brainbreak-category-head">
          <h3 class="brainbreak-category-name">${escapeHtml(cat.name)}</h3>
          <p class="brainbreak-category-hint">${escapeHtml(cat.hint)}</p>
        </header>
        <div class="brainbreak-activities">${cat.activities.map((a) => getBrainBreakActivityCardHTML(a, { compact: true })).join('')}</div>
      </section>`
    )
    .join('');
  return `<input class="block-title-input" type="text" value="${title}" placeholder="Brain break" data-field="title" />
    <p class="brainbreak-board-note">${flattenBrainBreakActivities(block).length} ideas · Present one at a time</p>
    <div class="block-brainbreak">${sections}</div>`;
}

function brainBreakHasMorePresentSteps(block) {
  const flat = flattenBrainBreakActivities(block);
  return presentBrainBreakIndex < flat.length - 1;
}

function getPresentBrainBreakRevealHintHTML(block) {
  if (!brainBreakHasMorePresentSteps(block)) return '';
  return '<p class="present-reveal-hint">Click or press Space for next brain break</p>';
}

function getBrainBreakPresentHTML(block) {
  const flat = flattenBrainBreakActivities(block);
  const i = Math.min(presentBrainBreakIndex, Math.max(0, flat.length - 1));
  const item = flat[i];
  const progress = `<p class="present-brainbreak-progress">Break ${i + 1} of ${flat.length}</p>`;
  const category = `<p class="present-brainbreak-category" style="--bb-accent:${item.accent}">${escapeHtml(item.category)}</p>`;
  const body = `<div class="present-brainbreak-card" style="--bb-accent:${item.accent};--bb-surface:${item.surface}">
      <h2 class="present-brainbreak-title">${escapeHtml(item.title)}</h2>
      <p class="present-brainbreak-detail">${escapeHtml(item.detail)}</p>
    </div>`;
  return `${progress}${category}${body}${getPresentBrainBreakRevealHintHTML(block)}`;
}

function ensurePresentBrainBreakState(block) {
  if (!block || block.type !== 'brainbreak') {
    presentBrainBreakRevealBlockId = null;
    presentBrainBreakIndex = 0;
    return;
  }
  if (block.id !== presentBrainBreakRevealBlockId) {
    presentBrainBreakRevealBlockId = block.id;
    presentBrainBreakIndex = 0;
  }
  const total = flattenBrainBreakActivities(block).length;
  if (presentBrainBreakIndex >= total) presentBrainBreakIndex = Math.max(0, total - 1);
}

const WORLD_MAP_ASSET = 'assets/world-map.jpg';
const WORLD_MAP_WIDTH = 4000;
const WORLD_MAP_HEIGHT = 2000;

const MAP_PIN_SVG = `<svg class="worldmap-pin-marker" viewBox="0 0 24 32" width="28" height="37" aria-hidden="true" focusable="false">
  <path fill="#e53935" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"/>
  <circle cx="12" cy="11" r="5" fill="#fff"/>
</svg>`;

function getWorldMapAssetUrl(path = WORLD_MAP_ASSET) {
  try {
    return new URL(path, document.baseURI).href;
  } catch {
    return path;
  }
}

function isWorldMapDebugMode() {
  try {
    return new URLSearchParams(location.search).has('mapdebug');
  } catch {
    return false;
  }
}

function getWorldMapMapSrc(block) {
  if (block?.type !== 'worldmap') return null;
  return block.imageData || block.mapImageData || null;
}

/** Same <img> markup as Image card — custom upload or bundled hi-res asset. */
function getWorldMapImgHTML(block) {
  const custom = getWorldMapMapSrc(block);
  const src = custom || getWorldMapAssetUrl();
  if (custom) {
    return `<img src="${src}" alt="World map" draggable="false" />`;
  }
  return `<img src="${escapeAttr(src)}" alt="World map" draggable="false" decoding="async" />`;
}

function getWorldMapDebugPanelHTML(block) {
  const custom = getWorldMapMapSrc(block);
  const srcPreview = custom
    ? String(custom).slice(0, 40)
    : getWorldMapAssetUrl(WORLD_MAP_ASSET).slice(0, 40);
  return `<div class="worldmap-debug" data-worldmap-debug>
    <p><strong>Map debug</strong> (<code>?mapdebug=1</code> — Image-card layout, pins off)</p>
    <p>imageData: ${block.imageData ? 'yes' : 'no'}</p>
    <p>mapImageData: ${block.mapImageData ? 'yes' : 'no'}</p>
    <p>active src: <code data-debug-src>${escapeHtml(srcPreview)}…</code></p>
    <p>natural: <span data-debug-natural>—</span></p>
    <p>rendered: <span data-debug-client>—</span></p>
  </div>`;
}

function syncWorldMapDebugInfo(el, block) {
  const panel = $('[data-worldmap-debug]', el);
  if (!panel) return;
  const img = $('.block-image-wrap img', el);
  const natural = panel.querySelector('[data-debug-natural]');
  const client = panel.querySelector('[data-debug-client]');
  const srcEl = panel.querySelector('[data-debug-src]');
  if (!img) {
    if (natural) natural.textContent = 'no img';
    if (client) client.textContent = 'no img';
    return;
  }
  const update = () => {
    if (srcEl) {
      const kind = img.src.startsWith('data:') ? 'data URL' : 'asset URL';
      srcEl.textContent = `${kind}: ${img.src.slice(0, 40)}…`;
    }
    if (natural) natural.textContent = `${img.naturalWidth} × ${img.naturalHeight}`;
    if (client) client.textContent = `${Math.round(img.clientWidth)} × ${Math.round(img.clientHeight)}`;
  };
  if (img.complete) update();
  else img.addEventListener('load', update, { once: true });
}

function normalizeWorldMapData(block) {
  if (block?.type !== 'worldmap') return;
  if (block.mapImageData && !block.imageData) {
    block.imageData = block.mapImageData;
    delete block.mapImageData;
  }
  if (!Array.isArray(block.mapPins)) block.mapPins = [];
  block.mapPins = block.mapPins
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      id: p.id || uid(),
      x: Math.max(0, Math.min(100, Number(p.x) || 0)),
      y: Math.max(0, Math.min(100, Number(p.y) || 0)),
      label: typeof p.label === 'string' ? p.label : 'Pin',
    }));
}

function getMapPinIconHTML() {
  return MAP_PIN_SVG;
}

function getWorldMapPinMarkup(pin, { present = false } = {}) {
  const label = escapeHtml(pin.label || 'Pin');
  const labelHtml = present
    ? `<span class="worldmap-pin-label">${label}</span>`
    : `<input type="text" class="worldmap-pin-label" value="${label}" data-map-pin-label="${escapeAttr(pin.id)}" placeholder="Label…" size="${Math.max(8, (pin.label || 'Pin').length + 1)}" />`;
  const removeBtn = present
    ? ''
    : `<button type="button" class="worldmap-pin-remove" data-action="map-remove-pin" data-pin-id="${escapeAttr(pin.id)}" aria-label="Remove pin">×</button>`;
  return `<div class="worldmap-pin" style="left:${pin.x}%;top:${pin.y}%" data-pin-id="${escapeAttr(pin.id)}">
      <div class="worldmap-pin-body">
        <div class="worldmap-pin-label-wrap">
          ${labelHtml}
          ${removeBtn}
        </div>
        ${getMapPinIconHTML()}
      </div>
    </div>`;
}

/** Map click position → % along the visible map (the map-anchor box, not the outer card). */
function clientToMapPercent(wrap, clientX, clientY) {
  const anchor = $('.worldmap-map-anchor', wrap);
  const img = $('img', anchor || wrap);
  if (!img) return null;
  const rect = (anchor || img).getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return null;
  return {
    x: Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)) * 10) / 10,
    y: Math.round(Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)) * 10) / 10,
  };
}

function getWorldMapStageHTML(block, { present = false, visiblePinCount } = {}) {
  normalizeWorldMapData(block);
  const pins = block.mapPins;
  const showCount =
    present && worldMapUsesRevealInPresent(block) && Number.isFinite(visiblePinCount)
      ? Math.max(0, Math.min(visiblePinCount, pins.length))
      : pins.length;
  const pinHtml = pins
    .slice(0, showCount)
    .map((pin) => getWorldMapPinMarkup(pin, { present }))
    .join('');
  const addAttr = present ? '' : ' data-map-add="1"';
  const hint = present
    ? ''
    : '<p class="worldmap-hint">Click map to add a pin</p>';
  const custom = getWorldMapMapSrc(block);
  const debug = isWorldMapDebugMode() && !!custom;
  const imgHtml = getWorldMapImgHTML(block);

  const mapInner = `<div class="worldmap-map-anchor">
      ${imgHtml}
      ${pinHtml ? `<div class="worldmap-pins-overlay">${pinHtml}</div>` : ''}
    </div>`;

  if (debug) {
    return `<div class="block-image-wrap">${mapInner}</div>
    ${getWorldMapDebugPanelHTML(block)}`;
  }

  const presentClass = present ? ' worldmap-image-base--present' : '';
  return `${hint}<div class="block-image-wrap worldmap-image-base${presentClass}"${addAttr}>
      ${mapInner}
    </div>`;
}

function getWorldMapEditorHTML(block) {
  const title = escapeHtml(block.title || '');
  normalizeWorldMapData(block);
  return `<input class="block-title-input" type="text" value="${title}" placeholder="World map" data-field="title" />
    ${getWorldMapStageHTML(block)}`;
}

function worldMapUsesRevealInPresent(block) {
  normalizeWorldMapData(block);
  return block?.type === 'worldmap' && !block.mapRevealAll && block.mapPins.length > 1;
}

function getMapRevealFooterHTML(block) {
  const on = !block.mapRevealAll;
  return `<div class="block-footer-reveal block-footer-reveal--compact" title="${on ? 'Reveal pins one at a time in Present' : 'Show all pins at once in Present'}">
    <span class="block-footer-reveal-label block-footer-reveal-label--stacked" aria-hidden="true"><span>Pin</span><span>reveal</span></span>
    <button type="button" class="block-footer-toggle block-footer-toggle--compact${on ? ' is-on' : ''}" role="switch" aria-checked="${on ? 'true' : 'false'}" aria-label="Pin reveal in Present" data-action="toggle-map-reveal">
      <span class="block-footer-toggle-track" aria-hidden="true"><span class="block-footer-toggle-thumb"></span></span>
    </button>
  </div>`;
}

function getPresentMapRevealHintHTML(block) {
  if (!worldMapUsesRevealInPresent(block)) return '';
  const total = block.mapPins.length;
  if (presentMapPinCount >= total) return '';
  return '<p class="present-reveal-hint">Click or press Space for next pin</p>';
}

function getWorldMapPresentHTML(block) {
  normalizeWorldMapData(block);
  const total = block.mapPins.length;
  const show =
    worldMapUsesRevealInPresent(block) && total > 0
      ? Math.max(1, Math.min(presentMapPinCount, total))
      : total;
  const progress =
    worldMapUsesRevealInPresent(block) && total > 1
      ? `<p class="present-worldmap-progress">Pin ${show} of ${total}</p>`
      : '';
  return `${progress}${getWorldMapStageHTML(block, { present: true, visiblePinCount: show })}${getPresentMapRevealHintHTML(block)}`;
}

function ensurePresentMapPinState(block) {
  if (!block || block.type !== 'worldmap') {
    presentMapRevealBlockId = null;
    presentMapPinCount = 0;
    return;
  }
  if (!worldMapUsesRevealInPresent(block)) {
    presentMapRevealBlockId = null;
    presentMapPinCount = 0;
    return;
  }
  if (block.id !== presentMapRevealBlockId) {
    presentMapRevealBlockId = block.id;
    presentMapPinCount = 1;
  }
  const total = block.mapPins.length;
  if (presentMapPinCount > total) presentMapPinCount = total;
  if (presentMapPinCount < 1 && total > 0) presentMapPinCount = 1;
}

function addWorldMapPin(block, clientX, clientY, el) {
  normalizeWorldMapData(block);
  const stage = $('.worldmap-image-base[data-map-add]', el);
  if (!stage) return;
  const pos = clientToMapPercent(stage, clientX, clientY);
  if (!pos) return;
  block.mapPins.push({
    id: uid(),
    x: pos.x,
    y: pos.y,
    label: 'New pin',
  });
  persist();
  updateBlockElement(el, block);
  showToast('Pin added');
}

function removeWorldMapPin(block, pinId, el) {
  normalizeWorldMapData(block);
  const before = block.mapPins.length;
  block.mapPins = block.mapPins.filter((p) => p.id !== pinId);
  if (block.mapPins.length === before) return;
  persist();
  updateBlockElement(el, block);
  showToast('Pin removed');
}

function defaultBloomLevels() {
  return BLOOM_LEVELS_DEFAULT.map((level) => ({
    name: level.name,
    description: level.description,
    verbs: [...level.verbs],
    header: level.header,
    surface: level.surface,
    label: level.label,
  }));
}

function normalizeBloomData(block) {
  if (block?.type !== 'bloom') return;
  if (!Array.isArray(block.bloomLevels) || block.bloomLevels.length === 0) {
    block.bloomLevels = defaultBloomLevels();
    return;
  }
  block.bloomLevels = block.bloomLevels.map((level, i) => {
    const fallback = BLOOM_LEVELS_DEFAULT[i] || BLOOM_LEVELS_DEFAULT[0];
    return {
      name: level.name || fallback.name,
      description: level.description || fallback.description,
      verbs: Array.isArray(level.verbs) && level.verbs.length ? [...level.verbs] : [...fallback.verbs],
      header: level.header || fallback.header,
      surface: level.surface || fallback.surface,
      label: level.label || fallback.label,
    };
  });
}

function formatBloomVerbs(verbs) {
  return (verbs || []).map((v) => escapeHtml(v)).join(' · ');
}

function getBloomLevelHTML(level, { present = false } = {}) {
  const name = escapeHtml(level.name || '');
  const desc = escapeHtml(level.description || '');
  const verbs = formatBloomVerbs(level.verbs);
  const cls = present ? 'bloom-level bloom-level--present' : 'bloom-level';
  return `<div class="${cls}" style="--bloom-header:${level.header};--bloom-surface:${level.surface};--bloom-label:${level.label}">
      <div class="bloom-level-pyramid" aria-hidden="true"><span>${name.toUpperCase()}</span></div>
      <div class="bloom-level-panel">
        <p class="bloom-level-desc">${desc}</p>
        <p class="bloom-level-verbs">${verbs}</p>
      </div>
    </div>`;
}

function getBloomTaskEditorHTML(block) {
  const task = block.bloomTask || '';
  return `<div class="bloom-task-editor block-content" contenteditable="true" data-field="bloom-task" data-placeholder="Add optional task here">${task}</div>`;
}

function getBloomPresentTaskHTML(block) {
  const task = (block.bloomTask || '').trim();
  if (!task) return '';
  return `<div class="present-bloom-task">${task}</div>`;
}

function getBloomEditorHTML(block) {
  normalizeBloomData(block);
  const title = escapeHtml(block.title || '');
  const levels = block.bloomLevels.map((level) => getBloomLevelHTML(level)).join('');
  return `<input class="block-title-input" type="text" value="${title}" placeholder="Bloom's taxonomy" data-field="title" />
    <div class="block-bloom">${levels}</div>
    ${getBloomTaskEditorHTML(block)}`;
}

function getBloomPresentHTML(block) {
  normalizeBloomData(block);
  const levels = block.bloomLevels.map((level) => getBloomLevelHTML(level, { present: true })).join('');
  const task = getBloomPresentTaskHTML(block);
  return `<div class="present-bloom-wrap"><div class="present-bloom">${levels}</div>${task}</div>`;
}

function defaultPollOptions() {
  return ['Option A', 'Option B', 'Option C'];
}

function normalizePollData(block) {
  if (block?.type !== 'poll') return;
  if (!Array.isArray(block.pollOptions) || block.pollOptions.length < 2) {
    block.pollOptions = defaultPollOptions();
  }
  while (block.pollOptions.length < 2) {
    block.pollOptions.push(`Option ${block.pollOptions.length + 1}`);
  }
  const prev = Array.isArray(block.pollVotes) ? block.pollVotes : [];
  if (block.pollVotes?.length !== block.pollOptions.length) {
    block.pollVotes = block.pollOptions.map((_, i) => Math.max(0, Number(prev[i]) || 0));
  }
}

function getPollTotalVotes(block) {
  normalizePollData(block);
  return block.pollVotes.reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function getPollEditorHTML(block) {
  normalizePollData(block);
  const title = escapeHtml(block.title || '');
  const options = block.pollOptions
    .map((opt, i) => {
      const votes = block.pollVotes[i] || 0;
      const removeDisabled = block.pollOptions.length <= 2 ? ' disabled' : '';
      return `<li class="block-poll-option">
          <input type="text" class="block-poll-option-input" value="${escapeAttr(opt)}" placeholder="Option ${i + 1}" data-poll-option="${i}" />
          <span class="block-poll-votes" title="Votes">${votes}</span>
          <button type="button" class="block-poll-remove" data-action="poll-remove" data-poll-index="${i}" aria-label="Remove option"${removeDisabled}>×</button>
        </li>`;
    })
    .join('');

  return `<input class="block-title-input" type="text" value="${title}" placeholder="Poll question" data-field="title" />
    <div class="block-poll">
      <ul class="block-poll-options">${options}</ul>
      <div class="block-poll-actions">
        <button type="button" class="block-poll-add" data-action="poll-add">+ Add option</button>
        <button type="button" class="block-poll-reset" data-action="poll-reset">Reset votes</button>
      </div>
    </div>`;
}

function getPollPresentHTML(block) {
  normalizePollData(block);
  const total = getPollTotalVotes(block);
  const options = block.pollOptions
    .map((opt, i) => {
      const votes = block.pollVotes[i] || 0;
      const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
      const label = escapeHtml(opt.trim() || `Option ${i + 1}`);
      return `<button type="button" class="present-poll-option" data-poll-vote="${i}">
          <span class="present-poll-option-row">
            <span class="present-poll-option-label">${label}</span>
            <span class="present-poll-option-meta">${votes}${total > 0 ? ` · ${pct}%` : ''}</span>
          </span>
          <span class="present-poll-bar" style="--poll-pct: ${pct}%"></span>
        </button>`;
    })
    .join('');

  return `<div class="present-poll">${options}</div>`;
}

function defaultQuizOptions() {
  return ['Option A', 'Option B', 'Option C'];
}

function defaultQuizQuestion(overrides = {}) {
  return {
    question: '',
    mode: 'mc',
    options: defaultQuizOptions(),
    correct: 0,
    ...overrides,
  };
}

function normalizeQuizQuestion(q) {
  if (!q) return defaultQuizQuestion();
  if (q.mode !== 'tf') q.mode = 'mc';

  if (q.mode === 'tf') {
    q.options = ['True', 'False'];
    q.correct = Number(q.correct) === 1 ? 1 : 0;
    return q;
  }

  if (!Array.isArray(q.options) || q.options.length < 2) {
    q.options = defaultQuizOptions();
  }
  while (q.options.length < 2) {
    q.options.push(`Option ${q.options.length + 1}`);
  }
  const c = Number(q.correct);
  q.correct = Number.isFinite(c) && c >= 0 && c < q.options.length ? c : 0;
  q.question = q.question ?? '';
  return q;
}

function normalizeQuizData(block) {
  if (block?.type !== 'quiz') return;

  if (!Array.isArray(block.quizQuestions) || block.quizQuestions.length === 0) {
    if (block.quizOptions || block.quizMode || block.title) {
      block.quizQuestions = [
        normalizeQuizQuestion({
          question: block.title || '',
          mode: block.quizMode === 'tf' ? 'tf' : 'mc',
          options: Array.isArray(block.quizOptions) ? [...block.quizOptions] : undefined,
          correct: block.quizCorrect,
        }),
      ];
    } else {
      block.quizQuestions = [defaultQuizQuestion()];
    }
    delete block.quizMode;
    delete block.quizOptions;
    delete block.quizCorrect;
    if (block.quizQuestions.length === 1 && block.title === block.quizQuestions[0].question) {
      block.title = '';
    }
  }

  block.quizQuestions = block.quizQuestions.map((q) => normalizeQuizQuestion({ ...q }));
}

function getQuizQuestions(block) {
  normalizeQuizData(block);
  return block.quizQuestions;
}

function getQuizQuestionEditorHTML(block, q, qi, total) {
  const isTf = q.mode === 'tf';
  const options = q.options
    .map((opt, i) => {
      const checked = q.correct === i ? ' checked' : '';
      const removeDisabled = isTf || q.options.length <= 2 ? ' disabled' : '';
      const readonly = isTf ? ' readonly' : '';
      return `<li class="block-quiz-option">
          <input type="radio" class="block-quiz-correct" name="quiz-correct-${block.id}-${qi}" data-quiz-q="${qi}" data-quiz-correct="${i}"${checked} aria-label="Mark as correct answer" title="Correct answer" />
          <input type="text" class="block-quiz-option-input" value="${escapeAttr(opt)}" placeholder="${isTf ? '' : `Option ${i + 1}`}" data-quiz-q="${qi}" data-quiz-option="${i}"${readonly} />
          <button type="button" class="block-quiz-remove" data-action="quiz-remove" data-quiz-q="${qi}" data-quiz-index="${i}" aria-label="Remove option"${removeDisabled}>×</button>
        </li>`;
    })
    .join('');

  const removeQDisabled = total <= 1 ? ' disabled' : '';

  return `<section class="block-quiz-item" data-quiz-item="${qi}">
      <div class="block-quiz-item-head">
        <span class="block-quiz-item-label">Question ${qi + 1}</span>
        <button type="button" class="block-quiz-remove-q" data-action="quiz-remove-question" data-quiz-q="${qi}" aria-label="Remove question"${removeQDisabled}>×</button>
      </div>
      <input type="text" class="block-quiz-question-input" value="${escapeAttr(q.question || '')}" placeholder="Enter question" data-quiz-question="${qi}" />
      <div class="block-quiz-mode" role="group" aria-label="Question ${qi + 1} type">
        <button type="button" class="block-quiz-mode-btn${isTf ? '' : ' is-active'}" data-action="quiz-mode" data-mode="mc" data-quiz-q="${qi}">Multi-choice</button>
        <button type="button" class="block-quiz-mode-btn${isTf ? ' is-active' : ''}" data-action="quiz-mode" data-mode="tf" data-quiz-q="${qi}">True / False</button>
      </div>
      <p class="block-quiz-hint">Select the correct answer</p>
      <ul class="block-quiz-options">${options}</ul>
      <div class="block-quiz-actions">
        <button type="button" class="block-quiz-add" data-action="quiz-add" data-quiz-q="${qi}"${isTf ? ' hidden' : ''}>+ Add option</button>
      </div>
    </section>`;
}

function getQuizEditorHTML(block) {
  normalizeQuizData(block);
  const title = escapeHtml(block.title || '');
  const questions = block.quizQuestions
    .map((q, qi) => getQuizQuestionEditorHTML(block, q, qi, block.quizQuestions.length))
    .join('');

  return `<input class="block-title-input" type="text" value="${title}" placeholder="Quiz title (optional)" data-field="title" />
    <div class="block-quiz">
      <div class="block-quiz-questions">${questions}</div>
      <button type="button" class="block-quiz-add-question" data-action="quiz-add-question">+ Add question</button>
    </div>`;
}

function quizHasMorePresentSteps(block) {
  const questions = getQuizQuestions(block);
  return presentQuizQuestionAnswered && presentQuizQuestionIndex < questions.length - 1;
}

function getPresentQuizRevealHintHTML(block) {
  if (!quizHasMorePresentSteps(block)) return '';
  return '<p class="present-reveal-hint">Click or press Space for next question</p>';
}

function getQuizPresentHTML(block) {
  const questions = getQuizQuestions(block);
  const qi = Math.min(presentQuizQuestionIndex, Math.max(0, questions.length - 1));
  const q = questions[qi];
  const answered = presentQuizQuestionAnswered;
  const picked = presentQuizPickedIndex;
  const correct = q.correct;

  const progress =
    questions.length > 1
      ? `<p class="present-quiz-progress">Question ${qi + 1} of ${questions.length}</p>`
      : '';

  const questionHeading = q.question?.trim()
    ? `<h2 class="present-quiz-question">${escapeHtml(q.question.trim())}</h2>`
    : `<h2 class="present-quiz-question present-quiz-question--empty">Question ${qi + 1}</h2>`;

  const options = q.options
    .map((opt, i) => {
      const label = escapeHtml(opt.trim() || `Option ${i + 1}`);
      let cls = 'present-quiz-option';
      if (answered) {
        if (i === correct) cls += ' is-correct';
        else if (i === picked) cls += ' is-wrong';
        else cls += ' is-dimmed';
      }
      return `<button type="button" class="${cls}" data-quiz-pick="${i}"${answered ? ' disabled' : ''}>${label}</button>`;
    })
    .join('');

  const feedback =
    answered && picked === correct
      ? '<p class="present-quiz-feedback is-correct">Correct!</p>'
      : answered
        ? '<p class="present-quiz-feedback is-wrong">Not quite — see the correct answer highlighted.</p>'
        : '<p class="present-quiz-hint">Tap an answer</p>';

  return `${progress}${questionHeading}${feedback}<div class="present-quiz">${options}</div>${getPresentQuizRevealHintHTML(block)}`;
}

function ensurePresentQuizState(block) {
  if (!block || block.type !== 'quiz') {
    presentQuizRevealBlockId = null;
    presentQuizQuestionIndex = 0;
    presentQuizQuestionAnswered = false;
    presentQuizPickedIndex = null;
    return;
  }
  if (block.id !== presentQuizRevealBlockId) {
    presentQuizRevealBlockId = block.id;
    presentQuizQuestionIndex = 0;
    presentQuizQuestionAnswered = false;
    presentQuizPickedIndex = null;
  }
  const total = getQuizQuestions(block).length;
  if (presentQuizQuestionIndex >= total) presentQuizQuestionIndex = Math.max(0, total - 1);
}

function applyBlockTypeDefaults(block, type) {
  const prevType = block.type;
  const prevImage = block.imageData;
  const prevMapImage = block.mapImageData;
  const prevMapPins =
    prevType === 'worldmap' && Array.isArray(block.mapPins)
      ? block.mapPins.map((p) => ({ ...p }))
      : null;
  const carriedMapImage = prevImage || prevMapImage || null;
  const prevListRevealAll = prevType === 'list' && type === 'list' ? block.listRevealAll : false;
  const carryToWhiteboard =
    type === 'whiteboard' && !block.blankContent
      ? block.content || ''
      : '';
  const carryToSticky =
    type === 'sticky' && (prevType === 'note' || prevType === 'heading' || prevType === 'list')
      ? block.content || ''
      : '';
  block.type = type;
  clearBlockTypeFields(block);

  if (
    (type === 'note' || type === 'list') &&
    prevImage &&
    (prevType === 'note' || prevType === 'list' || prevType === 'image')
  ) {
    block.imageData = prevImage;
  }

  if (type === 'list') {
    block.content = '<ul><li></li><li></li><li></li></ul>';
    if (block.h < 220) block.h = 260;
    if (prevType === 'list') block.listRevealAll = !!prevListRevealAll;
  } else if (type === 'table') {
    block.tableHtml = defaultTableHtml();
    block.tableColAligns = ['center', 'left', 'left'];
    if (block.h < 200) block.h = 240;
  } else if (type === 'note' || type === 'heading') {
    block.content = '<p></p>';
  } else if (type === 'link') {
    block.url = '';
    if (block.h < 280) block.h = 320;
    if (block.w < 340) block.w = 360;
  } else if (type === 'image') {
    if (block.h < 220) block.h = 280;
    if (carriedMapImage && (prevType === 'worldmap' || prevType === 'image')) {
      block.imageData = carriedMapImage;
    }
  } else if (type === 'document') {
    if (block.w < 340) block.w = 360;
    if (block.h < 280) block.h = 320;
  } else if (type === 'timer') {
    block.timerSec = block.timerSec || 300;
    if (block.w < 280) block.w = 300;
    if (block.h < 200) block.h = 220;
  } else if (type === 'poll') {
    block.pollOptions = defaultPollOptions();
    block.pollVotes = block.pollOptions.map(() => 0);
    if (block.w < 320) block.w = 340;
    if (block.h < 260) block.h = 300;
  } else if (type === 'bloom') {
    block.bloomLevels = defaultBloomLevels();
    if (!block.title) block.title = "Bloom's taxonomy";
    if (block.w < 380) block.w = 400;
    if (block.h < 520) block.h = 560;
  } else if (type === 'brainbreak') {
    block.brainBreakCategories = defaultBrainBreakCategories();
    if (!block.title) block.title = 'Brain break';
    if (block.w < 380) block.w = 400;
    if (block.h < 480) block.h = 520;
  } else if (type === 'worldmap') {
    block.mapPins = prevMapPins || [];
    if (!block.title) block.title = 'World map';
    if (block.w < 600) block.w = 640;
    if (block.h < 360) block.h = 380;
    if (carriedMapImage && (prevType === 'worldmap' || prevType === 'image')) {
      block.imageData = carriedMapImage;
    }
  } else if (type === 'sticky') {
    block.content = carryToSticky?.replace(/<[^>]+>/g, '').trim()
      ? carryToSticky
      : '<p></p>';
    if (block.w > 260) block.w = 220;
    if (block.h > 160) block.h = 130;
    if (block.w < 180) block.w = 220;
    if (block.h < 100) block.h = 130;
  } else if (type === 'quiz') {
    block.quizQuestions = [defaultQuizQuestion()];
    if (block.w < 320) block.w = 340;
    if (block.h < 360) block.h = 400;
  } else if (type === 'whiteboard') {
    block.blankContent = block.blankContent || carryToWhiteboard || '';
    block.blankDraw = block.blankDraw || null;
    if (block.w < 320) block.w = 360;
    if (block.h < 240) block.h = 280;
  }
  if (blockUsesTextStyle(block)) {
    normalizeTextCardStyle(block);
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
    if (type === 'sticky') {
      $('[data-field="content"]', el)?.focus();
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

function getMindMapCenterBlock() {
  return state.mindMapCenterId ? getBlock(state.mindMapCenterId) : null;
}

function getMindMapBranchCount() {
  if (!state.mindMapCenterId) return 0;
  return state.blocks.filter((b) => b.id !== state.mindMapCenterId).length;
}

/** Angle for branch index: 0 at 12 o'clock, clockwise. */
function getMindMapBranchAngle(branchIndex, slotCount) {
  const slots = Math.max(3, slotCount);
  return -Math.PI / 2 + (branchIndex * 2 * Math.PI) / slots;
}

/** Branch indices closest to 12 / 3 / 6 / 9 o'clock for this slot count. */
function getMindMapCardinalIndices(slotCount) {
  const slots = Math.max(3, slotCount);
  if (slots >= 4 && slots % 4 === 0) {
    const step = slots / 4;
    const indices = [];
    for (let i = 0; i < slots; i += step) indices.push(i);
    return indices;
  }
  if (slots === 6) return [0, 3];
  if (slots === 7) return [0, 2, 4, 5];
  if (slots % 2 === 0) return [0, slots / 2];
  return [0];
}

function isMindMapCardinalSlot(branchIndex, slotCount) {
  return getMindMapCardinalIndices(slotCount).includes(branchIndex);
}

/**
 * Which point on the card sits on the orbit ring (hub-facing edge midpoint or inner corner).
 */
function getMindMapAnchorKind(angle, branchIndex, slotCount, cardW) {
  const cw = cardW ?? MIND_MAP_BRANCH.w;
  if (
    slotCount === 7 &&
    cw >= MIND_MAP_SIZES.l.w - 5 &&
    (branchIndex === 3 || branchIndex === 4)
  ) {
    return 'top-center';
  }
  if (isMindMapCardinalSlot(branchIndex, slotCount)) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    if (sin < -0.5) return 'bottom-center';
    if (sin > 0.5) return 'top-center';
    if (cos > 0.5) return 'left-center';
    return 'right-center';
  }
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  if (cos > 0 && sin < 0) return 'bottom-left';
  if (cos < 0 && sin < 0) return 'bottom-right';
  if (cos < 0 && sin > 0) return 'top-right';
  return 'top-left';
}

/** Offset from card top-left to the anchor point on the ring. */
function getMindMapAnchorOffset(w, h, kind) {
  switch (kind) {
    case 'bottom-center':
      return { ax: w / 2, ay: h };
    case 'top-center':
      return { ax: w / 2, ay: 0 };
    case 'left-center':
      return { ax: 0, ay: h / 2 };
    case 'right-center':
      return { ax: w, ay: h / 2 };
    case 'bottom-left':
      return { ax: 0, ay: h };
    case 'bottom-right':
      return { ax: w, ay: h };
    case 'top-right':
      return { ax: w, ay: 0 };
    case 'top-left':
    default:
      return { ax: 0, ay: 0 };
  }
}

/**
 * Radius for this branch's anchor on its spoke (attach point still on a circle).
 * 7/8 Large: tiered rings on the same spokes (attach point still on a circle).
 */
function getMindMapAnchorRadius(branchIndex, slotCount, baseRadius, w) {
  if (w < MIND_MAP_SIZES.l.w - 5) return baseRadius;
  if (slotCount === 7) {
    if (branchIndex === 0) return baseRadius;
    if (branchIndex === 2 || branchIndex === 5) return baseRadius + 24;
    if (branchIndex === 3 || branchIndex === 4) return baseRadius + 34;
    return baseRadius + 28;
  }
  if (slotCount >= 8) {
    if (branchIndex === 0 || branchIndex === 4) return baseRadius;
    if (branchIndex === 2 || branchIndex === 6) return baseRadius + 24;
    return baseRadius + 40;
  }
  if (isMindMapCardinalSlot(branchIndex, slotCount)) return baseRadius;
  return baseRadius;
}

function getMindMapBranchRectAtOrbit(center, branchIndex, slotCount, radius, w, h) {
  const cx = center.x + center.w / 2;
  const cy = center.y + center.h / 2;
  const angle = getMindMapBranchAngle(branchIndex, slotCount);
  const anchorR = getMindMapAnchorRadius(branchIndex, slotCount, radius, w);
  const rx = cx + anchorR * Math.cos(angle);
  const ry = cy + anchorR * Math.sin(angle);
  const kind = getMindMapAnchorKind(angle, branchIndex, slotCount, w);
  const { ax, ay } = getMindMapAnchorOffset(w, h, kind);
  return {
    x: Math.round(rx - ax),
    y: Math.round(ry - ay),
    w,
    h,
  };
}

function getMindMapSevenBottomGap(cardW) {
  if (cardW >= MIND_MAP_SIZES.l.w - 5) return Math.max(56, Math.round(cardW * 0.16));
  if (cardW >= MIND_MAP_SIZES.m.w - 5) return Math.max(32, Math.round(cardW * 0.1));
  return Math.max(20, Math.round(cardW * 0.08));
}

/**
 * 7-branch: Idea 4 & 5 as a centred pair below the hub (spokes at ~64° / ~116° are too tight).
 */
function layoutMindMapSevenBottomPair(center, branches, baseRadius, w, h) {
  const idea4 = branches.find((b) => (b.branchIndex ?? 0) === 3);
  const idea5 = branches.find((b) => (b.branchIndex ?? 0) === 4);
  if (!idea4 || !idea5) return;

  idea4.w = w;
  idea4.h = h;
  idea5.w = w;
  idea5.h = h;

  const hubCx = center.x + center.w / 2;
  const hubBottom = center.y + center.h;
  const cy = center.y + center.h / 2;
  const anchorR = getMindMapAnchorRadius(3, 7, baseRadius, w);
  const angle3 = getMindMapBranchAngle(3, 7);
  const angle4 = getMindMapBranchAngle(4, 7);
  let y = Math.round(
    Math.max(cy + anchorR * Math.sin(angle3), cy + anchorR * Math.sin(angle4))
  );
  const gapBelowHub = Math.max(16, Math.round(h * 0.07));
  y = Math.round(Math.max(y, hubBottom + gapBelowHub));

  const gap = getMindMapSevenBottomGap(w);
  const totalW = idea5.w + gap + idea4.w;
  idea5.x = Math.round(hubCx - totalW / 2);
  idea4.x = idea5.x + idea5.w + gap;
  idea5.y = y;
  idea4.y = y;
}

function mindMapFitsViewport(center, branches, radius, vw, vh, pad, tier) {
  const slots = Math.max(3, branches.length);
  const tierSize = tier && MIND_MAP_SIZES[tier] ? MIND_MAP_SIZES[tier] : null;
  let minX = center.x;
  let minY = center.y;
  let maxX = center.x + center.w;
  let maxY = center.y + center.h;
  for (let i = 0; i < slots; i++) {
    const branch = branches.find((b) => (b.branchIndex ?? 0) === i);
    const w = tierSize?.w ?? branch?.w ?? MIND_MAP_BRANCH.w;
    const h = tierSize?.h ?? branch?.h ?? MIND_MAP_BRANCH.h;
    const rect = getMindMapBranchRectAtOrbit(center, i, slots, radius, w, h);
    minX = Math.min(minX, rect.x);
    minY = Math.min(minY, rect.y);
    maxX = Math.max(maxX, rect.x + rect.w);
    maxY = Math.max(maxY, rect.y + rect.h);
  }
  return minX >= pad && minY >= pad && maxX <= vw - pad && maxY <= vh - pad;
}

function mindMapLayoutFits(center, branches, slots, radius, vw, vh, pad, tier, w, h) {
  return (
    mindMapFitsViewport(center, branches, radius, vw, vh, pad, tier) &&
    !mindMapAdjacentBranchesOverlap(center, slots, radius, w, h)
  );
}

/** Branch reach for ring sizing — use L so S/M/L never pull the ring in/out. */
function getMindMapBranchReachForRing() {
  const l = MIND_MAP_SIZES.l;
  return Math.hypot(l.w, l.h) * 0.55;
}

function getMindMapRingGap(slotCount, tier) {
  const slots = Math.max(3, slotCount);
  let gap = MIND_MAP_RING_GAP + (slots >= 8 ? 10 : slots >= 6 ? 4 : 0);
  if (slots === 7) gap += 10;
  if (slots === 7 && tier === 'l') gap += 14;
  if (slots >= 8 && tier === 'l') gap += 28;
  else if (slots >= 8 && tier === 'm') gap += 12;
  return gap;
}

function mindMapSpacingMargin(slots, cardW) {
  const isLarge = cardW >= MIND_MAP_SIZES.l.w - 5;
  if (isLarge && (slots === 7 || slots >= 8)) return 18;
  return 10;
}

function mindMapRectsOverlap(a, b, margin = 10) {
  return !(
    a.x + a.w + margin <= b.x ||
    b.x + b.w + margin <= a.x ||
    a.y + a.h + margin <= b.y ||
    b.y + b.h + margin <= a.y
  );
}

function mindMapAdjacentBranchesOverlap(center, slots, radius, w, h) {
  const margin = mindMapSpacingMargin(slots, w);
  const rects = [];
  for (let i = 0; i < slots; i++) {
    rects.push(getMindMapBranchRectAtOrbit(center, i, slots, radius, w, h));
  }
  for (let i = 0; i < slots; i++) {
    const j = (i + 1) % slots;
    if (mindMapRectsOverlap(rects[i], rects[j], margin)) return true;
  }
  return false;
}

/** Widen the ring until neighbouring idea cards no longer overlap. */
function expandMindMapOrbitForSpacing(center, branches, slots, radius, w, h, placeAll) {
  const margin = mindMapSpacingMargin(slots, w);
  let guard = 0;
  while (guard++ < 40 && mindMapAdjacentBranchesOverlap(center, slots, radius, w, h)) {
    radius += margin >= 18 ? 10 : 12;
    placeAll(radius);
  }
  return radius;
}

/** Recover ring radius from a placed branch anchor (e.g. after load). */
function inferMindMapOrbitRadius(center, branches) {
  const slots = Math.max(3, branches.length);
  const sample = branches.find((b) => (b.branchIndex ?? 0) === 0) || branches[0];
  if (!sample) return null;
  const cx = center.x + center.w / 2;
  const cy = center.y + center.h / 2;
  const idx = sample.branchIndex ?? 0;
  const angle = getMindMapBranchAngle(idx, slots);
  const kind = getMindMapAnchorKind(angle, idx, slots, sample.w);
  const { ax, ay } = getMindMapAnchorOffset(sample.w, sample.h, kind);
  const dist = Math.hypot(sample.x + ax - cx, sample.y + ay - cy);
  return dist > 0 ? dist : null;
}

/** Smallest ring that keeps branch anchors outside the hub. */
function getMindMapMinOrbitRadius(center) {
  return Math.max(center.w, center.h) * 0.48 + 20;
}

/** Shrink the ring until the layout fits the viewport at the given card size. */
function shrinkMindMapOrbitToViewport(center, branches, slots, radius, size, placeAll, fitTier) {
  const { vw, vh, pad } = getViewportLayoutMetrics();
  const floor = getMindMapMinOrbitRadius(center);
  const tier = fitTier || 'm';
  while (
    radius > floor &&
    !mindMapLayoutFits(center, branches, slots, radius, vw, vh, pad, tier, size.w, size.h)
  ) {
    radius -= 8;
    branches.forEach((branch) => {
      const idx = branch.branchIndex ?? 0;
      placeMindMapBranchOnOrbit(center, branch, idx, slots, radius, size.w, size.h);
    });
  }
  return radius;
}

/** Orbit radius: one ring around the hub for every branch count. */
function getMindMapOrbitRadius(center, branches, { fitViewport = false, fitTier = 'm' } = {}) {
  const hubReach = Math.max(center.w, center.h) * 0.48;
  const branchReach = getMindMapBranchReachForRing();
  const slots = Math.max(3, branches.length);
  const ringGap = getMindMapRingGap(slots, fitTier);
  let radius = hubReach + branchReach + ringGap;
  if (fitViewport) {
    const { vw, vh, pad } = getViewportLayoutMetrics();
    const floor = getMindMapMinOrbitRadius(center);
    const w = MIND_MAP_SIZES[fitTier]?.w ?? MIND_MAP_BRANCH.w;
    const h = MIND_MAP_SIZES[fitTier]?.h ?? MIND_MAP_BRANCH.h;
    while (
      radius > floor &&
      !mindMapLayoutFits(center, branches, slots, radius, vw, vh, pad, fitTier, w, h)
    ) {
      radius -= 8;
    }
  }
  return radius;
}

/** Place one branch: anchor point on the ring, card grows outward. */
function placeMindMapBranchOnOrbit(center, branch, branchIndex, slotCount, radius, w, h) {
  const rect = getMindMapBranchRectAtOrbit(center, branchIndex, slotCount, radius, w, h);
  branch.x = rect.x;
  branch.y = rect.y;
  branch.w = rect.w;
  branch.h = rect.h;
}

/** Place branch cards clockwise from 12 o'clock (anchor on ring). */
function getMindMapPlacement(branchIndex, slotCount, centerBlock, branchDims, orbitRadius) {
  const center = centerBlock || getMindMapCenterBlock();
  if (!center) return null;

  const slots = Math.max(3, slotCount);
  const radius =
    orbitRadius ?? Math.max(center.w, center.h) * 0.55 + 150;
  const w = branchDims?.w ?? MIND_MAP_BRANCH.w;
  const h = branchDims?.h ?? MIND_MAP_BRANCH.h;
  return getMindMapBranchRectAtOrbit(center, branchIndex, slots, radius, w, h);
}

function centerMindMapHub(blocks, centerId) {
  const center = blocks.find((b) => b.id === centerId);
  if (!center) return;

  const { vw, vh, pad } = getViewportLayoutMetrics();
  center.w = center.w || MIND_MAP_HUB.w;
  center.h = center.h || MIND_MAP_HUB.h;
  center.x = Math.round(Math.max(pad, (vw - center.w) / 2));
  center.y = Math.round(Math.max(pad, (vh - center.h) / 2));
}

function mindMapBranchOverlapsHub(branch, center) {
  return !(
    branch.x + branch.w <= center.x ||
    branch.x >= center.x + center.w ||
    branch.y + branch.h <= center.y ||
    branch.y >= center.y + center.h
  );
}

/** Bounding box of hub + all branch cards. */
function getMindMapGroupBounds(center, branches) {
  let minX = center.x;
  let minY = center.y;
  let maxX = center.x + center.w;
  let maxY = center.y + center.h;
  branches.forEach((b) => {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.w);
    maxY = Math.max(maxY, b.y + b.h);
  });
  return { minX, minY, maxX, maxY, boxW: maxX - minX, boxH: maxY - minY };
}

function shiftMindMapGroup(center, branches, dx, dy) {
  if (!dx && !dy) return;
  center.x = Math.round(center.x + dx);
  center.y = Math.round(center.y + dy);
  branches.forEach((b) => {
    b.x = Math.round(b.x + dx);
    b.y = Math.round(b.y + dy);
  });
}

/** Nudge only when clipped — used after S/M/L so the ring does not jump. */
function clampMindMapGroupToViewport(center, branches) {
  const { vw, vh, pad } = getViewportLayoutMetrics();
  const { minX, minY, maxX, maxY, boxH } = getMindMapGroupBounds(center, branches);
  const innerH = vh - pad * 2;
  let dx = 0;
  let dy = 0;
  if (minX < pad) dx = pad - minX;
  else if (maxX > vw - pad) dx = vw - pad - maxX;
  if (boxH <= innerH) {
    if (minY < pad) dy = pad - minY;
    else if (maxY > vh - pad) dy = vh - pad - maxY;
  } else if (minY < pad) {
    dy = pad - minY;
  }
  shiftMindMapGroup(center, branches, dx, dy);
}

/** Layout all branches on one ring; anchor on circle, same rules for 3–8 branches. */
function layoutMindMapBranches(center, branches, { fitViewport = false, tier = null, resizeOnly = false } = {}) {
  if (!center || !branches.length) return;
  const slots = Math.max(3, branches.length);
  const sizeKey = tier || state.mindMapBranchSize || 'm';
  const size = MIND_MAP_SIZES[sizeKey] || MIND_MAP_SIZES.m;

  let radius;
  if (resizeOnly) {
    radius =
      state.mindMapOrbitRadius ||
      inferMindMapOrbitRadius(center, branches) ||
      getMindMapOrbitRadius(center, branches, {});
  } else {
    radius = getMindMapOrbitRadius(center, branches, { fitViewport, fitTier: sizeKey });
  }

  const placeAll = (r) => {
    branches.forEach((branch) => {
      const idx = branch.branchIndex ?? 0;
      if (slots === 7 && (idx === 3 || idx === 4)) return;
      placeMindMapBranchOnOrbit(center, branch, idx, slots, r, size.w, size.h);
      if (!branch.accent) branch.accent = MIND_MAP_BRANCH.accent;
    });
    if (slots === 7) {
      layoutMindMapSevenBottomPair(center, branches, r, size.w, size.h);
    }
  };

  placeAll(radius);
  let guard = 0;
  while (guard++ < 30 && branches.some((b) => mindMapBranchOverlapsHub(b, center))) {
    radius += 10;
    placeAll(radius);
  }

  radius = expandMindMapOrbitForSpacing(center, branches, slots, radius, size.w, size.h, placeAll);

  if (!resizeOnly) {
    radius = shrinkMindMapOrbitToViewport(
      center,
      branches,
      slots,
      radius,
      size,
      placeAll,
      sizeKey
    );
  } else {
    const { vw, vh, pad } = getViewportLayoutMetrics();
    if (
      !mindMapLayoutFits(center, branches, slots, radius, vw, vh, pad, sizeKey, size.w, size.h)
    ) {
      radius = shrinkMindMapOrbitToViewport(
        center,
        branches,
        slots,
        radius,
        size,
        placeAll,
        sizeKey
      );
    }
  }

  if (slots === 7) {
    layoutMindMapSevenBottomPair(center, branches, radius, size.w, size.h);
  }

  clampMindMapGroupToViewport(center, branches);

  state.mindMapOrbitRadius = radius;
}

function positionMindMapBranches(blocks, centerId, { fitViewport = false } = {}) {
  const center = blocks.find((b) => b.id === centerId);
  if (!center) return;
  const branches = blocks
    .filter((b) => b.id !== centerId)
    .sort((a, b) => (a.branchIndex ?? 0) - (b.branchIndex ?? 0));
  layoutMindMapBranches(center, branches, { fitViewport });
}

function isMindMapBoard() {
  return state.boardTemplate === 'mind-map' && !!state.mindMapCenterId;
}

function nudgeMindMapIntoView(blocks, centerId) {
  const { vw, vh } = getViewportLayoutMetrics();
  const pad = 48;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = 0;
  let maxY = 0;
  blocks.forEach((b) => {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.w);
    maxY = Math.max(maxY, b.y + b.h);
  });
  if (!Number.isFinite(minX)) return;

  let dx = 0;
  let dy = 0;
  if (minY < pad) dy = pad - minY;
  if (maxY + dy > vh - pad) dy -= maxY + dy - (vh - pad);
  if (minX < pad) dx = pad - minX;
  if (maxX + dx > vw - pad) dx -= maxX + dx - (vw - pad);
  if (!dx && !dy) return;
  blocks.forEach((b) => {
    if (centerId && b.id === centerId) return;
    b.x = Math.round(b.x + dx);
    b.y = Math.round(b.y + dy);
  });
}

function getMindMapBranches() {
  if (!state.mindMapCenterId) return [];
  return state.blocks
    .filter((b) => b.id !== state.mindMapCenterId)
    .sort((a, b) => (a.branchIndex ?? 0) - (b.branchIndex ?? 0));
}

function applyMindMapBranchSizeTier(tier) {
  if (!isMindMapBoard()) return;
  const size = MIND_MAP_SIZES[tier];
  if (!size) return;
  const center = getMindMapCenterBlock();
  if (!center) return;
  const branches = getMindMapBranches();
  if (!branches.length) return;
  if (state.mindMapBranchSize === tier) return;

  pushLayoutUndo();
  state.mindMapBranchSize = tier;
  layoutMindMapBranches(center, branches, { tier, resizeOnly: true });
  resizeCanvasToContent();
  render();
  persist();
  showToast(`Idea cards: ${tier.toUpperCase()}`);
}

function ensureMindMapSizeControls() {
  let wrap = $('#mindMapSizeControls');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'mindMapSizeControls';
    wrap.className = 'mind-map-size-controls';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Idea card size');
    wrap.innerHTML = ['s', 'm', 'l']
      .map(
        (tier) =>
          `<button type="button" class="mind-map-size-btn" data-mind-map-tier="${tier}" title="Idea cards ${tier.toUpperCase()}" aria-label="Idea card size ${tier.toUpperCase()}">${tier.toUpperCase()}</button>`
      )
      .join('');
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mind-map-tier]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      applyMindMapBranchSizeTier(btn.dataset.mindMapTier);
    });
    wrap.addEventListener('pointerdown', (e) => e.stopPropagation());
    canvasInner.appendChild(wrap);
  }
  return wrap;
}

function syncMindMapSizeControls() {
  const wrap = ensureMindMapSizeControls();
  if (!isMindMapBoard()) {
    wrap.hidden = true;
    wrap.setAttribute('hidden', '');
    return;
  }
  const center = getMindMapCenterBlock();
  if (!center) {
    wrap.hidden = true;
    wrap.setAttribute('hidden', '');
    return;
  }
  wrap.hidden = false;
  wrap.removeAttribute('hidden');
  const hubEl = $(`[data-block-id="${center.id}"]`, canvasInner);
  if (hubEl) hubEl.insertAdjacentElement('afterend', wrap);

  const hubZ = center.z || 1;
  wrap.style.zIndex = String(hubZ + 100);
  wrap.style.left = `${center.x + center.w / 2}px`;
  wrap.style.top = `${center.y + center.h + 8}px`;

  const tier = state.mindMapBranchSize || 'm';
  wrap.querySelectorAll('[data-mind-map-tier]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.mindMapTier === tier);
  });
}

function layoutMindMapBlocks(blocks, centerId) {
  const center = blocks.find((b) => b.id === centerId);
  if (center) {
    center.mindMapCenter = true;
    center.accent = center.accent || MIND_MAP_HUB.accent;
    center.w = center.w || MIND_MAP_HUB.w;
    center.h = center.h || MIND_MAP_HUB.h;
  }
  centerMindMapHub(blocks, centerId);
  const branches = blocks
    .filter((b) => b.id !== centerId)
    .sort((a, b) => (a.branchIndex ?? 0) - (b.branchIndex ?? 0));
  layoutMindMapBranches(center, branches, { fitViewport: true, tier: 'm' });
}

function pickGalleryGridDimensions(n) {
  let best = { cols: 1, rows: n, score: -1 };
  for (let cols = 1; cols <= n; cols++) {
    const rows = Math.ceil(n / cols);
    const aspect = cols / rows;
    const squareness = 1 - Math.abs(aspect - 1.15);
    const score = squareness * 100 - Math.abs(cols - rows) * 4;
    if (score > best.score) best = { cols, rows, score };
  }
  return best;
}

function layoutGalleryWalkStations(blocks) {
  const stations = blocks
    .filter((b) => b.galleryStation)
    .sort((a, b) => (a.galleryIndex ?? 0) - (b.galleryIndex ?? 0));
  const n = stations.length;
  if (!n) return;

  const { usableW, usableH, pad, gap } = getViewportLayoutMetrics();
  const { cols, rows } = pickGalleryGridDimensions(n);
  const cellW = Math.floor((usableW - (cols - 1) * gap) / cols);
  const cellH = Math.floor((usableH - (rows - 1) * gap) / rows);

  stations.forEach((block, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    block.w = cellW;
    block.h = cellH;
    block.x = pad + col * (cellW + gap);
    block.y = pad + row * (cellH + gap);
    block.z = i + 1;
  });
}

function getAssessmentStages(blocks) {
  return blocks
    .filter((b) => b.assessmentStage)
    .sort((a, b) => (a.assessmentStageIndex ?? 0) - (b.assessmentStageIndex ?? 0));
}

function layoutAssessmentCollab(blocks) {
  const task = blocks.find((b) => b.assessmentTask);
  const stages = getAssessmentStages(blocks);
  const { usableW, usableH, pad, gap } = getViewportLayoutMetrics();
  const rowW = usableW;
  let y = pad;

  if (task) {
    task.w = rowW;
    task.h = Math.max(160, Math.min(240, task.h || 200));
    task.x = pad;
    task.y = y;
    task.z = 1;
    y += task.h + gap;
  }

  const remaining = usableH - y - pad - Math.max(0, stages.length - 1) * gap;
  const stageH = stages.length ? Math.max(100, Math.floor(remaining / stages.length)) : 140;

  stages.forEach((block, i) => {
    block.w = rowW;
    block.h = stageH;
    block.x = pad;
    block.y = y;
    block.z = (task ? 2 : 1) + i;
    block.assessmentStageIndex = i;
    y += block.h + gap;
  });
}

function layoutReflectionWall(blocks) {
  const columns = blocks
    .filter((b) => b.reflectionColumn)
    .sort((a, b) => (a.reflectionColumnIndex ?? 0) - (b.reflectionColumnIndex ?? 0));
  const n = columns.length;
  if (!n) return;

  const { usableW, usableH, pad, gap } = getViewportLayoutMetrics();
  const colW = Math.floor((usableW - (n - 1) * gap) / n);
  const colH = usableH;

  columns.forEach((block, i) => {
    block.w = colW;
    block.h = colH;
    block.x = pad + i * (colW + gap);
    block.y = pad;
    block.z = i + 1;
    block.reflectionColumnIndex = i;
  });
}

function syncBoardTemplateBar() {
  const bar = $('#boardTemplateBar');
  if (!bar) return;
  const show = state.boardTemplate === 'assessment-collaborator';
  bar.hidden = !show;
  if (show) bar.removeAttribute('hidden');
  else bar.setAttribute('hidden', '');
}

function addAssessmentStage() {
  const stages = getAssessmentStages(state.blocks);
  if (stages.length >= 10) {
    showToast('Maximum 10 stages');
    return;
  }
  const title = ASSESSMENT_STAGE_HEADERS[stages.length] || `Stage ${stages.length + 1}`;
  const block = {
    id: uid(),
    type: 'note',
    x: LAYOUT_PAD,
    y: LAYOUT_PAD,
    w: 400,
    h: 140,
    z: state.blocks.length + 1,
    accent: ACCENTS[stages.length % ACCENT_DARK.length],
    title,
    content: '<p><br></p>',
    assessmentStage: true,
    assessmentStageIndex: stages.length,
    presentEditable: true,
  };
  state.blocks.push(block);
  state.presentOrder.push(block.id);
  layoutAssessmentCollab(state.blocks);
  selectedId = block.id;
  render();
  showToast('Stage added');
}

function removeAssessmentStage() {
  const stages = getAssessmentStages(state.blocks);
  if (stages.length <= 2) {
    showToast('Need at least 2 stages');
    return;
  }
  let target = stages[stages.length - 1];
  if (selectedId) {
    const sel = getBlock(selectedId);
    if (sel?.assessmentStage) target = sel;
  }
  if (!confirm(`Remove “${target.title || 'this stage'}”?`)) return;
  state.blocks = state.blocks.filter((b) => b.id !== target.id);
  state.presentOrder = state.presentOrder.filter((id) => id !== target.id);
  getAssessmentStages(state.blocks).forEach((b, i) => {
    b.assessmentStageIndex = i;
  });
  if (selectedId === target.id) selectedId = null;
  layoutAssessmentCollab(state.blocks);
  render();
  showToast('Stage removed');
}

async function openGalleryViewer(blockId) {
  const block = getBlock(blockId);
  if (!block || !galleryStationHasMedia(block)) return;

  const overlay = $('#galleryViewerOverlay');
  const stage = $('#galleryViewerStage');
  const caption = $('#galleryViewerCaption');
  if (!overlay || !stage) return;

  stage.innerHTML = '<p class="gallery-viewer-loading">Loading…</p>';
  caption.textContent = block.title || '';

  if (block.type === 'image' && block.imageData) {
    stage.innerHTML = `<img src="${block.imageData}" alt="${escapeAttr(block.title || 'Station')}" />`;
  } else if (block.type === 'document' && block.docData) {
    const name = escapeHtml(block.docName || 'Document');
    if (isPdfDocument(block)) {
      stage.innerHTML = `<div class="gallery-viewer-pdf"><iframe src="${block.docData}" title="${name}"></iframe></div>`;
    } else if (isDocxDocument(block)) {
      if (!block.docPreviewHtml) await ensureDocxPreview(block);
      if (block.docPreviewHtml) {
        stage.innerHTML = `<div class="gallery-viewer-docx">${block.docPreviewHtml}</div>`;
      } else {
        stage.innerHTML = `<div class="gallery-viewer-doc-card"><p>Preview unavailable — open the file from the card footer.</p></div>`;
      }
    } else {
      const kind = getDocKind(block);
      stage.innerHTML = `<div class="gallery-viewer-doc-card">
        <div class="doc-file-icon">${escapeHtml((kind.key || 'doc').slice(0, 4).toUpperCase())}</div>
        <p><strong>${escapeHtml(kind.label)}</strong></p>
        <p>${name}</p>
        <p>Use Download on the station card to open this file.</p>
      </div>`;
    }
  }

  overlay.hidden = false;
  overlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGalleryViewer() {
  const overlay = $('#galleryViewerOverlay');
  if (!overlay) return;
  overlay.hidden = true;
  overlay.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function applyTemplateLayout(templateId, blocks, centerId) {
  if (templateId === 'gallery-walk') layoutGalleryWalkStations(blocks);
  else if (templateId === 'assessment-collaborator') layoutAssessmentCollab(blocks);
  else if (templateId === 'reflection-wall') layoutReflectionWall(blocks);
  else if (templateId === 'mind-map' && centerId) layoutMindMapBlocks(blocks, centerId);
}

// --- HOT activity routines (Post → HOT activity) ---

function findHotRoutine(id) {
  const groups = window.PREZ_HOT_ROUTINES || [];
  for (const group of groups) {
    const routine = group.routines?.find((r) => r.id === id);
    if (routine) return routine;
  }
  return null;
}

function getHotRoutineAccent() {
  const selected = selectedId ? getBlock(selectedId) : null;
  if (selected?.accent && ACCENTS.includes(selected.accent)) return selected.accent;
  return getDefaultBlockAccent();
}

function hotRectOverlapsBlock(rect, block, margin = 8) {
  const o = blockEdges(block);
  return !(
    rect.right + margin <= o.left ||
    o.right + margin <= rect.left ||
    rect.bottom + margin <= o.top ||
    o.bottom + margin <= rect.top
  );
}

/** Group blocks into visual rows (similar top edge). */
function clusterBlocksIntoRows(blocks, yThreshold = 56) {
  const sorted = [...blocks].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows = [];
  for (const block of sorted) {
    let row = rows.find((r) => Math.abs(r.y - block.y) < yThreshold);
    if (!row) {
      row = { y: block.y, bottom: block.y + block.h, blocks: [] };
      rows.push(row);
    }
    row.blocks.push(block);
    row.y = Math.min(row.y, block.y);
    row.bottom = Math.max(row.bottom, block.y + block.h);
  }
  return rows.sort((a, b) => a.y - b.y);
}

/** Place one instruction card to the right of the anchor, or at the end of the bottom row. */
function getHotCardPosition(anchorBlock, w, h) {
  const gap = LAYOUT_GAP;
  const defaultW = 360;
  const width = w || anchorBlock?.w || defaultW;
  const height = h || 280;

  if (anchorBlock) {
    const { usableW, pad } = getViewportLayoutMetrics();
    const xRight = anchorBlock.x + anchorBlock.w + gap;
    if (xRight + width <= pad + usableW) {
      return { x: xRight, y: anchorBlock.y, w: width, h: height };
    }
    return {
      x: pad,
      y: anchorBlock.y + anchorBlock.h + gap,
      w: width,
      h: height,
    };
  }

  if (!state.blocks.length) {
    return { x: LAYOUT_PAD, y: LAYOUT_PAD, w: width, h: height };
  }

  const rows = clusterBlocksIntoRows(state.blocks);
  const lastRow = rows[rows.length - 1];
  const maxRight = lastRow.blocks.reduce((m, b) => Math.max(m, b.x + b.w), LAYOUT_PAD);
  const { usableW, pad } = getViewportLayoutMetrics();

  if (maxRight + gap + width <= pad + usableW) {
    return { x: maxRight + gap, y: lastRow.y, w: width, h: height };
  }

  return { x: pad, y: lastRow.bottom + gap, w: width, h: height };
}

/** Nudge blocks that overlap the new card to the right. */
function pushBlocksClearOfHotCard(block, gap = LAYOUT_GAP) {
  const rect = blockEdges(block);
  let changed = true;
  for (let pass = 0; pass < 32 && changed; pass++) {
    changed = false;
    for (const other of state.blocks) {
      if (other.id === block.id) continue;
      if (!hotRectOverlapsBlock(rect, other, gap)) continue;
      const minX = rect.right + gap;
      if (other.x < minX) {
        other.x = minX;
        changed = true;
      }
    }
  }
}

function scrollToHotRoutine(blockId) {
  const block = getBlock(blockId);
  if (!block) return;
  requestAnimationFrame(() => {
    $(`[data-block-id="${block.id}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

const postPickerSelected = new Set();
const hotPickerSelected = new Set();

function createPickerRemoveBtn(onRemove) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'picker-remove';
  btn.setAttribute('aria-label', 'Remove from selection');
  btn.textContent = '×';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
  });
  return btn;
}

function togglePostPicker(type) {
  if (postPickerSelected.has(type)) postPickerSelected.delete(type);
  else postPickerSelected.add(type);
  syncPostPickerUI();
}

function removePostPicker(type) {
  postPickerSelected.delete(type);
  syncPostPickerUI();
}

function syncPostPickerUI() {
  $$('#addDialog .type-card[data-type]').forEach((card) => {
    const type = card.dataset.type;
    const sel = postPickerSelected.has(type);
    card.classList.toggle('is-picker-selected', sel);
    card.setAttribute('aria-pressed', sel ? 'true' : 'false');
    const rm = card.querySelector(':scope > .picker-remove');
    if (sel && !rm) card.appendChild(createPickerRemoveBtn(() => removePostPicker(type)));
    else if (!sel && rm) rm.remove();
  });
  const done = $('#postPickerDone');
  if (done) done.disabled = postPickerSelected.size === 0;
}

function commitPostPicker() {
  const types = [...postPickerSelected];
  if (!types.length) return;
  postPickerSelected.clear();
  types.forEach((type) =>
    addBlock(type, { skipRender: true, skipFocus: true, skipToast: true })
  );
  const last = state.blocks[state.blocks.length - 1];
  if (last) {
    selectedId = last.id;
    render();
    focusBlockAfterTypeChange(last, last.type);
  }
  $('#addDialog')?.close();
  showToast(types.length === 1 ? 'Block added' : `${types.length} blocks added`);
}

function toggleHotPicker(routineId) {
  if (hotPickerSelected.has(routineId)) hotPickerSelected.delete(routineId);
  else hotPickerSelected.add(routineId);
  syncHotPickerUI();
}

function removeHotPicker(routineId) {
  hotPickerSelected.delete(routineId);
  syncHotPickerUI();
}

function syncHotPickerUI() {
  $$('#hotRoutineList .hot-routine-item').forEach((btn) => {
    const id = btn.dataset.routineId;
    const sel = hotPickerSelected.has(id);
    btn.classList.toggle('is-picker-selected', sel);
    btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
    const rm = btn.querySelector(':scope > .picker-remove');
    if (sel && !rm) btn.appendChild(createPickerRemoveBtn(() => removeHotPicker(id)));
    else if (!sel && rm) rm.remove();
  });
  const done = $('#hotPickerDone');
  if (done) done.disabled = hotPickerSelected.size === 0;
}

function commitHotPicker() {
  const routineIds = [...hotPickerSelected];
  if (!routineIds.length) return;
  hotPickerSelected.clear();
  syncHotPickerUI();

  normalizePresentOrder();
  const presentOrderBefore = [...state.presentOrder];
  const insertedIds = [];
  let anchorId = selectedId;

  routineIds.forEach((routineId) => {
    const blockId = insertHotRoutine(routineId, {
      anchorId,
      skipUndo: true,
      skipToast: true,
      skipRender: true,
      skipPersist: true,
      skipScroll: true,
    });
    if (blockId) {
      insertedIds.push(blockId);
      anchorId = blockId;
    }
  });

  if (insertedIds.length) {
    hotInsertUndoStack.push({ insertedIds, presentOrder: presentOrderBefore });
    if (hotInsertUndoStack.length > 12) hotInsertUndoStack.shift();
    updateUndoButton();
    selectedId = insertedIds[insertedIds.length - 1];
    persist();
    render();
    resizeCanvasToContent();
    scrollToHotRoutine(selectedId);
    const n = insertedIds.length;
    showToast(n === 1 ? `${findHotRoutine(routineIds[0])?.name || 'Routine'} added` : `${n} HOT activities added`);
  }

  $('#hotDialog')?.close();
}

function insertHotRoutine(routineId, opts = {}) {
  const routine = findHotRoutine(routineId);
  if (!routine?.card) {
    if (!opts.skipToast) showToast('Routine not found');
    return null;
  }

  const spec = routine.card;
  const accent = getHotRoutineAccent();
  const anchorId = opts.anchorId !== undefined ? opts.anchorId : selectedId;
  const anchor = anchorId ? getBlock(anchorId) : null;
  normalizePresentOrder();
  const presentOrderBefore = opts.skipUndo ? null : [...state.presentOrder];
  let insertAt = anchor ? state.presentOrder.indexOf(anchor.id) + 1 : state.presentOrder.length;
  if (insertAt < 0) insertAt = state.presentOrder.length;

  const h = spec.h || 280;
  const pos = getHotCardPosition(anchor, spec.w, h);
  const maxZ = Math.max(0, ...state.blocks.map((b) => b.z || 0));

  const block = {
    id: uid(),
    type: spec.type || 'note',
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h: pos.h,
    z: maxZ + 1,
    accent,
    title: '',
    content: '',
  };
  const hotContent = spec.content;
  const hotTableHtml = spec.tableHtml;
  applyBlockTypeDefaults(block, block.type);
  if (hotTableHtml) block.tableHtml = hotTableHtml;
  block.title = spec.title || routine.name;
  if (hotContent) block.content = hotContent;
  else if (block.type === 'note' || block.type === 'heading') block.content = '<p></p>';
  if (routine.icon) {
    block.imageData = routine.icon;
    block.hotRoutineId = routineId;
  }

  state.blocks.push(block);
  pushBlocksClearOfHotCard(block);
  state.presentOrder.splice(insertAt, 0, block.id);

  if (!opts.skipUndo) {
    hotInsertUndoStack.push({ insertedIds: [block.id], presentOrder: presentOrderBefore });
    if (hotInsertUndoStack.length > 12) hotInsertUndoStack.shift();
    updateUndoButton();
  }

  selectedId = block.id;
  if (!opts.skipPersist) persist();
  if (!opts.skipRender) {
    render();
    resizeCanvasToContent();
  }
  if (!opts.skipScroll) scrollToHotRoutine(block.id);

  if (!opts.skipToast) showToast(`${routine.name} added`);
  return block.id;
}

function buildHotRoutineList() {
  const listEl = $('#hotRoutineList');
  if (!listEl) return;
  const groups = window.PREZ_HOT_ROUTINES || [];
  listEl.innerHTML = '';

  groups.forEach((group) => {
    const heading = document.createElement('p');
    heading.className = 'hot-routine-category';
    heading.textContent = group.category;
    listEl.appendChild(heading);

    group.routines.forEach((routine) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hot-routine-item';
      btn.dataset.routineId = routine.id;
      const iconHtml = routine.icon
        ? `<img class="hot-routine-icon" src="${escapeAttr(routine.icon)}" alt="" width="52" height="52" />`
        : '';
      btn.innerHTML = `${iconHtml}<span class="hot-routine-text"><span class="hot-routine-name">${escapeHtml(routine.name)}</span>
        <span class="hot-routine-meta">Student instructions</span>
        <span class="hot-routine-blurb">${escapeHtml(routine.blurb)}</span></span>`;
      listEl.appendChild(btn);
    });
  });
  syncHotPickerUI();
}

function openHotDialog() {
  const dialog = $('#hotDialog');
  if (!dialog) {
    showToast('HOT dialog missing');
    return;
  }
  hotPickerSelected.clear();
  buildHotRoutineList();
  if (!openDialogNearFab(dialog)) showToast('Could not open HOT activities');
}

function initHotDialog() {
  buildHotRoutineList();
}

// --- Brain breaks (Post → Brain breaks) ---

function findBrainBreakActivity(id) {
  for (const group of getBrainBreakLibrary()) {
    const activity = group.activities?.find((a) => a.id === id);
    if (activity) {
      return {
        ...activity,
        categoryName: group.category,
        hint: group.hint,
        accent: group.accent,
        surface: group.surface,
      };
    }
  }
  return null;
}

const brainBreakPickerSelected = new Set();

function toggleBrainBreakPicker(activityId) {
  if (brainBreakPickerSelected.has(activityId)) brainBreakPickerSelected.delete(activityId);
  else brainBreakPickerSelected.add(activityId);
  syncBrainBreakPickerUI();
}

function removeBrainBreakPicker(activityId) {
  brainBreakPickerSelected.delete(activityId);
  syncBrainBreakPickerUI();
}

function syncBrainBreakPickerUI() {
  $$('#brainBreakRoutineList .hot-routine-item').forEach((btn) => {
    const id = btn.dataset.activityId;
    const sel = brainBreakPickerSelected.has(id);
    btn.classList.toggle('is-picker-selected', sel);
    btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
    const rm = btn.querySelector(':scope > .picker-remove');
    if (sel && !rm) btn.appendChild(createPickerRemoveBtn(() => removeBrainBreakPicker(id)));
    else if (!sel && rm) rm.remove();
  });
  const done = $('#brainBreakPickerDone');
  if (done) done.disabled = brainBreakPickerSelected.size === 0;
}

function insertBrainBreakActivity(activityId, opts = {}) {
  const item = findBrainBreakActivity(activityId);
  if (!item) {
    if (!opts.skipToast) showToast('Brain break not found');
    return null;
  }

  const accent = getHotRoutineAccent();
  const anchorId = opts.anchorId !== undefined ? opts.anchorId : selectedId;
  const anchor = anchorId ? getBlock(anchorId) : null;
  normalizePresentOrder();
  const presentOrderBefore = opts.skipUndo ? null : [...state.presentOrder];
  let insertAt = anchor ? state.presentOrder.indexOf(anchor.id) + 1 : state.presentOrder.length;
  if (insertAt < 0) insertAt = state.presentOrder.length;

  const w = 360;
  const h = 300;
  const pos = getHotCardPosition(anchor, w, h);
  const maxZ = Math.max(0, ...state.blocks.map((b) => b.z || 0));

  const block = {
    id: uid(),
    type: 'brainbreak',
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h: pos.h,
    z: maxZ + 1,
    accent,
    title: item.title,
    content: '',
    brainBreakCategories: [
      {
        name: item.categoryName,
        hint: item.hint,
        accent: item.accent,
        surface: item.surface,
        activities: [{ title: item.title, detail: item.detail }],
      },
    ],
  };

  state.blocks.push(block);
  pushBlocksClearOfHotCard(block);
  state.presentOrder.splice(insertAt, 0, block.id);

  if (!opts.skipUndo) {
    hotInsertUndoStack.push({ insertedIds: [block.id], presentOrder: presentOrderBefore });
    if (hotInsertUndoStack.length > 12) hotInsertUndoStack.shift();
    updateUndoButton();
  }

  selectedId = block.id;
  if (!opts.skipPersist) persist();
  if (!opts.skipRender) {
    render();
    resizeCanvasToContent();
  }
  if (!opts.skipScroll) scrollToHotRoutine(block.id);

  if (!opts.skipToast) showToast(`${item.title} added`);
  return block.id;
}

function commitBrainBreakPicker() {
  const activityIds = [...brainBreakPickerSelected];
  if (!activityIds.length) return;
  brainBreakPickerSelected.clear();
  syncBrainBreakPickerUI();

  normalizePresentOrder();
  const presentOrderBefore = [...state.presentOrder];
  const insertedIds = [];
  let anchorId = selectedId;

  activityIds.forEach((activityId) => {
    const blockId = insertBrainBreakActivity(activityId, {
      anchorId,
      skipUndo: true,
      skipToast: true,
      skipRender: true,
      skipPersist: true,
      skipScroll: true,
    });
    if (blockId) {
      insertedIds.push(blockId);
      anchorId = blockId;
    }
  });

  if (insertedIds.length) {
    hotInsertUndoStack.push({ insertedIds, presentOrder: presentOrderBefore });
    if (hotInsertUndoStack.length > 12) hotInsertUndoStack.shift();
    updateUndoButton();
    selectedId = insertedIds[insertedIds.length - 1];
    persist();
    render();
    resizeCanvasToContent();
    scrollToHotRoutine(selectedId);
    const n = insertedIds.length;
    showToast(
      n === 1
        ? `${findBrainBreakActivity(activityIds[0])?.title || 'Brain break'} added`
        : `${n} brain breaks added`
    );
  }

  $('#brainBreakDialog')?.close();
}

function buildBrainBreakRoutineList() {
  const listEl = $('#brainBreakRoutineList');
  if (!listEl) return;
  const groups = getBrainBreakLibrary();
  listEl.innerHTML = '';

  groups.forEach((group) => {
    const heading = document.createElement('p');
    heading.className = 'hot-routine-category';
    heading.textContent = group.category;
    listEl.appendChild(heading);

    (group.activities || []).forEach((activity) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hot-routine-item';
      btn.dataset.activityId = activity.id;
      btn.innerHTML = `<span class="hot-routine-icon hot-routine-icon--emoji" aria-hidden="true">⚡</span>
        <span class="hot-routine-text"><span class="hot-routine-name">${escapeHtml(activity.title)}</span>
        <span class="hot-routine-meta">${escapeHtml(group.hint)}</span>
        <span class="hot-routine-blurb">${escapeHtml(activity.detail)}</span></span>`;
      listEl.appendChild(btn);
    });
  });
  syncBrainBreakPickerUI();
}

function openBrainBreakDialog() {
  const dialog = $('#brainBreakDialog');
  if (!dialog) {
    showToast('Brain breaks dialog missing');
    return;
  }
  brainBreakPickerSelected.clear();
  buildBrainBreakRoutineList();
  if (!openDialogNearFab(dialog)) showToast('Could not open brain breaks');
}

function initBrainBreakDialog() {
  buildBrainBreakRoutineList();
}

function addBlock(type, opts = {}) {
  const block = {
    id: uid(),
    type,
    x: LAYOUT_PAD,
    y: LAYOUT_PAD,
    w:
      type === 'sticky'
        ? 220
        : type === 'worldmap'
          ? 640
          : type === 'heading' || type === 'whiteboard'
            ? 360
            : 320,
    h:
      type === 'image'
        ? 280
        : type === 'document' || type === 'link'
          ? 320
          : type === 'whiteboard'
            ? 280
            : type === 'table'
              ? 220
              : type === 'poll'
                ? 300
                : type === 'bloom'
                  ? 560
                  : type === 'brainbreak'
                    ? 520
                    : type === 'worldmap'
                      ? 380
                      : type === 'quiz'
                  ? 320
                  : type === 'sticky'
                    ? 130
                    : 200,
    z: Math.max(0, ...state.blocks.map((b) => b.z || 0)) + 1,
    accent: getDefaultBlockAccent(),
    title: '',
    content: '',
  };

  applyBlockTypeDefaults(block, type);

  if (state.mindMapCenterId && block.id !== state.mindMapCenterId) {
    const center = getMindMapCenterBlock();
    const size = MIND_MAP_SIZES[state.mindMapBranchSize || 'm'] || MIND_MAP_SIZES.m;
    block.branchIndex = getMindMapBranchCount();
    block.w = size.w;
    block.h = size.h;
    block.accent = MIND_MAP_BRANCH.accent;
    state.blocks.push(block);
    addToPresentOrder(block.id);
    if (center) {
      state.mindMapOrbitRadius = null;
      const branches = state.blocks
        .filter((b) => b.id !== state.mindMapCenterId)
        .sort((a, b) => (a.branchIndex ?? 0) - (b.branchIndex ?? 0));
      layoutMindMapBranches(center, branches);
    }
    selectedId = block.id;
    if (!opts.skipRender) render();
    if (!opts.skipFocus) focusBlockAfterTypeChange(block, type);
    if (!opts.skipToast) showToast('Block added');
    return block.id;
  } else {
    const pos = getHotCardPosition(null, block.w, block.h);
    block.x = pos.x;
    block.y = pos.y;
    state.blocks.push(block);
    addToPresentOrder(block.id);
    selectedId = block.id;
    if (!opts.skipRender) render();
    if (!opts.skipFocus) focusBlockAfterTypeChange(block, type);
    if (!opts.skipToast) showToast('Block added');
    return block.id;
  }
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

function getClipboardImageFile(clipboardData) {
  if (!clipboardData) return null;

  const items = clipboardData.items;
  if (items?.length) {
    for (const item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) return file;
      }
    }
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) return file;
      }
    }
  }

  const files = clipboardData.files;
  if (files?.length) {
    for (const file of files) {
      if (file.type.startsWith('image/')) return file;
    }
  }

  return null;
}

function blockAcceptsImagePaste(block) {
  return !!block && (block.type === 'image' || block.type === 'worldmap' || blockAcceptsInlineImage(block));
}

function shouldHandleDocumentImagePaste(e) {
  if (presentOverlay && !presentOverlay.hidden) return false;
  if (e.target.closest('dialog')) return false;
  const blank = $('#blankOverlay');
  if (blank && !blank.hidden) return false;
  if (e.target.closest('.board-title')) return false;
  if (e.target.closest('.toolbar') && !e.target.closest('.block')) return false;
  return true;
}

/** Paste image from clipboard onto the selected image / note / list card. */
function tryPasteImageToSelectedCard(e) {
  if (!shouldHandleDocumentImagePaste(e)) return false;
  if (!selectedId) return false;

  const block = getBlock(selectedId);
  if (!blockAcceptsImagePaste(block)) return false;

  const file = getClipboardImageFile(e.clipboardData);
  if (!file) return false;

  e.preventDefault();
  e.stopPropagation();
  readImageFile(file, block, $(`[data-block-id="${block.id}"]`, canvasInner));
  return true;
}

function readImageFile(file, block, el) {
  if (!file.type.startsWith('image/')) {
    showToast('Choose an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    block.imageData = reader.result;
    delete block.mapImageData;
    selectedId = block.id;
    if (block.type === 'worldmap') {
      if (block.w < 600) block.w = 640;
      if (block.h < 360) block.h = 380;
      persist();
      updateBlockElement(el, block);
      showToast('Map image updated');
      return;
    }
    if (blockAcceptsInlineImage(block) && block.h < 300) {
      block.h = Math.max(block.h, 300);
    }
    persist();
    render();
    showToast(blockAcceptsInlineImage(block) ? 'Image added to card' : 'Image added');
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
    if (block.galleryStation) render();
  };
  reader.onerror = () => showToast('Could not read file');
  reader.readAsDataURL(file);
}

// --- Present ---

function shouldShowPresentTitle(block) {
  if (blockUsesTextStyle(block)) return true;
  return !presentExpanded;
}

function syncPresentExpandedChrome() {
  presentOverlay.classList.toggle('present-expanded', presentExpanded);
  presentStage.classList.toggle('present-stage--expanded', presentExpanded);
  const btn = $('.present-expand', presentStage);
  if (!btn) return;
  btn.setAttribute('aria-label', presentExpanded ? 'Restore size' : 'Expand to full screen');
  btn.title = presentExpanded ? 'Restore size' : 'Expand to full screen';
  btn.setAttribute('aria-pressed', presentExpanded ? 'true' : 'false');
  btn.innerHTML = presentExpanded ? PRESENT_RESTORE_ICON : PRESENT_EXPAND_ICON;
}

function setPresentExpanded(expanded) {
  if (presentExpanded === expanded) {
    syncPresentExpandedChrome();
    return;
  }
  presentExpanded = expanded;
  void renderPresent();
}

function bindPresentExpand() {
  const btn = $('.present-expand', presentStage);
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setPresentExpanded(!presentExpanded);
  });
}

function openPresent(blockId) {
  if (isGridWallBoard()) {
    openPresentGridWall();
    return;
  }
  const blocks = getPresentBlocks();
  const idx = blocks.findIndex((b) => b.id === blockId);
  if (idx < 0) return;
  presentIndex = idx;
  presentRevealBlockId = null;
  presentQuizRevealBlockId = null;
  presentQuizQuestionIndex = 0;
  presentQuizQuestionAnswered = false;
  presentQuizPickedIndex = null;
  presentBrainBreakRevealBlockId = null;
  presentBrainBreakIndex = 0;
  presentMapRevealBlockId = null;
  presentMapPinCount = 1;
  presentExpanded = false;
  presentOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  applyPresentBackground();
  updateTimerDisplays();
  void renderPresent();

  if (presentOverlay.requestFullscreen) {
    presentOverlay.requestFullscreen().catch(() => {});
  }
}

function closePresent() {
  syncPresentEditableFromStage();
  hidePresentWhiteboard();
  presentExpanded = false;
  presentRevealBlockId = null;
  presentListRevealCount = 1;
  presentOverlay.classList.remove('present-expanded');
  presentStage.classList.remove('present-stage--expanded');
  presentOverlay.hidden = true;
  document.body.style.overflow = '';
  applyPresentBackground();
  updateTimerDisplays();
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
  render();
}

async function renderPresent() {
  const blocks = getPresentBlocks();
  const block = blocks[presentIndex];
  if (!block) return;

  ensurePresentRevealState(block);
  ensurePresentQuizState(block);
  ensurePresentBrainBreakState(block);
  ensurePresentMapPinState(block);

  if (block.type === 'whiteboard') {
    const expandBtn = `<button type="button" class="present-expand present-expand--whiteboard" aria-label="Expand to full screen" title="Expand to full screen" aria-pressed="${presentExpanded ? 'true' : 'false'}">${presentExpanded ? PRESENT_RESTORE_ICON : PRESENT_EXPAND_ICON}</button>`;
    presentStage.innerHTML = expandBtn;
    syncPresentExpandedChrome();
    bindPresentExpand();
    mountPresentWhiteboard(block);
    presentCounter.textContent = `${presentIndex + 1} / ${blocks.length}`;
    return;
  }

  hidePresentWhiteboard();

  if (block.type === 'document' && isDocxDocument(block) && block.docData && !block.docPreviewHtml) {
    presentStage.innerHTML =
      '<article class="present-card present-card-loading"><p>Building Word preview…</p></article>';
    await ensureDocxPreview(block);
  }

  const expandBtn = `<button type="button" class="present-expand" aria-label="Expand to full screen" title="Expand to full screen" aria-pressed="false">${PRESENT_EXPAND_ICON}</button>`;
  const typeClass =
    (block.type ? ` present-card--${block.type}` : '') +
    (presentCardHasInlineImage(block) ? ' present-card--has-inline-image' : '') +
    (listUsesRevealInPresent(block) ? ' present-card--list-reveal' : '') +
    (blockUsesPresentEdit(block) ? ' present-card--present-editable' : '') +
    getPresentTextCardStyleClasses(block);
  const titleAttr = block.title ? ` aria-label="${escapeAttr(block.title)}"` : '';
  presentStage.innerHTML = `<article class="present-card${typeClass}"${titleAttr}>${expandBtn}${getPresentHTML(block, { showTitle: shouldShowPresentTitle(block) })}</article>`;
  applyPresentCardAccent($('.present-card', presentStage), block);
  syncPresentExpandedChrome();
  bindPresentExpand();
  bindPresentListReveal();
  bindPresentEditable();
  focusPresentListReveal();
  bindPresentPoll();
  bindPresentQuiz();
  bindPresentQuizReveal();
  bindPresentBrainBreakReveal();
  bindPresentWorldMapReveal();
  presentCounter.textContent = `${presentIndex + 1} / ${blocks.length}`;
}

function getPresentHTML(block, { showTitle = true } = {}) {
  const title = getPresentTitleHTML(block, { showTitle });
  switch (block.type) {
    case 'image': {
      const img = block.imageData ? `<img src="${block.imageData}" alt="" />` : '<p>No image</p>';
      const prompts = block.content?.trim()
        ? `<div class="present-body present-body--text present-image-prompts">${block.content}</div>`
        : '';
      return title + img + prompts;
    }
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
      return `${title}${getLinkCardHTML(openUrl, { present: true })}`;
    }
    case 'table': {
      const tableBody = getPresentTextBodyHTML(
        block,
        applyTableColAlignsToHtml(block, block.tableHtml || defaultTableHtml()),
        'present-body--table'
      );
      const intro = block.content?.trim()
        ? blockUsesPresentEdit(block)
          ? getPresentTextBodyHTML(block, block.content, 'present-table-intro')
          : `<div class="present-body present-body--text present-table-intro">${block.content}</div>`
        : '';
      const body = intro + tableBody;
      if (block.imageData && block.hotRoutineId) {
        return wrapPresentTextCardHTML(block, body, { showTitle });
      }
      return getPresentTitleHTML(block, { showTitle }) + body;
    }
    case 'list': {
      const body = buildPresentListBodyHTML(block);
      return (
        wrapPresentTextCardHTML(block, body, { showTitle }) + getPresentListRevealHintHTML(block)
      );
    }
    case 'timer':
      return (
        title +
        `<p class="present-timer" data-present-timer>${formatTimer(getTimerRemainingSec())}</p>`
      );
    case 'poll':
      return title + getPollPresentHTML(block);
    case 'bloom':
      return title + getBloomPresentHTML(block);
    case 'brainbreak':
      return title + getBrainBreakPresentHTML(block);
    case 'worldmap':
      return title + getWorldMapPresentHTML(block);
    case 'quiz':
      return title + getQuizPresentHTML(block);
    case 'sticky':
      return `<div class="present-body present-body--sticky present-body--text">${block.content || '<p>Empty sticky</p>'}</div>`;
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
    case 'heading': {
      const titlePart = getPresentTitleHTML(block, { showTitle: true });
      const subtitle = (block.content || '').trim();
      if (!subtitle) {
        return titlePart + (block.title?.trim() ? '' : getPresentTextBodyHTML(block, '<p>Empty block</p>'));
      }
      return titlePart + getPresentTextBodyHTML(block, block.content);
    }
    case 'note':
      return wrapPresentTextCardHTML(block, block.content || '<p>Empty block</p>', { showTitle });
    default:
      return (
        getPresentTitleHTML(block, { showTitle }) +
        getPresentTextBodyHTML(block, block.content || '<p>Empty block</p>')
      );
  }
}

function isPresentTypingTarget(target) {
  return !!target?.closest?.('input, textarea, select, [contenteditable="true"]');
}

function presentAdvance() {
  syncPresentEditableFromStage();
  const blocks = getPresentBlocks();
  const block = blocks[presentIndex];
  if (block && listUsesRevealInPresent(block)) {
    const total = countListItemsInContent(block.content);
    if (presentListRevealCount < total) {
      presentListRevealCount += 1;
      renderPresent();
      return;
    }
  }
  if (block?.type === 'quiz' && quizHasMorePresentSteps(block)) {
    presentQuizQuestionIndex += 1;
    presentQuizQuestionAnswered = false;
    presentQuizPickedIndex = null;
    renderPresent();
    return;
  }
  if (block?.type === 'brainbreak' && brainBreakHasMorePresentSteps(block)) {
    presentBrainBreakIndex += 1;
    renderPresent();
    return;
  }
  if (block?.type === 'worldmap' && worldMapUsesRevealInPresent(block)) {
    const total = block.mapPins.length;
    if (presentMapPinCount < total) {
      presentMapPinCount += 1;
      renderPresent();
      return;
    }
  }
  presentNext();
}

function presentRetreat() {
  syncPresentEditableFromStage();
  const blocks = getPresentBlocks();
  const block = blocks[presentIndex];
  if (block && listUsesRevealInPresent(block) && presentListRevealCount > 1) {
    presentListRevealCount -= 1;
    renderPresent();
    return;
  }
  if (block?.type === 'quiz') {
    if (presentQuizQuestionAnswered) {
      presentQuizQuestionAnswered = false;
      presentQuizPickedIndex = null;
      renderPresent();
      return;
    }
    if (presentQuizQuestionIndex > 0) {
      presentQuizQuestionIndex -= 1;
      presentQuizQuestionAnswered = false;
      presentQuizPickedIndex = null;
      renderPresent();
      return;
    }
  }
  if (block?.type === 'brainbreak' && presentBrainBreakIndex > 0) {
    presentBrainBreakIndex -= 1;
    renderPresent();
    return;
  }
  if (block?.type === 'worldmap' && worldMapUsesRevealInPresent(block) && presentMapPinCount > 1) {
    presentMapPinCount -= 1;
    renderPresent();
    return;
  }
  presentPrev();
}

function presentNext() {
  syncPresentEditableFromStage();
  const blocks = getPresentBlocks();
  if (blocks.length === 0) return;
  presentRevealBlockId = null;
  presentIndex = (presentIndex + 1) % blocks.length;
  renderPresent();
}

function presentPrev() {
  syncPresentEditableFromStage();
  const blocks = getPresentBlocks();
  if (blocks.length === 0) return;
  presentRevealBlockId = null;
  presentIndex = (presentIndex - 1 + blocks.length) % blocks.length;
  renderPresent();
}

function bindPresentPoll() {
  const block = getPresentBlocks()[presentIndex];
  if (block?.type !== 'poll') return;
  $$('[data-poll-vote]', presentStage).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = Number(btn.dataset.pollVote);
      if (!Number.isFinite(i)) return;
      normalizePollData(block);
      block.pollVotes[i] = (block.pollVotes[i] || 0) + 1;
      persist();
      renderPresent();
    });
  });
}

function bindPresentQuiz() {
  const block = getPresentBlocks()[presentIndex];
  if (block?.type !== 'quiz') return;
  if (presentQuizQuestionAnswered) return;
  $$('[data-quiz-pick]', presentStage).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = Number(btn.dataset.quizPick);
      if (!Number.isFinite(i)) return;
      presentQuizQuestionAnswered = true;
      presentQuizPickedIndex = i;
      renderPresent();
    });
  });
}

function bindPresentQuizReveal() {
  const block = getPresentBlocks()[presentIndex];
  if (block?.type !== 'quiz' || !presentQuizQuestionAnswered) return;
  const card = $('.present-card', presentStage);
  if (!card) return;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.present-expand, .present-nav, a, button')) return;
    if (isPresentTypingTarget(e.target)) return;
    if (quizHasMorePresentSteps(block)) presentAdvance();
  });
}

function bindPresentBrainBreakReveal() {
  const block = getPresentBlocks()[presentIndex];
  if (block?.type !== 'brainbreak') return;
  const card = $('.present-card', presentStage);
  if (!card) return;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.present-expand, .present-nav, a, button')) return;
    if (isPresentTypingTarget(e.target)) return;
    if (brainBreakHasMorePresentSteps(block)) presentAdvance();
  });
}

function bindPresentWorldMapReveal() {
  const block = getPresentBlocks()[presentIndex];
  if (!worldMapUsesRevealInPresent(block)) return;
  const total = block.mapPins.length;
  if (presentMapPinCount >= total) return;
  const card = $('.present-card', presentStage);
  if (!card) return;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.present-expand, .present-nav, a, button')) return;
    if (isPresentTypingTarget(e.target)) return;
    if (presentMapPinCount < total) presentAdvance();
  });
}

function focusPresentListReveal() {
  const block = getPresentBlocks()[presentIndex];
  if (!listUsesRevealInPresent(block)) return;
  requestAnimationFrame(() => {
    const card = presentStage?.querySelector('.present-card--list-reveal');
    const scrollEl = card?.querySelector('.present-body--text');
    if (!scrollEl) return;
    const visible = scrollEl.querySelectorAll('li:not(.present-reveal-hidden)');
    const target = visible.length ? visible[visible.length - 1] : null;
    if (target) target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

function bindPresentListReveal() {
  const block = getPresentBlocks()[presentIndex];
  if (!listUsesRevealInPresent(block)) return;
  const card = $('.present-card', presentStage);
  if (!card) return;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.present-expand, .present-nav, a, button')) return;
    if (
      e.target.closest(
        '.present-body--present-editable, .present-card-title--editable, [data-present-field]'
      )
    ) {
      return;
    }
    if (isPresentTypingTarget(e.target)) return;
    presentAdvance();
  });
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

function deleteBlock(id) {
  const removed = getBlock(id);
  if (!removed) return;
  if (blankBlockId === id) closeBlank();
  if (state.mindMapCenterId === id) state.mindMapCenterId = null;
  state.blocks = state.blocks.filter((b) => b.id !== id);
  removeFromPresentOrder(id);
  if (selectedId === id) selectedId = null;
  if (state.boardTemplate === 'assessment-collaborator' && removed.assessmentStage) {
    getAssessmentStages(state.blocks).forEach((b, i) => {
      b.assessmentStageIndex = i;
    });
    layoutAssessmentCollab(state.blocks);
  }
  persist();
  render();
  showToast('Card deleted');
}

function getBlockOutlineLabel(block) {
  if (block.title?.trim()) return block.title.trim();
  if (block.type === 'poll') {
    normalizePollData(block);
    const first = block.pollOptions?.[0]?.trim();
    if (first) return first.slice(0, 48);
  }
  if (block.type === 'worldmap') {
    normalizeWorldMapData(block);
    const n = block.mapPins.length;
    if (n > 0) {
      const first = block.mapPins[0].label?.trim();
      const suffix = n > 1 ? ` (${n} pins)` : '';
      return ((first || 'World map') + suffix).slice(0, 48);
    }
  }
  if (block.type === 'quiz') {
    const questions = getQuizQuestions(block);
    const firstQ = questions[0]?.question?.trim();
    if (firstQ) {
      const suffix = questions.length > 1 ? ` (+${questions.length - 1})` : '';
      return (firstQ.slice(0, 40) + suffix).slice(0, 48);
    }
    if (questions.length > 1) return `Quiz (${questions.length} questions)`;
  }
  if (block.type === 'sticky' || block.type === 'heading' || block.type === 'note') {
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
    poll: 'Poll',
    quiz: 'Quiz',
    bloom: "Bloom's taxonomy",
    brainbreak: 'Brain break',
    worldmap: 'World map',
    sticky: 'Sticky',
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

function isPresentOpen() {
  return !!(presentOverlay && !presentOverlay.hidden);
}

function isLessonTimerActive() {
  const sec = getTimerRemainingSec();
  const total = state.timerSeconds || 300;
  return timerState.running || (sec > 0 && sec < total - 0.5);
}

function updateTimerDisplays() {
  const sec = getTimerRemainingSec();
  const text = formatTimer(sec);
  const low = sec > 0 && sec <= 10;

  ['#timerPopoverDisplay', '#timerFloatDisplay', '#presentTimerDisplay'].forEach((sel) => {
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

  const showToolbarFloat = !timerFloatDismissed && isLessonTimerActive() && !isPresentOpen();
  const float = $('#timerFloat');
  const toolbar = $('.toolbar');
  if (float) {
    float.hidden = !showToolbarFloat;
    if (showToolbarFloat) float.removeAttribute('hidden');
    else float.setAttribute('hidden', '');
    toolbar?.classList.toggle('has-timer', showToolbarFloat);
  }

  const showPresentTimer = isPresentOpen() && isLessonTimerActive();
  const presentTimer = $('#presentTimer');
  if (presentTimer) {
    presentTimer.hidden = !showPresentTimer;
    if (showPresentTimer) presentTimer.removeAttribute('hidden');
    else presentTimer.setAttribute('hidden', '');
    const pauseBtn = $('#presentTimerPause');
    if (pauseBtn) pauseBtn.textContent = timerState.running ? 'Pause' : 'Resume';
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
  syncTimerPauseLabels('Pause');
  startTimerTick();
  updateTimerDisplays();
}

function syncTimerPauseLabels(label) {
  $('#timerFloatPause').textContent = label;
  const presentPause = $('#presentTimerPause');
  if (presentPause) presentPause.textContent = label;
}

function pauseTimer() {
  if (!timerState.running) return;
  timerState.remainingSec = getTimerRemainingSec();
  timerState.running = false;
  timerState.endAt = null;
  stopTimerTick();
  $('#timerStart')?.removeAttribute('hidden');
  $('#timerPause')?.setAttribute('hidden', '');
  syncTimerPauseLabels('Resume');
  updateTimerDisplays();
}

function resetTimer() {
  pauseTimer();
  setTimerDuration(state.timerSeconds || 300);
  $('#timerStart')?.removeAttribute('hidden');
  $('#timerPause')?.setAttribute('hidden', '');
  syncTimerPauseLabels('Pause');
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
  const bindTimerPause = (btn) => {
    btn?.addEventListener('click', () => {
      if (timerState.running) pauseTimer();
      else startTimer();
    });
  };
  bindTimerPause($('#timerFloatPause'));
  bindTimerPause($('#presentTimerPause'));

  $('#timerFloatReset')?.addEventListener('click', resetTimer);
  $('#presentTimerReset')?.addEventListener('click', resetTimer);
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

const BLANK_TABLE_ROWS_MAX = 12;
const BLANK_TABLE_COLS_MAX = 8;

const BLANK_TABLE_DELETE_BTN_HTML =
  '<div class="blank-table-bar" contenteditable="false"><button type="button" class="blank-table-delete btn-icon" aria-label="Delete table" title="Delete table">×</button></div>';

function blankHtmlToPlainText(html) {
  if (!html?.trim()) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function cleanBlankEditorDom(editor) {
  if (!editor) return;
  editor.querySelectorAll('.blank-table-delete, .blank-table-bar').forEach((el) => {
    const block = el.closest('.blank-table-block');
    if (block && !block.querySelector('.blank-table')) block.remove();
    else if (!el.closest('.blank-table-block')) el.remove();
  });
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    if (!node.textContent.includes('Delete table')) return;
    node.textContent = node.textContent.replace(/Delete table/g, '');
    if (!node.textContent.trim()) node.remove();
  });
  editor.innerHTML = editor.innerHTML.replace(/&nbsp;/gi, ' ');
}

function normalizeBlankTableStructure(table) {
  if (!table?.classList?.contains('blank-table')) return;

  table.setAttribute('contenteditable', 'false');
  table.closest('.blank-table-block')?.removeAttribute('contenteditable');

  let tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    [...table.querySelectorAll(':scope > tr')].forEach((tr) => tbody.appendChild(tr));
    table.appendChild(tbody);
  }

  const firstBodyRow = tbody.querySelector('tr');
  const headerCells = firstBodyRow ? getTableRowCells(firstBodyRow) : [];
  const isHeaderRow =
    headerCells.length > 0 && headerCells.every((cell) => cell.tagName === 'TH');

  if (isHeaderRow) {
    let thead = table.querySelector('thead');
    if (!thead) {
      thead = document.createElement('thead');
      table.insertBefore(thead, tbody);
    }
    if (firstBodyRow.parentElement === tbody) thead.appendChild(firstBodyRow);
  }

  table.querySelectorAll('th, td').forEach((cell) => {
    cell.setAttribute('contenteditable', 'true');
  });
  table.querySelectorAll('.table-col-resize').forEach((h) => h.remove());
  table.querySelectorAll('.table-col-header').forEach((c) => c.classList.remove('table-col-header'));
}

function normalizeBlankTablesInEditor(editor) {
  if (!editor) return;
  editor.querySelectorAll('table.blank-table').forEach(normalizeBlankTableStructure);
}

function createBlankEditorSurface(editor) {
  const surface = document.createElement('div');
  surface.className = 'blank-editor-surface';
  surface.setAttribute('contenteditable', 'true');
  surface.setAttribute('spellcheck', 'true');
  if (editor?.dataset.placeholder) surface.dataset.placeholder = editor.dataset.placeholder;
  return surface;
}

function blankEditorFragmentHasContent(frag) {
  if (!frag) return false;
  if (frag.textContent?.replace(/\u00a0/g, ' ').trim()) return true;
  return [...frag.childNodes].some(
    (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent?.trim())
  );
}

/** Keep tables outside text surfaces (for th/td typing) while preserving document order. */
function normalizeBlankEditorStructure(editor) {
  if (!editor) return;
  editor.setAttribute('contenteditable', 'false');
  editor.removeAttribute('spellcheck');

  const items = [];
  [...editor.childNodes].forEach((node) => {
    if (node.nodeType === 1 && node.classList?.contains('blank-table-block')) {
      items.push({ type: 'table', node });
      return;
    }
    if (node.nodeType === 1 && node.classList?.contains('blank-editor-surface')) {
      items.push({ type: 'surface', node });
      return;
    }
    if (node.nodeType === 3 && !node.textContent?.trim()) {
      node.remove();
      return;
    }
    items.push({ type: 'orphan', node });
  });

  editor.innerHTML = '';
  let surface = null;

  const flushSurface = () => {
    if (!surface) return;
    if (!surface.innerHTML.trim()) surface.innerHTML = '<p><br></p>';
    editor.appendChild(surface);
    surface = null;
  };

  items.forEach((item) => {
    if (item.type === 'table') {
      flushSurface();
      editor.appendChild(item.node);
      return;
    }
    if (!surface) surface = createBlankEditorSurface(editor);
    if (item.type === 'surface') {
      while (item.node.firstChild) surface.appendChild(item.node.firstChild);
    } else {
      surface.appendChild(item.node);
    }
  });

  flushSurface();
  if (!editor.querySelector(':scope > .blank-editor-surface')) {
    const first = createBlankEditorSurface(editor);
    first.innerHTML = '<p><br></p>';
    editor.insertBefore(first, editor.firstChild);
  }

  normalizeBlankTablesInEditor(editor);
}

function insertBlankTableAtCursor(editor, tableHtml) {
  normalizeBlankEditorStructure(editor);
  const sel = window.getSelection();
  let surface = editor.querySelector(':scope > .blank-editor-surface');

  if (sel?.rangeCount) {
    const range = sel.getRangeAt(0);
    let hostSurface = range.commonAncestorContainer;
    if (hostSurface.nodeType === 3) hostSurface = hostSurface.parentElement;
    if (hostSurface?.closest) hostSurface = hostSurface.closest('.blank-editor-surface');
    if (hostSurface && editor.contains(hostSurface)) surface = hostSurface;
  }

  if (!surface) {
    editor.insertAdjacentHTML('beforeend', tableHtml);
    normalizeBlankEditorStructure(editor);
    return;
  }

  if (sel?.rangeCount) {
    const range = sel.getRangeAt(0);
    if (surface.contains(range.commonAncestorContainer)) {
      const tailRange = range.cloneRange();
      tailRange.collapse(false);
      const tail = tailRange.extractContents();
      const tableNode = range.createContextualFragment(tableHtml);
      surface.parentNode.insertBefore(tableNode, surface.nextSibling);

      if (blankEditorFragmentHasContent(tail)) {
        const afterSurface = createBlankEditorSurface(editor);
        afterSurface.appendChild(tail);
        const tableBlock = surface.nextSibling;
        surface.parentNode.insertBefore(afterSurface, tableBlock?.nextSibling ?? null);
      }

      normalizeBlankEditorStructure(editor);
      return;
    }
  }

  editor.insertAdjacentHTML('beforeend', tableHtml);
  normalizeBlankEditorStructure(editor);
}

function ensureBlankTableControls(editor) {
  if (!editor) return;
  editor.querySelectorAll('.blank-table-wrap').forEach((wrap) => {
    if (wrap.closest('.blank-table-block')) {
      if (!wrap.parentElement.querySelector('.blank-table-delete')) {
        wrap.parentElement.insertAdjacentHTML('afterbegin', BLANK_TABLE_DELETE_BTN_HTML);
      }
      return;
    }
    const block = document.createElement('div');
    block.className = 'blank-table-block';
    block.innerHTML = BLANK_TABLE_DELETE_BTN_HTML;
    wrap.parentNode.insertBefore(block, wrap);
    block.appendChild(wrap);
  });
  normalizeBlankEditorStructure(editor);
}

function removeBlankTableWrap(wrap) {
  const block = wrap?.closest('.blank-table-block') || wrap;
  if (!block) return;
  block.remove();
  const editor = $('#blankEditor');
  if (editor) {
    cleanBlankEditorDom(editor);
    normalizeBlankEditorStructure(editor);
    setBlankContent(editor.innerHTML);
  }
  showToast('Table removed');
}

function buildBlankTableHtml(rows, cols) {
  const r = Math.min(BLANK_TABLE_ROWS_MAX, Math.max(1, Math.round(rows) || 1));
  const c = Math.min(BLANK_TABLE_COLS_MAX, Math.max(1, Math.round(cols) || 1));
  const colPct = (100 / c).toFixed(3);
  let html = `<div class="blank-table-block">${BLANK_TABLE_DELETE_BTN_HTML}<div class="blank-table-wrap"><table class="blank-table" contenteditable="false"><colgroup>`;
  for (let x = 0; x < c; x++) {
    html += `<col style="width:${colPct}%" />`;
  }
  html += '</colgroup><thead><tr>';
  for (let x = 0; x < c; x++) {
    html += '<th contenteditable="true"></th>';
  }
  html += '</tr></thead><tbody>';
  for (let y = 1; y < r; y++) {
    html += '<tr>';
    for (let x = 0; x < c; x++) {
      html += '<td contenteditable="true"></td>';
    }
    html += '</tr>';
  }
  html += '</tbody></table></div></div>';
  return html;
}

function insertHtmlIntoBlankEditor(html) {
  const editor = $('#blankEditor');
  if (!editor) return;

  const isTable = html.includes('blank-table-block');
  const sel = window.getSelection();
  if (isTable) {
    insertBlankTableAtCursor(editor, html);
  } else {
    normalizeBlankEditorStructure(editor);
    const surface = editor.querySelector(':scope > .blank-editor-surface');
    let inserted = false;
    if (surface) {
      surface.focus();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (surface.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          const frag = range.createContextualFragment(html);
          range.insertNode(frag);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          inserted = true;
        }
      }
      if (!inserted) surface.insertAdjacentHTML('beforeend', html);
    } else {
      editor.insertAdjacentHTML('beforeend', html);
    }
    normalizeBlankEditorStructure(editor);
  }
  setBlankContent(editor.innerHTML);
  ensureBlankTableControls(editor);
  refreshBlankTableColumnResize();

  let wrap = null;
  if (isTable) {
    let anchorSurface = editor.querySelector(':scope > .blank-editor-surface');
    if (sel?.rangeCount) {
      let node = sel.getRangeAt(0).commonAncestorContainer;
      if (node.nodeType === 3) node = node.parentElement;
      const hit = node?.closest?.('.blank-editor-surface');
      if (hit && editor.contains(hit)) anchorSurface = hit;
    }
    const nextBlock = anchorSurface?.nextElementSibling;
    if (nextBlock?.classList?.contains('blank-table-block')) {
      wrap = $('.blank-table-wrap', nextBlock);
    }
    if (!wrap) {
      wrap = editor.querySelector('.blank-table-block:last-of-type .blank-table-wrap');
    }
  }
  const firstCell = wrap?.querySelector('thead th[contenteditable], th[contenteditable], td[contenteditable]');
  if (firstCell) {
    firstCell.focus();
    const r = document.createRange();
    r.selectNodeContents(firstCell);
    r.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(r);
  }
}

function insertBlankTableFromControls() {
  const rows = parseInt($('#blankTableRows')?.value, 10);
  const cols = parseInt($('#blankTableCols')?.value, 10);
  insertHtmlIntoBlankEditor(buildBlankTableHtml(rows, cols));
  showToast('Table inserted');
}

function openBlank(blockId) {
  closeFormatMenu();
  closeOutline();
  if (presentOverlay && !presentOverlay.hidden) {
    showToast('Exit Present first, or use the whiteboard slide there');
    return;
  }
  const overlay = $('#blankOverlay');
  if (!overlay) return;

  if (blockId && getBlock(blockId)) {
    blankBlockId = blockId;
  } else if (selectedId) {
    const sel = getBlock(selectedId);
    blankBlockId = sel?.type === 'whiteboard' ? selectedId : null;
  } else {
    blankBlockId = null;
  }
  blankCanvasOwnerId = blankBlockId;
  blankDrawDirty = false;

  overlay.hidden = false;
  overlay.removeAttribute('hidden');
  document.body.classList.add('blank-open');
  document.body.style.overflow = 'hidden';
  blankDrawUndoStack.length = 0;
  blankStrokeBefore = null;
  blankStrokeMoved = false;
  syncBlankDrawUndoBtn();
  const editor = $('#blankEditor');
  const content = getBlankContent();
  if (editor && editor.innerHTML !== content) editor.innerHTML = content;
  ensureBlankTableControls(editor);
  cleanBlankEditorDom(editor);
  normalizeBlankEditorStructure(editor);
  refreshBlankTableColumnResize();
  const block = blankBlockId ? getBlock(blankBlockId) : null;
  if (block?.type === 'whiteboard') setBlankTab('draw');
  else setBlankTab('type');
  resetBlankCanvasBuffer();
  initBlankCanvas();
  requestAnimationFrame(() => {
    resizeBlankCanvas();
    if (block?.type !== 'whiteboard') {
      editor?.querySelector(':scope > .blank-editor-surface')?.focus();
    }
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
  document.body.classList.remove('blank-open');
  blankDrawUndoStack.length = 0;
  blankStrokeBefore = null;
  blankStrokeMoved = false;
  syncBlankDrawUndoBtn();
  blankDrawing = false;
  blankBlockId = null;
  blankCanvasOwnerId = null;
  blankDrawCtx = null;
  const canvas = $('#blankCanvas');
  if (canvas) delete canvas.dataset.bound;
  resetBlankCanvasBuffer();
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
    syncBlankDrawToolbar();
    requestAnimationFrame(() => {
      initBlankCanvas();
      resizeBlankCanvas();
    });
  }
}

function getBlankDrawLineWidth() {
  const base = BLANK_DRAW_WIDTHS[blankDrawSize] || BLANK_DRAW_WIDTHS.m;
  return blankDrawTool === 'eraser' ? base * 2.5 : base;
}

function applyBlankDrawContext(ctx) {
  if (!ctx) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = getBlankDrawLineWidth();
  if (blankDrawTool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = blankDrawColor;
  }
}

function syncBlankDrawUndoBtn() {
  const btn = $('#blankDrawUndo');
  if (btn) btn.disabled = blankDrawUndoStack.length === 0;
}

function commitBlankDrawStrokeUndo() {
  if (!blankStrokeMoved || !blankStrokeBefore) return;
  blankDrawUndoStack.push(blankStrokeBefore);
  if (blankDrawUndoStack.length > BLANK_DRAW_UNDO_MAX) blankDrawUndoStack.shift();
  syncBlankDrawUndoBtn();
  blankStrokeBefore = null;
  blankStrokeMoved = false;
}

function restoreBlankDrawSnapshot(dataUrl, onDone) {
  const canvas = $('#blankCanvas');
  if (!canvas || !blankDrawCtx || !dataUrl) {
    onDone?.();
    return;
  }
  const img = new Image();
  img.onload = () => {
    blankDrawCtx.globalCompositeOperation = 'source-over';
    blankDrawCtx.clearRect(0, 0, canvas.width, canvas.height);
    blankDrawCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    applyBlankDrawContext(blankDrawCtx);
    saveBlankDraw();
    onDone?.();
  };
  img.onerror = () => onDone?.();
  img.src = dataUrl;
}

function undoBlankDrawStroke() {
  if (blankDrawUndoBusy || blankDrawUndoStack.length === 0) return;
  const beforeLastStroke = blankDrawUndoStack.pop();
  syncBlankDrawUndoBtn();
  blankDrawUndoBusy = true;
  restoreBlankDrawSnapshot(beforeLastStroke, () => {
    blankDrawUndoBusy = false;
    blankDrawDirty = true;
    saveBlankDraw();
  });
}

function syncBlankDrawToolbar() {
  const canvas = $('#blankCanvas');
  $$('[data-draw-tool]').forEach((btn) => {
    const on = btn.dataset.drawTool === blankDrawTool;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  $$('[data-draw-color]').forEach((btn) => {
    const on = btn.dataset.drawColor === blankDrawColor;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  $$('[data-draw-size]').forEach((btn) => {
    const on = btn.dataset.drawSize === blankDrawSize;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  $('#blankDrawColors')?.classList.toggle('is-disabled', blankDrawTool === 'eraser');
  canvas?.classList.toggle('blank-canvas--eraser', blankDrawTool === 'eraser');
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
    if (canvas.clientWidth >= 2 && canvas.clientHeight >= 2) resizeBlankCanvas();
    const p = blankCanvasPos(canvas, e);
    if (!p || !blankDrawCtx) return;
    try {
      blankStrokeBefore = canvas.toDataURL('image/png');
    } catch (_) {
      blankStrokeBefore = null;
    }
    blankStrokeMoved = false;
    blankDrawing = true;
    applyBlankDrawContext(blankDrawCtx);
    blankDrawCtx.beginPath();
    blankDrawCtx.moveTo(p.x, p.y);
    canvas.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    if (!blankDrawing || !blankDrawCtx) return;
    const p = blankCanvasPos(canvas, e);
    if (!p) return;
    blankStrokeMoved = true;
    applyBlankDrawContext(blankDrawCtx);
    blankDrawCtx.lineTo(p.x, p.y);
    blankDrawCtx.stroke();
    blankDrawCtx.beginPath();
    blankDrawCtx.moveTo(p.x, p.y);
  };

  const up = (e) => {
    if (!blankDrawing) return;
    blankDrawing = false;
    canvas.releasePointerCapture?.(e.pointerId);
    commitBlankDrawStrokeUndo();
    blankDrawDirty = true;
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

  const ownerMatches = blankCanvasOwnerId === blankBlockId;
  if (canvas.width === w && canvas.height === h) {
    applyBlankDrawContext(blankDrawCtx);
    return;
  }

  let snapshot = null;
  if (ownerMatches && canvas.width > 0 && canvas.height > 0) {
    try {
      snapshot = canvas.toDataURL('image/png');
    } catch (_) {}
  }
  if (!snapshot) snapshot = getBlankDraw();

  canvas.width = w;
  canvas.height = h;
  applyBlankDrawContext(blankDrawCtx);

  if (snapshot) {
    const img = new Image();
    img.onload = () => {
      blankDrawCtx.globalCompositeOperation = 'source-over';
      blankDrawCtx.clearRect(0, 0, w, h);
      blankDrawCtx.drawImage(img, 0, 0, w, h);
      applyBlankDrawContext(blankDrawCtx);
    };
    img.src = snapshot;
  } else {
    blankDrawCtx.globalCompositeOperation = 'source-over';
    blankDrawCtx.clearRect(0, 0, w, h);
    applyBlankDrawContext(blankDrawCtx);
  }
}

function saveBlankDraw() {
  if (!blankDrawDirty) return;
  const canvas = $('#blankCanvas');
  if (!canvas?.width || !canvas.height || !blankDrawCtx) return;
  try {
    if (isBlankDrawCanvasEmpty(canvas)) setBlankDraw(null);
    else setBlankDraw(canvas.toDataURL('image/png'));
  } catch (_) {}
}

function initBlankDrawToolbar() {
  $('#blankDrawUndo')?.addEventListener('click', () => undoBlankDrawStroke());

  $$('[data-draw-tool]').forEach((btn) => {
    btn.addEventListener('click', () => {
      blankDrawTool = btn.dataset.drawTool === 'eraser' ? 'eraser' : 'pen';
      syncBlankDrawToolbar();
    });
  });
  $$('[data-draw-color]').forEach((btn) => {
    btn.addEventListener('click', () => {
      blankDrawColor = btn.dataset.drawColor || '#f4f6f8';
      blankDrawTool = 'pen';
      syncBlankDrawToolbar();
    });
  });
  $$('[data-draw-size]').forEach((btn) => {
    btn.addEventListener('click', () => {
      blankDrawSize = btn.dataset.drawSize || 'm';
      syncBlankDrawToolbar();
    });
  });
  syncBlankDrawToolbar();
}

function initBlankUI() {
  initBlankDrawToolbar();

  $('#blankClearDraw')?.addEventListener('click', () => {
    const canvas = $('#blankCanvas');
    if (!blankDrawCtx || !canvas) return;
    blankDrawCtx.globalCompositeOperation = 'source-over';
    blankDrawCtx.clearRect(0, 0, canvas.width, canvas.height);
    blankDrawUndoStack.length = 0;
    syncBlankDrawUndoBtn();
    blankDrawDirty = true;
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
  $('#blankInsertTable')?.addEventListener('click', insertBlankTableFromControls);
  $('#blankEditor')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.blank-table-delete');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    removeBlankTableWrap(btn.closest('.blank-table-block, .blank-table-wrap'));
  });
  $('#blankEditor')?.addEventListener('input', () => {
    setBlankContent($('#blankEditor').innerHTML);
  });
  $('#blankEditor')?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (presentWhiteboardMounted) return;
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
      </div>
      <button type="button" class="outline-item-remove" aria-label="Delete card" title="Delete card">×</button>`;

    const removeBtn = $('.outline-item-remove', li);
    removeBtn?.addEventListener('mousedown', (e) => e.stopPropagation());
    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteBlock(id);
    });

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

// --- Templates ---

function instantiateTemplateBlock(spec, index) {
  const type = spec.type;
  let w = spec.w;
  let h = spec.h;
  if (!w) {
    w = type === 'heading' ? 400 : type === 'timer' ? 300 : 340;
  }
  if (!h) {
    h =
      type === 'heading'
        ? 160
        : type === 'list'
          ? 240
          : type === 'image'
            ? 280
            : type === 'timer'
              ? 200
              : 200;
  }
  const block = {
    id: uid(),
    type,
    x: spec.x != null ? spec.x : LAYOUT_PAD,
    y: spec.y != null ? spec.y : LAYOUT_PAD + index * 48,
    w,
    h,
    z: index + 1,
    accent: spec.accent || ACCENTS[index % ACCENT_DARK.length],
    title: spec.title || '',
    content: spec.content ?? '',
  };
  if (type === 'timer') block.timerSec = spec.timerSec ?? 300;
  if (spec.tableHtml) block.tableHtml = spec.tableHtml;
  if (spec.url) block.url = spec.url;
  if (spec.mindMapCenter) block.mindMapCenter = true;
  if (spec.branchIndex != null) block.branchIndex = spec.branchIndex;
  if (spec.galleryStation) block.galleryStation = true;
  if (spec.galleryIndex != null) block.galleryIndex = spec.galleryIndex;
  if (spec.assessmentTask) block.assessmentTask = true;
  if (spec.assessmentStage) block.assessmentStage = true;
  if (spec.assessmentStageIndex != null) block.assessmentStageIndex = spec.assessmentStageIndex;
  if (spec.reflectionColumn) block.reflectionColumn = true;
  if (spec.reflectionColumnIndex != null) block.reflectionColumnIndex = spec.reflectionColumnIndex;
  if (spec.listRevealAll != null) block.listRevealAll = spec.listRevealAll;
  if (spec.imageData) block.imageData = spec.imageData;
  return block;
}

function normalizeGridWallState(gridWall) {
  if (!gridWall || !gridWall.variant || !Array.isArray(gridWall.cells)) return null;
  const cols = gridWall.cols === 4 ? 4 : 3;
  const rows = 2;
  const expected = rows * cols;
  const cells = gridWall.cells.slice(0, expected).map((c) => ({
    title: c.title || '',
    content: c.content || '<ul><li></li><li></li><li></li></ul>',
  }));
  while (cells.length < expected) {
    cells.push({
      title: `Section ${cells.length + 1}`,
      content: '<ul><li></li><li></li><li></li></ul>',
    });
  }
  return {
    variant: gridWall.variant,
    rows,
    cols,
    feedbackMode: gridWall.feedbackMode === 'final' ? 'final' : gridWall.feedbackMode === 'drafts' ? 'drafts' : null,
    cells,
  };
}

function hideGridWallSurface() {
  canvasWrap?.classList.remove('canvas-wrap--grid-wall');
  const surface = $('#gridWallSurface');
  if (surface) {
    surface.hidden = true;
    surface.setAttribute('hidden', '');
  }
  const fab = $('#fabAdd');
  if (fab) {
    fab.hidden = false;
    fab.removeAttribute('hidden');
  }
}

function syncGridWallChrome() {
  const show = isGridWallBoard();
  document.body.classList.toggle('grid-wall-active', show);
  const pdfBtn = $('#btnGridWallPdf');
  const filePdf = $('#fileMenuGridWallPdf');
  const fileDiv = $('#fileMenuGridWallDivider');
  if (pdfBtn) {
    pdfBtn.hidden = !show;
    if (show) pdfBtn.removeAttribute('hidden');
    else pdfBtn.setAttribute('hidden', '');
  }
  if (filePdf) {
    filePdf.hidden = !show;
    if (show) filePdf.removeAttribute('hidden');
    else filePdf.setAttribute('hidden', '');
  }
  if (fileDiv) {
    fileDiv.hidden = !show;
    if (show) fileDiv.removeAttribute('hidden');
    else fileDiv.setAttribute('hidden', '');
  }
}

function bindGridWallCellInputs() {
  $$('[data-grid-title]', $('#gridWallGrid')).forEach((inp) => {
    inp.oninput = () => {
      const i = Number(inp.dataset.gridTitle);
      if (state.gridWall?.cells[i]) {
        state.gridWall.cells[i].title = inp.value;
        persist();
      }
    };
  });
  $$('[data-grid-body]', $('#gridWallGrid')).forEach((el) => {
    el.oninput = () => {
      const i = Number(el.dataset.gridBody);
      if (state.gridWall?.cells[i]) {
        state.gridWall.cells[i].content = el.innerHTML;
        persist();
      }
    };
  });
}

function getGridWallCellHTML(cell, index) {
  return `<div class="grid-wall-cell" data-cell-index="${index}">
    <textarea class="grid-wall-cell-title" rows="2" placeholder="Section title" data-grid-title="${index}">${escapeHtml(cell.title)}</textarea>
    <div class="grid-wall-cell-body" contenteditable="true" data-grid-body="${index}">${cell.content || '<ul><li></li><li></li><li></li></ul>'}</div>
  </div>`;
}

function renderGridWallBoard() {
  const grid = $('#gridWallGrid');
  const surface = $('#gridWallSurface');
  if (!grid || !surface || !state.gridWall) return;

  canvasWrap?.classList.add('canvas-wrap--grid-wall');
  surface.hidden = false;
  surface.removeAttribute('hidden');

  const fab = $('#fabAdd');
  if (fab) {
    fab.hidden = true;
    fab.setAttribute('hidden', '');
  }

  $$('[data-block-id]', canvasInner).forEach((el) => el.remove());
  canvasInner.innerHTML = '';
  $('.canvas-empty', canvasInner)?.remove();

  grid.style.gridTemplateColumns = `repeat(${state.gridWall.cols}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${state.gridWall.rows}, 1fr)`;
  grid.innerHTML = state.gridWall.cells.map((cell, i) => getGridWallCellHTML(cell, i)).join('');
  bindGridWallCellInputs();

  updateEmptyState();
  syncBoardTemplateBar();
}

function applyGridWallTemplate(templateId, options = {}) {
  const gw = window.PREZ_GRID_WALL;
  if (!gw) {
    showToast('Grid wall module not loaded');
    return;
  }
  const cols = options.cols === 4 ? 4 : 3;
  const gridWall = gw.create(templateId, {
    cols,
    feedbackMode: options.feedbackMode,
  });
  const meta = gw.getTemplateMeta(templateId);

  state = normalizeBoardState({
    title: meta.title,
    background: gw.BG,
    layoutMode: null,
    blocks: [],
    presentOrder: [],
    blankContent: '',
    blankDraw: null,
    timerSeconds: 300,
    mindMapCenterId: null,
    mindMapOrbitRadius: null,
    boardTemplate: templateId,
    gridWall,
  });

  selectedId = null;
  layoutUndoStack = [];
  updateUndoButton();
  setLayoutSelectValue('free');
  syncBoardTitle();
  applyBackground();
  render();
  persist();
  $('#templatesDialog')?.close();
  $('#templateConfigDialog')?.close();
  pendingTemplateApply = null;
  showToast(`${meta.title} ready — fill live, then Export PDF`);
}

function exportGridWallPdf() {
  if (!isGridWallBoard() || !window.PREZ_GRID_WALL) {
    showToast('Open a collaboration or feedback wall first');
    return;
  }
  const html = window.PREZ_GRID_WALL.buildPrintDocument(state.gridWall, getBoardTitle());
  const win = window.open('', '_blank');
  if (!win) {
    showToast('Allow pop-ups to export PDF, then use Print → Save as PDF');
    return;
  }
  win.document.write(html);
  win.document.close();
  showToast('Print dialog opened — choose Save as PDF');
}

function openPresentGridWall() {
  if (!state.gridWall) return;
  presentOverlay.hidden = false;
  presentOverlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  applyPresentBackground();
  hidePresentWhiteboard();
  presentCounter.textContent = 'Wall';
  const cols = state.gridWall.cols;
  const rows = state.gridWall.rows;
  presentStage.innerHTML = `<div class="present-grid-wall" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)">
    ${state.gridWall.cells.map((cell, i) => getGridWallCellHTML(cell, i)).join('')}
  </div>`;
  $$('[data-grid-title]', presentStage).forEach((inp) => {
    inp.readOnly = true;
  });
  $$('[data-grid-body]', presentStage).forEach((el) => {
    el.contentEditable = 'false';
  });
  if (presentOverlay.requestFullscreen) {
    presentOverlay.requestFullscreen().catch(() => {});
  }
}

function applyBoardTemplate(templateId, options = {}) {
  const templates = window.PREZ_TEMPLATES;
  if (!Array.isArray(templates)) {
    showToast('Templates not loaded');
    return;
  }
  const tpl = templates.find((t) => t.id === templateId);
  if (!tpl) return;

  if (
    (state.blocks.length || state.gridWall) &&
    !confirm('Replace your current board with this template? Unsaved changes will be lost.')
  ) {
    return;
  }

  closePresent();
  closeGalleryViewer();
  closeFormatMenu();
  closeAllDropdowns();
  closeBlank();
  closeOutline();
  resetTimer();

  if (templateId === 'task-collaboration-wall' || templateId === 'feedback-reflection-wall') {
    applyGridWallTemplate(templateId, options);
    return;
  }

  const builder = window.PREZ_TEMPLATE_BUILDERS?.[templateId];
  const built = builder ? builder(options) : null;
  let blockSpecs = built?.blockSpecs ?? tpl.blockSpecs ?? [];
  const board = { ...(tpl.board || {}), ...(built?.board || {}) };

  const blocks = blockSpecs.map((spec, i) => instantiateTemplateBlock(spec, i));
  if (board.presentEditable) {
    blocks.forEach((b) => {
      b.presentEditable = true;
    });
  }

  const isMindMap = board.mindMap || tpl.layout === 'mind-map';
  const centerBlock =
    blocks.find((b) => b.mindMapCenter) ||
    (isMindMap ? blocks.find((b) => b.type === 'heading') || blocks[0] : null);

  applyTemplateLayout(templateId, blocks, centerBlock?.id);

  const presentOrder = blocks.map((b) => b.id);

  state = normalizeBoardState({
    title: board.title || tpl.name || DEFAULTS.title,
    background: board.background || DEFAULTS.background,
    layoutMode: board.layoutMode ?? null,
    blocks,
    presentOrder,
    blankContent: '',
    blankDraw: null,
    timerSeconds: 300,
    mindMapCenterId: centerBlock && isMindMap ? centerBlock.id : null,
    mindMapBranchSize: 'm',
    mindMapOrbitRadius: null,
    boardTemplate: isMindMap ? 'mind-map' : templateId,
  });

  selectedId = null;
  layoutUndoStack = [];
  updateUndoButton();
  setLayoutSelectValue(state.layoutMode || 'free');
  syncBoardTitle();
  applyBackground();
  resizeCanvasToContent();

  render();
  persist();
  $('#templatesDialog')?.close();
  $('#templateConfigDialog')?.close();
  pendingTemplateApply = null;

  const editNote = board.presentEditable ? ' · editable in Present' : '';
  const extra =
    templateId === 'gallery-walk'
      ? ' — add images or documents, then click a station to view full screen'
      : '';
  showToast(`${tpl.name} ready${editNote}${extra}`);
}

function requestApplyTemplate(tpl) {
  if (!tpl?.id) return;
  if (tpl.configure?.kind === 'cells' || tpl.configure?.kind === 'branches') {
    pendingTemplateApply = { templateId: tpl.id, configure: tpl.configure };
    openTemplateConfigCountDialog(tpl);
    return;
  }
  if (tpl.configure?.kind === 'task-grid') {
    openTemplateConfigTaskGridDialog(tpl);
    return;
  }
  if (tpl.configure?.kind === 'feedback-grid') {
    openTemplateConfigFeedbackGridDialog(tpl);
    return;
  }
  applyBoardTemplate(tpl.id);
}

function openTemplateConfigCountDialog(tpl) {
  const cfg = tpl.configure;
  const dialog = $('#templateConfigDialog');
  const titleEl = $('#templateConfigTitle');
  const introEl = $('#templateConfigIntro');
  const choicesEl = $('#templateConfigChoices');
  const presetsEl = $('#templateConfigPresets');
  if (!dialog || !choicesEl) return;

  const label = cfg.label || 'items';
  titleEl.textContent = tpl.name;
  introEl.textContent =
    cfg.kind === 'branches'
      ? 'How many branches around the central topic?'
      : `How many ${label}? Stations fill the board.`;
  presetsEl.innerHTML = '';
  presetsEl.hidden = true;
  presetsEl.setAttribute('hidden', '');
  choicesEl.hidden = false;
  choicesEl.removeAttribute('hidden');
  choicesEl.innerHTML = '';

  for (let n = cfg.min; n <= cfg.max; n++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'template-config-choice' + (n === cfg.default ? ' is-recommended' : '');
    btn.textContent = String(n);
    btn.addEventListener('click', () => {
      const opts = cfg.kind === 'branches' ? { branchCount: n } : { cellCount: n };
      applyBoardTemplate(tpl.id, opts);
    });
    choicesEl.appendChild(btn);
  }

  $('#templatesDialog')?.close();
  try {
    dialog.showModal();
  } catch {
    showToast('Could not open options');
  }
}

function openTemplateConfigTaskGridDialog(tpl) {
  const dialog = $('#templateConfigDialog');
  const titleEl = $('#templateConfigTitle');
  const introEl = $('#templateConfigIntro');
  const choicesEl = $('#templateConfigChoices');
  const presetsEl = $('#templateConfigPresets');
  if (!dialog || !choicesEl) return;

  titleEl.textContent = tpl.name;
  introEl.textContent = 'Choose grid size — 2×3 (recommended) or 2×4. All sections visible on one screen.';
  presetsEl.innerHTML = '';
  presetsEl.hidden = true;
  presetsEl.setAttribute('hidden', '');
  choicesEl.hidden = false;
  choicesEl.removeAttribute('hidden');
  choicesEl.innerHTML = '';

  [
    { label: '2×3', cols: 3, rec: true },
    { label: '2×4', cols: 4, rec: false },
  ].forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'template-config-choice' + (opt.rec ? ' is-recommended' : '');
    btn.textContent = opt.label;
    btn.addEventListener('click', () => applyBoardTemplate(tpl.id, { cols: opt.cols }));
    choicesEl.appendChild(btn);
  });

  $('#templatesDialog')?.close();
  try {
    dialog.showModal();
  } catch {
    showToast('Could not open options');
  }
}

function openTemplateConfigFeedbackGridDialog(tpl) {
  const dialog = $('#templateConfigDialog');
  const titleEl = $('#templateConfigTitle');
  const introEl = $('#templateConfigIntro');
  const presetsEl = $('#templateConfigPresets');
  const choicesEl = $('#templateConfigChoices');
  if (!dialog || !presetsEl) return;

  titleEl.textContent = tpl.name;
  introEl.textContent = 'When did you review the work? Then pick grid size.';
  choicesEl.innerHTML = '';
  choicesEl.hidden = true;
  choicesEl.setAttribute('hidden', '');
  presetsEl.hidden = false;
  presetsEl.removeAttribute('hidden');
  presetsEl.innerHTML = '';

  const options = [
    { label: 'Drafts reviewed', sub: '2×3 grid', feedbackMode: 'drafts', cols: 3 },
    { label: 'Drafts reviewed', sub: '2×4 grid', feedbackMode: 'drafts', cols: 4 },
    { label: 'Final work reviewed', sub: '2×3 grid', feedbackMode: 'final', cols: 3 },
    { label: 'Final work reviewed', sub: '2×4 grid', feedbackMode: 'final', cols: 4 },
  ];

  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'template-config-preset' + (i === 0 ? ' is-recommended' : '');
    btn.innerHTML = `<strong>${escapeHtml(opt.label)}</strong><span>${escapeHtml(opt.sub)}</span>`;
    btn.addEventListener('click', () =>
      applyBoardTemplate(tpl.id, { feedbackMode: opt.feedbackMode, cols: opt.cols })
    );
    presetsEl.appendChild(btn);
  });

  $('#templatesDialog')?.close();
  try {
    dialog.showModal();
  } catch {
    showToast('Could not open options');
  }
}

function initTemplateConfigDialog() {
  const dialog = $('#templateConfigDialog');
  if (!dialog) return;
  dialog.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close());
  });
}

function initBoardTemplateBar() {
  $('#assessmentAddStage')?.addEventListener('click', addAssessmentStage);
  $('#assessmentRemoveStage')?.addEventListener('click', removeAssessmentStage);
}

function initGalleryViewer() {
  $('#galleryViewerClose')?.addEventListener('click', closeGalleryViewer);
  $('#galleryViewerOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryViewerOverlay') closeGalleryViewer();
  });
}

function initGridWallUI() {
  $('#btnGridWallPdf')?.addEventListener('click', exportGridWallPdf);
}

function createTemplateCard(tpl) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'template-card';
  btn.dataset.templateId = tpl.id;
  const tagHtml = tpl.tag ? `<span class="template-card-tag">${escapeHtml(tpl.tag)}</span>` : '';
  btn.innerHTML = `${tagHtml}<span class="template-card-name">${escapeHtml(tpl.name)}</span><span class="template-card-desc">${escapeHtml(tpl.description || '')}</span><span class="template-card-cta">Use template</span>`;
  btn.addEventListener('click', () => requestApplyTemplate(tpl));
  return btn;
}

function buildTemplatesGallery() {
  const templates = window.PREZ_TEMPLATES;
  if (!Array.isArray(templates)) return;

  const featuredEl = $('#templatesFeatured');
  const sectionsEl = $('#templatesSections');
  if (!featuredEl || !sectionsEl) return;

  featuredEl.innerHTML = '';
  sectionsEl.innerHTML = '';

  const featured = templates.filter((t) => t.tag === 'Featured');
  const rest = templates.filter((t) => t.tag !== 'Featured');

  if (featured.length) {
    featuredEl.hidden = false;
    featuredEl.removeAttribute('hidden');
    featured.forEach((tpl) => featuredEl.appendChild(createTemplateCard(tpl)));
  } else {
    featuredEl.hidden = true;
    featuredEl.setAttribute('hidden', '');
  }

  const byCategory = {};
  rest.forEach((tpl) => {
    const cat = tpl.category || 'More';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(tpl);
  });

  Object.keys(byCategory).forEach((cat) => {
    const section = document.createElement('section');
    section.className = 'templates-section';
    const h3 = document.createElement('h3');
    h3.className = 'templates-section-title';
    h3.textContent = cat;
    const grid = document.createElement('div');
    grid.className = 'templates-grid';
    byCategory[cat].forEach((tpl) => grid.appendChild(createTemplateCard(tpl)));
    section.appendChild(h3);
    section.appendChild(grid);
    sectionsEl.appendChild(section);
  });
}

function initTemplatesGallery() {
  buildTemplatesGallery();
}

function openTemplatesDialog() {
  const dialog = $('#templatesDialog');
  if (!dialog) {
    showToast('Templates dialog missing');
    return;
  }
  buildTemplatesGallery();
  try {
    dialog.showModal();
  } catch {
    showToast('Could not open templates');
  }
}

// --- Save / load ---

function newBoard() {
  if (
    (state.blocks.length || state.gridWall) &&
    !confirm('Start a new board? Your current cards will be cleared.')
  ) {
    return;
  }

  closePresent();
  closeGalleryViewer();
  closeFormatMenu();
  closeAllDropdowns();

  closeBlank();
  closeOutline();
  resetTimer();
  blankBlockId = null;
  blankCanvasOwnerId = null;
  blankDrawDirty = false;
  resetBlankCanvasBuffer();

  state = normalizeBoardState({
    title: DEFAULTS.title,
    background: DEFAULTS.background,
    layoutMode: null,
    blocks: [],
    presentOrder: [],
    blankContent: '',
    blankDraw: null,
    timerSeconds: 300,
    mindMapCenterId: null,
    mindMapOrbitRadius: null,
    boardTemplate: null,
    gridWall: null,
    defaultAccent: null,
  });

  selectedId = null;
  layoutUndoStack = [];
  hotInsertUndoStack = [];
  updateUndoButton();
  setLayoutSelectValue('free');
  syncBoardTitle();
  applyBackground();
  hideGridWallSurface();
  syncGridWallChrome();
  syncBoardTemplateBar();
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
    mindMapCenterId: state.mindMapCenterId || null,
    mindMapBranchSize: state.mindMapBranchSize || 'm',
    mindMapOrbitRadius: state.mindMapOrbitRadius || null,
    boardTemplate: state.boardTemplate || null,
    gridWall: state.gridWall || null,
    defaultAccent: state.defaultAccent || null,
    presentUseBoardBackground: !!state.presentUseBoardBackground,
    presentUseCardColour: !!state.presentUseCardColour,
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
        mindMapCenterId: data.mindMapCenterId || null,
        mindMapBranchSize: data.mindMapBranchSize || 'm',
        mindMapOrbitRadius:
          typeof data.mindMapOrbitRadius === 'number' && data.mindMapOrbitRadius > 0
            ? data.mindMapOrbitRadius
            : null,
        boardTemplate: data.boardTemplate || null,
        gridWall: data.gridWall || null,
        defaultAccent: data.defaultAccent || null,
        presentUseBoardBackground: data.presentUseBoardBackground,
        presentUseCardColour: data.presentUseCardColour,
      });
      setTimerDuration(state.timerSeconds || 300);
      selectedId = null;
      layoutUndoStack = [];
      updateUndoButton();
      setLayoutSelectValue(state.layoutMode || 'free');
      syncBoardTitle();
      applyBackground();
      syncGridWallChrome();
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

function formatBackgroundImageUrl(src) {
  if (!src) return '';
  const s = String(src).trim();
  if (s.startsWith('url(')) return s;
  return `url("${s.replace(/"/g, '')}")`;
}

function isBackgroundImageStyle(style) {
  return !!style && String(style).startsWith('url(');
}

function setBoardBackground(value) {
  state.background = value;
  applyBackground();
  syncBackgroundSwatches();
  persist();
}

function syncBackgroundSwatches() {
  const grid = $('#bgGrid');
  if (grid) {
    $$('.bg-swatch', grid).forEach((swatch) => {
      swatch.classList.toggle('is-active', swatch.dataset.bgStyle === state.background);
    });
  }
  const preview = $('#bgCustomPreview');
  if (!preview) return;
  if (isBackgroundImageStyle(state.background)) {
    preview.hidden = false;
    preview.removeAttribute('aria-hidden');
    preview.style.backgroundImage = state.background;
  } else {
    preview.hidden = true;
    preview.setAttribute('aria-hidden', 'true');
    preview.style.backgroundImage = '';
  }
}

function readBackgroundImageFile(file) {
  if (!file?.type.startsWith('image/')) {
    showToast('Choose an image file');
    return;
  }
  if (file.size > MAX_BACKGROUND_BYTES) {
    showToast('Image too large (max 5 MB)');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setBoardBackground(formatBackgroundImageUrl(reader.result));
    const urlInput = $('#bgCustomUrl');
    if (urlInput) urlInput.value = '';
    $('#bgDialog')?.close();
    showToast('Background image applied');
  };
  reader.onerror = () => showToast('Could not read image');
  reader.readAsDataURL(file);
}

function isBgDialogOpen() {
  const dialog = $('#bgDialog');
  return !!(dialog && dialog.open);
}

function tryPasteBackgroundImage(e) {
  if (!isBgDialogOpen()) return false;
  const file = getClipboardImageFile(e.clipboardData);
  if (!file) return false;
  e.preventDefault();
  e.stopPropagation();
  readBackgroundImageFile(file);
  return true;
}

function initBackgroundPicker() {
  const grid = $('#bgGrid');
  if (!grid) return;
  BACKGROUNDS.forEach((bg) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'bg-swatch';
    swatch.dataset.bgStyle = bg.style;
    swatch.style.background = bg.style;
    swatch.title = bg.id;
    swatch.addEventListener('click', () => {
      setBoardBackground(bg.style);
      const urlInput = $('#bgCustomUrl');
      if (urlInput) urlInput.value = '';
      $('#bgDialog')?.close();
      showToast('Background updated');
    });
    grid.appendChild(swatch);
  });
  syncBackgroundSwatches();
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
  syncBackgroundSwatches();
  const urlInput = $('#bgCustomUrl');
  if (urlInput && !isBackgroundImageStyle(state.background)) urlInput.value = '';
  try {
    dialog.showModal();
  } catch (err) {
    console.error(err);
    showToast('Could not open background picker');
  }
}

const FAB_ANCHORED_DIALOG_IDS = ['addDialog', 'hotDialog', 'brainBreakDialog'];
const FAB_DIALOG_ANCHOR_GAP = 6;

function clearDialogFabAnchor(dialog) {
  if (!dialog) return;
  dialog.classList.remove('dialog--near-fab');
  ['position', 'margin', 'top', 'left', 'right', 'bottom', 'transform'].forEach((prop) => {
    dialog.style.removeProperty(prop);
  });
}

/** Anchor dialog bottom-right to the + button top-left (short mouse travel). */
function positionDialogNearFab(dialog) {
  const fab = $('#fabAdd');
  if (!fab || !dialog) return;

  dialog.classList.add('dialog--near-fab');
  dialog.style.margin = '0';
  dialog.style.position = 'fixed';
  dialog.style.top = 'auto';
  dialog.style.left = 'auto';
  dialog.style.transform = 'none';

  const fabRect = fab.getBoundingClientRect();
  const gap = FAB_DIALOG_ANCHOR_GAP;
  dialog.style.right = `${Math.round(window.innerWidth - fabRect.left + gap)}px`;
  dialog.style.bottom = `${Math.round(window.innerHeight - fabRect.top + gap)}px`;

  requestAnimationFrame(() => {
    if (!dialog.open) return;
    const rect = dialog.getBoundingClientRect();
    const pad = 12;
    if (rect.top < pad) {
      const bottom = parseFloat(dialog.style.bottom) || 0;
      dialog.style.bottom = `${Math.round(bottom + (pad - rect.top))}px`;
    }
    if (rect.left < pad) {
      const right = parseFloat(dialog.style.right) || 0;
      dialog.style.right = `${Math.round(right + (pad - rect.left))}px`;
    }
  });
}

function openDialogNearFab(dialog) {
  if (!dialog) return false;
  try {
    dialog.showModal();
    positionDialogNearFab(dialog);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function repositionOpenFabAnchoredDialogs() {
  FAB_ANCHORED_DIALOG_IDS.forEach((id) => {
    const dialog = document.getElementById(id);
    if (dialog?.open) positionDialogNearFab(dialog);
  });
}

function openAddDialog() {
  const dialog = $('#addDialog');
  if (!dialog) return;
  postPickerSelected.clear();
  syncPostPickerUI();
  if (!openDialogNearFab(dialog)) showToast('Could not open add dialog');
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
    if (isGridWallBoard()) {
      openPresentGridWall();
      return;
    }
    const blocks = getPresentBlocks();
    if (blocks.length) openPresent(selectedId && blocks.some((b) => b.id === selectedId) ? selectedId : blocks[0].id);
    else showToast('Add a block first');
  });

  $$('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('dialog')?.close());
  });

  $('#bgCustomFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) readBackgroundImageFile(file);
    e.target.value = '';
  });

  $('#bgDialog')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = $('#bgCustomUrl')?.value.trim();
    if (url) {
      setBoardBackground(formatBackgroundImageUrl(url));
      showToast('Background image applied');
    }
    $('#bgDialog').close();
  });

  $$('.type-card[data-type]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.picker-remove')) return;
      togglePostPicker(card.dataset.type);
    });
  });

  $('#postPickerDone')?.addEventListener('click', commitPostPicker);

  $('#hotRoutineList')?.addEventListener('click', (e) => {
    const item = e.target.closest('.hot-routine-item');
    if (!item || e.target.closest('.picker-remove')) return;
    toggleHotPicker(item.dataset.routineId);
  });

  $('#hotPickerDone')?.addEventListener('click', commitHotPicker);

  $$('[data-open-hot]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('#addDialog').close();
      openHotDialog();
    });
  });

  $('#brainBreakRoutineList')?.addEventListener('click', (e) => {
    const item = e.target.closest('.hot-routine-item');
    if (!item || e.target.closest('.picker-remove')) return;
    toggleBrainBreakPicker(item.dataset.activityId);
  });

  $('#brainBreakPickerDone')?.addEventListener('click', commitBrainBreakPicker);

  $$('[data-open-brain-breaks]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('#addDialog').close();
      openBrainBreakDialog();
    });
  });

  $('#addDialog')?.addEventListener('close', () => {
    postPickerSelected.clear();
    syncPostPickerUI();
    clearDialogFabAnchor($('#addDialog'));
  });

  $('#hotDialog')?.addEventListener('close', () => {
    hotPickerSelected.clear();
    syncHotPickerUI();
    clearDialogFabAnchor($('#hotDialog'));
  });

  $('#brainBreakDialog')?.addEventListener('close', () => {
    brainBreakPickerSelected.clear();
    syncBrainBreakPickerUI();
    clearDialogFabAnchor($('#brainBreakDialog'));
  });

  let fabDialogResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(fabDialogResizeTimer);
    fabDialogResizeTimer = setTimeout(repositionOpenFabAnchoredDialogs, 80);
  });
}

function hideAllOverlays() {
  ['#presentOverlay', '#timerFloat', '#blankOverlay', '#outlinePanel', '#timerPopover', '#galleryViewerOverlay'].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.hidden = true;
    el.setAttribute('hidden', '');
  });
}

/** Footer hint — keep in sync with document keydown shortcuts in init(). */
function getKeyboardShortcutsHint() {
  return [
    'Present (P)',
    'Whiteboard (B)',
    'Timer (T)',
    'Outline (O)',
    'Esc',
    '⌘/Ctrl+Z undo',
    'Del delete',
    '← → Space in Present',
  ].join(' · ');
}

function syncKeyboardShortcutsHint() {
  const hint = $('#hint');
  if (hint) hint.textContent = getKeyboardShortcutsHint();
}

function init() {
  hideAllOverlays();
  syncKeyboardShortcutsHint();
  bindToolbar();

  try {
    initBackgroundPicker();
    initTimerUI();
    initBlankUI();
    initOutlineUI();
    initAlignUI();
    initFormatMenu();
    initHotDialog();
    initBrainBreakDialog();
    initTableColumnResize();
    initTemplatesGallery();
    initTemplateConfigDialog();
    initBoardTemplateBar();
    initGalleryViewer();
    initGridWallUI();
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
      if (state.boardTemplate && state.blocks.length) {
        applyTemplateLayout(state.boardTemplate, state.blocks, state.mindMapCenterId);
        resizeCanvasToContent();
        render();
      } else if (state.layoutMode && state.blocks.length) {
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

  document.addEventListener(
    'paste',
    (e) => {
      if (e.defaultPrevented) return;
      if (tryPasteBackgroundImage(e)) return;
      tryPasteImageToSelectedCard(e);
    },
    true
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if ($('#galleryViewerOverlay') && !$('#galleryViewerOverlay').hidden) {
        closeGalleryViewer();
        return;
      }
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
    if (presentOverlay && !presentOverlay.hidden && !isPresentTypingTarget(e.target)) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        presentAdvance();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        presentRetreat();
      }
    }
    if (e.key === 'p' && !e.target.matches('input, [contenteditable], select')) {
      if (isGridWallBoard()) {
        openPresentGridWall();
        return;
      }
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
      deleteBlock(selectedId);
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
