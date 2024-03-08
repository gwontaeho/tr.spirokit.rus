import { Nav, Header } from "@/components";
import { Main } from "@/components/clinicians/Main";

export default function Clinicians() {
    return (
        <>
            <Nav current="clinicians" />
            <div className="ml-40">
                <Header h1="layout.l.cli_mng" />
                <Main />
            </div>
        </>
    );
}
