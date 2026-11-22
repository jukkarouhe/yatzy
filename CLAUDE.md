# CLAUDE.md – Yatzy Turnaus

Ohjeet Claudelle tämän repon jatkokehitykseen. Käytä suomea keskustelussa ja käyttöliittymätekstit suomeksi.

## Projekti

Noppa-yatzyn pistetaulukko ja turnauspeli puhelimelle. Loppukäyttäjä avaa linkin (https://jukkarouhe.github.io/yatzy/) ja pelaa heti, ilman asennusta. Omistaja Jukka on harrastaja-"vibe-koodari": selitä muutokset selkeästi ja anna ohjeet askel askeleelta.

## Rakenne

- `index.html` – koko sovellus tällä hetkellä yhdessä tiedostossa (HTML + CSS + JS)
- `README.md`, `.gitignore`, `CLAUDE.md`

## Tärkeät rajoitteet

1. **Ei asennusta eikä build-vaihetta.** Sovelluksen pitää toimia pelkällä linkin klikkauksella GitHub Pagesissa. Ei npm-riippuvuuksia, bundlereita tai frameworkeja ilman Jukan erillistä hyväksyntää.
2. **Mobiili ensin.** Ensisijaiset käyttäjät pelaavat puhelimella (erityisesti iPhone + Safari). Testaa muutokset kapealla näytöllä. `index.html` sisältää bannerin, joka neuvoo iPhonen Chrome-käyttäjiä avaamaan sivun Safarissa.
3. **Pelitilan yhteensopivuus.** Tila tallennetaan `localStorage`-avaimeen `YATZY_TURN_V2`. Älä muuta avainta tai tallennusmuotoa ilman migraatiota, muuten käynnissä olevat pelit katoavat.
4. **Google Analytics** (`gtag`, tunnus G-W3XL20NCRR) on `<head>`issa. Säilytä se, ellei Jukka pyydä poistamaan.
5. **Ei palvelinyhteyttä.** Peli ei lähetä pelidataa minnekään; kaikki tapahtuu selaimessa.

## Pelisäännöt koodissa

Kategoriat ja niiden rajat ovat `cats`-taulukossa: `m` = suurin sallittu arvo, `min` = pienin sallittu nollasta poikkeava arvo, `f` = sallitut kiinteät arvot (suorat ja Yatzy). Bonus 50 pistettä, kun yläosan summa ≥ 63. Jos sääntöjä muutetaan (esim. "2 Paria" -rajat), päivitä vain `cats` ja tarkista, että syötteen validointi (`calc`) toimii edelleen.

## Suunniteltu: tiedoston jako

Myöhemmin `index.html` jaetaan erillisiksi tiedostoiksi, kun Jukka pyytää sitä. Ehdoton vaatimus: pelin pitää toimia edelleen pelkällä linkillä ilman asennusta. Tämän vuoksi:

- Tiedostot: `index.html`, `style.css`, `app.js` (tarvittaessa lisää), kaikki samassa kansiossa tai alikansioissa
- Käytä **suhteellisia polkuja** (`href="style.css"`, `src="app.js"`), ei absoluuttisia, jotta sivu toimii GitHub Pagesin alipolussa `/yatzy/`
- Käytä tavallista `<script src="app.js"></script>` -latausta, **ei** `type="module"`. Moduulit eivät toimi, jos tiedosto avataan suoraan levyltä (`file://`), ja HTML:n `onclick`-attribuutit tarvitsevat globaalit funktiot
- Pidä `gtag`-pätkä `index.html`:ssä
- Ei build-vaihetta eikä ulkoisia CDN-riippuvuuksia
- Testaa jaon jälkeen: avaa `index.html` tuplaklikkaamalla ja GitHub Pagesin kautta puhelimella; vanhan pelin pitää latautua `localStorage`sta
- Selaimen välimuisti voi näyttää vanhoja CSS/JS-tiedostoja julkaisun jälkeen; harkitse versiotunnusta (`app.js?v=2`) tarvittaessa

## Työtapa

- Pienet, selkeät muutokset; yksi asia kerrallaan
- Testaa ennen commitointia (avaa `index.html` selaimessa, kokeile pelaajien lisäys, pisteiden syöttö, vuoronvaihto, kierroksen tallennus ja nollaus)
- Commit-viestit lyhyitä ja kuvaavia
- Julkaisu: push `main`-haaraan päivittää GitHub Pagesin
