import { getClient } from "@/lib/apolloClient";
import { SkillEntityResponseCollection } from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import Introduction from "@/components/Introduction";
import Section from "@/components/templates/Section";
import Skills from "@/components/Skills";

export default async function Home() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  return (
    <main className="flex flex-col justify-center">
      <Introduction />
      <Section>
        <Skills skills={skills.data} />
      </Section>
    </main>
  );
}
