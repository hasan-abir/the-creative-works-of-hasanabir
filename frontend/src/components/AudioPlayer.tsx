"use client";

import CTABtn from "@/components/CTABtn";
import { Song } from "@/lib/remark/getContent";
import React, { useCallback, useRef, useState, useMemo } from "react";

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
      const progress = (audio.currentTime / audio.duration) * 100;

      if (progress >= 100) {
        setSongPlaying(false);
      }

      return progress;
    } else {
      return 0;
    }
  }, [duration]);

  const playAudio = useCallback((customTime?: number) => {
    if (audioRef.current) {
      const audio = audioRef.current;

      if (customTime && customTime <= audio.duration) {
        audioRef.current.currentTime = customTime;
      } else if (audio.currentTime >= audio.duration) {
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

  const playAudioFromPosition = useCallback((e: React.MouseEvent) => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const clientX = e.clientX ?? (e.nativeEvent && e.nativeEvent.clientX);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;

      const audioPosition = (audio.duration * percent) / 100;

      playAudio(audioPosition);
    }
  }, []);

  return (
    <div className="p-5 border border-gray-500 w-[385px] rounded-[16px] h-[250px] flex flex-col justify-between">
      <div className="flex">
        <CTABtn
          onClick={songPlaying ? pauseAudio : playAudio}
          extraClasses="flex-shrink-0 w-[100px] h-[100px] flex justify-center items-center rounded-[20px]"
        >
          {calculateProgress >= 100 ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66663 16.0001C2.66663 23.3638 8.63616 29.3334 16 29.3334C23.3637 29.3334 29.3333 23.3638 29.3333 16.0001C29.3333 8.63628 23.3637 2.66675 16 2.66675V5.33341C21.891 5.33341 26.6666 10.109 26.6666 16.0001C26.6666 21.8911 21.891 26.6667 16 26.6667C10.1089 26.6667 5.33329 21.8911 5.33329 16.0001C5.33329 12.3337 7.18308 9.09937 10.0003 7.17943L9.99996 10.6667H12.6666V2.66675H4.66663V5.33341L7.99887 5.33327C4.76096 7.76587 2.66663 11.6384 2.66663 16.0001Z"
                fill="#343A3A"
              />
            </svg>
          ) : songPlaying ? (
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
        <div
          className="bg-dark-200 h-[5px] rounded-2xl overflow-hidden my-6 cursor-pointer"
          onClick={playAudioFromPosition}
        >
          <div
            className="bg-primary-100 text-white h-24 transition-transform origin-left"
            style={{
              transform: `translateX(calc(-100% + ${calculateProgress}%))`,
            }}
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
