import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/Main";

export default function Subjects() {
  return (
    <>
      <Nav current="subjects" />
      <div className="ml-40">
        <Header h1="PJ.SRCH_SUB" />
        <Main />
      </div>
    </>
  );
}
