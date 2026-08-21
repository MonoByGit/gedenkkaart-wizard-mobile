# Overdracht — Memortium Wizard, stap 3

*Open een nieuw chatvenster **in dit project** en plak alles onder de streep als eerste bericht. Dan staan het design system, de assets en de editor van stap 2 er al naast.*

---

Ontwerp stap 3 van de Memortium gedenkkaart-wizard: van "de kaart is klaar" tot en met het eindscherm. De lat is dezelfde als bij de editor: **world class design**, mobile first, gelikt tot in het kleinste detail. Wat hieronder staat is het wát — de productbeslissingen staan vast. De visuele taal, interactiedetails en motion zijn jouw domein, binnen het design system.

## Context

Memortium is een B2B-bedrijf voor memorial portrait editing voor uitvaartbegeleiders in Nederland en België. De uitvaartbegeleider levert de foto, wij bewerken die, en via het klantportaal stelt de begeleider of de familie zelf de gedenkkaart samen. De gebruikers zijn mensen in rouw of de professionals die hen begeleiden. Warmte, sereniteit en precisie. Nooit haast, nooit schreeuwerig. Nederlands, u-vorm richting de familie.

Stap 1 (de voorbereiding door de ondernemer) en stap 2 (de editor) zijn al ontworpen en goedgekeurd. Stap 3 is nieuw en moet er naadloos op aansluiten.

## Kijk eerst naar stap 2

De editor staat in dit project als `Memortium Wizard.dc.html`. Open die eerst en neem het vocabulaire letterlijk over: dezelfde pillen, segmented controls, glasvlakken, radii, panelen, tabs, kaartweergave, motion en microcopy. Stap 3 moet aanvoelen als hetzelfde product, niet als een nieuw ontwerp ernaast. Bouw je pagina als een nieuw bestand naast de wizard, dus zonder de wizard te wijzigen.

## Wat stap 2 al is (het vocabulaire waar je op voortbouwt)

- De kaart staat groot en permanent in beeld, gecentreerd, met tabs Voorkant / Binnenzijde (alleen gevouwen) / Achterkant. Typografie 1:1 met druk op A6.
- Een verticale **categorie-rail** hoeft over de kaart: Foto, Thema, Indeling, Stijl, Sfeer. Een tik opent onder de kaart een **smaken-strip** met gecureerde opties; elke tik is meteen live op de kaart.
- Tekst bewerk je door op een tekstblok óp de kaart te tikken, niet via de rail. Per tekstblok drie of vier grootte-stappen met een tekenlimiet die meebeweegt.
- Vier fotothema's (Avondwater, Nachtbloem, Stilte, Veldbloei), plus een thema dat de kleuren uit de foto zelf haalt. Per thema een gecureerd sfeersetje: licht, donker, één of twee eigen tinten, Hemels, en Papier licht / Papier donker.
- Kadervorm als eigen keuze: Recht, Rond, Ovaal, Boog. Elke kaderfoto blendt met een zachte overvloei in de kaart, nooit een harde rand.
- Het namenblok is een boom met generatieniveaus, van drie tot veertig namen, met eigen grootteknop.
- De uitvaartbegeleider kan het ontwerp vastzetten (lock); de familie werkt dan alleen aan de woorden.
- Vaste zinnen: "Precies zoals u het hier ziet, komt de kaart ook gedrukt uit." / "Zodra wij de foto hebben, staat het portret hier binnen 24 uur." / "Wijzigingen worden meteen bewaard."

## Wat je ontwerpt

**1. Het moment van doorgaan.** De familie is klaar in de editor. Hoe bevestigen we dat de kaart klopt en dat we de drukproef willen zien? Geen kille "Volgende"-knop: een rustig, warm overgangsmoment dat vertrouwen geeft. Bedenk waar dat begint (in de editor of als eigen scherm) en hoe je terug kunt.

**2. De namencheck als toegewijd rustmoment.** Een verkeerde naam is de pijnlijkste fout op een rouwkaart. Eén serene stap waarin alleen de namen en de kerngegevens (naam, roepnaam, data, plaatsen, partnerregel) nagelopen worden, per regel te bevestigen of te corrigeren. Van drie tot veertig namen moet dit even mooi werken.

**3. De drukproef-walkthrough.** Alle kanten van de kaart op ware verhouding langs, met de vaste belofte "Precies zoals u het hier ziet, komt de kaart ook gedrukt uit." Vergroten moet kunnen.

**4. De deelvarianten**, afgeleid van de kaartinhoud:
- **WhatsApp** — een doorstuurpakket: de foto los (vierkant, zonder tekstoverlay) plus de uitnodigingstekst van de kaart als kopieerbaar bericht, met kopieerknop. De tekst is opgebouwd uit de ingevulde gegevens, klaar om aan de familie te sturen.
- **Instagram** (4:5) — de foto met naam en data erop.
- **Facebook** (liggend) — de foto met alleen het zinnetje (de spreuk).
- Alles downloadbaar. Tekst op beeld altijd met een beschermgradient die naar nul uitloopt en vóór het gezicht stopt.

**5. De drie acties.** Stuur naar de uitvaartbegeleider (primair), Alles downloaden, Ik wil iets aanpassen. Het pakket gaat **naar de uitvaartbegeleider**, die het drukwerk op zich neemt en alles in het dossier van de familie vindt. Het gaat niet naar de drukker; gebruik dat woord niet op knoppen.

**6. Het eindscherm.** Het pakket staat in het dossier, de begeleider krijgt een seintje. Rustig, afsluitend, met een duidelijke "wat gebeurt er nu"-uitleg.

## Regels die vastliggen

- Mobile first. Een desktopversie volgt later; ontwerp niets dat die onmogelijk maakt.
- Elke invoer krijgt het component dat bij de aard van de beslissing past: aan/uit met direct zichtbaar effect is een toggle, nooit een checkbox; wederzijds uitsluitende smaken zijn een segmented control of een strip; een checkbox alleen voor meervoudige selectie of een expliciete bevestiging. Per interactietype bestaat er in de hele wizard precies één component, overal hetzelfde. Wees hierin de strengste reviewer van je eigen werk.
- Overgangen, animaties en micro-animaties horen volwaardig bij het ontwerp. Dit wordt op de telefoon gemaakt, vaak 's nachts, vaak samen. Het moet leven, niet aanvoelen als een formulier.
- Warm en precies, nooit klinisch, nooit joviaal. Geen uitroeptekens, geen eufemismen, zinsstijl in koppen.
- Buiten scope: drieluik, AI-schrijfhulp, een aparte Belgische kaartvariant, desktop, echte uploads en het portaal eromheen.

## Voorbeelddata (gebruik deze drie, ze bestaan al in stap 2)

- **Greet van Doorn** — Margaretha Johanna van Doorn-Verheij, echtgenote van Hendrik van Doorn, * Zwolle 14 maart 1946, † Deventer 8 augustus 2026. Tweeëntwintig namen. Spreuk: "Het licht is uit de kamer, niet uit ons hart."
- **Carien** — kortere kaart, weinig namen.
- **Richard** — veertig namen, de zware kant van het namenblok.

## Wat ik eerst wil zien

Begin met de **drukproefpagina**: de kanten van de kaart, de drie deelvarianten en de drie acties in één samenhangend scherm. Daarna de namencheck, dan het bevestigingsmoment vóór de drukproef, dan het eindscherm. Eén onderwerp per ronde, dan itereren we.
