import GitHub from "./Icon/GitHub";
import LinkedIn from "./Icon/LinkedIn";
import Logo from "./Logo";
import Section from "./templates/Section";

/**
 * Renders the introduction section of the page.
 *
 * @return {JSX.Element} The rendered introduction section.
 */
export default function Introduction() {
  return (
    <Section>
      <div className="p-5 md:p-10 flex flex-col md:flex-row md:w-[62.5rem]">
        <div className="inline-flex flex-col md:pr-14 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-darkBlue">
            Luke&#39;s Sandbox
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
    </Section>
  );
}
