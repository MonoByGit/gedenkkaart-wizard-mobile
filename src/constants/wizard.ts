import {
  ThemeDef,
  FontPairingDef,
  OrnamentDef,
  SpreukTone,
  WizardState,
  PersonaDef,
  SavedCreation,
  SfeerDef
} from '../types/wizard';

export const SFEREN: SfeerDef[] = [
  {
    id: 'automatisch',
    label: 'Foto-ambiance',
    sublabel: 'Harmonieus afgestemd op de foto',
    swatch: 'linear-gradient(135deg, #d8d0c5 0%, #3e332a 100%)',
    matLight: '#f4f2ee',
    matDark: '#221f1d',
    textColorLight: '#1a1a1e',
    textColorDark: '#fcfcfd',
    scrimMode: 'auto'
  },
  {
    id: 'warm-amber',
    label: 'Warm Amber',
    sublabel: 'Goudgloed en intieme warmte',
    swatch: 'linear-gradient(135deg, #f59e0b 0%, #92400e 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(245, 158, 11, 0.14) 0%, rgba(180, 83, 9, 0.26) 100%)',
    matLight: '#fdf8f0',
    matDark: '#2c1e12',
    textColorLight: '#2c1e12',
    textColorDark: '#fffbeb',
    scrimMode: 'donker'
  },
  {
    id: 'nachtblauw',
    label: 'Nachtblauw',
    sublabel: 'Diepe sereniteit en rust',
    swatch: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(30, 41, 59, 0.18) 0%, rgba(15, 23, 42, 0.32) 100%)',
    matLight: '#eef2f6',
    matDark: '#0f172a',
    textColorLight: '#0f172a',
    textColorDark: '#f8fafc',
    scrimMode: 'donker'
  },
  {
    id: 'zacht-linnen',
    label: 'Zacht Linnen',
    sublabel: 'Licht, ademend en puur',
    swatch: 'linear-gradient(135deg, #f5f5f4 0%, #d6d3d1 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(214, 211, 209, 0.18) 100%)',
    matLight: '#fafaf9',
    matDark: '#292524',
    textColorLight: '#1c1917',
    textColorDark: '#fafaf9',
    scrimMode: 'licht'
  },
  {
    id: 'salie-groen',
    label: 'Saliegroen',
    sublabel: 'Natuur, hoop en verstilling',
    swatch: 'linear-gradient(135deg, #84cc16 0%, #365314 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(132, 204, 22, 0.14) 0%, rgba(54, 83, 20, 0.26) 100%)',
    matLight: '#f4f7f2',
    matDark: '#1c2417',
    textColorLight: '#1c2417',
    textColorDark: '#f7fee7',
    scrimMode: 'donker'
  },
  {
    id: 'blush-roos',
    label: 'Blush Roze',
    sublabel: 'Zachtheid, tederheid en liefde',
    swatch: 'linear-gradient(135deg, #fb7185 0%, #881337 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(251, 113, 133, 0.14) 0%, rgba(136, 19, 55, 0.24) 100%)',
    matLight: '#fdf2f4',
    matDark: '#2d151c',
    textColorLight: '#2d151c',
    textColorDark: '#fff1f2',
    scrimMode: 'donker'
  },
  {
    id: 'oker-brons',
    label: 'Oker & Brons',
    sublabel: 'Klassiek aards en nobel',
    swatch: 'linear-gradient(135deg, #eab308 0%, #713f12 100%)',
    overlayGradient: 'linear-gradient(160deg, rgba(234, 179, 8, 0.15) 0%, rgba(113, 63, 18, 0.26) 100%)',
    matLight: '#fdfbf2',
    matDark: '#281c0e',
    textColorLight: '#281c0e',
    textColorDark: '#fefce8',
    scrimMode: 'donker'
  }
];

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
    id: 'klassiek',
    label: 'Klassiek & Tijdloos',
    pairingDescription: 'Playfair Display (Serif) & Nunito Sans',
    sampleText: 'In liefdevolle en dankbare herinnering',
    naamFamily: '"Playfair Display", serif',
    naamWeight: 600,
    naamStyle: 'normal',
    naamMult: 1,
    dataFamily: '"Nunito Sans", sans-serif',
    dataWeight: 400,
    spreukFamily: '"Nunito Sans", sans-serif',
    spreukWeight: 300,
    spreukStyle: 'italic'
  },
  {
    id: 'sereen',
    label: 'Sereen & Poëtisch',
    pairingDescription: 'Cormorant Garamond (Serif) & Montserrat',
    sampleText: 'Wat je in je hart bewaart, raak je nooit meer kwijt',
    naamFamily: '"Cormorant Garamond", serif',
    naamWeight: 600,
    naamStyle: 'italic',
    naamMult: 1.08,
    dataFamily: '"Montserrat", sans-serif',
    dataWeight: 400,
    spreukFamily: '"Cormorant Garamond", serif',
    spreukWeight: 500,
    spreukStyle: 'italic'
  },
  {
    id: 'ingetogen',
    label: 'Ingetogen & Puur',
    pairingDescription: 'EB Garamond (Serif) & Raleway',
    sampleText: 'Rust in stilte, omringd door onze liefde',
    naamFamily: '"EB Garamond", serif',
    naamWeight: 500,
    naamStyle: 'normal',
    naamMult: 1,
    dataFamily: '"Raleway", sans-serif',
    dataWeight: 400,
    spreukFamily: '"Raleway", sans-serif',
    spreukWeight: 400,
    spreukStyle: 'italic'
  },
  {
    id: 'helder',
    label: 'Modern & Krachtig',
    pairingDescription: 'Montserrat (Sans) & Lora (Serif)',
    sampleText: 'Voor altijd verankerd in onze gedachten',
    naamFamily: '"Montserrat", sans-serif',
    naamWeight: 600,
    naamStyle: 'normal',
    naamMult: 0.88,
    naamTransform: 'uppercase',
    naamTracking: '0.06em',
    dataFamily: '"Lora", serif',
    dataWeight: 400,
    spreukFamily: '"Lora", serif',
    spreukWeight: 400,
    spreukStyle: 'italic'
  },
  {
    id: 'statig',
    label: 'Statig & Waardig',
    pairingDescription: 'Marcellus (Serif) & Nunito Sans',
    sampleText: 'Een leven vol toewijding en warmte',
    naamFamily: '"Marcellus", serif',
    naamWeight: 400,
    naamStyle: 'normal',
    naamMult: 1,
    naamTracking: '0.03em',
    dataFamily: '"Nunito Sans", sans-serif',
    dataWeight: 400,
    spreukFamily: '"Nunito Sans", sans-serif',
    spreukWeight: 300,
    spreukStyle: 'italic'
  },
  {
    id: 'modern',
    label: 'Eigentijds & Minimalistisch',
    pairingDescription: 'Raleway (Sans) & Crimson Pro (Serif)',
    sampleText: 'Geen woorden voor dit grote gemis',
    naamFamily: '"Raleway", sans-serif',
    naamWeight: 500,
    naamStyle: 'normal',
    naamMult: 0.95,
    naamTracking: '0.02em',
    dataFamily: '"Crimson Pro", serif',
    dataWeight: 400,
    spreukFamily: '"Crimson Pro", serif',
    spreukWeight: 400,
    spreukStyle: 'italic'
  },
  {
    id: 'warm',
    label: 'Warm & Vertrouwd',
    pairingDescription: 'Merriweather (Serif) & Nunito Sans',
    sampleText: 'Dankbaar voor alle mooie momenten samen',
    naamFamily: '"Merriweather", serif',
    naamWeight: 700,
    naamStyle: 'normal',
    naamMult: 0.92,
    dataFamily: '"Nunito Sans", sans-serif',
    dataWeight: 400,
    spreukFamily: '"Nunito Sans", sans-serif',
    spreukWeight: 400,
    spreukStyle: 'italic'
  },
  {
    id: 'sierlijk',
    label: 'Sierlijk & Zacht',
    pairingDescription: 'Great Vibes (Script) & EB Garamond',
    sampleText: 'Tot in de eeuwigheid gekoesterd',
    naamFamily: '"Great Vibes", cursive',
    naamWeight: 400,
    naamStyle: 'normal',
    naamMult: 1.32,
    dataFamily: '"EB Garamond", serif',
    dataWeight: 400,
    spreukFamily: '"EB Garamond", serif',
    spreukWeight: 400,
    spreukStyle: 'italic'
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

export const PERSONAS: PersonaDef[] = [
  {
    id: 'nana',
    naam: 'Johanna "Nana" van der Berg',
    tagline: 'Zachtmoedige moeder en grootmoeder, levensgenieter in de tuin.',
    avatarUrl: '/assets/persons/Nana_After_Portrait.jpg',
    photoVolledigUrl: '/assets/persons/Nana_After_Portrait.jpg',
    photoCutoutUrl: '/assets/persons/Nana_After_Portrait_cutout.png',
    photoBeforeUrl: '/assets/persons/Nana_Before_Portrait.jpg',
    defaultState: {
      personaId: 'nana',
      photoVolledigUrl: '/assets/persons/Nana_After_Portrait.jpg',
      photoCutoutUrl: '/assets/persons/Nana_After_Portrait_cutout.png',
      formaat: 'gevouwen',
      smaak: 'volledige-foto',
      indeling: 'volledig',
      thema: 'waterlicht',
      fontPairing: 'klassiek',
      naam: 'Johanna van der Berg',
      dataGeboorte: '1938-03-12',
      dataOverlijden: '2026-08-04',
      spreuk: 'Dit is een voorbeeldzinnetje, u past het aan naar eigen woorden.',
      binnenTekst: 'Een leven vol toewijding, warmte en liefde voor hen die haar dierbaar waren. In stilte gedenken wij haar glimlach en zachtheid.',
      afsluitingTekst: 'Uit naam van de familie.',
      locatieTekst: 'Aula "Het Rustpunt", Kerkstraat 12, 1234 AB Voorburg',
      datumTijdTekst: 'Donderdag 28 augustus 2026, aanvang 14:00 uur',
      samenzijnTekst: 'Na de plechtigheid is er gelegenheid tot samenzijn in de ontvangstruimte.',
      inzamelingTekst: 'In plaats van bloemen wordt een bijdrage op prijs gesteld voor het Longfonds.',
      kopregel: 'Dit melden u bedroefd:',
      familieNamen: [
        { id: 1, naam: 'Vincent de Bruyne', relatie: '', overleden: false, parentId: null },
        { id: 2, naam: 'Jenny de Bruyne', relatie: '', overleden: false, parentId: null },
        { id: 3, naam: 'Jocelyne de Vries', relatie: '', overleden: false, parentId: 2 },
        { id: 4, naam: 'Mickey de Bruyne', relatie: '', overleden: false, parentId: 2 }
      ],
      samenvattendeRegel: 'broers en zussen',
      bredereKring: 'haar zus, schoonbroers, neven en nichten',
      deFamilies: 'de families De Bruyne en Van der Berg'
    }
  },
  {
    id: 'carien',
    naam: 'Carien Meijer - van Heemskerk',
    tagline: 'Stijlvol, vrolijk en altijd omringd door kunst, muziek en bloemen.',
    avatarUrl: '/assets/persons/Carien_After_Portrait.jpg',
    photoVolledigUrl: '/assets/persons/Carien_After_Portrait.jpg',
    photoCutoutUrl: '/assets/persons/Carien_After_Portrait_cutout.png',
    photoBeforeUrl: '/assets/persons/Carien_Before_Portrait.jpg',
    defaultState: {
      personaId: 'carien',
      photoVolledigUrl: '/assets/persons/Carien_After_Portrait.jpg',
      photoCutoutUrl: '/assets/persons/Carien_After_Portrait_cutout.png',
      formaat: 'enkel',
      smaak: 'vrijgezet',
      indeling: 'kader',
      thema: 'witte-dahlia',
      fontPairing: 'sereen',
      naam: 'Carien Meijer',
      dataGeboorte: '1952-11-04',
      dataOverlijden: '2026-07-19',
      spreuk: 'Wat je in je hart bewaart, raak je nooit meer kwijt.',
      binnenTekst: 'Zoals een bloem haar geur achterlaat, zo blijft haar liefde altijd om ons heen.',
      afsluitingTekst: 'In liefdevolle herinnering.',
      locatieTekst: 'Crematorium De Nieuwe Ooster, Kruislaan 126, 1097 GA Amsterdam',
      datumTijdTekst: 'Vrijdag 24 juli 2026, 15:30 uur',
      samenzijnTekst: 'Aansluitend heffen wij graag het glas op haar leven in het café.',
      inzamelingTekst: 'Donaties aan KWF Kankerbestrijding worden zeer gewaardeerd.',
      kopregel: 'In dankbaarheid voor alles wat zij ons gaf:',
      familieNamen: [
        { id: 10, naam: 'Maarten Meijer', relatie: 'echtgenoot', overleden: false, parentId: null },
        { id: 11, naam: 'Floris & Sophie Meijer', relatie: 'zoon en schoondochter', overleden: false, parentId: null },
        { id: 12, naam: 'Olivier †', relatie: '', overleden: true, parentId: 11 },
        { id: 13, naam: 'Juliette', relatie: '', overleden: false, parentId: 11 },
        { id: 14, naam: 'Annelies van Heemskerk', relatie: 'zus', overleden: false, parentId: null }
      ],
      samenvattendeRegel: 'kinderen en kleinkinderen',
      bredereKring: 'vrienden en naaste familieleden',
      deFamilies: 'de families Meijer en Van Heemskerk'
    }
  },
  {
    id: 'richard',
    naam: 'Richard "Ries" van Dongen',
    tagline: 'Avonturier, familieman en vakman met het hart op de juiste plek.',
    avatarUrl: '/assets/persons/Richard_After_Cases.jpg',
    photoVolledigUrl: '/assets/persons/Richard_After_Cases.jpg',
    photoCutoutUrl: '/assets/persons/Richard_After_Cases_cutout.png',
    photoBeforeUrl: '/assets/persons/Richard_Before_Cases.jpg',
    defaultState: {
      personaId: 'richard',
      photoVolledigUrl: '/assets/persons/Richard_After_Cases.jpg',
      photoCutoutUrl: '/assets/persons/Richard_After_Cases_cutout.png',
      formaat: 'gevouwen',
      smaak: 'volledige-foto',
      indeling: 'volledig',
      thema: 'avondwater',
      fontPairing: 'statig',
      naam: 'Richard van Dongen',
      dataGeboorte: '1961-06-22',
      dataOverlijden: '2026-08-11',
      spreuk: 'Een man van weinig woorden, maar van onvoorwaardelijke daden.',
      binnenTekst: 'Sterk tot het einde, trouw aan zijn principes. Bedankt voor alles wat je voor ons hebt opgebouwd en betekend.',
      afsluitingTekst: 'Rust zacht, lieve Ries.',
      locatieTekst: 'Uitvaartcentrum Bijdorp, Hoofdstraat 45, 3901 AK Veenendaal',
      datumTijdTekst: 'Zaterdag 22 augustus 2026, 11:00 uur',
      samenzijnTekst: 'Na afloop is er koffie en broodjes in de koffiekamer.',
      inzamelingTekst: 'Geen bloemen, een gift voor de Hartstichting is welkom.',
      kopregel: 'Bedroefd, maar met grote dankbaarheid:',
      familieNamen: [
        { id: 20, naam: 'Marja van Dongen - Koster', relatie: 'echtgenote', overleden: false, parentId: null },
        { id: 21, naam: 'Dennis van Dongen & Laura', relatie: 'zoon en schoondochter', overleden: false, parentId: null },
        { id: 22, naam: 'Cas', relatie: 'kleinzoon', overleden: false, parentId: 21 },
        { id: 23, naam: 'Saar', relatie: 'kleindochter', overleden: false, parentId: 21 },
        { id: 24, naam: 'Sandra van Dongen', relatie: 'dochter', overleden: false, parentId: null },
        { id: 25, naam: 'Henk van Dongen †', relatie: 'broer', overleden: true, parentId: null }
      ],
      samenvattendeRegel: 'kinderen en kleinkinderen',
      bredereKring: 'zwagers, schoonzussen, neven en nichten',
      deFamilies: 'de families Van Dongen en Koster'
    }
  }
];

export const INITIAL_STATE: WizardState = {
  screen: 'stap1',
  personaId: 'nana',
  photoVolledigUrl: '/assets/persons/Nana_After_Portrait.jpg',
  photoCutoutUrl: '/assets/persons/Nana_After_Portrait_cutout.png',
  formaat: 'enkel',
  smaak: 'volledige-foto',
  indeling: 'volledig',
  thema: null,
  side: 'voor',
  uitstraling: 'automatisch',
  sfeer: 'automatisch',
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

export const INITIAL_SAVED_CREATIONS: SavedCreation[] = [
  {
    id: 'creation-nana-1',
    createdAt: 'Vandaag, 14:32',
    personaId: 'nana',
    title: 'Johanna — Gevouwen Sfeerkaart',
    state: {
      ...INITIAL_STATE,
      ...PERSONAS[0].defaultState,
      screen: 'stap2',
      thema: 'waterlicht',
      formaat: 'gevouwen',
      smaak: 'vrijgezet',
      indeling: 'volledig'
    } as WizardState
  },
  {
    id: 'creation-carien-1',
    createdAt: 'Gisteren, 19:15',
    personaId: 'carien',
    title: 'Carien — Enkele Dahlia Kaart',
    state: {
      ...INITIAL_STATE,
      ...PERSONAS[1].defaultState,
      screen: 'stap2',
      thema: 'witte-dahlia',
      formaat: 'enkel',
      smaak: 'vrijgezet',
      indeling: 'kader'
    } as WizardState
  },
  {
    id: 'creation-richard-1',
    createdAt: '20 aug, 11:00',
    personaId: 'richard',
    title: 'Richard — Avondwater Statig',
    state: {
      ...INITIAL_STATE,
      ...PERSONAS[2].defaultState,
      screen: 'stap2',
      thema: 'avondwater',
      formaat: 'gevouwen',
      smaak: 'volledige-foto',
      indeling: 'volledig'
    } as WizardState
  }
];

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
  return `${(Math.round((pt * 1.3333 * 100) / 397 * 100) / 100)}cqw`;
}
