"use client";

import splitBlockIntoLines from "@/utils/splitBlockIntoLines";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Merriweather } from "next/font/google";
import { useMemo } from "react";

const merriweather = Merriweather({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

interface Props {
  body: any[];
  classList?: string;
}

const CustomRichTextBody = ({ body, classList }: Props) => {
  const portableTextComponents: PortableTextComponents = useMemo(
    () => ({
      block: {
        normal: ({ children, value }) => {
          let newBlocks: any[] = [];
          if (children) {
            let i = 0;
            while (i < value.children.length) {
              const childBlock = value.children[i];

              const splittedLines = splitBlockIntoLines(childBlock.text);
              let j = 0;
              while (j < splittedLines.length) {
                const currentLine = splittedLines[j];
                const lastBlockAdded = newBlocks[newBlocks.length - 1];
                const lastChildAddedToLastBlock =
                  lastBlockAdded &&
                  lastBlockAdded.children[lastBlockAdded.children.length - 1];
                const punctuationRegex = /[.!?")\]]$/;
                const closingBracketsRegex = /^\s*\]\s*$/;
                const newBlock = {
                  text: splittedLines[j],
                  marks: childBlock.marks,
                };

                if (
                  lastBlockAdded &&
                  (!punctuationRegex.test(lastChildAddedToLastBlock.text) ||
                    closingBracketsRegex.test(currentLine))
                ) {
                  newBlocks[newBlocks.length - 1].children.push(newBlock);
                } else {
                  newBlocks.push({ children: [newBlock] });
                }

                j++;
              }

              i++;
            }
          }

          return (
            <div className={merriweather.className}>
              {newBlocks.map((line: any, i: number) => {
                return (
                  <p
                    key={i}
                    data-testid="paragraph"
                    className={classList ? classList : undefined}
                  >
                    <span className="block">
                      {line.children.map((child: any, j: number) => {
                        if (child.marks.includes("em")) {
                          return (
                            <em key={j} data-testid="italic">
                              {child.text}
                            </em>
                          );
                        } else if (child.marks.includes("strong")) {
                          return (
                            <strong key={j} data-testid="bold">
                              {child.text}
                            </strong>
                          );
                        } else {
                          return child.text;
                        }
                      })}
                    </span>
                  </p>
                );
              })}
            </div>
          );
        },
      },
    }),
    [classList]
  );

  return <PortableText value={body} components={portableTextComponents} />;
};

export default CustomRichTextBody;
