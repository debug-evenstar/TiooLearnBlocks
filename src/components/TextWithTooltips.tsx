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
    component: <span className="font-semibold text-blue-700">$1</span>,
    type: "wrap",
  },
  {
    pattern: /________([^_]+)________/g,
    component: <u>$1</u>,
    type: "wrap",
  },
  {
    pattern: /\<\?\>/g,
    component: (
      <input
        type="text"
        className="h-[28px] rounded-[4px] px-2 border-[#4F46E5] py-2 w-full max-w-[100px] shadow-inner border-[1.5px] focus:outline-none focus:ring-[#4F46E5] focus:border-[#4F46E5] mx-1 "
      />
    ),
    type: "single",
  },
  {
    pattern: /\\n/g,
    component: <br />,
    type: "single",
  },
  {
    pattern: /<([^<>]+)>/g,
    component: (<span
        style={{ fontWeight: "bold", color: "#fff", backgroundColor: "green" }}
        className="px-2">
        $1
      </span>),
    type: "wrap",
  },
  {
    pattern: /`([^`]+)`/g,
    component: (
      <span
        style={{ fontWeight: "bold", backgroundColor: "yellow" }}
        className="px-2 "
      >
        $1
      </span>
    ),
    type: "wrap",
  },
  {
    pattern: /\*\*([^*]+)\*\*/g,
    component: <span style={{ fontWeight: "900" }}>$1</span>,
    type: "wrap",
  },
  {
    pattern: /##([^#]+)##/g,
    component: <i>$1</i>,
    type: "wrap",
  },
  {
    pattern: /\^([^\\^]+)\^/g,
    component: <sup>$1</sup>,
    type: "wrap",
  },
  {
    pattern: /_([^\\_]+)_/g,
    component: <sub>$1</sub>,
    type: "wrap",
  },
  // Add more tooltip patterns and compone   nts as needed
];


const TextWithTooltips: React.FC<TextWithTooltipsProps> = ({ sentence }) => {
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
            // return [...acc, tooltipSegments];
          
          }else{
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
          }
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
      fontWeight="font-medium"
      fontStyle="font-normal"
      lineHeight="leading-[21px]"
      width="w-[88%]"
      textAlign="text-start"
    >
      <>{replacedSentence}</>
    </TextComponent>
  );
};

export default TextWithTooltips;
