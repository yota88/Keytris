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
        console.log(parseInt(results.data[0][modes[whichMode]]), score);
        if (parseInt(results.data[0][modes[whichMode]]) > score) {
          bestScore = parseInt(results.data[0][modes[whichMode]]);
        }
      })

  }, [])

  return (
    <div className='box'>
      <div className='player-container game-over nes-container is-rounded is-centered is-dark'>
        <div>GAME OVER</div>
        {bestScore
          ? <div>{score} not as agood as previous {bestScore}</div>
          : <div>New high score {score}!</div>
        }
        <button className='nes-btn is-primary restart-btn' onClick={handleLoad}>RESTART</button>
      </div>
      <div className='leaderboard'></div>
    </div>
  )
}
