import React from 'react';
import useSound from 'use-sound';
import gameStart from '../gameStart.mp3';
import Spritesheet from 'react-responsive-spritesheet';
import yota88 from '../yota88_keytris_sprite.png';
import axios from 'axios';

interface PlayProps {
  handleLoad: () => void;
  handleLeaders: () => void;
  paused: boolean;
  name: string;
  setName: (name: string) => void;
  toggleSound: boolean;
  setToggleSound: (toggleSound: boolean) => void;
  handleQuit: () => void;
}

export default function Play(props: PlayProps) {
  const {
    handleLoad,
    handleLeaders,
    paused,
    name,
    setName,
    toggleSound,
    setToggleSound,
    handleQuit,
  } = props;

  const [playStart] = useSound(gameStart, { volume: 0.5 });

  const handleName = (e: React.FormEvent<HTMLInputElement>): void => {
    const targetName = e.target as HTMLInputElement;
    setName(targetName.value);
  }

  const handlePlay = (): void => {
    if (name.length >= 1 && name.length <=10) {
      handleLoad();
      axios.post('/interactions', { date: new Date(), name: name })
    }
    if (toggleSound) {
      playStart();
    }
  }

  const handleSound = (): void => {
    setToggleSound(!toggleSound);
  }

  const handleLinkedIn = () => {
    window.open('http://www.linkedin.com/in/yota88');
  }

  return (
    <div className='box'>
      <div className='play-container nes-container is-centered is-dark is-rounded'>
        {!paused
          ? <React.Fragment>
              <form onSubmit={handlePlay}>
                <div className='nes-field enter-name'>
                  <h2 className='keytris'>
                  <span className='title-container nes-text is-error'>K</span>
                  <span className='title-container nes-text is-warning'>E</span>
                  <span className='title-container nes-text is-success'>Y</span>
                  <span className='title-container nes-text is-primary'>T</span>
                  <span className='title-container letter-r'>R</span>
                  <span className='title-container letter-i'>I</span>
                  <span className='title-container letter-s'>S</span>
                  </h2>
                  <label className='name-field'>Enter Your Name:</label>
                  <div className='input-field'>
                  <input
                    className='nes-input is-dark'
                    type='text'
                    autoFocus
                    onChange={handleName}
                    value={name}
                    />
                    </div>
                  <button className='nes-btn is-primary playbtn'>PLAY</button>
                </div>
              </form>
                  <button className='nes-btn is-success playbtn' onClick={handleLeaders}>LEADERBOARD</button>
                  {toggleSound
                    ? <button className='nes-btn is-warning playbtn' onClick={handleSound}>SOUND: ON</button>
                    : <button className='nes-btn is-error playbtn' onClick={handleSound}>SOUND: OFF</button>
                  }
                  <div className='created-by'>CREATED BY:
                    <div className='created-by-container'>
                      <Spritesheet
                        image={yota88}
                        widthFrame={220}
                        heightFrame={40}
                        steps={12}
                        fps={4}
                        direction='forward'
                        loop={true}/>
                      <i className='nes-icon linkedin' onClick={handleLinkedIn}></i>
                    </div>
                  </div>
            </React.Fragment>
          : <React.Fragment>
            <div className='pause-container'>
              <div className='initiating player-container'>Do not show weakness! Continue young Padawan!</div>
              <button className='nes-btn is-primary playbtn' onClick={handleLoad}>RESUME</button>
              <button className='nes-btn is-error playbtn' onClick={handleQuit}>I QUITTER</button>
            </div>
            </React.Fragment>
        }
      </div>
    </div>
  )
}
