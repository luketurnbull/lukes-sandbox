import React from "react";
import { Skill } from "./SkillsCircle";
import EnhancedSVG from "./EnhancedSvg";

type SkillInformationProps = {
  selectedSkill: Skill | null;
};

function SkillInformation({ selectedSkill }: SkillInformationProps) {
  return (
    <div className="w-full sm:w-1/2 relative">
      <div
        className={`bg-blueBayoux p-8 rounded-r-lg absolute left-0 transition-transform duration-200 -translate-y-1/2 ${
          selectedSkill ? "-translate-x-full" : "translate-x-0 delay-200"
        }`}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Tech I Love to Use
        </h1>
        <p className="mt-4 text-white">
          These are my current and most loved technologies.
        </p>
        <p className="mt-4 text-white">
          The size of the segment corresponds to my level of knowledge.{" "}
          <strong>Hover</strong> over them to learn more.
        </p>
      </div>
      <div
        className={`bg-atomicTangerine p-8 pr-12 rounded-r-lg absolute left-0 transition-all -translate-y-1/2 duration-200 ${
          selectedSkill ? "delay-200 translate-x-0" : "-translate-x-full"
        }`}
      >
        {selectedSkill && (
          <>
            <div className="mt-4 flex flex-row items-center">
              <div className="w-11 h-11 mr-4 flex justify-center items-center bg-pickledBluewood rounded-full">
                <div className="w-6 h-6">
                  <EnhancedSVG
                    className="fill-white"
                    svgString={selectedSkill.icon}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">
                {selectedSkill.name}
              </p>
            </div>
            <p className="mt-4 text-white">
              {selectedSkill.yearsOfExperience} years of experience
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SkillInformation;
