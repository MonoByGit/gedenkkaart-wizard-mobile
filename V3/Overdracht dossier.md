# Overdracht — het dossier (klantportaal), na stap 2 en stap 3

*Samenvatting van alles wat in dit project al bestaat en werkt, zodat de dossierpagina er naadloos
op aansluit. Bedoeld om te verifiëren en daarna om te zetten in een prompt voor een nieuwe sessie.*

---

## 1. Wat er nu staat

| Stap | Bestand in dit project | Status |
| --- | --- | --- |
| Stap 2, de editor | `Memortium Wizard.dc.html` | klaar, goedgekeurd |
| Stap 3, drukproef, namencheck en versturen | `Memortium Drukproef.dc.html` | klaar, goedgekeurd |
| Stap 1, voorbereiding door de ondernemer | nog niet ontworpen | ontbreekt |
| Het dossier, klantportaal | nog niet ontworpen | **deze volgende ronde** |

Design system: **Memortium Design System**, gebonden in `_ds/…1472ca96…/`. Nunito Sans, geen
accentkleur, radius 1.5rem, knoppen zijn pillen, één randdikte, één kaartschaduw, glas alleen boven
beeld. Beeldassets in `assets/` (portretten `nana`, `carien`, `richard` plus themabeelden).

## 2. De levenscyclus zoals die werkelijk loopt

1. **Bestelling komt binnen** bij Memortium via e-mail (uitvaartondernemer, drukker of fotograaf).
2. **Wij maken het dossier aan.** Vanaf dat moment kan de uitvaartbegeleider meekijken in het
   portaal, ook al is er nog geen bewerkt portret.
3. **Zolang de foto er niet is**, staat overal de plaatshouder met de vaste belofte: "Zodra wij de
   foto hebben, staat het portret hier binnen 24 uur."
4. **Wij zetten het bewerkte portret in het dossier.** Dat is het startsignaal: de kaartwizard
   (stap 2) wordt bruikbaar.
5. De begeleider of de familie stelt de kaart samen (stap 2), loopt de namencheck en de drukproef
   na (stap 3) en verstuurt het pakket.
6. Het pakket landt **in het dossier bij de uitvaartbegeleider**, die het drukwerk verzorgt. Nooit
   "naar de drukker" op een knop.

## 3. Het interactievocabulaire dat vastligt

Deze regels gelden in de hele wizard en dus ook in het dossier:

- **Eén component per interactietype.** Aan/uit met direct zichtbaar effect is een toggle (DS
  `Switch`), wederzijds uitsluitende smaken zijn een segmented control of een strip, een checkbox
  alleen bij meervoudige selectie of een expliciete bevestiging.
- **Segmented control**: pil-in-pil, `var(--secondary)` als spoor, actieve pil op `var(--background)`
  met lichte schaduw, gewicht 700 als actief.
- **Glasvlakken** voor alles wat over de inhoud zweeft: voet, strip, popovers
  (`--glass-nav-bg` / `--glass-nav-border`, blur 40px saturate 140%).
- **Motion**: alles op `cubic-bezier(.16,1,.3,1)`, 250–550 ms. Bladen schuiven van onderen in,
  overlays faden, niets stuitert.
- **Twee-tik-patroon voor secundaire acties** (nieuw in stap 3, geslaagd): een icoonpil vouwt op de
  eerste tik zijn naam en één regel uitleg open, de tweede tik voert uit. Zo blijft de voet laag.
- **Toast** onderin, donker, 4,6 seconden, één zin.
- **Microcopy**: u-vorm, zinsstijl in koppen, geen uitroeptekens, geen em-dash, geen eufemismen.
  Micro-labels in kapitalen met 0.2em spatiëring; veldlabels juist klein en rustig, niet in kapitalen.

## 4. Stap 2 in één blik (de editor)

- De kaart staat groot en permanent in beeld met tabs **Voorkant / Binnenzijde / Achterkant**,
  typografie 1:1 met druk op A6-verhouding.
- Verticale **categorie-rail** over de kaart: Foto, Thema, Indeling, Stijl, Sfeer. Een tik opent
  onder de kaart de **smaken-strip**; elke tik is meteen live.
- Acht thema's (waaronder één die de kleuren uit de foto zelf haalt), per thema een gecureerd
  sfeersetje, kadervorm Recht/Rond/Ovaal/Boog, acht letterparen, uitlijning per pagina.
- **Tekst bewerk je op de kaart**, niet via de rail: tik op een tekstblok. Per blok drie of vier
  grootte-stappen met een meebewegende tekenlimiet.
- **Namenblok** als boom met generatieniveaus, van drie tot veertig namen, eigen grootteknop.
- **Lock**: de uitvaartbegeleider kan het ontwerp vastzetten; de familie werkt dan alleen aan de
  woorden.
- Vaste zinnen: "Precies zoals u het hier ziet, komt de kaart ook gedrukt uit." / "Zodra wij de foto
  hebben, staat het portret hier binnen 24 uur." / "Wijzigingen worden meteen bewaard."

## 5. Stap 3 in één blik (drukproef, namencheck, versturen)

**Drukproefpagina.** Kop met terug en een informatie-icoon; achter dat icoon staan de belofte en de
uitleg samen, inclusief: de verhouding staat vast, het formaat kiest de uitvaartbegeleider bij het
drukken (dus geen A6/A5 op het scherm). Daaronder een horizontale gang met alle kanten van de kaart
op ware verhouding (voorkant, binnenzijde links, binnenzijde rechts, achterkant), snap per kant,
puntjes, en vergroten per kant in een donkere weergave met pijlen.

**Deelvarianten**, afgeleid van de kaartinhoud, achter één segmented control:

- **WhatsApp** — de foto los, vierkant, zonder tekst, plus het bericht als kopieerbare tekst,
  opgebouwd uit de ingevulde gegevens (naam, volledige naam, partnerregel, geboren, overleden,
  plechtigheid, groetmoment, condoleren, online condoleren). Kopieerknop met bevestiging.
- **Instagram** 4:5 — de foto met naam en data, witte letters op een beschermgradient die naar nul
  uitloopt en onder de kin stopt; de hoogte wordt per formaat uit de kadering van het portret berekend.
- **Facebook** liggend 1200×627 — een staand portret past liggend niet beeldvullend zonder dat de
  tekst op het gezicht valt, dus staat het portret rechts met een lange overvloei (volledig dicht
  vóór het gezicht begint) en ligt de spreuk links op papier in de themakleur.
- Alles downloadbaar, bestandsnamen als `greet-van-doorn-instagram.jpg`.

**De acties**, op één regel in een lage glazen voet: een zwarte pil **Versturen** plus twee
icoonpillen (downloaden, terug). Twee-tik-patroon: de zwarte pil heet bij de eerste tik **Namen
nalopen** en groeit; de tweede tik opent de namencheck. Na versturen staat er gedempt
**Verstuurd**, en een tik erop heet **Namen nog eens nalopen**.

**De namencheck** (eigen scherm, schuift van onderen in, "Kloppen de namen?"):

- Voortgangslijn met "8 van 25 nagelopen".
- Eén regel die zegt wie u bent en wat u mag.
- **Kerngegevens**: roepnaam, volledige naam, partnerregel, geboren, overleden.
- **Alle regels van het namenblok**, met generatie-inspringing en het kruisje.
- Per regel: rondje om te bevestigen, of **Wijzig** om te corrigeren. Corrigeren is bevestigen:
  Klaar zet de regel op nagelopen.
- Bij een naamregel opent een paneel: waar de regel hoort (**kind of naaste / kleinkind /
  achterkleinkind**), een toggle "Dit is een relatieregel" met de uitleg dat die cursief op de kaart
  staat, een toggle "Ook overleden" (kruisje), en **Regel weghalen** met een icoon. Plus
  **Naam toevoegen** onder de lijst.
- **Tekenruimte per veld**, zodat de opmaak nooit overloopt: roepnaam 34, volledige naam 48,
  partnerregel 48, naamregel 40, relatieregel 56. Live: "Nog 12 tekens ruimte op de kaart."
- Voor veertig namen één pil: "De overige 18 kloppen".
- Versturen kan pas als alles is nagelopen; de knop heet altijd **Versturen naar de
  uitvaartbegeleider** en is grijs tot dat moment, met de reden erboven.

**Rechten (voorstel, nu ingebouwd).** De familie corrigeert de namen, de roepnaam, de volledige naam
en de partnerregel zelf. Geboorte- en overlijdensgegevens komen uit de aangifte: daar heeft de
familie geen invoerveld maar **Vraag stellen**, een blad met een voorgeschreven begin ("Ik denk dat
de geboorteplaats of -datum niet klopt: ") dat als vraag in het dossier komt. De regel toont daarna
**Vraag gesteld**. De uitvaartbegeleider mag alles wijzigen.

**Het dossierlog in stap 3.** Onderaan de namencheck staat "In het dossier": elke wijziging en elke
vraag met tijdstip en met naam en oude waarde erbij, bijvoorbeeld:

- `21:38  Partnerregel gewijzigd: "weduwe van Ton Bosman" werd "…"`
- `21:38  "Nout" staat nu als achterkleinkind, was kleinkind`
- `21:38  "haar man" is nu een naam, was een relatieregel`
- `21:38  Kruisje gezet bij "Marijke"`
- `21:38  Regel weggehaald: "Annie"`
- `21:38  Regel toegevoegd aan het namenblok`
- `21:38  Vraag gesteld over de geboorteplaats en datum: "…"`

## 6. Wat het dossier van de wizard moet ontvangen

Elke gebeurtenis hieronder bestaat al als interactie in stap 2 of 3 en moet in het dossier
terugkomen, met tijdstip en met wie het deed (begeleider of familie):

1. **Dossier aangemaakt** — na de bestelling per e-mail, door Memortium.
2. **Portret geplaatst** — het bewerkte portret staat in het dossier; hiermee gaat de wizard open.
   Tot dat moment: plaatshouder met de 24-uursbelofte.
3. **Ontwerp vastgezet of vrijgegeven** door de begeleider (lock uit stap 2).
4. **Elke tekstwijziging op de kaart** — welk blok, oude en nieuwe waarde.
5. **Elke wijziging in het namenblok** — naam gewijzigd, generatieniveau veranderd, relatieregel
   aan of uit, kruisje aan of uit, regel toegevoegd, regel weggehaald. Altijd met naam en oude stand,
   want de begeleider moet kunnen verifiëren.
6. **Vraag van de familie** over een vastgezet gegeven (geboren, overleden) — met de tekst van de
   vraag, en een seintje naar de begeleider. Antwoorden hoort dus ook in het dossier te kunnen.
7. **Namencheck afgerond** — hoeveel regels, door wie, op welk moment.
8. **Pakket verstuurd** — de kaart (alle kanten) plus de drie deelbeelden, met tijdstip. De
   begeleider krijgt een melding; het pakket staat in het dossier klaar voor het drukwerk.
9. **Download** door familie of begeleider — welk bestand.
10. **Verzoek om aanpassing** — "Ik wil iets aanpassen" leidt terug naar de woorden, de namen of het
    ontwerp; het dossier moet zien dat er na versturen nog gewijzigd is.

## 7. Wat de dossierpagina zelf waarschijnlijk moet kunnen

Ter verificatie met co-work, nog niet ontworpen:

- **Bestellingen zien** van deze uitvaartondernemer, met status en levertijd (Essentieel € 49 binnen
  24 uur, Impuls € 99 binnen 4 uur bij bestelling vóór 14:00, Ceremoniepakket Levenslied € 249).
- **Per dossier**: de overledene, het portret (bewerkt als held, origineel als inzet), de status van
  de kaart, de tijdlijn met bovenstaande gebeurtenissen, de gestelde vragen, de bestanden van het
  verstuurde pakket, en de weg naar de wizard.
- **De familie erbij zetten** (uitnodigen), plus het vastzetten van het ontwerp.
- **Statussen** die uit het bovenstaande volgen: dossier aangemaakt, wachten op foto, portret klaar,
  kaart in bewerking, namencheck open, verstuurd, in drukwerk.
- Het portaal heeft al kits in het design system: `templates/portaal/` (opdrachten, detailpaneel,
  nieuwe opdracht) en `templates/facturen/`. Die zijn het startpunt, niet iets nieuws.

## 8. Buiten scope gebleven

Drieluik, AI-schrijfhulp, een aparte Belgische kaartvariant, desktop (mobile first ontworpen, niets
dat desktop onmogelijk maakt), echte uploads, en het eindscherm na het versturen (nu een gedempte
knop plus melding; een eigen eindscherm is nog niet gemaakt).

## 9. Voorbeelddata die overal terugkomt

- **Greet van Doorn** — Margaretha Johanna van Doorn-Verheij, echtgenote van Hendrik van Doorn,
  \* Zwolle 14 maart 1946, † Deventer 8 augustus 2026, 22 namen, Uitvaartzorg De Vijverhof.
- **Carien Bosman** — korte kaart, 3 namen, Uitvaartzorg Duin en Berg.
- **Richard Kastelein** — 40 namen, de zware kant van het namenblok, Uitvaartzorg Sint-Martinus.
