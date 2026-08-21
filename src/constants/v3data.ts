import { PersonaData, ThemeDef, StyleDef, V3State } from '../types/v3';

export const PERSONAS: Record<string, PersonaData> = {
  greet: {
    id: 'greet',
    who: 'Greet van Doorn, 86 jaar',
    age: 86,
    call: 'Greet',
    name: 'Margaretha Geertruida van Doorn-Vermeer',
    partner: 'weduwe van Ton van Doorn',
    born: '14 maart 1940 te Utrecht',
    died: '18 augustus 2026 te De Bilt',
    head: 'Rust nu maar uit, je hebt het zo verdiend.',
    spreuk: 'Niet het afscheid telt,\nmaar de liefde die blijft.',
    herinnering: 'Moeder van drie kinderen, oma van zeven kleinkinderen en drie achterkleinkinderen. Altijd met een glimlach, altijd thee klaar.',
    slot: 'Het afscheid heeft in besloten kring plaatsgevonden.',
    aanhef: 'Dankbaar voor alles wat zij voor ons heeft betekend, nemen wij afscheid van',
    plechtigheid: 'Dinsdag 25 augustus om 14:00 uur in de aula van crematorium Daelwijck, Floridadreef 7 te Utrecht.',
    groet: 'Gelegenheid tot afscheid nemen vanaf 13:15 uur in de ontvangkamer.',
    condoleren: 'Na afloop is er gelegenheid elkaar te ontmoeten in de koffiekamer.',
    online: 'Condoleren kan via www.memortium.nl/greet-van-doorn',
    correspondentie: 'Familie van Doorn, p/a Kerklaan 14, 3731 ER De Bilt',
    fam: 'De familie',
    names: [
      { t: 'Hans en Marieke', l: 0 },
      { t: 'Daan en Sophie', l: 1 },
      { t: 'Lotte', l: 1 },
      { t: 'Nout', l: 2 },
      { t: 'Kees en Judith', l: 0 },
      { t: 'Bram', l: 1 },
      { t: 'Sanne', l: 1 },
      { t: 'Annelies en Peter', l: 0 },
      { t: 'Tim', l: 1 },
      { t: 'Emma', l: 1 },
      { t: 'Lieke', l: 1 },
      { t: 'Fleur', l: 2 },
      { t: 'Jesse', l: 2 }
    ],
    photoFull: '/assets/nana.jpg',
    photoCut: '/assets/nana-cutout.png',
    photoPos: '50% 28%',
    chin: 0.52,
    status: 'Pakket klaar',
    statusKeten: 'pakket klaar',
    whoStatus: 'aanu',
    nextStep: 'Klaarzetten voor het drukwerk',
    lastEvent: 'Vandaag 11:42 door Hans',
    order: 'Rouwkaart en bedankkaart · € 129',
    priceTotal: 129,
    quote: 'Het geboortejaar klopt niet, oma is van 1940 en niet van 1939.',
    quoteTime: '11:18',
    cardVal: '14 maart 1939',
    cardValField: 'born',
    hasPortrait: true,
    deliveredAt: 'Geleverd om 10:14',
    begeleider: 'Hans'
  },
  carien: {
    id: 'carien',
    who: 'Carien Bosman, 62 jaar',
    age: 62,
    call: 'Carien',
    name: 'Catharina Maria Bosman-van Vliet',
    partner: 'echtgenote van Wim',
    born: '3 mei 1964 te Rotterdam',
    died: '16 augustus 2026 te Gouda',
    head: 'Voor altijd in ons hart, voor altijd dichtbij.',
    spreuk: 'Zoals een vogel zachtjes wegvliegt,\nzo ben jij heengegaan.',
    herinnering: 'Haar warmte, haar tomeloze energie en haar liefde voor de tuin leven voort in alles wat zij achterliet.',
    slot: 'Geen bloemen, een gift aan het KWF wordt gewaardeerd.',
    aanhef: 'Intens verdrietig, maar vervuld van mooie herinneringen, laten wij weten dat is overleden',
    plechtigheid: 'Vrijdag 21 augustus om 11:30 uur in de Sint-Janskerk te Gouda.',
    groet: 'Samenkomst vanaf 10:45 uur.',
    condoleren: 'Aansluitend koffie en herinneringen in het Museumcafé.',
    online: 'Herinneringen delen via www.memortium.nl/carien-bosman',
    correspondentie: 'Wim Bosman, Tiendeweg 82, 2801 CX Gouda',
    fam: 'Haar gezin',
    names: [
      { t: 'Wim', l: 0 },
      { t: 'haar man', l: 0, it: true },
      { t: 'Merel en Tom', l: 0 },
      { t: 'Sam', l: 1 },
      { t: 'Robin', l: 1 },
      { t: 'Jasper en Lisa', l: 0 },
      { t: 'Finn', l: 1 },
      { t: 'Roos', l: 1 },
      { t: 'Marijke', l: 0, x: true },
      { t: 'haar zus', l: 0, it: true }
    ],
    photoFull: '/assets/carien.jpg',
    photoCut: '/assets/carien-cutout.png',
    photoPos: '50% 32%',
    chin: 0.54,
    status: 'De kaart wordt gemaakt',
    statusKeten: 'kaart wordt gemaakt',
    whoStatus: 'familie',
    nextStep: 'De familie werkt aan de kaart',
    lastEvent: 'Gisteren 16:30 door familie',
    order: 'Rouwkaart · € 79',
    priceTotal: 79,
    hasPortrait: true,
    deliveredAt: 'Geleverd gisteren 14:02',
    begeleider: 'Sanne'
  },
  richard: {
    id: 'richard',
    who: 'Richard Kastelein, 49 jaar',
    age: 49,
    call: 'Richard',
    name: 'Richard Alexander Kastelein',
    partner: 'vader van Liam en Zoë',
    born: '29 november 1976 te Hilversum',
    died: '19 augustus 2026 te Utrecht',
    head: 'Leef het leven voluit, elke dag.',
    spreuk: 'Een levensgenieter in hart en nieren,\nonvergetelijk en voor altijd bij ons.',
    herinnering: 'Muzikant, dromer, familieman en rots in de branding voor velen.',
    slot: 'Het afscheid vieren wij in stijl.',
    aanhef: 'Met diepe bewondering voor zijn moed en levenskracht nemen wij afscheid van',
    plechtigheid: 'Zaterdag 29 augustus om 15:30 uur in TivoliVredenburg, Vredenburgkade 11 te Utrecht.',
    groet: 'Inloop vanaf 14:45 uur.',
    condoleren: 'Na afloop proosten we op zijn leven.',
    online: 'Foto’s en verhalen via www.memortium.nl/richard-kastelein',
    correspondentie: 'Liam & Zoë Kastelein, Biltstraat 204, 3572 AT Utrecht',
    fam: 'Liam, Zoë en familie',
    names: [
      { t: 'Liam', l: 0 },
      { t: 'Zoë', l: 0 },
      { t: 'Marloes', l: 0 },
      { t: 'zijn geliefde', l: 0, it: true },
      { t: 'Rob en Marjan', l: 0 },
      { t: 'zijn ouders', l: 0, it: true },
      { t: 'Dennis en Sandra', l: 0 }
    ],
    photoFull: '/assets/richard.jpg',
    photoCut: '/assets/richard-cutout.png',
    photoPos: '50% 25%',
    chin: 0.50,
    status: 'Wacht op de foto',
    statusKeten: 'wacht op foto',
    whoStatus: 'ons',
    nextStep: 'Portretbewerking binnen 24 uur',
    lastEvent: 'Vandaag 09:15 door Memortium',
    order: 'Essentieel portret · € 49',
    priceTotal: 49,
    hasPortrait: false,
    deliveredAt: 'Wordt bewerkt',
    begeleider: 'Hans'
  }
};

export const THEMES: Record<string, ThemeDef> = {
  foto: {
    k: 'foto',
    n: 'Foto',
    img: '',
    scrim: 'rgba(26,26,30,0.65)',
    tints: [
      { n: 'Foto puur', chip: '#f7f6f4', mode: 'light', bare: true },
      { n: 'Zacht warm', chip: 'linear-gradient(135deg, #fbf7f2, #eee3d6)', mode: 'light', bare: true },
      { n: 'Diep nacht', chip: 'linear-gradient(135deg, #242220, #141312)', mode: 'dark', bare: true }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['waas', 'radial']]
  },
  stilte: {
    k: 'stilte',
    n: 'Stilte',
    img: 'url(/assets/thema-stilte.jpg)',
    pos: 'center 40%',
    scrim: 'rgba(28,32,38,0.72)',
    tints: [
      { n: 'Ochtendmist', chip: 'linear-gradient(135deg, #e8ecef, #d5dde3)', mode: 'light' },
      { n: 'Diepe avond', chip: 'linear-gradient(135deg, #1c2228, #0e1216)', mode: 'dark' },
      { n: 'Donker papier', chip: '#232930', mode: 'dark', bare: true }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['hoeken', 'corners'], ['kruisje', 'cross']]
  },
  dons: {
    k: 'dons',
    n: 'Dons',
    img: 'url(/assets/thema-dons.jpg)',
    pos: 'center 30%',
    scrim: 'rgba(40,34,30,0.68)',
    tints: [
      { n: 'Zand & wol', chip: 'linear-gradient(135deg, #f8f4ee, #e9dfd1)', mode: 'light' },
      { n: 'Terracotta', chip: 'linear-gradient(135deg, #dfcaba, #b89882)', mode: 'light', inv: true },
      { n: 'Houtskool', chip: 'linear-gradient(135deg, #2c2522, #1a1614)', mode: 'dark' }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['waas', 'radial']]
  },
  avondwater: {
    k: 'avondwater',
    n: 'Avondwater',
    img: 'url(/assets/thema-avondwater.jpg)',
    pos: 'center 50%',
    scrim: 'rgba(20,28,36,0.75)',
    tints: [
      { n: 'Schemerblauw', chip: 'linear-gradient(135deg, #1a2530, #0c1218)', mode: 'dark' },
      { n: 'Reflectie', chip: 'linear-gradient(135deg, #dce4eb, #b8c8d6)', mode: 'light' },
      { n: 'Diep oceaan', chip: 'linear-gradient(135deg, #101920, #060a0e)', mode: 'dark' }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['lijn', 'line']]
  },
  nachtbloem: {
    k: 'nachtbloem',
    n: 'Nachtbloem',
    img: 'url(/assets/thema-nachtbloem.jpg)',
    pos: 'center 35%',
    scrim: 'rgba(28,20,24,0.78)',
    tints: [
      { n: 'Fluweel', chip: 'linear-gradient(135deg, #241920, #130c10)', mode: 'dark' },
      { n: 'Rozemarijn', chip: 'linear-gradient(135deg, #ebd9e1, #d6b8c5)', mode: 'light' },
      { n: 'Inkt', chip: '#181216', mode: 'dark', bare: true }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['kruisje', 'cross']]
  },
  veldbloei: {
    k: 'veldbloei',
    n: 'Veldbloei',
    img: 'url(/assets/thema-veldbloei.jpg)',
    pos: 'center 45%',
    scrim: 'rgba(32,36,28,0.70)',
    tints: [
      { n: 'Weidegras', chip: 'linear-gradient(135deg, #f2f4ee, #dce1d4)', mode: 'light' },
      { n: 'Salie', chip: 'linear-gradient(135deg, #ced6c4, #a8b69b)', mode: 'light', inv: true },
      { n: 'Woud', chip: 'linear-gradient(135deg, #1c221a, #0e120c)', mode: 'dark' }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['hoeken', 'corners']]
  },
  vederlicht: {
    k: 'vederlicht',
    n: 'Vederlicht',
    img: 'url(/assets/thema-vederlicht.jpg)',
    pos: 'center 30%',
    scrim: 'rgba(36,36,38,0.65)',
    tints: [
      { n: 'Zuiver wit', chip: '#ffffff', mode: 'light', bare: true },
      { n: 'Zilverduif', chip: 'linear-gradient(135deg, #f4f4f6, #dedee4)', mode: 'light' },
      { n: 'Grafiet', chip: 'linear-gradient(135deg, #2a2a2e, #18181a)', mode: 'dark' }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['waas', 'radial']]
  },
  gloed: {
    k: 'gloed',
    n: 'Gloed',
    img: 'url(/assets/thema-gloed.jpg)',
    pos: 'center 40%',
    scrim: 'rgba(42,30,22,0.72)',
    tints: [
      { n: 'Warm goud', chip: 'linear-gradient(135deg, #fcf4eb, #f2dec9)', mode: 'light' },
      { n: 'Amber', chip: 'linear-gradient(135deg, #ecd3b6, #cfa87f)', mode: 'light', inv: true },
      { n: 'Nachtgloed', chip: 'linear-gradient(135deg, #2c1e14, #18100a)', mode: 'dark' }
    ],
    orn: [['geen', 'none'], ['rand', 'border'], ['lijn', 'line']]
  }
};

export const STYLES: StyleDef[] = [
  { n: 'Klassiek', d: '"EB Garamond", serif', b: '"EB Garamond", serif', tr: 'normal' },
  { n: 'Tijdloos', d: '"Playfair Display", serif', b: '"EB Garamond", serif', tr: '0.01em' },
  { n: 'Sierlijk', d: '"Cormorant Garamond", serif', b: '"EB Garamond", serif', tr: '0.02em' },
  { n: 'Statig', d: '"Marcellus", serif', b: '"Lora", serif', tr: '0.05em', caps: true },
  { n: 'Warm', d: '"Lora", serif', b: '"Lora", serif', tr: 'normal' },
  { n: 'Rustig', d: '"Spectral", serif', b: '"Spectral", serif', tr: 'normal' },
  { n: 'Verfijnd', d: '"Crimson Pro", serif', b: '"Crimson Pro", serif', tr: '0.02em' },
  { n: 'Modern', d: '"Alegreya Sans", sans-serif', b: '"Alegreya", serif', tr: '0.04em' }
];

export const SHARES = [
  { k: 'whatsapp' as const, n: 'WhatsApp', sub: 'Foto los, tekst kopieerbaar', ar: 1 },
  { k: 'instagram' as const, n: 'Instagram', sub: '4:5 met naam en data', ar: 4 / 5 },
  { k: 'facebook' as const, n: 'Facebook', sub: 'Liggend met overvloei', ar: 1200 / 627 }
];

export const SUGGEST: Record<string, Record<string, string[]>> = {
  spreuk: {
    Algemeen: [
      'Niet het afscheid telt,\nmaar de liefde die blijft.',
      'Voor altijd in ons hart,\nvoor altijd dichtbij.',
      'Wat je in je hart bewaart,\nraak je nooit meer kwijt.',
      'Rust zacht, lieve…'
    ],
    'Na ziekte': [
      'Je hebt gestreden,\nmoedig en vol kracht.\nNu is het tijd voor rust.',
      'Moe gestreden, maar omringd door liefde.',
      'Rust nu maar uit, je hebt het zo verdiend.'
    ],
    Onverwacht: [
      'Zo plotseling, zo oneerlijk.\nWoorden schieten tekort.',
      'Zomaar ineens uit ons leven weggerukt,\nmaar voor altijd in ons hart.',
      'Een leegte die niet te vullen is.'
    ],
    Religieus: [
      'In vrede thuis bij de Heer.',
      'De Heer is mijn herder,\nmij ontbreekt niets.',
      'Veilig in Jezus’ armen.'
    ]
  },
  aanhef: {
    Algemeen: [
      'Dankbaar voor alles wat zij voor ons heeft betekend, nemen wij afscheid van',
      'Intens verdrietig, maar vervuld van mooie herinneringen, laten wij weten dat is overleden',
      'Met veel verdriet geven wij kennis van het overlijden van onze lieve'
    ],
    'Na ziekte': [
      'Na een dappere strijd is van ons heengegaan',
      'Na een periode van afnemende gezondheid hebben wij afscheid moeten nemen van'
    ],
    Onverwacht: [
      'Totaal onverwacht is uit ons midden weggenomen',
      'Diep geschokt en intens verdrietig laten wij weten dat plotseling is overleden'
    ],
    Religieus: [
      'De Heer heeft tot Zich genomen',
      'In het vertrouwen op God is van ons heengegaan'
    ]
  },
  slot: {
    Algemeen: [
      'Het afscheid heeft in besloten kring plaatsgevonden.',
      'Het afscheid vindt plaats in besloten kring.',
      'Geen bloemen, liever een gift aan een goed doel.'
    ],
    'Na ziekte': [
      'Dank aan het verzorgend personeel voor de liefdevolle zorg.',
      'Wij danken het hospice voor de warme begeleiding.'
    ],
    Onverwacht: [
      'Wij danken iedereen voor het medeleven in deze moeilijke tijd.'
    ],
    Religieus: [
      'Correspondentieadres: Fam. Jansen, Kerkstraat 1.'
    ]
  }
};

export const INITIAL_V3_STATE: V3State = {
  screen: 'omgeving',
  persona: 'greet',
  role: 'operator',
  format: 'gevouwen',
  page: 'front',
  face: null,
  zoom: false,
  cat: null,
  prevCat: 'thema',
  theme: 'stilte',
  tint: 0,
  orn: 'geen',
  photo: 'volledig',
  shape: { front: 'recht', inside: 'recht', back: 'recht' },
  align: { front: 'center', inside: 'left', back: 'center' },
  style: 0,
  lay: { front: 0, inside: 0, back: 0 },
  locked: false,
  hasPhoto: true,
  sheet: null,
  block: null,
  selRow: -1,
  tone: 'Algemeen',
  sizes: {},
  edits: {},
  toast: '',
  infoOpen: false,
  dialogOpen: false,
  omgevingTab: 'aanu',
  selectedCrew: 'iedereen',
  archiefOpen: false,
  share: 'whatsapp',
  namencheckOpen: false,
  checkOk: { 'k:call': true, 'k:name': true, 'k:partner': true, 'n:0': true, 'n:1': true, 'n:2': true, 'n:3': true, 'n:4': true },
  checkAsked: {},
  editRowKey: null,
  questionModal: null,
  log: [
    { text: 'Dossier aangemaakt door Hans', at: '09:00' },
    { text: 'Portret bewerkt en geplaatst', at: '10:14' },
    { text: 'Thema ingesteld op Stilte', at: '10:30' },
    { text: 'Melding van de familie ontvangen: geboortejaar', at: '11:18' }
  ],
  copied: false,
  darkTheme: false
};
