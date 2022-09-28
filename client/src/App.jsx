import React from 'react';
import { useState, useEffect } from 'react';
import GameOver from './Components/gameOver.js';
import Play from './Components/play.js';
import Board from './Components/board.js';
import Mode from './Components/mode.js';
import Leaders from './Components/leaders.js';
import {
  blueBlock1,
  blueBlock2,
  redBlock1,
  redBlock2,
} from './helpers/Blocks.js';
import { easyString, hardString, randomWords, randomMethods } from './helpers/RandomString.js';
import useInterval from './helpers/UseInterval.js';
import axios from 'axios';
import 'nes.css/css/nes.min.css';
import useSound from 'use-sound';
import gameMusic from './8bitMusic.mp3';
import correct from './success3.mp3';
import gameOverSound from './gameOverSound.mp3';

export default function App() {
  // Loading states
  const [name, setName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState(false);
  const [whichMode, setWhichMode] = useState(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaders, setLeaders] = useState(false);
  // User typing states
  const [keystroke, setKeystroke] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // String parameter states
  const [stringer, setStringer] = useState(() => [0, easyString]);
  const [stringLength, setStringLength] = useState(4);
  const [wordCount, setWordCount] = useState(1);
  const [wordIndex, setWordIndex] = useState([0, 25000]);
  const [fnIndex, setFnIndex] = useState(0);
  // Block states
  const [blockList, setBlockList] = useState(null);
  const [blockHead, setBlockHead] = useState({string: ''});
  const [blockCount, setBlockCount] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [stringInterval, setStringInterval] = useState(5);
  const [start, setStart] = useState(false);
  // Set interval parameter states
  const [delay, setDelay] = useState(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreBoard, setScoreBoard] = useState(null);
  // Sounds
  const [playCorrect] = useSound(correct);
  const [playGameOver] = useSound(gameOverSound);
  const [playMusic, { stop }] = useSound(gameMusic, { loop: true, volume: 0.5 });
  const [toggleSound, setToggleSound] = useState(true);
  // Window states
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const handleLoad = () => {
    setLoaded(!loaded);
    setMode(!mode);
    if (gameOver) {
      setScore(0);
      setMode(false);
      setWhichMode(null);
      setKeystroke('');
      setWordIndex([0, 25000]);
    }
    setGameOver(false);
  }

  const handleMode = (e) => {
    setMode(!mode);
    setWhichMode(e.target.value);
  }

  const handleLeaders = () => {
    setLeaders(!leaders);
  }

  const handleKeystroke = (e) => {
    setKeystroke(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keystroke === blockHead.string) {
      handleRemove();
      setScore(score + 1);
      if (toggleSound) {
        playCorrect();
      }
    }
    setSubmitted(!submitted);
  }

  const handleRemove = () => {
    if (blockList.length === 1) {
      setBlockHead({string: ''});
    } else if (blockList.length > 1) {
      setBlockHead(blockList[blockList.length - 2]);
    }
    setBlockList((blockList) => {
      blockList.pop();
      return blockList;
    });
    setBlockCount(blockCount => blockCount - 1);
  }

  const handleQuit = () => {
    setStart(false);
    setPaused(false);
    setDelay(undefined);
    setBlockList(null);
    setBlockHead(null);
    setIsRunning(false);
    setStringLength(4);
    setWordCount(1);
    setFnIndex(0);
    setTotalBlocks(0);
    setBlockCount(0);
    setStringer(() => easyString);
    setLoaded(false);
    setScore(0);
    setMode(false);
    setWhichMode(null);
    setKeystroke('');
    setWordIndex([0, 25000]);
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
    if (loaded && whichMode) {
      if (!blockList) {
        setBlockList([]);
      }
      setIsRunning(true);
      if (whichMode === '3') {
        setDelay(3000);
      } else {
        setDelay(2000);
      }
      if (toggleSound) {
        playMusic();
      }
    } else {
      setIsRunning(false);
      stop();
    }
  }, [loaded, whichMode]);

  // useEffect for changing game mechanics
  useEffect(() => {
    // Limit/max blocks accumulated before game over
    if (blockCount === 11) {
      setStart(false);
      setPaused(false);
      setGameOver(true);
      setDelay(undefined);
      setBlockList(null);
      setBlockHead(null);
      setIsRunning(false);
      setStringLength(4);
      setWordCount(1);
      setFnIndex(0);
      setTotalBlocks(0);
      setBlockCount(0);
      setStringer(() => easyString);
      stop();
      if (toggleSound) {
        playGameOver();
      }

      // Submit score to db
      (async () => { await axios.post('/scores', {
        name,
        score,
        mode: whichMode,
      })
      })();
    }
    // For mixed mode: Increment string length difficulty after every x number of blocks
    // First rotate through each type of string generator
    // Then iterate difficulty of each string
    // Finally iterate delay
    if (totalBlocks === stringInterval) {
      // NOOB mode
      if (whichMode === '0') {
        if (stringInterval > 1) {
          setWordIndex([wordIndex[0] + 25000, wordIndex[1] + 25000]);
        }
        if (wordIndex[0] === 150000) {
          setWordIndex([0, 25000]);
          setDelay(delay - 250);
        }
      }
      // RANDO modes
      else if (whichMode === '1' || whichMode === '2') {
        if (stringLength === 7) {
          if (delay > 400) {
            setDelay(delay - 300);
          }
          setStringLength(4);
        }
        if (stringLength < 7) {
          setStringLength(stringLength + 1);
        }
      }
      // 1337 HAX0R mode
      // else if (whichMode === '3') {

      // }
      // Set number of blocks before increasing difficulty level
        setStringInterval(stringInterval + 1);
      }
    }, [blockCount, totalBlocks])

  useInterval(async () => {
    let newString;
    // NOOB mode
    if (whichMode === '0') {
    newString = randomWords(wordIndex);
    }
    // RANDO mode
    if (whichMode === '1') {
      newString = easyString(stringLength);
    }
    // UB3R RANDO mode
    if (whichMode === '2') {
      if (stringLength <= 5) {
        newString = hardString(stringLength - 1);
      } else {
        newString = hardString(stringLength - 2);
      }
    }
    //1337 HAX0R mode
    if (whichMode === '3') {
      newString = randomMethods();
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
  }, isRunning ? delay : null, submitted, paused);

  // Go to leaderboard when leader button clicked
  if (leaders) {
    return <Leaders setLeaders={setLeaders} leaders={leaders}/>
  }

  // Go to main play page when game not loaded
  if (!loaded) {
    return <Play
      name={name}
      setName={setName}
      handleLoad={handleLoad}
      handleLeaders={handleLeaders}
      paused={paused}
      setPaused={setPaused}
      toggleSound={toggleSound}
      setToggleSound={setToggleSound}
      handleQuit={handleQuit}
      />
  }

  // Go to game mode page if game loaded
  if (mode) {
    return <Mode handleMode={handleMode}/>
  }
  // Go to game over page when player loses
  if (gameOver) {
    return <GameOver
      score={score}
      handleLoad={handleLoad}
      whichMode={whichMode}
      name={name}/>
  }

  return <Board
    score={score}
    blockList={blockList}
    blockHead={blockHead}
    handleSubmit={handleSubmit}
    handleKeystroke={handleKeystroke}
    handleLoad={handleLoad}
    start={start}
    totalBlocks={totalBlocks}
    blockCount={blockCount}
    paused={paused}
    stop={stop}
    setPaused={setPaused}
    />;
}