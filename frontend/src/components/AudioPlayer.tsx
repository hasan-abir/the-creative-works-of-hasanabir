"use client";

import CTABtn from "@/components/CTABtn";
import { Song } from "@/lib/remark/getContent";
import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { icons } from "@/utils/icons/";
import Link from "next/link";

interface Props {
  song: Song;
}

const AudioPlayer = ({ song }: Props) => {
  const [songPlaying, setSongPlaying] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const [volControl, setVolControl] = useState<boolean>(false);
  const [volLvl, setVolLvl] = useState<number>(100);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      const audio: HTMLAudioElement = getAudioWithRoundedTime(audioRef.current);

      setCurrentTime(audio.currentTime);

      setDuration(convertSecondsIntoTime(audio.currentTime));
      setTotalDuration(convertSecondsIntoTime(audio.duration));
    }
  }, []);

  const calculateProgress = useMemo(() => {
    if (audioRef.current) {
      const audio: HTMLAudioElement = getAudioWithRoundedTime(audioRef.current);

      const progress = (currentTime / audio.duration) * 100;
      if (progress >= 100) {
        setSongPlaying(false);
        audioRef.current.pause();
      }

      return progress;
    } else {
      return 0;
    }
  }, [currentTime]);

  const playAudio = useCallback((customTime?: number) => {
    if (audioRef.current) {
      const audio = getAudioWithRoundedTime(audioRef.current);
      const currentDuration = audio.currentTime;
      const currentTotalDuration = audio.duration;

      if (customTime && Math.floor(customTime) <= audio.duration) {
        audioRef.current.currentTime = customTime;
      } else if (currentDuration >= currentTotalDuration) {
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

  const playAudioFromPosition = useCallback(
    (e: React.MouseEvent) => {
      if (audioRef.current) {
        const audio = getAudioWithRoundedTime(audioRef.current);

        const clientX = e.clientX ?? (e.nativeEvent && e.nativeEvent.clientX);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;

        const audioPosition = (audio.duration * percent) / 100;

        playAudio(audioPosition);
      }
    },
    [playAudio],
  );

  const changeVol = useCallback((e: React.MouseEvent) => {
    if (audioRef.current) {
      const clientX = e.clientX ?? (e.nativeEvent && e.nativeEvent.clientX);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;

      const volLvl = percent / 100;

      audioRef.current.volume = volLvl;

      setVolLvl(Math.round(percent / 10) * 10);
    }
  }, []);

  const muteUnmuteVol = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  const openVolControl = useCallback(() => {
    console.log(volControl);
    if (volControl) {
      muteUnmuteVol();
    } else {
      setVolControl(true);
    }
  }, [volControl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    // Reset playback and force reload of metadata
    audio.pause();
    audio.currentTime = 0;

    if (audio.src !== song.song_preview) audio.src = song.song_preview;

    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [song, onLoadedMetadata]); // re-run when src changes

  return (
    <>
      <div className="p-3 sm:p-5 border border-gray-300 w-[150px] sm:w-[385px] rounded-[16px] h-[250px] flex flex-col justify-between">
        <div className="flex items-center sm:items-start flex-col sm:flex-row">
          <CTABtn
            onClick={songPlaying ? pauseAudio : playAudio}
            extraClasses="flex-shrink-0 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] flex justify-center items-center"
            rounded="3xl"
          >
            {calculateProgress >= 100 ? (
              <icons.ResetIcon />
            ) : songPlaying ? (
              <icons.PauseIcon />
            ) : (
              <icons.PlayIcon />
            )}
          </CTABtn>
          {song.path ? (
            <Link href={`?highlight=${song.path}#highlights`}>
              <h3 className="pt-5 sm:pt-0 sm:pl-5 text-base leading-tight sm:text-2xl text-center sm:text-left">
                {song.title}
              </h3>
            </Link>
          ) : (
            <h3 className="pt-5 sm:pt-0 sm:pl-5 text-center sm:text-right">
              {song.title}
            </h3>
          )}
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
          <p className="text-center flex flex-col justify-center items-center sm:flex-row">
            <span className="text-xs sm:text-base sm:text-left inline-block w-[50px] sm:w-[60px]">
              {duration}
            </span>
            <span className="sm:inline-block hidden">/</span>
            <span
              className="text-xs sm:text-base sm:text-right inline-block w-[50px] sm:w-[60px]"
              onClick={pauseAudio}
            >
              {totalDuration}
            </span>
          </p>
          <div
            className="bg-dark-200 h-[5px] overflow-hidden my-6 cursor-pointer rounded-3xl"
            onClick={playAudioFromPosition}
          >
            <div
              className="bg-primary-100 h-24 transition-transform origin-left"
              style={{
                transform: `translateX(calc(-100% + ${calculateProgress}%))`,
              }}
            ></div>
          </div>
          <div className="flex justify-center items-center relative">
            <button
              className="w-3 sm:w-4"
              onClick={() =>
                audioRef &&
                audioRef.current &&
                playAudio(audioRef.current.currentTime - 5)
              }
            >
              <icons.RewindIcon />
            </button>
            <button className="mx-3 sm:mx-5">
              <span
                onClick={() => openVolControl()}
                className={`h-3 sm:h-4 block${volControl ? " z-50 sticky" : ""}`}
              >
                {audioRef.current?.muted ? (
                  <icons.VolMuteIcon />
                ) : (
                  <icons.VolIcon />
                )}
              </span>

              {volControl ? (
                <div className="absolute top-[-250%] sm:top-[-200%] left-[50%] translate-x-[-50%] shadow-xl w-[100px] sm:w-[220px] bg-white rounded-3xl p-2 z-50">
                  <div
                    className="bg-dark-200 h-[8px] overflow-hidden cursor-pointer rounded-3xl"
                    onClick={changeVol}
                  >
                    <div
                      className="bg-primary-100 h-24 transition-transform origin-left"
                      style={{
                        transform: `translateX(calc(-100% + ${volLvl}%))`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
            </button>
            <button
              className="w-3 sm:w-4"
              onClick={() =>
                audioRef &&
                audioRef.current &&
                playAudio(audioRef.current.currentTime + 5)
              }
            >
              <icons.ForwardIcon />
            </button>
          </div>
        </div>
      </div>
      {volControl ? (
        <div
          className="fixed top-0 left-0 w-full h-screen z-40"
          onClick={() => setVolControl(false)}
        ></div>
      ) : null}
    </>
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

const getAudioWithRoundedTime = (audio: HTMLAudioElement) => {
  const newAudio = { ...audio };
  newAudio.currentTime = Math.floor(audio.currentTime);
  newAudio.duration = Math.floor(audio.duration);

  return newAudio;
};

export default AudioPlayer;
