import React, { MutableRefObject, useRef, useState } from 'react';

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
      {!isPlayDisabled && <button type="button" onClick={play}>Play</button>}
      {!isStopDisabled && <button type="button" onClick={stop}>Stop</button>}
    </>
  );
};

export default Audio;