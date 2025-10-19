import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Screen } from "@/types";

type NameProps = {
  name: string;
  setName: (name: string) => void;
  setScreen: (screen: Screen) => void;
};

export default function Name({ setScreen, name, setName }: NameProps) {
  return (
    <main className="flex flex-col gap-4 items-center sm:items-start">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
        autoFocus
      />
      <Button size="lg" onClick={() => setScreen("cuisine")} disabled={!name}>
        Get Started
      </Button>
    </main>
  );
}
