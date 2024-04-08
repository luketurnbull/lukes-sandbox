import Section from "./Section";
import { getClient } from "@/lib/apolloClient";
import {
  SkillEntity,
  SkillEntityResponseCollection,
} from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import SkillsCircle, { Skill } from "@/components/SkillsCircle";

function shuffleArray<T>(array: T[]): T[] {
  // Clone the array to avoid modifying the original array
  let shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
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
        // Download the image from the url
        const iconUrl = skill.attributes?.icon?.data?.attributes?.url;

        // fetch the SVG
        const response = await fetch(`http://localhost:1337${iconUrl}`);
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
      <SkillsCircle skills={shuffledSkills} />
    </Section>
  );
}
