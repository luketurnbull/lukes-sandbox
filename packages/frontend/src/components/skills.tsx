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
    <div className="flex flex-col sm:flex-row justify-center items-center gap-40 w-full">
      <SkillInformation selectedSkill={selectedSkill} />
      <SkillsCircle
        skills={skills}
        currentSegmentHovered={currentSegmentHovered}
        setCurrentSegmentHovered={setCurrentSegmentHovered}
      />
    </div>
  );
}

export default Skills;
