import { getClient } from "@/lib/apolloClient";
import { SkillEntityResponseCollection } from "@/lib/constants/types/cms";
import Skills from "@/components/skills";
import { GET_SKILLS } from "@/lib/queries/getSkills";

export default async function Home() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl">
        <h1 className="pt-2 text-6xl">Lukes Sandbox</h1>
        <p className="mt-2">
          Welcome to my sandbox. This is where I play with new technologies and
          ideas. I am a Full Stack JavaScript Wizard.
        </p>
        <div>
          <Skills skills={skills.data} />
        </div>
      </div>
    </main>
  );
}
