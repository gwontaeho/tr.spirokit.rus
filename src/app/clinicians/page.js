import { Nav, Header } from "@/components";
import { Main } from "@/components/clinicians/Main";

export default function Clinicians() {
  return (
    <>
      <Nav current="clinicians" />
      <div className="ml-40">
        <Header h1="PJ.CLI_MGMT" />
        <Main />
      </div>
    </>
  );
}
