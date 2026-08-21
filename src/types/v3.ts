export type PersonaId = 'greet' | 'carien' | 'richard';

export type ScreenMode = 'omgeving' | 'dossier' | 'editor' | 'drukproef';

export type Role = 'operator' | 'family';

export type Format = 'gevouwen' | 'enkel';

export type PageFace = 'front' | 'inside' | 'back';
export type ZoomFace = 'front' | 'left' | 'right' | 'back' | null;

export type CategoryRail = 'foto' | 'thema' | 'indeling' | 'stijl' | 'sfeer' | null;

export type ShareChannel = 'whatsapp' | 'instagram' | 'facebook';

export type WhoStatus = 'aanu' | 'hans' | 'familie' | 'ons' | 'klaar';

export interface NameRow {
  t: string; // text
  l: number; // level (0 = kind/naaste, 1 = kleinkind, 2 = achterkleinkind)
  it?: boolean; // italic / relation line
  x?: boolean; // deceased (dagger)
}

export interface PersonaData {
  id: PersonaId;
  who: string;
  age: number;
  call: string;
  name: string;
  partner?: string;
  born: string;
  died: string;
  head: string;
  spreuk: string;
  herinnering: string;
  slot: string;
  aanhef?: string;
  plechtigheid: string;
  groet?: string;
  condoleren?: string;
  online?: string;
  correspondentie?: string;
  fam: string;
  names: NameRow[];
  photoFull: string;
  photoCut: string;
  photoPos: string;
  chin: number;
  // Dossier & Omgeving metadata
  status: string;
  statusKeten: string;
  whoStatus: WhoStatus;
  nextStep: string;
  lastEvent: string;
  order: string;
  priceTotal: number;
  quote?: string;
  quoteTime?: string;
  cardVal?: string;
  cardValField?: string;
  hasPortrait: boolean;
  deliveredAt: string;
  begeleider: string;
}

export interface ThemeDef {
  k: string;
  n: string;
  img: string;
  pos?: string;
  scrim: string;
  tints: {
    n: string;
    chip: string;
    mode: 'dark' | 'light';
    inv?: boolean;
    bare?: boolean;
  }[];
  orn: [string, string][];
}

export interface StyleDef {
  n: string;
  d: string; // display font
  b: string; // body font
  tr: string; // tracking
  caps?: boolean;
}

export interface LogEntry {
  text: string;
  at: string;
}

export interface V3State {
  screen: ScreenMode;
  persona: PersonaId;
  role: Role;
  format: Format;
  page: PageFace;
  face: ZoomFace;
  zoom: boolean;
  cat: CategoryRail;
  prevCat: CategoryRail;
  theme: string;
  tint: number;
  orn: string;
  photo: 'volledig' | 'vrijgezet';
  shape: { front?: string; inside?: string; back?: string };
  align: { front: string; inside: string; back: string };
  style: number;
  lay: { front: number; inside: number; back: number };
  locked: boolean;
  hasPhoto: boolean;
  sheet: 'text' | 'namen' | 'afscheid' | null;
  block: string | null;
  selRow: number;
  tone: string;
  sizes: Record<string, number>;
  edits: Record<string, Partial<PersonaData>>;
  toast: string;
  infoOpen: boolean;
  dialogOpen: boolean;
  // Omgeving state
  omgevingTab: 'aanu' | 'open' | 'alles';
  selectedCrew: string;
  archiefOpen: boolean;
  // Drukproef state
  share: ShareChannel;
  namencheckOpen: boolean;
  checkOk: Record<string, boolean>;
  checkAsked: Record<string, boolean>;
  editRowKey: string | null;
  questionModal: { open: boolean; fieldKey: string; fieldLabel: string; value: string; prefill: string } | null;
  log: LogEntry[];
  copied: boolean;
  darkTheme: boolean;
}
