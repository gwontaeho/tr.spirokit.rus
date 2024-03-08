import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/update/Main";

export default function Update() {
    return (
        <>
            <Nav />
            <div className="ml-40">
                <Header h1="layout.l.sbj_upt" />
                <Main />
            </div>
        </>
    );
}
