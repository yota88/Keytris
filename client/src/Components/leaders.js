import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaders({ setLeaders, leaders }) {

  const [noobs, setNoobs] = useState({});
  const [randos, setRandos] = useState({});
  const [ubers, setUbers] = useState({});
  const [leets, setLeets] = useState({});
  const [gotData, setGotData] = useState(false);
  let noobList;
  let randoList;
  let uberList;
  let leetList;

  const handleLeaders = () => {
    setLeaders(!leaders);
    setGotData(!gotData);
  }

  useEffect(() => {
    axios
      .get('/scores')
      .then((results) => {
        setNoobs(results.data[0]);
        setRandos(results.data[1]);
        setUbers(results.data[2]);
        setLeets(results.data[3]);
        setGotData(!gotData);
      });
  }, []);

  if (noobs.length) {
    noobList = noobs.map((noob, i) => <div key={i}>{noob.name}: {noob.noob}</div>);
  }

  if (randos.length) {
    randoList = randos.map((rando, i) => <div key={i}>{rando.name}: {rando.rando}</div>);
  }

  if (ubers.length) {
    uberList = ubers.map((uber, i) => <div key={i}>{uber.name}: {uber.uber}</div>);
  }

  if (leets.length) {
    leetList = leets.map((leet, i) => <div key={i}>{leet.name}: {leet.leet}</div>);
  }

  return (
    <div className='box'>
      <div className='play-container nes-container is-rounded is-centered is-dark'>
        {/* <div className='destiny'>LEADERBOARD</div> */}
        {gotData
        ? <React.Fragment>

        <div className='leaderboard'>
          <div className='noob-board'>
            <h2 className='nes-text is-primary'>NOOBS</h2>
            {noobList}
          </div>
          <div className='rando-board'>
            <h2 className='nes-text is-success'>RANDOS</h2>
            {randoList}
          </div>
          <div className='uber-board'>
            <h2 className='nes-text is-error'>UBERS</h2>
            {uberList}
          </div>
          <div className='leet-board'>
            <h2 className='nes-text is-error'>LEETS</h2>
            {leetList}
          </div>
          </div>
          <div className='mode-btn'>
            <button className='nes-btn is-primary playbtn' value='0' onClick={handleLeaders}>RETURN</button>
          </div>
        </React.Fragment>
        : null
        }
      </div>
    </div>
  )
}
