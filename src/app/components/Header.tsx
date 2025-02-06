import Image from "next/image";
import profilePicture from "/public/hn-profile.webp";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-8 py-16">
      <Image
        src={profilePicture}
        alt="Hien's logo"
        width={100}
        height={100}
        priority
        className="rounded-full border-2]"
      />
      <div className="flex flex-col items-center">
        <p className="text-balance font-inconsolata text-center">
          Captured on film and digital
        </p>
        <p className="text-balance font-inconsolata text-center">
          by Hien Nguyen
        </p>
      </div>
    </header>
  );
}
