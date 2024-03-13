"use client";

import splitBlockIntoLines from "@/utils/splitBlockIntoLines";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

interface Props {
  body: any[];
  classList?: string;
}

const CustomRichTextBody = ({ body, classList }: Props) => {
  const portableTextComponents: PortableTextComponents = useMemo(
    () => ({
      block: {
        normal: ({ children, value }) => {
          let lines: string[] = [];
          if (children) {
            let text = "";
            let i = 0;
            while (i < value.children.length) {
              const childBlock = value.children[i];
              if (
                childBlock.marks.length > 0 &&
                ["em", "strong"].includes(childBlock.marks[0])
              ) {
                text += `#${childBlock.marks[0] + childBlock.text}#${
                  childBlock.marks[0]
                }`;
              } else {
                text += childBlock.text;
              }

              if (i >= value.children.length - 1) {
                text = text.trimEnd();
              }
              i++;
            }
            lines = splitBlockIntoLines(text);
          }

          const renderedLines = lines.map((line, i) => {
            let spans: any[] = [];

            if (line.includes("#em") || line.includes("#strong")) {
              spans = line.split(/(#em.*?#em|#strong.*?#strong)/g);
              spans = spans.map((span, j) => {
                if (span.includes("#em")) {
                  span = span.replaceAll("#em", "");
                  return (
                    <em key={j} data-testid="italic">
                      {span}
                    </em>
                  );
                }
                if (span.includes("#strong")) {
                  span = span.replaceAll("#strong", "");
                  return (
                    <strong key={j} data-testid="bold">
                      {span}
                    </strong>
                  );
                }
                return span;
              });
            } else {
              spans.push(line);
            }

            return (
              <p
                key={i}
                className={classList ? classList : undefined}
                data-testid="paragraph"
              >
                {spans}
              </p>
            );
          });
          return renderedLines;
        },
      },
    }),
    [classList]
  );

  return <PortableText value={body} components={portableTextComponents} />;
};

export default CustomRichTextBody;
