# Memortium Dossier (klantportaal) → Claude Designer
*Vervolgronde in het bestaande Designer-project, na stap 2 (editor) en stap 3 (drukproef). 22 augustus 2026.*

---

## Deel 1 — Wat jij doet

1. Blijf in het bestaande Designer-project (design system en de goedgekeurde stappen 2 en 3 staan er al).
2. Plak de volledige prompt uit Deel 2 als nieuw bericht. Verder niets meegeven.
3. Beoordeel per ronde: het dossier zelf (foto, verkoop, voorbereiding) → de tijdlijn en vragen → het overzicht en de toegang → het splitmoment. Eén onderwerp per ronde.
4. Klaar? Dan is de hele keten ontworpen en schrijf ik de bouwprompt voor Claude Code, waarin dit samenkomt met BOUWPROMPT-PORTAAL-FASE1.md.

---

## Deel 2 — De prompt voor Claude Designer

*Alles hieronder kopiëren en plakken.*

---

Ontwerp het dossier: het klantportaal van de uitvaartbegeleider. Zelfde lat als de wizard en de drukproef: **world class**, mobile first, en het moet leven. Alles wat in dit project al vastligt blijft gelden: het design system, het interactievocabulaire (één component per interactietype, het twee-tik-patroon, de glasvlakken, de motion-taal), de microcopy-regels en de voorbeelddata (Greet van Doorn, Carien Bosman, Richard Kastelein). De kits in `templates/portaal/` en `templates/facturen/` zijn het startpunt, geen nieuw terrein. Jouw overdrachtsdocument van deze ronde is geverifieerd; wat hieronder staat is de vastgestelde opdracht, inclusief een paar correcties en aanvullingen daarop.

### Wie hier komt en waarom

Memortium is B2B: de uitvaartbegeleider is de klant, de familie bestaat in dit portaal alleen via de wizard-link die de begeleider zelf deelt. De begeleider komt hier om drie redenen: zijn bewerkte portret ophalen, de kaart eromheen organiseren, en overzicht houden over meerdere lopende uitvaarten. De levenscyclus zoals je die zelf samenvatte klopt en blijft: bestelling per e-mail, dossier aangemaakt door Memortium, plaatshouder met de 24-uursbelofte tot het portret er staat, portret als startsignaal voor de wizard, en het pakket dat na het versturen in het dossier landt. Nooit "naar de drukker" op een knop.

### Eén hard principe

**Nergens in dit portaal wordt een e-mailadres of ander contactgegeven van de familie gevraagd, getoond of bewaard.** "De familie erbij zetten" is altijd: een link genereren en delen via het eigen kanaal van de begeleider (kopiëren, share sheet). Memortium is een platform om te werken en te creëren, niet te administreren.

### Wat je ontwerpt — vier delen

**1. De toegang.** Accountloos, magic link op e-mail: de begeleider vult zijn e-mailadres in, krijgt een link per mail, en landt in zijn omgeving. Een onbekend adres krijgt dezelfde nette bevestiging (geen account-verklapping). De bestaande directe dossierlinks blijven daarnaast gewoon werken als ingang per dossier.

**2. De omgeving.** Alle dossiers van deze begeleider, gesorteerd op laatste activiteit. Per dossier: de overledene, de status, de laatste gebeurtenis, en de bestelling met bedrag. De statusketen is vastgesteld, verfijn de labels maar niet de keten: dossier aangemaakt → wacht op de foto → het portret wordt bewerkt → het portret is klaar → wacht op de familie → de kaart wordt gemaakt → het pakket is klaar → in drukwerk, met daarnaast gedownload en vervallen. Dit is een werkoverzicht met bedragen, géén boekhouding: echte facturen blijven buiten het portaal.

Twee dingen maken dit overzicht een werkinstrument in plaats van een lijst:

- **Wie is aan zet.** Elk dossier toont niet alleen de status maar ook bij wie de bal ligt en wat de volgende stap is. Ligt er een taak bij de begeleider (er staat een vraag open, het pakket wacht op drukwerk, de voorbereiding is nog niet af), dan moet dat onmiskenbaar zijn — het dossier zegt als het ware: dit is nu aan u.
- **De berichtenverzameling.** Alles wat van families binnenkomt (vragen, opmerkingen dat iets niet klopt) bestaat op twee plekken: verzameld bovenaan de omgeving, over alle dossiers heen, zodat niets ooit wegzakt in een individueel dossier — en per dossier op zijn eigen plek. Elk bericht draagt zijn volledige context mee: om welk dossier het gaat, om welk veld precies, wat er nu staat, wie het vroeg en wanneer.

De fotobestellingen die hier verschijnen: **Essentieel € 49** (binnen 24 uur) en **Impuls € 99** (binnen 4 uur, besteld vóór 14:00). Het Ceremoniepakket Levenslied bestaat intern maar wordt nog nergens gecommuniceerd: toon het niet als product.

**3. Het dossier zelf.** De volgorde op de pagina is een principieel besluit: **de foto opent het dossier.** Wij zijn een fotobedrijf; het portret is waarvoor de begeleider komt. En er speelt iets strategisch mee dat je in het ontwerp moet voelen: vandaag leveren wij dit portret op via een kale Google Drive-map. Dit scherm vervangt die map, en het is tegelijk het enige moment waarop élke klant ons werk op zijn best ziet. De meeste begeleiders kennen Memortium alleen als fotobedrijf; dit is de plek waar ze ontdekken dat wij ook de kaart doen, en dat we dat góed doen.

- **Het oplevermoment als onthulling.** Geen bestandslijst maar een moment: het eindresultaat, de kleurvariant, groot en trots — dit is waar iemand op wachtte. De andere twee varianten (zwart-wit, sepia) komen bij interactie tevoorschijn, op een manier die je zelf mooi en verrassend maakt; het origineel als inzet ernaast, zodat de sprong zichtbaar is. Alles downloadbaar, per variant en alles-in-één. Vóór levering: de plaatshouder met de vaste belofte. De vrijgesneden variant bestaat ook maar is intern voor de kaart, geen downloadoptie.
- **De vork, direct bij het portret.** Twee heldere wegen op dat moment: de foto's downloaden (voor wie alleen de foto bestelde) en **de kaart starten**. Beide moeten moeiteloos zijn; downloaden mag nooit voelen als de mindere keuze.
- **De verleiding.** Wie alleen de foto neemt, krijgt tóch te zien wat er mogelijk is — en het sterkste middel daarvoor hebben we in huis: op dit moment bestaat het portret al, dus we kunnen het alvast óp een kaart tonen. Niet vertellen dat wij kaarten maken, maar laten zien hoe hún portret op een kaart staat. En wie in eerste instantie niet wilde, houdt in het dossier altijd een rustige weg terug om de kaart alsnog te starten; het aanbod verdwijnt niet na één nee.
- **Het kaartaanbod**: rouwkaart € 79, bedankkaart € 59, gedachtenisprentje "prijs volgt". Kiest de begeleider rouw- én bedankkaart, dan verspringt het totaal automatisch naar **€ 129** met de regel "Samen besteld, u bespaart € 9". Geen apart pakket-item.
- **De voorbereiding (dit is de ontbrekende stap 1 van de wizard, en hij hoort hier).** De begeleider vult de feiten en de logistiek: de persoon (naam en roepnaam, aanspreektitel, partnerregel met is-overleden, geboorte- en sterfdatum, geboorte- en overlijdensplaats) en het afscheid als bijeenkomsten-model (de plechtigheid, en los aan of uit: groetmoment vooraf met tijdvak, condoleren na de dienst, online condoleren via een URL, koffietafel; plus besloten kring, en dan staat er geen tijd op de kaart), en het formaat (enkel of gevouwen). Hiermee begint de familie nooit op een leeg canvas.
- **Het splitmoment.** Zodra de voorbereiding compleet is verschijnt één duidelijke actie: **Klaar voor de familie** — met de keuze het ontwerp vast te zetten (de lock uit stap 2), en daarna de link om te delen. Of de begeleider werkt zelf door in de wizard; die weg is er altijd.
- **De tijdlijn.** Het dossierlog dat je in stap 3 al hebt neergezet, hier volwaardig: elke gebeurtenis met tijdstip en actor (begeleider of familie). De vastgestelde lijst: dossier aangemaakt, portret geplaatst, ontwerp vastgezet of vrijgegeven, elke tekstwijziging op de kaart (blok, oude en nieuwe waarde), elke wijziging in het namenblok (altijd met naam en oude stand), vraag van de familie, namencheck afgerond, pakket verstuurd, download, en wijzigingen ná versturen.
- **De berichten van de familie.** De Vraag stellen-flow uit stap 3 landt hier als berichtenbox per dossier: elk bericht veld-precies (welk veld, de huidige waarde, wie, wanneer), zodat de begeleider zonder zoeken weet waar het over gaat. Hij kan antwoorden én het gegeven direct corrigeren vanuit het bericht; vraag, antwoord en correctie blijven in het dossier staan. Een openstaand bericht zet het dossier op "aan u".
- **Het pakket.** Na versturen: alle kanten van de kaart plus de drie deelbeelden, downloadbaar met de vastgestelde bestandsnamen, en de mogelijkheid het dossier op "in drukwerk" te zetten. Het terugsturen door de familie is hét overdrachtsmoment terug: de begeleider krijgt een melding, en het dossier maakt onmiskenbaar dat de taak nu bij hem ligt — het pakket klaarzetten voor het drukwerk.

**4. Het rechtenmodel (vastgesteld, jouw voorstel uit stap 3 is overgenomen en uitgebreid).** De begeleider mag alles. De familie corrigeert de woorden, de namen, de roepnaam, de volledige naam en de partnerregel zelf; geboorte- en overlijdensgegevens én het afscheid zijn voor de familie alleen-lezen, met Vraag stellen als route.

### Seintjes

De begeleider krijgt op vijf momenten bericht (e-mail, buiten deze ontwerpopdracht) en de omgeving moet die momenten ook zelf zichtbaar maken: het portret is geleverd, de familie is begonnen, er is een vraag gesteld, het pakket is klaar, en een dossier vervalt bijna. Dat laatste is echt: dossiers dragen persoonsgegevens van tientallen levende mensen en vervallen daarom na een vaste termijn.

### Buiten scope

Facturen als PDF of betaalstatus, het Levenslied als getoond product, Memortium's eigen beheerkant, de notificatie-mails zelf, drieluik, en desktop (mobile first, niets dat desktop onmogelijk maakt).

### Wat je oplevert

De toegangsflow, de omgeving met de drie voorbeelddossiers in verschillende statussen (Greet: pakket klaar; Carien: portret klaar, kaart nog niet gestart; Richard: wacht op de foto), en het dossier in al zijn staten: vóór de foto, met portret, met kaartaanbod gekozen, in voorbereiding, na het splitmoment, met openstaande vraag, en met verstuurd pakket. Begin met het dossier zelf op het moment dat het portret net geleverd is: het oplevermoment met de onthulling, de vork en de verleiding. Dat is het emotionele hoogtepunt van dit product én het scherm waarop Memortium zich profileert.

---

*Einde prompt.*
