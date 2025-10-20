import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Screen } from "@/types";

type NameProps = {
  name: string;
  groupName: string;
  geoName: string;
  setName: (name: string) => void;
  setScreen: (screen: Screen) => void;
};

export default function Name({
  setScreen,
  name,
  groupName,
  geoName,
  setName,
}: NameProps) {
  return (
    <main className="flex flex-col gap-4 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-gray-500">
        Choose a restaurant with <span className="text-white">{groupName}</span>{" "}
        in <span className="text-white">{geoName}</span>
      </h1>
      <Input
        label="What is your name?"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <Button onClick={() => setScreen("cuisine")} disabled={!name}>
        Get Started
      </Button>
    </main>
  );
}
