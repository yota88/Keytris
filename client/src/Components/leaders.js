import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaders({ handleLeaders }) {

  const [noobs, setNoobs] = useState(null);
  const [randos, setRandos] = useState(null);
  const [ubers, setUbers] = useState(null);
  const [leets, setLeets] = useState(null);

  useEffect(() => {
    axios
      .get('/scores')
      .then((results) => {
        console.log(results);
      })
  })

  return (
    <div className='box'>
      <div className='play-container game-over nes-container is-rounded is-centered is-dark'>
        <div className='destiny'>LEADERBOARD</div>
        <div className='noob-board'></div>
        <div className='rando-board'></div>
        <div className='uber-board'></div>
        <div className='leet-board'></div>
        <div className='mode-btn'>
          <button className='nes-btn is-primary playbtn' value='0' onClick={handleLeaders}>RETURN</button>
        </div>
      </div>
    </div>
  )
}
