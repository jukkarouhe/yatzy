# Yatzy Turnaus

Noppa-yatzyn pistetaulukko puhelimelle. Sovellus laskee pisteet, tarkistaa syötteet, vaihtaa vuoroa ja pitää kirjaa usean kierroksen turnauksesta.

**Pelaa:** https://jukkarouhe.github.io/yatzy/

Ei asennusta: avaa linkki selaimessa ja pelaa. iPhonella paras kokemus saadaan Safarilla.

## Ominaisuudet

- 1–6 pelaajaa, nimet enintään 10 merkkiä
- Pisteiden syöttö kategorioittain, virheelliset arvot korostetaan punaisella
- Välisumma, bonus (50 pistettä, kun yläosa ≥ 63) ja kokonaispisteet lasketaan automaattisesti
- Vuoro siirtyy seuraavalle pelaajalle, kun pistekenttä on täytetty
- Turnauksen kokonaistilanne: kierrokset tallennetaan ja summataan
- Peli säilyy selaimen `localStorage`ssa, joten sivun voi sulkea kesken pelin

## Tekniikka

- Puhdas HTML, CSS ja JavaScript, ei riippuvuuksia eikä build-vaihetta
- Julkaisu GitHub Pagesin kautta `main`-haarasta
- Käyttöliittymä on suomeksi

## Kehitys paikallisesti

1. Kloonaa repo: `git clone https://github.com/jukkarouhe/yatzy.git`
2. Avaa `index.html` selaimessa (tuplaklikkaus riittää) tai VS Codessa Live Server -lisäosalla
3. Muokkaa koodia ja päivitä selain nähdäksesi muutokset
4. Julkaise: `git add . && git commit -m "Kuvaus muutoksesta" && git push`. GitHub Pages päivittyy yleensä minuutissa.

Lisää tietoa kehityskäytännöistä on tiedostossa [CLAUDE.md](CLAUDE.md).
