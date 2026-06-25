// Shared data models for Lane 4. Edit the content in projects.ts / hurdles.ts /
// athlete.ts — these are just the shapes.

export type Project = {
  id: string;
  distanceMeters: number; // where on the 400m track this board appears
  title: string;
  blurb: string;
  stack: string[]; // rendered as badges
  codeSnippet?: string; // short, shown monospaced in the modal
  image?: string; // /public path; optional screenshot
  links: { live?: string; repo?: string };
};

export type Hurdle = {
  distanceMeters: number; // one of the 10 official 400mH marks
  label: string; // skill "cleared", e.g. "PWA"
};

export type Pb = { event: string; time: string; note?: string };

export type AthleteProfile = {
  name: string;
  lane: number;
  club: string;
  category: string; // e.g. "Men U20"
  events: string[];
  pbs: Pb[];
  achievements: { year: string; title: string; detail: string }[];
  bio: string;
  photos: string[];
  socials: { label: string; href: string }[];
};
