import React from 'react';
import { useState, useEffect } from 'react';

export default function GameOver({ score, handleLoad }) {



  return (
    <div className='box'>
      <div className='play-container game-over nes-container is-rounded is-centered is-dark'>
        <div>GAME OVER</div>
        <div>Your high score is {score}</div>
        <button className='nes-btn is-primary' onClick={handleLoad}>Restart</button>
      </div>
    </div>
  )
}
