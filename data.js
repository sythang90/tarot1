const cardData = [
  {
    "name": "The Fool",
    "number": 0,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "00.png",
    "meaning_up": "New beginnings, innocence, spontaneity, a free spirit",
    "meaning_rev": "Holding back, recklessness, risk-taking"
  },
  {
    "name": "The Magician",
    "number": 1,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "01.png",
    "meaning_up": "Manifestation, resourcefulness, power, inspired action",
    "meaning_rev": "Manipulation, poor planning, untapped talents"
  },
  {
    "name": "The High Priestess",
    "number": 2,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "02.png",
    "meaning_up": "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    "meaning_rev": "Secrets, disconnected from intuition, withdrawal and silence"
  },
  {
    "name": "The Empress",
    "number": 3,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "03.png",
    "meaning_up": "Femininity, beauty, nature, nurturing, abundance",
    "meaning_rev": "Creative block, dependence on others"
  },
  {
    "name": "The Emperor",
    "number": 4,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "04.png",
    "meaning_up": "Authority, establishment, structure, a father figure",
    "meaning_rev": "Domination, excessive control, lack of discipline, inflexibility"
  },
  {
    "name": "The Hierophant",
    "number": 5,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "05.png",
    "meaning_up": "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
    "meaning_rev": "Personal beliefs, freedom, challenging the status quo"
  },
  {
    "name": "The Lovers",
    "number": 6,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "06.png",
    "meaning_up": "Love, harmony, relationships, values alignment, choices",
    "meaning_rev": "Self-love, disharmony, imbalance, misalignment of values"
  },
  {
    "name": "The Chariot",
    "number": 7,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "07.png",
    "meaning_up": "Control, willpower, success, action, determination",
    "meaning_rev": "Self-discipline, opposition, lack of direction"
  },
  {
    "name": "Strength",
    "number": 8,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "08.png",
    "meaning_up": "Strength, courage, persuasion, influence, compassion",
    "meaning_rev": "Inner strength, self-doubt, weakness, insecurity"
  },
  {
    "name": "The Hermit",
    "number": 9,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "09.png",
    "meaning_up": "Soul-searching, introspection, being alone, inner guidance",
    "meaning_rev": "Isolation, loneliness, withdrawal"
  },
  {
    "name": "Wheel of Fortune",
    "number": 10,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "10.png",
    "meaning_up": "Good luck, karma, life cycles, destiny, a turning point",
    "meaning_rev": "Bad luck, resistance to change, breaking cycles"
  },
  {
    "name": "Justice",
    "number": 11,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "11.png",
    "meaning_up": "Justice, fairness, truth, cause and effect, law",
    "meaning_rev": "Unfairness, lack of accountability, dishonesty"
  },
  {
    "name": "The Hanged Man",
    "number": 12,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "12.png",
    "meaning_up": "Pause, surrender, letting go, new perspectives",
    "meaning_rev": "Delays, resistance, stalling, indecision"
  },
  {
    "name": "Death",
    "number": 13,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "13.png",
    "meaning_up": "Endings, change, transformation, transition",
    "meaning_rev": "Resistance to change, personal transformation, inner purging"
  },
  {
    "name": "Temperance",
    "number": 14,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "14.png",
    "meaning_up": "Balance, moderation, patience, purpose",
    "meaning_rev": "Imbalance, excess, self-healing, re-alignment"
  },
  {
    "name": "The Devil",
    "number": 15,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "15.png",
    "meaning_up": "Shadow self, attachment, addiction, restriction, sexuality",
    "meaning_rev": "Releasing limiting beliefs, exploring dark thoughts, detachment"
  },
  {
    "name": "The Tower",
    "number": 16,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "16.png",
    "meaning_up": "Sudden change, upheaval, chaos, revelation, awakening",
    "meaning_rev": "Personal transformation, fear of change, averting disaster"
  },
  {
    "name": "The Star",
    "number": 17,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "17.png",
    "meaning_up": "Hope, faith, purpose, renewal, spirituality",
    "meaning_rev": "Lack of faith, despair, self-trust, disconnection"
  },
  {
    "name": "The Moon",
    "number": 18,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "18.png",
    "meaning_up": "Illusion, fear, anxiety, subconscious, intuition",
    "meaning_rev": "Release of fear, repressed emotion, inner confusion"
  },
  {
    "name": "The Sun",
    "number": 19,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "19.png",
    "meaning_up": "Positivity, fun, warmth, success, vitality",
    "meaning_rev": "Inner child, feeling down, overly optimistic"
  },
  {
    "name": "Judgement",
    "number": 20,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "20.png",
    "meaning_up": "Judgement, rebirth, inner calling, absolution",
    "meaning_rev": "Self-doubt, inner critic, ignoring the call"
  },
  {
    "name": "The World",
    "number": 21,
    "arcana": "Major Arcana",
    "suit": "Trump",
    "img": "21.png",
    "meaning_up": "Completion, integration, accomplishment, travel",
    "meaning_rev": "Seeking personal closure, short-cuts, delays"
  },
  {
    "name": "Ace of Wands",
    "number": 1,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w1.png",
    "meaning_up": "Inspiration, new opportunities, growth, potential",
    "meaning_rev": "An emerging idea, lack of direction, distractions, delays"
  },
  {
    "name": "Two of Wands",
    "number": 2,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w2.png",
    "meaning_up": "Future planning, progress, decisions, discovery",
    "meaning_rev": "Fear of unknown, lack of planning"
  },
  {
    "name": "Three of Wands",
    "number": 3,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w3.png",
    "meaning_up": "Progress, expansion, foresight, overseas opportunities",
    "meaning_rev": "Playing small, lack of foresight, unexpected delays"
  },
  {
    "name": "Four of Wands",
    "number": 4,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w4.png",
    "meaning_up": "Celebration, joy, harmony, relaxation, homecoming",
    "meaning_rev": "Personal celebration, inner harmony, conflict with others"
  },
  {
    "name": "Five of Wands",
    "number": 5,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w5.png",
    "meaning_up": "Conflict, disagreements, competition, tension, diversity",
    "meaning_rev": "Inner conflict, conflict avoidance, releasing tension"
  },
  {
    "name": "Six of Wands",
    "number": 6,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w6.png",
    "meaning_up": "Success, public recognition, progress, self-confidence",
    "meaning_rev": "Private achievement, personal definition of success, fall from grace, egotism"
  },
  {
    "name": "Seven of Wands",
    "number": 7,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w7.png",
    "meaning_up": "Challenge, competition, perseverance",
    "meaning_rev": "Giving up, overwhelm, overly protective"
  },
  {
    "name": "Eight of Wands",
    "number": 8,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w8.png",
    "meaning_up": "Movement, fast paced change, action, alignment",
    "meaning_rev": "Delays, frustration, resisting change"
  },
  {
    "name": "Nine of Wands",
    "number": 9,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w9.png",
    "meaning_up": "Resilience, courage, persistence, test of faith, boundaries",
    "meaning_rev": "Inner resources, struggle, overwhelm, defensive, paranoia"
  },
  {
    "name": "Ten of Wands",
    "number": 10,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w10.png",
    "meaning_up": "Burden, extra responsibility, hard work, completion",
    "meaning_rev": "Doing it all, carrying the burden, delegation, release"
  },
  {
    "name": "Page of Wands",
    "number": 11,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w11.png",
    "meaning_up": "Inspiration, ideas, discovery, limitless potential, free spirit",
    "meaning_rev": "Newly-formed ideas, redirecting energy, self-limiting beliefs, a spiritual path"
  },
  {
    "name": "Knight of Wands",
    "number": 12,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w12.png",
    "meaning_up": "Energy, passion, inspired action, adventure, impulsiveness",
    "meaning_rev": "Passion project, haste, scattered energy, delays, frustration"
  },
  {
    "name": "Queen of Wands",
    "number": 13,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w13.png",
    "meaning_up": "Courage, confidence, independence, social butterfly, determination",
    "meaning_rev": "Self-respect, self-confidence, introverted, a blocked path"
  },
  {
    "name": "King of Wands",
    "number": 14,
    "arcana": "Minor Arcana",
    "suit": "Wands",
    "img": "w14.png",
    "meaning_up": "Natural-born leader, vision, entrepreneur, honour",
    "meaning_rev": "Impulsiveness, haste, ruthless, high expectations"
  },
  {
    "name": "Ace of Cups",
    "number": 1,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c1.png",
    "meaning_up": "Love, new relationships, compassion, creativity",
    "meaning_rev": "Self-love, intuition, repressed emotions"
  },
  {
    "name": "Two of Cups",
    "number": 2,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c2.png",
    "meaning_up": "Unified love, partnership, mutual attraction",
    "meaning_rev": "Self-love, break-ups, disharmony, distrust"
  },
  {
    "name": "Three of Cups",
    "number": 3,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c3.png",
    "meaning_up": "Celebration, friendship, creativity, collaborations",
    "meaning_rev": "Independence, alone time, hardcore partying, 'three's a crowd'"
  },
  {
    "name": "Four of Cups",
    "number": 4,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c4.png",
    "meaning_up": "Meditation, contemplation, apathy, reevaluation",
    "meaning_rev": "Retreat, withdrawal, checking in for alignment"
  },
  {
    "name": "Five of Cups",
    "number": 5,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c5.png",
    "meaning_up": "Regret, failure, disappointment, pessimism",
    "meaning_rev": "Personal setbacks, self-forgiveness, moving on"
  },
  {
    "name": "Six of Cups",
    "number": 6,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c6.png",
    "meaning_up": "Revisiting the past, childhood memories, innocence, joy",
    "meaning_rev": "Living in the past, forgiveness, lacking playfulness"
  },
  {
    "name": "Seven of Cups",
    "number": 7,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c7.png",
    "meaning_up": "Opportunities, choices, wishful thinking, illusion",
    "meaning_rev": "Alignment, personal values, overwhelmed by choices"
  },
  {
    "name": "Eight of Cups",
    "number": 8,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c8.png",
    "meaning_up": "Disappointment, abandonment, withdrawal, escapism",
    "meaning_rev": "Trying one more time, indecision, aimless drifting, walking away"
  },
  {
    "name": "Nine of Cups",
    "number": 9,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c9.png",
    "meaning_up": "Contentment, satisfaction, gratitude, wish come true",
    "meaning_rev": "Inner happiness, materialism, dissatisfaction, indulgence"
  },
  {
    "name": "Ten of Cups",
    "number": 10,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c10.png",
    "meaning_up": "Divine love, blissful relationships, harmony, alignment",
    "meaning_rev": "Disconnection, misaligned values, struggling relationships"
  },
  {
    "name": "Page of Cups",
    "number": 11,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c11.png",
    "meaning_up": "Creative opportunities, intuitive messages, curiosity, possibility",
    "meaning_rev": "New ideas, doubting intuition, creative blocks, emotional immaturity"
  },
  {
    "name": "Knight of Cups",
    "number": 12,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c12.png",
    "meaning_up": "Creativity, romance, charm, imagination, beauty",
    "meaning_rev": "Overactive imagination, unrealistic, jealousy, moodiness"
  },
  {
    "name": "Queen of Cups",
    "number": 13,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c13.png",
    "meaning_up": "Compassionate, caring, emotionally stable, intuitive, in flow",
    "meaning_rev": "Inner feelings, self-care, self-love, co-dependency"
  },
  {
    "name": "King of Cups",
    "number": 14,
    "arcana": "Minor Arcana",
    "suit": "Cups",
    "img": "c14.png",
    "meaning_up": "Emotionally balanced, compassionate, diplomatic",
    "meaning_rev": "Self-compassion, inner feelings, moodiness, emotionally manipulative"
  },
  {
    "name": "Ace of Swords",
    "number": 1,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s1.png",
    "meaning_up": "Breakthroughs, new ideas, mental clarity, success",
    "meaning_rev": "Inner clarity, re-thinking an idea, clouded judgement"
  },
  {
    "name": "Two of Swords",
    "number": 2,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s2.png",
    "meaning_up": "Difficult choices, indecision, stalemate, truce",
    "meaning_rev": "Indecision, confusion, information overload, stalemate"
  },
  {
    "name": "Three of Swords",
    "number": 3,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s3.png",
    "meaning_up": "Heartbreak, emotional pain, sorrow, grief, hurt",
    "meaning_rev": "Negative self-talk, releasing pain, optimism, forgiveness"
  },
  {
    "name": "Four of Swords",
    "number": 4,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s4.png",
    "meaning_up": "Rest, relaxation, meditation, contemplation, recuperation",
    "meaning_rev": "Exhaustion, burn-out, deep contemplation, stagnation"
  },
  {
    "name": "Five of Swords",
    "number": 5,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s5.png",
    "meaning_up": "Conflict, disagreements, competition, defeat, winning at all costs",
    "meaning_rev": "Reconciliation, making amends, past resentment"
  },
  {
    "name": "Six of Swords",
    "number": 6,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s6.png",
    "meaning_up": "Transition, change, rite of passage, releasing baggage",
    "meaning_rev": "Personal transition, resistance to change, unfinished business"
  },
  {
    "name": "Seven of Swords",
    "number": 7,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s7.png",
    "meaning_up": "Betrayal, deception, getting away with something, acting strategically",
    "meaning_rev": "Imposter syndrome, self-deceit, keeping secrets"
  },
  {
    "name": "Eight of Swords",
    "number": 8,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s8.png",
    "meaning_up": "Negative thoughts, self-imposed restriction, imprisonment, victim mentality",
    "meaning_rev": "Self-limiting beliefs, inner critic, releasing negative thoughts, open to new perspectives"
  },
  {
    "name": "Nine of Swords",
    "number": 9,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s9.png",
    "meaning_up": "Anxiety, worry, fear, depression, nightmares",
    "meaning_rev": "Inner turmoil, deep-seated fears, secrets, releasing worry"
  },
  {
    "name": "Ten of Swords",
    "number": 10,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s10.png",
    "meaning_up": "Painful endings, deep wounds, betrayal, loss, crisis",
    "meaning_rev": "Recovery, regeneration, resisting an inevitable end"
  },
  {
    "name": "Page of Swords",
    "number": 11,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s11.png",
    "meaning_up": "New ideas, curiosity, thirst for knowledge, new ways of communicating",
    "meaning_rev": "Self-expression, all talk and no action, haphazard action, haste"
  },
  {
    "name": "Knight of Swords",
    "number": 12,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s12.png",
    "meaning_up": "Ambitious, action-oriented, driven to succeed, fast-thinking",
    "meaning_rev": "Restless, unfocused, impulsive, burn-out"
  },
  {
    "name": "Queen of Swords",
    "number": 13,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s13.png",
    "meaning_up": "Independent, unbiased judgement, clear boundaries, direct communication",
    "meaning_rev": "Overly-emotional, easily influenced, bitchy, cold-hearted"
  },
  {
    "name": "King of Swords",
    "number": 14,
    "arcana": "Minor Arcana",
    "suit": "Swords",
    "img": "s14.png",
    "meaning_up": "Mental clarity, intellectual power, authority, truth",
    "meaning_rev": "Quiet power, inner truth, misuse of power, manipulation"
  },
  {
    "name": "Ace of Pentacles",
    "number": 1,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p1.png",
    "meaning_up": "A new financial or career opportunity, manifestation, abundance",
    "meaning_rev": "Lost opportunity, lack of planning and foresight"
  },
  {
    "name": "Two of Pentacles",
    "number": 2,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p2.png",
    "meaning_up": "Multiple priorities, time management, prioritisation, adaptability",
    "meaning_rev": "Over-committed, disorganisation, re-prioritisation"
  },
  {
    "name": "Three of Pentacles",
    "number": 3,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p3.png",
    "meaning_up": "Teamwork, collaboration, learning, implementation",
    "meaning_rev": "Disharmony, misalignment, working alone"
  },
  {
    "name": "Four of Pentacles",
    "number": 4,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p4.png",
    "meaning_up": "Saving money, security, conservatism, scarcity, control",
    "meaning_rev": "Over-spending, greed, self-protection"
  },
  {
    "name": "Five of Pentacles",
    "number": 5,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p5.png",
    "meaning_up": "Financial loss, poverty, lack mindset, isolation, worry",
    "meaning_rev": "Recovery from financial loss, spiritual poverty"
  },
  {
    "name": "Six of Pentacles",
    "number": 6,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p6.png",
    "meaning_up": "Giving, receiving, sharing wealth, generosity, charity",
    "meaning_rev": "Self-care, unpaid debts, one-sided charity"
  },
  {
    "name": "Seven of Pentacles",
    "number": 7,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p7.png",
    "meaning_up": "Long-term view, sustainable results, perseverance, investment",
    "meaning_rev": "Lack of long-term vision, limited success or reward"
  },
  {
    "name": "Eight of Pentacles",
    "number": 8,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p8.png",
    "meaning_up": "Apprenticeship, repetitive tasks, mastery, skill development",
    "meaning_rev": "Self-development, perfectionism, misdirected activity"
  },
  {
    "name": "Nine of Pentacles",
    "number": 9,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p9.png",
    "meaning_up": "Abundance, luxury, self-sufficiency, financial independence",
    "meaning_rev": "Self-worth, over-investment in work, hustling"
  },
  {
    "name": "Ten of Pentacles",
    "number": 10,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p10.png",
    "meaning_up": "Wealth, financial security, family, long-term success, contribution",
    "meaning_rev": "The dark side of wealth, financial failure or loss"
  },
  {
    "name": "Page of Pentacles",
    "number": 11,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p11.png",
    "meaning_up": "Manifestation, financial opportunity, skill development",
    "meaning_rev": "Lack of progress, procrastination, learn from failure"
  },
  {
    "name": "Knight of Pentacles",
    "number": 12,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p12.png",
    "meaning_up": "Hard work, productivity, routine, conservatism",
    "meaning_rev": "Self-discipline, boredom, feeling 'stuck', perfectionism"
  },
  {
    "name": "Queen of Pentacles",
    "number": 13,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p13.png",
    "meaning_up": "Nurturing, practical, providing financially, a working parent",
    "meaning_rev": "Financial independence, self-care, work-home conflict"
  },
  {
    "name": "King of Pentacles",
    "number": 14,
    "arcana": "Minor Arcana",
    "suit": "Pentacles",
    "img": "p14.png",
    "meaning_up": "Wealth, business, leadership, security, discipline, abundance",
    "meaning_rev": "Financially inept, obsessed with wealth and status, stubborn"
  }
]
