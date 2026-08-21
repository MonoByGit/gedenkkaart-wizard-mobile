# Prompt — de omgeving en de toegang

*Plak alles onder de streep als eerste bericht in een nieuw venster **in dit project**. Dan staan het design system, de wizard (stap 2), de drukproef (stap 3) en het dossier er al naast.*

---

Ontwerp de omgeving van de uitvaartbegeleider: de toegang en het dossieroverzicht. Zelfde lat als de wizard, de drukproef en het dossier: **world class**, mobile first, en het moet leven. Dit is de pagina waar hij binnenkomt en waar zijn werk begint.

## Kijk eerst naar wat er staat

`Memortium Dossier.dc.html` is deze week goedgekeurd en is jouw ijkpunt: hetzelfde telefoonkader in een optiebord met een badge, dezelfde chrome met terugpil en informatie-icoon, glasvlakken voor alles wat zweeft, bladen die van onderen inschuiven, het twee-tik-patroon voor secundaire acties, toast onderin, micro-labels in kapitalen met 0.2em spatiëring, motion op `cubic-bezier(.16,1,.3,1)` tussen 250 en 550 ms. `Memortium Wizard.dc.html` en `Memortium Drukproef.dc.html` zijn de rest van de keten. Bouw een nieuw bestand ernaast, wijzig die drie niet.

Voorbeelddata die overal terugkomt: **Greet van Doorn** (Uitvaartzorg De Vijverhof, Impuls € 99, pakket klaar), **Carien Bosman** (Uitvaartzorg Duin en Berg, Essentieel € 49, portret klaar en kaart nog niet gestart), **Richard Kastelein** (Uitvaartzorg Sint-Martinus, Essentieel € 49, wacht op de foto). Verzin er een paar bij voor het archief.

## Wie hier komt

Memortium is B2B. De uitvaartbegeleider is de klant; de familie bestaat in dit portaal alleen via de wizard-link die hij zelf deelt. **Nergens in dit portaal wordt een e-mailadres of ander contactgegeven van de familie gevraagd, getoond of bewaard.** De familie erbij zetten is altijd: een link genereren en delen via zijn eigen kanaal.

## Wat je ontwerpt

**1. De toegang.** Accountloos, magic link op e-mail: hij vult zijn e-mailadres in, krijgt een link per mail, en landt in zijn omgeving. Een onbekend adres krijgt dezelfde nette bevestiging, dus geen account-verklapping. De bestaande directe dossierlinks blijven daarnaast werken als ingang per dossier. Ontwerp ook het wachten na het versturen en de terugkomst (link verlopen, link opnieuw sturen).

**2. De omgeving.** Alle dossiers van deze begeleider, gesorteerd op laatste activiteit. Per dossier: de overledene, de status, de laatste gebeurtenis, en de bestelling met bedrag. Dit is een werkoverzicht met bedragen, géén boekhouding; echte facturen blijven buiten het portaal. Alleen **Essentieel € 49** (binnen 24 uur) en **Impuls € 99** (binnen 4 uur, besteld vóór 14:00). Het kaartaanbod is rouwkaart € 79 en bedankkaart € 59, samen € 129 met "Samen besteld, u bespaart € 9". Het Ceremoniepakket Levenslied en het gedachtenisprentje bestaan intern maar zijn geen product op dit scherm.

De statusketen is vastgesteld, verfijn de labels maar niet de keten: dossier aangemaakt → wacht op de foto → het portret wordt bewerkt → het portret is klaar → wacht op de familie → de kaart wordt gemaakt → het pakket is klaar → in drukwerk, met daarnaast gedownload en vervallen.

Drie dingen maken dit een werkinstrument in plaats van een lijst:

- **Wie is aan zet.** Elk dossier toont niet alleen de status maar ook bij wie de bal ligt en wat de volgende stap is. Ligt er een taak bij de begeleider (er staat een vraag open, het pakket wacht op drukwerk, de voorbereiding is nog niet af), dan moet dat onmiskenbaar zijn: het dossier zegt als het ware, dit is nu aan u.
- **De berichtenverzameling.** Alles wat van families binnenkomt (vragen, opmerkingen dat iets niet klopt) staat verzameld bovenaan de omgeving, over alle dossiers heen, zodat niets wegzakt in een individueel dossier. Elk bericht draagt zijn volledige context mee: om welk dossier het gaat, om welk veld precies, wat er nu staat, wie het vroeg en wanneer. Van daaruit kan hij antwoorden en het gegeven direct corrigeren. Een openstaand bericht zet het dossier op "aan u".
- **De seintjes.** De begeleider krijgt op vijf momenten bericht per e-mail (die mails zijn buiten scope), en de omgeving moet die momenten ook zelf zichtbaar maken: het portret is geleverd, de familie is begonnen, er is een vraag gesteld, het pakket is klaar, en een dossier vervalt bijna. Dat laatste is echt: dossiers dragen persoonsgegevens van tientallen levende mensen en vervallen daarom na een vaste termijn.

**3. De bestellingen van de afgelopen periode.** Wat er recent besteld is, met bedrag en levertijd, in dezelfde lijst of ernaast; jij bepaalt wat rustiger werkt. Een dossier dat langer dan **twee maanden** stil is, klapt samen tot één archiefregel: naam, datum, bedrag, en de weg naar wat er nog van te downloaden is. Het archief mag nooit even zwaar wegen als het werk van vandaag.

**4. De weg naar het dossier.** Een tik op een dossier gaat naar de dossierpagina die al ontworpen is. Zorg dat de overgang klopt: dezelfde chrome, dezelfde terugweg.

## Regels die vastliggen

- Mobile first. Een desktopversie volgt later; ontwerp niets dat die onmogelijk maakt.
- Eén component per interactietype, overal hetzelfde: aan/uit met direct zichtbaar effect is een toggle, wederzijds uitsluitende smaken zijn een segmented control of een strip, een checkbox alleen bij meervoudige selectie of een expliciete bevestiging.
- U-vorm, zinsstijl in koppen, geen uitroeptekens, geen em-dash, geen eufemismen. Nooit "naar de drukker" op een knop; het pakket gaat naar de uitvaartbegeleider, die het drukwerk verzorgt.
- Geen accentkleur. Status verschilt in vlak en gewicht, niet in kleur of symbool. Geen groen voor goed en geen rood voor fout.

## Buiten scope

Facturen als PDF of betaalstatus, het Levenslied en het gedachtenisprentje als getoond product, Memortium's eigen beheerkant, de notificatie-mails zelf, drieluik, en desktop.

## Wat ik eerst wil zien

Begin met **de omgeving in de staat waarin er werk ligt**: drie lopende dossiers in verschillende statussen, een openstaande vraag van een familie bovenaan, en een dossier dat bijna vervalt. Daarna de toegangsflow, dan het archief en de bestellingen. Eén onderwerp per ronde, dan itereren we.

---

*Einde prompt.*
