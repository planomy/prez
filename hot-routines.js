/**
 * HOT activity routines — one student-instruction card each (card → HOT activity).
 */
(function () {
  const HOT_ICON_DIR = 'assets/hot/';
  const HOT_ICON_V = '9';

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

  /** 2×2 vocabulary grid: definition, characteristics, examples, non-examples. */
  function buildFrayerTable() {
    const cells = [
      ['Definition', 'What does it mean?'],
      ['Characteristics', 'What is it like? Key features…'],
      ['Examples', 'Examples from our topic…'],
      ['Non-examples', 'What it is not / common mistakes…'],
    ];
    let html =
      '<table class="block-table frayer-table" contenteditable="false"><tbody>';
    html += `<tr><td colspan="2" class="frayer-term" contenteditable="true">${escHtml('Key term')}</td></tr>`;
    for (let row = 0; row < 2; row++) {
      html += '<tr>';
      for (let col = 0; col < 2; col++) {
        const [label, hint] = cells[row * 2 + col];
        html += `<td class="frayer-cell" contenteditable="true"><strong>${escHtml(label)}</strong> — ${escHtml(hint)}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  window.PREZ_HOT_ICON = hotIcon;
  window.PREZ_BUILD_TOURNAMENT_BRACKET = buildTournamentBracketTable;
  window.PREZ_BUILD_DECISION_MATRIX = buildDecisionMatrixTable;
  window.PREZ_BUILD_FRAYER_TABLE = buildFrayerTable;

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
        {
          id: 'qft',
          name: 'Question formulation (QFT)',
          blurb: 'Generate, improve, then prioritise questions to investigate.',
          icon: hotIcon('qft'),
          card: {
            type: 'note',
            title: 'Question formulation (QFT)',
            h: 420,
            w: 380,
            content: note(
              '<p><strong>Produce</strong> — Write as many questions as you can about the topic or source. Prefer <em>How…</em> and <em>Why…</em> questions. Avoid yes/no questions for now.</p>' +
                '<p><strong>Improve</strong> — Choose two questions. Rewrite each so it is clearer, more open, and more interesting.</p>' +
                '<p><strong>Prioritise</strong> — Pick your <strong>top 3</strong> questions to investigate. Be ready to say why they matter.</p>'
            ),
          },
        },
        {
          id: 'socratic-stems',
          name: 'Socratic stems',
          blurb: 'Sentence starters for deeper discussion and seminar talk.',
          icon: hotIcon('socratic-stems'),
          card: {
            type: 'note',
            title: 'Socratic stems',
            h: 440,
            w: 400,
            content: note(
              '<p><em>Use these to respond to a classmate or to push your own thinking.</em></p>' +
                '<p><strong>Clarify</strong> — Can you say more about…? / What do you mean when you say…?</p>' +
                '<p><strong>Reasoning</strong> — What is your evidence for…? / How does that connect to…?</p>' +
                '<p><strong>Viewpoints</strong> — What would someone who disagrees say? / From whose perspective is this?</p>' +
                '<p><strong>Implications</strong> — If that is true, what follows? / So what? Why does this matter?</p>' +
                '<p><strong>Your turn</strong> — Choose one stem and use it in your next comment.</p>'
            ),
          },
        },
      ],
    },
    {
      category: 'Reflection',
      routines: [
        {
          id: 'kwl',
          name: 'KWL',
          blurb: 'What you know, want to know, and learned — before and after a unit or lesson.',
          icon: hotIcon('kwl'),
          card: {
            type: 'note',
            title: 'KWL',
            h: 340,
            w: 360,
            content: note(
              '<p><strong>Know</strong> — What do I already know about this topic?</p>' +
                '<p><strong>Want</strong> — What do I want to find out? What am I curious about?</p>' +
                '<p><strong>Learned</strong> — What did I learn today? (complete after the lesson)</p>'
            ),
          },
        },
        {
          id: 'rose-thorn-bud',
          name: 'Rose · Thorn · Bud',
          blurb: 'Reflect on success, difficulty, and what is emerging next.',
          icon: hotIcon('rose-thorn-bud'),
          card: {
            type: 'note',
            title: 'Rose · Thorn · Bud',
            h: 360,
            w: 360,
            content: note(
              '<p><strong>Rose</strong> — What went well? What are you proud of?</p>' +
                '<p><strong>Thorn</strong> — What was difficult, frustrating, or challenging?</p>' +
                '<p><strong>Bud</strong> — What is starting to grow? What are you looking forward to trying?</p>'
            ),
          },
        },
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
          id: 'soapstone',
          name: 'SOAPSTone',
          blurb: 'Analyse a text or source: speaker, occasion, audience, purpose, subject, tone.',
          icon: hotIcon('soapstone'),
          card: {
            type: 'note',
            title: 'SOAPSTone',
            h: 440,
            w: 400,
            content: note(
              '<p><em>Use the source on the previous card (or projected text).</em></p>' +
                '<p><strong>Speaker</strong> — Who is the voice behind this? What do we know about them?</p>' +
                '<p><strong>Occasion</strong> — When and where was this created? What was happening?</p>' +
                '<p><strong>Audience</strong> — Who is this for? Who was meant to see or hear it?</p>' +
                '<p><strong>Purpose</strong> — Why was this created? What is the creator trying to achieve?</p>' +
                '<p><strong>Subject</strong> — What is it about? What is the main topic or message?</p>' +
                '<p><strong>Tone</strong> — What is the attitude or mood? How does it make you feel?</p>'
            ),
          },
        },
        {
          id: 'frayer-model',
          name: 'Frayer model',
          blurb: 'Define a key term: definition, features, examples, and non-examples.',
          icon: hotIcon('frayer-model'),
          card: {
            type: 'table',
            title: 'Frayer model',
            w: 520,
            h: 480,
            content: note(
              '<p>Replace <strong>Key term</strong>, then fill each quadrant. Use precise vocabulary.</p>'
            ),
            tableHtml: buildFrayerTable(),
          },
        },
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
