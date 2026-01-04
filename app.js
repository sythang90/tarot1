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
    const modalContent = document.querySelector('.modal-content');
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
        cardDiv.draggable = true;
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
        cardDiv.addEventListener('dragstart', (e) => {
            if (isAnimating) {
                e.preventDefault();
                return;
            }
            e.dataTransfer.setData('text/plain', card.id);
            e.dataTransfer.setData('text/offset-x', e.offsetX);
            e.dataTransfer.setData('text/offset-y', e.offsetY);
            e.dataTransfer.effectAllowed = "move";

            setTimeout(() => {
                cardDiv.style.opacity = '0';
            }, 0);
        });

        cardDiv.addEventListener('dragend', (e) => {
            if (e.dataTransfer.dropEffect === 'none') {
                 cardDiv.style.opacity = '1';
                 cardDiv.style.pointerEvents = 'auto';
            }
        });

        return cardDiv;
    }

    function handleCardClick(cardId) {
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
            modalCardOrientation.textContent = ''; // Clear if not reversed
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
    
    // Stop modal from closing when clicking inside content
    document.querySelectorAll('.modal-content').forEach(el => {
        el.addEventListener('click', (e) => e.stopPropagation());
    });

    readingArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });

    readingArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        let offsetX = parseInt(e.dataTransfer.getData('text/offset-x'), 10);
        let offsetY = parseInt(e.dataTransfer.getData('text/offset-y'), 10);
        const cardState = dealtCards.find(c => c.cardData.id == cardId);
        
        if (cardState) {
            const cardElement = cardState.element;

            if (cardState.cardData.isReversed && cardState.cardData.isFlipped) {
                offsetX = cardElement.offsetWidth - offsetX;
                offsetY = cardElement.offsetHeight - offsetY;
            }

            if (!cardState.inReadingArea) {
                readingArea.appendChild(cardElement);
                cardState.inReadingArea = true;
            }
            cardElement.style.zIndex = 'auto';
            const rect = readingArea.getBoundingClientRect();
            const x = e.clientX - rect.left - offsetX;
            const y = e.clientY - rect.top - offsetY;
            
            cardElement.classList.add('no-transition');
            cardElement.style.left = `${x}px`;
            cardElement.style.top = `${y}px`;
            cardElement.style.opacity = '1';
            cardElement.style.pointerEvents = 'auto';

            setTimeout(() => {
                cardElement.classList.remove('no-transition');
            }, 50);
        }
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
