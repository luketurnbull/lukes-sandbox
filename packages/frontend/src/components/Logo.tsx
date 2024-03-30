import Image from "next/image";

export default function Logo() {
  return (
    <div className="animate-bounce h-64 w-full">
      <Image src="/images/logo.svg" priority alt="Lukes Sandbox logo" fill />
    </div>
  );
}
