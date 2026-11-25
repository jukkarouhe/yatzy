let players = [];
let history = [];
let activePlayerIndex = 0;

const cats = [
    { id: '1', m: 5 }, { id: '2', m: 10 },
    { id: '3', m: 15 }, { id: '4', m: 20 },
    { id: '5', m: 25 }, { id: '6', m: 30 },
    { id: 'sum', r: true },
    { id: 'bon', r: true },
    { id: 'p1', min: 2, m: 12 }, { id: 'p2', min: 6, m: 22 },
    { id: '3k', min: 3, m: 18 }, { id: '4k', min: 4, m: 24 },
    { id: 'ss', f: [0, 15] }, { id: 'ls', f: [0, 20] },
    { id: 'fh', min: 7, m: 28 }, { id: 'ch', min: 5, m: 30 },
    { id: 'yz', f: [0, 50] },
    { id: 'tot', r: true, c: 'total-row' }
];

// --- Tallennus ---
function saveGame() {
    const data = { players, history, activePlayerIndex, scores: {} };
    document.querySelectorAll('.score-input').forEach(i => {
        data.scores[`${i.dataset.c}-${i.dataset.p}`] = i.value;
    });
    localStorage.setItem('YATZY_TURN_V2', JSON.stringify(data));
}

function loadGame() {
    try {
        const saved = localStorage.getItem('YATZY_TURN_V2');
        if (saved) {
            const data = JSON.parse(saved);
            players = data.players || [];
            history = data.history || [];
            activePlayerIndex = data.activePlayerIndex || 0;
            if (players.length > 0) {
                start(false);
                Object.keys(data.scores || {}).forEach(k => {
                    const parts = k.split('-');
                    const i = document.querySelector(`input[data-c="${parts[0]}"][data-p="${parts[1]}"]`);
                    if (i) i.value = data.scores[k];
                });
                players.forEach((_, i) => calc(i));
                renderHistory();
                updateUI();
            }
        }
    } catch (e) {}
}

function clearGame() {
    if (confirm(t('confirmReset'))) {
        localStorage.removeItem('YATZY_TURN_V2');
        location.reload();
    }
}

// --- Pelaajien lisäys ---
function renderPlayerList() {
    document.getElementById('p-list').innerText = t('players') + (players.length ? players.join(', ') : '-');
}

function addP() {
    const el = document.getElementById('p-name');
    const name = el.value.trim().toUpperCase();
    if (name && players.length < 6) {
        players.push(name);
        el.value = '';
        renderPlayerList();
        const btn = document.getElementById('start-btn');
        btn.disabled = false;
        btn.style.background = "#2980b9";
    }
}

// --- Virheentarkistus (kuten single-versiossa) ---
function hasErrors(pIdx) {
    return document.querySelectorAll(`.score-input[data-p="${pIdx}"].invalid`).length > 0;
}

// --- Vuoronvaihto virheen tarkistuksella (kuten single-versiossa) ---
function setActive(index) {
    if (index === activePlayerIndex) return;
    if (hasErrors(activePlayerIndex)) {
        alert(t('fixErrorFirst'));
        return;
    }
    activePlayerIndex = index;
    updateUI();
    saveGame();
}

// --- Vuoron siirto kentän täytön jälkeen (sama logiikka kuin single-versiossa) ---
function triggerNext() {
    const nextIdx = (activePlayerIndex + 1) % players.length;
    setActive(nextIdx);
}

// --- UI-päivitys readOnly-lukituksella (kuten single-versiossa) ---
function updateUI() {
    const hint = document.getElementById('status-hint');
    if (hint && players[activePlayerIndex]) {
        hint.innerText = t('turn') + players[activePlayerIndex];
        hint.style.color = "#27ae60";
    }
    document.querySelectorAll('#h-row th').forEach((th, i) => {
        if (i > 0) th.classList.toggle('active-p-header', (i - 1) === activePlayerIndex);
    });
    document.querySelectorAll('.col-cell').forEach(td => {
        const pIdx = parseInt(td.dataset.p);
        const isActive = pIdx === activePlayerIndex;
        td.classList.toggle('active-col', isActive);

        // readOnly-lukitus — estää väärän pelaajan kentän muokkaamisen iPhonella
        const input = td.querySelector('input');
        if (input) {
            input.readOnly = !isActive;
        }
    });
}

// --- Taulukko rakennetaan DOM-elementeillä (kuten single-versiossa) ---
function start(shouldSave) {
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    const hr = document.getElementById('h-row');
    const bb = document.getElementById('b-body');
    hr.innerHTML = '<th class="row-label" data-i18n="category">' + t('category') + '</th>';
    bb.innerHTML = '';

    // Otsikot DOM-elementeillä
    players.forEach((p, i) => {
        const th = document.createElement('th');
        th.innerText = p;
        th.onclick = () => setActive(i);
        hr.appendChild(th);
    });

    // Rivit DOM-elementeillä
    cats.forEach(cat => {
        const tr = document.createElement('tr');
        if (cat.c) tr.className = cat.c;

        const labelTd = document.createElement('td');
        labelTd.className = 'row-label';
        labelTd.innerText = t('cat_' + cat.id);
            labelTd.dataset.cat = cat.id;
        tr.appendChild(labelTd);

        players.forEach((_, pi) => {
            const td = document.createElement('td');
            td.className = 'col-cell';
            td.dataset.p = pi;

            if (cat.r) {
                td.id = `r-${cat.id}-${pi}`;
                td.innerText = '0';
                td.classList.add('sum-display');
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.inputMode = 'numeric';
                input.enterKeyHint = 'done';
                input.className = 'score-input';
                input.dataset.p = pi;
                input.dataset.c = cat.id;

                input.oninput = () => { calc(pi); saveGame(); };

                // Enter sulkee näppäimistön
                input.onkeydown = (e) => { if (e.key === 'Enter') input.blur(); };

                // blur = näppäimistö sulkeutui (iPhone "Done") → triggerNext
                input.onblur = () => {
                    if (input.value !== "" && !input.readOnly) triggerNext();
                };

                td.appendChild(input);
            }
            tr.appendChild(td);
        });
        bb.appendChild(tr);
    });

    players.forEach((_, i) => calc(i));
    updateUI();
    if (shouldSave) saveGame();
}

// --- Laskenta ---
function calc(pi) {
    const inputs = document.querySelectorAll(`.score-input[data-p="${pi}"]`);
    let upper = 0, total = 0, stock = 0;
    const upperIds = ['1', '2', '3', '4', '5', '6'];

    inputs.forEach(i => {
        const v = parseInt(i.value);
        const isBlank = i.value === "";
        const val = isBlank ? 0 : v;
        const c = cats.find(x => x.id === i.dataset.c);
        let ok = true;
        if (!isBlank) {
            if (isNaN(v) || v < 0) ok = false;
            if (c.m && v > c.m) ok = false;
            if (c.min && v < c.min && v !== 0) ok = false;
            if (c.f && !c.f.includes(v)) ok = false;
        }
        i.classList.toggle('invalid', !ok && !isBlank);
        if (ok || isBlank) {
            if (upperIds.includes(c.id)) {
                upper += val;
                // Varasto: täytetyn yläkerran ruudun ero tavoitteeseen (3 kpl kutakin)
                if (!isBlank) stock += val - 3 * parseInt(c.id);
            }
            total += val;
        }
    });

    const bonus = upper >= 63 ? 50 : 0;
    const s = document.getElementById(`r-sum-${pi}`);
    const b = document.getElementById(`r-bon-${pi}`);
    const t = document.getElementById(`r-tot-${pi}`);
    if (s) s.textContent = upper;
    if (b) {
        // Varasto näytetään Bonus-rivillä bonusluvun yläpuolella
        b.textContent = '';
        const sp = document.createElement('span');
        sp.className = 'stock';
        sp.textContent = (stock >= 0 ? '+' : '\u2212') + Math.abs(stock);
        b.appendChild(sp);
        b.appendChild(document.createTextNode(bonus));
    }
    if (t) t.innerText = total + bonus;
}

// --- Kierroksen arkistointi ---
function archiveRound() {
    if (document.querySelectorAll('.invalid').length > 0) {
        return alert(t('fixErrorsBeforeSave'));
    }
    const round = players.map((_, i) => parseInt(document.getElementById(`r-tot-${i}`).innerText) || 0);
    history.push(round);
    document.querySelectorAll('.score-input').forEach(i => {
        i.value = "";
        i.classList.remove('invalid');
    });
    players.forEach((_, i) => calc(i));
    activePlayerIndex = 0;
    updateUI();
    renderHistory();
    saveGame();
    window.scrollTo(0, 0);
}

// --- Historia-taulukko ---
function renderHistory() {
    if (history.length === 0) return;
    document.getElementById('history-section').style.display = 'block';

    const head = document.getElementById('hist-header');
    const body = document.getElementById('hist-body');

    head.innerHTML = '<th class="row-label">' + t('player') + '</th>' + players.map(p => `<th>${p}</th>`).join('');

    let h = `<tr class="grand-total-row"><td class="row-label">${t('total')}</td>`;
    players.forEach((_, pi) => {
        h += `<td>${history.reduce((s, r) => s + r[pi], 0)}</td>`;
    });
    h += '</tr>';

    history.forEach((r, i) => {
        h += `<tr><td class="row-label">${t('round')}${i + 1}</td>` + r.map(s => `<td>${s}</td>`).join('') + '</tr>';
    });

    body.innerHTML = h;
}

window.onload = () => {
    // Näytä banneri vain iPhonella Chrome-selaimessa
    const ua = navigator.userAgent;
    const isIphone = /iPhone/.test(ua);
    const isChrome = /CriOS/.test(ua); // CriOS = Chrome iOS
    if (isIphone && isChrome) {
        document.getElementById('chrome-banner').style.display = 'block';
    }
    initLang();
    loadGame();
};
