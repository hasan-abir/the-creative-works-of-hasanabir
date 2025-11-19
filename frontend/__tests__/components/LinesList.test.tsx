import LinesList from "@/components/LinesList";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

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
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const richTextBody = [
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "[",
        _key: "a1e84e10c31e0",
      },
      {
        marks: ["strong"],
        text: "Absently,",
        _key: "a1e84e10c31e1",
        _type: "span",
      },
      {
        _type: "span",
        marks: [],
        text: " MAZHAR",
        _key: "a1e84e10c31e2",
      },
      {
        _key: "a1e84e10c31e3",
        _type: "span",
        marks: ["em"],
        text: " carried his fumbling legs from the bed to the bathroom. Upon entering, on the floor, a few loose strands of long, wavy hair came to his attention, floating on puddles of water, slowly being drained out.",
      },
      {
        _type: "span",
        marks: [],
        text: "]",
        _key: "a1e84e10c31e4",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "54feb5eee7e1",
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "MAZHAR [",
        _key: "c7950e1fa2080",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "to himself",
        _key: "c7950e1fa2081",
      },
      {
        _type: "span",
        marks: [],
        text: "]: Odd. She never wakes up this early on a weekend, let alone take a shower. Well, whatever. Try not to bother her with that.",
        _key: "c7950e1fa2082",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "78f3ce438178",
    markDefs: [],
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "[",
        _key: "cdcdd6e3cd3b0",
      },
      {
        _key: "cdcdd6e3cd3b1",
        _type: "span",
        marks: ["em"],
        text: "Carrying on, he brushed his teeth. But the brush in his mouth stayed still in one place indefinitely as a series of circling thoughts clouded his mind. Falling back to a previously proven practice, he adjusted the circulation in his head to bring in a tune, freshly heard, that would help drown out those thoughts. And the magic worked once again; the song then refused to leave. Then, the faucet caught the drips of his wet, heavy head as he lifted his face towards the mirror. A long stare, eye to eye, shifted the world around him, which was brought to place quick and jarringly as soon as his under-eye depressions came to view, faltering his self-perception. Also in the mirror, with the bathroom door open, his wife appeared, ",
      },
      {
        _type: "span",
        marks: [],
        text: "TISHA ONWAYEE, ",
        _key: "cdcdd6e3cd3b2",
      },
      {
        _key: "cdcdd6e3cd3b3",
        _type: "span",
        marks: ["em"],
        text: "dressed in an archaic, adventurous black tunic. A sturdy leather belt with a symbol of a tree embedded in the center girdled her small waist. To fit with the rest, olive gray leggings are what she made to be the best. She entered the room with an evident rush and flew across the frame of ",
      },
      {
        text: "MAZHAR",
        _key: "cdcdd6e3cd3b4",
        _type: "span",
        marks: [],
      },
      {
        text: "’s mirror to stand in front of her own one. The fluorescent light above brightened her light-honey-toned face, shadowing her jaws under her cheekbones while she put on her mascara. Not long after, their eyes exchanged looks through the mirrors, sprouting gleeful smiles on each of their faces. First, he grabbed a towel and dried himself. Second, he threw it on the bed. Third, moving closer to her and wrapping his arms around her waist from the back, he brought his mouth close to her ears.",
        _key: "cdcdd6e3cd3b5",
        _type: "span",
        marks: ["em"],
      },
      {
        marks: [],
        text: "]",
        _key: "cdcdd6e3cd3b6",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "b50b10bed380",
    markDefs: [],
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "MAZHAR [",
        _key: "b899933585640",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "in the poorest accent, whispering",
        _key: "b899933585641",
      },
      {
        _type: "span",
        marks: [],
        text: "]: Buongiorno principessa! [",
        _key: "b899933585642",
      },
      {
        text: "He finished with a peck on one of her cheeks.",
        _key: "b899933585643",
        _type: "span",
        marks: ["em"],
      },
      {
        marks: [],
        text: "]",
        _key: "b899933585644",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "76831e96a811",
  },
  {
    _key: "17177f42a2e4",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "[",
        _key: "8d840b0c247b0",
      },
      {
        text: "And she returned double the kisses.",
        _key: "8d840b0c247b1",
        _type: "span",
        marks: ["em"],
      },
      {
        marks: [],
        text: "]",
        _key: "8d840b0c247b2",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
  },
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "TISHA: Thank you for the big words, kind sir, but I’m naturally overwhelmed. [",
        _key: "6edea975badd0",
      },
      {
        _type: "span",
        marks: ["em"],
        text: "She chuckled.",
        _key: "6edea975badd1",
      },
      {
        text: "] Now let me finish this mascara quickly. [",
        _key: "6edea975badd2",
        _type: "span",
        marks: [],
      },
      {
        _type: "span",
        marks: ["em"],
        text: "Tenderly, she freed herself from his embrace.",
        _key: "6edea975badd3",
      },
      {
        _type: "span",
        marks: [],
        text: "]",
        _key: "6edea975badd4",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "faa6c71d31a9",
    markDefs: [],
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
    expect(noOfLines).toBe(28);
    expect(noOfItalics).toBe(25);
    expect(noOfBolds).toBe(1);
  });
});
