# 🤖 Medabots Robottle — Card Game Arena

![Version](https://img.shields.io/badge/Vers%C3%A3o-3.0%20Cyberpunk-00e5ff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A2ntico-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern%20UI-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Web Audio](https://img.shields.io/badge/Audio-Web%20Audio%20API-FF5722?style=for-the-badge)
![Android](https://img.shields.io/badge/Android-SDK%2035%20Offline-3DDC84?style=for-the-badge&logo=android&logoColor=white)

Simulador tático e interativo de combate em turnos estilo **Robottle**, inspirado no clássico universo de **Medabots**. O projeto combina mecânicas estratégicas de desmontagem de peças, gerenciamento de recursos de **Medaforce**, taxas de esquiva/crítico, inteligência artificial configurável e uma interface cyberpunk retrofuturista com efeitos sonoros procedurais sintetizados em tempo real via **Web Audio API**.

---

## 📸 Visão Geral da Arena

```
+-----------------------------------------------------------------------+
|  [MEDAWATCH OS v3.2]         ROBOTTLE MEDABOTS                   [🔊] |
+-----------------------------------------------------------------------+
|                         >>> SEU TURNO <<<                             |
+-----------------------------------------------------------------------+
| [OPONENTE]  💨 Esquiva: 15%     |  MEDAFORCE: [||||||||||          ]  |
|  [ Cabeça ]  [ Braço Esq ]  [ Medalha ]  [ Braço Dir ]  [ Pernas ]    |
+-----------------------------------------------------------------------+
|                          TERMINAL DE COMBATE                          |
|  > Robottle Iniciado! Metabee VS Warbandit.                           |
|  > [GOLPE CRÍTICO!] Você causou 39 de dano na Cabeça do Inimigo!      |
|  -------------------------------------------------------------------  |
|  [ 🛠️ Reparo (1x) ]  [ ⚡ MEDAFORCE ]  [ ⚔️ ATACAR ]  [ 🔄 Reiniciar ] |
+-----------------------------------------------------------------------+
| [JOGADOR]   💨 Esquiva: 18%     |  MEDAFORCE: [||||||||||||||||||||]  |
|  [ Cabeça ]  [ Braço Esq ]  [ Medalha ]  [ Braço Dir ]  [ Pernas ]    |
+-----------------------------------------------------------------------+
```

---

## ⚡ Principais Funcionalidades

### 1. Sistema Tático de Peças (Partes)
Cada Medabot é composto por 5 componentes com funções e impactos estratégicos específicos:
* **Cabeça (Head):** Golpes de alto poder, porém com **número limitado de usos** (ex: 2x por partida). **Regra de K.O.:** se a cabeça for destruída (HP = 0), o Medabot é desativado imediatamente e perde o combate!
* **Braço Direito (Right Arm) & Braço Esquerdo (Left Arm):** Armas ofensivas principais (Tiro, Melee, Snipe, etc.) com **usos ilimitados**. Se ambos os braços e a cabeça forem destruídos, o robô fica desarmado e é derrotado.
* **Pernas (Legs):** Determinam a **taxa de esquiva** do Medabot. Se as pernas forem destruídas:
  * A taxa de esquiva é reduzida para **0%**.
  * O Medabot sofre **+20% de dano adicional** em todas as outras partes ativas.
* **Medalha (Medal):** O núcleo vital do Medabot. Acumula energia de combate para liberar o ataque devastador de **Medaforce**.

### 2. Medaforce (Ataque Especial da Medalha)
* A barra de Medaforce é carregada dinamicamente durante a partida:
  * **+20%** ao desferir um ataque.
  * **+25%** ao sofrer um golpe.
  * **+10%** mesmo em manobras de esquiva.
* Ao atingir **100% de carga**, o botão `MEDAFORCE SPECIAL` é desbloqueado.
* O especial causa **dano massivo e direto (inesquivável)**, além de efeitos secundários exclusivos dependendo do Medabot (ex: cura em área).

### 3. Reparo de Emergência (Módulo de Campo)
* Cada lutador possui **1 uso único por combate** da habilidade `Reparo de Emergência`.
* Restaura instantaneamente até **+22 HP** na peça mais danificada (dando prioridade máxima à Cabeça para evitar derrotas por K.O.).

### 4. Inteligência Artificial com 3 Dificuldades
* 🟢 **Iniciante (Easy):** A IA seleciona atacantes e alvos de forma aleatória.
* 🟡 **Normal:** Foca em alvos mais vulneráveis e equilibra o uso de munição dos braços e cabeça.
* 🔴 **Lendário (Hard):**
  * Calcula dano letal para finalizar a cabeça do jogador em um só turno.
  * Foca na destruição das pernas caso o jogador tenha alta taxa de esquiva.
  * Desarma os braços mais fortes do jogador.
  * Executa o Reparo de Emergência no momento crítico em que sua cabeça atinge menos de 40% de vida.

### 5. Motor de Áudio Procedural (Web Audio API)
* Não requer arquivos de áudio externos (`.mp3` ou `.wav`). Todos os efeitos são **sintetizados em tempo real** através de osciladores de frequência:
  * *Tiros de Laser (sawtooth)*, *Cortes de Espada (triangle)*, *Impactos Físicos (square)*, *Golpes Críticos*, *Esquivas Ágeis*, *Sons de Cura/Reparo*, *Disparo da Medaforce*, *Destruição de Peças*, *Melodia de Vitória* e *Som de Derrota*.
* Controle de ativação/desativação de som (`Mute/Unmute`) na barra superior.

---

## 🤖 Roster de Medabots Disponíveis

| Medabot | Função / Especialidade | HP Total | Dano Principal | Esquiva | Crítico | Especial Medaforce |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Metabee** | Atirador Pesado (Kabuto)<br>_Alto dano concentrado e disparos de longo alcance._ | **150** | Míssil: **26**<br>Canhão: **17** | **18%** | **+15%** | **Disparo Triplo Kabuto**<br>38 de dano massivo direto. |
| **Rokusho** | Espadachim Veloz (Kuwagata)<br>_Alta taxa de acerto crítico e agilidade superior._ | **138** | Radar/Corte: **28**<br>Espada: **19** | **24%** | **+28%** | **Corte Celestial Kuwagata**<br>40 de dano ultrassônico garantido. |
| **Sailor Multi** | Suporte Tático & Evasão (Brass)<br>_Especialista em recuperação e evasão de combate._ | **130** | Pulso: **24**<br>Laser: **16** | **22%** | **+12%** | **Restauração Total & Pulso**<br>22 de dano + restaura **+18 HP** em todas as peças ativas. |
| **Warbandit** | Caçador de Elite (Leão)<br>_Dano brutal e capacidade de finalização rápida._ | **162** | Canhão Solar: **32**<br>Gatling/Canhão: **16** | **14%** | **+18%** | **Fúria do Leão Dourado**<br>Rajada colossal de 44 de dano. |
| **Krossknight** | Tanque Blindado (Cavaleiro)<br>_Altíssima durabilidade, escudos e proteção pesada._ | **160** | V-Visor: **28**<br>Cyber-Sabre: **18** | **10%** | **+14%** | **Impacto da Justiça**<br>36 de dano sagrado e reforço de blindagem. |

---

## 🎮 Como Jogar

1. **Escolha a Dificuldade e o seu Medabot:** Na tela inicial ("Central de Robottle"), selecione o nível da IA e clique no card do seu Medabot preferido.
2. **Selecione a Peça Atacante:** Clique em uma das suas peças ativas que possua ataque disponível (Cabeça, Braço Esquerdo ou Braço Direito).
3. **Selecione o Alvo:** Clique na peça inimiga que deseja atingir no campo adversário.
4. **Efetue o Ataque:** Pressione o botão `⚔️ ATACAR ALVO`.
5. **Acompanhe o Terminal:** Leia o histórico de combate para acompanhar danos, acertos críticos, esquivas e destruição de peças.
6. **Medaforce:** Quando sua barra de energia atingir 100%, selecione o alvo inimigo e pressione `⚡ MEDAFORCE SPECIAL`.
7. **Condições de Vitória:**
   * 🏆 **Vitória:** Destrua a **Cabeça** do oponente ou destrua **todas as suas peças ofensivas**.
   * 💀 **Derrota:** Tenha sua **Cabeça** destruída ou fique sem peças ofensivas disponíveis.

---

## 📂 Estrutura do Projeto

```
medabots-cardgame-main/
│
├── index.html                  # Interface semântica da Arena, modais e layout de combate
├── style.css                   # Design system Cyberpunk, layout CSS Grid, animações e efeitos
├── script.js                   # Motor do jogo: regras, cálculos de dano, IA, Medaforce e áudio
├── Medabots-Robottle.apk       # Instalador standalone pronto para dispositivos Android
│
├── assets/                     # Sprites e ilustrações das peças e medalhas
│   ├── metabee partes/         # Cabeça, braços, pernas e medalha de Metabee
│   ├── rokusho partes/         # Cabeça, braços, pernas e medalha de Rokusho
│   ├── Sailor/                 # Peças e medalha de Sailor Multi
│   ├── warbandit/              # Peças, medalha e card de Warbandit
│   └── Krossknight/            # Peças, medalha e card de Krossknight
│
└── android/                    # Projeto Android nativo (Android Studio + Gradle)
    ├── app/                    # Módulo com WebView configurada e assets empacotados
    ├── build.gradle.kts        # Configuração de build do Gradle
    └── README.md               # Guia específico para compilação Android
```

---

## 🚀 Como Executar o Projeto

### 🌐 Opção 1: No Navegador (Web / Desktop / Mobile)

Por ser uma aplicação baseada em tecnologias web puras, não é necessária nenhuma instalação complexa.

1. **Execução Direta:**
   * Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari, Opera).

2. **Via Servidor Local (Recomendado para melhor suporte a áudio):**
   * Usando **VS Code / Live Server**: Clique com o botão direito em `index.html` e escolha *"Open with Live Server"*.
   * Usando **Node.js (npx serve / http-server)**:
     ```bash
     npx serve .
     ```
   * Usando **Python 3**:
     ```bash
     python -m http.server 8080
     ```
   * Acesse `http://localhost:8080` no seu navegador.

---

### 📱 Opção 2: No Android (Dispositivo Físico ou Emulador)

#### Instalação Direta (APK pré-compilado):
* Transfira o arquivo `Medabots-Robottle.apk` para seu aparelho Android e faça a instalação direta (permita a instalação de fontes desconhecidas se solicitado).

#### Compilação via Android Studio:
1. Abra o Android Studio.
2. Selecione a opção **"Open an Existing Project"** e escolha a pasta `android/`.
3. Aguarde o Gradle sincronizar as dependências (requer Android SDK 35 e Java 17).
4. Conecte seu dispositivo Android via USB (Depuração USB ativada) ou inicie um Emulador AVD.
5. Clique em **Run ▶️ (`Shift + F10`)** ou gere o APK com o comando:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica, acessibilidade ARIA e suporte a metadados modernos.
* **CSS3:**
  * Variáveis CSS (Design Tokens com paleta Neon / Cyberpunk).
  * CSS Grid & Flexbox para disposição responsiva do tabuleiro.
  * Efeitos de Glassmorphism, scanlines dinâmicas e animações (`@keyframes`) para impactos visuais e tremores na tela.
  * Fontes estilizadas via Google Fonts (*Orbitron*, *Rajdhani*, *Space Grotesk*).
* **JavaScript (ES6+ Vanilla):**
  * Arquitetura orientada a eventos e dados declarativos.
  * Motor de combate matemático (variância de dano, multiplicadores críticos, esquiva e penalidade de peças).
  * Máquina de estados para turnos e fluxos de vitória/derrota.
* **Web Audio API:** Síntese sonora procedural de baixa latência e compatibilidade multiplataforma.
* **Android SDK / WebView:** Empacotamento offline para execução nativa em dispositivos móveis.

---

## 📜 Licença e Créditos

* Projeto desenvolvido para fins de estudo, entretenimento e homenagem ao clássico universo **Medabots** (Imagineer / Natsume).
* Imagens e nomes de personagens são propriedades intelectuais de seus respectivos detentores de direitos autorais.
