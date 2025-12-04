export interface Content {
  title: string;
  thumbnailSrc: string;
  published_year: string;
  type: "story" | "poem" | "painting" | "song";
}

export const paintings: Content[] = [
  {
    title: "A Juggler's Left Spectrum",
    thumbnailSrc: "/ajugglersleftspectrum.jpg",
    published_year: "2025",
    type: "painting",
  },
  {
    title: "The Most Upsetting Memorial",
    thumbnailSrc: "/themostupsettingmemorial.jpg",
    published_year: "2025",
    type: "painting",
  },
  {
    title: "Sudden Divorce",
    thumbnailSrc: "/suddendivorce.jpg",
    published_year: "2025",
    type: "painting",
  },
];

export const songs: Content[] = [
  {
    title: "The Sweeping Period",
    thumbnailSrc: "/the-sweeping-period.mp3",
    published_year: "2025",
    type: "song",
  },
  {
    title: "Three Flies",
    thumbnailSrc: "/three-flies.mp3",
    published_year: "2025",
    type: "song",
  },
  {
    title: "A Proper Ride",
    thumbnailSrc: "/a-proper-ride.mp3",
    published_year: "2025",
    type: "song",
  },
  {
    title: "An Offer to a Barricade",
    thumbnailSrc: "/an-offer-to-a-barricade.mp3",
    published_year: "2025",
    type: "song",
  },
];
