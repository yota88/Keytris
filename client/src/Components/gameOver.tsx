import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface OverProps {
  score: number;
  name: string;
  whichMode: string | null;
  handleLoad: () => void;
}

export default function GameOver({ score, name, whichMode, handleLoad }: OverProps) {
  const [best, setBest] = useState<number | null>(null);

  interface GameModes {
    [key: string]: string;
  }

  const modes: GameModes = {
    '0': 'noob',
    '1': 'rando',
    '2': 'uber',
    '3': 'leet',
  }

  useEffect(() => {
    axios
      .get('/score/single', {
        params: {
          name,
          mode: whichMode,
        }
      })
      .then((results) => {
        if (whichMode) {
          if (parseInt(results.data[0][modes[whichMode]]) > score) {
            const bestScore = parseInt(results.data[0][modes[whichMode]]);
            setBest(bestScore);
          }
        }
      })

  }, [])

  return (
    <div className='box'>
      <div className='player-container game-over nes-container is-rounded is-centered is-dark'>
        <h1 className='nes-text is-error'>GAME OVER</h1>
        {best
          ? <div>{score} not as good as previous best: {best}</div>
          : score
          ? <div>High score {score}!</div>
          : <div>Try again?</div>
        }
        <button className='nes-btn is-primary restart-btn' onClick={handleLoad}>RESTART</button>
      </div>
      <div className='leaderboard'></div>
    </div>
  )
}
