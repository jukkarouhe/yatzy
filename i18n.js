// Kielituki: suomi (oletus) ja englanti.
// Kaikki käyttäjälle näkyvät tekstit ovat tässä tiedostossa. Lisää uusi teksti
// molemmille kielille (fi ja en) ja käytä sitä koodissa funktiolla t('avain').

const I18N = {
    fi: {
        title: 'Yatzy Turnaus',
        docTitle: 'Yatzy Turnaus - Scoreboard',
        banner: '📱 Paras kokemus iPhonella saadaan Safarilla. Kopioi linkki ja avaa se Safarissa.',
        addPlayers: 'Lisää pelaajat (1-6)',
        playerName: 'Pelaajan nimi',
        add: 'Lisää',
        players: 'Pelaajat: ',
        start: 'ALOITA PELI',
        rulesShow: 'Yatzy säännöt',
        rulesHide: 'Piilota säännöt',
        turn: 'VUORO: ',
        category: 'Kategoria',
        saveRound: 'Tallenna kierros & Nollaa tulostaulu',
        histTitle: 'TURNAUKSEN KOKONAISTILANNE',
        reset: 'Nollaa koko peli',
        player: 'Pelaaja',
        total: 'YHTEENSÄ',
        round: 'Kierros ',
        confirmReset: 'Nollaa kaikki?',
        fixErrorFirst: 'Korjaa punainen virhe ensin!',
        fixErrorsBeforeSave: 'Korjaa virheet ennen tallennusta!',
        langName: 'Suomi',
        cat_1: 'Ykköset', cat_2: 'Kakkoset', cat_3: 'Kolmoset',
        cat_4: 'Neloset', cat_5: 'Viitoset', cat_6: 'Kuutoset',
        cat_sum: 'Välisumma', cat_bon: 'Bonus (50)',
        cat_p1: 'Pari', cat_p2: '2 Paria', cat_3k: '3 Samaa', cat_4k: '4 Samaa',
        cat_ss: 'Pieni suora', cat_ls: 'Iso suora', cat_fh: 'Täyskäsi',
        cat_ch: 'Sattuma', cat_yz: 'Yatzy', cat_tot: 'YHTEENSÄ'
    },
    en: {
        title: 'Yatzy Tournament',
        docTitle: 'Yatzy Tournament - Scoreboard',
        banner: '📱 The best experience on iPhone is with Safari. Copy the link and open it in Safari.',
        addPlayers: 'Add players (1-6)',
        playerName: 'Player name',
        add: 'Add',
        players: 'Players: ',
        start: 'START GAME',
        rulesShow: 'Yatzy rules',
        rulesHide: 'Hide rules',
        turn: 'TURN: ',
        category: 'Category',
        saveRound: 'Save round & Clear scoreboard',
        histTitle: 'TOURNAMENT STANDINGS',
        reset: 'Reset whole game',
        player: 'Player',
        total: 'TOTAL',
        round: 'Round ',
        confirmReset: 'Reset everything?',
        fixErrorFirst: 'Fix the red error first!',
        fixErrorsBeforeSave: 'Fix the errors before saving!',
        langName: 'English',
        cat_1: 'Ones', cat_2: 'Twos', cat_3: 'Threes',
        cat_4: 'Fours', cat_5: 'Fives', cat_6: 'Sixes',
        cat_sum: 'Subtotal', cat_bon: 'Bonus (50)',
        cat_p1: 'Pair', cat_p2: '2 Pairs', cat_3k: '3 of a kind', cat_4k: '4 of a kind',
        cat_ss: 'Small straight', cat_ls: 'Large straight', cat_fh: 'Full house',
        cat_ch: 'Chance', cat_yz: 'Yatzy', cat_tot: 'TOTAL'
    }
};

// Pelisäännöt molemmilla kielillä. Sisällön pitää vastaa koodattua peliä (cats-taulukko app.js:ssä).
const RULES = {
    fi: {
        title: 'Yatzyn säännöt',
        sections: [
            { h: 'Tavoite', p: ['Yatzyä pelataan viidellä nopalla. Tavoitteena on kerätä heittämällä mahdollisimman monta pistettä eri yhdistelmistä. Voittaja on pelaaja, jolla on lopuksi suurin kokonaispistemäärä.'] },
            { h: 'Vuoro', p: ['Pelaaja heittää noppia enintään kolme kertaa. Ensimmäisellä heitolla heitetään kaikki viisi noppaa. Sen jälkeen pelaaja valitsee vapaasti, mitkä nopat säilyttää ja mitkä heittää uudelleen. Kaikkia kolmea heittoa ei ole pakko käyttää.',
                'Lopuksi tulos kirjataan yhteen vapaana olevaan kohtaan, ja kirjausjärjestys on vapaa. Jos heitto ei sovi mihinkään jäljellä olevaan kohtaan, merkitään nolla pistettä valittuun kohtaan.'] },
            { h: 'Yläosa', p: ['Ykköset–kuutoset: lasketaan yhteen vain ne nopat, joissa on kyseinen silmäluku. Esimerkki: 4+4+4+2+6 on nelosissa 12 pistettä.',
                'Bonus: jos yläosan summa on 63 tai enemmän, saa 50 bonuspistettä.'] },
            { h: 'Alaosa', li: [
                'Pari: kaksi samaa, pisteet näiden kahden summa. 1+3+4+5+5 = 10',
                '2 Paria: kaksi eri paria, pisteet näiden neljän summa. 1+3+3+5+5 = 16. Neljää samaa ei hyväksytä kahdeksi pariksi.',
                '3 Samaa: kolme samaa, pisteet näiden kolmen summa. 2+4+4+4+5 = 12',
                '4 Samaa: neljä samaa, pisteet näiden neljän summa. 2+3+3+3+3 = 12',
                'Pieni suora: 1+2+3+4+5 = 15 pistettä',
                'Iso suora: 2+3+4+5+6 = 20 pistettä',
                'Täyskäsi: kolme samaa ja eri pari, pisteet kaikkien viiden nopan summa. 3+3+6+6+6 = 24',
                'Sattuma: mikä tahansa yhdistelmä, pisteet kaikkien noppien summa',
                'Yatzy: viisi samaa, aina 50 pistettä'] },
            { h: 'Sovelluksen käyttö', p: ['Lisää 1–6 pelaajaa ja aloita peli. Kirjoita pisteet vuorossa olevan pelaajan sarakkeeseen. Vuoro siirtyy seuraavalle, kun kenttä on täytetty. Voit vaihtaa vuoroa myös napauttamalla pelaajan nimeä.',
                'Sovellus hyväksyy vain mahdolliset pistemäärät (esim. Pari 2–12, Täyskäsi 7–28, Pieni suora 15, nolla käy aina) ja merkitsee virheelliset punaisella. Se ei näe noppia, joten pelaajat valvovat itse, että yhdistelmä on oikea.',
                '"Tallenna kierros" lisää pisteet turnauksen kokonaistilanteeseen ja tyhjentää taulukon uutta kierrosta varten.'] }
        ],
        more: { text: 'Lisätietoa: Wikipedia', url: 'https://fi.wikipedia.org/wiki/Yatzy' }
    },
    en: {
        title: 'Yatzy rules',
        sections: [
            { h: 'Goal', p: ['Yatzy is played with five dice. The goal is to score as many points as possible by rolling different combinations. The winner is the player with the highest total score at the end.'] },
            { h: 'Turn', p: ['A player rolls the dice up to three times. The first roll uses all five dice. After that the player freely chooses which dice to keep and which to roll again. You do not have to use all three rolls.',
                'Finally the result is written into one free box, and the boxes can be filled in any order. If the roll does not fit any remaining box, write zero points in a box of your choice.'] },
            { h: 'Upper section', p: ['Ones to Sixes: add up only the dice showing that number. Example: 4+4+4+2+6 scores 12 in Fours.',
                'Bonus: if the upper section totals 63 or more, you get a 50-point bonus.'] },
            { h: 'Lower section', li: [
                'Pair: two dice with the same number, score is the sum of those two. 1+3+4+5+5 = 10',
                '2 Pairs: two different pairs, score is the sum of those four dice. 1+3+3+5+5 = 16. Four of a kind does not count as two pairs.',
                '3 of a kind: three dice with the same number, score is the sum of those three. 2+4+4+4+5 = 12',
                '4 of a kind: four dice with the same number, score is the sum of those four. 2+3+3+3+3 = 12',
                'Small straight: 1+2+3+4+5 = 15 points',
                'Large straight: 2+3+4+5+6 = 20 points',
                'Full house: three of one number and a pair of another, score is the sum of all five dice. 3+3+6+6+6 = 24',
                'Chance: any combination, score is the sum of all dice',
                'Yatzy: five dice with the same number, always 50 points'] },
            { h: 'Using the app', p: ['Add 1–6 players and start the game. Type the scores into the column of the player whose turn it is. The turn passes to the next player when a box is filled in. You can also change turns by tapping a player\'s name.',
                'The app only accepts possible scores (e.g. Pair 2–12, Full house 7–28, Small straight 15, zero is always allowed) and marks invalid entries in red. It cannot see the dice, so the players must make sure the combination is correct.',
                '"Save round" adds the scores to the tournament standings and clears the table for a new round.'] }
        ],
        more: { text: 'More information: Wikipedia', url: 'https://en.wikipedia.org/wiki/Yatzy' }
    }
};

// Liput inline-SVG:nä, jotta erillistä latausta ei tarvita.
const FLAGS = {
    fi: '<svg viewBox="0 0 18 11" width="30" height="18" aria-hidden="true" focusable="false"><rect width="18" height="11" fill="#fff"/><rect x="5" width="3" height="11" fill="#003580"/><rect y="4" width="18" height="3" fill="#003580"/></svg>',
    en: '<svg viewBox="0 0 60 30" width="30" height="18" aria-hidden="true" focusable="false"><clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#uk-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>'
};

const LANG_KEY = 'YATZY_LANG';
let lang = 'fi';

function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.fi[key] || key;
}

function rulesOpen() {
    const p = document.getElementById('rules-panel');
    return !!p && p.style.display !== 'none';
}

function toggleRules() {
    const p = document.getElementById('rules-panel');
    p.style.display = rulesOpen() ? 'none' : 'block';
    updateRulesToggle();
}

function updateRulesToggle() {
    const b = document.getElementById('rules-toggle');
    if (!b) return;
    b.innerText = t(rulesOpen() ? 'rulesHide' : 'rulesShow');
    b.setAttribute('aria-expanded', rulesOpen() ? 'true' : 'false');
}

function renderRules() {
    const panel = document.getElementById('rules-panel');
    if (!panel) return;
    const r = RULES[lang];
    panel.textContent = '';
    const h = document.createElement('h3');
    h.textContent = r.title;
    panel.appendChild(h);
    r.sections.forEach(s => {
        const h4 = document.createElement('h4');
        h4.textContent = s.h;
        panel.appendChild(h4);
        (s.p || []).forEach(txt => {
            const p = document.createElement('p');
            p.textContent = txt;
            panel.appendChild(p);
        });
        if (s.li) {
            const ul = document.createElement('ul');
            s.li.forEach(txt => {
                const li = document.createElement('li');
                li.textContent = txt;
                ul.appendChild(li);
            });
            panel.appendChild(ul);
        }
    });
    const more = document.createElement('p');
    const a = document.createElement('a');
    a.href = r.more.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = r.more.text;
    more.appendChild(a);
    panel.appendChild(more);
}

function renderFlags() {
    const box = document.getElementById('lang-switch');
    if (!box) return;
    box.textContent = '';
    ['fi', 'en'].forEach(code => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'flag-btn' + (code === lang ? ' active' : '');
        b.setAttribute('aria-label', I18N[code].langName);
        b.setAttribute('aria-pressed', code === lang ? 'true' : 'false');
        b.title = I18N[code].langName;
        b.innerHTML = FLAGS[code];
        b.onclick = () => setLang(code);
        box.appendChild(b);
    });
}

// Päivittää kaikki näkyvät tekstit valittuun kieleen. Syötettyihin pisteisiin ei kosketa.
function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('docTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('td.row-label[data-cat]').forEach(td => { td.innerText = t('cat_' + td.dataset.cat); });
    renderFlags();
    renderRules();
    updateRulesToggle();
    renderPlayerList();
    if (players.length > 0) updateUI();
    else document.getElementById('status-hint').innerText = t('turn') + '-';
    renderHistory();
}

function setLang(code) {
    if (!I18N[code]) return;
    lang = code;
    try { localStorage.setItem(LANG_KEY, code); } catch (e) {}
    applyLang();
}

function initLang() {
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved && I18N[saved]) lang = saved;
    } catch (e) {}
    applyLang();
}
