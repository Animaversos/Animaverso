import Logo from "@/assets/logo-com-nome.png";
import { Roboto } from "next/font/google";
import Image from "next/image";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
// Font da logo Nerko one
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 min-w-screen">
      <Image
        src={Logo}
        width={200}
        height={200}
        alt="Logo da plataforma animaverso"
      />
      <div className={roboto.className}>
        <h1 className="scroll-m-20 text-3xl text-center font-extrabold tracking-tight">
          Um universo está sendo construido aqui, em breve você poderá explorar
          e encontrar o verdadeiro amor.
        </h1>
      </div>
    </main>
  );
}
