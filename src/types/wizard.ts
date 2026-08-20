export type Screen = 'home' | 'stap1' | 'stap2' | 'stap3' | 'voltooid';
export type Formaat = 'enkel' | 'gevouwen';
export type Smaak = 'volledige-foto' | 'vrijgezet';
export type Indeling = 'volledig' | 'kader' | 'naast-tekst' | 'sfeer-voorop';
export type Side = 'voor' | 'binnen' | 'achter';
export type Uitstraling = 'automatisch' | 'licht' | 'donker';
export type Uitlijning = 'links' | 'gecentreerd' | 'rechts';
export type SpreukPositie = 'boven' | 'onder';
export type SfeerZinPositie = 'boven' | 'tussenin' | 'midden';
export type FontPairingId = 'ingetogen' | 'klassiek' | 'sereen' | 'statig' | 'warm' | 'helder' | 'modern' | 'sierlijk';
export type OrnamentId = 'geen' | 'rand' | 'hoeken' | 'waas';
export type SizeOption = 'klein' | 'normaal' | 'groot';
export type SpreukTone = 'algemeen' | 'ziekte' | 'onverwacht' | 'religieus';
export type ActiveSheet = 'naam' | 'data' | 'spreuk' | 'binnen' | 'praktisch' | 'familie' | 'stijl' | 'thema' | null;
export type BinnenZoom = 'links' | 'rechts' | null;

export interface FamilieLid {
  id: number;
  naam: string;
  relatie: string;
  overleden: boolean;
  parentId: number | null;
}

export interface ThemeDef {
  id: string;
  naam: string;
  mood: string;
  bg: string;
  matLight: string;
  matDark: string;
  dark: boolean;
}

export interface FontPairingDef {
  id: FontPairingId;
  label: string;
  naamFamily: string;
  naamWeight: number;
  naamStyle?: 'normal' | 'italic';
  naamMult?: number;
  naamTransform?: 'none' | 'uppercase';
  naamTracking?: string;
  dataFamily: string;
  dataWeight: number;
  spreukFamily: string;
}

export interface OrnamentDef {
  id: OrnamentId;
  label: string;
  hint: string;
}

export interface PersonaDef {
  id: 'nana' | 'carien' | 'richard';
  naam: string;
  tagline: string;
  avatarUrl: string;
  photoVolledigUrl: string;
  photoCutoutUrl: string;
  photoBeforeUrl?: string;
  defaultState: Partial<WizardState>;
}

export interface SavedCreation {
  id: string;
  createdAt: string;
  personaId: string;
  title: string;
  state: WizardState;
}

export interface WizardState {
  screen: Screen;
  personaId: 'nana' | 'carien' | 'richard';
  photoVolledigUrl: string;
  photoCutoutUrl: string;
  formaat: Formaat;
  smaak: Smaak;
  indeling: Indeling;
  thema: string | null;
  side: Side;
  uitstraling: Uitstraling;
  uitlijning: Uitlijning;
  spreukPositie: SpreukPositie;
  sfeerZinPositie: SfeerZinPositie;
  fontPairing: FontPairingId;
  ornament: OrnamentId;
  naam: string;
  dataGeboorte: string;
  dataOverlijden: string;
  spreuk: string;
  binnenTekst: string;
  binnenZoom: BinnenZoom;
  locatieTekst: string;
  datumTijdTekst: string;
  samenzijnTekst: string;
  inzamelingTekst: string;
  afsluitingTekst: string;
  geenNamenOpKaart: boolean;
  kopregel: string;
  familieNamen: FamilieLid[];
  samenvattendeRegel: string;
  bredereKring: string;
  deFamilies: string;
  sizes: {
    naam: SizeOption;
    data: SizeOption;
    spreuk: SizeOption;
    binnen: SizeOption;
  };
  spreukTone: SpreukTone;
  activeSheet: ActiveSheet;
  locked: boolean;
  lockDialogOpen: boolean;
  fullscreenOpen: boolean;
  previewLightboxOpen: boolean;
  showDemoPhoto: boolean;
}
