import { getClient } from "@/lib/apolloClient";
import {
  SkillEntity,
  SkillEntityResponseCollection,
} from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import Introduction from "@/components/Introduction";
import Section from "@/components/templates/Section";
import SkillsCircle, { Skill } from "@/components/SkillsCircle";

export default async function Home() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  const skillsData: Skill[] = skills.data
    .filter((skill: SkillEntity) => skill && skill.attributes)
    .map((skill: SkillEntity) => ({
      id: skill.attributes?.id || "",
      name: skill.attributes?.name || "",
    })) as Skill[];

  return (
    <main className="flex flex-col justify-center">
      <Introduction />
      <Section>
        <SkillsCircle skills={skillsData} />
      </Section>
    </main>
  );
}
