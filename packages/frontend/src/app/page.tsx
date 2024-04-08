import Introduction from "@/components/Introduction";
import SkillsSection from "@/components/templates/SkillsSection";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center">
      <Introduction />
      <SkillsSection />
    </main>
  );
}
