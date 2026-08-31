import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card";
import ScoresBoard from "./components/scoresboard";
import shuffleCards from "./utils/shuffleCards.js";
import fetchCardsData from "./utils/api.js";

const AMOUNT_OF_CARDS = 12;

// get the best score from local storage
function getBestScore() {
  const storedBestScore = localStorage.getItem("bestScore");

  if (storedBestScore !== null) {
    return Number(storedBestScore);
  }

  return 0;
}

function App() {
  const [bestScore, setBestScore] = useState(getBestScore);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [cards, setCards] = useState([]);

  // init game
  useEffect(() => {
    async function initGame() {
      const data = await fetchCardsData(AMOUNT_OF_CARDS);
      setCards(shuffleCards(data));
    }

    initGame();
  }, []);

  function handleCardsClick(clickedCardID) {
    if (clickedIds.has(clickedCardID)) {
      alert("Game Over! You clicked the same card twice.");

      setCurrentScore(0);
      setClickedIds(new Set());
    } else {
      const newScore = currentScore + 1;

      const newClickedIds = new Set(clickedIds);
      newClickedIds.add(clickedCardID);

      setCurrentScore(newScore);
      setClickedIds(newClickedIds);

      // Update best score
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("bestScore", newScore);
      }

      // Check if won
      if (newClickedIds.size === AMOUNT_OF_CARDS) {
        alert("Congratulations! You won!");

        setCurrentScore(0);
        setClickedIds(new Set());
      }
    }

    // Shuffle cards
    setCards((prevCards) => shuffleCards(prevCards));
  }

  return (
    <div className="container">
      <header>
        <div>
          <h1>Memory Game</h1>
          <p>
            Get points by clicking on an image, but don't click on any more than
            once!
          </p>
        </div>

        <ScoresBoard currentScore={currentScore} bestScore={bestScore} />
      </header>

      <main className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardsClick} />
        ))}
      </main>
    </div>
  );
}

export default App;
