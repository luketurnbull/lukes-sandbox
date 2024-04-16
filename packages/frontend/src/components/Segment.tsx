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
          isSvgRemoved={true}
        />
      </svg>
    </g>
  );
}
