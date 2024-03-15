import React, { useState } from 'react';
import './App.css';

function App() {
  const [homeTeamName, setHomeTeamName] = useState('Home');
  const [awayTeamName, setAwayTeamName] = useState('Away');
  const [homeTeamScore, setHomeTeamScore] = useState(0);
  const [awayTeamScore, setAwayTeamScore] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const [isHomeTurn, setIsHomeTurn] = useState(true); // Variable für den aktuellen Wurfzustand
  const [winner, setWinner] = useState(null); // Variable für den Gewinner

  const throwBall = () => {
    const isHit = Math.random() < 0.5; // 50% chance of hitting
    const newLog = [{ event: isHit ? 'score' : 'miss', team: isHomeTurn ? homeTeamName : awayTeamName }, ...gameLog];

    if (isHit) {
      if (isHomeTurn) {
        const newScore = homeTeamScore + 3; // Punkte nach einem Treffer erhöhen
        setHomeTeamScore(newScore);
        if (newScore === 12) {
          endGame(homeTeamName);
          return;
        }
      } else {
        const newScore = awayTeamScore + 3; // Punkte nach einem Treffer erhöhen
        setAwayTeamScore(newScore);
        if (newScore === 12) {
          endGame(awayTeamName);
          return;
        }
      }
    }

    setGameLog(newLog);
    setIsHomeTurn(!isHomeTurn); // Wechsle den Wurfzustand
  };

  const endGame = () => {
    setWinner(isHomeTurn ? homeTeamName : awayTeamName); // Setze den Gewinner
    // Deaktiviere den Wurfbutton, um das Spiel zu beenden
    setIsHomeTurn(null);
  };

  const calculateProgress = (teamScore) => {
    return (teamScore / 12) * 100; // Prozentuale Fortschrittsberechnung
  };

  return (
    <div className="app">
      <div className="team home">
        <input
          type="text"
          value={homeTeamName}
          onChange={(e) => setHomeTeamName(e.target.value)}
          placeholder="Home Team Name"
        />
        <button onClick={throwBall} disabled={!isHomeTurn || awayTeamScore === 12}>Throw</button>
        <div className="score">{homeTeamScore}</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${calculateProgress(homeTeamScore)}%` }}></div>
        </div>
      </div>
      <div className="game-log">
        {gameLog.map((event, index) => (
          <p key={index} className={event.team === homeTeamName ? 'left' : 'right'}>
            {event.event === 'score' ? 'Scored!' : event.event === 'miss' ? 'Missed shot.' : `${homeTeamName} wins!` }
          </p>
        )).reverse()}
        {winner && <div className="winner-message" style={{ fontSize: '2.5rem', color: 'white', backgroundColor: '#66bb6a', padding: '20px', borderRadius: '10px', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {`${winner} wins!`}
        </div>}
      </div>
      <div className="team away">
        <input
          type="text"
          value={awayTeamName}
          onChange={(e) => setAwayTeamName(e.target.value)}
          placeholder="Away Team Name"
        />
        <button onClick={throwBall} disabled={isHomeTurn || homeTeamScore === 12}>Throw</button>
        <div className="score">{awayTeamScore}</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${calculateProgress(awayTeamScore)}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
