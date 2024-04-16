import Section from "./Section";
import { NEXT_PUBLIC_STRAPI_URL, getClient } from "@/lib/apolloClient";
import {
  SkillEntity,
  SkillEntityResponseCollection,
} from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import Skills from "../Skills";
import { Skill } from "../SkillsCircle";

function shuffleArray<T>(array: T[]): T[] {
  let shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default async function SkillsSection() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  const skillsData: Skill[] = (await Promise.all(
    skills.data.map(async (skill: SkillEntity) => {
      if (skill && skill.attributes) {
        // Get image URL
        const iconUrl = skill.attributes?.icon?.data?.attributes?.url;

        // fetch the SVG
        const response = await fetch(`${NEXT_PUBLIC_STRAPI_URL}${iconUrl}`);
        const svg = await response.text();

        return {
          name: skill.attributes?.name || "",
          yearsOfExperience: skill.attributes?.yearsOfExperience || 0,
          icon: svg,
        };
      }
    })
  )) as Skill[];

  const shuffledSkills = shuffleArray(skillsData);

  return (
    <Section>
      <Skills skills={shuffledSkills} />
    </Section>
  );
}
