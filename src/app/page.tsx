import Gallery from "./components/Gallery";
import Header from "./components/Header";

export default async function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-[5%]">
      <Header withButton={true} />
      <Gallery />
    </main>
  );
}
