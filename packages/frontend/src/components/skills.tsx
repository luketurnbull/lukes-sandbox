"use client";

import React, { useState, useMemo } from "react";
import SkillsCircle, { Skill } from "./SkillsCircle";
import SkillInformation from "./SkillInformation";

type SkillsProps = {
  skills: Skill[];
};

function Skills({ skills }: SkillsProps) {
  const [currentSegmentHovered, setCurrentSegmentHovered] = useState<
    number | null
  >(null);

  const selectedSkill = useMemo(() => {
    if (currentSegmentHovered === null) return null;

    return skills[currentSegmentHovered];
  }, [currentSegmentHovered, skills]);

  return (
    <div className="w-screen h-dvh absolute overflow-hidden">
      <div className="relative">
        <SkillInformation selectedSkill={selectedSkill} />
      </div>
      <div className="flex justify-center items-center w-screen h-dvh">
        <SkillsCircle
          skills={skills}
          currentSegmentHovered={currentSegmentHovered}
          setCurrentSegmentHovered={setCurrentSegmentHovered}
        />
      </div>
    </div>
  );
}

export default Skills;
