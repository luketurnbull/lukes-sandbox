import Image from "next/image";

export default function Logo() {
  return (
    <div className="animate-bounce">
      <Image
        src="/images/logo.svg"
        priority
        alt="Lukes Sandbox logo"
        width={300}
        height={300}
      />
    </div>
  );
}
