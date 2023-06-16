import Gallery from "./components/Gallery";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-[5%]">
      <Header />
      <Gallery />
    </main>
  );
}
