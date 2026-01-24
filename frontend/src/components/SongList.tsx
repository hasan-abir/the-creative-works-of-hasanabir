// Disable SSR as AudioPlayer is a client only feature
import dynamic from "next/dynamic";
const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"), {
  ssr: false,
});
import Card from "@/components/Card";
import CardList from "@/components/CardList";
import CTABtn from "@/components/CTABtn";
import { getAllContentData, Song } from "@/lib/remark/getContent";

const SongList = async () => {
  const songs = await getAllContentData<Song>("music");
  songs.sort((a, b) => {
    const aDate = new Date(b.date_created).getTime();
    const bDate = new Date(a.date_created).getTime();

    return aDate - bDate;
  });

  return (
    <CardList heading="Music">
      {songs.map((song) => {
        return (
          <Card key={song.id}>
            <div className="p-5 border border-gray-500 w-[385px] rounded-[16px] h-[250px] flex flex-col justify-between">
              <div className="flex">
                <CTABtn extraClasses="flex-shrink-0 w-[100px] h-[100px] flex justify-center items-center rounded-[20px]">
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
                </CTABtn>
                <h3 className="pl-5">{song.title}</h3>
              </div>
              <AudioPlayer src={song.song_preview} />
            </div>
          </Card>
        );
      })}
    </CardList>
  );
};

export default SongList;
