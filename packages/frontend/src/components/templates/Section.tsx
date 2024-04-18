import DownButton from "../DownButton";

// Create Section props type
export type SectionProps = {
  id: string;
  scrollToId?: string;
  children: React.ReactNode;
};

export default function Section({ id, scrollToId, children }: SectionProps) {
  return (
    <section className="relative" id={id}>
      <div className="h-dvh flex justify-center items-center pb-7">
        {children}
      </div>
      {scrollToId && (
        <div className="absolute bottom-6 w-full">
          <div className="flex justify-center">
            <DownButton idToScrollTo={scrollToId} />
          </div>
        </div>
      )}
    </section>
  );
}
