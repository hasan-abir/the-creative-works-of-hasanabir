const splitBlockIntoLines = (block: string): string[] => {
  return (
    block.match(
      /^(?=[.?!")\]])(?:[.?!")\]](?=\s|$))+|(?<!\S).+?(?:(?<!Mr|Mrs)[.?!][")\]]?(?=\s|$)|$)/g
    ) || []
  );
};

export default splitBlockIntoLines;
