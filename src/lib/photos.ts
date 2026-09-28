// Placeholder photography from Unsplash (free to use under the Unsplash License).
// These are stock images, not TopAImate members. Swap them for real photos from
// your own events — with people's permission — as soon as you have them.

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const scenes = {
  dinner: { src: u("photo-1581954548122-4dff8989c0f7"), alt: "A small group raising glasses around a candlelit dinner table" },
  laughing: { src: u("photo-1681641095463-b4d3693a0ee3"), alt: "A woman laughing with friends around a table" },
  longTable: { src: u("photo-1765582870011-ff3cfdb06700"), alt: "Friends gathered around a long table sharing a meal" },
  builders: { src: u("photo-1522202176988-66273c2fd55f"), alt: "Three people laughing together over their laptops" },
  cafe: { src: u("photo-1590650046871-92c887180603"), alt: "Four women deep in conversation at a café table" },
  lounge: { src: u("photo-1758691737543-09a1b2b715fa"), alt: "A diverse group talking in a relaxed office lounge" },
  whiteboard: { src: u("photo-1532622785990-d2c36a76f5a6"), alt: "Two people sketching ideas on a whiteboard" },
};

// India Rooms
export const india = {
  boardroom: { src: u("photo-1577962917302-cd874c4e31d2"), alt: "A founder presenting to a small group around a meeting table in India" },
  squad: { src: u("photo-1758270705290-62b6294dd044"), alt: "A group of young builders gathered around one laptop" },
  buildNight: { src: u("photo-1681164315051-add1906a9b07"), alt: "Engineers working side by side on laptops in a coworking space" },
  oneOnOne: { src: u("photo-1672487729377-210da0b40bc0"), alt: "Two founders laughing in conversation outdoors" },
  team: { src: u("photo-1733826544839-2282050204e6"), alt: "A startup team crowded around a laptop, pointing at the screen" },
};

export const indianFaces = {
  womanBlazer: u("photo-1774850236254-f0aa024ca20c"),
  youngMan: u("photo-1757744705465-ea08b0ddc38a"),
  manSuit: u("photo-1771244688590-1e481dba1b5a"),
  womanSmiling: u("photo-1706943262459-3ef6ce03305c"),
  manGlasses: u("photo-1778692258270-bc0e80e975c0"),
};

export const faces = [
  u("photo-1758526213978-bfa055554ce8"),
  u("photo-1757744705465-ea08b0ddc38a"),
  u("photo-1576110598658-096ae24cdb97"),
  u("photo-1774850236254-f0aa024ca20c"),
  u("photo-1758600587815-b654d1405e83"),
  u("photo-1659422440915-d516c6dc932e"),
  u("photo-1634457000710-8ab0e71b2b87"),
  u("photo-1556474835-b0f3ac40d4d1"),
  u("photo-1760552069633-c05f246a5d8c"),
  u("photo-1614023342667-6f060e9d1e04"),
  u("photo-1765046300927-6c1827612c42"),
  u("photo-1789566115477-cff297dff362"),
];

// "Who you'll meet" — archetypes of the people the community is built for.
export const people: { face: string; role: string; line: string }[] = [
  {
    face: u("photo-1758526213978-bfa055554ce8"),
    role: "The founder",
    line: "I automate other people's work for a living. Some nights I wonder who automates mine.",
  },
  {
    face: indianFaces.womanSmiling,
    role: "The Bharat founder",
    line: "My users speak Tamil and pay by UPI. Most AI playbooks were written for someone else.",
  },
  {
    face: u("photo-1576110598658-096ae24cdb97"),
    role: "The ML engineer",
    line: "I can make the model better. I want to talk to people who ask whether it should ship.",
  },
  {
    face: indianFaces.youngMan,
    role: "The IT services engineer",
    line: "Nine years at a services major. I'm not scared of AI — I'm scared of being slow to it.",
  },
  {
    face: u("photo-1758600587815-b654d1405e83"),
    role: "The SDR lead",
    line: "My team went from sending emails to running agents. Nobody wrote the playbook for that.",
  },
  {
    face: indianFaces.womanBlazer,
    role: "The hiring manager",
    line: "Every CV says 'AI'. I'm looking for the people who have actually shipped something.",
  },
];
