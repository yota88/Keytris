import React from 'react';
import { useState, useEffect } from 'react';
import GameOver from './Components/gameOver';
import Play from './Components/play';
import Board from './Components/board';
import Mode from './Components/mode';
import Leaders from './Components/leaders';
import { blueBlock1 } from './helpers/Blocks';
import { easyString, hardString, randomWords, randomMethods } from './helpers/RandomString';
import useInterval from './helpers/UseInterval';
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
  const [whichMode, setWhichMode] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaders, setLeaders] = useState(false);
  // User typing states
  const [keystroke, setKeystroke] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // String parameter states
  const [stringLength, setStringLength] = useState(4);
  const [wordIndex, setWordIndex] = useState([0, 25000]);
  // Block states
  const [blockList, setBlockList] = useState<{ color: string, blockSize: Number, string: string }[]>([]);
  const [blockHead, setBlockHead] = useState({string: ''});
  const [blockCount, setBlockCount] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(0);
  const [stringInterval, setStringInterval] = useState(5);
  const [start, setStart] = useState(false);
  // Set interval parameter states
  const [delay, setDelay] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  // Sounds
  const [playCorrect] = useSound(correct);
  const [playGameOver] = useSound(gameOverSound);
  const [playMusic, { stop }] = useSound(gameMusic, { loop: true, volume: 0.5 });
  const [toggleSound, setToggleSound] = useState(true);
  // Window states
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const handleLoad = (): void => {
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

  const handleMode = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    setMode(!mode);
    setWhichMode(target.value);
  }

  const handleLeaders = (): void => {
    setLeaders(!leaders);
  }

  const handleKeystroke = (e: React.FormEvent<HTMLInputElement>): void => {
    setKeystroke((e.currentTarget as HTMLInputElement).value);
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
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

  const handleRemove = (): void => {
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

  const handleQuit = (): void => {
    setStart(false);
    setPaused(false);
    setDelay(0);
    setBlockList([]);
    setBlockHead({string: ''});
    setIsRunning(false);
    setStringLength(4);
    setTotalBlocks(0);
    setBlockCount(0);
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
    const form = document.getElementById('answer') as HTMLFormElement;
    if (form) {
      form.reset();
      // form.reset();
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
        setDelay(3300);
      } else if (whichMode === '2') {
        setDelay(2500);
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
      setDelay(0);
      setBlockList([]);
      setBlockHead({string: ''});
      setIsRunning(false);
      setStringLength(4);
      setTotalBlocks(0);
      setBlockCount(0);
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
          if (delay > 1500) {
            setWordIndex([0, 25000]);
            setDelay(delay - 150);
          }
        }
      }
      // RANDO modes
      else if (whichMode === '1' || whichMode === '2') {
        if (stringLength === 7) {
          if (delay > 1500) {
            setDelay(delay - 150);
          }
          setStringLength(4);
        }
        else if (stringLength < 7) {
          setStringLength(stringLength + 1);
        }
      }
      // 1337 HAX0R mode
      else if (whichMode === '3') {
        if (delay > 2500) {
          setDelay(delay - 150);
        }
      }
      // Set number of blocks before increasing difficulty level
        setStringInterval(stringInterval + 5);
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
      return [...blockList, currBlock];
    });

    if (!start) {
      setStart(true);
    }
  }, isRunning ? delay : null, score, paused);

  // Go to leaderboard when leader button clicked
  if (leaders) {
    return <Leaders setLeaders={setLeaders} leaders={leaders}/>
  }

  // Go to main play page when game not loaded
  if (!loaded) {
    return (
      <Play
      name={name}
      setName={setName}
      handleLoad={handleLoad}
      handleLeaders={handleLeaders}
      paused={paused}
      toggleSound={toggleSound}
      setToggleSound={setToggleSound}
      handleQuit={handleQuit}
      />
    )
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