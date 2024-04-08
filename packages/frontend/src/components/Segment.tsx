import * as d3 from "d3";
import { useMemo, useRef, useState } from "react";
import React from "react";
import parse, { Element, domToReact } from "html-react-parser";

interface EnhancedSVGProps {
  svgString: string;
  className: string;
}

function EnhancedSVG({ svgString, className }: EnhancedSVGProps): JSX.Element {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element) {
        // Remove <title> tags entirely
        if (domNode.name === "title") {
          return <></>; // Return nothing for title, effectively removing it
        }

        // When encountering <path> elements, add the className
        if (domNode.name === "path") {
          const pathProps = domNode.attribs;
          return <path {...pathProps} className={className} />;
        }

        // Optionally, handle the <svg> tag to remove or alter attributes but include its children
        if (domNode.name === "svg") {
          // Keep the children of the svg but ignore the svg tag itself and any attributes
          // This effectively strips the <svg> and </svg> tags, but keeps everything inside
          return <>{domToReact(domNode.children, options)}</>;
        }
      }
    },
  };

  const content = parse(svgString, options);

  return <>{content}</>;
}

// Create props for segment that take in the outerRadius, innerRadius, startAngle and endAngle
export interface SegmentProps {
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  icon: string;
  index: number;
  currentSegmentHovered: number | null;
  //
  setCurrentSegmentHovered: (value: number | null) => void;
}

const INNER_RADIUS = 20;

export default function Segment({
  outerRadius,
  startAngle,
  endAngle,
  icon,
  index,
  currentSegmentHovered,
  //
  setCurrentSegmentHovered,
}: SegmentProps) {
  const pathRef = useRef<SVGCircleElement>(null);

  const isHovering = currentSegmentHovered === index;

  const arc = d3
    .arc()
    .innerRadius(INNER_RADIUS)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(0.03)
    .cornerRadius(5);

  const [centroidX, centroidY] = arc.centroid();

  // Calculate the angle to the centroid
  const angleToCentroid = Math.atan2(centroidY, centroidX);

  // Decide how much further out you want to move the icon. This can be adjusted.
  // The larger the value, the closer to the outer radius.
  const outwardDistance = 10;

  // Calculate the new position
  const adjustedX = centroidX + outwardDistance * Math.cos(angleToCentroid);
  const adjustedY = centroidY + outwardDistance * Math.sin(angleToCentroid);

  const iconSize = useMemo(() => {
    if (isHovering) {
      return 40;
    }
    return 30;
  }, [isHovering]);

  return (
    <g
      className="group"
      onMouseOver={() => setCurrentSegmentHovered(index)}
      onMouseOut={() => setCurrentSegmentHovered(null)}
      onTouchStart={() => setCurrentSegmentHovered(index)}
      onTouchEnd={() => setCurrentSegmentHovered(null)}
    >
      <path
        className="transition-all duration-300 cursor-pointer fill-blueBayoux stroke-pickledBluewood stroke-2 group-hover:fill-atomicTangerine"
        d={arc()}
        ref={pathRef}
      />
      <svg
        width={iconSize}
        height={iconSize}
        x={adjustedX - iconSize / 2}
        y={adjustedY - iconSize / 2}
        className="pointer-events-none"
        viewBox="0 0 24 24"
      >
        <EnhancedSVG
          svgString={icon}
          className="transition-all duration-300 fill-white"
        />
      </svg>
    </g>
  );
}
