import splitBlockIntoLines from "@/utils/splitBlockIntoLines";

describe("splitBlockIntoLines: ", () => {
  let block = "";
  beforeEach(() => {
    block =
      "Lorem ipsum dolor. Etiam quis ullamcorper nunc! Nullam eleifend sollicitudin tortor? Sed sed mollis mi.";
  });

  it("separates by .?!", () => {
    const lines = splitBlockIntoLines(block);
    expect(lines.length).toBe(4);
    expect(lines[0]).toBe("Lorem ipsum dolor.");
    expect(lines[1]).toBe("Etiam quis ullamcorper nunc!");
    expect(lines[2]).toBe("Nullam eleifend sollicitudin tortor?");
    expect(lines[3]).toBe("Sed sed mollis mi.");
  });

  it("separates by .?! including the last line that doesn't end with a punctuation", () => {
    block = `${block} Sed sed mollis mi`;

    const lines = splitBlockIntoLines(block);

    expect(lines.length).toBe(5);
    expect(lines[0]).toBe("Lorem ipsum dolor.");
    expect(lines[1]).toBe("Etiam quis ullamcorper nunc!");
    expect(lines[2]).toBe("Nullam eleifend sollicitudin tortor?");
    expect(lines[3]).toBe("Sed sed mollis mi.");
    expect(lines[4]).toBe("Sed sed mollis mi");
  });

  it("separates by .?! excluding abbreviations", () => {
    block = `${block} Mr. Smith is flavorful. Is Mrs. Smith here?`;

    const lines = splitBlockIntoLines(block);

    expect(lines.length).toBe(6);
    expect(lines[0]).toBe("Lorem ipsum dolor.");
    expect(lines[1]).toBe("Etiam quis ullamcorper nunc!");
    expect(lines[2]).toBe("Nullam eleifend sollicitudin tortor?");
    expect(lines[3]).toBe("Sed sed mollis mi.");
    expect(lines[4]).toBe("Mr. Smith is flavorful.");
    expect(lines[5]).toBe("Is Mrs. Smith here?");
  });

  it("separates by square brackets and punctuation end quote", () => {
    block = `${block} [Are you "experienced"? Well, I am.] John [angrily]: Get back here! "What a day!" "What a henious day." "Is that so?" I'm gonna get you`;

    const lines = splitBlockIntoLines(block);

    expect(lines.length).toBe(11);
    expect(lines[0]).toBe("Lorem ipsum dolor.");
    expect(lines[1]).toBe("Etiam quis ullamcorper nunc!");
    expect(lines[2]).toBe("Nullam eleifend sollicitudin tortor?");
    expect(lines[3]).toBe("Sed sed mollis mi.");
    expect(lines[4]).toBe(`[Are you "experienced"?`);
    expect(lines[5]).toBe("Well, I am.]");
    expect(lines[6]).toBe("John [angrily]: Get back here!");
    expect(lines[7]).toBe(`"What a day!"`);
    expect(lines[8]).toBe(`"What a henious day."`);
    expect(lines[9]).toBe(`"Is that so?"`);
    expect(lines[10]).toBe("I'm gonna get you");
  });
});
