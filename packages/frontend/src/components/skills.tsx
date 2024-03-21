import React from "react";
import { SkillEntity } from "../../../types/src/generated";

type SkillsProps = {
  skills: SkillEntity[];
};

function Skills({ skills }: SkillsProps) {
  return (
    <div>
      <h2 className="text-2xl mt-6">Skills</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill: SkillEntity) => {
          const skillName = skill.attributes?.name;

          return (
            <div
              key={skill.id}
              className="p-4 bg-primary drop-shadow-sm rounded-md whitespace-nowrap hover:bg-primary/85 hover:cursor-pointer transition-colors"
            >
              <span className="text-primary-foreground">{skillName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
