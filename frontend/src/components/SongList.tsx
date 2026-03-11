import AudioPlayer from "@/components/AudioPlayer";
import Card from "@/components/Card";
import CardList from "@/components/CardList";
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
            <AudioPlayer song={song} />
          </Card>
        );
      })}
    </CardList>
  );
};

export default SongList;
