import React from "react";
import TextComponent from "./Text";

interface TextWithTooltipsProps {
  sentence: string;
}

interface TooltipPattern {
  pattern: RegExp;
  component: React.ReactNode;
  type?: string;
}

// Define an array of tooltip patterns and their corresponding components
const tooltipPatterns: TooltipPattern[] = [
  {
    pattern: /~([^~]+)~/g,
    component: <span style={{ color: "blue" }}>$1</span>,
    type: "wrap",
  },
  {
    pattern: /________([^_]+)________/g,
    component: <u>$1</u>,
    type: "wrap",
  },
  {
    pattern: /\<\?\>/g,
    component: <input type="text" />,
    type: "single",
  },
  // Add more tooltip patterns and components as needed
];

const TextWithTooltips: React.FC<TextWithTooltipsProps> = ({ sentence }) => {
  // Replace the matching patterns with their corresponding components
  const replaceWithTooltipComponents = (text: string): React.ReactNode => {
    let replacedText: React.ReactNode[] = [text];

    tooltipPatterns.forEach(({ pattern, component, type }) => {
      replacedText = replacedText.reduce<React.ReactNode[]>((acc, segment) => {
        const tooltipSegments: React.ReactNode[] = [];

        if (typeof segment === "string") {
          if (type === "single") {
            segment.split(" ").forEach((word, index) => {
              if (pattern.test(word)) {
                if (React.isValidElement(component)) {
                  tooltipSegments.push(
                    React.cloneElement(component as React.ReactElement<any>, {
                      key: `${acc.length}_${index}`,
                    })
                  );
                }
              } else {
                tooltipSegments.push(` ${word} `);
              }
            });
            return [...acc, tooltipSegments];
          }

          const segments = segment.split(pattern);

          segments.forEach((segment, index) => {
            if (index % 2 === 0) {
              tooltipSegments.push(segment);
            } else if (component === <input type="text" />) {
              tooltipSegments.push(
                React.createElement(component.type, {
                  key: `${acc.length}_${index}`,
                  ...component.props,
                })
              );
            } else {
              tooltipSegments.push(
                typeof component === "string"
                  ? component.replace("$1", segment)
                  : React.cloneElement(
                      component as React.ReactElement<any>,
                      { key: `${acc.length}_${index}` },
                      segment
                    )
              );
            }
          });

          return [...acc, ...tooltipSegments];
        }

        return [...acc, segment];
      }, []);
    });

    return replacedText;
  };

  const replacedSentence = replaceWithTooltipComponents(sentence);
  return (
    <TextComponent
      fontSize="text-base"
      color="text-[#030036]"
      opacity="opacity-70"
      fontWeight="font-semibold"
      fontStyle="font-normal"
      lineHeight="leading-[21px]"
      width="w-[493px]"
      textAlign="text-start"
    >
      <>{replacedSentence}</>
    </TextComponent>
  );
};

export default TextWithTooltips;
