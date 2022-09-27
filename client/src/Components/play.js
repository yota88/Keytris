import React from 'react';
import { useState, useEffect } from 'react';

export default function Play({ handleLoad, handleLeaders, paused, name, setName }) {

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePlay = (e) => {
    if (name.length >= 1) {
      handleLoad();
    }
  }

  return (
    <div className='box'>
      <div className='play-container nes-container is-centered is-dark is-rounded'>
        {!paused
          ? <React.Fragment>
              {/* <div className='instructions'>Intro goes here to explain gameplay</div> */}
              <form onSubmit={handlePlay}>
                <div className='nes-field enter-name'>
                  <h1>KEYTRIS</h1>
                  <label className='name-field'>Enter Your Name:</label>
                  <input
                    className='nes-input is-dark'
                    type='text'
                    autoFocus
                    onChange={handleName}
                    value={name}
                    />
                  <button className='nes-btn is-primary playbtn'>PLAY</button>
                </div>
                  <button className='nes-btn is-success playbtn' onClick={handleLeaders}>LEADERBOARD</button>
              </form>
            </React.Fragment>
          : <React.Fragment>
            <div className='pause-container'>
              <div className='initiating player-container'>Do not show weakness! Continue young Padawan!</div>
              <button className='nes-btn is-primary playbtn' onClick={handleLoad}>RESUME</button>
            </div>
            </React.Fragment>
        }
      </div>
    </div>
  )
}
