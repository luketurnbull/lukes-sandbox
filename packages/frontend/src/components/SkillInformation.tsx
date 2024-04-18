import React from "react";
import { Skill } from "./SkillsCircle";
import EnhancedSVG from "./EnhancedSvg";

type SkillInformationProps = {
  selectedSkill: Skill | null;
};

function SkillInformation({ selectedSkill }: SkillInformationProps) {
  return (
    <div
      className={`absolute w-full flex justify-center top-0 transition-transform duration-200 ${
        selectedSkill ? "translate-y-0 delay-100" : "-translate-y-full"
      }`}
    >
      <div className="bg-atomicTangerine p-8 pr-12 rounded-lg h-1/3">
        <div className="mt-4 flex flex-row items-center">
          <div className="flex justify-center items-center gap-5">
            <div className="w-8 h-8">
              {selectedSkill && (
                <EnhancedSVG
                  className="fill-white"
                  svgString={selectedSkill.icon}
                />
              )}
            </div>
            <p className="text-2xl font-bold text-white">
              {selectedSkill?.name || ""}
            </p>
          </div>
        </div>
        <div>
          <p className="mt-4 text-white">
            {selectedSkill?.yearsOfExperience || 0}+ years of experience
          </p>
          <div className="flex flex-row gap-1 mt-2">
            {Array(selectedSkill?.yearsOfExperience || 0)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full bg-white mt-1`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillInformation;
