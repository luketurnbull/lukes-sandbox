// import DownButton from "../DownButton";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative">
      <div className="h-dvh flex justify-center items-center pb-7">
        {children}
      </div>
      {/* <div className="absolute bottom-6 w-full">
        <div className="flex justify-center">
          <DownButton />
        </div>
      </div> */}
    </section>
  );
}
