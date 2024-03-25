import React from "react";
import { SkillEntity } from "@/lib/constants/types/cms";
import { Button } from "./ui/button";
import Link from "next/link";

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
            <div key={skill.id} className="whitespace-nowrap">
              <Link href={`/skills/${skill.id}`}>
                <Button>{skillName}</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
