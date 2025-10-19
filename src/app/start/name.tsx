import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NameProps = {
  name: string;
  setName: (name: string) => void;
  setScreen: (screen: "start" | "location") => void;
};

export default function Name({ setScreen, name, setName }: NameProps) {
  return (
    <main className="flex flex-col gap-4 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Picky Picky</h1>
      <p>Collaboratively choose a restaurant with friends</p>
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
        autoFocus
      />
      <Button onClick={() => setScreen("location")} disabled={!name}>
        Get Started
      </Button>
    </main>
  );
}
