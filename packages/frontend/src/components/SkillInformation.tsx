import React from "react";
import { Skill } from "./SkillsCircle";
import EnhancedSVG from "./EnhancedSvg";

type SkillInformationProps = {
  selectedSkill: Skill | null;
};

const SEGMENT_COLOURS = [
  "bg-[#1C405F]",
  "bg-[#224D6F]",
  "bg-[#2F6182]",
  "bg-[#33AADB]",
  "bg-[#8ACCDB]",
  "bg-[#BAF2F1]",
];

function SkillInformation({ selectedSkill }: SkillInformationProps) {
  return (
    <div className="w-full sm:w-1/2 relative">
      <div
        className={`bg-[#224D6F] p-8 rounded-r-lg absolute left-0 transition-transform duration-200 -translate-y-1/2 ${
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
              <div className="flex justify-center items-center gap-5">
                <div className="w-8 h-8">
                  <EnhancedSVG
                    className="fill-white"
                    svgString={selectedSkill.icon}
                  />
                </div>
                <p className="text-2xl font-bold text-white">
                  {selectedSkill.name}
                </p>
              </div>
            </div>
            <div>
              <p className="mt-4 text-white">
                {selectedSkill.yearsOfExperience}+ years of experience
              </p>
              <div className="flex flex-row gap-2 mt-2">
                {Array(selectedSkill?.yearsOfExperience || 0)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full bg-white mt-1`}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SkillInformation;
