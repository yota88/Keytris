import React from 'react';
import { useState, useEffect } from 'react';

export default function Play({ handleLoad, paused, name, setName }) {

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
                  <label for='name_field' className='name-field'>Enter Your Name:</label>
                  <input className='nes-input is-dark' autoFocus onChange={handleName}></input>
                  <button className='nes-btn is-primary playbtn'>PLAY</button>
                </div>
              </form>
            </React.Fragment>
          : <React.Fragment>
              <div className='initiating'>Do not show weakness! Continue!</div>
              <button className='nes-btn is-primary playbtn' onClick={handleLoad}>RESUME</button>
            </React.Fragment>
        }
      </div>
    </div>
  )
}
