/**
 * Prez board templates — block specs applied on top of app.js defaults.
 */
(function () {
  const BG_ACADEMIC = 'linear-gradient(160deg, #1e3a5f 0%, #2563eb 40%, #93c5fd 100%)';
  const BG_PAPER = 'linear-gradient(180deg, #f7f5f0 0%, #e8e4dc 100%)';
  const BG_TWILIGHT = 'linear-gradient(180deg, #312e81 0%, #be185d 50%, #f97316 100%)';
  const BG_FOREST = 'linear-gradient(135deg, #134e4a 0%, #065f46 50%, #047857 100%)';

  function list(items) {
    return `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  }

  function note(html) {
    return html.startsWith('<') ? html : `<p>${html}</p>`;
  }

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
      id: 'see-think-wonder',
      name: 'See · Think · Wonder',
      description:
        'Observe an image or source, interpret it, then ask questions — builds analysis before you teach.',
      category: 'Higher-order thinking',
      board: {
        title: 'See · Think · Wonder',
        background: BG_PAPER,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'slate',
          title: 'See · Think · Wonder',
          content: '<p>Add a photo, map, graph, or primary source on the next card (or a link).</p>',
          h: 140,
        },
        {
          type: 'image',
          accent: 'ocean',
          title: 'Source',
          content: '',
          h: 280,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'See',
          content: note('What do you notice? List facts only — no interpretation yet.'),
          h: 220,
        },
        {
          type: 'note',
          accent: 'violet-p',
          title: 'Think',
          content: note('What does it mean? Why might it be this way? What patterns do you see?'),
          h: 220,
        },
        {
          type: 'note',
          accent: 'gold-p',
          title: 'Wonder',
          content: note('What questions does this raise? What would you need to find out?'),
          h: 220,
        },
      ],
    },
    {
      id: 'claim-evidence-reasoning',
      name: 'Claim · Evidence · Reasoning',
      description:
        'Students state a claim, support it with evidence, and explain how the evidence proves the claim (CER).',
      category: 'Higher-order thinking',
      board: {
        title: 'Claim · Evidence · Reasoning',
        background: BG_FOREST,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'mint',
          title: 'Claim · Evidence · Reasoning',
          content: '<p>Use after an investigation, reading, or data set.</p>',
          h: 140,
        },
        {
          type: 'note',
          accent: 'mint-p',
          title: 'Question or phenomenon',
          content: note('What are we trying to explain or answer?'),
          h: 160,
        },
        {
          type: 'note',
          accent: 'teal',
          title: 'Claim',
          content: note('One clear sentence: what you believe is true or what answers the question.'),
          h: 180,
        },
        {
          type: 'list',
          accent: 'ocean',
          title: 'Evidence',
          content: list([
            'Data point, quote, or observation #1',
            'Data point, quote, or observation #2',
            'Data point, quote, or observation #3',
          ]),
          h: 240,
        },
        {
          type: 'note',
          accent: 'violet',
          title: 'Reasoning',
          content: note(
            'Because… (link each piece of evidence back to the claim — why does this prove your idea?)'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'gold-p',
          title: 'Rebuttal or alternative',
          content: note('What might someone disagree with? How would you respond?'),
          h: 180,
        },
      ],
    },
    {
      id: 'evaluate-defend',
      name: 'Evaluate & defend',
      description:
        'Take a position on a statement, weigh evidence on both sides, then justify a judgment.',
      category: 'Higher-order thinking',
      board: {
        title: 'Evaluate & defend',
        background: BG_TWILIGHT,
        layoutMode: 'rows',
      },
      blockSpecs: [
        {
          type: 'heading',
          accent: 'violet',
          title: 'Evaluate & defend',
          content: '<p>Higher-order: analyse both sides, then evaluate.</p>',
          h: 140,
        },
        {
          type: 'note',
          accent: 'rose',
          title: 'Statement to evaluate',
          content: note(
            'e.g. “Democracy is always the best form of government.” or “The character was right to…”'
          ),
          h: 180,
        },
        {
          type: 'list',
          accent: 'mint',
          title: 'Evidence for',
          content: list(['Reason 1 with example', 'Reason 2 with example', 'Reason 3 with example']),
          h: 240,
        },
        {
          type: 'list',
          accent: 'coral',
          title: 'Evidence against',
          content: list(['Counterpoint 1', 'Counterpoint 2', 'Counterpoint 3']),
          h: 240,
        },
        {
          type: 'note',
          accent: 'gold',
          title: 'Your judgment',
          content: note(
            'To what extent do you agree? Justify using the strongest evidence from both sides.'
          ),
          h: 220,
        },
        {
          type: 'note',
          accent: 'ocean-p',
          title: 'Criteria',
          content: note(
            'What makes a strong answer? (e.g. uses evidence, considers both sides, clear conclusion)'
          ),
          h: 180,
        },
      ],
    },
  ];
})();
