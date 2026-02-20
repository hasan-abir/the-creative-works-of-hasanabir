import CardList from "@/components/CardList";
import Card from "@/components/Card";
import ImgEl from "@/components/ImgEl";
import { getAllContentData, Painting } from "@/lib/remark/getContent";

const PaintingList = async () => {
  let paintings = await getAllContentData<Painting>("paintings");
  paintings.sort((a, b) => {
    const aDate = new Date(b.date_created).getTime();
    const bDate = new Date(a.date_created).getTime();

    return aDate - bDate;
  });

  return (
    <CardList heading="Paintings">
      {paintings.map((painting) => {
        return (
          <Card key={painting.id}>
            <ImgEl
              src={painting.thumbnail}
              alt={painting.title}
              href={`?highlight=${painting.path}`}
            />
          </Card>
        );
      })}
    </CardList>
  );
};

export default PaintingList;
