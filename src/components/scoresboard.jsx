import '../styles/scoresboard.css'
function ScoresBoard({currentScore, bestScore}){
    return (
        <div className="scoresboard">
            <div className="box">
                <h2> Current Score: <span>{currentScore}</span></h2>
            </div>

            <div className="box">
                <h2> Best Score: <span>{bestScore}</span></h2>
            </div>
        </div>
    );
}

export default ScoresBoard;