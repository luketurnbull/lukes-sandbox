"use client";

import { useMemo } from "react";
import Segment from "./Segment";
import { useWindowSize } from "@uidotdev/usehooks";

export type Skill = {
  id: string;
  name: string;
  icon?: string;
};

export default function SkillsCircle({ skills }: { skills: Skill[] }) {
  const { width, height } = useWindowSize();

  const smallestDimension = useMemo(() => {
    if (width && height) {
      return Math.min(width, height);
    }

    // Default to 200
    return 200;
  }, [width, height]);

  return (
    <div>
      <svg width={smallestDimension} height={smallestDimension}>
        <g
          transform={`translate(${smallestDimension / 2}, ${
            smallestDimension / 2
          })`}
        >
          <Segment startAngle={-Math.PI / 2} endAngle={Math.PI / 2} />
        </g>
      </svg>
    </div>
  );
}
