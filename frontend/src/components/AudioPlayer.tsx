"use client";

import CTABtn from "@/components/CTABtn";
import { Song } from "@/lib/remark/getContent";
import { useCallback, useRef, useState, useMemo } from "react";

interface Props {
  song: Song;
}

const AudioPlayer = ({ song }: Props) => {
  const [songPlaying, setSongPlaying] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onLoadedMetadata = useCallback(() => {
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

  const calculateProgress = useMemo(() => {
    if (audioRef.current) {
      const audio: HTMLAudioElement = audioRef.current;
      return audio.currentTime / audio.duration;
    } else {
      return 0;
    }
  }, [duration]);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      if (audio.currentTime >= audio.duration) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play();
      setSongPlaying(true);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setSongPlaying(false);
    }
  }, []);

  return (
    <div className="p-5 border border-gray-500 w-[385px] rounded-[16px] h-[250px] flex flex-col justify-between">
      <div className="flex">
        <CTABtn
          onClick={songPlaying ? pauseAudio : playAudio}
          extraClasses="flex-shrink-0 w-[100px] h-[100px] flex justify-center items-center rounded-[20px]"
        >
          {songPlaying ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6.66675H10.6667V25.3334H8V6.66675ZM21.3333 6.66675H24V25.3334H21.3333V6.66675Z"
                fill="#343A3A"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 26.9276V5.07228C8 4.02504 9.15193 3.38658 10.04 3.94162L27.5243 14.8693C28.3599 15.3915 28.3599 16.6084 27.5243 17.1307L10.04 28.0583C9.15193 28.6133 8 27.9749 8 26.9276Z"
                fill="#505151"
              />
            </svg>
          )}
        </CTABtn>
        <h3 className="pl-5">{song.title}</h3>
      </div>
      <div>
        <audio
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={() => onLoadedMetadata()}
          ref={audioRef}
        >
          <source src={song.song_preview} type="audio/mpeg" />
        </audio>
        <p className="text-center">
          <span className="text-left inline-block w-[50px]">{duration}</span>/
          <span
            className="text-right inline-block w-[50px]"
            onClick={pauseAudio}
          >
            {totalDuration}
          </span>
        </p>
        <div className="bg-dark-200 h-[5px] rounded-xl overflow-hidden my-6">
          <div
            className="bg-primary-100 text-white h-24 transition-transform origin-left"
            style={{ transform: `scaleX(${calculateProgress})` }}
          ></div>
        </div>
      </div>
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
