import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import LogoCard from "~/components/LogoCard";
import SearchBar from "~/components/SearchBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CP Search Engine" },
    { name: "description", content: "Welcome to CP Search Engine" },
  ];
}

interface Platform {
  name: string;
  url: string;
}

const platforms: Platform[] = [
  {
    name: "Leetcode",
    url: "https://leetcode.com/",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/",
  },
  {
    name: "Atcoder",
    url: "https://atcoder.jp/",
  },
  {
    name: "Codechef",
    url: "https://codechef.com/",
  },
] as const;

export default function Home() {
  return (
    <div className="h-screen w-screen flex-col bg-[url('./images/ghost-2.jpg')] bg-cover bg-center p-3">
      {/* Sites */}
      <div className="flex w-full justify-center items-center mt-12.5">
        <div className="flex">
          {platforms.map((site, index) => (
            <LogoCard key={index} name={site.name} url={site.url} />
          ))}
        </div>
      </div>
       {/* Search Bar */}
      <div className="w-full flex justify-center items-center mt-10">
          <SearchBar />
      </div>
    </div>
  );
}
