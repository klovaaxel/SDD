import type { BreakBlock, Session, Slot } from './types';
import { breaksForDate } from './breaks';

export const MONDAY_WORKSHOPS: Session[] = [
  {
    id: 'wk01',
    track: null,
    kind: 'workshop',
    title: 'C# Masterclass',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 5',
  },
  {
    id: 'wk02',
    track: null,
    kind: 'workshop',
    title: 'Generative AI for Software Engineers',
    speaker: 'Jeff Prosise',
    room: 'FROBISHER 1 & 2',
  },
  {
    id: 'wk03',
    track: null,
    kind: 'workshop',
    title: 'Architecture as Code: Quantifying Architectural Trade-offs',
    speaker: 'Neal Ford',
    room: 'FROBISHER 3',
  },
  {
    id: 'wk04',
    track: null,
    kind: 'workshop',
    title: 'Keeping It Simple',
    speaker: 'Kevlin Henney',
    room: 'FROBISHER BOARDROOM',
  },
  {
    id: 'wk05',
    track: null,
    kind: 'workshop',
    title: 'Architectural Thinking',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 4',
  },
  {
    id: 'wk07',
    track: null,
    kind: 'workshop',
    title:
      'One Day, Four Architectures: Hands-On with Monolith, N-Tier, Modular Monolith, and Microservices',
    speaker: 'Chad Green',
    room: 'FROBISHER 6',
  },
];

export const FRIDAY_WORKSHOPS: Session[] = [
  {
    id: 'wk08',
    track: null,
    kind: 'workshop',
    title:
      'Agentic AI on .NET with Microsoft Agent Framework and Small Language Models',
    speaker: 'Daniel Costea',
    room: 'FROBISHER 1',
  },
  {
    id: 'wk09',
    track: null,
    kind: 'workshop',
    title:
      'Mastering Modern Architecture: Building Flexible, Distributed Systems with Hands-on Code',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 6',
  },
  {
    id: 'wk10',
    track: null,
    kind: 'workshop',
    title: 'Building Robust, Maintainable Software using Generative AI',
    speaker: 'Clare Sudbery',
    room: 'FROBISHER 2',
  },
  {
    id: 'wk11',
    track: null,
    kind: 'workshop',
    title:
      'Programming Like Your Life Depends On It: A Reliability Masterclass',
    speaker: 'Jules May',
    room: 'FROBISHER 3',
  },
  {
    id: 'wk12',
    track: null,
    kind: 'workshop',
    title:
      'Mastering Software Architecture Patterns and Antipatterns',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 5',
  },
  {
    id: 'wk14',
    track: null,
    kind: 'workshop',
    title: 'Software Architecture: The Hard Parts',
    speaker: 'Neal Ford',
    room: 'FROBISHER 4',
  },
];

const monConfKeynote: Session = {
  id: 'mon-kn01',
  track: 1,
  kind: 'keynote',
  title:
    'AI goes local: why the future of intelligent software runs on-device',
  speaker: 'Christian Weyer',
  room: 'AUDITORIUM 1',
};

const mon1130: Session[] = [
  {
    id: 'mon-1130-t1',
    track: 1,
    kind: 'talk',
    title: '10 things I do on every .NET app',
    speaker: 'Scott Sauber',
    room: 'FROBISHER 4',
  },
  {
    id: 'mon-1130-t2',
    track: 2,
    kind: 'talk',
    title: 'LLMs/AI and the .NET tooling landscape',
    speaker: 'Spencer Schneidenbach',
    room: 'FROBISHER 2',
  },
  {
    id: 'mon-1130-t3',
    track: 3,
    kind: 'talk',
    title:
      'From zero to hero: everything you need to know about AI in 90 minutes',
    speaker: 'Jeff Prosise',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'mon-1130-t4',
    track: 4,
    kind: 'talk',
    title: 'The past, present and future of programming languages',
    speaker: 'Kevlin Henney',
    room: 'FROBISHER 3',
  },
  {
    id: 'mon-1130-t5',
    track: 5,
    kind: 'talk',
    title: 'Work now, sync later: is local first the future of web apps?',
    speaker: 'Cory House',
    room: 'FROBISHER 6',
  },
  {
    id: 'mon-1130-t6',
    track: 6,
    kind: 'talk',
    title: 'Aspect-oriented and agentic architecture',
    speaker: 'Neal Ford',
    room: 'FROBISHER 1',
  },
  {
    id: 'mon-1130-t7',
    track: 7,
    kind: 'talk',
    title:
      'The role of enterprise architecture in an ever-changing landscape',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 5',
  },
];

const mon1400: Session[] = [
  {
    id: 'mon-1400-t1',
    track: 1,
    kind: 'talk',
    title: 'Functional code in C# 13 and beyond',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 6',
  },
  {
    id: 'mon-1400-t2',
    track: 2,
    kind: 'talk',
    title: 'Coding faster with LLMs: lessons learned',
    speaker: 'Cory House',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'mon-1400-t3',
    track: 3,
    kind: 'talk',
    title: 'The death of passwords: implementing passkeys in .NET 10',
    speaker: 'Andrew Clymer',
    room: 'FROBISHER 2',
  },
  {
    id: 'mon-1400-t4',
    track: 4,
    kind: 'talk',
    title: 'How to write a function',
    speaker: 'Kevlin Henney',
    room: 'FROBISHER 5',
  },
  {
    id: 'mon-1400-t5',
    track: 5,
    kind: 'talk',
    title:
      'Follow the money: how financial structures shape software design',
    speaker: 'Ian Miell',
    room: 'FROBISHER 4',
  },
  {
    id: 'mon-1400-t6',
    track: 6,
    kind: 'talk',
    title:
      'Code, connect, conquer: mastering serverless and API-centric designs',
    speaker: 'Chad Green',
    room: 'FROBISHER 3',
  },
  {
    id: 'mon-1400-t7',
    track: 7,
    kind: 'talk',
    title:
      'Software architecture foundations: identifying characteristics',
    speaker: 'Neal Ford',
    room: 'FROBISHER 1',
  },
];

const mon1600: Session[] = [
  {
    id: 'mon-1600-t1',
    track: 1,
    kind: 'talk',
    title: 'Simplifying thread safety',
    speaker: 'Andrew Clymer',
    room: 'FROBISHER 5',
  },
  {
    id: 'mon-1600-t2',
    track: 2,
    kind: 'talk',
    title:
      'From black box to clear code: creating an AI coding agent in C#',
    speaker: 'Spencer Schneidenbach',
    room: 'FROBISHER 1',
  },
  {
    id: 'mon-1600-t3',
    track: 3,
    kind: 'talk',
    title: 'The Model Context Protocol (MCP)',
    speaker: 'Jeff Prosise',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'mon-1600-t4',
    track: 4,
    kind: 'talk',
    title:
      'Complete, correct, and confidential: the inherently unhackable database',
    speaker: 'Jules May',
    room: 'FROBISHER 4',
  },
  {
    id: 'mon-1600-t5',
    track: 5,
    kind: 'talk',
    title: 'The fewer environments the better: lean DevOps strategies',
    speaker: 'Cory House',
    room: 'FROBISHER 6',
  },
  {
    id: 'mon-1600-t6',
    track: 6,
    kind: 'talk',
    title:
      'Streamlining microservice communication with CQRS and event sourcing',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 3',
  },
  {
    id: 'mon-1600-t7',
    track: 7,
    kind: 'talk',
    title:
      'Software architecture foundations: styles, patterns, and trade-offs',
    speaker: 'Neal Ford',
    room: 'FROBISHER 2',
  },
];

const tue0930: Session[] = [
  {
    id: 'tue-0930-t1',
    track: 1,
    kind: 'talk',
    title: '10 things every .NET developer should know about Azure',
    speaker: 'Scott Sauber',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'tue-0930-t2',
    track: 2,
    kind: 'talk',
    title: 'Re-inventing yourself: a developer’s roadmap to the AI revolution',
    speaker: 'Spencer Schneidenbach',
    room: 'FROBISHER 4',
  },
  {
    id: 'tue-0930-t3',
    track: 3,
    kind: 'talk',
    title: 'Being the human in the loop',
    speaker: 'Kevlin Henney',
    room: 'FROBISHER 1',
  },
  {
    id: 'tue-0930-t4',
    track: 4,
    kind: 'talk',
    title: 'How not to get hacked',
    speaker: 'Jules May',
    room: 'FROBISHER 6',
  },
  {
    id: 'tue-0930-t5',
    track: 5,
    kind: 'talk',
    title:
      'Beyond the prompt: evaluating, testing, and securing LLM applications',
    speaker: 'Mete Atamel',
    room: 'FROBISHER 3',
  },
  {
    id: 'tue-0930-t6',
    track: 6,
    kind: 'talk',
    title: 'Modular monoliths: a happy middle',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 5',
  },
  {
    id: 'tue-0930-t7',
    track: 7,
    kind: 'talk',
    title: 'Granularity and communication for microservices',
    speaker: 'Neal Ford',
    room: 'FROBISHER 2',
  },
];

const tue1130: Session[] = [
  {
    id: 'tue-1130-t1',
    track: 1,
    kind: 'talk',
    title: 'Authorization: the next frontier',
    speaker: 'Andrew Clymer',
    room: 'FROBISHER 2',
  },
  {
    id: 'tue-1130-t2',
    track: 2,
    kind: 'talk',
    title:
      'Agents of change: building AI agents that work (and think) for us',
    speaker: 'Jeff Prosise',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'tue-1130-t3',
    track: 3,
    kind: 'talk',
    title: 'No more OOP: functional DDD without the baggage',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 3',
  },
  {
    id: 'tue-1130-t4',
    track: 4,
    kind: 'talk',
    title: 'Hello, quantum world!',
    speaker: 'Jules May',
    room: 'FROBISHER 4',
  },
  {
    id: 'tue-1130-t5',
    track: 5,
    kind: 'talk',
    title: 'Building a platform to run distributed workloads, for free!',
    speaker: 'Dan Erez',
    room: 'FROBISHER 6',
  },
  {
    id: 'tue-1130-t6',
    track: 6,
    kind: 'talk',
    title: 'Modular monoliths and other facepalms',
    speaker: 'Kevlin Henney',
    room: 'FROBISHER 5',
  },
  {
    id: 'tue-1130-t7',
    track: 7,
    kind: 'talk',
    title:
      'Building a real-life micro-everything architecture part 1: patterns, practices & techniques',
    speaker: 'Sander Hoogendoorn',
    room: 'FROBISHER 1',
  },
];

const tue1400: Session[] = [
  {
    id: 'tue-1400-t1',
    track: 1,
    kind: 'talk',
    title:
      'Ten OO design patterns every developer should know — in 90 minutes!',
    speaker: 'Andrew Clymer',
    room: 'FROBISHER 4',
  },
  {
    id: 'tue-1400-t2',
    track: 2,
    kind: 'talk',
    title:
      'Coding while you sleep: lessons from running AI agents 24/7',
    speaker: 'Spencer Schneidenbach',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'tue-1400-t3',
    track: 3,
    kind: 'talk',
    title:
      'From chaos to clarity: mastering deep work in a distracted world',
    speaker: 'Alex Radu',
    room: 'FROBISHER 2',
  },
  {
    id: 'tue-1400-t4',
    track: 4,
    kind: 'talk',
    title: 'How to build a knockout development team',
    speaker: 'Jules May',
    room: 'FROBISHER 1',
  },
  {
    id: 'tue-1400-t5',
    track: 5,
    kind: 'talk',
    title: 'Measuring your architecture',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 3',
  },
  {
    id: 'tue-1400-t6',
    track: 6,
    kind: 'talk',
    title: 'Modular monolith architecture',
    speaker: 'Toni Petrina',
    room: 'FROBISHER 6',
  },
  {
    id: 'tue-1400-t7',
    track: 7,
    kind: 'talk',
    title:
      'Building a real-life micro-everything architecture part 2: the code bits!',
    speaker: 'Sander Hoogendoorn',
    room: 'FROBISHER 5',
  },
];

const tue1600: Session[] = [
  {
    id: 'tue-1600-t1',
    track: 1,
    kind: 'talk',
    title:
      'Running background tasks in .NET Core — in app, the cloud, and beyond',
    speaker: 'Spencer Schneidenbach',
    room: 'FROBISHER 2',
  },
  {
    id: 'tue-1600-t2',
    track: 2,
    kind: 'talk',
    title: 'A brief overview of coding agents',
    speaker: 'Toni Petrina',
    room: 'FROBISHER 3',
  },
  {
    id: 'tue-1600-t3',
    track: 3,
    kind: 'talk',
    title:
      'Navigating the maze of communicating architecture decisions',
    speaker: 'Chad Green',
    room: 'FROBISHER 6',
  },
  {
    id: 'tue-1600-t4',
    track: 4,
    kind: 'talk',
    title: 'Test-driven development with Blazor',
    speaker: 'Scott Sauber',
    room: 'FROBISHER 5',
  },
  {
    id: 'tue-1600-t5',
    track: 5,
    kind: 'talk',
    title:
      'The agent native stack: memory, tools, reasoning, autonomy',
    speaker: 'James Charlesworth',
    room: 'FROBISHER 1',
  },
  {
    id: 'tue-1600-t6',
    track: 6,
    kind: 'talk',
    title:
      'Refactoring the monolith: choosing the right application strategy for cloud readiness',
    speaker: 'Blaize Stewart',
    room: 'FROBISHER 4',
  },
  {
    id: 'tue-1600-t7',
    track: 7,
    kind: 'talk',
    title: 'Creating an architecture narrative',
    speaker: 'Neal Ford',
    room: 'AUDITORIUM 1',
  },
];

const thu0930: Session[] = [
  {
    id: 'thu-0930-t1',
    track: 1,
    kind: 'talk',
    title: 'Agentic AI in .NET — a case study',
    speaker: 'Spencer Schneidenbach',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'thu-0930-t2',
    track: 2,
    kind: 'talk',
    title: 'Making large language models smarter',
    speaker: 'Jeff Prosise',
    room: 'FROBISHER 4',
  },
  {
    id: 'thu-0930-t3',
    track: 3,
    kind: 'talk',
    title: 'Don’t just “trust me, bro” with your AI',
    speaker: 'Sebastian Nilsson',
    room: 'FROBISHER 5',
  },
  {
    id: 'thu-0930-t4',
    track: 4,
    kind: 'talk',
    title:
      'The cash value of technical debt: how to scare your boss into doing the right thing',
    speaker: 'Jules May',
    room: 'FROBISHER 1',
  },
  {
    id: 'thu-0930-t5',
    track: 5,
    kind: 'talk',
    title:
      'Developing in containers: dev containers and GitHub Codespaces',
    speaker: 'Blaize Stewart',
    room: 'FROBISHER 3',
  },
  {
    id: 'thu-0930-t6',
    track: 6,
    kind: 'talk',
    title: 'Surviving complexity through software design',
    speaker: 'Jacqui Read',
    room: 'FROBISHER 6',
  },
  {
    id: 'thu-0930-t7',
    track: 7,
    kind: 'talk',
    title: 'Exploring architecture patterns for modern systems',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 2',
  },
];

const thu1130: Session[] = [
  {
    id: 'thu-1130-t1',
    track: 1,
    kind: 'talk',
    title: 'Let’s stop programming like it’s 2017',
    speaker: 'Andrew Clymer',
    room: 'FROBISHER 3',
  },
  {
    id: 'thu-1130-t2',
    track: 2,
    kind: 'talk',
    title: 'Inside the belly of the beast: how LLMs work',
    speaker: 'Jeff Prosise',
    room: 'FROBISHER 5',
  },
  {
    id: 'thu-1130-t3',
    track: 3,
    kind: 'talk',
    title:
      'Architectural design patterns for applications leveraging LLMs',
    speaker: 'Blaize Stewart',
    room: 'FROBISHER 1',
  },
  {
    id: 'thu-1130-t4',
    track: 4,
    kind: 'talk',
    title: 'Cryptography in a post-quantum world',
    speaker: 'Jules May',
    room: 'FROBISHER 6',
  },
  {
    id: 'thu-1130-t5',
    track: 5,
    kind: 'talk',
    title: 'Seven habits of a (mostly) successful team',
    speaker: 'Sander Hoogendoorn',
    room: 'FROBISHER 2',
  },
  {
    id: 'thu-1130-t6',
    track: 6,
    kind: 'talk',
    title: 'Clean architecture in the AI agents & MCP era',
    speaker: 'Dan Erez',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'thu-1130-t7',
    track: 7,
    kind: 'talk',
    title: 'Identifying architectural risk',
    speaker: 'Neal Ford',
    room: 'FROBISHER 4',
  },
];

const thu1400: Session[] = [
  {
    id: 'thu-1400-t1',
    track: 1,
    kind: 'talk',
    title: 'Advanced pattern matching in C#',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 5',
  },
  {
    id: 'thu-1400-t2',
    track: 2,
    kind: 'talk',
    title:
      'From tools to MCP: standardizing and sharing functions with .NET and Microsoft Agent Framework',
    speaker: 'Daniel Costea',
    room: 'FROBISHER 1',
  },
  {
    id: 'thu-1400-t3',
    track: 3,
    kind: 'talk',
    title: 'Distributed brains: where should your AI actually run?',
    speaker: 'Blaize Stewart',
    room: 'FROBISHER 4',
  },
  {
    id: 'thu-1400-t4',
    track: 4,
    kind: 'talk',
    title:
      'If considered harmful, or how to eliminate 95% of your bugs in one easy step',
    speaker: 'Jules May',
    room: 'FROBISHER 3',
  },
  {
    id: 'thu-1400-t5',
    track: 5,
    kind: 'talk',
    title: 'Local first development — who needs the back end?',
    speaker: 'Dan Erez',
    room: 'FROBISHER 6',
  },
  {
    id: 'thu-1400-t6',
    track: 6,
    kind: 'talk',
    title:
      'Messaging patterns to transform your cloud architecture',
    speaker: 'Chad Green',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'thu-1400-t7',
    track: 7,
    kind: 'talk',
    title:
      'Avoiding the traps: anti-patterns in modern software architecture',
    speaker: 'Raju Gandhi',
    room: 'FROBISHER 2',
  },
];

const thu1600: Session[] = [
  {
    id: 'thu-1600-t1',
    track: 1,
    kind: 'talk',
    title: 'Not your typical .NET',
    speaker: 'Toni Petrina',
    room: 'FROBISHER 6',
  },
  {
    id: 'thu-1600-t2',
    track: 2,
    kind: 'talk',
    title:
      'Monitoring and debugging multi-agent AI systems: with Microsoft Agent Framework and .NET',
    speaker: 'Daniel Costea',
    room: 'AUDITORIUM 1',
  },
  {
    id: 'thu-1600-t3',
    track: 3,
    kind: 'talk',
    title: 'Crack the code of serverless design',
    speaker: 'Chad Green',
    room: 'FROBISHER 4',
  },
  {
    id: 'thu-1600-t4',
    track: 4,
    kind: 'talk',
    title: 'Decisions for software design and beyond',
    speaker: 'Jacqui Read',
    room: 'FROBISHER 5',
  },
  {
    id: 'thu-1600-t5',
    track: 5,
    kind: 'talk',
    title: 'Mastering containers: a practical guide for developers',
    speaker: 'Oliver Sturm',
    room: 'FROBISHER 1',
  },
  {
    id: 'thu-1600-t6',
    track: 6,
    kind: 'talk',
    title:
      'Keep architecture simple, sir: you don’t need microservices yet',
    speaker: 'Sebastian Nilsson',
    room: 'FROBISHER 3',
  },
  {
    id: 'thu-1600-t7',
    track: 7,
    kind: 'talk',
    title:
      'Fitness function-driven architecture augmented by GenAI',
    speaker: 'Neal Ford',
    room: 'FROBISHER 2',
  },
];

/** PDF page 4 prints this grid under “Thursday 14 May”; page 3 ends with “Wednesday 13 May”. Same titles transcribed for Wed + Thu pickers. */
function cloneWedIdsFromThu(sessions: Session[]): Session[] {
  return sessions.map((s) => ({
    ...s,
    id: s.id.replace(/^thu-/, 'wed-'),
  }));
}

const wed0930 = cloneWedIdsFromThu(thu0930);
const wed1130 = cloneWedIdsFromThu(thu1130);
const wed1400 = cloneWedIdsFromThu(thu1400);
const wed1600 = cloneWedIdsFromThu(thu1600);

export const ALL_SLOTS: Slot[] = [
  {
    id: 'mon-conf-keynote',
    date: '2026-05-11',
    start: '09:30',
    end: '11:00',
    label: 'Keynote',
    sessions: [monConfKeynote],
    requiresChoice: false,
  },
  {
    id: 'mon-conf-1130',
    date: '2026-05-11',
    start: '11:30',
    end: '13:00',
    label: 'Sessions',
    sessions: mon1130,
    requiresChoice: true,
  },
  {
    id: 'mon-conf-1400',
    date: '2026-05-11',
    start: '14:00',
    end: '15:30',
    label: 'Sessions',
    sessions: mon1400,
    requiresChoice: true,
  },
  {
    id: 'mon-conf-1600',
    date: '2026-05-11',
    start: '16:00',
    end: '17:30',
    label: 'Sessions',
    sessions: mon1600,
    requiresChoice: true,
  },
  {
    id: 'tue-0930',
    date: '2026-05-12',
    start: '09:30',
    end: '11:00',
    label: 'Sessions',
    sessions: tue0930,
    requiresChoice: true,
  },
  {
    id: 'tue-1130',
    date: '2026-05-12',
    start: '11:30',
    end: '13:00',
    label: 'Sessions',
    sessions: tue1130,
    requiresChoice: true,
  },
  {
    id: 'tue-1400',
    date: '2026-05-12',
    start: '14:00',
    end: '15:30',
    label: 'Sessions',
    sessions: tue1400,
    requiresChoice: true,
  },
  {
    id: 'tue-1600',
    date: '2026-05-12',
    start: '16:00',
    end: '17:30',
    label: 'Sessions',
    sessions: tue1600,
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
];

const monBreaksExtra: BreakBlock[] = [
  {
    id: '2026-05-11-morning-coffee',
    date: '2026-05-11',
    start: '11:00',
    end: '11:30',
    title: 'Coffee break',
  },
  {
    id: '2026-05-11-lunch',
    date: '2026-05-11',
    start: '13:00',
    end: '14:00',
    title: 'Lunch break',
  },
  {
    id: '2026-05-11-afternoon-coffee',
    date: '2026-05-11',
    start: '15:30',
    end: '16:00',
    title: 'Coffee break',
  },
  {
    id: '2026-05-11-drinks',
    date: '2026-05-11',
    start: '17:30',
    end: '19:00',
    title: 'Drinks reception',
  },
];

export const ALL_BREAKS: BreakBlock[] = [
  ...monBreaksExtra,
  ...breaksForDate('2026-05-12', 'tue'),
  ...breaksForDate('2026-05-13', 'wed'),
  ...breaksForDate('2026-05-14', 'thu'),
];

/** Full-day workshops — mutually exclusive with Monday conference track picks */
export const MONDAY_WORKSHOP_SLOT: Slot = {
  id: 'mon-workshop',
  date: '2026-05-11',
  start: '09:30',
  end: '17:30',
  label: 'Pre-conference workshop',
  sessions: MONDAY_WORKSHOPS,
  requiresChoice: true,
};

export const FRIDAY_WORKSHOP_SLOT: Slot = {
  id: 'fri-workshop',
  date: '2026-05-15',
  start: '09:30',
  end: '17:00',
  label: 'Post-conference workshop',
  sessions: FRIDAY_WORKSHOPS,
  requiresChoice: true,
};

export const WORKSHOP_SLOTS: Slot[] = [
  MONDAY_WORKSHOP_SLOT,
  FRIDAY_WORKSHOP_SLOT,
];
