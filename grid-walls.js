/**
 * Task Collaboration Wall & Feedback Reflection Wall — gridded workspace presets.
 */
(function () {
  const DEFAULT_LIST = '<ul><li></li><li></li><li></li></ul>';

  const TASK_TITLES_6 = [
    'Task in your own words',
    'Success criteria',
    'What I\'m unsure about',
    'My plan / steps',
    'Evidence I need',
    'Check before I submit',
  ];

  const TASK_TITLES_8 = [
    ...TASK_TITLES_6,
    'Due dates & checkpoints',
    'Questions for my teacher',
  ];

  const FEEDBACK_DRAFTS_6 = [
    'Common issues in drafts',
    'Fixes to try before resubmit',
    'Strong example from drafts',
    'What\'s still unclear',
    'Your next step',
    'Success criteria reminder',
  ];

  const FEEDBACK_DRAFTS_8 = [
    ...FEEDBACK_DRAFTS_6,
    'Praise — what many did well',
    'Watch for next time',
  ];

  const FEEDBACK_FINAL_6 = [
    'What went well',
    'What to improve',
    'Exemplar',
    'Patterns / stats',
    'Your next action',
    'Remember for next time',
  ];

  const FEEDBACK_FINAL_8 = [
    ...FEEDBACK_FINAL_6,
    'Criteria to revisit',
    'Questions still open',
  ];

  window.PREZ_GRID_WALL = {
    BG: '#141820',
    ROWS: 2,

    create(variant, options = {}) {
      const cols = options.cols === 4 ? 4 : 3;
      const feedbackMode =
        variant === 'feedback-reflection-wall' ? options.feedbackMode || 'drafts' : null;
      const titles = window.PREZ_GRID_WALL.getTitles(variant, cols, feedbackMode);
      const cells = titles.map((title) => ({
        title,
        content: DEFAULT_LIST,
      }));
      return {
        variant,
        rows: 2,
        cols,
        feedbackMode,
        cells,
      };
    },

    getTitles(variant, cols, feedbackMode) {
      const n = cols === 4 ? 8 : 6;
      if (variant === 'task-collaboration-wall') {
        return (cols === 4 ? TASK_TITLES_8 : TASK_TITLES_6).slice(0, n);
      }
      if (feedbackMode === 'final') {
        return (cols === 4 ? FEEDBACK_FINAL_8 : FEEDBACK_FINAL_6).slice(0, n);
      }
      return (cols === 4 ? FEEDBACK_DRAFTS_8 : FEEDBACK_DRAFTS_6).slice(0, n);
    },

    getTemplateMeta(variant) {
      if (variant === 'task-collaboration-wall') {
        return {
          title: 'Task Collaboration Wall',
          description: 'Build task clarity together on one screen — then export for students.',
        };
      }
      return {
        title: 'Feedback Reflection Wall',
        description: 'Whole-class feedback after reviewing drafts or final work — export as PDF.',
      };
    },

    buildPrintDocument(gridWall, boardTitle) {
      const title = boardTitle || window.PREZ_GRID_WALL.getTemplateMeta(gridWall.variant).title;
      const subtitle =
        gridWall.variant === 'feedback-reflection-wall'
          ? gridWall.feedbackMode === 'final'
            ? 'After reviewing final submissions'
            : 'After reviewing drafts'
          : 'Task & plan';
      const cellsHtml = gridWall.cells
        .map(
          (cell) => `
        <section class="print-cell">
          <h2>${escapePrint(cell.title)}</h2>
          <div class="print-body">${cell.content || DEFAULT_LIST}</div>
        </section>`
        )
        .join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapePrint(title)}</title>
  <style>
    @page { size: landscape; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "DM Sans", system-ui, sans-serif;
      margin: 0;
      padding: 16px;
      color: #111;
      background: #fff;
    }
    header { margin-bottom: 16px; border-bottom: 2px solid #333; padding-bottom: 8px; }
    h1 { font-size: 22pt; margin: 0 0 4px; }
    .subtitle { font-size: 12pt; color: #444; margin: 0; }
    .print-grid {
      display: grid;
      grid-template-columns: repeat(${gridWall.cols}, 1fr);
      grid-template-rows: repeat(${gridWall.rows}, 1fr);
      gap: 0;
      border: 2px solid #555;
      min-height: 520px;
    }
    .print-cell {
      border: 1px solid #888;
      padding: 10px 12px;
      min-height: 0;
    }
    .print-cell h2 {
      font-size: 42pt;
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #222;
    }
    .print-body {
      font-size: 18pt;
      line-height: 1.35;
    }
    .print-body ul, .print-body ol {
      margin: 0;
      padding-left: 1.2em;
    }
    .print-body li { margin: 0.2em 0; }
    .print-body p { margin: 0.25em 0; }
  </style>
</head>
<body>
  <header>
    <h1>${escapePrint(title)}</h1>
    <p class="subtitle">${escapePrint(subtitle)} · ${gridWall.rows}×${gridWall.cols} grid</p>
  </header>
  <div class="print-grid">${cellsHtml}</div>
  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;
    },
  };

  function escapePrint(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
