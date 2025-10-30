/* ===== quotes.js =====
   - Quotes data (10 categories)
   - Utility functions: getRandomFromCategory, getRandomFromAll
   - Favorites helpers: addFavorite, removeFavorite, getFavorites, isFavorite
   - BackgroundAnimator class used by pages
*/

// ---- Sample quotes data (5 per category) ----
const quotesData = {
  motivation: [
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "Wake up with determination. Go to bed with satisfaction.",
    "You are capable of more than you know.",
    "Small progress is still progress."
  ],
  love: [
    "Love isn’t something you find. Love is something that finds you. – Loretta Young",
    "To love and be loved is to feel the sun from both sides. – David Viscott",
    "Love is composed of a single soul inhabiting two bodies. – Aristotle",
    "Where there is love, there is life. – Mahatma Gandhi",
    "The best thing to hold onto in life is each other. – Audrey Hepburn"
  ],
  wisdom: [
    "Knowing yourself is the beginning of all wisdom. – Aristotle",
    "The only true wisdom is in knowing you know nothing. – Socrates",
    "Turn your wounds into wisdom. – Oprah Winfrey",
    "In the middle of difficulty lies opportunity. – Albert Einstein",
    "Wisdom begins in wonder."
  ],
  success: [
    "Success is not final; failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The way to get started is to quit talking and begin doing. – Walt Disney",
    "If you want to achieve greatness, stop asking for permission.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great."
  ],
  mindset: [
    "Discipline is choosing between what you want now and what you want most.",
    "Peace comes from within. Do not seek it without. – Buddha",
    "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
    "Calm mind brings inner strength and self-confidence.",
    "The greatest weapon against stress is our ability to choose one thought over another."
  ],
  leadership: [
    "A leader is one who knows the way, goes the way, and shows the way. – John C. Maxwell",
    "The function of leadership is to produce more leaders, not more followers.",
    "Leadership is the capacity to translate vision into reality. – Warren Bennis",
    "Earn your leadership every day. – Michael Jordan",
    "Leaders think and talk about the solutions. Followers think and talk about the problems."
  ],
  courage: [
    "It takes courage to grow up and become who you really are. – E.E. Cummings",
    "Courage doesn’t always roar. Sometimes it’s the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
    "He who is not courageous enough to take risks will accomplish nothing in life. – Muhammad Ali",
    "Life shrinks or expands in proportion to one’s courage. – Anaïs Nin",
    "Be brave enough to be bad at something new."
  ],
  work: [
    "Don't wish it were easier. Wish you were better. – Jim Rohn",
    "Hard work beats talent when talent doesn’t work hard.",
    "Opportunities are usually disguised as hard work, so most people don’t recognize them.",
    "Do something today that your future self will thank you for.",
    "The future depends on what you do today. – Mahatma Gandhi"
  ],
  creativity: [
    "Creativity is intelligence having fun. – Albert Einstein",
    "You can’t use up creativity. The more you use, the more you have. – Maya Angelou",
    "Every artist was first an amateur. – Ralph Waldo Emerson",
    "Think left and think right and think low and think high. – Dr. Seuss",
    "Don’t think. Thinking is the enemy of creativity. – Ray Bradbury"
  ],
  happiness: [
    "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
    "The most important thing is to enjoy your life—to be happy—it’s all that matters. – Audrey Hepburn",
    "Be happy for this moment. This moment is your life.",
    "Happiness depends upon ourselves. – Aristotle",
    "For every minute you are angry you lose sixty seconds of happiness. – Ralph Waldo Emerson"
  ]
};

// ---- Random pick helpers ----
function getRandomFromCategory(category) {
  const arr = quotesData[category] || [];
  if (!arr.length) return "No quotes for this category yet.";
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomFromAll() {
  const keys = Object.keys(quotesData);
  const cat = keys[Math.floor(Math.random() * keys.length)];
  return getRandomFromCategory(cat);
}

// ---- Favorites (localStorage) ----
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
}
function setFavorites(arr){ localStorage.setItem('favorites', JSON.stringify(arr)); }
function addFavorite(quote) {
  const list = getFavorites();
  if (!list.includes(quote)) {
    list.push(quote);
    setFavorites(list);
  }
}
function removeFavorite(quote) {
  let list = getFavorites();
  list = list.filter(q => q !== quote);
  setFavorites(list);
}
function isFavorite(quote) {
  return getFavorites().includes(quote);
}

// ---- BackgroundAnimator class (controls continuous gradient transitions and pulse) ----
class BackgroundAnimator {
  // targetClass: body class (page-home / page-quotes / page-favs)
  // gradients: array of [color1,color2]
  // opts: { speed: ms between automatic shifts }
  constructor(targetClass, gradients, opts={}) {
    this.targetClass = targetClass;
    this.gradients = gradients;
    this.speed = opts.speed || 9000;
    this.index = 0;
    this.body = document.querySelector('body.' + targetClass) || document.body;
    this.running = true;
    this._loop();
  }
  _loop(){
    if (!this.running) return;
    const g = this.gradients[this.index % this.gradients.length];
    this.body.style.background = `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
    this.index++;
    this.timeout = setTimeout(()=> this._loop(), this.speed);
  }
  pulse() {
    // temporary faster transition to next color then resume
    clearTimeout(this.timeout);
    const g = this.gradients[this.index % this.gradients.length];
    // brighten a little
    this.body.style.transition = 'background 450ms linear';
    this.body.style.background = `linear-gradient(135deg, ${g[1]}, ${g[0]})`;
    this.index++;
    // resume with slower transition
    setTimeout(()=> {
      this.body.style.transition = '';
      this._loop();
    }, 600);
  }
  stop(){
    this.running = false;
    clearTimeout(this.timeout);
  }
}
/* export helpers for use in pages (if using modules you'd export; here they are global) */
window.getRandomFromCategory = getRandomFromCategory;
window.getRandomFromAll = getRandomFromAll;
window.getFavorites = getFavorites;
window.addFavorite = addFavorite;
window.removeFavorite = removeFavorite;
window.isFavorite = isFavorite;
window.BackgroundAnimator = BackgroundAnimator;