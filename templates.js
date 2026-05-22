/**
 * Prez board templates — block specs applied on top of app.js defaults.
 */
(function () {
  const BG_ACADEMIC = 'linear-gradient(160deg, #1e3a5f 0%, #2563eb 40%, #93c5fd 100%)';
  const BG_PAPER = 'linear-gradient(180deg, #f7f5f0 0%, #e8e4dc 100%)';
  /** Same as app.js DEFAULTS.background (civics) — home / new board look */
  const BG_HOME = 'linear-gradient(160deg, #234e70 0%, #fb8500 55%, #ffb703 100%)';
  const BG_TWILIGHT = 'linear-gradient(180deg, #312e81 0%, #be185d 50%, #f97316 100%)';
  const BG_FOREST = 'linear-gradient(135deg, #134e4a 0%, #065f46 50%, #047857 100%)';
  const BG_STEM_MATH = 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 42%, #7dd3fc 100%)';
  const BG_STEM_SCI = 'linear-gradient(160deg, #14532d 0%, #15803d 38%, #bbf7d0 100%)';
  const BG_GALLERY = 'linear-gradient(180deg, #12151c 0%, #1a2332 100%)';

  const INVESTIGATION_RESULTS_TABLE = `<table class="block-table">
    <thead><tr><th contenteditable="true">Trial</th><th contenteditable="true">Result (with units)</th></tr></thead>
    <tbody>
      <tr><td contenteditable="true">1</td><td contenteditable="true">—</td></tr>
      <tr><td contenteditable="true">2</td><td contenteditable="true">—</td></tr>
      <tr><td contenteditable="true">3</td><td contenteditable="true">—</td></tr>
      <tr><td contenteditable="true">Average</td><td contenteditable="true">—</td></tr>
    </tbody>
  </table>`;

  const PSMT_WORKING_TABLE = `<table class="block-table">
    <thead><tr><th contenteditable="true">Step</th><th contenteditable="true">Working (show calculations)</th></tr></thead>
    <tbody>
      <tr><td contenteditable="true">1</td><td contenteditable="true">—</td></tr>
      <tr><td contenteditable="true">2</td><td contenteditable="true">—</td></tr>
      <tr><td contenteditable="true">3</td><td contenteditable="true">—</td></tr>
    </tbody>
  </table>`;

  /** Blank zone teachers fill when modelling writing on the board. */
  function modelZone(label) {
    return `<p><strong>${label}</strong></p><p><br></p>`;
  }

  function templateImage(key) {
    return window.PREZ_TEMPLATE_IMAGES?.[key] || '';
  }

  function list(items) {
    return `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  }

  function note(html) {
    return html.startsWith('<') ? html : `<p>${html}</p>`;
  }

  function buildGalleryWalkSpecs(cellCount) {
    const n = Math.min(10, Math.max(2, cellCount || 6));
    const specs = [];
    for (let i = 0; i < n; i++) {
      specs.push({
        type: 'image',
        accent: ['ocean', 'teal', 'mint', 'gold', 'violet', 'coral'][i % 6],
        galleryStation: true,
        galleryIndex: i,
        title: `Station ${i + 1}`,
        content: '',
        w: 400,
        h: 320,
      });
    }
    return specs;
  }

  function buildMindMapSpecs(branchCount) {
    const n = Math.min(8, Math.max(3, branchCount || 6));
    const specs = [
      {
        type: 'heading',
        accent: 'ocean',
        mindMapCenter: true,
        title: 'CENTRAL TOPIC',
        content: '<p style="text-align:center">Replace with your topic or question</p>',
        w: 480,
        h: 220,
      },
    ];
    for (let i = 0; i < n; i++) {
      specs.push({
        type: 'note',
        accent: 'gold',
        branchIndex: i,
        title: `Idea ${i + 1}`,
        content: note(i === 0 ? 'First branch — add your thought here' : `Idea ${i + 1}`),
        w: 340,
        h: 215,
      });
    }
    return specs;
  }

  window.PREZ_TEMPLATE_BUILDERS = {
    'gallery-walk': (opts) => ({
      board: {
        title: 'Gallery walk',
        background: BG_GALLERY,
        layoutMode: null,
        galleryWalk: true,
      },
      blockSpecs: buildGalleryWalkSpecs(opts?.cellCount),
    }),
    'mind-map': (opts) => ({
      board: {
        title: 'Mind map',
        background: BG_HOME,
        layoutMode: null,
        mindMap: true,
      },
      blockSpecs: buildMindMapSpecs(opts?.branchCount),
    }),
  };

  /** Coloured sentence row for source-analysis model paragraphs (board + Present). */
  function saStrip(color, label, text) {
    return `<p class="sa-strip sa-strip--${color}"><strong>${label}</strong> ${text}</p>`;
  }

  const IOPCAM_OVERVIEW_TABLE = `<table class="block-table">
    <thead><tr><th>Letter</th><th>Meaning</th><th>Simple question</th></tr></thead>
    <tbody>
      <tr><td><strong>I</strong></td><td>Information</td><td>What does the source show, say or reveal?</td></tr>
      <tr><td><strong>O</strong></td><td>Origin</td><td>Who made it? What type of source is it?</td></tr>
      <tr><td><strong>P</strong></td><td>Purpose / Perspective</td><td>Why was it made? Whose view does it show?</td></tr>
      <tr><td><strong>C</strong></td><td>Context</td><td>What was happening at the time?</td></tr>
      <tr><td><strong>A</strong></td><td>Audience</td><td>Who was it created for?</td></tr>
      <tr><td><strong>M</strong></td><td>Message</td><td>What idea is it trying to communicate?</td></tr>
      <tr><td><strong>+</strong></td><td>Usefulness / Reliability / Limitations</td><td>How valuable is it? What are its problems?</td></tr>
    </tbody>
  </table>`;

  const IOPCAM_MODEL_TABLE = `<table class="block-table">
    <thead><tr><th>IOPCAM+</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Information</td><td contenteditable="true">—</td></tr>
      <tr><td>Origin</td><td contenteditable="true">—</td></tr>
      <tr><td>Purpose / Perspective</td><td contenteditable="true">—</td></tr>
      <tr><td>Context</td><td contenteditable="true">—</td></tr>
      <tr><td>Audience</td><td contenteditable="true">—</td></tr>
      <tr><td>Message</td><td contenteditable="true">—</td></tr>
      <tr><td>Usefulness / Reliability / Limitations</td><td contenteditable="true">—</td></tr>
    </tbody>
  </table>`;

  const COLOUR_LEGEND_TABLE = `<table class="block-table sa-legend-table">
    <thead><tr><th>Colour</th><th>Sentence job</th></tr></thead>
    <tbody>
      <tr class="sa-strip--blue"><td><strong>Blue</strong></td><td>Claim — what the source reveals</td></tr>
      <tr class="sa-strip--green"><td><strong>Green</strong></td><td>Origin/context — where it comes from and why that matters</td></tr>
      <tr class="sa-strip--yellow"><td><strong>Yellow</strong></td><td>Evidence — specific detail from the source</td></tr>
      <tr class="sa-strip--orange"><td><strong>Orange</strong></td><td>Explanation — what that detail suggests</td></tr>
      <tr class="sa-strip--pink"><td><strong>Pink</strong></td><td>Purpose/perspective/audience</td></tr>
      <tr class="sa-strip--purple"><td><strong>Purple</strong></td><td>Evaluation — usefulness, reliability or limitation</td></tr>
    </tbody>
  </table>`;

  window.PREZ_TEMPLATES = [
    {
      id: 'lesson-plan',
      name: 'Full lesson plan',
      description:
        'Title, learning goals, hook, teaching, activities, differentiation, plenary, homework, and reflection — in lesson order for Present.',
      tag: 'Featured',
      category: 'Planning',
      board: {
        title: 'Lesson plan',
        background: BG_ACADEMIC,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'ocean',
          title: 'Lesson title',
          content:
            '<p><strong>Unit / lesson name</strong> — e.g. Year 8: Causes of World War I</p><p>Class · Date · Period</p>',
          h: 168,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Learning goals',
          content: list([
            'Students will be able to…',
            'Students will understand…',
            'Students will explain…',
          ]),
          h: 240,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Success criteria',
          content: list([
            'I can…',
            'I can…',
            'I can…',
          ]),
          h: 220,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Hook / starter',
          content: note(
            '3–5 min engagement: a question, image, short clip, or surprising fact to draw students in.'
          ),
          h: 200,
        },
        {
          type: 'list',
          accent: 'violet',
          title: 'Prior knowledge',
          content: list([
            'What do we already know about…?',
            'Key terms students should recall',
            'Misconceptions to address',
          ]),
          h: 220,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Key vocabulary',
          content: list([
            '<strong>Term</strong> — definition',
            '<strong>Term</strong> — definition',
            '<strong>Term</strong> — definition',
          ]),
          h: 220,
        },
        {
          type: 'list',
          accent: 'slate',
          title: 'Resources & materials',
          content: list([
            'Textbook / handout (page …)',
            'Slides or link',
            'Equipment needed',
          ]),
          h: 200,
        },
        {
          type: 'heading',
          accent: 'ocean',
          title: 'Introduction',
          content: '<p>How you set up the lesson — context, model, or brief explanation.</p>',
          h: 152,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'Main teaching',
          content: note(
            'Key explanation, demonstration, or worked example. What you say and show before students practise.'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'rose',
          title: 'Student activity',
          content: note(
            'What students do: individual, pairs, or groups. Include timing, steps, and what “done” looks like.'
          ),
          h: 240,
        },
        {
          type: 'note',
          accent: 'violet-p',
          title: 'Differentiation',
          content: note(
            '<strong>Support:</strong> scaffolds, sentence starters, extra time…<br><strong>Extend:</strong> challenge question, deeper source, leadership role…'
          ),
          h: 200,
        },
        {
          type: 'list',
          accent: 'gold-p',
          title: 'Check for understanding',
          content: list([
            'Quick question 1',
            'Quick question 2',
            'Thumbs / mini-whiteboard check',
          ]),
          h: 200,
        },
        {
          type: 'note',
          accent: 'mint-p',
          title: 'Plenary / exit ticket',
          content: note(
            'Before you leave: one thing you learned, one question you still have, or complete this sentence…'
          ),
          h: 180,
        },
        {
          type: 'note',
          accent: 'slate-p',
          title: 'Homework / next lesson',
          content: note('Optional follow-up task or preview of next lesson.'),
          h: 160,
        },
        {
          type: 'timer',
          accent: 'teal',
          title: 'Lesson timing',
          timerSec: 300,
          h: 200,
        },
        {
          type: 'note',
          accent: 'rose-p',
          title: 'Teacher reflection',
          content: note('After the lesson: what worked, what to change, notes for next time.'),
          h: 180,
        },
      ],
    },
    {
      id: 'mini-lesson-plan',
      name: 'Mini lesson plan',
      description:
        '7 cards in lesson order: title, learning goal, do now, hook, key teaching, student task, and check/review — a fast plan for one lesson.',
      tag: 'Featured',
      category: 'Planning',
      board: {
        title: 'Mini lesson plan',
        background: BG_ACADEMIC,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'ocean',
          title: 'Lesson title',
          content:
            '<p><strong>Unit / topic</strong> — e.g. Year 8: Causes of World War I</p><p><strong>Class</strong> · <strong>Date / period</strong></p>',
          h: 168,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Learning goal',
          content: list([
            'Today we are learning to…',
            'By the end, you should understand…',
          ]),
          h: 200,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Do now / starter',
          content: note(
            '<p>Short <strong>3–5 minute</strong> task students begin immediately:</p><ul><li>Question</li><li>Retrieval task</li><li>Quick write</li><li>Image prompt</li><li>Recap from last lesson</li></ul>'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'teal',
          title: 'Hook / question',
          content: note(
            'The thing that gets them interested: a <strong>big question</strong>, image, scenario, quote, problem, or mystery.'
          ),
          h: 200,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Key teaching',
          content: note(
            'The main explanation: one model, example, worked paragraph, diagram, demonstration, or source.'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'rose',
          title: 'Student task',
          content: note(
            'What students actually do. Include <strong>time limit</strong>, <strong>mode</strong> (individual / pairs / groups), and the <strong>finished product</strong>.'
          ),
          h: 220,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Check / review',
          content: list([
            'Quick question',
            'Mini-whiteboard response',
            'One-sentence answer',
            'Thumbs check',
            'Quick quiz',
            '“Show me you get it”',
          ]),
          h: 240,
        },
      ],
    },
    {
      id: 'narrative-writing',
      name: 'Narrative writing lesson',
      description:
        '17 cards in lesson order: goals, hook, seven-part structure, model, sentence starters, planning, writing task, peer check, exit ticket, and homework.',
      tag: 'Featured',
      category: 'English · Writing',
      board: {
        title: 'Narrative Writing: Build One Powerful Scene',
        background: BG_PAPER,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'ocean',
          title: 'Narrative Writing: Build One Powerful Scene',
          content:
            '<p><strong>Unit / lesson name:</strong> Writing a short, controlled narrative scene</p><p><strong>Focus:</strong> One character. One place. One problem. A short timeframe.</p>',
          h: 200,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Learning goals',
          content: list([
            'Create a clear narrative orientation',
            'Use <strong>WHO</strong>, <strong>WHERE</strong> and <strong>WHAT</strong> to establish the scene',
            'Build tension before introducing the main problem',
            'Write a short resolution that feels controlled',
            'Vary sentence starts to avoid repetitive noun starts',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Success criteria',
          content: list([
            'I can introduce one main character clearly',
            'I can place the character in one interesting setting',
            'I can show what the character is doing',
            'I can build tension before the problem appears',
            'I can use at least three interesting sentence starts',
            'I can avoid overusing <em>The, It, A, He, She, They, This, Then</em>',
            'I can write a complete seven-part narrative plan',
          ]),
          h: 320,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Hook / starter',
          content: note(
            '<p><strong>Fast write — 2 minutes</strong></p><p>Complete this sentence:</p><p><em>By the time the door opened, ________.</em></p><p><strong>Rules:</strong></p><ul><li>Keep writing until time is up</li><li>Do not worry about spelling yet</li><li>Focus on creating a problem or mystery</li><li>No talking</li></ul>'
          ),
          h: 280,
        },
        {
          type: 'list',
          accent: 'violet',
          title: 'Prior knowledge',
          content: list([
            'What does a reader need to know at the beginning?',
            'Why does a story need a problem?',
            'What makes a problem worse?',
            'Why should a short story stay focused?',
            'What happens when a story has too many characters or too many events?',
            '<strong>Key reminder:</strong> A good short story is not a whole movie. It is one powerful moment.',
          ]),
          h: 300,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Key vocabulary',
          content: list([
            '<strong>Orientation</strong> — the beginning that shows who, where and what',
            '<strong>Tension</strong> — the feeling that something might go wrong',
            '<strong>Complication</strong> — the main problem',
            '<strong>Climax</strong> — the most intense point of the problem',
            '<strong>Resolution</strong> — how the moment ends',
            '<strong>Atmosphere</strong> — what is happening around the character',
            '<strong>Story detail</strong> — background information that makes the moment matter',
            '<strong>Interesting start</strong> — a sentence that does not begin with a basic noun/pronoun',
          ]),
          h: 340,
        },
        {
          type: 'list',
          accent: 'slate',
          title: 'Narrative structure',
          content: list([
            '<strong>WHO</strong> — introduce the main character',
            '<strong>WHERE</strong> — describe the setting',
            '<strong>WHAT</strong> — show what the character is doing',
            '<strong>TENSION</strong> — make the reader feel something is wrong',
            '<strong>COMPLICATION</strong> — reveal the problem',
            '<strong>CLIMAX</strong> — maximum intensity',
            '<strong>RESOLUTION</strong> — end the moment clearly',
            '<em>Teacher line: If your story gets messy, come back to these seven boxes.</em>',
          ]),
          h: 320,
        },
        {
          type: 'note',
          accent: 'rose',
          title: 'Bad example / quick fix',
          content: note(
            '<p><strong>Weak opening:</strong></p><p><em>Jack was at school. He was walking down the hallway. He saw something weird. It was scary.</em></p><p><strong>Ask:</strong></p><ul><li>Who is Jack?</li><li>Where exactly is he?</li><li>What is he doing?</li><li>What makes the moment interesting?</li><li>Which sentence starts are repetitive?</li><li>Which verbs are weak?</li></ul><p><strong>Teaching point:</strong> Basic stories often say what happened. Better stories make the reader stand inside the moment.</p>'
          ),
          h: 360,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'Model orientation',
          content: note(
            '<p><strong>Prompt:</strong> A student is alone in the library after school when the lights begin flickering.</p><p><strong>Model structure</strong> (not necessarily full prose):</p><ul><li><strong>WHO:</strong> one character, realistic age, clear reason for being there</li><li><strong>WHERE:</strong> library, late afternoon, quiet shelves, locked glass doors</li><li><strong>WHAT:</strong> searching for a missing assignment, packing up, checking phone</li><li><strong>TENSION:</strong> lights flicker, printer starts by itself, footsteps upstairs</li><li><strong>COMPLICATION:</strong> the exit doors will not open</li><li><strong>CLIMAX:</strong> the chase is on</li><li><strong>RESOLUTION:</strong> character finds a way out / calls for help / discovers the cause</li></ul>'
          ),
          h: 380,
        },
        {
          type: 'list',
          accent: 'gold-p',
          title: 'Sentence starter bank',
          content: list([
            'After the final bell, …',
            'Inside the empty library, …',
            'With one hand on the shelf, …',
            'Although the corridor seemed empty, …',
            'Behind the front desk, …',
            'Carefully, …',
            'Before anyone could answer, …',
            'Beyond the glass doors, …',
            'As the lights flickered, …',
            'Within moments, …',
            'Without warning, …',
            'Holding his breath, …',
            'Near the back shelves, …',
            'Instead of leaving, …',
            'By the time he reached the door, …',
            '<em>Students must use at least three.</em>',
          ]),
          h: 380,
        },
        {
          type: 'note',
          accent: 'violet-p',
          title: 'Student activity: seven-box plan',
          content: note(
            '<p><strong>WHO</strong> — Main character:</p><p>_________________________</p><p><strong>WHERE</strong> — Specific setting:</p><p>_________________________</p><p><strong>WHAT</strong> — What are they doing?</p><p>_________________________</p><p><strong>TENSION</strong> — What feels wrong?</p><p>_________________________</p><p><strong>COMPLICATION</strong> — What problem appears?</p><p>_________________________</p><p><strong>CLIMAX</strong> — What is the most intense part?</p><p>_________________________</p><p><strong>RESOLUTION</strong> — How does the scene end?</p><p>_________________________</p><p><em>Rule: Keep the whole story inside one short scene.</em></p>'
          ),
          h: 420,
        },
        {
          type: 'note',
          accent: 'mint-p',
          title: 'Writing task',
          content: note(
            '<p>Write a short narrative scene using your seven-box plan.</p><p><strong>Requirements:</strong></p><ul><li>250–350 words</li><li>One main character</li><li>One setting</li><li>One main problem</li><li>Short timeframe</li><li>At least three interesting sentence starts</li><li>Avoid repeated noun starts</li><li>Include tension before the complication</li></ul>'
          ),
          h: 300,
        },
        {
          type: 'list',
          accent: 'teal-p',
          title: 'Check for understanding',
          content: list([
            'Who is your main character?',
            'Where is the scene set?',
            'What is the character doing?',
            'What is the first sign something is wrong?',
            'What is the actual problem?',
            'How will the scene end?',
            '<em>If they cannot answer these, they are not ready to write.</em>',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'rose-p',
          title: 'Differentiation',
          content: note(
            '<p><strong>Support</strong> — use this frame:</p><p><em>After ________, ________ was ________ in ________.<br>Inside ________, ________.<br>With ________, ________.<br>Suddenly, ________.<br>Before ________, ________.<br>In the end, ________.</em></p><p><strong>Extend</strong> — add:</p><ul><li>One atmosphere sentence</li><li>One thinking sentence</li><li>One feeling sentence</li><li>One story detail about the character’s past</li><li>One sentence beginning with an <em>-ing</em> verb</li></ul>'
          ),
          h: 340,
        },
        {
          type: 'list',
          accent: 'ocean',
          title: 'Peer check',
          content: list([
            'Can I identify WHO?',
            'Can I identify WHERE?',
            'Can I identify WHAT?',
            'Is there tension before the problem?',
            'Does the problem make sense?',
            'Does the ending finish the moment?',
            'Are there at least three interesting sentence starts?',
            'Are there repeated basic starts?',
          ]),
          h: 300,
        },
        {
          type: 'note',
          accent: 'slate-p',
          title: 'Exit ticket / reflection',
          content: note(
            '<p>Complete these:</p><ul><li><strong>The strongest sentence I wrote today was:</strong> _______________</li><li><strong>One sentence I need to improve is:</strong> _______________</li><li><strong>One thing I did better than last time was:</strong> _______________</li><li><strong>Next time, I need to focus on:</strong> _______________</li></ul>'
          ),
          h: 260,
        },
        {
          type: 'list',
          accent: 'gold',
          title: 'Homework / next lesson',
          content: list([
            '<strong>Option 1:</strong> Rewrite your opening 80 words with better sentence starts.',
            '<strong>Option 2:</strong> Add more tension before the complication.',
            '<strong>Option 3:</strong> Replace five weak verbs with stronger verbs.',
            '<strong>Option 4:</strong> Remove unnecessary stop words and tighten your writing.',
          ]),
          h: 260,
        },
      ],
    },
    {
      id: 'persuasive-writing',
      name: 'Persuasive writing lesson',
      description:
        '21 cards in lesson order: contention, PEEL paragraphs, language bank, argument planner, writing task, peer check, and homework.',
      tag: 'Featured',
      category: 'English · Writing',
      board: {
        title: 'Persuasive Writing: Build a Strong Argument',
        background: BG_ACADEMIC,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'ocean',
          title: 'Persuasive Writing: Build a Strong Argument',
          content:
            '<p><strong>Unit / lesson name:</strong> Writing a persuasive response with clear reasons and evidence</p><p><strong>Focus:</strong> One opinion. Three reasons. Strong examples. Clear call to action.</p>',
          h: 200,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Learning goals',
          content: list([
            'State a clear opinion',
            'Give three strong reasons',
            'Support each reason with examples',
            'Explain why each reason matters',
            'Use persuasive language to influence the reader',
            'Write with varied sentence starts',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Success criteria',
          content: list([
            'I can clearly state my opinion',
            'I can give three different reasons',
            'I can support each reason with an example',
            'I can explain why the reader should care',
            'I can use persuasive language deliberately',
            'I can avoid weak starts such as <em>The, It, This, I think, Firstly, Secondly, Finally</em>',
            'I can write a strong conclusion that leaves the reader with something to remember',
          ]),
          h: 320,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Hook / starter',
          content: note(
            '<p><strong>Quick opinion — 2 minutes</strong></p><p><strong>Statement:</strong></p><blockquote>Every year level should have at least one school camp.</blockquote><p>Students write:</p><ul><li>Agree or disagree</li><li>One reason</li><li>One example</li><li>One sentence explaining why it matters</li></ul><p><em>Teacher line: A persuasive piece is not just an opinion. It is an opinion with muscle.</em></p>'
          ),
          h: 320,
        },
        {
          type: 'list',
          accent: 'violet',
          title: 'Prior knowledge',
          content: list([
            'What makes someone change their mind?',
            'Is an opinion enough?',
            'Why do examples matter?',
            'What is the difference between a reason and evidence?',
            'Why do weak sentence starts make writing sound basic?',
            '<strong>Key reminder:</strong> Persuasive writing is not about being loud. It is about being convincing.',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Key vocabulary',
          content: list([
            '<strong>Contention</strong> — your main opinion',
            '<strong>Reason</strong> — why your opinion is correct',
            '<strong>Evidence</strong> — examples, facts, scenarios or expert ideas that support your reason',
            '<strong>Explanation</strong> — how your evidence proves your point',
            '<strong>Audience</strong> — the person or group you are trying to persuade',
            '<strong>Tone</strong> — the attitude in your writing',
            '<strong>Call to action</strong> — what you want the reader to do, think or support',
          ]),
          h: 300,
        },
        {
          type: 'list',
          accent: 'slate',
          title: 'Persuasive structure',
          content: list([
            '<strong>INTRODUCTION</strong> — hook, issue, contention, three reasons',
            '<strong>BODY 1</strong> — strongest reason',
            '<strong>BODY 2</strong> — second reason',
            '<strong>BODY 3</strong> — third reason',
            '<strong>CONCLUSION</strong> — restate opinion, final warning/benefit, call to action',
            '<em>Teacher line: If your argument gets messy, come back to this: opinion, reason, example, explanation.</em>',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'rose',
          title: 'Introduction structure',
          content: note(
            '<p>Students write four parts:</p><ol><li><strong>Hook</strong> — grab attention</li><li><strong>Issue</strong> — explain the topic</li><li><strong>Contention</strong> — state your opinion clearly</li><li><strong>Preview</strong> — briefly name your three reasons</li></ol><p><strong>Better starter options:</strong></p><ul><li><em>Across Australian schools,</em> …</li><li><em>For many students,</em> …</li><li><em>Although some people believe,</em> …</li><li><em>When schools ignore,</em> …</li><li><em>Instead of treating camps as extras,</em> …</li><li><em>More than just a break from class,</em> …</li></ul><p><strong>Avoid:</strong> <em>I think</em>, <em>In this essay</em>, <em>Today I will</em>, <em>Firstly</em>, <em>The reason why</em></p>'
          ),
          h: 400,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'Body paragraph structure',
          content: note(
            '<p>Use <strong>PEEL</strong>, but make it sharper:</p><ol><li><strong>Point</strong> — state the reason</li><li><strong>Example</strong> — give a specific example</li><li><strong>Explain</strong> — show why it matters</li><li><strong>Link</strong> — connect back to the main argument</li></ol><p><em>Teacher line: The explanation is where marks are won. Don’t just drop an example and run away.</em></p>'
          ),
          h: 240,
        },
        {
          type: 'note',
          accent: 'violet-p',
          title: 'Body paragraph scaffold',
          content: note(
            '<p><strong>1 — Point:</strong> <em>One major benefit of</em> … / <em>Beyond the classroom,</em> … / <em>For students who struggle socially,</em> … / <em>Rather than being a distraction,</em> …</p><p><strong>2 — Explain the reason:</strong> <em>This matters because</em> … / <em>Without this opportunity,</em> … / <em>Over time,</em> … / <em>As students develop,</em> …</p><p><strong>3 — Example:</strong> <em>For example,</em> … / <em>During a school camp,</em> … / <em>In a real classroom situation,</em> … / <em>When students work together,</em> …</p><p><strong>4 — Deeper explanation:</strong> <em>As a result,</em> … / <em>This shows that</em> … / <em>Because of this,</em> … / <em>Instead of simply learning about,</em> …</p><p><strong>5 — Link:</strong> <em>Therefore,</em> … / <em>For this reason,</em> … / <em>Clearly,</em> … / <em>If schools want,</em> …</p>'
          ),
          h: 380,
        },
        {
          type: 'note',
          accent: 'gold-p',
          title: 'Three body paragraph plan',
          content: note(
            '<p><strong>Topic:</strong> Schools should provide more camps in every year level.</p><p><strong>Body 1 — Personal benefit</strong> (confidence, friendships, resilience, independence, trying new things)</p><p><strong>Body 2 — Community benefit</strong> (teamwork, stronger relationships, better behaviour, inclusion, belonging)</p><p><strong>Body 3 — Future/global benefit</strong> (leadership, problem-solving, cultural understanding, outdoor education, respect for others)</p>'
          ),
          h: 280,
        },
        {
          type: 'list',
          accent: 'mint-p',
          title: 'Persuasive language bank',
          content: list([
            '<strong>must</strong> · <strong>should</strong> · <strong>need to</strong> · <strong>cannot ignore</strong>',
            '<strong>valuable</strong> · <strong>necessary</strong> · <strong>fair</strong> · <strong>responsible</strong>',
            '<strong>meaningful</strong> · <strong>long-term</strong> · <strong>opportunity</strong> · <strong>support</strong>',
            '<strong>benefit</strong> · <strong>strengthen</strong> · <strong>prepare</strong> · <strong>improve</strong>',
            '<em>Teacher line: Persuasive words should push the reader gently but firmly.</em>',
          ]),
          h: 220,
        },
        {
          type: 'list',
          accent: 'teal-p',
          title: 'Sentence starter bank',
          content: list([
            'Although some people may argue, …',
            'Across the school year, …',
            'For students who feel disconnected, …',
            'Instead of limiting camps to one year level, …',
            'Beyond academic results, …',
            'With the right planning, …',
            'As students grow older, …',
            'Without these experiences, …',
            'Because friendships shape learning, …',
            'While classroom learning is important, …',
            'Rather than treating camps as rewards, …',
            'If schools want stronger communities, …',
            'Through shared challenges, …',
            'By giving every year level access to camps, …',
            'When students step outside their normal routine, …',
            '<em>Use at least five.</em>',
          ]),
          h: 380,
        },
        {
          type: 'note',
          accent: 'rose-p',
          title: 'Bad example / quick fix',
          content: note(
            '<p><strong>Weak paragraph:</strong></p><p><em>I think schools should have more camps. Firstly, camps are fun. Students like camps because they get to go away. This is good because it is fun. That is why schools should have more camps.</em></p><p><strong>Ask:</strong></p><ul><li>Where is the weak opinion?</li><li>Which words are repeated?</li><li>Where is the example too vague?</li><li>Where is the explanation too thin?</li><li>Which sentence starts are basic?</li><li>How could this sound more mature?</li></ul><p><strong>Teaching point:</strong> “Fun” is not enough. You need to prove the benefit.</p>'
          ),
          h: 360,
        },
        {
          type: 'note',
          accent: 'slate-p',
          title: 'Student activity: argument planner',
          content: note(
            '<p><strong>Contention</strong> — What do you believe?<br>_________________________</p><p><strong>Reason 1</strong> — Personal benefit:<br>_________________________</p><p><strong>Example 1</strong><br>_________________________</p><p><strong>Reason 2</strong> — Community benefit:<br>_________________________</p><p><strong>Example 2</strong><br>_________________________</p><p><strong>Reason 3</strong> — Future/life benefit:<br>_________________________</p><p><strong>Example 3</strong><br>_________________________</p><p><strong>Call to action</strong> — What should the school do?<br>_________________________</p>'
          ),
          h: 400,
        },
        {
          type: 'note',
          accent: 'ocean',
          title: 'Writing task',
          content: note(
            '<p>Write a persuasive response to this topic:</p><blockquote>Every year level should have at least one school camp.</blockquote><p><strong>Requirements:</strong></p><ul><li>Introduction, three body paragraphs, conclusion</li><li>Three different reasons</li><li>At least one example per body paragraph</li><li>At least five interesting sentence starts</li><li>No <em>firstly, secondly, finally</em></li><li>No <em>I think</em></li><li>Clear call to action</li></ul>'
          ),
          h: 320,
        },
        {
          type: 'list',
          accent: 'coral-p',
          title: 'Check for understanding',
          content: list([
            'What is your contention?',
            'What are your three reasons?',
            'Which reason is strongest?',
            'What example will you use for each reason?',
            'Who is your audience?',
            'What do you want them to do or believe?',
            '<em>If they cannot answer these, they are not ready to write.</em>',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'mint',
          title: 'Differentiation',
          content: note(
            '<p><strong>Support</strong> — use this frame:</p><p><em>Although some people may believe ________, schools should ________.<br>One major reason is ________.<br>For example, ________.<br>This matters because ________.<br>As a result, ________.<br>Therefore, ________.</em></p><p><strong>Extend</strong> — add:</p><ul><li>A counterargument</li><li>One rhetorical question</li><li>One short sentence for impact</li><li>One global or future-focused example</li><li>One sentence beginning with <em>Although</em></li><li>One sentence using <em>because</em>, <em>while</em> or <em>since</em> in the middle</li></ul>'
          ),
          h: 360,
        },
        {
          type: 'list',
          accent: 'gold',
          title: 'Peer check',
          content: list([
            'Is the contention clear?',
            'Are there three different reasons?',
            'Does each paragraph have an example?',
            'Does each example get explained?',
            'Are weak sentence starts avoided?',
            'Is there persuasive language?',
            'Does the conclusion leave the reader with something to remember?',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Exit ticket / reflection',
          content: note(
            '<p>Complete these:</p><ol><li>My strongest reason was: _______________</li><li>My best example was: _______________</li><li>One sentence I improved was: _______________</li><li>One thing I need to fix next time is: _______________</li></ol>'
          ),
          h: 220,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Homework / next lesson',
          content: list([
            '<strong>Option 1:</strong> Rewrite your introduction with a stronger hook.',
            '<strong>Option 2:</strong> Improve one body paragraph by adding a better example.',
            '<strong>Option 3:</strong> Replace <em>firstly, secondly, finally</em> with stronger starts.',
            '<strong>Option 4:</strong> Add a counterargument and response.',
            '<strong>Option 5:</strong> Tighten your conclusion so it ends with impact.',
          ]),
          h: 280,
        },
      ],
    },
    {
      id: 'source-analysis',
      name: 'Source analysis lesson',
      description:
        '27 cards: IOPCAM+, Roman relief model image, colour-coded paragraph, source display, teacher grid, planner, and writing task.',
      tag: 'Featured',
      category: 'History · HASS',
      board: {
        title: 'Source Analysis: Read Evidence Like a Historian',
        background: BG_TWILIGHT,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'slate',
          title: 'Source Analysis: Read Evidence Like a Historian',
          content:
            '<p><strong>Focus:</strong> Understanding, questioning and evaluating historical sources.</p><p><em>Teacher line: Historians do not just ask, “What does this source say?” They ask, “Can I trust it, what does it reveal, and what does it leave out?”</em></p>',
          h: 200,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Learning goals',
          content: list([
            'Identify primary and secondary sources',
            'Describe the origin, content, context and purpose of a source',
            'Recognise perspective, audience and message',
            'Judge the usefulness, reliability and limitations of a source',
            'Use evidence from a source in an analytical paragraph',
          ]),
          h: 260,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Success criteria',
          content: list([
            'I can explain whether a source is primary or secondary',
            'I can identify who created the source',
            'I can describe what the source shows, says or reveals',
            'I can explain why the source was created',
            'I can identify the source’s audience',
            'I can explain the perspective or message in the source',
            'I can judge how useful and reliable the source is as evidence',
            'I can write a colour-coded analytical paragraph',
          ]),
          h: 340,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Hook / starter',
          content: note(
            '<p>Show students one historical image, cartoon, object or written quote.</p><p><strong>Ask:</strong></p><ol><li>What do you notice?</li><li>What do you think is happening?</li><li>What questions do you have?</li><li>What can we trust?</li><li>What might be missing?</li></ol><p><em>Teacher line: Looking is not the same as analysing.</em></p>'
          ),
          h: 300,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Primary and secondary sources',
          content: note(
            '<p><strong>Primary source</strong> — created at the time of the event, or by someone directly connected to it.</p><p>Examples: diary, letter, photograph from the time, speech, artefact, law, eyewitness account, newspaper article from the time</p><p><strong>Secondary source</strong> — created later by someone interpreting or explaining the event.</p><p>Examples: textbook, documentary, modern website, historian’s article, museum label, modern diagram, classroom handout</p><p><em>Teacher line: Primary sources give us evidence from the time. Secondary sources help us understand and interpret that evidence.</em></p>'
          ),
          h: 360,
        },
        {
          type: 'image',
          accent: 'coral',
          title: 'Sort into primary and secondary sources?',
          imageData: templateImage('primarySecondarySort'),
          h: 480,
          w: 640,
        },
        {
          type: 'table',
          accent: 'ocean',
          title: 'IOPCAM+ overview',
          tableHtml: IOPCAM_OVERVIEW_TABLE,
          h: 320,
        },
        {
          type: 'list',
          accent: 'ocean-p',
          title: 'I — Information',
          content: list([
            'What is the explicit meaning?',
            'What is directly shown or stated?',
            'What is the implicit meaning? What can we infer?',
            'Does this source support or contradict another source?',
            '<strong>Stems:</strong> The source shows… · The source states… · One clear detail is… · This may suggest…',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'mint-p',
          title: 'O — Origin',
          content: list([
            'Who created the source? When? Where?',
            'What kind of source is it?',
            'Is it primary or secondary?',
            '<strong>Stems:</strong> This source was created by… · It was produced in… · As a primary/secondary source, it…',
          ]),
          h: 260,
        },
        {
          type: 'list',
          accent: 'teal-p',
          title: 'P — Purpose / Perspective',
          content: list([
            'Why was this source created? What was the creator trying to achieve?',
            'Whose point of view is shown?',
            'What beliefs, values or attitudes shape the source?',
            '<strong>Stems:</strong> The purpose may have been to… · The source presents the perspective of…',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'gold-p',
          title: 'C — Context',
          content: list([
            'What was happening at the time?',
            'What events, beliefs or issues shaped this source?',
            'How does the time period affect the meaning?',
            '<strong>Stems:</strong> At the time this source was created… · This source reflects a time when…',
          ]),
          h: 260,
        },
        {
          type: 'list',
          accent: 'rose',
          title: 'A — Audience',
          content: list([
            'Who was meant to see, hear or read this source?',
            'Was it public or private?',
            'How might the audience affect how the source was created?',
            '<strong>Stems:</strong> The intended audience was likely… · The source may have been designed to influence…',
          ]),
          h: 260,
        },
        {
          type: 'list',
          accent: 'violet-p',
          title: 'M — Message',
          content: list([
            'What is the main idea?',
            'What does the source want people to think, feel or believe?',
            'What attitude does it promote?',
            '<strong>Stems:</strong> The main message is… · The creator seems to suggest…',
          ]),
          h: 260,
        },
        {
          type: 'list',
          accent: 'slate',
          title: '+ Usefulness / Reliability / Limitations',
          content: list([
            'What does this source help historians understand?',
            'How reliable is the information? What perspective is missing?',
            'What does the source not tell us? What other source would we need?',
            '<strong>Stems:</strong> This source is useful because… · However, it is limited because… · Historians should use this source alongside…',
          ]),
          h: 300,
        },
        {
          type: 'image',
          accent: 'ocean',
          title: 'Source display',
          imageData: templateImage('romanReliefModel'),
          content:
            '<ul><li>What do you notice first?</li><li>What details matter?</li><li>Who made this?</li><li>Why might it have been made?</li><li>Whose view is shown?</li><li>What is missing?</li></ul>',
          h: 560,
          w: 520,
        },
        {
          type: 'table',
          accent: 'gold',
          title: 'Teacher model: IOPCAM+ grid',
          tableHtml: IOPCAM_MODEL_TABLE,
          h: 360,
        },
        {
          type: 'table',
          accent: 'mint',
          title: 'Colour-code legend',
          tableHtml: COLOUR_LEGEND_TABLE,
          h: 280,
        },
        {
          type: 'note',
          accent: 'mint-p',
          title: 'Colour-coded model paragraph',
          content:
            saStrip('blue', 'Blue — Claim:', 'This source suggests that Roman leaders wanted military success to be seen as proof of power and authority.') +
            saStrip('green', 'Green — Origin/context:', 'Created as a public monument during the Roman Empire, the source was designed to be viewed by citizens and visitors.') +
            saStrip('yellow', 'Yellow — Evidence:', 'The relief shows Roman standards, soldiers in military dress, and figures on a raised platform addressing the crowd.') +
            saStrip('orange', 'Orange — Explanation:', 'These details suggest that Rome wanted viewers to admire its strength and accept its victories as deserved.') +
            saStrip('pink', 'Pink — Purpose/perspective/audience:', 'Because the source was created for a Roman audience, it presents Rome positively and reflects the perspective of the victors.') +
            saStrip('purple', 'Purple — Evaluation:', 'Therefore, the source is useful for understanding Roman propaganda and values, but limited because it does not show the perspective of the defeated people.') +
            '<p><em>Teacher line: Each colour does a different job. A strong paragraph needs more than one colour.</em></p>',
          h: 420,
        },
        {
          type: 'list',
          accent: 'teal',
          title: 'Paragraph structure',
          content: list([
            '<strong>Claim</strong> — what the source reveals',
            '<strong>Origin/context</strong> — source background',
            '<strong>Evidence</strong> — specific detail',
            '<strong>Explanation</strong> — what the detail suggests',
            '<strong>Purpose/perspective/audience</strong>',
            '<strong>Evaluation</strong> — usefulness, reliability or limitation',
            '<em>Teacher line: Evidence tells us what is there. Analysis tells us why it matters.</em>',
          ]),
          h: 300,
        },
        {
          type: 'note',
          accent: 'coral',
          title: 'Sentence starter bank',
          content: note(
            '<p><strong>Claim:</strong> This source suggests that… · This source reveals that… · This source provides evidence that…</p><p><strong>Origin/context:</strong> Created during… · Produced by… · As a primary/secondary source…</p><p><strong>Evidence:</strong> The source shows… · One important detail is… · In the image, viewers can see…</p><p><strong>Explanation:</strong> This suggests… · This indicates… · This matters because…</p><p><strong>Purpose/perspective/audience:</strong> The purpose may have been to… · The intended audience was likely…</p><p><strong>Evaluation:</strong> This source is useful because… · However, it is limited because… · Historians should also consider…</p>'
          ),
          h: 320,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Student source analysis planner',
          content: note(
            '<p><strong>Primary or secondary?</strong> _______________</p><p><strong>I — Information</strong><br>_________________________</p><p><strong>O — Origin</strong><br>_________________________</p><p><strong>P — Purpose / Perspective</strong><br>_________________________</p><p><strong>C — Context</strong><br>_________________________</p><p><strong>A — Audience</strong><br>_________________________</p><p><strong>M — Message</strong><br>_________________________</p><p><strong>+ Usefulness / Reliability / Limitations</strong><br>_________________________</p>'
          ),
          h: 420,
        },
        {
          type: 'note',
          accent: 'rose-p',
          title: 'Writing task',
          content: note(
            '<p>Write one analytical paragraph answering:</p><blockquote>What does this source reveal about the past, and how useful is it as evidence?</blockquote><p><strong>Requirements:</strong></p><ul><li>Use at least four sentence colours</li><li>Include one specific detail from the source</li><li>Explain what the detail suggests</li><li>Refer to purpose, perspective or audience</li><li>Finish with usefulness, reliability or limitation</li></ul>'
          ),
          h: 300,
        },
        {
          type: 'list',
          accent: 'slate-p',
          title: 'Peer check',
          content: list([
            'Can I identify the claim?',
            'Is there specific evidence from the source?',
            'Does the paragraph explain what the evidence suggests?',
            'Does it mention origin, context, purpose, perspective or audience?',
            'Does it judge usefulness, reliability or limitation?',
            'Are there different sentence colours?',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'ocean',
          title: 'Exit ticket',
          content: note(
            '<ol><li>One thing this source reveals is: _______________</li><li>One reason this source is useful is: _______________</li><li>One limitation of this source is: _______________</li><li>One other source I would need is: _______________</li></ol>'
          ),
          h: 220,
        },
        {
          type: 'list',
          accent: 'gold',
          title: 'Homework / next lesson',
          content: list([
            '<strong>Option 1:</strong> Rewrite your paragraph using all six sentence colours.',
            '<strong>Option 2:</strong> Find another source that supports or contradicts this one.',
            '<strong>Option 3:</strong> Add a stronger evaluation sentence.',
            '<strong>Option 4:</strong> Identify whether the source is more useful for information, perspective or context.',
          ]),
          h: 260,
        },
      ],
    },
    {
      id: 'psmt-builder',
      name: 'PSMT Builder',
      description:
        '10 cards in lesson order: understand a real-world problem, plan the maths, solve, interpret, justify, and communicate a recommendation (Years 7–9 modelling).',
      tag: 'New',
      category: 'STEM',
      board: {
        title: 'PSMT Builder',
        background: BG_STEM_MATH,
        layoutMode: 'rows',
        presentEditable: true,
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'ocean',
          title: 'PSMT Builder: Solve a Real-World Maths Problem',
          content: note(
            '<p><strong>Focus:</strong> Mathematical modelling — not just calculating, but explaining and justifying your thinking.</p><p><em>Teacher line: A PSMT is not just “do the maths”. It is: understand the problem, choose the maths, solve it, explain it, and justify it.</em></p>'
          ),
          h: 200,
        },
        {
          type: 'note',
          accent: 'mint',
          title: '1. Understand the problem',
          content: note(
            '<p><strong>What is the real-world situation?</strong></p><p>Describe the context in your own words.</p><p><strong>What are you being asked to find, decide or recommend?</strong></p><p>State the question clearly — e.g. “How many…?”, “What is the best…?”, “Should we…?”</p>' +
              modelZone('Teacher model — problem & question')
          ),
          h: 300,
        },
        {
          type: 'note',
          accent: 'teal',
          title: '2. Given information',
          content: note(
            '<p>List all numbers, units, prices, measurements, conditions and rules you are given.</p><ul><li>Include units (m, kg, $, %, hours…)</li><li>Note anything missing that you may need to assume</li></ul>' +
              modelZone('Teacher model — given information')
          ),
          h: 240,
        },
        {
          type: 'note',
          accent: 'gold',
          title: '3. Assumptions',
          content: note(
            '<p>What will you assume to make the problem workable?</p><ul><li>Assume prices stay the same.</li><li>Assume each person eats one serve.</li><li>Assume travel time does not change.</li></ul><p><em>Add your own assumptions for this task.</em></p>'
          ),
          h: 260,
        },
        {
          type: 'note',
          accent: 'violet',
          title: '4. Variables',
          content: note(
            '<p>What quantities can change? Name each variable and what it represents.</p><ul><li>number of people</li><li>cost per item</li><li>distance · time · percentage discount</li></ul>'
          ),
          h: 220,
        },
        {
          type: 'list',
          accent: 'coral',
          title: '5. Mathematical plan',
          content: list([
            'What maths will you use? (circle or note all that apply)',
            'Percentage · ratio · rate · area · volume',
            'Average · table · graph · equation',
            'In one sentence: I will use ________ because ________.',
            'Teacher model — edit the sentence above with your plan.',
          ]),
          h: 280,
        },
        {
          type: 'table',
          accent: 'ocean-p',
          title: '6. Solve / calculate',
          tableHtml: PSMT_WORKING_TABLE,
          h: 280,
        },
        {
          type: 'note',
          accent: 'rose',
          title: '7. Interpret the answer',
          content: note(
            '<p>What does your numerical answer mean in the <strong>real-world situation</strong>?</p><p>Write in full sentences — not just the number.</p><p><em>e.g. “This means the school needs about 24 trays of food for the camp.”</em></p>' +
              modelZone('Teacher model — interpretation')
          ),
          h: 280,
        },
        {
          type: 'note',
          accent: 'mint-p',
          title: '8. Justify choices',
          content: note(
            '<p><strong>Why was this method reasonable?</strong></p><p><strong>Why is your solution suitable</strong> for the question asked?</p><p>Mention assumptions, units, and whether your answer is sensible (too big? too small?).</p>' +
              modelZone('Teacher model — justification')
          ),
          h: 280,
        },
        {
          type: 'note',
          accent: 'slate',
          title: '9. Final recommendation',
          content: note(
            '<p>Give your <strong>final answer in words</strong> — a clear recommendation or decision for someone in the real situation.</p><p><em>Stems: “I recommend… because…” · “The best option is… since…”</em></p>' +
              modelZone('Teacher model — final recommendation')
          ),
          h: 280,
        },
      ],
    },
    {
      id: 'investigation-report',
      name: 'Practical investigation report',
      description:
        '11 cards: research question, variables, method, results table, graph, analysis, and evaluation — scaffolded scientific report writing.',
      tag: 'New',
      category: 'STEM',
      board: {
        title: 'Practical investigation report',
        background: BG_STEM_SCI,
        layoutMode: 'rows',
        presentEditable: true,
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'slate',
          title: 'Practical investigation report',
          content: note(
            '<p><strong>Investigation title:</strong> What are we testing?</p><p><em>Teacher line: Science writing is not just “what we did”. It is “what the evidence shows”.</em></p>' +
              modelZone('Teacher model — investigation title')
          ),
          h: 260,
        },
        {
          type: 'note',
          accent: 'mint',
          title: 'Research question',
          content: note(
            '<p>What question are we trying to answer?</p><p><em>Example: How does the amount of sunlight affect plant growth?</em></p>' +
              modelZone('Teacher model — research question')
          ),
          h: 260,
        },
        {
          type: 'note',
          accent: 'teal',
          title: 'Hypothesis / prediction',
          content: note(
            '<p><strong>If</strong> ________ changes, <strong>then</strong> ________ will happen <strong>because</strong> ________.</p><p>State what you expect and the science behind your prediction.</p>' +
              modelZone('Teacher model — hypothesis')
          ),
          h: 280,
        },
        {
          type: 'list',
          accent: 'gold',
          title: 'Variables',
          content: list([
            'Independent variable (what we change):',
            'Dependent variable (what we measure, with units):',
            'Controlled variables (what we keep the same):',
            'Controlled variables (continued):',
            'Teacher model — edit each line with your investigation.',
          ]),
          h: 300,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Materials and safety',
          content: note(
            '<p><strong>Equipment needed:</strong></p><ul><li></li><li></li></ul><p><strong>Safety:</strong> List risks and how you will manage them (PPE, supervision, handling…).</p>' +
              modelZone('Teacher model — materials & safety notes')
          ),
          h: 300,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Method',
          listRevealAll: false,
          content: list([
            'Step 1 —',
            'Step 2 —',
            'Step 3 —',
            'Step 4 —',
            'Step 5 —',
            'Write clearly enough for someone else to repeat the investigation.',
            'Teacher model — replace each step with your method.',
          ]),
          h: 320,
        },
        {
          type: 'table',
          accent: 'ocean',
          title: 'Results table',
          tableHtml: INVESTIGATION_RESULTS_TABLE,
          h: 260,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'Graph / representation',
          content: note(
            '<p>Insert a <strong>graph, diagram, labelled drawing or photo</strong> of your results (card footer → add image).</p><p>Label axes, units, and title. State what type of graph you chose and why.</p>' +
              modelZone('Teacher model — graph title & what the graph shows')
          ),
          h: 280,
        },
        {
          type: 'list',
          accent: 'rose',
          title: 'Analysis',
          listRevealAll: false,
          content: list([
            'The data shows…',
            'As ________ increased, ________…',
            'The pattern suggests…',
            'One unusual result was…',
            'Link your evidence to the research question.',
            'Teacher model — type your full analysis paragraph in a new bullet below.',
          ]),
          h: 300,
        },
        {
          type: 'list',
          accent: 'mint-p',
          title: 'Evaluation / conclusion',
          content: list([
            'Answer the research question in a full sentence.',
            'Was the hypothesis supported? Explain using evidence.',
            'Was the test fair? What made it fair or unfair?',
            'Errors or limitations that affected the result:',
            'How could the investigation be improved next time?',
            'Teacher model — type your conclusion in a new bullet below.',
          ]),
          h: 320,
        },
      ],
    },
    {
      id: 'fair-test-planner',
      name: 'Fair test planner',
      description:
        '6 cards to plan before a prac: question, variables, method, safety, and prediction — use Present to reveal method steps.',
      category: 'STEM',
      board: {
        title: 'Fair test planner',
        background: BG_STEM_SCI,
        layoutMode: 'rows',
        presentEditable: true,
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'teal',
          title: 'Fair test planner',
          content: note(
            '<p>Plan your investigation <strong>before</strong> you start. A fair test changes only one variable at a time.</p>'
          ),
          h: 180,
        },
        {
          type: 'note',
          accent: 'mint',
          title: 'Research question',
          content: note(
            '<p>What are you trying to find out?</p><p><em>How does ________ affect ________?</em></p>' +
              modelZone('Teacher model — research question')
          ),
          h: 260,
        },
        {
          type: 'list',
          accent: 'gold',
          title: 'Variables',
          content: list([
            'Independent variable (what I will change):',
            'Dependent variable (what I will measure, with units):',
            'Controlled variables (what I will keep the same):',
            'Teacher model — edit each line with your prac details.',
          ]),
          h: 280,
        },
        {
          type: 'list',
          accent: 'violet',
          title: 'Method',
          listRevealAll: false,
          content: list([
            'Step 1 —',
            'Step 2 —',
            'Step 3 —',
            'Step 4 —',
            'Teacher model — replace each step with your method.',
          ]),
          h: 280,
        },
        {
          type: 'note',
          accent: 'coral',
          title: 'Safety',
          content: note(
            '<p><strong>Risks:</strong></p><ul><li></li></ul><p><strong>How we stay safe:</strong> PPE, supervision, careful handling…</p>'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'ocean',
          title: 'Prediction',
          content: note(
            '<p><strong>If</strong> ________ changes, <strong>then</strong> ________ will happen <strong>because</strong> ________.</p>' +
              modelZone('Teacher model — prediction')
          ),
          h: 260,
        },
      ],
    },
    {
      id: 'mind-map',
      name: 'Mind map',
      description:
        'Central topic with branches around the hub (choose 3–8). Post adds more branches clockwise from 12 o’clock.',
      category: 'Thinking & collaboration',
      layout: 'mind-map',
      configure: { kind: 'branches', min: 3, max: 8, default: 6, label: 'branches' },
    },
    {
      id: 'gallery-walk',
      name: 'Gallery walk',
      description:
        'Large stations across the board — add images, PDFs, or documents per cell. Click a station to view it full screen.',
      tag: 'New',
      category: 'Thinking & collaboration',
      configure: { kind: 'cells', min: 2, max: 10, default: 6, label: 'stations' },
    },
    {
      id: 'task-collaboration-wall',
      name: 'Task Collaboration Wall',
      description:
        'One-screen 2×3 or 2×4 grid — build task clarity with the class, bullet lists, export PDF for students.',
      tag: 'New',
      category: 'Thinking & collaboration',
      configure: { kind: 'task-grid' },
    },
    {
      id: 'feedback-reflection-wall',
      name: 'Feedback Reflection Wall',
      description:
        'Whole-class feedback grid after reviewing drafts or final work — fill live, export PDF handout.',
      tag: 'New',
      category: 'Thinking & collaboration',
      configure: { kind: 'feedback-grid' },
    },
  ];
})();
