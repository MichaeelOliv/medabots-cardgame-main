/**
 * MEDABOTS ROBOTTLE CARD GAME - MOTOR DE COMBATE
 * Versão 3.0 - Cyberpunk Edition
 */

// ==========================================================================
// 1. ÁUDIO ENGINE (Web Audio API Procedural Sintetizada)
// ==========================================================================
let audioCtx = null;
let isAudioMuted = false;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function toggleAudio() {
    isAudioMuted = !isAudioMuted;
    const soundIcon = document.getElementById('sound-icon');
    if (soundIcon) {
        soundIcon.textContent = isAudioMuted ? '🔇' : '🔊';
    }
    if (!isAudioMuted) {
        playSound('click');
    }
}

function playSound(type) {
    if (isAudioMuted) return;
    try {
        initAudio();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + 0.04);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'laser') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
        } else if (type === 'slash') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'impact') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.22);
        } else if (type === 'crit') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(350, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'dodge') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(250, now);
            osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'repair') {
            osc.type = 'sine';
            const notes = [330, 440, 554, 660];
            notes.forEach((freq, idx) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                const noteTime = now + (idx * 0.07);
                subOsc.frequency.setValueAtTime(freq, noteTime);
                subGain.gain.setValueAtTime(0.12, noteTime);
                subGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.1);
                subOsc.start(noteTime);
                subOsc.stop(noteTime + 0.1);
            });
        } else if (type === 'medaforceReady') {
            const chord = [440, 554.37, 659.25, 880];
            chord.forEach(freq => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq, now);
                subGain.gain.setValueAtTime(0.1, now);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                subOsc.start(now);
                subOsc.stop(now + 0.5);
            });
        } else if (type === 'medaforceBlast') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.4);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.start(now);
            osc.stop(now + 0.6);
        } else if (type === 'destroy') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (type === 'win') {
            const melody = [523.25, 659.25, 783.99, 1046.50];
            melody.forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                const startTime = now + (i * 0.12);
                subOsc.frequency.setValueAtTime(freq, startTime);
                subGain.gain.setValueAtTime(0.2, startTime);
                subGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
                subOsc.start(startTime);
                subOsc.stop(startTime + 0.35);
            });
        } else if (type === 'lose') {
            const melody = [440, 392, 349.23, 293.66];
            melody.forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'sawtooth';
                const startTime = now + (i * 0.14);
                subOsc.frequency.setValueAtTime(freq, startTime);
                subGain.gain.setValueAtTime(0.18, startTime);
                subGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
                subOsc.start(startTime);
                subOsc.stop(startTime + 0.3);
            });
        } else if (type === 'menuSelect') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'chime') {
            const chord = [587.33, 880, 1174.66];
            chord.forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                const noteTime = now + (i * 0.05);
                subOsc.frequency.setValueAtTime(freq, noteTime);
                subGain.gain.setValueAtTime(0.1, noteTime);
                subGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
                subOsc.start(noteTime);
                subOsc.stop(noteTime + 0.25);
            });
        }
    } catch (e) {
        console.warn('Audio synthesis notice:', e);
    }
}

// ==========================================================================
// 2. BANCO DE DADOS DOS MEDABOTS
// ==========================================================================
const PART_ORDER = ['head', 'leftArm', 'medal', 'rightArm', 'legs'];

const MEDABOTS_ROSTER = {
    'Metabee': {
        name: 'Metabee',
        role: 'Atirador Pesado (Kabuto)',
        specialty: 'Alto dano de longo alcance e disparos concentrados.',
        critBonus: 0.15,
        evasion: 0.18,
        medaforce: {
            name: 'Disparo Triplo Kabuto',
            damage: 38,
            desc: 'Dispara uma saraivada contínua que atinge o alvo com dano massivo (Inesquivável).'
        },
        parts: {
            head: { id: 'head', name: 'Míssil Guiado', image: 'assets/metabee partes/CabecaMetabee.JPG', hp: 42, maxHp: 42, atk: 26, uses: 2, slot: 'slot-head', type: 'Tiro' },
            leftArm: { id: 'leftArm', name: 'Submetralhadora', image: 'assets/metabee partes/BracoEsqMetabee.jpg', hp: 34, maxHp: 34, atk: 14, uses: Infinity, slot: 'slot-left', type: 'Tiro' },
            rightArm: { id: 'rightArm', name: 'Canhão Rápido', image: 'assets/metabee partes/BracoDirMetabee.jpg', hp: 34, maxHp: 34, atk: 17, uses: Infinity, slot: 'slot-right', type: 'Tiro' },
            legs: { id: 'legs', name: 'Pernas Ochitsuka', image: 'assets/metabee partes/PernasMetabee.jpg', hp: 40, maxHp: 40, atk: 0, uses: 0, slot: 'slot-legs', type: 'Mobilidade' },
            medal: { id: 'medal', name: 'Medalha Kabuto', image: 'assets/metabee partes/MedalhaMetabee.jpg', slot: 'slot-medal' }
        }
    },
    'Rokusho': {
        name: 'Rokusho',
        role: 'Espadachim Veloz (Kuwagata)',
        specialty: 'Alta chance de acerto crítico e agilidade superior.',
        critBonus: 0.28,
        evasion: 0.24,
        medaforce: {
            name: 'Corte Celestial Kuwagata',
            damage: 40,
            desc: 'Desfere um golpe de espada ultrassônico garantindo 100% de acerto crítico.'
        },
        parts: {
            head: { id: 'head', name: 'Sensor Radar', image: 'assets/rokusho partes/CabecaRokusho.jpg', hp: 38, maxHp: 38, atk: 28, uses: 2, slot: 'slot-head', type: 'Radar/Corte' },
            leftArm: { id: 'leftArm', name: 'Chanfalhadora', image: 'assets/rokusho partes/BracoEsqRokusho.jpg', hp: 32, maxHp: 32, atk: 15, uses: Infinity, slot: 'slot-left', type: 'Melee' },
            rightArm: { id: 'rightArm', name: 'Espada Chanbar', image: 'assets/rokusho partes/BracoDirRokusho.jpg', hp: 32, maxHp: 32, atk: 19, uses: Infinity, slot: 'slot-right', type: 'Melee' },
            legs: { id: 'legs', name: 'Pernas Tatacker', image: 'assets/rokusho partes/PernasRokusho.jpg', hp: 36, maxHp: 36, atk: 0, uses: 0, slot: 'slot-legs', type: 'Mobilidade' },
            medal: { id: 'medal', name: 'Medalha Kuwagata', image: 'assets/rokusho partes/MedalhaRokusho.jpg', slot: 'slot-medal' }
        }
    },
    'Sailor Multi': {
        name: 'Sailor Multi',
        role: 'Suporte Tático & Evasão',
        specialty: 'Especialista em recuperação e evasão de combate.',
        critBonus: 0.12,
        evasion: 0.22,
        medaforce: {
            name: 'Restauração Total & Pulso',
            damage: 22,
            healAll: 18,
            desc: 'Ataca o inimigo com um pulso de 22 de dano e restaura +18 HP em todas as peças ativas.'
        },
        parts: {
            head: { id: 'head', name: 'Canhão de Pulso', image: 'assets/Sailor/SailorCabeca.jpg', hp: 36, maxHp: 36, atk: 24, uses: 2, slot: 'slot-head', type: 'Tiro' },
            leftArm: { id: 'leftArm', name: 'Reparador Rápido', image: 'assets/Sailor/BracoEsqSailor.jpg', hp: 30, maxHp: 30, atk: 14, uses: Infinity, slot: 'slot-left', type: 'Suporte' },
            rightArm: { id: 'rightArm', name: 'Laser de Precisão', image: 'assets/Sailor/BracoDirSailor.jpg', hp: 30, maxHp: 30, atk: 16, uses: Infinity, slot: 'slot-right', type: 'Tiro' },
            legs: { id: 'legs', name: 'Pernas Flare', image: 'assets/Sailor/PernasSailor.jpg', hp: 34, maxHp: 34, atk: 0, uses: 0, slot: 'slot-legs', type: 'Mobilidade' },
            medal: { id: 'medal', name: 'Medalha Brass', image: 'assets/Sailor/MedalhaSailor.jpg', slot: 'slot-medal' }
        }
    },
    'Warbandit': {
        name: 'Warbandit',
        role: 'Caçador de Elite (Leão)',
        specialty: 'Dano brutal e capacidade de finalização rápida.',
        menuImage: 'assets/warbandit/Warbandit.jpg',
        critBonus: 0.18,
        evasion: 0.14,
        medaforce: {
            name: 'Fúria do Leão Dourado',
            damage: 44,
            desc: 'Canaliza todo o poder da Medalha em uma rajada colossal de 44 de dano.'
        },
        parts: {
            head: { id: 'head', name: 'Canhão Solar', image: 'assets/warbandit/CabecaWarbandit.jpg', hp: 46, maxHp: 46, atk: 32, uses: 2, slot: 'slot-head', type: 'Sniper' },
            leftArm: { id: 'leftArm', name: 'Garra de Gatling', image: 'assets/warbandit/BracoEsqWarbandit.jpg', hp: 36, maxHp: 36, atk: 16, uses: Infinity, slot: 'slot-left', type: 'Tiro' },
            rightArm: { id: 'rightArm', name: 'Canhão Duplo', image: 'assets/warbandit/BracoDirWarbandit.jpg', hp: 36, maxHp: 36, atk: 16, uses: Infinity, slot: 'slot-right', type: 'Tiro' },
            legs: { id: 'legs', name: 'Canhão de Chão', image: 'assets/warbandit/PernasWarbandit.jpg', hp: 44, maxHp: 44, atk: 0, uses: 0, slot: 'slot-legs', type: 'Mobilidade' },
            medal: { id: 'medal', name: 'Medalha Warbandit', image: 'assets/warbandit/MedalhaWarbandit.jpg', slot: 'slot-medal' }
        }
    },
    'Krossknight': {
        name: 'Krossknight',
        role: 'Tanque Blindado (Cavaleiro)',
        specialty: 'Altíssima durabilidade e proteção pesada.',
        menuImage: 'assets/Krossknight/Krossknight.jpg',
        critBonus: 0.14,
        evasion: 0.10,
        medaforce: {
            name: 'Impacto da Justiça',
            damage: 36,
            desc: 'Desfere um golpe sagrado e reforça a armadura de todas as partes ativas.'
        },
        parts: {
            head: { id: 'head', name: 'V-Visor Mark II', image: 'assets/Krossknight/CabecaKrossknight.jpg', hp: 42, maxHp: 42, atk: 28, uses: 2, slot: 'slot-head', type: 'Sensor/Melee' },
            leftArm: { id: 'leftArm', name: 'Guard-Shield L', image: 'assets/Krossknight/BracoEsqKrossknight.jpg', hp: 38, maxHp: 38, atk: 16, uses: Infinity, slot: 'slot-left', type: 'Escudo' },
            rightArm: { id: 'rightArm', name: 'Cyber-Sabre R', image: 'assets/Krossknight/BracoDirKrossknight.jpg', hp: 38, maxHp: 38, atk: 18, uses: Infinity, slot: 'slot-right', type: 'Energia' },
            legs: { id: 'legs', name: 'Bipedal Boosters', image: 'assets/Krossknight/PernasKrossknight.jpg', hp: 42, maxHp: 42, atk: 0, uses: 0, slot: 'slot-legs', type: 'Mobilidade' },
            medal: { id: 'medal', name: 'Medalha Seraph', image: 'assets/Krossknight/MedalhaKrossknight.jpg', slot: 'slot-medal' }
        }
    }
};

function createMedabot(name) {
    const template = MEDABOTS_ROSTER[name] || MEDABOTS_ROSTER['Metabee'];
    const partsCopy = {};
    
    Object.keys(template.parts).forEach(k => {
        partsCopy[k] = { ...template.parts[k] };
    });

    return {
        name: template.name,
        role: template.role,
        specialty: template.specialty,
        critBonus: template.critBonus,
        baseEvasion: template.evasion,
        medaforce: { ...template.medaforce },
        parts: partsCopy
    };
}

// ==========================================================================
// 3. ESTADO DO JOGO
// ==========================================================================
let player = null;
let enemy = null;
let selectedAttacker = null;
let selectedTarget = null;
let isPlayerTurn = true;
let gameOver = false;
let playerRepairUsed = false;
let enemyRepairUsed = false;
let playerMedaforce = 0;
let enemyMedaforce = 0;
let gameDifficulty = 'normal';

let battleStats = {
    turns: 1,
    damageDealt: 0,
    partsDestroyed: 0,
    medaforceUsed: 0
};

// ==========================================================================
// 4. SISTEMA DE LOG E INTERFACE
// ==========================================================================
function log(msg, type = 'normal') {
    const logDiv = document.getElementById('log');
    if (!logDiv) return;
    const p = document.createElement('div');
    p.className = `log-entry ${type}`;
    p.textContent = msg;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function clearLog() {
    const logDiv = document.getElementById('log');
    if (logDiv) logDiv.innerHTML = '';
}

function updateTurnIndicator() {
    const el = document.getElementById('turn-indicator');
    const textEl = document.getElementById('turn-text');
    if (!el || !textEl) return;

    if (gameOver) {
        textEl.textContent = 'Combate Encerrado';
        el.className = 'turn-indicator';
        return;
    }

    if (isPlayerTurn) {
        textEl.textContent = 'Seu Turno — Selecione Ataque';
        el.className = 'turn-indicator player';
    } else {
        textEl.textContent = 'Turno do Oponente...';
        el.className = 'turn-indicator enemy';
    }
}

function updateMedaforceUI() {
    const pBar = document.getElementById('player-mf-bar');
    const pVal = document.getElementById('player-mf-val');
    const eBar = document.getElementById('enemy-mf-bar');
    const eVal = document.getElementById('enemy-mf-val');
    const mfBtn = document.getElementById('medaforce-btn');

    if (pBar && pVal) {
        const pPct = Math.min(100, Math.max(0, playerMedaforce));
        pBar.style.width = `${pPct}%`;
        pVal.textContent = `${pPct}%`;
        if (pPct >= 100) {
            pBar.classList.add('charged');
        } else {
            pBar.classList.remove('charged');
        }
    }

    if (eBar && eVal) {
        const ePct = Math.min(100, Math.max(0, enemyMedaforce));
        eBar.style.width = `${ePct}%`;
        eVal.textContent = `${ePct}%`;
        if (ePct >= 100) {
            eBar.classList.add('charged');
        } else {
            eBar.classList.remove('charged');
        }
    }

    if (mfBtn) {
        mfBtn.disabled = !isPlayerTurn || gameOver || playerMedaforce < 100 || !selectedTarget;
    }
}

function getEvasionRate(medabot) {
    if (medabot.parts.legs.hp <= 0) {
        return 0; // Pernas destruídas = 0% esquiva
    }
    return medabot.baseEvasion || 0.15;
}

function updateEvasionBadges() {
    const pDodge = document.getElementById('player-dodge-badge');
    const eDodge = document.getElementById('enemy-dodge-badge');

    if (pDodge && player) {
        const rate = Math.round(getEvasionRate(player) * 100);
        pDodge.textContent = `💨 ${rate}% Esquiva`;
        pDodge.style.opacity = rate === 0 ? '0.4' : '1';
    }
    if (eDodge && enemy) {
        const rate = Math.round(getEvasionRate(enemy) * 100);
        eDodge.textContent = `💨 ${rate}% Esquiva`;
        eDodge.style.opacity = rate === 0 ? '0.4' : '1';
    }
}

function showWinnerAlert(winner, message) {
    const alert = document.getElementById('winner-alert');
    const medal = document.getElementById('winner-alert-medal');
    const title = document.getElementById('winner-alert-title');
    const msgEl = document.getElementById('winner-alert-message');
    const statsEl = document.getElementById('winner-stats');

    const isPlayerWin = winner === player;
    title.textContent = isPlayerWin ? '🏆 VITÓRIA!' : '💥 DERROTA';
    title.style.color = isPlayerWin ? 'var(--neon-gold)' : 'var(--neon-red)';
    
    medal.src = winner.parts.medal.image;
    medal.alt = `Medalha de ${winner.name}`;
    msgEl.textContent = message;

    if (statsEl) {
        statsEl.innerHTML = `
            <div><span>Turnos:</span> <strong>${battleStats.turns}</strong></div>
            <div><span>Dano Total:</span> <strong>${battleStats.damageDealt}</strong></div>
            <div><span>Peças Destruídas:</span> <strong>${battleStats.partsDestroyed}</strong></div>
        `;
    }

    alert.hidden = false;
    playSound(isPlayerWin ? 'win' : 'lose');
}

function hideWinnerAlert() {
    const alert = document.getElementById('winner-alert');
    if (alert) alert.hidden = true;
}

// ==========================================================================
// 4.1. SISTEMA DE NOTIFICAÇÕES (TOAST)
// ==========================================================================
function showToast(message, icon = '✨') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    playSound('chime');

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================================================
// 4.2. PRÉVIAS INTERATIVAS DAS FUNCIONALIDADES FUTURAS
// ==========================================================================
const FEATURE_PREVIEWS = {
    'login': {
        title: 'Login & Perfil de Medafighter',
        subtitle: 'Sua identidade única na comunidade global de Robottle.',
        badge: '🔒 EM BREVE',
        icon: '👤',
        html: `
            <div class="feature-schematic-box">
                <div>✨ <strong>Sincronização em Nuvem Multiplataforma</strong></div>
                <div style="font-size: 0.76rem; color: var(--text-muted);">Jogue no Navegador do PC ou no Celular Android mantendo o mesmo progresso.</div>
            </div>
            <div class="feature-preview-grid">
                <div class="feature-preview-item">
                    <h4>☁️ Cloud Save</h4>
                    <p>Salve suas medalhas, peças desbloqueadas e configurações favoritas na nuvem.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🎖️ Patentes & Títulos</h4>
                    <p>Evolua de "Iniciante de Robottle" até "Mestre Campeão Mundial".</p>
                </div>
                <div class="feature-preview-item">
                    <h4>📊 Estatísticas Detalhadas</h4>
                    <p>Taxa de vitórias, maiores acertos críticos e histórico de oponentes derrotados.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>👥 Lista de Amigos</h4>
                    <p>Adicione outros Medafighters para duelos diretos e troca de dicas.</p>
                </div>
            </div>
        `
    },
    'customize': {
        title: 'Oficina de Edição de Medabots',
        subtitle: 'Monte seu robô ideal combinando peças de diferentes modelos!',
        badge: '🔧 EM DESENVOLVIMENTO',
        icon: '🦾',
        html: `
            <div class="feature-schematic-box">
                <div>🛠️ <strong>Esquema de Montagem de Peças Híbridas</strong></div>
                <div class="feature-mock-row">
                    <span class="mock-slot">Cabeça (Metabee)</span>
                    <span class="mock-slot">Braço Dir (Rokusho)</span>
                    <span class="mock-slot">Pernas (Warbandit)</span>
                </div>
            </div>
            <div class="feature-preview-grid">
                <div class="feature-preview-item">
                    <h4>⚡ Sinergia de Peças</h4>
                    <p>Combine atributos ofensivos de tiro com lâminas velozes para criar estilos únicos.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🎨 Customização Visual</h4>
                    <p>Personalize paletas de cores, decalques cibernéticos e acabamento das partes.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>⚖️ Equilíbrio de Peso & Esquiva</h4>
                    <p>Ajuste peças leves para máxima agilidade ou armaduras pesadas para resistir a K.O.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>💾 Salvar Predefinições</h4>
                    <p>Crie e armazene até 5 builds diferentes de Medabots para alternar rapidamente.</p>
                </div>
            </div>
        `
    },
    'shop': {
        title: 'Cyber Market (Compra de Peças)',
        subtitle: 'Adquira novos pacotes de expansão, peças raras e visuais cibernéticos.',
        badge: '💎 EM DESENVOLVIMENTO',
        icon: '🛒',
        html: `
            <div class="feature-schematic-box">
                <div>💰 <strong>Moeda do Jogo: Medapoints (PTS)</strong></div>
                <div style="font-size: 0.76rem; color: var(--neon-gold);">Ganhe Medapoints vencendo Robottles e completando desafios!</div>
            </div>
            <div class="feature-preview-grid">
                <div class="feature-preview-item">
                    <h4>📦 Boosters Temáticos</h4>
                    <p>Pacotes temáticos Kabuto, Kuwagata, Anjo e Fera Selvagem com peças exclusivas.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🌟 Peças Raras & Lendárias</h4>
                    <p>Armas experimentais com efeitos adicionais de perfuração e paralisia.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🎁 Ofertas Rotativas Diárias</h4>
                    <p>Descontos diários em peças de suporte e medalhas especiais.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🛡️ 100% Justo (Play-to-Earn)</h4>
                    <p>Todas as peças poderão ser conquistadas jogando, sem barreiras de pay-to-win!</p>
                </div>
            </div>
        `
    },
    'tournament': {
        title: 'Campeonato Online & Modo Ranqueado',
        subtitle: 'Desafie jogadores do mundo inteiro em combates PvP em tempo real.',
        badge: '🌐 EM DESENVOLVIMENTO',
        icon: '🏆',
        html: `
            <div class="feature-schematic-box">
                <div>🥇 <strong>Ligas Competitivas Sazonais</strong></div>
                <div class="feature-mock-row">
                    <span class="mock-slot">🥉 Bronze</span>
                    <span class="mock-slot">🥈 Prata</span>
                    <span class="mock-slot">🥇 Ouro</span>
                    <span class="mock-slot">💎 Mestre</span>
                </div>
            </div>
            <div class="feature-preview-grid">
                <div class="feature-preview-item">
                    <h4>⚡ Matchmaking em Tempo Real</h4>
                    <p>Pareamento rápido baseado em nível de habilidade e elo competitivo.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>🏆 Copas Semanais</h4>
                    <p>Torneios eliminatórios aos finais de semana com troféus exclusivos.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>📜 Hall da Fama</h4>
                    <p>Placar de líderes com os melhores Medafighters da temporada.</p>
                </div>
                <div class="feature-preview-item">
                    <h4>👁️ Modo Espectador</h4>
                    <p>Assista a finais de campeonato ao vivo e aprenda novas táticas.</p>
                </div>
            </div>
        `
    }
};

function showMainMenu() {
    playSound('menuSelect');
    const mainMenu = document.getElementById('main-menu-screen');
    const selScreen = document.getElementById('selection-screen');
    const featModal = document.getElementById('feature-preview-modal');
    hideWinnerAlert();

    if (mainMenu) mainMenu.hidden = false;
    if (selScreen) selScreen.hidden = true;
    if (featModal) featModal.hidden = true;
}

function hideMainMenu() {
    const mainMenu = document.getElementById('main-menu-screen');
    if (mainMenu) mainMenu.hidden = true;
}

function openQuickGame() {
    playSound('menuSelect');
    hideMainMenu();
    showSelectionScreen();
}

function openFeaturePreview(featureKey) {
    playSound('menuSelect');
    const data = FEATURE_PREVIEWS[featureKey];
    if (!data) return;

    const modal = document.getElementById('feature-preview-modal');
    const titleEl = document.getElementById('feature-modal-title');
    const subtitleEl = document.getElementById('feature-modal-subtitle');
    const badgeEl = document.getElementById('feature-modal-badge');
    const iconEl = document.getElementById('feature-modal-icon');
    const bodyEl = document.getElementById('feature-modal-dynamic-body');

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (iconEl) iconEl.textContent = data.icon;
    if (bodyEl) bodyEl.innerHTML = data.html;

    if (modal) modal.hidden = false;
}

function closeFeaturePreview() {
    playSound('click');
    const modal = document.getElementById('feature-preview-modal');
    if (modal) modal.hidden = true;
}

function showSelectionScreen() {
    const screen = document.getElementById('selection-screen');
    if (screen) screen.hidden = false;
    renderRosterSelection();
}

function renderRosterSelection() {
    const container = document.getElementById('medabot-roster-list');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(MEDABOTS_ROSTER).forEach(name => {
        const m = MEDABOTS_ROSTER[name];
        const card = document.createElement('div');
        card.className = 'medabot-option-card';
        const displayImg = m.menuImage || m.parts.medal.image;
        card.innerHTML = `
            <div class="roster-img-box">
                <img class="roster-img" src="${displayImg}" alt="${m.name}">
            </div>
            <div class="roster-info">
                <div class="roster-name">${m.name}</div>
                <div class="roster-role">${m.role}</div>
            </div>
            <div class="roster-stats-grid">
                <div>💥 ATK: <strong>${m.parts.head.atk + m.parts.rightArm.atk}</strong></div>
                <div>🛡️ HP Total: <strong>${m.parts.head.hp + m.parts.leftArm.hp + m.parts.rightArm.hp + m.parts.legs.hp}</strong></div>
                <div>💨 Esquiva: <strong>${Math.round(m.evasion * 100)}%</strong></div>
                <div>⚡ Crítico: <strong>+${Math.round(m.critBonus * 100)}%</strong></div>
            </div>
            <div class="roster-mf-desc">⚡ <strong>${m.medaforce.name}</strong>: ${m.medaforce.desc}</div>
        `;

        card.addEventListener('click', () => {
            startGame(name);
        });

        container.appendChild(card);
    });
}

// ==========================================================================
// 5. INICIALIZAÇÃO E CONTROLE DE PARTIDA
// ==========================================================================
function startGame(playerName) {
    playSound('click');
    const rosterKeys = Object.keys(MEDABOTS_ROSTER);
    const availableEnemies = rosterKeys.filter(n => n !== playerName);
    const enemyName = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];

    player = createMedabot(playerName);
    enemy = createMedabot(enemyName);

    selectedAttacker = null;
    selectedTarget = null;
    isPlayerTurn = true;
    gameOver = false;
    playerRepairUsed = false;
    enemyRepairUsed = false;
    playerMedaforce = 0;
    enemyMedaforce = 0;

    battleStats = {
        turns: 1,
        damageDealt: 0,
        partsDestroyed: 0,
        medaforceUsed: 0
    };

    document.getElementById('player-title').textContent = `${player.name} (${player.role.split(' ')[0]})`;
    document.getElementById('enemy-title').textContent = `${enemy.name} (${enemy.role.split(' ')[0]})`;

    const selScreen = document.getElementById('selection-screen');
    if (selScreen) selScreen.hidden = true;

    hideWinnerAlert();
    clearLog();
    log(`🤖 Robottle Iniciado! ${player.name} VS ${enemy.name}.`, 'special');
    log(`Dificuldade da IA: ${gameDifficulty.toUpperCase()}. Selecione uma peça para atacar!`, 'info');

    render();
}

function getValidAttackers(medabot) {
    return ['head', 'leftArm', 'rightArm'].filter(k => {
        const p = medabot.parts[k];
        return p.hp > 0 && p.atk > 0 && p.uses > 0;
    });
}

function getValidTargets(medabot) {
    return ['head', 'leftArm', 'rightArm', 'legs'].filter(k => medabot.parts[k].hp > 0);
}

// ==========================================================================
// 6. RENDERIZAÇÃO DO TABULEIRO
// ==========================================================================
function render() {
    renderGrid('player-grid', player, true);
    renderGrid('enemy-grid', enemy, false);

    const btn = document.getElementById('attack-btn');
    if (btn) {
        btn.disabled = !(selectedAttacker && selectedTarget && isPlayerTurn && !gameOver);
    }

    const repairBtn = document.getElementById('repair-btn');
    if (repairBtn && player) {
        const hasDamagedParts = ['head', 'leftArm', 'rightArm', 'legs'].some(k => player.parts[k].hp > 0 && player.parts[k].hp < player.parts[k].maxHp);
        repairBtn.disabled = !isPlayerTurn || gameOver || playerRepairUsed || !hasDamagedParts;
    }

    updateTurnIndicator();
    updateMedaforceUI();
    updateEvasionBadges();
}

function renderGrid(containerId, medabot, isPlayer) {
    const container = document.getElementById(containerId);
    if (!container || !medabot) return;
    container.innerHTML = '';

    const isCharged = isPlayer ? playerMedaforce >= 100 : enemyMedaforce >= 100;

    PART_ORDER.forEach(key => {
        const part = medabot.parts[key];
        const card = document.createElement('div');

        if (key === 'medal') {
            card.className = `card medal-card ${part.slot} ${isCharged ? 'charged' : ''}`;
            card.innerHTML = `<img class="medal-image" src="${part.image}" alt="${medabot.name} - ${part.name}">`;
            container.appendChild(card);
            return;
        }

        const isDestroyed = part.hp <= 0;
        card.className = `card ${part.slot}`;
        if (isDestroyed) card.classList.add('destroyed');

        if (isPlayer && selectedAttacker === key) card.classList.add('selected-attacker');
        if (!isPlayer && selectedTarget === key) card.classList.add('selected-target');

        if (!isPlayerTurn || gameOver) {
            card.classList.add('disabled');
        }

        const hpPercent = Math.max(0, (part.hp / part.maxHp) * 100);
        const barColor = hpPercent < 30 ? 'var(--neon-red)' : hpPercent < 60 ? 'var(--neon-gold)' : 'var(--neon-green)';
        const usesBadge = part.uses !== Infinity && part.atk > 0 ? `<span class="card-uses-badge">${part.uses}x</span>` : '';
        const statLabel = part.atk > 0 ? `<span class="stat-atk">ATK ${part.atk}</span>` : `<span class="stat-sup">${part.type}</span>`;

        card.innerHTML = `
            <div class="card-top">
                <span class="card-slot-name">${part.name}</span>
                ${usesBadge}
            </div>
            <img class="part-image" src="${part.image}" alt="${medabot.name} - ${part.name}">
            <div class="card-stat-row">
                ${statLabel}
                <span class="hp-text">${part.hp}/${part.maxHp}</span>
            </div>
            <div class="hp-container">
                <div class="hp-bar" style="width:${hpPercent}%; background:${barColor}"></div>
            </div>
        `;

        if (!isDestroyed && !gameOver && isPlayerTurn) {
            card.addEventListener('click', () => handleCardClick(key, isPlayer, part));
        }

        container.appendChild(card);
    });
}

// ==========================================================================
// 7. LÓGICA DE COMBATE E AÇÕES
// ==========================================================================
function handleCardClick(key, isPlayer, part) {
    if (gameOver || !isPlayerTurn) return;
    playSound('click');

    if (isPlayer) {
        if (part.atk > 0 && part.uses > 0) {
            selectedAttacker = key;
            log(`⚔️ Peça de Ataque Selecionada: ${part.name} (ATK ${part.atk}).`);
        } else if (part.uses === 0) {
            log(`⚠️ A peça ${part.name} esgotou seus usos nesta batalha!`, 'info');
        } else {
            log(`🛡️ ${part.name} é uma peça de mobilidade/suporte.`, 'info');
        }
    } else {
        selectedTarget = key;
        log(`🎯 Alvo Travado: ${part.name} do Inimigo.`);
    }

    render();
}

function handleAttack() {
    if (!isPlayerTurn || gameOver || !selectedAttacker || !selectedTarget) return;

    const attacker = player.parts[selectedAttacker];
    const target = enemy.parts[selectedTarget];

    executeCombatTurn(attacker, target, player, enemy, selectedTarget, false, false);

    if (attacker.uses !== Infinity) {
        attacker.uses--;
    }

    selectedAttacker = null;
    selectedTarget = null;
    render();

    if (!gameOver) {
        if (getValidAttackers(enemy).length === 0) {
            gameOver = true;
            log('🏆 O Inimigo perdeu todas as peças ofensivas! Vitória por K.O.!', 'win');
            showWinnerAlert(player, `${player.name} desarmou e venceu o combate!`);
            render();
            return;
        }

        isPlayerTurn = false;
        render();
        log('Aguardando resposta do oponente...', 'info');
        setTimeout(enemyTurn, 1000);
    }
}

function handleMedaforceSpecial() {
    if (!isPlayerTurn || gameOver || playerMedaforce < 100 || !selectedTarget) return;

    const target = enemy.parts[selectedTarget];
    playerMedaforce = 0;
    battleStats.medaforceUsed++;

    log(`⚡ MEDAFORCE ATIVADO! ${player.name} usou ${player.medaforce.name}!`, 'special');
    playSound('medaforceBlast');

    // Medaforce deal guaranteed damage
    const mfDamage = player.medaforce.damage;
    target.hp = Math.max(0, target.hp - mfDamage);
    battleStats.damageDealt += mfDamage;

    // Trigger visual floating dmg
    showDamageVisual('enemy-grid', selectedTarget, mfDamage, true, false);

    if (player.medaforce.healAll) {
        ['head', 'leftArm', 'rightArm', 'legs'].forEach(k => {
            if (player.parts[k].hp > 0) {
                player.parts[k].hp = Math.min(player.parts[k].maxHp, player.parts[k].hp + player.medaforce.healAll);
            }
        });
        log(`✨ Restauração Total curou +${player.medaforce.healAll} HP de todas as partes!`, 'win');
    }

    log(`💥 ${player.medaforce.name} causou ${mfDamage} de dano direto na ${target.name}!`, 'special');

    if (target.hp <= 0) {
        battleStats.partsDestroyed++;
        playSound('destroy');
        log(`💀 A ${target.name} do Inimigo foi DESTRUÍDA!`, 'crit');
    }

    checkHeadDestruction(player, enemy, target, false);

    selectedAttacker = null;
    selectedTarget = null;
    render();

    if (!gameOver) {
        isPlayerTurn = false;
        render();
        setTimeout(enemyTurn, 1000);
    }
}

function handleRepair() {
    if (!isPlayerTurn || gameOver || playerRepairUsed) return;

    const damaged = ['head', 'leftArm', 'rightArm', 'legs']
        .map(k => player.parts[k])
        .filter(p => p.hp > 0 && p.hp < p.maxHp);

    if (damaged.length === 0) return;

    damaged.sort((a, b) => {
        if (a.id === 'head') return -1;
        if (b.id === 'head') return 1;
        return (a.hp / a.maxHp) - (b.hp / b.maxHp);
    });

    const targetPart = damaged[0];
    const healAmount = 22;
    targetPart.hp = Math.min(targetPart.maxHp, targetPart.hp + healAmount);
    playerRepairUsed = true;
    playSound('repair');

    log(`🛠️ Reparo de Emergência! Restaurou +${healAmount} HP da ${targetPart.name}.`, 'win');

    selectedAttacker = null;
    selectedTarget = null;
    render();

    isPlayerTurn = false;
    render();
    setTimeout(enemyTurn, 1000);
}

// ==========================================================================
// 8. MOTOR DE DANO, CRÍTICO E ESQUIVA
// ==========================================================================
function executeCombatTurn(attacker, target, sourceMedabot, targetMedabot, targetKey, isEnemyAttacking, isMedaforce) {
    const isPlayerAttacking = !isEnemyAttacking;
    const targetGridId = isPlayerAttacking ? 'enemy-grid' : 'player-grid';

    // 1. Checar Esquiva (apenas se não for Medaforce)
    if (!isMedaforce) {
        const evasionRate = getEvasionRate(targetMedabot);
        if (Math.random() < evasionRate) {
            playSound('dodge');
            log(`💨 ${targetMedabot.name} executou uma MANOBRA DE ESQUIVA e evitou o golpe!`, 'dodge');
            showDamageVisual(targetGridId, targetKey, 'ESQUIVOU!', false, true);

            // Carrega um pouco de Medaforce mesmo na esquiva
            if (isPlayerAttacking) {
                playerMedaforce = Math.min(100, playerMedaforce + 10);
            } else {
                enemyMedaforce = Math.min(100, enemyMedaforce + 10);
            }
            return;
        }
    }

    // 2. Cálculo de Crítico e Dano
    const isCrit = Math.random() < (sourceMedabot.critBonus || 0.15);
    const variance = Math.floor(Math.random() * 5) - 2; // -2 a +2
    let baseDamage = attacker.atk + variance;

    // Penalidade se pernas do alvo estiverem destruídas (+20% dano)
    if (targetMedabot.parts.legs.hp <= 0 && targetKey !== 'legs') {
        baseDamage = Math.round(baseDamage * 1.2);
    }

    let finalDamage = Math.max(5, baseDamage);
    if (isCrit) {
        finalDamage = Math.round(finalDamage * 1.5);
    }

    target.hp = Math.max(0, target.hp - finalDamage);

    // Carregamento de Medaforce
    if (isPlayerAttacking) {
        playerMedaforce = Math.min(100, playerMedaforce + 20);
        enemyMedaforce = Math.min(100, enemyMedaforce + 25);
        battleStats.damageDealt += finalDamage;
    } else {
        enemyMedaforce = Math.min(100, enemyMedaforce + 20);
        playerMedaforce = Math.min(100, playerMedaforce + 25);
    }

    // Áudio
    if (isCrit) {
        playSound('crit');
    } else if (attacker.type === 'Tiro' || attacker.type === 'Sniper') {
        playSound('laser');
    } else if (attacker.type === 'Melee' || attacker.type === 'Radar/Corte') {
        playSound('slash');
    } else {
        playSound('impact');
    }

    // Mensagens de Log
    const attackerName = isPlayerAttacking ? 'Você' : enemy.name;
    const critTag = isCrit ? '💥 [GOLPE CRÍTICO!] ' : '';
    log(`${critTag}${attackerName} causou ${finalDamage} de dano na ${target.name}!`, isCrit ? 'crit' : 'normal');

    showDamageVisual(targetGridId, targetKey, finalDamage, isCrit, false);

    // Peça destruída
    if (target.hp <= 0) {
        playSound('destroy');
        log(`💀 A peça ${target.name} de ${targetMedabot.name} foi DESTRUÍDA!`, 'lose');
        if (isPlayerAttacking) {
            battleStats.partsDestroyed++;
        }
    }

    checkHeadDestruction(sourceMedabot, targetMedabot, target, isEnemyAttacking);
}

function checkHeadDestruction(sourceMedabot, targetMedabot, target, isEnemyAttacking) {
    if (targetMedabot.parts.head.hp <= 0) {
        gameOver = true;
        if (!isEnemyAttacking) {
            log('🏆 CABEÇA DO INIMIGO DESTRUÍDA! VITÓRIA POR K.O. TOTAL!', 'win');
            showWinnerAlert(player, `${player.name} destruiu a cabeça de ${enemy.name} e venceu o Robottle!`);
        } else {
            log('💥 SUA CABEÇA FOI DESTRUÍDA! K.O. - VOCÊ PERDEU O ROBOTTLE!', 'lose');
            showWinnerAlert(enemy, `${enemy.name} venceu o combate!`);
        }
    }
}

function showDamageVisual(gridId, targetKey, text, isCrit, isDodge) {
    const container = document.getElementById(gridId);
    if (!container) return;
    const cards = container.getElementsByClassName('card');

    PART_ORDER.forEach((k, idx) => {
        if (k === targetKey && cards[idx]) {
            const cardEl = cards[idx];
            if (!isDodge) {
                cardEl.classList.add('shake');
                setTimeout(() => cardEl.classList.remove('shake'), 400);
            }

            const floatEl = document.createElement('div');
            floatEl.className = `floating-dmg ${isCrit ? 'crit' : ''} ${isDodge ? 'dodge' : ''}`;
            floatEl.textContent = isDodge ? text : `-${text}`;
            cardEl.appendChild(floatEl);
            setTimeout(() => floatEl.remove(), 850);
        }
    });
}

// ==========================================================================
// 9. INTELIGÊNCIA ARTIFICIAL (TURNO DO INIMIGO)
// ==========================================================================
function enemyTurn() {
    if (gameOver) return;
    battleStats.turns++;

    // 1. Reparo de Emergência da IA no modo Difícil/Normal
    if ((gameDifficulty === 'hard' || gameDifficulty === 'normal') && !enemyRepairUsed) {
        const enemyHead = enemy.parts.head;
        if (enemyHead.hp > 0 && enemyHead.hp <= enemyHead.maxHp * 0.4) {
            enemyHead.hp = Math.min(enemyHead.maxHp, enemyHead.hp + 22);
            enemyRepairUsed = true;
            playSound('repair');
            log(`🛠️ O Inimigo usou Reparo de Emergência na ${enemyHead.name}! (+22 HP)`, 'lose');
            isPlayerTurn = true;
            render();
            return;
        }
    }

    // 2. Uso do Especial Medaforce pela IA
    if (enemyMedaforce >= 100) {
        enemyMedaforce = 0;
        const validTargets = getValidTargets(player);
        const targetKey = validTargets.includes('head') ? 'head' : validTargets[0];
        const target = player.parts[targetKey];

        log(`⚡ ALERTA! ${enemy.name} ativou o Especial ${enemy.medaforce.name}!`, 'special');
        playSound('medaforceBlast');

        const mfDmg = enemy.medaforce.damage;
        target.hp = Math.max(0, target.hp - mfDmg);
        showDamageVisual('player-grid', targetKey, mfDmg, true, false);

        log(`💥 O especial ${enemy.medaforce.name} causou ${mfDmg} de dano na sua ${target.name}!`, 'lose');

        if (target.hp <= 0) {
            playSound('destroy');
            log(`💀 Sua ${target.name} foi DESTRUÍDA!`, 'lose');
        }

        checkHeadDestruction(enemy, player, target, true);

        if (!gameOver) {
            isPlayerTurn = true;
            render();
        }
        return;
    }

    const validAttackers = getValidAttackers(enemy);
    const validTargets = getValidTargets(player);

    if (validAttackers.length === 0 || validTargets.length === 0) {
        isPlayerTurn = true;
        render();
        return;
    }

    let targetKey;
    let attackerKey;

    if (gameDifficulty === 'easy') {
        targetKey = validTargets[Math.floor(Math.random() * validTargets.length)];
        attackerKey = validAttackers[Math.floor(Math.random() * validAttackers.length)];
    } else if (gameDifficulty === 'hard') {
        // Tenta finalizar a cabeça se o ataque for letal
        const fatalAttacker = validAttackers.find(atkKey => enemy.parts[atkKey].atk >= player.parts.head.hp && player.parts.head.hp > 0);

        if (fatalAttacker) {
            attackerKey = fatalAttacker;
            targetKey = 'head';
        } else {
            // Destrói as pernas do jogador se ele tiver alta esquiva
            if (player.parts.legs.hp > 0 && Math.random() < 0.4) {
                targetKey = 'legs';
            } else {
                const playerAtkArms = ['rightArm', 'leftArm'].filter(k => player.parts[k].hp > 0 && player.parts[k].atk > 0);
                if (playerAtkArms.length > 0 && Math.random() < 0.6) {
                    playerAtkArms.sort((a, b) => player.parts[b].atk - player.parts[a].atk);
                    targetKey = playerAtkArms[0];
                } else if (validTargets.includes('head')) {
                    targetKey = 'head';
                } else {
                    validTargets.sort((a, b) => player.parts[a].hp - player.parts[b].hp);
                    targetKey = validTargets[0];
                }
            }

            validAttackers.sort((a, b) => enemy.parts[b].atk - enemy.parts[a].atk);
            attackerKey = validAttackers[0];
        }
    } else {
        // Normal
        if (validTargets.includes('head') && Math.random() < 0.45) {
            targetKey = 'head';
        } else {
            validTargets.sort((a, b) => player.parts[a].hp - player.parts[b].hp);
            targetKey = validTargets[0];
        }

        const arms = validAttackers.filter(k => k !== 'head');
        if (arms.length > 0 && Math.random() < 0.7) {
            attackerKey = arms[Math.floor(Math.random() * arms.length)];
        } else {
            attackerKey = validAttackers[Math.floor(Math.random() * validAttackers.length)];
        }
    }

    const attacker = enemy.parts[attackerKey];
    const target = player.parts[targetKey];

    executeCombatTurn(attacker, target, enemy, player, targetKey, true, false);

    if (attacker.uses !== Infinity) {
        attacker.uses--;
    }

    if (!gameOver) {
        if (getValidAttackers(player).length === 0) {
            gameOver = true;
            log('💥 Você perdeu todas as peças de ataque! Derrota por K.O.!', 'lose');
            showWinnerAlert(enemy, `${enemy.name} venceu o combate!`);
        } else {
            isPlayerTurn = true;
            log('👉 Seu turno! Escolha seu ataque.', 'info');
        }
    }

    render();
}

// ==========================================================================
// 10. LISTENERS E EVENTOS
// ==========================================================================
function initGame() {
    hideWinnerAlert();
    showMainMenu();
}

// Botões de Ação de Combate
document.getElementById('attack-btn').addEventListener('click', handleAttack);
document.getElementById('medaforce-btn').addEventListener('click', handleMedaforceSpecial);
document.getElementById('repair-btn').addEventListener('click', handleRepair);
document.getElementById('reset-btn').addEventListener('click', () => {
    hideWinnerAlert();
    showSelectionScreen();
});
document.getElementById('play-again-btn').addEventListener('click', () => {
    hideWinnerAlert();
    showSelectionScreen();
});

// Botões de Navegação para o Menu Principal
const menuNavBtn = document.getElementById('menu-nav-btn');
if (menuNavBtn) {
    menuNavBtn.addEventListener('click', showMainMenu);
}

const backToMenuBtn = document.getElementById('back-to-menu-btn');
if (backToMenuBtn) {
    backToMenuBtn.addEventListener('click', showMainMenu);
}

const inGameMenuBtn = document.getElementById('in-game-menu-btn');
if (inGameMenuBtn) {
    inGameMenuBtn.addEventListener('click', showMainMenu);
}

const winnerMenuBtn = document.getElementById('winner-menu-btn');
if (winnerMenuBtn) {
    winnerMenuBtn.addEventListener('click', showMainMenu);
}

// 5 Opções do Menu Principal
const quickGameBtn = document.getElementById('btn-menu-quick-game');
if (quickGameBtn) {
    quickGameBtn.addEventListener('click', openQuickGame);
}

const loginBtn = document.getElementById('btn-menu-login');
if (loginBtn) {
    loginBtn.addEventListener('click', () => openFeaturePreview('login'));
}

const customizeBtn = document.getElementById('btn-menu-customize');
if (customizeBtn) {
    customizeBtn.addEventListener('click', () => openFeaturePreview('customize'));
}

const shopBtn = document.getElementById('btn-menu-shop');
if (shopBtn) {
    shopBtn.addEventListener('click', () => openFeaturePreview('shop'));
}

const tournamentBtn = document.getElementById('btn-menu-tournament');
if (tournamentBtn) {
    tournamentBtn.addEventListener('click', () => openFeaturePreview('tournament'));
}

// Modal de Prévia de Recursos Futuros
const featureCloseBtn = document.getElementById('feature-close-btn');
if (featureCloseBtn) {
    featureCloseBtn.addEventListener('click', closeFeaturePreview);
}

const featureNotifyBtn = document.getElementById('feature-notify-btn');
if (featureNotifyBtn) {
    featureNotifyBtn.addEventListener('click', () => {
        showToast('🎉 Seu interesse foi registrado com sucesso! Novidades em breve.', '🔔');
        closeFeaturePreview();
    });
}

// Terminal e Áudio
const clearLogBtn = document.getElementById('clear-log-btn');
if (clearLogBtn) {
    clearLogBtn.addEventListener('click', clearLog);
}

const soundToggleBtn = document.getElementById('sound-toggle-btn');
if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', toggleAudio);
}

// Seletor de Dificuldade da IA
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.diff-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-checked', 'true');
        gameDifficulty = e.target.dataset.diff;
        playSound('click');
    });
});

// Inicialização da aplicação
initGame();