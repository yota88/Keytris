import React from 'react';
import { useState, useEffect } from 'react';
import GameOver from './Components/gameOver.js';
import Play from './Components/play.js';
import Board from './Components/board.js';
import {
  blueBlock1,
  blueBlock2,
  redBlock1,
  redBlock2,
} from './helpers/Blocks.js';
import { easyString, hardString } from './helpers/RandomString.js';
import useInterval from './helpers/UseInterval.js';
import axios from 'axios';
import randomWords from 'random-words';
import 'nes.css/css/nes.min.css';

export default function App() {
  // Loading states
  const [name, setName] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  // User typing states
  const [keystroke, setKeystroke] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // String parameter states
  const [stringer, setStringer] = useState(() => easyString);
  const [stringLength, setStringLength] = useState(4);
  const [wordCount, setWordCount] = useState(1);
  const [fnIndex, setFnIndex] = useState(0);
  // Block states
  const [blockList, setBlockList] = useState(null);
  const [blockHead, setBlockHead] = useState(null);
  const [blockCount, setBlockCount] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [stringInterval, setStringInterval] = useState(5);
  const [start, setStart] = useState(false);
  // Set interval parameter states
  const [delay, setDelay] = useState(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  // Window states
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  // String functions
  const fns = [easyString, hardString, randomWords];

  const handleLoad = () => {
    setLoaded(!loaded);
    if (gameOver) {
      setScore(0);
    }
    setGameOver(false);
  }

  const handleKeystroke = (e) => {
    setKeystroke(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keystroke === blockHead.string) {
      handleRemove();
      setScore(score + 1);
    }
    setSubmitted(!submitted);
  }

  const handleRemove = () => {
    if (blockList.length === 1) {
      setBlockHead(null);
    } else if (blockList.length > 1) {
      setBlockHead(blockList[blockList.length - 2]);
    }
    setBlockList((blockList) => {
      blockList.pop();
      return blockList;
    });
    setBlockCount(blockCount => blockCount - 1);
  }

  // useEffect for DOM appearance
  useEffect(() => {
    if (window.innerWidth !== winWidth) {
      setWinWidth(window.innerWidth);
    }
  }, [winWidth]);

  useEffect(() => {
    const form = document.getElementById('answer');
    if (form) {
      form.reset();
    }
  }, [submitted]);

  // useEffect for starting and stopping Interval
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

  // useEffect for changing game mechanics
  useEffect(() => {
    // Max blocks accumulated before game over
    if (blockCount === 5) {
      setBlockList(null);
      setBlockHead(null);
      setIsRunning(false);
      setStart(false);
      setDelay(undefined);
      setGameOver(true);
      setStringLength(4);
      setWordCount(1);
      setFnIndex(0);
      setTotalBlocks(0);
      setBlockCount(0);
      setStringer(() => easyString);
    }
    // Increment string length difficulty after every x number of blocks
    // First rotate through each type of string generator
    // Then iterate difficulty of each string
    // Finally iterate delay
    if (totalBlocks === stringInterval) {
      if (fnIndex !== 2) {
        setFnIndex(fnIndex + 1);
      } else {
        if (stringLength === 7 && wordCount === 2) {
          if (delay > 400) {
            setDelay(delay - 300);
          }
        }
        if (stringLength < 6) {
          setStringLength(stringLength + 1);
        } else {
          setStringLength(4);
        }
        if (wordCount === 1) {
          setWordCount(wordCount + 1);
        } else {
          setWordCount(1);
        }
        setFnIndex(0);
      }
      setStringInterval(stringInterval + 3);
    }
  }, [blockCount, totalBlocks])

  useInterval(async () => {
    let newString;
    if (fnIndex === 0) {
      newString = randomWords({exactly: 1, wordsPerString: wordCount})[0];
    }
    if (fnIndex === 1) {
      newString = easyString(stringLength);
    }
    if (fnIndex === 2) {
      if (stringLength <= 5) {
        newString = hardString(stringLength - 1);
      } else {
        newString = hardString(stringLength - 2);
      }
    }
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
  }, isRunning ? delay : null);


  if (!loaded) {
    return <Play
      name={name}
      setName={setName}
      handleLoad={handleLoad}
      paused={paused}
      setPaused={setPaused}/>
  }

  if (gameOver) {
    return <GameOver score={score} handleLoad={handleLoad}/>
  }

  return <Board
    blockList={blockList}
    handleSubmit={handleSubmit}
    handleKeystroke={handleKeystroke}
    handleLoad={handleLoad}
    start={start}
    totalBlocks={totalBlocks}
    blockCount={blockCount}
    paused={paused}
    setPaused={setPaused}
    />;
}

// This is for calling WordsAPI if necessary for truly random word
// const wordQuery = await axios
//   .get('/word')
//   .then((results) => {
//     newString = results.data;
//     console.log('newString results', newString);
//   });