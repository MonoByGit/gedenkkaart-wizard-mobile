# Memortium Design System

Memortium bewerkt portretfoto's van overledenen voor uitvaartprofessionals: uitvaartondernemers,
drukkers en fotografen sturen de foto in die de familie aandraagt, Memortium levert binnen een
werkdag een bewerkt portret dat op de kaart, het scherm in de aula en in het boekje kan.
Levenslied is een subproduct: een lied geschreven op het verhaal van de overledene.

Het systeem dekt web en druk in dezelfde toon: waardig en rustig, maar rustig betekent niet leeg.

## Bronnen

- Aangehechte map `Memortium Service Portal/`: de echte codebase van memortium.nl. Hieruit zijn
  `app/styles/theme.css` en `app/styles/fonts.css` letterlijk overgenomen in `tokens/`, en de
  tarieven en levertijden uit `app/marketing/` (FAQ, voorwaarden, contact).
- Aangehechte map `Memortium designsysteem/`: de eerdere versie van dit systeem, gemaakt in een
  losse sessie. Alles in dit project is daaruit overgezet: tokens, componenten, kaarten,
  UI-kits en assets, met de waarden onveranderd.
- Die versie is gebouwd op het designdocument `Memortium Designsysteem.dc.html` (tien secties),
  dat op zijn beurt is gecontroleerd tegen de codebase van memortium.nl
  (`app/styles/theme.css` en `app/globals.css`). Waarden hier zijn normatief, geen voorstel.
- Het designdocument zelf is niet meegekomen: het draait op een eigen runtime en hoort niet in
  een designsysteem-project. De inhoud staat volledig in deze readme en in `guidelines/`.
- De portaal-kit is niet tegen de echte portaalcode gecontroleerd en is dus een weergave volgens
  het systeem, geen recreatie.

## De vijf regels

1. Een letter: Nunito Sans, onderscheid door gewicht en grootte.
2. Geen accentkleur. De huidtint van het portret is de enige kleur; alleen Levenslied mag warm worden.
3. Nooit een scherpe hoek: 1.5rem is de basis, knoppen zijn pillen.
4. Zwaar boven licht: label, titel, subtitel, in die volgorde.
5. Het bewerkte portret is de held; het origineel is de inzet.

## Content fundamentals

De klant is een professional in een emotioneel vak. Schrijf zoals u met een uitvaartverzorger aan
tafel zou praten: helder, kort, zonder verkooptaal en zonder eufemismen.

- **Aanspreekvorm.** U-vorm, altijd. "Wij" voor Memortium, nooit "ik".
- **Zinnen.** Actief en kort. Korte alinea's, maximaal drie tot vier regels.
- **Casing.** Zinsstijl in koppen, geen Titel Met Hoofdletters. Alleen micro-labels staan volledig
  in hoofdletters, met letter-spacing 0.2em.
- **Leestekens.** Geen uitroeptekens. Geen em-dash; gebruik een komma, dubbele punt of punt.
  En-dash alleen in getalsbereiken: 5&ndash;6 mm, 120&ndash;150 g.
- **Wel:** "Binnen een werkdag terug." / "Wat het gezicht kenmerkt, blijft staan." /
  "U mag altijd bellen, ook 's avonds."
- **Niet:** "De mooiste herinnering, gegarandeerd." / "Heengegaan", "ingeslapen" en andere
  eufemismen / superlatieven en kortingstaal.
- **Getallen.** Bedragen als € 00 zolang tarieven niet bevestigd zijn. Tijden voluit: 17:00.
- **Toeschrijving bij citaten.** Functie en regio ("Uitvaartverzorger, Noord-Brabant"), nooit een
  naam of een familie.

## Visual foundations

**Kleur.** Zes neutrale waarden, geen accent. Papier #fcfcfd (nooit zuiver wit), tekst #1a1a1e,
donker vlak en primaire kleur #2d2d3a, licht vlak #f0f1f4, secundaire tekst #6b6b7a, rand
rgba(45,45,58,0.06). Tekst op een donker vlak is #ffffff (`--primary-foreground`), de primaire
knop draagt #fcfcfd. Eén functionele uitzondering: `--destructive: #943d3d`, uitsluitend voor
verwijderen en mislukken in het portaal. Er is geen groen voor succes en geen rood voor fouten;
die verschillen maakt u met gewicht en vlak. Donkere modus: papier #18181b, tekst #f4f4f5,
vlak #27272a, secundair #a1a1aa, primair #e4e4e7, destructive #ff453a. Druk kent geen donkere
modus.

**Typografie.** Nunito Sans en verder niets, in 300, 400, 500 en 700. 700 voor koppen en
micro-labels, 500 voor labels, 400 voor lopende tekst, 300 uitsluitend voor grotere inleidende
regels vanaf ongeveer 13 pt. Broodtekst 17 px op regelafstand 1,75, maximaal 66 tekens per regel:
lezers zijn vaak boven de zestig. Wie twijfelt tussen twee maten kiest de grootste.
EB Garamond staat in de codebase maar wordt precies een keer gebruikt en hoort niet in nieuw werk.

**Achtergrond.** Niet vlak, maar heel licht gelaagd: een radiale gradient van 3% zwart bovenaan
over een verticale gradient van #fcfcfd naar #f8f8fa. In druk vervalt dat en is papier gewoon papier.
Geen patronen, geen texturen, geen full-bleed sfeerbeeld dat geen portret is.

**Vorm.** `--radius` staat op 1.5rem en dat is de handtekening. Grote vlakken lopen op tot 2, 3 en
4 rem. Alles wat knop, badge of navigatie is, is volledig rond (999px). Nooit een scherpe hoek.
De beeldinzet staat op 1rem.

**Randen en schaduw.** Een randdikte, een randkleur: 1px rgba(45,45,58,0.06), in interactieve
velden rgba(45,45,58,0.14). Een kaartschaduw: `0 4px 20px -5px rgba(0,0,0,.05)`. De primaire knop
draagt `0 10px 30px -10px rgba(26,26,30,.4)`, de zwevende navigatie `0 25px 60px rgba(0,0,0,.12)`.
Meer schaduwen zijn er niet.

**Transparantie en blur.** Glas alleen boven beeld of textuur, nooit boven een egaal vlak:
subtiel blur(20px) saturate(110%), standaard blur(32px) saturate(140%), intens blur(60px)
saturate(120%), navigatie blur(40px) saturate(140%). In druk vervalt glas en wordt het #f0f1f4.

**Animatie.** Terughoudend. Primaire knop: dekking naar 90% en 2 px omhoog in 300ms op
`cubic-bezier(.16,1,.3,1)`. Secundaire knop: vulling en rand donkerder in 200ms. Tekstlink:
kleur in 160ms. Geen bounces, geen inschuivende secties, geen parallax.

**Hover en press.** Hover verandert dekking, vulling of rand, nooit de vorm of de maat.
Focus zet de veldrand op #2d2d3a. Uitgeschakeld: vlak #f0f1f4, tekst #6b6b7a, dekking 50%.

**Beeld.** Het bewerkte portret is de held, het origineel de aanleiding. Oplevering altijd staand
3:4, ook als het origineel liggend binnenkwam; de ogen op een derde van boven. Het origineel staat
als inzet van 30% breedte rechtsonder, 20 px van de rand (druk 5 mm), met een haarlijn van 0,25 mm
in papierkleur. Nooit twee even grote beelden naast elkaar, geen schuifbalk, geen voor-na-etiket,
geen kader om het geheel. Bijschrift onder het beeld, nooit erin. Een portret verschijnt alleen
met schriftelijke toestemming van de nabestaanden.

**Social.** Veilige marge 8% van de korte zijde, in een story 12% boven en 18% onder vrij voor de
interface van het platform. Vier formaten: 1080×1080, 1080×1350, 1080×1920 en 1200×627. Het
woordmerk staat altijd in beeld, minimaal 120 px breed op 1080. De post zelf heeft rechte hoeken,
het platform rondt af; vlakken binnen de post volgen de radii. Tekst op beeld alleen met een
beschermgradient van rgba(26,26,30,0) naar .72, en nooit over een gezicht. Titel 90 tot 100 px op
1080, micro-label 24 px, bijschrift nooit onder 28 px. Hoogstens een donker vlak per reeks.

**Layout.** Sectieritme: micro-label, titel, subtitel, met 16 px ertussen en 40 px naar de inhoud.
Titels breken over twee regels op een betekenisvol punt. Ruimteschaal 4 / 8 / 16 / 24 / 40 / 56 /
80 / 120 px, met een millimeter-tegenhanger voor druk. De navigatie zweeft en is geen balk.

## Iconography

De iconenset is **Lucide** (`lucide-static@0.475.0`), op streekdikte **1,5** zodat hij bij de
haarlijnen van het systeem past. De geometrie staat inline in `components/core/Icon.jsx`, dus er
is geen netwerk nodig en een icoon staat er meteen. De SVG's van Lucide staan op `stroke="currentColor"`,
dus een icoon neemt altijd de tekstkleur over; er is geen icoonkleur. Gebruik het component
`Icon` en niets anders: geen losse SVG's, geen icoonfont, geen emoji, geen unicode-tekens
als icoon.

De regel is spaarzaamheid, niet volledigheid. Een icoon komt er alleen bij als een woord het
niet redt: downloaden, sluiten, terug, zoeken, uploaden. Het micro-label blijft de eerste keuze
en staat nooit met een icoon ernaast “voor de duidelijkheid”.

De veertien namen die het systeem kent: `download`, `upload`, `file-text`, `search`, `calendar`,
`arrow-left`, `arrow-right`, `chevron-right`, `chevron-down`, `check`, `x`, `phone`, `mail`,
`printer`. Een onbekende naam rendert niets en waarschuwt in de console. Wilt u een naam
toevoegen, neem dan de echte pathdata uit Lucide over in `GLYPHS`; teken er geen zelf bij.

Wat verder de plaats van iconen inneemt:
- **Micro-labels.** Een label in hoofdletters benoemt de soort, zoals elders een icoon doet.
- **Vlak en gewicht.** Status verschilt in vlak (gevuld, licht, alleen rand), niet in kleur of symbool.
- **Geometrie.** De golfbalkjes en de afspeelknop binnen Levenslied en de voortgangsbalk zijn CSS-
  vormen, geen iconen. Getekende illustraties bestaan niet.
- **Het woordmerk** is het enige merkbeeld: `assets/memortium-woordmerk.svg` (#1a1a1e),
  `-wit.svg` (#fcfcfd) en `-currentcolor.svg` (alleen inline bruikbaar; als `<img>` werkt
  currentColor niet, want de kleur zit op het `<path>`).

In druk vervallen iconen. Een brochure of kaart draagt geen pictogrammen.

## Intentional additions

Het designdocument beschrijft tien onderdelen. Voor gebruik als component zijn die opgesplitst in
losse primitieven met een eigen propscontract; er is niets toegevoegd wat het document niet
beschrijft. Twee opsplitsingen zijn een keuze:

- `Field`, `SelectField` en `TextareaField` komen uit het ene onderdeel "Formuliervelden" (6.3).
- `FloatingNav` en `SiteFooter` komen uit het ene onderdeel "Navigatie & footer" (6.4).

Later toegevoegd op verzoek, omdat het systeem er anders geen portaal of volledig formulier mee
kan bouwen:

- `Icon`, de Lucide-set met de geometrie inline. Het document kende geen iconen; zonder dit
  component wordt elke downloadknop een losse SVG.
- `Checkbox`, `Radio`, `Switch`, `DateField`, `SearchField`, `FileDrop` en `Fieldset`. Alle zeven
  volgen de bestaande veldopmaak: pil van 26px, hoogte 52, rand `--border-strong`, focus op
  `--primary`.
- De twaalf portaalblokken: `Sidebar`, `Breadcrumb`, `Tabs`, `Pagination`, `PageHeader`,
  `KeyValueList`, `SummaryRow`, `FileRow`, `EmptyState`, `Dialog`, `Toast` en `Skeleton`. Het
  designdocument beschrijft geen portaal; deze twaalf zijn de opmaak van dat document toegepast op
  lijst, detail en terugkoppeling. Twee keuzes zijn nieuw en staan hier vast: de lijn boven een
  totaal is `--primary` in plaats van `--border`, en het laadvlak ademt in dekking in plaats van
  een glans die eroverheen schuift.

## Index

Begin bij `overzicht.html`: een schil met een vaste zijbalk waarin elke kaart, kit en template
opent zonder dat u de navigatie kwijtraakt.

**Stijl**
- `styles.css` (entry, alleen imports) en `tokens/`: `fonts`, `colors`, `typography`, `spacing`,
  `shape`, `motion`, `levenslied`, `base`.

**Componenten** (35)
- `components/core/`: `Button`, `Badge`, `Card`, `GlassCard`, `Icon`
- `components/forms/`: `Field`, `SelectField`, `TextareaField`, `Checkbox`, `Radio`, `Switch`,
  `DateField`, `SearchField`, `FileDrop`, `Fieldset`
- `components/navigation/`: `FloatingNav`, `SiteFooter`, `Sidebar`, `Breadcrumb`, `Tabs`,
  `Pagination`
- `components/content/`: `SectionHeader`, `PriceCard`, `DataTable`, `Quote`, `PageHeader`,
  `KeyValueList`, `SummaryRow`, `FileRow`
- `components/feedback/`: `EmptyState`, `Dialog`, `Toast`, `Skeleton`
- `components/brand/`: `Wordmark`, `PortraitFigure`

**UI-kits**
- `ui_kits/website/`: homepage van memortium.nl
- `ui_kits/portaal/`: Service Portal, opdrachten en facturen
- `ui_kits/levenslied/`: subproductpagina met het warme accent
- `ui_kits/drukwerk/`: A4-brochure, omslag, binnenpagina en stramien

**Templates** (de startpunten die een consumerend project kan kiezen)
- `templates/website/`: homepage van memortium.nl
- `templates/portaal/`: Service Portal, met werkende panelen en rijselectie
- `templates/levenslied/`: subproductpagina met het warme accent
- `templates/drukwerk/`: A4-brochure, omslag, binnenpagina en stramien
- `templates/facturen/`: facturenlijst met tabs en zoeken, detailpagina met optelblok en download
- `templates/social/`: vier social-formaten met het stramien en de veilige marges

**Kaarten**
- `guidelines/`: 23 specimenkaarten in de groepen Colors, Type, Shape, Spacing, Brand,
  Levenslied en Print.

**Assets**
- `assets/`: woordmerk in drie varianten, twee portretten (bewerkt en origineel) en een
  ondergrond voor glasvoorbeelden.

**Overig**
- `SKILL.md`: maakt dit systeem bruikbaar als Agent Skill buiten deze omgeving.
- `CLAUDE.md`: de schrijfregels die in alle output gelden.
- `thumbnail.html`: de tegel van dit systeem op de startpagina.
- `guidelines/Samenvatting voor Open Brain.md`: korte samenvatting van het systeem.

## Tarieven en levertijden

Bevestigd, overgenomen uit `app/marketing/` in de codebase. Alle bedragen inclusief btw.

| Pakket | Prijs | Levering |
| --- | --- | --- |
| Essentieel portret | € 49 | binnen 24 uur |
| Impuls portret (spoed) | € 99 | binnen 4 uur, bij bestelling vóór 14:00, binnen openingstijden |
| Ceremoniepakket Levenslied | € 249 | binnen 24 uur, inclusief 3 uitvoeringen en een printbaar tekstblad |

Het proefportret blijft kosteloos: pas als het resultaat wordt gebruikt, geldt de reguliere
prijsstelling.

## Openstaand

- Het citaat in de kits is plaatsvervangend tot er een echte toeschrijving is.
- De factuurbedragen in de portaal-kit zijn een rekensom op het Essentieel-tarief, geen echte data.
- De portaalblokken en de social-formaten zijn er nu wel. Wat nog niet bestaat: een berichten- of
  gesprekscomponent, een grafiek, en een kaartcomponent voor adressen. Leg voor voordat u die
  toevoegt.
- Nunito Sans wordt van Google Fonts geladen. Lever de fontbestanden aan als het systeem
  offline of in druksoftware gebruikt moet worden.
- De portaal-kit is niet tegen de echte portaalcode gecontroleerd. De codebase is nu wel
  beschikbaar (`Memortium Service Portal/app/`), dus dit kan een echte recreatie worden.
- De componentkaarten in `components/*/` tonen de varianten als statische opmaak met dezelfde
  tokens, niet via de gebundelde React-componenten. Zeg het als u dat wilt omzetten.
