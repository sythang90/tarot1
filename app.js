document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const root = document.documentElement;
    const shuffleScene = document.getElementById('shuffle-scene');
    const mainScene = document.getElementById('main-scene');
    const animatedPacket = document.getElementById('animated-packet');
    const deckBottom = document.getElementById('deck-bottom');
    const startBtn = document.getElementById('start-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const allowReverseCheckbox = document.getElementById('allow-reverse-checkbox');
    const cardLineup = document.getElementById('card-lineup');
    const readingArea = document.getElementById('reading-area');
    const redealBtn = document.getElementById('redeal-btn');
    const themeBtn = document.getElementById('theme-btn');
    const toggleMeaningsBtn = document.getElementById('toggle-meanings-btn');
    const cardModal = document.getElementById('card-modal');
    const meaningsContainer = document.getElementById('meanings-container');
    const modalCardImg = document.getElementById('modal-card-img');
    const modalCardName = document.getElementById('modal-card-name');
    const modalCardOrientation = document.getElementById('modal-card-orientation');
    const modalMeaningUp = document.getElementById('modal-meaning-up');
    const modalMeaningRev = document.getElementById('modal-meaning-rev');

    // --- State ---
    let deck = [];
    let dealtCards = [];
    let isAnimating = false;

    // --- High Performance Drag State ---
    let activeCard = null;
    let startX, startY;
    let currentX, currentY;
    let initialCardLeft, initialCardTop;
    let touchStartTime = 0;
    const TAP_DURATION_THRESHOLD = 200; // ms

    // --- Core Functions ---
    function shuffleDeck(cards) {
        let shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.map((card, index) => ({ ...card, id: index, isReversed: false, isFlipped: false }));
    }

    function layoutCards() {
        const lineupWidth = cardLineup.clientWidth - 20;
        const cardWidth = parseInt(getComputedStyle(root).getPropertyValue('--card-width'));
        const halfPoint = Math.ceil(dealtCards.length / 2);

        const cardsInFirstRow = dealtCards.filter(c => !c.inReadingArea && deck.findIndex(card => card.id === c.cardData.id) < halfPoint).length;
        const cardsInSecondRow = dealtCards.filter(c => !c.inReadingArea && deck.findIndex(card => card.id === c.cardData.id) >= halfPoint).length;

        const calculateSpacing = (count, w, cW) => (count > 1 && count * cW > w) ? (w - cW) / (count - 1) : cW * 0.6;
        const spacing1 = calculateSpacing(cardsInFirstRow, lineupWidth, cardWidth);
        const spacing2 = calculateSpacing(cardsInSecondRow, lineupWidth, cardWidth);
        
        let row1Idx = 0, row2Idx = 0;
        dealtCards.forEach(cardState => {
            if (cardState.inReadingArea) return;
            const cardElement = cardState.element;
            const indexInDeck = deck.findIndex(card => card.id === cardState.cardData.id);
            
            let top, left;
            if (indexInDeck < halfPoint) {
                top = cardLineup.offsetTop + 5;
                left = cardLineup.offsetLeft + 10 + row1Idx * spacing1;
                row1Idx++;
            } else {
                top = cardLineup.offsetTop + cardWidth * 0.4 + 10;
                left = cardLineup.offsetLeft + 10 + row2Idx * spacing2;
                row2Idx++;
            }
            cardElement.style.left = `${left}px`;
            cardElement.style.top = `${top}px`;
            cardElement.style.opacity = '1';
            cardElement.style.pointerEvents = 'auto';
        });
    }

    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.dataset.id = card.id;
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back"><img src="cards/back.png" alt="Card Back"></div>
                <div class="card-face card-front"><img src="cards/${card.img}" alt="${card.name}"></div>
            </div>`;
        cardDiv.addEventListener('mousedown', dragStart);
        cardDiv.addEventListener('touchstart', dragStart, { passive: false });
        mainScene.appendChild(cardDiv);
        return cardDiv;
    }
    
    function handleCardTap(cardElement) {
        const cardState = dealtCards.find(c => c.cardData.id == cardElement.dataset.id);
        if (!cardState || !cardState.inReadingArea) return;

        if (!cardState.cardData.isFlipped) {
            cardState.element.classList.add('flipped');
            cardState.cardData.isFlipped = true;
        } else {
            showModal(cardState.cardData);
        }
    }

    function showModal(card) {
        modalCardImg.src = `cards/${card.img}`;
        modalCardName.textContent = card.name;
        modalCardOrientation.textContent = card.isReversed ? 'Reversed' : '';
        modalMeaningUp.textContent = card.meaning_up;
        modalMeaningRev.textContent = card.meaning_rev;
        modalCardImg.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
        meaningsContainer.style.display = 'none';
        toggleMeaningsBtn.textContent = 'Show Meanings';
        cardModal.classList.add('active');
    }

    function hideModal(modalElement) {
        modalElement.classList.remove('active');
    }

    function goToScene(sceneName) {
        shuffleScene.classList.remove('active');
        mainScene.classList.remove('active');
        if (sceneName === 'main') mainScene.classList.add('active');
        else shuffleScene.classList.add('active');
    }
    
    function cutDeckAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        const randomX = -(100 + Math.random() * 50);
        const randomY = -(10 + Math.random() * 30);
        const randomRotate = -(5 + Math.random() * 25);
        const packetCards = animatedPacket.children;
        const numToAnimate = Math.floor(Math.random() * packetCards.length) + 1;
        for (let i = 0; i < packetCards.length; i++) packetCards[i].style.display = i < numToAnimate ? 'block' : 'none';
        animatedPacket.style.transform = `translateX(${randomX}%) translateY(${randomY}%) rotate(${randomRotate}deg)`;
        setTimeout(() => {
            animatedPacket.style.zIndex = '0';
            deckBottom.style.zIndex = '1';
            animatedPacket.style.transform = 'none';
            setTimeout(() => {
                animatedPacket.style.zIndex = '1';
                deckBottom.style.zIndex = '0';
                for (let card of packetCards) card.style.display = 'block';
                isAnimating = false;
            }, 150);
        }, 150);
    }
    
    function initializeDeck() {
        deck = shuffleDeck(cardData);
        dealtCards = deck.map(card => ({ element: createCardElement(card), cardData: card, inReadingArea: false }));
    }

    // --- Drag and Drop Logic ---
    function dragStart(e) {
        const el = e.target.closest('.card');
        if (!el) return;

        e.preventDefault();
        activeCard = el;
        touchStartTime = Date.now();
        
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        currentX = startX;
        currentY = startY;
        
        initialCardLeft = activeCard.offsetLeft;
        initialCardTop = activeCard.offsetTop;

        activeCard.classList.add('dragging');
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);

        requestAnimationFrame(updateDragPosition);
    }

    function dragMove(e) {
        if (!activeCard) return;
        e.preventDefault();
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    }

    function updateDragPosition() {
        if (!activeCard) return;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        activeCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        
        requestAnimationFrame(updateDragPosition);
    }

    function dragEnd(e) {
        if (!activeCard) return;

        const duration = Date.now() - touchStartTime;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);

        const card = activeCard;
        const cardState = dealtCards.find(c => c.cardData.id == card.dataset.id);
        
        activeCard = null; // Stop updateDragPosition loop
        card.classList.remove('dragging');
        card.style.transform = '';
        
        const finalLeft = initialCardLeft + deltaX;
        const finalTop = initialCardTop + deltaY;
        card.style.left = `${finalLeft}px`;
        card.style.top = `${finalTop}px`;

        // If it was a quick touch with almost no movement, treat as a tap
        if (duration < TAP_DURATION_THRESHOLD && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            handleCardTap(card);
        } else {
            // Check if dropped in reading area
            const readingAreaRect = readingArea.getBoundingClientRect();
            if (card.getBoundingClientRect().top + (card.offsetHeight / 2) > readingAreaRect.top) {
                cardState.inReadingArea = true;
            } else if (cardState.inReadingArea) {
                cardState.inReadingArea = false;
                layoutCards();
            }
        }
    }

    // --- Event Listeners ---
    document.getElementById('deck').addEventListener('click', cutDeckAnimation);
    startBtn.addEventListener('click', () => {
        const allowReverse = allowReverseCheckbox.checked;
        dealtCards.forEach(cs => {
            cs.cardData.isReversed = allowReverse ? Math.random() > 0.5 : false;
            cs.element.classList.toggle('reversed', cs.cardData.isReversed);
        });
        goToScene('main');
        layoutCards();
    });
    redealBtn.addEventListener('click', () => window.location.reload());
    settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
    closeSettingsBtn.addEventListener('click', () => hideModal(settingsModal));
    settingsModal.addEventListener('click', () => hideModal(settingsModal));
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeBtn.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
    });
    toggleMeaningsBtn.addEventListener('click', () => {
        const isHidden = meaningsContainer.style.display === 'none';
        meaningsContainer.style.display = isHidden ? 'block' : 'none';
        toggleMeaningsBtn.textContent = isHidden ? 'Hide Meanings' : 'Show Meanings';
    });
    cardModal.addEventListener('click', () => hideModal(cardModal));
    document.querySelectorAll('.modal-content').forEach(el => el.addEventListener('click', e => e.stopPropagation()));
    window.addEventListener('resize', () => {
        if(mainScene.classList.contains('active')) layoutCards();
    });

    function main() {
        initializeDeck();
        goToScene('shuffle');
        deckBottom.style.zIndex = '0';
        animatedPacket.style.zIndex = '1';
    }

    main();
});
