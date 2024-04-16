export default function DownButton() {
  return (
    <div className="bg-primary rounded-full p-5 translate-y-[-25%] hover:duration-500 text-white hover:cursor-pointer hover:animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="4"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </div>
  );
}
