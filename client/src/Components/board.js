import React from 'react';
import { useState, useEffect } from 'react';

export default function Board(props) {
  const {
    score,
    start,
    blockList,
    blockHead,
    handleLoad,
    handleKeystroke,
    handleSubmit,
    blockCount,
    totalBlocks,
    paused,
    stop,
    setPaused,
  } = props;

  const stackColor = {
    1: '',
    2: '',
    3: 'is-primary',
    4: 'is-primary',
    5: 'is-success',
    6: 'is-success',
    7: 'is-warning',
    8: 'is-warning',
    9: 'is-error',
    10: 'is-error',
  }

  const handlePause = () => {
    if (!paused) {
      setPaused(!paused);
      stop();
    }
    handleLoad();
  }

  return (
    <div className='box'>
    <div className='ingame-container nes-container is-rounded is-dark is-centered'>
    {start && totalBlocks >= 1
      ? <React.Fragment>
          <div className='list-container'>
            <div className={`stack-label nes-text ${stackColor[blockCount]}`}>STACK SIZE: {blockCount}</div>
            <div className='stack'>
              {blockList.map((b, i, blockList) => <div>{blockList[blockList.length - 1 - i].string}</div>)}
            </div>
          </div>
          <div className='player-container'>
            <div className='current-score'>SCORE: {score}</div>
            <div className='block-head'>{blockHead.string}</div>
            <form id='answer' onSubmit={handleSubmit}>
              <input className='nes-input is-dark' autoFocus onChange={handleKeystroke}></input>
            </form>
            <button className='nes-btn is-primary pause-btn' onClick={handlePause}>PAUSE</button>
          </div>
        </React.Fragment>
      : <div className='initiating'>Initiating Game...</div>
    }
    </div>
  </div>

    // <div className='box'>
    //   <div className='playbtn-container nes-container is-centered is-dark is-rounded'>
    //     {!paused
    //       : <React.Fragment>
    //           <div>Do not show weakness! Continue!</div>
    //           <button className='nes-btn is-primary playbtn' onClick={loader}>RESUME</button>
    //         </React.Fragment>
    //     }
    //   </div>
    // </div>
  )
}
