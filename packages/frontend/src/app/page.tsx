import { getClient } from "@/lib/apolloClient";
import { SkillEntityResponseCollection } from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import Logo from "@/components/Logo";
import DownButton from "@/components/DownButton";
import GitHub from "@/components/Icon/GitHub";
import Linkedin from "@/components/Icon/LinkedIn";
import Introduction from "@/components/Introduction";

export default async function Home() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  return (
    <main className="flex flex-col justify-center">
      <Introduction />
    </main>
  );
}
