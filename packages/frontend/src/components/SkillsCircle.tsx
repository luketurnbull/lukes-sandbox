"use client";

import { useCallback, useMemo, useState } from "react";
import Segment from "./Segment";
import { useWindowSize } from "@uidotdev/usehooks";

export type Skill = {
  id: string;
  name: string;
  yearsOfExperience: number;
  icon: string;
};

export type SkillsCircleProps = {
  skills: Skill[];
};

/**
 * Generates skill segments for a skills circle based on the provided skills
 *
 * @param {Skill[]} skills - array of skills
 * @return {JSX.Element} a SVG component representing the skills circle
 */
export default function SkillsCircle({
  skills,
}: SkillsCircleProps): JSX.Element {
  const { width, height } = useWindowSize();
  const [currentSegmentHovered, setCurrentSegmentHovered] = useState<
    number | null
  >(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleDelayedHover = (value: number | null) => {
    // Clear any existing timeout to ensure we don't have multiple timeouts running
    if (timeoutId) clearTimeout(timeoutId);

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      setCurrentSegmentHovered(value);
    }, 30); // Delay of 2000 milliseconds (2 seconds)

    setTimeoutId(newTimeoutId);
  };

  // Calculate the circle size based on the window size
  const circleSize = useMemo(() => {
    if (width && height) {
      return Math.min(width, height);
    }

    return 0;
  }, [width, height]);

  // Calculate the segment size based on the equal portions of skills
  const segmentSize = useMemo(() => {
    const amountOfSkills = skills.length;
    return (Math.PI * 2) / amountOfSkills;
  }, [skills]);

  const yearsOfExperiences = useMemo(
    () => skills.map((skill) => skill.yearsOfExperience),
    [skills]
  );

  // Get the largest amount of years
  const maxYears = useMemo(
    () => Math.max(...yearsOfExperiences),
    [yearsOfExperiences]
  );

  const minYears = useMemo(
    () => Math.min(...yearsOfExperiences),
    [yearsOfExperiences]
  );

  // This multiplier is used to calculate the outer radius of the segments
  const radiusMultiplier = useCallback(
    (value: number, index: number) => {
      const isHoveringASegment = currentSegmentHovered !== null;
      const isHoveringCurrentSegment = currentSegmentHovered === index;

      const currentValue = () => {
        if (isHoveringCurrentSegment) {
          return maxYears;
        }

        if (isHoveringASegment) {
          return minYears;
        }

        return value;
      };

      // Normalize the value to a 0-1 range
      const normalized = (currentValue() - minYears) / (maxYears - minYears);

      // Apply an exponential function, you can adjust the base as needed
      // This example uses a simple square root function for a slight exponential effect
      const exponential = Math.sqrt(normalized);

      const minRadius = circleSize / 8;
      const maxRadius = circleSize / 4;

      // Scale up to the desired range of radii
      const radius = minRadius + (maxRadius - minRadius) * exponential;

      return radius;
    },
    [minYears, maxYears, circleSize, currentSegmentHovered]
  );

  const skillSegments = useMemo(() => {
    return skills.map((skill, index) => {
      // The start angle is the end of previous segment
      const startAngle = index * segmentSize;

      // End of current segment is the start angle + segment size
      const endAngle = startAngle + segmentSize;

      // Calculate outer radius of the segment based on the years of experience
      const segmentRadius = radiusMultiplier(skill.yearsOfExperience, index);

      return {
        id: skill.id,
        outerRadius: segmentRadius,
        startAngle,
        endAngle,
        icon: skill.icon,
        name: skill.name,
      };
    });
  }, [skills, segmentSize, radiusMultiplier]);

  return (
    <div>
      <svg width={circleSize} height={circleSize}>
        <g
          key="skills"
          transform={`translate(${circleSize / 2}, ${circleSize / 2})`}
        >
          {skillSegments.map((segment, index) => {
            return (
              <Segment
                key={segment.name}
                index={index}
                {...segment}
                currentSegmentHovered={currentSegmentHovered}
                setCurrentSegmentHovered={(value) => {
                  handleDelayedHover(value);
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
