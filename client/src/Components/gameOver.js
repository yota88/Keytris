import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameOver({ score, name, whichMode, handleLoad }) {
  let bestScore;

  const modes = {
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
        if (parseInt(results.data[0][modes[whichMode]]) > score) {
          bestScore = parseInt(results.data[0][modes[whichMode]]);
        }
      })

  }, [])

  return (
    <div className='box'>
      <div className='player-container game-over nes-container is-rounded is-centered is-dark'>
        <h1 className='nes-text is-error'>GAME OVER</h1>
        {bestScore
          ? <div>{score} not as good as previous {bestScore}</div>
          : score
          ? <div>New high score {score}!</div>
          : <div>Did you even try?</div>
        }
        <button className='nes-btn is-primary restart-btn' onClick={handleLoad}>RESTART</button>
      </div>
      <div className='leaderboard'></div>
    </div>
  )
}
