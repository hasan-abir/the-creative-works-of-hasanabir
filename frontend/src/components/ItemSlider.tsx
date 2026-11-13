import { Book, Painting, Song } from "@/lib/remark/getContent";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import EachItem from "@/components/EachItem";

interface Props {
  items: (Book | Painting | Song)[];
}

const ItemSlider = ({ items }: Props) => {
  return (
    <h1>
      <EachItem item={items[0]} />
    </h1>
  );
  // return (
  //   <Swiper spaceBetween={50} slidesPerView={3}>
  //     {items.map((item) => {
  //       return (
  //         <SwiperSlide key={item.path}>
  //           {/* <EachItem item={item} /> */}
  //         </SwiperSlide>
  //       );
  //     })}
  //   </Swiper>
  // );
};

export default ItemSlider;
