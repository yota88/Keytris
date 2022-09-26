import React from 'react';
import { useState, useEffect } from 'react';
import BlockList from './helpers/BlockList.js';
import {
  blueBlock1,
  blueBlock2,
  redBlock1,
  redBlock2,
} from './helpers/Blocks.js';
import { easyString, hardString } from './helpers/RandomString.js';
import useInterval from './helpers/UseInterval.js';
import "nes.css/css/nes.min.css";



export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [blockList, setBlockList] = useState(null);
  const [blockHead, setBlockHead] = useState(null);
  const [blockCount, setBlockCount] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [start, setStart] = useState(false);
  const [delay, setDelay] = useState(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const handleLoad = () => {
    setLoaded(!loaded);
    setGameOver(false);
  }

  const handleRemove = () => {
    setBlockList((blockList) => {
      blockList.pop();
      return blockList;
    });
    setBlockHead(blockList[blockList.length - 1]);
    setBlockCount(blockCount => blockCount - 1);
  }

  useEffect(() => {
    if (window.innerWidth !== winWidth) {
      setWinWidth(window.innerWidth);
    }
  }, [winWidth]);

  useEffect(() => {
    if (loaded) {
      if (!blockList) {
        setBlockList([]);
      }
      setIsRunning(true);
      setDelay(2000);
    } else {
      setIsRunning(false);
    }
  }, [loaded]);

  useEffect(() => {
    if (blockCount === 5) {
      setBlockList(null);
      setBlockHead(null);
      setIsRunning(false);
      setStart(false);
      setDelay(undefined);
      setGameOver(true);
    }
  }, [blockCount])

  useInterval(() => {
    const newString = easyString(10);
    const currBlock = new blueBlock1(newString);

    setBlockHead(currBlock);
    setBlockCount(blockCount + 1);
    setTotalBlocks(totalBlocks + 1);
    setBlockList((blockList) => {
      return blockList.concat(currBlock);
    });

    if (!start) {
      setStart(true);
    }
    }, isRunning ? delay: null);



  if (!loaded) {
    return (
      <div className="App">
        <button className='nes-btn is-primary' onClick={handleLoad}>PLAY</button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="App">
      <div>GAME OVER</div>
      <button className='nes-btn is-primary' onClick={handleLoad}>Restart</button>
    </div>
    )
  }

  return (
    <div className="App">
      <div className="box">Counters Go Here</div>
      {start && blockHead
        ? <div>
          <div>{blockHead.string}</div>
          {blockList.map((b, i, blockList) => <div>{blockList[blockList.length - 1 - i].string}</div>)}
          <div>{blockCount}</div>
          </div>
        : <div>Initiating Game...</div>
      }
      <button className='nes-btn is-primary' onClick={handleLoad}>PAUSE</button>
      <button className='nes-btn is-primary' onClick={handleRemove}>REMOVE</button>
    </div>
  );
}
