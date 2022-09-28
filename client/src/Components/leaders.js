import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaders({ handleLeaders }) {

  const [noobs, setNoobs] = useState({});
  const [randos, setRandos] = useState({});
  const [ubers, setUbers] = useState({});
  const [leets, setLeets] = useState({});
  let noobList;
  let randoList;
  let uberList;
  let leetList;

  useEffect(() => {
    axios
      .get('/scores')
      .then((results) => {
        console.log(results.data);
        setNoobs(results.data[0]);
        setRandos(results.data[1]);
        setUbers(results.data[2]);
        setLeets(results.data[3]);
      });
  }, []);

  if (noobs.length) {
    noobList = noobs.map((noob, i) => <div key={i}>{noob.name}, {noob.noob}</div>);
  }

  if (randos.length) {
    randoList = randos.map((rando, i) => <div key={i}>{rando.name}</div>);
  }

  if (ubers.length) {
    uberList = ubers.map((uber, i) => <div key={i}>{uber.name}</div>);
  }

  if (leets.length) {
    leetList = ubers.map((leet, i) => <div key={i}>{leet.name}</div>);
  }

  return (
    <div className='box'>
      <div className='play-container nes-container is-rounded is-centered is-dark'>
        {/* <div className='destiny'>LEADERBOARD</div> */}
        <div className='leaderboard'>
        <div className='noob-board'>
          <div>NOOBS</div>
          {noobList}
        </div>
        <div className='rando-board'>
          <div>RANDOS</div>
          {randoList}
        </div>
        <div className='uber-board'>
          <div>UBERS</div>
          {uberList}
        </div>
        <div className='leet-board'>
          <div>NOOBS</div>
          {leetList}
        </div>
        </div>
        <div className='mode-btn'>
          <button className='nes-btn is-primary playbtn' value='0' onClick={handleLeaders}>RETURN</button>
        </div>
      </div>
    </div>
  )
}
