import fs from 'fs';

const p = new URL('../src/schedule/slots.ts', import.meta.url);
let s = fs.readFileSync(p, 'utf8');

// 1. Fix Track 5 Tuesday afternoon session (official agenda)
s = s.replace(
  `    id: 'mon-1400-t5',
    track: 5,
    kind: 'talk',
    title:
      'Follow the money: how financial structures shape software design',
    speaker: 'Ian Miell',
    room: 'FROBISHER 4',
  }`,
  `    id: 'mon-1400-t5',
    track: 5,
    kind: 'talk',
    title: 'Why software breaks, and how we can fix it',
    speaker: 'Jules May',
    room: 'FROBISHER 4',
  }`,
);

const splitMark = 'const thu0930';
const idx = s.indexOf(splitMark);
if (idx === -1) throw new Error('split marker not found');
let a = s.slice(0, idx);
const b = s.slice(idx);

// Conference day 1 on Tuesday per sddconf.com — rename former “Monday PDF grid”
a = a.replace(/const monConfKeynote/, 'const tueConfKeynote');
a = a.replace(/id: 'mon-kn01'/, "id: 'tue-kn01'");
a = a.replace(/const mon1130/, 'const tueConf1130');
a = a.replace(/'mon-1130-/g, "'tue-conf-1130-");
a = a.replace(/const mon1400/, 'const tueConf1400');
a = a.replace(/'mon-1400-/g, "'tue-conf-1400-");
a = a.replace(/const mon1600/, 'const tueConf1600');
a = a.replace(/'mon-1600-/g, "'tue-conf-1600-");

// Former PDF “Tuesday” grid is Wednesday on the official agenda
a = a.replace(/const tue0930/, 'const wed0930');
a = a.replace(/'tue-0930-/g, "'wed-0930-");
a = a.replace(/const tue1130/, 'const wed1130');
a = a.replace(/'tue-1130-/g, "'wed-1130-");
a = a.replace(/const tue1400/, 'const wed1400');
a = a.replace(/'tue-1400-/g, "'wed-1400-");
a = a.replace(/const tue1600/, 'const wed1600');
a = a.replace(/'tue-1600-/g, "'wed-1600-");

s = a + b;

// Remove duplicate Wednesday clones from Thursday IDs
s = s.replace(
  /\r?\n\/\*\* PDF page 4[\s\S]*?const wed1600 = cloneWedIdsFromThu\(thu1600\);\r?\n/,
  '\n',
);

const NEW_ALL_SLOTS = `export const ALL_SLOTS: Slot[] = [
  {
    id: 'tue-conf-keynote',
    date: '2026-05-12',
    start: '09:30',
    end: '11:00',
    label: 'Keynote',
    sessions: [tueConfKeynote],
    requiresChoice: false,
  },
  {
    id: 'tue-conf-1130',
    date: '2026-05-12',
    start: '11:30',
    end: '13:00',
    label: 'Sessions',
    sessions: tueConf1130,
    requiresChoice: true,
  },
  {
    id: 'tue-conf-1400',
    date: '2026-05-12',
    start: '14:00',
    end: '15:30',
    label: 'Sessions',
    sessions: tueConf1400,
    requiresChoice: true,
  },
  {
    id: 'tue-conf-1600',
    date: '2026-05-12',
    start: '16:00',
    end: '17:30',
    label: 'Sessions',
    sessions: tueConf1600,
    requiresChoice: true,
  },
  {
    id: 'wed-0930',
    date: '2026-05-13',
    start: '09:30',
    end: '11:00',
    label: 'Sessions',
    sessions: wed0930,
    requiresChoice: true,
  },
  {
    id: 'wed-1130',
    date: '2026-05-13',
    start: '11:30',
    end: '13:00',
    label: 'Sessions',
    sessions: wed1130,
    requiresChoice: true,
  },
  {
    id: 'wed-1400',
    date: '2026-05-13',
    start: '14:00',
    end: '15:30',
    label: 'Sessions',
    sessions: wed1400,
    requiresChoice: true,
  },
  {
    id: 'wed-1600',
    date: '2026-05-13',
    start: '16:00',
    end: '17:30',
    label: 'Sessions',
    sessions: wed1600,
    requiresChoice: true,
  },
  {
    id: 'thu-0930',
    date: '2026-05-14',
    start: '09:30',
    end: '11:00',
    label: 'Sessions',
    sessions: thu0930,
    requiresChoice: true,
  },
  {
    id: 'thu-1130',
    date: '2026-05-14',
    start: '11:30',
    end: '13:00',
    label: 'Sessions',
    sessions: thu1130,
    requiresChoice: true,
  },
  {
    id: 'thu-1400',
    date: '2026-05-14',
    start: '14:00',
    end: '15:30',
    label: 'Sessions',
    sessions: thu1400,
    requiresChoice: true,
  },
  {
    id: 'thu-1600',
    date: '2026-05-14',
    start: '16:00',
    end: '17:30',
    label: 'Sessions',
    sessions: thu1600,
    requiresChoice: true,
  },
];`;

s = s.replace(/export const ALL_SLOTS: Slot\[\] = \[[\s\S]*?\];/, NEW_ALL_SLOTS);

const NEW_BREAKS = `const tuesdayMainBreaks: BreakBlock[] = [
  {
    id: '2026-05-12-coffee-morning',
    date: '2026-05-12',
    start: '11:00',
    end: '11:30',
    title: 'Coffee break',
  },
  {
    id: '2026-05-12-lunch',
    date: '2026-05-12',
    start: '13:00',
    end: '14:00',
    title: 'Lunch break',
  },
  {
    id: '2026-05-12-coffee-afternoon',
    date: '2026-05-12',
    start: '15:30',
    end: '16:00',
    title: 'Coffee break',
  },
  {
    id: '2026-05-12-drinks',
    date: '2026-05-12',
    start: '17:30',
    end: '19:00',
    title: 'Drinks reception',
  },
];

export const ALL_BREAKS: BreakBlock[] = [
  ...tuesdayMainBreaks,
  ...breaksForDate('2026-05-13', 'wed'),
  ...breaksForDate('2026-05-14', 'thu'),
];`;

s = s.replace(
  /const monBreaksExtra: BreakBlock\[\] = \[[\s\S]*?\];\r?\n\r?\nexport const ALL_BREAKS: BreakBlock\[\] = \[[\s\S]*?\];/,
  NEW_BREAKS,
);

// Workshop slot comment
s = s.replace(
  '/\\*\\* Full-day workshops — mutually exclusive with Monday conference track picks \\*/',
  '/** Full-day pre / post-conference workshop */',
);

fs.writeFileSync(p, s);
console.log('patched', p.pathname);
