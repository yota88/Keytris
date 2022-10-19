import React from 'react';

interface BoardProps {
  score: number;
  start: boolean;
  blockList: { color: string, blockSize: Number, string: string }[];
  blockHead: { string: string };
  handleLoad: () => void;
  handleKeystroke: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  blockCount: number;
  totalBlocks: number;
  paused: boolean;
  stop: any;
  setPaused: boolean;
}

export default function Board(props: BoardProps) {
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
              {blockList.map((b, i, blockList) => <div key={i}>{blockList[blockList.length - 1 - i].string}</div>)}
            </div>
          </div>
          <div className='player-container'>
            <div className='current-score nes-text is-warning'>SCORE: {score}</div>
            <div className='block-head'>{blockHead.string}</div>
            <form id='answer' onSubmit={handleSubmit}>
              <div className='input-field'>
                <input
                  className='nes-input is-dark'
                  autoFocus
                  onChange={handleKeystroke}
                  onKeyUp={(e) => {
                    if (e.key === 'Escape') {
                      handlePause();
                    }
                  }}/>
              </div>
            </form>
            <button className='nes-btn is-primary pause-btn' onClick={handlePause}>PAUSE</button>
          </div>
        </React.Fragment>
      : <div className='initiating'>Initiating Game...</div>
    }
    </div>
  </div>
  )
}
