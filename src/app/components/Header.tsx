import Link from "next/link";
import { fraunces } from "../fonts";
import Button from "./Button";

export default function Header({ withButton }: { withButton: boolean }) {
  return (
    <header className="flex flex-row justify-between py-6">
      <Link href="/" target="_self">
        <h1
          className={`${fraunces.variable} font-serif text-3xl font-bold text-turquoise`}
        >
          moment
        </h1>
      </Link>

      {withButton && (
        <Button href="/neues-Bild" target="_self" variant="gradient">
          + neues Bild
        </Button>
      )}
    </header>
  );
}
