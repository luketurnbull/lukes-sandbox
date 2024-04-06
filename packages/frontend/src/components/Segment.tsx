import * as d3 from "d3";
import { useMemo, useState } from "react";

const segmentGenerator = d3.arc().innerRadius(0);

// Create props for segment that take in the outerRadius, innerRadius, startAngle and endAngle
export interface SegmentProps {
  startAngle: number;
  endAngle: number;
}

export default function Segment({ startAngle, endAngle }: SegmentProps) {
  const generatedSegment = useMemo(() => {
    return (
      segmentGenerator({
        outerRadius: 200,
        innerRadius: 0,
        startAngle,
        endAngle,
      }) || ""
    );
  }, [endAngle, startAngle]);

  const [colour, setColour] = useState("orange");

  return (
    <path
      d={generatedSegment}
      fill={colour}
      onMouseOver={() => setColour("red")}
      onMouseOut={() => setColour("orange")}
    />
  );
}
