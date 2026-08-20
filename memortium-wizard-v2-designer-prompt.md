# Memortium Wizard 2.0 → Claude Designer
*Overdracht van het goedgekeurde prototype naar een nieuw Designer-project. 20 augustus 2026, v2.*

---

## Deel 1 — Wat jij doet

1. Start een geheel nieuw project in Claude Designer.
2. Koppel je Memortium design system aan het project.
3. Voeg als extra bijlage toe: `memortium-wizard-v2-prototype.html` (staat in je map Memortium Wizard). Dit is een functionele referentie: het laat de flows, de regels en de content zien. Het is géén visueel uitgangspunt.
4. Plak de volledige prompt uit Deel 2 hieronder als eerste bericht.
5. Beoordeel per scherm, in deze volgorde: Toneel → De kaart (drie kanten) → Sheets → Controle. Eén scherm per ronde, dan blijft de feedback scherp.
6. Klaar in Designer? Dan schrijf ik de bouwprompt voor Claude Code (nieuwe editormodule naast de bestaande in memortium-service-portal).

---

## Deel 2 — De prompt voor Claude Designer

*Alles hieronder kopiëren en plakken.*

---

Ontwerp de Memortium gedenkkaart-wizard. De lat: **world class design**. Dit moet zich kunnen meten met het beste digitale productontwerp dat er is, gelikt tot in het kleinste detail. Jij bent de designer en jij bepaalt hoe. Wat hieronder staat is het wát: de productbeslissingen, de flows en de regels. Die staan vast. Alles daarbuiten, de complete visuele taal, interactiedetails, motion, hiërarchie, is jouw domein, binnen ons design system.

Bijgevoegd is een werkend HTML-prototype. Gebruik het uitsluitend als functionele referentie om de flows en de content te begrijpen. Het is nadrukkelijk geen visueel voorbeeld; jij begint visueel met een schone lei.

### Context

Memortium is een B2B-bedrijf voor memorial portrait editing voor uitvaartbegeleiders in Nederland en België. Wij zijn foto-editing-first: de uitvaartbegeleider levert de foto aan, wij bewerken die, en via het klantportaal stelt de begeleider of de familie zelf de gedenkkaart (rouwkaart) samen. De gebruikers zijn mensen in rouw, of professionals die hen begeleiden. Warmte, sereniteit en precisie zijn het merk. Nooit haast, nooit schreeuwerig.

Mobile first. Een desktopversie volgt later; ontwerp niets dat die onmogelijk maakt.

### De flow: drie stappen

**Stap 1 — Het toneel.** Drie keuzes en de kaart staat: formaat, de foto, thema. Bewust kaal en snel, want daarna gebeurt alles op de kaart zelf.

- Formaat: Enkel of Gevouwen.
- De foto, twee smaken: **Volledige foto** (onze bewerking is het beeld, persoon en achtergrond als één geheel, zoals bij de ceremonie) of **Vrijgezet op thema** (wij zetten het portret vrij en plaatsen het op een van onze handgemaakte themabeelden).
- Indeling, geldt voor beide smaken: Volledig, In kader, Naast tekst, en op de gevouwen kaart ook Sfeer voorop (themabeeld voorop, portret binnenin links). Er is géén optie zonder foto.
- Thema: altijd zichtbaar als echt themabeeld. Vier thema's bij launch (Avondwater, Nachtbloem, Stilte, Veldbloei), het systeem is gebouwd op acht.

**Stap 2 — De kaart als canvas.** Geen formulier. De gebruiker tikt op een tekstblok óp de kaart en schrijft daar, elke letter verschijnt live op de kaart. Kanten wisselen: Voorkant, Binnenzijde (alleen gevouwen), Achterkant.

**Stap 3 — Controle.** Namencheck, drukproef-walkthrough, versturen.

### Functionele eisen (vastgelegd)

- Typografie op de kaart is **1:1 met druk**: puntgroottes zoals ze op A6 gedrukt worden, meeschalend met de preview. De preview houdt altijd het vaste kaartformaat, zo groot als past. De gebruiker moet de kaart ook op maximaal formaat kunnen bekijken.
- Per tekstblok drie fontstappen: klein, normaal, groot. Wij bepalen wat die stappen betekenen.
- Eén uitlijning per kaart (links, gecentreerd, rechts), alle blokken volgen. De enige extra positiekeuze: spreuk boven of onder op de voorkant.
- Vaste, gecureerde volgordes van blokken per kant en formaat. Er is geen sorteer-UI.
- Uitstraling: Automatisch, Licht, Donker. Automatisch leunt naar licht. Deze keuze hoort direct bij de kaart in beeld, want het effect moet meteen beoordeeld kunnen worden. Tekst op beeld moet altijd goed leesbaar zijn, óók bij het lichte gevoel dat families meestal kiezen.
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
- Kies per interactietype één consistent component uit het design system; het prototype wisselt daar nog in, dat is een bekende zwakte.

### Buiten scope

- "Help me schrijven" (AI-schrijfhulp): backlog.
- Desktopversie: later, mobile first nu.
- Echte foto-uploads en het portaal eromheen: bestaan al elders in het product.

### Wat je oplevert

Alle schermen van de drie stappen, world class, mobile first, in het design system. Inclusief: beide formaten, beide foto-smaken, de vier indelingen, de vier thema's, alle invoerpanelen (tekstveld, thema en versiering, lettertype, namen, afscheid), de vergrote kaartweergave, de lock-state, lege en gevulde staten van elk tekstblok, de actieve staat van een blok tijdens het typen, de namencheck, de drukproef met deelvarianten, en het eindscherm.

Begin met stap 1 (Het toneel) en de voorkant van stap 2, dan itereren we per scherm.

---

*Einde prompt.*

---

## Deel 3 — Daarna

Als Designer klaar is: lever mij de Designer-output (of screenshots plus de link) aan, dan schrijf ik de bouwprompt voor Claude Code. Kern daarvan staat al vast: nieuwe editormodule als verse route naast de bestaande editor in memortium-service-portal, fundament (ordermodel, tokens, rollen, deploy) blijft staan, oude editor blijft live tot v2 af is. Technische aandachtspunten die ik meeneem: de cqw-techniek voor 1:1 typografie (let op: container-type vereist een expliciete breedte op de houder), overflow-wrap op alle tekstblokken, en het vaste kaartformaat via aspect-ratio met overflow hidden.
