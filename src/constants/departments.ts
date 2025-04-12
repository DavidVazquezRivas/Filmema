export const DEPARTMENTS = [
  'Acting',
  'Art',
  'Camera',
  'Costume & Make-Up',
  'Creator',
  'Crew',
  'Directing',
  'Editing',
  'Lighting',
  'Production',
  'Sound',
  'Visual Effects',
  'Writing',
] as const

export type Department = (typeof DEPARTMENTS)[number]
