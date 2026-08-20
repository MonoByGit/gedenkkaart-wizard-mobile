import { ThemeDef, FontPairingDef, OrnamentDef, SpreukTone, WizardState } from '../types/wizard';

export const THEMES: ThemeDef[] = [
  {
    id: 'avondwater',
    naam: 'Avondwater',
    mood: 'Rustig water bij het vallen van de avond.',
    bg: 'linear-gradient(158deg,#182430 0%,#2f4a63 42%,#5e6f5f 76%,#c99f6c 100%)',
    matLight: '#eaeff3',
    matDark: '#1b2732',
    dark: true
  },
  {
    id: 'nachtbloem',
    naam: 'Nachtbloem',
    mood: 'Een bloem die opent in het donker.',
    bg: 'linear-gradient(158deg,#1c1521 0%,#3a2740 42%,#583349 76%,#7b4f57 100%)',
    matLight: '#f0ecef',
    matDark: '#241a29',
    dark: true
  },
  {
    id: 'stilte',
    naam: 'Stilte',
    mood: 'Licht, ademend, zonder onrust.',
    bg: 'linear-gradient(158deg,#e6e8ec 0%,#eef0f1 55%,#f4f2ec 100%)',
    matLight: '#f2f3f4',
    matDark: '#3a3d42',
    dark: false
  },
  {
    id: 'veldbloei',
    naam: 'Veldbloei',
    mood: 'Gras en bloei in zacht ochtendlicht.',
    bg: 'linear-gradient(158deg,#3f4c34 0%,#7a8355 42%,#b6ac77 76%,#e7dbaf 100%)',
    matLight: '#eeeee2',
    matDark: '#333921',
    dark: true
  },
  {
    id: 'waterlicht',
    naam: 'Waterlicht',
    mood: 'Het licht dat op stil water valt.',
    bg: "url('/assets/theme-waterlicht.jpg') center/cover no-repeat",
    matLight: '#eef1f0',
    matDark: '#26333a',
    dark: false
  },
  {
    id: 'late-bloei',
    naam: 'Late bloei',
    mood: 'Bloemen die de tijd hebben doorstaan.',
    bg: "url('/assets/theme-late-bloei.jpg') center/cover no-repeat",
    matLight: '#eef0f0',
    matDark: '#2e3438',
    dark: false
  },
  {
    id: 'verre-oever',
    naam: 'Verre oever',
    mood: 'Een pad dat oplost in het water.',
    bg: "url('/assets/theme-verre-oever.jpg') center/cover no-repeat",
    matLight: '#eef0ef',
    matDark: '#2b2b2b',
    dark: true
  },
  {
    id: 'witte-dahlia',
    naam: 'Witte dahlia',
    mood: 'Een laatste boeket bij het raam.',
    bg: "url('/assets/theme-witte-dahlia.jpg') center/cover no-repeat",
    matLight: '#f1f0ec',
    matDark: '#2c2a26',
    dark: false
  }
];

export const PAIRINGS: FontPairingDef[] = [
  {
    id: 'ingetogen',
    label: 'Ingetogen',
    naamFamily: '"EB Garamond", serif',
    naamWeight: 500,
    naamStyle: 'italic',
    naamMult: 1,
    dataFamily: '"EB Garamond", serif',
    dataWeight: 400,
    spreukFamily: '"EB Garamond", serif'
  },
  {
    id: 'klassiek',
    label: 'Klassiek',
    naamFamily: '"Playfair Display", serif',
    naamWeight: 600,
    naamStyle: 'normal',
    naamMult: 1,
    dataFamily: '"Lora", serif',
    dataWeight: 400,
    spreukFamily: '"Lora", serif'
  },
  {
    id: 'sereen',
    label: 'Sereen',
    naamFamily: '"Cormorant Garamond", serif',
    naamWeight: 600,
    naamStyle: 'italic',
    naamMult: 1.08,
    dataFamily: '"EB Garamond", serif',
    dataWeight: 400,
    spreukFamily: '"EB Garamond", serif'
  },
  {
    id: 'statig',
    label: 'Statig',
    naamFamily: '"Marcellus", serif',
    naamWeight: 400,
    naamStyle: 'normal',
    naamMult: 1,
    naamTracking: '0.03em',
    dataFamily: '"Crimson Pro", serif',
    dataWeight: 400,
    spreukFamily: '"Crimson Pro", serif'
  },
  {
    id: 'warm',
    label: 'Warm',
    naamFamily: '"Merriweather", serif',
    naamWeight: 700,
    naamStyle: 'normal',
    naamMult: 0.92,
    dataFamily: '"Merriweather", serif',
    dataWeight: 400,
    spreukFamily: '"Merriweather", serif'
  },
  {
    id: 'helder',
    label: 'Helder',
    naamFamily: '"Montserrat", sans-serif',
    naamWeight: 600,
    naamStyle: 'normal',
    naamMult: 0.86,
    naamTransform: 'uppercase',
    naamTracking: '0.05em',
    dataFamily: '"Lora", serif',
    dataWeight: 400,
    spreukFamily: '"Lora", serif'
  },
  {
    id: 'modern',
    label: 'Modern',
    naamFamily: '"Raleway", sans-serif',
    naamWeight: 500,
    naamStyle: 'normal',
    naamMult: 0.95,
    naamTracking: '0.01em',
    dataFamily: '"Crimson Pro", serif',
    dataWeight: 400,
    spreukFamily: '"Crimson Pro", serif'
  },
  {
    id: 'sierlijk',
    label: 'Sierlijk',
    naamFamily: '"Great Vibes", cursive',
    naamWeight: 400,
    naamStyle: 'normal',
    naamMult: 1.35,
    dataFamily: '"EB Garamond", serif',
    dataWeight: 400,
    spreukFamily: '"EB Garamond", serif'
  }
];

export const ORNAMENTS: OrnamentDef[] = [
  { id: 'geen', label: 'Geen', hint: 'Geen versiering, alleen het beeld.' },
  { id: 'rand', label: 'Rand', hint: 'Een fijne lijn rond de kaart.' },
  { id: 'hoeken', label: 'Hoeken', hint: 'Zachte accenten in de hoeken.' },
  { id: 'waas', label: 'Waas', hint: 'Een lichte gloed rond de randen.' }
];

export const PHRASES: Record<SpreukTone, string[]> = {
  algemeen: [
    'In liefde en dankbaarheid.',
    'Met liefde herdacht.',
    'Een leven vol warmte.'
  ],
  ziekte: [
    'Rust nu, na een lange strijd.',
    'De rust die u verdiende.',
    'Moe, maar niet verslagen.'
  ],
  onverwacht: [
    'Zo onverwacht, zo vroeg.',
    'Midden in het leven weggenomen.',
    'Geen woorden voor dit verlies.'
  ],
  religieus: [
    'In Gods hand geborgen.',
    'Tot wij elkaar weerzien.',
    'De Heer is mijn herder.'
  ]
};

export const MONTHS = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december'
];

export const MAX_NAAM = { klein: 48, normaal: 36, groot: 26 };
export const MAX_SPREUK = { klein: 95, normaal: 72, groot: 55 };
export const MAX_BINNEN = { klein: 600, normaal: 420, groot: 280 };

export const INITIAL_STATE: WizardState = {
  screen: 'stap1',
  formaat: 'enkel',
  smaak: 'volledige-foto',
  indeling: 'volledig',
  thema: null,
  side: 'voor',
  uitstraling: 'automatisch',
  uitlijning: 'gecentreerd',
  spreukPositie: 'boven',
  sfeerZinPositie: 'boven',
  fontPairing: 'klassiek',
  ornament: 'geen',
  naam: 'Johanna van der Berg',
  dataGeboorte: '1938-03-12',
  dataOverlijden: '2026-08-04',
  spreuk: 'Dit is een voorbeeldzinnetje, u past het aan naar eigen woorden.',
  binnenTekst: 'Dit is een voorbeeldtekst voor de binnenzijde, u past hem aan naar eigen woorden.',
  binnenZoom: null,
  locatieTekst: 'Aula "Het Rustpunt", Kerkstraat 12, 1234 AB Voorburg',
  datumTijdTekst: 'Donderdag 28 augustus 2026, aanvang 14:00 uur',
  samenzijnTekst: 'Na de plechtigheid is er gelegenheid tot samenzijn in de ontvangstruimte.',
  inzamelingTekst: 'In plaats van bloemen wordt een bijdrage op prijs gesteld voor het Longfonds.',
  afsluitingTekst: 'Uit naam van de familie.',
  geenNamenOpKaart: false,
  kopregel: 'Dit melden u bedroefd:',
  familieNamen: [
    { id: 1, naam: 'Vincent de Bruyne', relatie: '', overleden: false, parentId: null },
    { id: 2, naam: 'Jenny de Bruyne', relatie: '', overleden: false, parentId: null },
    { id: 3, naam: 'Jocelyne de Vries', relatie: '', overleden: false, parentId: 2 },
    { id: 4, naam: 'Mickey de Bruyne', relatie: '', overleden: false, parentId: 2 }
  ],
  samenvattendeRegel: 'broers en zussen',
  bredereKring: '',
  deFamilies: '',
  sizes: {
    naam: 'normaal',
    data: 'normaal',
    spreuk: 'normaal',
    binnen: 'normaal'
  },
  spreukTone: 'algemeen',
  activeSheet: null,
  locked: false,
  lockDialogOpen: false,
  fullscreenOpen: false,
  previewLightboxOpen: false,
  showDemoPhoto: true
};

export function formatDateDutch(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return '';
  const d = parseInt(parts[2], 10);
  const m = parseInt(parts[1], 10) - 1;
  const y = parts[0];
  return `${d} ${MONTHS[m]} ${y}`;
}

export function ptcqw(pt: number): string {
  // Convert standard pt (out of 397 width baseline) to container query width percentage
  return `${(Math.round((pt * 1.3333 * 100) / 397 * 100) / 100)}cqw`;
}
