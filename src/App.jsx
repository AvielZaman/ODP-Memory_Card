import {useEffect, useState } from 'react'
import './App.css'
import Card from './components/card'
import ScoresBoard from './components/scoresboard'
import shuffleCards from './utils/shuffleCards.js'
import fetchCardsData from './utils/api.js'

function App() {
  const[bestScore, setBestScore] = useState(0);
  const[currentScore, setCurrentScore] = useState(0);
  const[clickedIds, setClickedIds] = useState(new Set());
  const[cards, setCards] = useState([]);

  const AMOUNT_OF_CARDS = 12;

  useEffect(()=>{
    async function initGame(){
      const data = await fetchCardsData(AMOUNT_OF_CARDS);
      setCards(shuffleCards(data));
    }

    initGame();
  },[]);

  function handleCardsClick(){


    // shuffle before choosing the next card
    setCards(shuffleCards(cards));
  }

  
  return (
    <div className='container'>
      <header>
        <div>
          <h1>Memory Game</h1>
          <p>Get points by clicking on an image, but don't click on any more than once!</p>
        </div>

        <ScoresBoard currentScore={currentScore} bestScore={bestScore}/>
      </header>

      <main className='cards-grid'>
        {cards.map(card =>(
          <Card key={card.id} card={card} onClick={handleCardsClick}/>
        ))}
      </main>
    </div>
  )
}

export default App
