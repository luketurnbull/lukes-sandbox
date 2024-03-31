import GitHub from "./Icon/GitHub";
import LinkedIn from "./Icon/LinkedIn";
import DownButton from "./DownButton";
import Logo from "./Logo";

/**
 * Renders the introduction section of the page.
 *
 * @return {JSX.Element} The rendered introduction section.
 */
export default function Introduction() {
  return (
    <section className="relative">
      <div className="h-screen flex justify-center items-center pb-7">
        <div className="p-5 md:p-10 flex flex-col md:flex-row md:w-[62.5rem]">
          <div className="inline-flex flex-col md:pr-14 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-darkBlue">
              Lukes Sandbox
            </h1>
            <p className="mt-4 text-base md:text-lg text-darkBlue">
              Welcome to my sandbox. This is where I play with new technologies
              and ideas.
            </p>
            <ul className="inline-flex flex-row mt-5 justify-center md:justify-start">
              <li className="pr-5">
                <GitHub />
              </li>
              <li>
                <LinkedIn />
              </li>
            </ul>
          </div>
          <div className="pt-20 max-w-[50%] md:max-w-full mx-auto md:mx-0">
            <Logo />
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 w-full">
        <div className="flex justify-center">
          <DownButton />
        </div>
      </div>
    </section>
  );
}
