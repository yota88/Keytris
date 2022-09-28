import React from 'react';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import gameStart from '../gameStart.mp3';
import Spritesheet from 'react-responsive-spritesheet';
import yota88 from '../yota88_keytris_sprite.png';

export default function Play(props) {
  const {
    handleLoad,
    handleLeaders,
    paused,
    name,
    setName,
    toggleSound,
    setToggleSound,
    handleQuit,
  } = props
  const [playStart, { stopStart }] = useSound(gameStart, { volume: 0.5 });

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePlay = (e) => {
    if (name.length >= 1) {
      handleLoad();
    }
    if (toggleSound) {
      playStart();
    }
  }

  const handleSound = () => {
    setToggleSound(!toggleSound);
  }


  return (
    <div className='box'>
      <div className='play-container nes-container is-centered is-dark is-rounded'>
        {!paused
          ? <React.Fragment>
              {/* <div className='instructions'>Intro goes here to explain gameplay</div> */}
              <form onSubmit={handlePlay}>
                <div className='nes-field enter-name'>
                  <h1>
                  <span className='title-container nes-text is-error'>K</span>
                  <span className='title-container nes-text is-warning'>E</span>
                  <span className='title-container nes-text is-success'>Y</span>
                  <span className='title-container nes-text is-primary'>T</span>
                  <span className='title-container letter-r'>R</span>
                  <span className='title-container letter-i'>I</span>
                  <span className='title-container letter-s'>S</span>
                  </h1>
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
              </form>
                  <button className='nes-btn is-success playbtn' onClick={handleLeaders}>LEADERBOARD</button>
                  {toggleSound
                    ? <button className='nes-btn is-warning playbtn' onClick={handleSound}>SOUND: ON</button>
                    : <button className='nes-btn is-error playbtn' onClick={handleSound}>SOUND: OFF</button>
                  }
                  <div className='created-by'>CREATED BY:
                    <Spritesheet
                    image={yota88}
                    widthFrame={220}
                    heightFrame={40}
                    steps={12}
                    fps={4}
                    direction='forward'
                    loop={true}/>
                  </div>
            </React.Fragment>
          : <React.Fragment>
            <div className='pause-container'>
              <div className='initiating player-container'>Do not show weakness! Continue young Padawan!</div>
              <button className='nes-btn is-primary playbtn' onClick={handleLoad}>RESUME</button>
              <button className='nes-btn is-primary playbtn' onClick={handleQuit}>I QUITTER</button>
            </div>
            </React.Fragment>
        }
      </div>
    </div>
  )
}
