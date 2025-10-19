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
