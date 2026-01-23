"use client";

import { useRef, useCallback, useState } from "react";

interface Props {
  src: string;
}

const AudioPlayer = ({ src }: Props) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef(null);

  const onLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      const audio: HTMLAudioElement = audioRef.current;
      setDuration(Math.ceil(audio.played.length));
      const totalDuration =
        audio.duration > 30
          ? Math.floor(audio.duration)
          : Math.ceil(audio.duration);
      setTotalDuration(totalDuration);
    }
  }, [audioRef.current]);

  return (
    <div>
      <audio
        // className="hidden"
        src={src}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        ref={audioRef}
      ></audio>
      <p className="text-center">
        {duration}/{totalDuration}
      </p>
    </div>
  );
};

export default AudioPlayer;
