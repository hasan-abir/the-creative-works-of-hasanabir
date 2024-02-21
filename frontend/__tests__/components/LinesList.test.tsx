import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LinesList from "@/components/LinesList";

const slug = "abc";
const page = "1";
jest.mock("next/navigation", () => ({
  useParams() {
    return {
      slug,
      page,
    };
  },
}));

jest.doMock("../../src/components/ProgressBar", () => <div>ProgressBar</div>);
jest.doMock("../../src/components/LineAndPageNav", () => (
  <div>LineAndPageNav</div>
));

const richTextBody = [
  {
    style: "normal",
    _key: "2e18020b7564",
    markDefs: [],
    children: [
      {
        marks: ["strong"],
        text: "I",
        _key: "763c5b727a4d",
        _type: "span",
      },
    ],
    _type: "block",
  },
  {
    _type: "block",
    style: "normal",
    _key: "beaab87d050a",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "Sometime in a lap, the coming of a cold winter midnight brought about an impulse to unravel within a scrupulous heart. That of which belonged to Mazhar Haque, a man, brown-tanned, coarse-haired, slightly stout-cheeked, plump-mouthed, wide-nosed, eyes seldom closed, who believed his ears were in salvation by the power of music. A cobalt blue bike that he rode came with a broken bell, a yellow basket stuffed with music sheets, a down tube spray-painted with the word ",
        _key: "5cafbd45ed100",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "ZERO",
        _key: "5cafbd45ed101",
      },
      {
        marks: [],
        text: ", a neon green flashlight attached to it as headlights, bearings freshly greased, and seats for two. He pedaled into the fog of the weather stirred in with the gas of the manholes, condensing on his skin as he left the haze. A tune that amazed him, a long-time favorite of his, went by the name ",
        _key: "5cafbd45ed102",
        _type: "span",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "Where or When",
        _key: "5cafbd45ed103",
      },
      {
        _type: "span",
        marks: [],
        text: " by ",
        _key: "5cafbd45ed104",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "Johnny Smith",
        _key: "5cafbd45ed105",
      },
      {
        text: ". Uncalled, it played in his head. There wasn’t a reason to not be swaying. His rhythmically precise swinging of the bike to the instrumental kept him amused and undistracted. In his city, New York, he was content. A crowd walked in, and a crowd faded out, but never in one color. On wheels or on feet, a crumbling move was never made in a land that equated the need for climbing higher stories with the need for writing higher stories. Both men, one from the street and one sipping coffee from the 20th floor, knew what it took to swap their places. From every corner, there was only a way forward. With the minds wrapped in the present, time ceased to matter for the past. Just the right place, for him, at last. Across the grid, he and his bike journeyed through streets that were dark, abandoned, and lifeless, turning at every crossroad and running on loops every now and then. Several beliefs were lost with time, along with the belief that he was lost. Locked and empty were the offices, shops, and restaurants, and so were the",
        _key: "5cafbd45ed106",
        _type: "span",
        marks: [],
      },
    ],
  },
];

const renderLinesList = (
  firstPage: boolean,
  lastPage: boolean,
  body: any[] = richTextBody,
  basePath: string = "/test"
): { noOfLines: number; noOfItalics: number; noOfBolds: number } => {
  const { container } = render(
    <LinesList
      basePath={basePath}
      firstPage={firstPage}
      lastPage={lastPage}
      body={body}
    />
  );

  return {
    noOfLines: container.getElementsByTagName("p").length,
    noOfItalics: container.getElementsByTagName("em").length,
    noOfBolds: container.getElementsByTagName("strong").length,
  };
};

describe("LinesList", () => {
  it("renders with all the split lines correctly", () => {
    const firstPage = false;
    const lastPage = false;

    const { noOfLines, noOfItalics, noOfBolds } = renderLinesList(
      firstPage,
      lastPage
    );

    expect(noOfLines).toBe(19);
    expect(noOfItalics).toBe(3);
    expect(noOfBolds).toBe(1);
  });
});
