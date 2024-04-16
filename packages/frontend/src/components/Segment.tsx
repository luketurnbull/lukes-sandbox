import * as d3 from "d3";
import { useMemo, useRef } from "react";
import React from "react";
import EnhancedSVG from "./EnhancedSvg";

export type SegmentProps = {
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  icon: string;
  index: number;
  currentSegmentHovered: number | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentSegmentHovered: (value: number | null) => void;
};

const SEGMENT_COLOURS = [
  "fill-[#1C405F]",
  "fill-[#224D6F]",
  "fill-[#2F6182]",
  // "fill-[#33AADB]",
  // "fill-[#8ACCDB]",
  // "fill-[#BAF2F1]",
];

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

  const segmentAttributes = useMemo(() => {
    return {
      innerRadius: INNER_RADIUS,
      outerRadius,
      startAngle,
      endAngle,
      padAngle: 0.03,
      cornerRadius: 5,
    };
  }, [endAngle, outerRadius, startAngle]);

  const arc = d3
    .arc()
    .innerRadius(INNER_RADIUS)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(0.03)
    .cornerRadius(5);

  const [centroidX, centroidY] = arc.centroid(segmentAttributes);

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

  const colour = SEGMENT_COLOURS[index % SEGMENT_COLOURS.length];

  return (
    <g
      className="group"
      onMouseOver={() => setCurrentSegmentHovered(index)}
      onMouseOut={() => setCurrentSegmentHovered(null)}
      onTouchStart={() => setCurrentSegmentHovered(index)}
      onTouchEnd={() => setCurrentSegmentHovered(null)}
    >
      <path
        className={`transition-all duration-300 cursor-pointer ${colour} stroke-pickledBluewood stroke-2 group-hover:fill-atomicTangerine`}
        d={arc(segmentAttributes) || ""}
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
          isSvgRemoved={true}
        />
      </svg>
    </g>
  );
}
