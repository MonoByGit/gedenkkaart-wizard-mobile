# Memortium Wizard 2.0 → Claude Designer
*Overdracht van het goedgekeurde prototype naar een nieuw Designer-project. 20 augustus 2026, v2.*

---

## Deel 1 — Wat jij doet

1. Start een geheel nieuw project in Claude Designer.
2. Koppel je Memortium design system aan het project.
3. Plak de volledige prompt uit Deel 2 hieronder als eerste bericht. Verder niets: geen prototype, geen mockups. De prompt beschrijft het volledige interactiemodel; de designer begint met een schone lei binnen het design system. (Het HTML-prototype blijft in je map Memortium Wizard als ons eigen naslagwerk, het gaat niet mee.)
4. Beoordeel per ronde, in deze volgorde: de editor (rail + strips, voorkant) → de andere pagina's → tekstbewerking → stap 1 en 3. Eén onderwerp per ronde, dan blijft de feedback scherp.
5. Klaar in Designer? Dan schrijf ik de bouwprompt voor Claude Code (nieuwe editormodule naast de bestaande in memortium-service-portal).

---

## Deel 2 — De prompt voor Claude Designer

*Alles hieronder kopiëren en plakken.*

---

Ontwerp de Memortium gedenkkaart-wizard. De lat: **world class design**. Dit moet zich kunnen meten met het beste digitale productontwerp dat er is, gelikt tot in het kleinste detail. Jij bent de designer en jij bepaalt hoe. Wat hieronder staat is het wát: de productbeslissingen, de flows en de regels. Die staan vast. Alles daarbuiten, de complete visuele taal, interactiedetails, motion, hiërarchie, is jouw domein, binnen ons design system. Je begint met een schone lei.

### Context

Memortium is een B2B-bedrijf voor memorial portrait editing voor uitvaartbegeleiders in Nederland en België. Wij zijn foto-editing-first: de uitvaartbegeleider levert de foto aan, wij bewerken die, en via het klantportaal stelt de begeleider of de familie zelf de gedenkkaart (rouwkaart) samen. De gebruikers zijn mensen in rouw, of professionals die hen begeleiden. Warmte, sereniteit en precisie zijn het merk. Nooit haast, nooit schreeuwerig.

Mobile first. Een desktopversie volgt later; ontwerp niets dat die onmogelijk maakt.

### De flow: drie stappen — ontwerp de complete keten

**Stap 1 — De voorbereiding (door de uitvaartbegeleider).** Het onderzoek is hier stellig: de ondernemer heeft de feiten en de logistiek, de familie heeft de woorden en de namen. Twee mensen, twee momenten, dus niet één scherm. De ondernemer vult in:

- **De persoon**: volledige naam en roepnaam, aanspreektitel, partnerregel ("echtgenoot van" / "weduwe van", met is-overleden), geboorte- en sterfdatum, geboorte- en overlijdensplaats.
- **Het afscheid**, als bijeenkomsten-model: de plechtigheid, en los aan of uit te zetten: groetmoment vooraf (met tijdvak), condoleren na de dienst, online condoleren (URL), eventueel koffietafel. Plus besloten kring, en dan staat er géén tijd op de kaart.
- **Het formaat**: Enkel of Gevouwen.

Daarna het **splitmoment**: de ondernemer kiest "Klaar voor de familie" (met de keuze het ontwerp vast te zetten, daarna deelt hij de link via zijn eigen kanaal) óf hij werkt zelf door in de editor. De familie begint dus nooit op een leeg canvas. Regel voor de familie-kant: alles wat de ondernemer invulde is aanpasbaar (namen, data, plaatsen — de familie weet details soms beter), **behalve het afscheid**: de logistiek is van de ondernemer en is voor de familie alleen-lezen.

**Stap 2 — De editor: kaart centraal, alles als overlay.** Dit is het hart en het interactiemodel ligt vast (het patroon van moderne foto-editors, bewust gekozen omdat iedereen het kent):

- De kaart staat groot en permanent in beeld. Pagina's wisselen via tabs: Voorkant, Binnenzijde (alleen gevouwen), Achterkant.
- Een **categorie-rail** naast de kaart: Foto, Thema, Indeling, Stijl, Sfeer.
- Kies je een categorie, dan verschijnt onder de kaart een **smaken-strip**: de gecureerde opties van die categorie, doorheen te swipen, en elke tik toont het gevolg direct live op de kaart. Geen schermen die de kaart bedekken, geen back-and-forth.
- **De woorden lopen níet via de rail.** Tekst bewerk je door op een tekstblok óp de kaart te tikken; het invoerveld komt met het toetsenbord omhoog en elke letter verschijnt live. De rail is uitsluitend ontwerp.
- Bovenin: Opslaan en Vastzetten (de lock van de uitvaartbegeleider).

De categorieën:
- **Foto**: de twee smaken — Volledige foto (onze bewerking is het beeld, persoon en achtergrond als één geheel) of Vrijgezet op thema (wij zetten het portret vrij op een van onze handgemaakte themabeelden). Er is géén optie zonder foto.
- **Thema**: de handgemaakte themabeelden, altijd getoond als echt beeld. Vier bij launch (Avondwater, Nachtbloem, Stilte, Veldbloei), het systeem is gebouwd op acht. Het thema geldt voor de hele kaart en zet alle pagina's in één keer goed.
- **Indeling**: per pagina twee tot zes vaste, door ons uitgedachte **complete layouts** — niet alleen waar het beeld staat, maar het hele arrangement van die pagina: naam en data boven of onder de foto, het zinnetje boven of onder, gespiegeld. De familie swipet erdoorheen en ziet elke layout direct op de kaart. Voor de voorkant omvatten de layouts de beeldvarianten Volledig, In kader en Naast tekst, en op gevouwen ook Sfeer voorop (portret binnenin links); binnen die varianten zijn de tekstarrangementen de smaken. Elke pagina heeft zijn eigen setje.
- **Stijl**: de acht benoemde fontcombinaties, en wat daar verder bij hoort.
- **Sfeer**: de licht/donker/tint-varianten van deze kaart (zie functionele eisen).

**Per pagina versus kaartbreed:** het thema erft kaartbreed als vertrekpunt; daarbinnen is alles per pagina bij te stellen via de rail. De curatie is het vangnet: élke smaak in élke strip is door ons per thema ontworpen, dus geen enkele combinatie kan vloeken. De kaart moet als één geheel blijven voelen, ook als elke pagina eigen keuzes draagt.

**Stap 3 — Controle en oplevering, volwaardig mee-ontwerpen.** De namencheck als toegewijd rustmoment (een verkeerde naam is de pijnlijkste fout op een rouwkaart), de drukproef-walkthrough van alle kanten, de deelvarianten (WhatsApp als doorstuurpakket: foto los plus de uitnodigingstekst als kopieerbaar bericht; Instagram met naam en data op de foto; Facebook met alleen het zinnetje), de drie acties (Stuur naar de uitvaartbegeleider als primaire, Alles downloaden, Ik wil iets aanpassen) en het eindscherm: het pakket staat in het dossier, de begeleider krijgt een seintje.

### Wat er op de kaart staat (contentstandaard, uit ons veldonderzoek — vast)

Gebaseerd op negen echte rouwbrieven, tien drukkerssjablonen, zeshonderd voorbeeldzinnen en zestien getelde kaarten. Drie lagen:

- **Essentieel** (moet kunnen, vrijwel altijd aanwezig): naam met roepnaam, geboorte- en sterfdatum, de **aanhef of openingszin bóven de naam**, de namen van nabestaanden, afscheidsinformatie, condoleance-informatie, geboorte- en overlijdensplaats, de partnerregel.
- **Veelvoorkomend** (aan of uit te zetten): spreuk of dichtregel (kort, twee tot vier regels; níet verplicht, een kwart van de kaarten heeft er geen), besloten kring, correspondentieadres, dankwoord aan een zorginstelling, bloemenwens, online condoleren via een URL.
- **Zeldzaam** (niet ontwerpen): giften, kledingwens, QR-codes.

**Het namenblok is een boom, geen lijst — en hét moeilijkste invoerpaneel van de wizard, geef het de meeste ontwerpaandacht.** Drie tot vier generatieniveaus waar de inspringing de betekenis ís: kopregel ("Dit melden u met diepe droefheid:"), partner eerst met relatielabel, kinderen als koppels, kleinkinderen ingesprongen, achterkleinkinderen dieper, kruisje bij overleden familieleden, samenvattende cursieve regel ("haar kinderen en kleinkinderen"), bredere kring, en een afsluitende familienamenregel. Drie tot veertig namen; het ontwerp moet beide uitersten mooi dragen.

**Per vlak** (en er is altijd precies één portret op de kaart): de voorzijde draagt spreuk, beeld, naam en data. Binnen links: het portret als het niet voorop staat, of de spreuk, of leeg. Binnen rechts: aanhef, naam en data, plechtigheids- en condoleance-regels, herinnering, slotzin. De achterzijde: spreuk, het namenblok en de praktische regel(s). Op de **enkele kaart** (twee vlakken) geldt de gecureerde kern: melden, uitnodigen, ondertekenen; het vrije herinneringsblok vervalt en de wizard verwijst warm naar de gevouwen kaart als de familie meer kwijt wil.

**Leesbaarheid**: onder elke tekstgroep op beeld ligt een verloop dat naar nul uitloopt, nooit een harde rand, en het verloop stopt vóór het gezicht — een wassing die de kaaklijn raakt verraadt zichzelf. De dekking is per thema begrensd. Er is géén schuifje waarmee de familie de foto lichter of donkerder maakt: de foto is ons vakwerk en die beslissing is al genomen.

Nederland eerst, België-bewust: de velden die Vlaanderen nodig heeft (plaatsen, rouwadres) bestaan gewoon in het model; een aparte Belgische variant (tweekoloms binnenzijde) is nu geen ontwerpopdracht.

### Functionele eisen (vastgelegd)

- Typografie op de kaart is **1:1 met druk**: puntgroottes zoals ze op A6 gedrukt worden, meeschalend met de preview. De preview houdt altijd het vaste kaartformaat, zo groot als past. De gebruiker moet de kaart ook op maximaal formaat kunnen bekijken.
- Per tekstblok drie fontstappen: klein, normaal, groot. Wij bepalen wat die stappen betekenen.
- Uitlijning (links, gecentreerd, rechts) hoort bij Stijl en volgt de per-pagina-regel hierboven. Er zijn géén losse positieknoppen: waar tekstblokken staan is volledig gevangen in de gecureerde layouts van de Indeling-categorie.
- Vaste, gecureerde volgordes van blokken per kant en formaat. Er is geen sorteer-UI.
- Sfeer: per thema een gecureerd setje — licht, donker, en één of twee tinten die wíj bij dat thema ontwerpen (Veldbloei bijvoorbeeld een zachtroze, Avondwater een diepblauw). Nooit een universele kleurenlijst over elk thema. Het systeem kiest standaard zelf en leunt naar licht; de keuze blijft aan de mensen. Tekst op beeld moet altijd goed leesbaar zijn.
- Acht benoemde fontcombinaties. Ons vertrekpunt: Ingetogen (EB Garamond), Klassiek (Playfair Display + Lora), Sereen (Cormorant Garamond + EB Garamond), Statig (Marcellus + Crimson Pro), Warm (Merriweather), Helder (Montserrat + Lora), Modern (Raleway + Crimson Pro), Sierlijk (Great Vibes voor de naam + EB Garamond). Weet jij betere pairings voor deze context, stel ze voor; het blijven er acht, met namen.
- Thema bepaalt alles: voorkantbeeld, binnenzijde met ornamentlaag, en de achterkant als variant van de voorkant, zodat de kaart voelbaar één geheel is. Ook bij In kader en Naast tekst is het thema als beeld aanwezig op de kaart.
- Ornament is paginavullende versiering met heel lichte aanwezigheid, hoort bij het thema. Per thema twee of drie varianten plus Geen, de familie kiest. Nooit bovenop het portret.
- Zakelijke invoer (namenlijst, afscheidsgegevens) opent vanaf het bijbehorende blok op de kaart. Het namenblok heeft een eigen grootteknop. Namen kunnen inspringen onder een hoofdnaam.
- Enkele kaart = de kern: melden (naam, data, aankondiging), uitnodigen (plechtigheid of besloten kring), ondertekenen (namen). Het vrije herinneringsblok vervalt daar; wil de familie meer, dan verwijst de wizard warm naar de gevouwen kaart.
- De uitvaartbegeleider kan het ontwerp vastzetten (lock); de familie werkt dan alleen aan de woorden.
- Formuleringshulp ("Kies een formulering") per toon: Algemeen, Na ziekte, Onverwacht, Religieus.
- Er is altijd precies één portret op de kaart. Zolang de bewerkte foto er nog niet is, toont de kaart een placeholder met de belofte: zodra wij de foto hebben, staat het portret er binnen 24 uur.

### Controle en delen (vastgelegd)

- Namencheck als bewust rustmoment: een verkeerde naam is de pijnlijkste fout op een rouwkaart, dus de namen verdienen één toegewijde, serene controlestap.
- Drukproef: het pakket gaat **naar de uitvaartbegeleider**, die een seintje krijgt en alles in het dossier van de familie vindt. Het gaat niet rechtstreeks naar de drukker; gebruik dat woord niet op knoppen.
- Drie acties op de drukproefpagina: Stuur naar de uitvaartbegeleider (primair), Alles downloaden, Ik wil iets aanpassen.
- Deelvarianten op de drukproefpagina: **WhatsApp** is een doorstuurpakket: de foto los (vierkant, zonder tekstoverlay) plus de uitnodigingstekst van de kaart als kopieerbaar bericht met kopieerknop. **Instagram** (4:5): de foto met naam en data erop. **Facebook** (liggend): de foto met alleen het zinnetje (de spreuk). Alles downloadbaar.

### Microcopy en toon

- Nederlands, u-vorm richting de familie. Warm en precies, nooit klinisch, nooit joviaal.
- Vaste zinnen die blijven: "Precies zoals u het hier ziet, komt de kaart ook gedrukt uit." / "Zodra wij de foto hebben, staat het portret hier binnen 24 uur." / "Wijzigingen worden meteen bewaard."
### Mobiel moet het leven

Dit product wordt op de telefoon gemaakt, vaak 's nachts, vaak samen. De mobiele interactie moet daarom niet gewoon werken maar optimaal zijn: swipen door de strips moet vloeiend en vanzelfsprekend voelen, elke aanraking krijgt een reactie, en overgangen, animaties en micro-animaties horen volwaardig bij het ontwerp. De ervaring moet leven en warm aanvoelen, en als geheel iets zijn dat mensen in deze branche nog niet eerder in handen hebben gehad: een vernieuwende ervaring, geen digitaal formulier. Ontwerp de beweging erbij, niet alleen de schermen.

### Interactie-vakmanschap

Naast hoe het eruitziet, beoordelen we dit ontwerp hard op de júiste interactiebeslissingen. Elke invoer krijgt het component dat bij de aard van de beslissing past: iets dat aan of uit staat met direct zichtbaar effect is een toggle, nooit een checkbox; wederzijds uitsluitende smaken zijn een segmented control of een strip, nooit een rij losse vinkjes; een checkbox is er alleen voor meervoudige selectie of een expliciete bevestiging. Per interactietype bestaat er in de hele wizard precies één component, overal hetzelfde. Dit is een bekende zwakte van de huidige versie (checkboxes waar toggles horen, en andere gekke keuzes), dus wees hierin de strengste reviewer van je eigen werk: bij elk element de vraag of dít het juiste instrument voor déze beslissing is, en of de beste ontwerpteams ter wereld het zo zouden doen.

### Buiten scope

- Drieluik (zes vlakken): geparkeerd als v2 van het product. Alleen Enkel en Gevouwen.
- "Help me schrijven" (AI-schrijfhulp): backlog. De formuleringshulp met beproefde zinnen per toon is de tussenstap die wél meegaat.
- Een aparte Belgische kaartvariant (tweekoloms binnenzijde): later.
- Desktopversie: later, mobile first nu.
- Echte foto-uploads en het portaal eromheen: bestaan al elders in het product.

### Wat je oplevert

De complete keten, world class, mobile first, in het design system: de voorbereidingsstap van de ondernemer (persoon, afscheid met het bijeenkomsten-model, formaat) met het splitmoment (Klaar voor de familie, met lock-keuze en link delen, óf zelf doorwerken), de editor met rail en smaken-strip voor alle vijf categorieën, beide formaten, beide foto-smaken, de indelingen per pagina, de vier thema's met hun sfeersetjes, de tekstbewerking op de kaart (leeg, gevuld en actief tijdens het typen), het namenblok-boompaneel in al zijn diepte (van drie tot veertig namen), het afscheid-paneel (alleen-lezen in de familieweergave), de vergrote kaartweergave, de lock-state, de namencheck, de drukproef met de drie acties en de deelvarianten, en het eindscherm.

Begin met de editor (stap 2) op de voorkant, met de rail, de Thema-strip en de Indeling-strip werkend uitgetekend, dan itereren we per categorie en per scherm. De voorbereidingsstap en de controle volgen daarna, maar horen volwaardig bij deze opdracht.

---

*Einde prompt.*

---

## Deel 3 — Daarna

Als Designer klaar is: lever mij de Designer-output (of screenshots plus de link) aan, dan schrijf ik de bouwprompt voor Claude Code. Kern daarvan staat al vast: nieuwe editormodule als verse route naast de bestaande editor in memortium-service-portal, fundament (ordermodel, tokens, rollen, deploy) blijft staan, oude editor blijft live tot v2 af is. Technische aandachtspunten die ik meeneem: de cqw-techniek voor 1:1 typografie (let op: container-type vereist een expliciete breedte op de houder), overflow-wrap op alle tekstblokken, en het vaste kaartformaat via aspect-ratio met overflow hidden.
