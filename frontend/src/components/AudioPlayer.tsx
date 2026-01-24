"use client";

import { useRef, useCallback, useState } from "react";

interface Props {
  src: string;
}

const AudioPlayer = ({ src }: Props) => {
  const [totalDuration, setTotalDuration] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onLoadedMetadata = useCallback(() => {
    console.log(audioRef.current);
    if (audioRef.current) {
      const audio: HTMLAudioElement = audioRef.current;
      setDuration(convertSecondsIntoTime(Math.floor(audio.currentTime)));

      const totalDuration =
        audio.duration > 30
          ? Math.floor(audio.duration)
          : Math.ceil(audio.duration);
      setTotalDuration(convertSecondsIntoTime(totalDuration));
    }
  }, [audioRef.current]);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div>
      <audio
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={() => onLoadedMetadata()}
        ref={audioRef}
      >
        <source src={src} type="audio/mpeg" />
      </audio>
      <p className="text-center" onClick={playAudio}>
        {duration}/{totalDuration}
      </p>
    </div>
  );
};

const convertSecondsIntoTime = (seconds: number): string => {
  let minutes = Math.floor(seconds / 60).toString();
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  let cnvSeconds = seconds.toString();
  if (cnvSeconds.length < 2) {
    cnvSeconds = `0${cnvSeconds}`;
  }

  return `${minutes}:${cnvSeconds}`;
};

export default AudioPlayer;
