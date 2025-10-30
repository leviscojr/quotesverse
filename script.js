const quoteEl = document.getElementById("quote");
const nextBtn = document.getElementById("next");
const categoryTitle = document.getElementById("categoryTitle");

// Get selected category
const category = localStorage.getItem("selectedCategory");

// Define quotes per category
const quotesData = {
  motivation: [
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  ],
  love: [
    { text: "Love isn’t something you find. Love is something that finds you.", author: "Loretta Young" },
    { text: "Where there is love, there is life.", author: "Mahatma Gandhi" },
  ],
  wisdom: [
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
  ],
  success: [
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  ],
  mindset: [
    { text: "Discipline is doing what needs to be done, even when you don’t feel like it.", author: "Unknown" },
  ],
  leadership: [
    { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
  ],
  courage: [
    { text: "The brave man is not he who does not feel afraid, but he who conquers that fear.", author: "Nelson Mandela" },
  ],
  work: [
    { text: "Don’t wish it were easier; wish you were better.", author: "Jim Rohn" },
  ],
  creativity: [
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  ],
  happiness: [
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  ]
};

// Set category title
categoryTitle.innerText = document.querySelector(`button[data-category="${category}"]`)?.innerText || category;

// Show a random quote
function showRandomQuote() {
  const quotes = quotesData[category] || [];
  if (quotes.length === 0) {
    quoteEl.innerText = "No quotes available for this category yet.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteEl.innerText = `"${quote.text}"\n— ${quote.author}`;
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered successfully."))
    .catch(err => console.log("Service Worker registration failed:", err));
}
// Event
nextBtn.addEventListener("click", showRandomQuote);
showRandomQuote();