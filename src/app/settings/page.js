import { Header, Nav } from "@/components";
import { Main } from "@/components/settings/Main";

export default function Subjects() {
    return (
        <>
            <Nav />
            <div className="ml-40">
                <Header h1="layout.l.settings" />
                <Main />
            </div>
        </>
    );
}
