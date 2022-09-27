import React from 'react';
import { useState, useEffect } from 'react';

export default function Mode({ score, handleMode }) {

  return (
    <div className='box'>
      <div className='play-container game-over nes-container is-rounded is-centered is-dark'>
        <div className='destiny'>CHOOSE YOUR DESTINY</div>
        <div className='mode-btn'>
        <button className='nes-btn is-primary playbtn' value='0' onClick={handleMode}>NOOB</button>
        <button className='nes-btn is-success playbtn' value='1'onClick={handleMode}>RANDO</button>
        <button className='nes-btn is-error playbtn' value='2'onClick={handleMode}>UB3R RANDO</button>
        <button className='nes-btn is-error playbtn leet' value='3' onClick={handleMode}>1337 HAX0R</button>
        </div>
      </div>
    </div>
  )
}
