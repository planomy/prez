/**
 * Brain break library — card → Brain breaks (multi-select picker).
 */
(function () {
  window.PREZ_BRAIN_BREAK_ROUTINES = [
    {
      category: 'Quick & energising',
      hint: 'Physical movement — get the wiggles out or boost low energy',
      accent: '#ea580c',
      surface: '#ffedd5',
      activities: [
        {
          id: 'silent-ball',
          title: 'Silent Ball',
          detail:
            'Students pass a soft ball around the room silently. If someone drops it, makes a bad pass, or makes a noise, they are out.',
        },
        {
          id: 'statues',
          title: 'Statues',
          detail:
            'Call out a theme (e.g. “At the beach”) and count to three. Students jump into a pose and freeze still while you admire the statues.',
        },
        {
          id: 'five-four-three-two-one',
          title: '5-4-3-2-1',
          detail:
            '5 star jumps, 4 squats, 3 spins, 2 hops, and 1 deep breath — a quick sequence to get hearts pumping.',
        },
        {
          id: 'rps-tournament',
          title: 'Rock Paper Scissors tournament',
          detail: 'Students play quick rounds; losers sit down until one champion remains.',
        },
      ],
    },
    {
      category: 'Calming & mindful',
      hint: 'Focus reset when the class is overstimulated or before quiet work',
      accent: '#0284c7',
      surface: '#e0f2fe',
      activities: [
        {
          id: 'focus-ball',
          title: 'Focus ball / mindful listening',
          detail:
            'Sound a chime or bell. Students close their eyes and listen until the sound completely fades away.',
        },
        {
          id: 'square-breathing',
          title: 'Square breathing',
          detail: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. Visual guides (e.g. GoNoodle) can help.',
        },
        {
          id: 'jellyfish-video',
          title: 'Jellyfish video',
          detail: 'Dim the lights and play a calming jellyfish or nature video to help students de-escalate.',
        },
        {
          id: 'finger-tracing',
          title: 'Finger tracing',
          detail:
            'Students trace one hand with a finger — inhale up each finger, exhale down the other side.',
        },
      ],
    },
    {
      category: 'Quick thinking & social',
      hint: 'Brief cognitive shifts that build community without heavy movement',
      accent: '#7c3aed',
      surface: '#ede9fe',
      activities: [
        {
          id: 'would-you-rather',
          title: 'Would you rather?',
          detail:
            'Ask one question (e.g. “Pet dragon or pet unicorn?”). Students discuss or move to different sides of the room.',
        },
        {
          id: 'count-to-twenty',
          title: 'Count to 20',
          detail:
            'The class counts to 20 one voice at a time. If two people speak at once, restart at one — builds focus and listening.',
        },
        {
          id: 'mirror-mirror',
          title: 'Mirror mirror',
          detail:
            'In pairs, one student leads slow movements and the partner mirrors them perfectly, then swap.',
        },
      ],
    },
  ];
})();
