# Overdracht, de omgeving van de uitvaartondernemer

Bron: `Memortium Omgeving.dc.html` (goedgekeurd 21 augustus 2026). Designsysteem: Memortium,
tokens uit `_ds/…/tokens/`. Geen kleur buiten de tokens, geen tweede letter, radius 1.5rem,
knoppen zijn pillen. Alles hieronder is vastgesteld tenzij er "open" staat.

## Wat dit scherm is

Het werkoverzicht van één uitvaartonderneming, accountloos benaderd via een magic link op het
e-mailadres van de begeleider. Geen facturatie, geen berichtenmodule: dit is de lijst met dossiers
en wat er van u wordt verwacht.

Aangemeld in het voorbeeld: Marjan de Wit, Uitvaartzorg De Vijverhof.

## De drie weergaven

Eén strip onder de titel, sticky in de scroll, met een verloop van papierkleur naar transparant
zodat kaarten eronderdoor verdwijnen zonder harde rand.

| Weergave | Bevat | Badge |
| --- | --- | --- |
| Aan u | dossiers waar de ingelogde begeleider zelf aan zet is, plus dossiers die binnen 7 dagen vervallen | balletje + aantal, pulserend |
| Open | alles wat nog loopt, van alle begeleiders | kaal aantal |
| Alles | de afgelopen twee maanden, dus ook wat dicht is | kaal aantal |

Op Open en Alles komt de begeleiderregel erbij: chips "Iedereen · n", "Marjan de Wit · n",
"Hans Kluft · n". Op Aan u is die rij verborgen: dat is per definitie uw eigen werk.

Een dossier is dicht (`who: 'klaar'`) maar blijft twee maanden in Alles staan. In die periode kan
de ondernemer nog downloaden en bijbestellen. Daarna verhuist het naar het archief en zijn de
bestanden verwijderd.

## De kaart

Van boven naar onder: portretduim 46×61 (radius 14, streepjesrand met initialen als er nog geen
foto is), naam (700), badge rechts uitgelijnd, status (500), volgende stap (muted), en twee
metaregels: laatste gebeurtenis (muted) en de bestelling (500).

Badgelogica, één regel per geval:

- aan zet bij u → gevuld vlak, klein pulserend bolletje, tekst "AAN U"
- aan zet bij een collega → lijnpil, "BIJ HANS" (voornaam, anders kapt de naam af)
- wachten op de familie → lijnpil "BIJ DE FAMILIE"
- wachten op Memortium → lijnpil "BIJ ONS"
- dicht → lijnpil "AFGEROND"

Onder de kaart een knoppenrij; rechts in diezelfde rij staat de ronde chevron die het dossier
opent. Die pijl staat bewust niet meer halverhoogte naast de tekst: daar leek hij te beloven dat
hij iets uitklapt.

Acties per situatie:

- melding van de familie → "Gegeven corrigeren" (gevuld) en "Laten staan" (lijn)
- geen foto ontvangen → "Foto sturen"
- dossier van een collega → "Overnemen van Hans"
- vervalt binnen 7 dagen → "Alles downloaden", in twee tikken (eerste tik zet de knop om in
  "Nog een tik en het staat klaar", vervalt na 4 seconden)
- dicht, binnen twee maanden → "Bedankkaart bijbestellen, € 32" en "Bestanden downloaden"

## Eén richting, en dat is expres

Wij hebben geen e-mailadres van de familie. Er is dus geen antwoordknop en geen gesprek. De
familie meldt iets in de kaartwizard, de ondernemer corrigeert het gegeven of laat het staan, en
de familie ziet dat terug in de wizard: de nieuwe waarde, of de aantekening dat het is nagekeken,
met datum. Bouw hier geen berichtenkanaal in.

Het correctieblad kent per veld een tekenteller tegen de ruimte op de kaart (geboorteplaats 34,
geboortedatum 30). De oude waarde blijft in het dossier staan.

## Prijzen

- Portret € 49 regulier, € 99 met spoed (Impuls, binnen 4 uur bij bestelling vóór 14:00)
- Compleet € 129: portret, rouwkaart, bedankkaart
- Het kaartendeel is dus € 80, 60/40 verdeeld: rouwkaart € 48, bedankkaart € 32
- Met spoed komt het verschil van € 50 erbovenop: compleet € 179

Alle bedragen inclusief btw, weergave als `€ 49`. De maandregel onder het archief toont alleen het
totaal; de specificatie staat per dossier in het archief.

## Het archief

De kop Archief is zelf de knop: label, "14 dossiers ouder dan twee maanden", en een chevron die
90 graden draait bij openen. Rijen zijn kale regels met naam, datum, bedrag en een chevron,
gescheiden door één haarlijn.

Een rij opent een blad van onderaf met de bestelgeschiedenis: per regel wat, wanneer en hoeveel,
daaronder "Samen" met de lijn in `--primary` erboven. Geen download, geen actie: na twee maanden
zijn de bestanden verwijderd. Eén knop, "Sluiten".

## Statusketen

Vastgesteld, verfijn de labels maar niet de keten: dossier aangemaakt → wacht op de foto → het
portret wordt bewerkt → het portret is klaar → wacht op de familie → de kaart wordt gemaakt →
het pakket is klaar → gedownload → dicht.

## Donkere modus

`data-theme="dark"` op het schermelement; alle waarden komen uit `tokens/colors.css`. Er staan
geen losse hexwaarden in het scherm, op de toestelbezel na. De toast draait mee via
`--primary` / `--primary-foreground`. Druk kent geen donkere modus.

## Motie

Kaarten komen op met `memRise` 0.5s `cubic-bezier(.16,1,.3,1)`, filterwissels met `memFade` 0.35s,
bladen schuiven met transform 0.5s op dezelfde curve. Het balletje pulseert 2.8s. Verder niets:
geen bounce, geen parallax.

## Tweaks in het ontwerp

`startFilter` (Aan u / Open / Alles), `openVraag` (melding open of afgehandeld), `donker`,
`aanUAccent` (Donker vlak / Warm vlak / Warme rand).

## Open

1. **Accent op "Aan u".** Nu Donker vlak. Warm vlak en Warme rand staan klaar met de
   Levenslied-tinten (`#a8814f`), maar het systeem zegt: geen accentkleur, alleen Levenslied mag
   warm worden. Kiezen we warm, dan is dat een uitbreiding van die regel en hoort hij in het
   designsysteem vastgelegd te worden.
2. **Begeleiderlaag.** Nu een chipfilter. De vraag is of de onderneming een eigen weergave per
   begeleider wil, met wie waarop wacht.
3. **Toegang.** Magic link, wachtscherm en verlopen link zijn nog niet ontworpen.
4. **Aantallen.** "14 dossiers ouder dan twee maanden" en de maandregel zijn voorbeelddata.
