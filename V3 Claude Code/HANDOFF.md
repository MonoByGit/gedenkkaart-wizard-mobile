# HANDOFF — Memortium, omgeving van de uitvaartondernemer

Dit bestand is de bouwopdracht. Geef een coding agent dit bestand plus de map van dit project.
De ontwerpen zijn geen plaatjes maar werkende HTML: open ze, klik erdoor, en neem de waarden
letterlijk over.

**Opdracht in één regel:** bouw het scherm uit `Memortium Omgeving.dc.html` als productiecode in de
bestaande Memortium Service Portal, met de tokens uit `_ds/memortium-design-system-*/tokens/`.

---

## 1. Wat er al ligt

| Bestand | Wat het is | Hoe te gebruiken |
| --- | --- | --- |
| `Memortium Omgeving.dc.html` | het te bouwen scherm, interactief | ijkpunt voor layout, states, copy, motie |
| `Memortium Dossier.dc.html` | het dossier waar de kaart naartoe linkt | bestaat al als ontwerp, niet in scope |
| `Memortium Wizard.dc.html` | de kaartwizard van de familie | bron van de meldingen |
| `Overdracht omgeving.dc.html` | dezelfde spec als leesbaar document | voor mensen, niet voor de build |
| `_ds/memortium-design-system-*/tokens/*.css` | kleur, type, ruimte, vorm, motie | importeren, niets hardcoden |

Bekijk het ontwerp met de tweaks aan: `startFilter` (Aan u / Open / Alles), `openVraag`
(melding open of afgehandeld), `donker` (donkere modus), `aanUAccent`.

## 2. Scope

**Bouwen:** het overzichtsscherm met drie weergaven, de dossierkaart met acties, het correctieblad,
het archief met bestelgeschiedenis, donkere modus.

**Niet bouwen:** de kaartwizard, het dossierdetail, facturatie, een berichten- of chatmodule, een
notificatiecentrum, e-mail naar de familie, meertaligheid. Zie §7.

## 3. Datamodel

Neem deze vormen over; namen mogen aansluiten op de bestaande codebase, de semantiek niet.

```ts
type Who = 'aanu' | 'familie' | 'ons' | 'klaar';

type Dossier = {
  id: string;
  naam: string;              // roepnaam van de overledene
  initialen: string;         // fallback zolang er geen portret is
  portretUrl: string | null;
  begeleiderId: string;      // eigenaar binnen de onderneming
  who: Who;                  // bij wie de bal ligt
  status: string;            // label uit de statusketen, §5
  volgendeStap: string;      // één zin, wat er moet gebeuren
  laatsteGebeurtenis: string;// 'Gemeld door de familie, 13:04'
  bestelling: Bestelling;
  vervaltOp: string | null;  // ISO datum, twee maanden na laatste activiteit
  melding: Melding | null;
};

type Melding = {              // komt uit de wizard, altijd eenrichting
  veld: 'geboorte' | 'overlijden' | 'naam' | 'spreuk' | 'overig';
  tekst: string;              // wat de familie schreef
  gemeldOp: string;           // ISO
  huidigeWaarde: string;      // wat er nu op de kaart staat
  afgehandeld: null | { soort: 'gecorrigeerd' | 'nagekeken'; op: string };
};

type Bestelling = {
  portret: 'essentieel' | 'impuls';
  rouwkaart: boolean;
  bedankkaart: boolean;
  regels: { omschrijving: string; datum: string; centen: number }[];
};
```

**Afgeleide waarden, niet opslaan:**

```ts
const needsYou = (d, meId) =>
  (d.who === 'aanu' && d.begeleiderId === meId) || vervaltBinnen(d, 7);

// weergaven
aanU  = dossiers.filter(d => needsYou(d, meId));
open  = dossiers.filter(d => d.who !== 'klaar');
alles = dossiers.filter(d => binnenTweeMaanden(d));   // incl. dicht
```

## 4. Prijslogica

Eén functie, geen prijzen in de UI:

```ts
const PORTRET = { essentieel: 4900, impuls: 9900 };   // centen, incl. btw
const COMPLEET_REGULIER = 12900;                      // portret + beide kaarten
const KAARTEN = COMPLEET_REGULIER - PORTRET.essentieel; // 8000
const ROUWKAART = Math.round(KAARTEN * 0.6);          // 4800
const BEDANKKAART = KAARTEN - ROUWKAART;              // 3200
// spoed: het verschil van 5000 komt erbovenop -> compleet met spoed 17900
```

Weergave `€ 49`, met een spatie na het teken, geen decimalen zolang het hele euro's zijn.
De maandregel onder het archief toont alleen het totaal; de specificatie staat per dossier.

## 5. Statusketen

Vastgesteld. Labels verfijnen mag, de keten niet.

`dossier aangemaakt → wacht op de foto → het portret wordt bewerkt → het portret is klaar →
wacht op de familie → de kaart wordt gemaakt → het pakket is klaar → gedownload → dicht`

Een dicht dossier blijft twee maanden in **Alles** staan. In die periode kan de ondernemer nog
downloaden en bijbestellen. Daarna: archief, en de bestanden zijn verwijderd.

## 6. Componenten en gedrag

**`<WeergaveStrip>`** — sticky onder de titel, drie pillen in een spoor van `--secondary`.
Achtergrond is een verloop van `--background` naar `transparent` (58% → 100%), nooit een egaal
vlak: er is expliciet om gevraagd dat kaarten eronderdoor verdwijnen zonder harde rand.
Aan u draagt een pulserend bolletje plus het aantal in een gevulde pil; de andere twee een kaal
aantal. Wisselen zet de begeleiderfilter terug op Iedereen.

**`<BegeleiderChips>`** — alleen op Open en Alles. Iedereen · n, dan één chip per begeleider met
aantal. Actief = gevuld vlak.

**`<DossierKaart>`** — portretduim 46×61 (radius 14; zonder foto een streepjesrand met initialen),
naam 700, badge rechts uitgelijnd met `margin-left:auto`, status 500, volgende stap secundair, dan
laatste gebeurtenis (secundair) en bestelling (500). Aan zet bij u: papierwit vlak, rand
`--border-strong`, kaartschaduw. Anders: `--secondary`, `--border`, geen schaduw. Kleur speelt geen
rol, vlak en gewicht doen het werk.

Badge: `Aan u` gevuld met bolletje · `Bij Hans` (voornaam, anders kapt de naam af) · `Bij de
familie` · `Bij ons` · `Afgerond`, de laatste vier als lijnpil.

De hele kaartkop is een link naar het dossier. Daarnaast staat rechts in de knoppenrij een ronde
chevron naar hetzelfde dossier. Zet die chevron **niet** halverhoogte naast de tekst: daar leest hij
als uitklappen.

Knoppenrij per situatie:

| Situatie | Knoppen |
| --- | --- |
| melding van de familie | Gegeven corrigeren (gevuld), Laten staan (lijn) |
| geen foto ontvangen | Foto sturen |
| dossier van een collega | Overnemen van [voornaam] |
| vervalt binnen 7 dagen | Alles downloaden, in twee tikken |
| dicht, binnen twee maanden | Bedankkaart bijbestellen · € 32, Bestanden downloaden |

Twee tikken: de eerste tik maakt van de knop `Nog een tik en het staat klaar`, die na 4000 ms
terugvalt. Geldt voor elke onomkeerbare of aflopende actie.

**`<CorrectieBlad>`** — blad van onderaf, `translateY(104%)` → 0 in 500 ms. Per veld een tekenteller
tegen de ruimte op de kaart: geboorteplaats 34, geboortedatum 30 tekens. Knoppen: Corrigeren,
Sluiten. De oude waarde blijft in het dossier staan. `Laten staan` schrijft
`melding.afgehandeld = { soort: 'nagekeken' }` zonder blad.

**`<Archief>`** — de kop is de knop: label ARCHIEF, "n dossiers ouder dan twee maanden", chevron die
90° draait. Rijen: naam, datum · bedrag, chevron, gescheiden door één haarlijn. Een rij opent een
blad met de bestelgeschiedenis (wat, wanneer, hoeveel), daaronder Samen met de lijn in `--primary`
erboven. Eén knop: Sluiten. Geen download: de bestanden zijn er niet meer.

**`<Toast>`** — 4600 ms, `--primary` met `--primary-foreground`, geen icoon, geen actie erin.

## 7. Wat expres ontbreekt

Wij hebben geen e-mailadres van de familie. Er is dus **geen antwoordknop, geen berichtenkanaal en
geen notificatie naar de familie**. De familie meldt iets in de wizard, de ondernemer corrigeert het
gegeven of laat het staan, en de familie ziet dat terug in de wizard: de nieuwe waarde, of de
aantekening dat het is nagekeken, met datum. Bouw hier niets bij; als een ticket om "reageren naar
de familie" vraagt, is dat een productbeslissing, geen implementatiedetail.

## 8. Stijl, hard

- Kleur, type, ruimte, vorm en motie komen uit de tokens. Nul hexwaarden in componentcode.
- Eén letter: Nunito Sans in 300, 400, 500, 700. 300 alleen boven ~17 px.
- Radius: vlakken 1.5rem en hoger, alles wat knop of badge is volledig rond.
- Eén randdikte (1px), één kaartschaduw, één knopschaduw. Meer bestaat niet.
- Geen accentkleur. Geen groen voor goed, geen rood voor fout; verschil maak je met vlak en gewicht.
  `--destructive` alleen voor verwijderen.
- Iconen: Lucide op streekdikte 1,5, alleen waar een woord het niet redt. Geen emoji.
- Donkere modus: `data-theme="dark"`, dezelfde regels, andere waarden. Geen aparte componenten.
- Motie: opkomen 500 ms `cubic-bezier(.16,1,.3,1)`, wisselen 350 ms, bladen 500 ms, bolletje 2,8 s.
  Geen bounce, geen parallax, geen inschuivende secties.
- Copy: u-vorm, zinsstijl, geen uitroeptekens, geen em-dash, geen eufemismen. Neem de Nederlandse
  strings letterlijk over uit het ontwerp; ze zijn met de opdrachtgever doorgenomen.

## 9. Toegankelijkheid

Raakvlakken minimaal 44 px. Lopende tekst niet onder 12,5 px, broodtekst 17 px op 1,75.
Focus zichtbaar via `outline` op `--primary`, nooit alleen kleurverschil. De badge is tekst, geen
kleursignaal. Bladen zijn een dialog met focus trap en Escape. Het bolletje is decoratief
(`aria-hidden`); het aantal staat als tekst in de knop.

## 10. Klaar is het als

1. De drie weergaven filteren zoals §3, met de juiste aantallen in de strip.
2. De strip blijft plakken en er is geen harde witte rand waar kaarten onderdoor gaan.
3. Aan u toont alleen eigen werk plus vervalwaarschuwingen; een dossier van een collega draagt
   diens voornaam en de knop Overnemen.
4. Corrigeren en Laten staan sluiten de melding, zetten de laatste gebeurtenis om, en verplaatsen
   het dossier uit Aan u.
5. Nergens een knop die een bericht naar de familie belooft.
6. Bedragen komen uit één prijsfunctie; € 129 en € 179 kloppen met 49/99 + 48/32.
7. Archief opent met de chevron, een rij opent de bestelgeschiedenis, en er staat geen download.
8. `data-theme="dark"` levert een volledig scherm zonder losse kleuren.
9. Geen hexwaarde en geen fontnaam in componentcode; alles via tokens.
10. Toetsenbord en schermlezer komen door de strip, de kaarten, de bladen en het archief.

## 11. Nog te beslissen, niet zelf invullen

1. Het accent op Aan u: nu donker vlak. Warm zou een uitbreiding van de systeemregel zijn.
2. De begeleiderlaag: chipfilter of een eigen weergave per begeleider.
3. De toegang: e-mailadres invullen, wachtscherm, verlopen link. Nog niet ontworpen.
4. De aantallen in het ontwerp (veertien archiefdossiers, maandtotaal € 374) zijn voorbeelddata.

Kom terug met vragen over 1 tot 4 voordat je ze zelf oplost.
