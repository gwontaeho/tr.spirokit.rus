import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/regist/Main";

export default function Regist() {
  return (
    <>
      <Nav />
      <div className="ml-40">
        <Header h1="PJ.SUB_REG" />
        <Main />
      </div>
    </>
  );
}
