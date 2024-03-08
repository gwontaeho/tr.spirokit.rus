import { Header, Nav } from "@/components";
import { Main } from "@/components/subjects/Main";

export default function Subjects() {
    return (
        <>
            <Nav current="subjects" />
            <div className="ml-40">
                <Header h1="layout.l.sch_sbj" />
                <Main />
            </div>
        </>
    );
}
