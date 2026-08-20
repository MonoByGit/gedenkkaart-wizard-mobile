# Handoff: Gedenkkaart Wizard (mobiele bestel-flow)

## Overview
Een mobiele wizard waarmee een nabestaande zelf een rouw-/gedenkkaart (bidprentje) samenstelt: formaat en foto-behandeling kiezen, thema kiezen, de kaart zelf personaliseren (voorkant, binnenzijde bij een gevouwen kaart, achterkant), en tot slot de kaart controleren en bevestigen. Onderdeel van het Memortium-bestelproces.

## About the Design Files
De bestanden in `source/` zijn **ontwerpreferenties gebouwd in HTML** (een interactief prototype), geen productiecode om 1-op-1 te kopiëren. De opdracht is: **dit ontwerp naschouwen en herbouwen in de omgeving van de doelcodebase** (React Native, native iOS/Android, of wat er al gekozen is) met de bestaande patronen en libraries van dat project. Is er nog geen omgeving, kies dan het framework dat het beste past bij "een bestelflow in de browser/mobiele web op een bestaande Next.js/React-marketingsite" (het huidige memortium.nl draait op web).

`source/Gedenkkaart Wizard.dc.html` is de brondatei van het prototype. Hij is geschreven in het interne templateformat van het ontwerptool (`{{ }}`-holes, `<sc-if>`/`<sc-for>`) en laadt een gebundeld design-system script — hij **opent niet standalone in een browser**. Gebruik hem als leesbare referentie voor structuur, exacte inline stijlwaarden en state-namen; gebruik dit README als de leidende spec.

## Fidelity
**Hoog (hifi).** Kleuren, typografie, spacing en de meeste interacties liggen vast. De ontwikkelaar moet dit pixel-getrouw naar de doelomgeving overzetten, met de bestaande component-library van dat project (buttons, velden, iconen, switch) in plaats van de HTML-implementatie te kopiëren.

## Design Tokens
Bron: `source/tokens/*.css` (Memortium design system, token-namen zijn de brontaal — houd ze aan in de doelcodebase als daar geen eigen equivalent bestaat).

**Kleur** (licht; er is geen donkere modus voor dit deel van het product)
- `--background: #fcfcfd`
- `--foreground: #1a1a1e`
- `--primary: #2d2d3a` / `--primary-foreground: #ffffff`
- `--secondary: #f0f1f4` (pill-achtergronden, tabs, vakjes)
- `--muted-foreground: #6b6b7a` (bijschriften, placeholders)
- `--border: rgba(45,45,58,.06)`, `--border-strong: rgba(45,45,58,.14)`
- `--cta: #1a1a1e` / `--cta-foreground: #fcfcfd` — de primaire knop is de tekstkleur, niet `--primary`
- Geen accentkleur. Alle kleur in de UI zit in het portret zelf, nergens anders.

**Typografie (UI-chrome)**
- Systeemlettertype: **Nunito Sans** (300/400/500/700), regular voor body, 500 voor labels/knoppen, 700 voor koppen en micro-labels.
- Schaal: micro 10px (700, hoofdletters, +0.2em tracking), caption 13px, label 15px, body 17px, lead 22px, h4 20px, h3 24px, h2 40px, h1 52px.
- Line-height: tight 1.05, heading 1.1, snug 1.2 (koppen), lead 1.6 (body/subtitel), body 1.75.

**Typografie (op de kaart zelf, "lettertype"-keuze in Stijl)**
Negen vaste font-pairings, elk met eigen gewicht/stijl voor naam, data en spreuk: Ingetogen (EB Garamond italic), Klassiek (Playfair Display + Lora — standaard), Sereen (Cormorant Garamond italic), Statig (Marcellus + Crimson Pro), Warm (Merriweather), Helder (Montserrat uppercase + Lora), Modern (Raleway + Crimson Pro), Sierlijk (Great Vibes cursief), en de systeemletter als "geen sierlijke stijl"-optie. Dit zijn bewust *serif/schrijfletters los van de Nunito Sans UI-letter* — alleen voor tekst die op de gedrukte kaart verschijnt.

**Vorm**
- Radius: basis 24px (velden, kleine kaarten), lg 32px (kaarten/blokken), pill 999px (knoppen, tabs, badges).
- Schaduw: card `0 4px 20px -5px rgba(0,0,0,.05)`, nav-sheet `0 25px 60px rgba(0,0,0,.12)`.

## Assets
Alle afbeeldingen in `source/assets/` zijn **placeholders** voor het prototype, niet te gebruiken in productie:
- `nana-volledig.jpg`, `nana-cutout.png`, `demo-portret.jpg` — voorbeeld-portret van de overledene (door de gebruiker te uploaden in het echte product).
- `theme-waterlicht.jpg`, `theme-late-bloei.jpg`, `theme-verre-oever.jpg`, `theme-witte-dahlia.jpg` — voorbeeldbeelden voor de vier sfeerthema's die als achtergrond dienen bij "Vrijgezet op thema".

## Screens / Views

Globale structuur: één full-screen mobiele flow, staat bijgehouden in `screen: 'stap1' | 'stap2' | 'stap3' | 'voltooid'`. Er is geen route-based navigatie — alles is state in één component.

### Stap 1 — Drie keuzes
**Doel:** formaat, foto-behandeling, kaart-indeling en thema kiezen; daarna naar Stap 2.
**Layout:** verticaal scrollende pagina, padding 20–28px zijkant. Bovenaan micro-label "STAP 1 VAN 3", h1 "Drie keuzes, dan staat de kaart" (28px/700), subtitel (16px, muted, max 34ch). Daaronder een **live mini-preview van de kaart** (gecentreerd, ~200px breed, `aspect-ratio` volgt formaat), die direct meebeweegt met elke keuze eronder.
**Secties (elk: micro-label + rij keuzetegels):**
1. *Formaat* — 2 tegels naast elkaar: "Enkel" (rechte kaart-outline) / "Gevouwen" (dubbelgevouwen icoon). Geselecteerd = klein streepje onder het label.
2. *Foto* — 2 tegels met echte thumbnail (aspect-ratio 3/4, radius, shadow-card, 2px rand indien geselecteerd): "Volledige foto" (foto vult het kader) / "Vrijgezet op thema" (foto vrijgesteld/uitgeknipt op transparante-ruit achtergrond).
3. *Indeling* — 3 of 4 tegels (kleine lijn-iconen): "Volledig", "In kader", "Naast tekst", en (alleen bij Gevouwen) "Sfeer voorop".
4. *Thema & sfeer* — grid van thema-tegels (kleurstaal/gradient-swatch boven, naam + korte omschrijving eronder); geselecteerd toont een rond vinkje rechtsboven op de swatch.
**Onderin:** vaste CTA-balk (`border-top`, padding 16/24/24px) met volledige-breedte primaire knop "Naar de kaart", disabled zolang geen thema gekozen is; erboven dan de hint "Kies eerst een thema."

### Stap 2 — Personaliseren
**Doel:** de daadwerkelijke tekst en stijl op voor-, binnen- en achterkant invullen.
**Layout:** bovenaan een terugknop (pijl + "Stap 2 van 3", navigeert naar Stap 1) links, en rechts een "Vastzetten"/"Vastgezet"-pilknop (opent een bevestigingsdialoog — zie Interacties). Daaronder gecentreerd een pil-tabgroep: **Voorkant / Binnenzijde (alleen bij Gevouwen) / Achterkant**.
**Voorkant:** de kaart wordt op ware schaal getoond (container-query gebaseerd, dus schaalt mee met de beschikbare breedte) met alle live tekst-lagen erop: spreuk (boven of onder, afhankelijk van instelling), naam, data — elk los tikbaar en opent een bottom-sheet om te bewerken. Placeholder-tekst ("Tik om de naam toe te voegen") toont wanneer een veld leeg is. Onder de kaart: hint "Precies zoals u het hier ziet, komt de kaart ook gedrukt uit." en twee knoppen "Stijl" / "Thema & sfeer" die de bijpassende sheets openen.
**Binnenzijde** (alleen relevant bij Formaat = Gevouwen): toont beide binnenpagina's naast elkaar op een spread; tikken op een pagina zoomt in op die pagina alleen (met eigen "Beide pagina's"-terugknop) en toont daaronder een knop naar de bijpassende sheet ("Tekst" links, "Praktische informatie" rechts).
**Achterkant:** toont de namenlijst van de familie (kopregel + rijen, ingesprongen bij partners/aanhang met een †-teken), met knop "Namen" eronder.
**Onderin:** vaste CTA-balk met primaire knop "Naar overzicht" → Stap 3.

### Stap 3 — Overzicht & bevestigen
**Doel:** laatste controle van de complete kaart vóór productie, puur read-only.
**Layout:** identieke structuur als Stap 2 (zelfde terug-knop-patroon, nu met label "Stap 3 van 3" en teruggaand naar Stap 2; zelfde Voorkant/Binnenzijde/Achterkant-tabs en dezelfde kaartweergave — hergebruik die component/view één-op-één). Toegevoegd, direct onder de terugbalk: h1 "Klaar voor de drukker" (24px/700, gecentreerd) + subtitel "Controleer voor- en achterkant nog eenmaal. Zo gaat de kaart in productie." (gecentreerd, muted).
**Verschil met Stap 2:** alle bewerk-knoppen onder elke kaartweergave ("Stijl", "Thema & sfeer", "Tekst", "Praktische informatie", "Namen") zijn hier **verborgen** — dit scherm is uitsluitend controle, niet bewerken. De "Vastzetten"-knop blijft wel zichtbaar/werkend.
**Onderin:** vaste CTA-balk met primaire knop "Bevestigen" → schakelt naar het Voltooid-scherm.

### Voltooid
**Doel:** bevestiging dat de bestelling is geplaatst, en een uitweg terug naar het begin (voor demo-doeleinden; in productie zou dit typisch naar een orderoverzicht of afrekenscherm leiden — zie Open vragen).
**Layout:** verticaal en horizontaal gecentreerd op het volledige scherm, geen header. Rond vinkje-icoon (64px, `--secondary`-achtergrond) → h1 "De kaart is bevestigd" (24px/700) → paragraaf "Deze gaat zo in productie. U ontvangt een bevestiging zodra de kaarten klaar zijn." (muted, max 34ch) → secundaire knop "Terug naar het begin" (→ Stap 1, state blijft behouden — er wordt niets gereset).

## Interactions & Behavior
- **Navigatie is lineair met terugknoppen**, geen stappenindicator/voortgangsbalk buiten de tekstlabel "Stap X van 3".
- **Bottom sheets** (Naam, Data, Spreuk, Binnentekst, Familie/namen, Praktische informatie, Stijl, Thema) schuiven van onderen in, met backdrop-klik-om-te-sluiten, sleepgreep-balkje bovenaan, en een X-knop. Alle inhoud is direct live gekoppeld aan de kaartweergave (typen ververst de preview meteen).
- **"Vastzetten"** is een confirm-dialoog (bottom sheet-stijl, met Annuleren/bevestigen-knoppenpaar) die de kaart in read-only zet voor de familie (zij kunnen dan nog alleen de woorden aanpassen, geen thema/indeling/stijl) — status persisteert als pil-label "Vastgezet" i.p.v. "Vastzetten".
- **Volledig-scherm preview**: tikken op de kaart (Stap 2, voorkant) opent een lightbox-weergave van de kaart, met sluitknop.
- **Formaat-wissel Enkel↔Gevouwen** en **wissel van foto-behandeling/indeling** in Stap 1 werken direct door in de live mini-preview zonder tussenstap.
- Er zijn geen loading- of foutstaten in dit prototype (alles is client-side state, geen echte data-verzending).

## State Management
Eén platte state-boom (zie `state = {...}` in de bron, rond regel 815) met o.a.:
- `screen`: `'stap1' | 'stap2' | 'stap3' | 'voltooid'`
- `formaat`: `'enkel' | 'gevouwen'`
- `smaak` (foto-behandeling): `'volledige-foto' | 'vrijgezet'`
- `indeling`: `'volledig' | 'kader' | 'naast-tekst' | 'sfeer-voorop'`
- `thema`: gekozen thema-id of `null`
- `side`: welke tab actief is binnen Stap 2/3 — `'voor' | 'binnen' | 'achter'`
- `uitstraling`, `uitlijning`, `spreukPositie`, `sfeerZinPositie`, `fontPairing`, `ornament`: stijlkeuzes uit de "Stijl"-sheet
- Inhoud: `naam`, `dataGeboorte`, `dataOverlijden`, `spreuk`, `binnenTekst`, namenlijst voor de achterkant, praktische-informatie-velden (locatie, datum/tijd, samenzijn, inzameling, afsluiting)
- `locked`: boolean, het "Vastzetten"-mechanisme
- `activeSheet`: welke bottom sheet open staat, of `null`
- Diverse UI-only vlaggen: `fullscreenOpen`, `previewLightboxOpen`, `binnenZoom`, `lockDialogOpen`

State-overgangen tussen schermen: `stap1 →(Naar de kaart, alleen actief als thema gekozen)→ stap2 →(Naar overzicht)→ stap3 →(Bevestigen)→ voltooid →(Terug naar het begin)→ stap1`, met terugknoppen die één stap teruggaan (`stap2→stap1`, `stap3→stap2`). Geen van deze overgangen reset de ingevulde data.

## Open vragen voor de ontwikkelaar / product
Dit prototype dekt de ontwerp- en review-flow. Nog niet gespecificeerd en te bepalen vóór bouw:
- Wat er ná "Bevestigen" écht moet gebeuren (aantal exemplaren, bezorgadres, betaling) — nu direct een statisch bevestigingsscherm.
- Echte foto-upload en automatische vrijstelling/uitknippen van het portret (nu een vaste demo-afbeelding).
- Validatie (bijv. verplichte velden vóór "Bevestigen").
- Wat "Vastzetten" precies mag/blokkeert voor de familie versus de uitvaartbegeleider (rollen zijn nu niet gemodelleerd, het is één gebruikersrol in dit prototype).

## Files
- `source/Gedenkkaart Wizard.dc.html` — volledige prototype-broncode (leesbare inline stijlen, exacte tekst, alle state-namen en logica).
- `source/assets/` — placeholder-afbeeldingen (portret + 4 sfeerthema's).
- `source/tokens/*.css` — kleur-, typografie-, letter- en vormtokens van het Memortium design system.
