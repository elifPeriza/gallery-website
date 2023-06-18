import { fraunces } from "../fonts";
import Button from "./Button";

export default function Header({ withButton }: { withButton: boolean }) {
  return (
    <header className="flex flex-row justify-between py-6">
      <h1
        className={`${fraunces.variable} font-serif text-3xl font-bold text-turquoise`}
      >
        moment
      </h1>
      {withButton && <Button variant="gradient">+ neues Bild</Button>}
    </header>
  );
}
