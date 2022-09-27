import React from 'react';
import { useState, useEffect } from 'react';

export default function GameOver({ score, handleLoad }) {



  return (
    <div className='box'>
      <div className='player-container game-over nes-container is-rounded is-centered is-dark'>
        <div>GAME OVER</div>
        <div>Your score is {score}</div>
        <button className='nes-btn is-primary restart-btn' onClick={handleLoad}>RESTART</button>
      </div>
      <div className='leaderboard'></div>
    </div>
  )
}
