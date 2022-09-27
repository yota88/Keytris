import React from 'react';
import { useState, useEffect } from 'react';

export default function Board(props) {
  const {
    start,
    blockList,
    handleLoad,
    handleKeystroke,
    handleSubmit,
    blockCount,
    totalBlocks,
    paused,
    setPaused,
  } = props;

  const handlePause = () => {
    if (!paused) {
      setPaused(!paused);
    }
    handleLoad();
  }

  return (
    <div className='box'>
    <div className='play-container nes-container is-rounded is-dark is-centered'>
    {start && totalBlocks >= 1
      ? <div>
          <form id='answer' onSubmit={handleSubmit}>
            <input className='nes-input is-dark' autoFocus onChange={handleKeystroke}></input>
          </form>
          {blockList.map((b, i, blockList) => <div>{blockList[blockList.length - 1 - i].string}</div>)}
          <div>{blockCount}</div>
          <button className='nes-btn is-primary' onClick={handlePause}>PAUSE</button>
        </div>
      : <div>Initiating Game...</div>
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
