import { getClient } from "@/lib/apolloClient";
import { SkillEntityResponseCollection } from "@/lib/constants/types/cms";
import { GET_SKILLS } from "@/lib/queries/getSkills";
import Logo from "@/components/Logo";
import DownButton from "@/components/DownButton";
import GitHub from "@/components/Icon/GitHub";
import Linkedin from "@/components/Icon/LinkedIn";

export default async function Home() {
  const {
    data: { skills },
  } = await getClient().query<{ skills: SkillEntityResponseCollection }>({
    query: GET_SKILLS,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 md:p-24">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl items-center">
        <div className="max-w-96 text-center md:text-left">
          <h1 className="text-7xl font-bold text-darkBlue">Lukes Sandbox</h1>
          <p className="mt-4 text-lg text-darkBlue">
            Welcome to my sandbox. This is where I play with new technologies
            and ideas.
          </p>
          <ul className="inline-flex flex-row mt-5">
            <li className="pr-5">
              <GitHub />
            </li>
            <li>
              <Linkedin />
            </li>
          </ul>
        </div>
        <div className="w-1/2 h-auto pt-20">
          <Logo />
        </div>
      </div>
      <div>
        <DownButton />
      </div>
    </main>
  );
}
