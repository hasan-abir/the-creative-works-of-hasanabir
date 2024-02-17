const splitBlockIntoLines = (block: string): string[] => {
  return block.match(/(?<!\S)(?:Mr\.|Mrs\.|[^.?!])*(?:[.?!](?=\s|$)|$)/g) || [];
};

export default splitBlockIntoLines;
