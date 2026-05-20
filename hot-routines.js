/**
 * HOT activity routines — one student-instruction card each (Post → HOT activity).
 */
(function () {
  const HOT_ICON_DIR = 'assets/hot/';
  const HOT_ICON_V = '7';

  function hotIcon(id) {
    return `${HOT_ICON_DIR}${id}.png?v=${HOT_ICON_V}`;
  }

  function note(html) {
    return html.startsWith('<') ? html : `<p>${html}</p>`;
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Knockout bracket: N options → N/2 → … → 1 winner (N must be a power of 2). */
  function buildTournamentBracketTable(leaves) {
    const n = leaves === 8 ? 8 : 16;
    const rounds = [];
    for (let size = n; size >= 1; size = Math.floor(size / 2)) rounds.push(size);

    const headers = rounds.map((count, i) => {
      if (i === 0) return `Options (${count})`;
      if (count === 1) return 'Winner';
      if (count === 2) return 'Final';
      if (count === 4) return 'Semi-finals';
      return `Top ${count}`;
    });

    let html =
      '<table class="block-table bracket-table" contenteditable="false"><thead><tr>';
    headers.forEach((h) => {
      html += `<th>${escHtml(h)}</th>`;
    });
    html += '</tr></thead><tbody>';

    for (let row = 0; row < n; row++) {
      html += '<tr>';
      for (let col = 0; col < rounds.length; col++) {
        const span = n / rounds[col];
        if (row % span !== 0) continue;
        const label = col === 0 ? `Option ${row + 1}` : '—';
        html += `<td rowspan="${span}" contenteditable="true">${escHtml(label)}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  /** Options × criteria grid with totals, final decision, and justification. */
  function buildDecisionMatrixTable(optionCount, criteriaCount) {
    const options = optionCount === 3 ? 3 : 4;
    const criteria = criteriaCount === 3 ? 3 : 4;
    const cols = criteria + 2;

    let html =
      '<table class="block-table matrix-table" contenteditable="false"><thead><tr>';
    html += '<th class="matrix-corner"></th>';
    for (let c = 1; c <= criteria; c++) {
      html += `<th contenteditable="true">${escHtml(`Criterion ${c}`)}</th>`;
    }
    html += '<th class="matrix-total-col">Total</th></tr></thead><tbody>';

    for (let o = 1; o <= options; o++) {
      html += '<tr>';
      html += `<td class="matrix-option" contenteditable="true">${escHtml(`Option ${o}`)}</td>`;
      for (let c = 0; c < criteria; c++) {
        const hint = o === 1 && c === 0 ? '1–5' : '—';
        html += `<td class="matrix-score" contenteditable="true">${escHtml(hint)}</td>`;
      }
      html += '<td class="matrix-total" contenteditable="true">—</td></tr>';
    }

    const justify =
      'Based on the matrix, ________ is the best option because it scored highly in ________ and ________, although it was weaker in ________.';

    html += `<tr class="matrix-footer matrix-footer--decision"><td colspan="${cols}">`;
    html += '<strong>Final decision:</strong> ';
    html += '<span class="matrix-footer-field" contenteditable="true">—</span></td></tr>';
    html += `<tr class="matrix-footer matrix-footer--justify"><td colspan="${cols}">`;
    html += '<strong>Justification:</strong> ';
    html += `<span class="matrix-footer-field" contenteditable="true">${escHtml(justify)}</span>`;
    html += '</td></tr></tbody></table>';
    return html;
  }

  window.PREZ_HOT_ICON = hotIcon;
  window.PREZ_BUILD_TOURNAMENT_BRACKET = buildTournamentBracketTable;
  window.PREZ_BUILD_DECISION_MATRIX = buildDecisionMatrixTable;

  window.PREZ_HOT_ROUTINES = [
    {
      category: 'Discussion',
      routines: [
        {
          id: 'think-pair-share',
          name: 'Think–Pair–Share',
          blurb: 'Silent think, partner talk, then share with the class.',
          icon: hotIcon('think-pair-share'),
          card: {
            type: 'note',
            title: 'Think–Pair–Share',
            h: 360,
            w: 360,
            content: note(
              '<p><strong>Think</strong> (2–3 min) — Think silently. No talking yet.</p><p><em>What is your first reaction? What evidence stands out?</em></p>' +
                '<p><strong>Pair</strong> (3–4 min) — Turn to your partner. Partner A shares first, then Partner B. Listen and ask one follow-up.</p>' +
                '<p><strong>Share</strong> — Pairs report one idea to the class.</p><p><em>One thing we discussed was… / We were surprised by…</em></p>'
            ),
          },
        },
        {
          id: 'connect-extend-challenge',
          name: 'Connect–Extend–Challenge',
          blurb: 'Link new learning to prior knowledge, push further, then question.',
          icon: hotIcon('connect-extend-challenge'),
          card: {
            type: 'note',
            title: 'Connect–Extend–Challenge',
            h: 340,
            w: 360,
            content: note(
              '<p><strong>Connect</strong> — This connects to something I already know because…</p>' +
                '<p><strong>Extend</strong> — This idea extends my thinking by…</p>' +
                '<p><strong>Challenge</strong> — I am still challenged by… / What evidence would change my mind?</p>'
            ),
          },
        },
        {
          id: 'plus-minus-interesting',
          name: 'Plus · Minus · Interesting',
          blurb: 'Weigh positives, negatives, and surprising ideas about a topic or source.',
          icon: hotIcon('plus-minus-interesting'),
          card: {
            type: 'note',
            title: 'Plus · Minus · Interesting',
            h: 360,
            w: 360,
            content: note(
              '<p><strong>Plus</strong> — What are the good points? What works well? What do you agree with?</p>' +
                '<p><strong>Minus</strong> — What are the weaknesses, risks, or problems? What concerns you?</p>' +
                '<p><strong>Interesting</strong> — What surprises you? What questions does it raise? What would you want to find out?</p>'
            ),
          },
        },
      ],
    },
    {
      category: 'Reflection',
      routines: [
        {
          id: 'used-to-think-now-think',
          name: 'I used to think… Now I think…',
          blurb: 'Show how thinking changed after the lesson or source.',
          icon: hotIcon('used-to-think-now-think'),
          card: {
            type: 'note',
            title: 'I used to think… Now I think…',
            h: 300,
            w: 360,
            content: note(
              '<p><strong>I used to think…</strong> because… (before the lesson or source)</p>' +
                '<p><strong>Now I think…</strong> because… (new evidence, explanation, or discussion)</p>'
            ),
          },
        },
        {
          id: 'three-two-one',
          name: '3–2–1',
          blurb: 'Quick reflection: three facts, two questions, one main idea.',
          icon: hotIcon('three-two-one'),
          card: {
            type: 'note',
            title: '3–2–1',
            h: 340,
            w: 360,
            content: note(
              '<p><strong>3</strong> things I learned or found important…</p>' +
                '<p><strong>2</strong> questions I still have…</p>' +
                '<p><strong>1</strong> main idea I want to remember…</p>'
            ),
          },
        },
        {
          id: 'exit-ticket',
          name: 'Exit ticket',
          blurb: 'One-minute check before students leave.',
          icon: hotIcon('exit-ticket'),
          card: {
            type: 'note',
            title: 'Exit ticket',
            h: 280,
            w: 340,
            content: note(
              '<p>Before you go, complete <strong>one</strong> of the following:</p><ul><li>One thing I learned today…</li><li>One question I still have…</li><li>Today I discovered…</li></ul>'
            ),
          },
        },
      ],
    },
    {
      category: 'Analysis',
      routines: [
        {
          id: 'see-think-wonder',
          name: 'See · Think · Wonder',
          blurb: 'Observe a source, interpret it, then ask questions.',
          icon: hotIcon('see-think-wonder'),
          card: {
            type: 'note',
            title: 'See · Think · Wonder',
            h: 360,
            w: 360,
            content: note(
              '<p><em>Use the source on the previous card (or projected image).</em></p>' +
                '<p><strong>See</strong> — What do you notice? Facts only — no interpretation yet.</p>' +
                '<p><strong>Think</strong> — What does it mean? Why might it be this way?</p>' +
                '<p><strong>Wonder</strong> — What questions does this raise? What would you need to find out?</p>'
            ),
          },
        },
        {
          id: 'claim-evidence-reasoning',
          name: 'Claim · Evidence · Reasoning',
          blurb: 'State a claim, support with evidence, explain the link (CER).',
          icon: hotIcon('claim-evidence-reasoning'),
          card: {
            type: 'note',
            title: 'Claim · Evidence · Reasoning',
            h: 380,
            w: 380,
            content: note(
              '<p><strong>Question:</strong> What are we trying to explain?</p>' +
                '<p><strong>Claim:</strong> One clear sentence — what you believe is true.</p>' +
                '<p><strong>Evidence:</strong> Data, quotes, or observations that support the claim.</p>' +
                '<p><strong>Reasoning:</strong> Because… — why does the evidence prove your claim?</p>' +
                '<p><strong>Alternative:</strong> What might someone disagree with? How would you respond?</p>'
            ),
          },
        },
        {
          id: 'evaluate-defend',
          name: 'Evaluate & defend',
          blurb: 'Weigh both sides, then justify a judgment.',
          icon: hotIcon('evaluate-defend'),
          card: {
            type: 'note',
            title: 'Evaluate & defend',
            h: 380,
            w: 380,
            content: note(
              '<p><strong>Statement to evaluate:</strong> (write the statement here)</p>' +
                '<p><strong>Evidence for:</strong> Reasons and examples that support the statement.</p>' +
                '<p><strong>Evidence against:</strong> Counterpoints and limitations.</p>' +
                '<p><strong>Your judgment:</strong> To what extent do you agree? Use evidence from both sides.</p>'
            ),
          },
        },
      ],
    },
    {
      category: 'Prioritisation',
      routines: [
        {
          id: 'tournament-prioritiser',
          name: 'Tournament prioritiser',
          blurb:
            'Knockout bracket: in each pair, decide which option advances until one winner remains.',
          icon: hotIcon('tournament-prioritiser'),
          card: {
            type: 'table',
            title: 'Tournament prioritiser',
            w: 920,
            h: 700,
            content: note(
              '<p>Compare options in <strong>pairs</strong>. In each match, choose which option advances to the next round.</p>' +
                '<p><em>Why does this option rank higher? Use one sentence of evidence.</em></p>' +
                '<p>In the final, name your <strong>top priority</strong> and one option you ruled out.</p>'
            ),
            tableHtml: buildTournamentBracketTable(16),
          },
        },
        {
          id: 'decision-making-matrix',
          name: 'Decision-making matrix',
          blurb:
            'Compare options against criteria, score each cell, total rows, then justify the best choice.',
          icon: hotIcon('decision-making-matrix'),
          card: {
            type: 'table',
            title: 'Decision-making matrix',
            w: 720,
            h: 580,
            content: note(
              '<p>Rename the <strong>options</strong> and <strong>criteria</strong>, then score each cell (<strong>1–5</strong>; 5 = strongest).</p>' +
                '<p>Total each row. Your <strong>final decision</strong> is usually the highest total.</p>' +
                '<p>Complete the <strong>justification</strong> using your scores — strengths and one weakness.</p>'
            ),
            tableHtml: buildDecisionMatrixTable(4, 4),
          },
        },
      ],
    },
  ];
})();
