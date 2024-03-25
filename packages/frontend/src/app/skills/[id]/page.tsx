import { getClient } from "@/lib/apolloClient";
import { QuerySkillArgs, SkillEntityResponse } from "@/lib/constants/types/cms";
import { GET_SKILL } from "@/lib/queries/getSkill";

type SkillPageProps = {
  params: {
    id: string;
  };
};

export default async function SkillPage({ params }: SkillPageProps) {
  const {
    data: { skill },
  } = await getClient().query<{ skill: SkillEntityResponse }, QuerySkillArgs>({
    query: GET_SKILL,
    variables: { id: params.id as string },
  });

  return (
    <div>
      <h1>{skill.data?.attributes?.name}</h1>
    </div>
  );
}
