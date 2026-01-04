document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const root = document.documentElement;
    const app = document.getElementById('app');
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
    const modalContent = document.querySelector('#card-modal .modal-content');
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
    // Drag state
    let activeCardElement = null;
    let initialX, initialY, xOffset = 0, yOffset = 0;

    // --- Core Functions ---

    function shuffleDeck(cards) {
        let shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.map((card, index) => ({
            ...card,
            id: index,
            isReversed: false,
            isFlipped: false
        }));
    }

    function dealCards() {
        cardLineup.innerHTML = '';
        const lineupWidth = cardLineup.clientWidth - 20;
        const cardWidth = parseInt(getComputedStyle(root).getPropertyValue('--card-width'));

        const numCardsTotal = deck.length;
        const halfPoint = Math.ceil(numCardsTotal / 2);

        const cardsInFirstRowCount = dealtCards.filter(c => !c.inReadingArea && deck.findIndex(card => card.id === c.cardData.id) < halfPoint).length;
        const cardsInSecondRowCount = dealtCards.filter(c => !c.inReadingArea && deck.findIndex(card => card.id === c.cardData.id) >= halfPoint).length;

        const calculateSpacing = (cardCount, lineupW, cW) => {
            if (cardCount <= 1) return cW;
            const totalWidthRequired = cardCount * cW;
            if (totalWidthRequired > lineupW) {
                const overlapNeeded = totalWidthRequired - lineupW;
                return Math.max(cW - (overlapNeeded / (cardCount - 1)), cW * 0.2);
            }
            return cW * 0.6;
        };

        const spacing1 = calculateSpacing(cardsInFirstRowCount, lineupWidth, cardWidth);
        const spacing2 = calculateSpacing(cardsInSecondRowCount, lineupWidth, cardWidth);

        let currentRow1Index = 0;
        let currentRow2Index = 0;

        dealtCards.forEach(cardState => {
            const cardElement = cardState.element;
            const indexInDeck = deck.findIndex(card => card.id === cardState.cardData.id);

            cardLineup.appendChild(cardElement);

            if (cardState.inReadingArea) {
                cardElement.style.opacity = '0';
                cardElement.style.pointerEvents = 'none';
                let top, left;
                if (indexInDeck < halfPoint) {
                    top = 5;
                    left = 10 + currentRow1Index * spacing1;
                    currentRow1Index++;
                } else {
                    top = cardWidth * 0.4 + 10;
                    left = 10 + currentRow2Index * spacing2;
                    currentRow2Index++;
                }
                cardElement.style.top = `${top}px`;
                cardElement.style.left = `${left}px`;
            } else {
                cardElement.style.opacity = '1';
                cardElement.style.pointerEvents = 'auto';
                let top, left, zIndex;

                if (indexInDeck < halfPoint) {
                    top = 5;
                    left = 10 + currentRow1Index * spacing1;
                    zIndex = cardsInFirstRowCount - currentRow1Index;
                    currentRow1Index++;
                } else {
                    top = cardWidth * 0.4 + 10;
                    left = 10 + currentRow2Index * spacing2;
                    zIndex = cardsInSecondRowCount - currentRow2Index;
                    currentRow2Index++;
                }
                cardElement.style.top = `${top}px`;
                cardElement.style.left = `${left}px`;
                cardElement.style.zIndex = zIndex;
            }
        });
    }

    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.dataset.id = card.id;

        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back">
                    <img src="cards/back.png" alt="Card Back">
                </div>
                <div class="card-face card-front">
                    <img src="cards/${card.img}" alt="${card.name}">
                </div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => handleCardClick(card.id));
        
        // Add listeners for both mouse and touch events
        cardDiv.addEventListener('mousedown', dragStart);
        cardDiv.addEventListener('touchstart', dragStart, { passive: false });

        return cardDiv;
    }

    function handleCardClick(cardId) {
        if (activeCardElement) return; // Don't flip if it was just dragged
        if (isAnimating) return;
        const cardState = dealtCards.find(c => c.cardData.id == cardId);
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
        
        if (card.isReversed) {
            modalCardOrientation.textContent = 'Reversed';
        } else {
            modalCardOrientation.textContent = '';
        }

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
        if (sceneName === 'main') {
            mainScene.classList.add('active');
        } else {
            shuffleScene.classList.add('active');
        }
    }
    
    function cutDeckAnimation() {
        if (isAnimating) return;
        isAnimating = true;

        const randomX = -(100 + Math.random() * 50);
        const randomY = -(10 + Math.random() * 30);
        const randomRotate = -(5 + Math.random() * 25);

        const packetCards = animatedPacket.children;
        const numToAnimate = Math.floor(Math.random() * packetCards.length) + 1;
        for (let i = 0; i < packetCards.length; i++) {
            packetCards[i].style.display = i < numToAnimate ? 'block' : 'none';
        }

        animatedPacket.style.transform = `translateX(${randomX}%) translateY(${randomY}%) rotate(${randomRotate}deg)`;
        
        setTimeout(() => {
            animatedPacket.style.zIndex = '0';
            deckBottom.style.zIndex = '1';
            animatedPacket.style.transform = 'none';
            
            setTimeout(() => {
                animatedPacket.style.zIndex = '1';
                deckBottom.style.zIndex = '0';
                for (let card of packetCards) {
                    card.style.display = 'block';
                }
                isAnimating = false;
            }, 150);
        }, 150);
    }
    
    function initializeDeck() {
        deck = shuffleDeck(cardData);
        dealtCards = deck.map(card => {
            const element = createCardElement(card);
            return { element: element, cardData: card, inReadingArea: false };
        });
    }

    // --- Drag and Drop Logic (Mouse and Touch) ---

    function dragStart(e) {
        if (e.target.closest('.card')) {
            activeCardElement = e.target.closest('.card');
            
            const cardState = dealtCards.find(c => c.cardData.id == activeCardElement.dataset.id);
            if (!cardState) {
                activeCardElement = null;
                return;
            }

            // Bring card to front
            activeCardElement.style.zIndex = 1000;
            
            const rect = activeCardElement.getBoundingClientRect();
            
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent scrolling and other default touch actions
                initialX = e.touches[0].clientX - rect.left;
                initialY = e.touches[0].clientY - rect.top;
            } else {
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
            }

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
        }
    }

    function drag(e) {
        if (!activeCardElement) return;

        e.preventDefault();

        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }

        const readingAreaRect = readingArea.getBoundingClientRect();
        let newX = currentX - readingAreaRect.left - initialX;
        let newY = currentY - readingAreaRect.top - initialY;
        
        // If the card is reversed and flipped, adjust the offset
        const cardState = dealtCards.find(c => c.cardData.id == activeCardElement.dataset.id);
        if (cardState && cardState.cardData.isReversed && cardState.cardData.isFlipped) {
             newX = currentX - readingAreaRect.left - (activeCardElement.offsetWidth - initialX);
             newY = currentY - readingAreaRect.top - (activeCardElement.offsetHeight - initialY);
        }

        setTranslate(newX, newY, activeCardElement);
    }

    function dragEnd(e) {
        if (!activeCardElement) return;
        
        // Remove listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);

        const cardState = dealtCards.find(c => c.cardData.id == activeCardElement.dataset.id);
        const readingAreaRect = readingArea.getBoundingClientRect();
        const cardRect = activeCardElement.getBoundingClientRect();

        // Check if card is dropped in the reading area
        if (cardRect.top > readingAreaRect.top) {
            if (!cardState.inReadingArea) {
                readingArea.appendChild(activeCardElement);
                cardState.inReadingArea = true;
            }
            activeCardElement.style.zIndex = 'auto';
        } else {
            // Snap back to lineup if not dropped in reading area
            cardLineup.appendChild(activeCardElement);
            cardState.inReadingArea = false;
            dealCards(); // Redraw lineup to place it back
        }
        
        activeCardElement = null;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.left = `${xPos}px`;
        el.style.top = `${yPos}px`;
    }


    // --- Event Listeners ---
    document.getElementById('deck').addEventListener('click', cutDeckAnimation);
    
    startBtn.addEventListener('click', () => {
        const allowReverse = allowReverseCheckbox.checked;

        dealtCards.forEach(cardState => {
            cardState.cardData.isReversed = allowReverse ? Math.random() > 0.5 : false;
            
            if (cardState.cardData.isReversed) {
                cardState.element.classList.add('reversed');
            } else {
                cardState.element.classList.remove('reversed');
            }
        });

        goToScene('main');
        dealCards();
    });

    redealBtn.addEventListener('click', () => window.location.reload());
    
    settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
    closeSettingsBtn.addEventListener('click', () => hideModal(settingsModal));
    settingsModal.addEventListener('click', () => hideModal(settingsModal));

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeBtn.textContent = 'Dark Mode';
        } else {
            themeBtn.textContent = 'Light Mode';
        }
    });

    toggleMeaningsBtn.addEventListener('click', () => {
        const isHidden = meaningsContainer.style.display === 'none';
        meaningsContainer.style.display = isHidden ? 'block' : 'none';
        toggleMeaningsBtn.textContent = isHidden ? 'Hide Meanings' : 'Show Meanings';
    });

    cardModal.addEventListener('click', () => hideModal(cardModal));
    
    document.querySelectorAll('.modal-content').forEach(el => {
        el.addEventListener('click', (e) => e.stopPropagation());
    });

    window.addEventListener('resize', () => {
        if(mainScene.classList.contains('active')) {
            dealCards();
        }
    });

    function main() {
        initializeDeck();
        goToScene('shuffle');
        deckBottom.style.zIndex = '0';
        animatedPacket.style.zIndex = '1';
    }

    main();
});