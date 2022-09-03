import React, { MutableRefObject, useRef, useState } from 'react';

import PlaySVG from '../../assets/img/icons/play.svg';
import PauseSVG from '../../assets/img/icons/pause.svg';
import styles from './styles.module.scss';

interface AudioProps {
  buffer: AudioBuffer | null,
  context: AudioContext | null
}

const Audio = ({ buffer, context }: AudioProps) => {
  const [isPlayDisabled, setIsPlayDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);

  const sourceNodeRef = useRef() as MutableRefObject<AudioBufferSourceNode | null>;
  const play = () => {
    sourceNodeRef.current = (buffer && context) ? context.createBufferSource() : null;
    if (sourceNodeRef.current) {
      setIsPlayDisabled(true);
      setIsStopDisabled(false);
      sourceNodeRef.current.connect((context as AudioContext).destination);
      sourceNodeRef.current.buffer = buffer;
      sourceNodeRef.current.start();
      sourceNodeRef.current.onended = () => {
        if (sourceNodeRef.current) {
          stop();
        }
      };
    }
  };

  const stop = () => {
    if (sourceNodeRef.current) {
      setIsPlayDisabled(false);
      setIsStopDisabled(true);
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current.stop(0);
      sourceNodeRef.current = null;
    }
  };

  return (
    <>
      {!isPlayDisabled && <button type="button" className={`${styles['btn']} ${styles['btn_play']}`} onClick={play}>
        <img src={PlaySVG} alt="play"/>
        </button>}
      {!isStopDisabled && <button type="button" className={`${styles['btn']} ${styles['btn_pause']}`} onClick={stop}>
        <img src={PauseSVG} alt="pause"/>
        </button>}
    </>
  );
};

export default Audio;