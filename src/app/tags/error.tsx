"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <>
      <Header withButton={true} />
      <div className="mt-40 flex">
        <div className="mx-auto flex flex-col items-center gap-10 ">
          <h2 className="text-center font-sans text-lg font-bold text-white ">
            Oops, keine Bilder mit diesem Tag.
          </h2>
          <Button variant="turquoise" onClick={() => router.push("/")}>
            Zurück zur Gallerie
          </Button>
        </div>
      </div>
    </>
  );
}
