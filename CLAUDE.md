# CLAUDE.md – Yatzy Turnaus

Ohjeet Claudelle tämän repon jatkokehitykseen. Käytä suomea keskustelussa ja käyttöliittymätekstit suomeksi.

## Projekti

Noppa-yatzyn pistetaulukko ja turnauspeli puhelimelle. Loppukäyttäjä avaa linkin (https://jukkarouhe.github.io/yatzy/) ja pelaa heti, ilman asennusta. Omistaja Jukka on harrastaja-"vibe-koodari": selitä muutokset selkeästi ja anna ohjeet askel askeleelta.

## Rakenne

- `index.html` – sivun rakenne (HTML) ja Google Analytics -pätkä
- `style.css` – kaikki tyylit
- `app.js` – pelilogiikka (pelaajat, pisteiden laskenta, vuoronvaihto, tallennus)
- `i18n.js` – kielituki: kaikki tekstit suomeksi ja englanniksi (`I18N`), sääntötekstit (`RULES`) ja liput (`FLAGS`, inline-SVG)
- `README.md`, `.gitignore`, `CLAUDE.md`

## Tärkeät rajoitteet

1. **Ei asennusta eikä build-vaihetta.** Sovelluksen pitää toimia pelkällä linkin klikkauksella GitHub Pagesissa. Ei npm-riippuvuuksia, bundlereita tai frameworkeja ilman Jukan erillistä hyväksyntää.
2. **Mobiili ensin.** Ensisijaiset käyttäjät pelaavat puhelimella (erityisesti iPhone + Safari). Testaa muutokset kapealla näytöllä. `index.html` sisältää bannerin, joka neuvoo iPhonen Chrome-käyttäjiä avaamaan sivun Safarissa.
3. **Pelitilan yhteensopivuus.** Tila tallennetaan `localStorage`-avaimeen `YATZY_TURN_V2`. Älä muuta avainta tai tallennusmuotoa ilman migraatiota, muuten käynnissä olevat pelit katoavat.
4. **Google Analytics** (`gtag`, tunnus G-W3XL20NCRR) on `<head>`issa. Säilytä se, ellei Jukka pyydä poistamaan.
5. **Ei palvelinyhteyttä.** Peli ei lähetä pelidataa minnekään; kaikki tapahtuu selaimessa.

## Pelisäännöt koodissa

Kategoriat ja niiden rajat ovat `cats`-taulukossa: `m` = suurin sallittu arvo, `min` = pienin sallittu nollasta poikkeava arvo, `f` = sallitut kiinteät arvot (suorat ja Yatzy). Bonus 50 pistettä, kun yläosan summa ≥ 63. Jos sääntöjä muutetaan (esim. "2 Paria" -rajat), päivitä vain `cats` ja tarkista, että syötteen validointi (`calc`) toimii edelleen.

## Kielituki (suomi/englanti)

- Peli aukeaa oletuksena suomeksi. Käyttäjän valinta tallennetaan `localStorage`-avaimeen `YATZY_LANG` (erillään pelitilasta `YATZY_TURN_V2`)
- Liput (FI, UK) ovat otsikon oikealla puolella, ja ne näkyvät sekä etusivulla että pelin aikana. Ne eivät saa kasvattaa otsikon korkeutta
- **Kaikki käyttäjälle näkyvät tekstit ovat `i18n.js`:ssä.** Älä kirjoita tekstiä suoraan HTML:ään tai `app.js`:ään. Lisää avain molemmille kielille (`fi` ja `en`) ja käytä `t('avain')` (koodissa) tai `data-i18n="avain"` (HTML:ssä)
- Kategorioiden nimet ovat avaimia `cat_<id>` (esim. `cat_fh`), ja `cats`-taulukossa on vain id ja rajat
- `applyLang()` päivittää tekstit kielenvaihdossa koskematta syötettyihin pisteisiin
- Sääntötekstit (`RULES`) pitää vastata `cats`-taulukkoa (rajat, bonus, "neljää samaa ei hyväksytä kahdeksi pariksi"). Jos pelisääntöjä muutetaan, päivitä molemmat kielet
- `i18n.js` ladataan ennen `app.js`:ää, ja molemmat ovat tavallisia skriptejä (ei `type="module"`)

## Tiedostojako (tehty 22.11.2026)

`index.html` jaettiin erillisiksi tiedostoiksi niin, että pelin voi edelleen pelata pelkällä linkillä. Säännöt, jotka pitää säilyttää:

- Käytä **suhteellisia polkuja** (`href="style.css"`, `src="app.js"`), jotta sivu toimii GitHub Pagesin alipolussa `/yatzy/`
- Lataa skripti tavallisesti `<script src="app.js"></script>`, **ei** `type="module"`. Moduulit eivät toimi, jos tiedosto avataan suoraan levyltä (`file://`), ja HTML:n `onclick`-attribuutit tarvitsevat globaalit funktiot (`addP`, `start`, `archiveRound`, `clearGame`)
- Pidä `gtag`-pätkä `index.html`:ssä
- Ei build-vaihetta eikä ulkoisia CDN-riippuvuuksia
- Selaimen välimuisti voi näyttää vanhoja CSS/JS-tiedostoja julkaisun jälkeen; jos näin käy, lisää versiotunnus (`app.js?v=2`, `style.css?v=2`)

## Työtapa

- Pienet, selkeät muutokset; yksi asia kerrallaan
- Testaa ennen commitointia (avaa `index.html` selaimessa, kokeile pelaajien lisäys, pisteiden syöttö, vuoronvaihto, kierroksen tallennus ja nollaus)
- Commit-viestit lyhyitä ja kuvaavia
- Julkaisu: push `main`-haaraan päivittää GitHub Pagesin
