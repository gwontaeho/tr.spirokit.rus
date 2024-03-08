import { Header, Nav } from "@/components";
import { Main } from "@/components/subject/Main";

export default function Subject() {
    return (
        <>
            <Nav current="subject" />
            <div className="ml-40">
                <Header h1={"layout.l.rst"} />
                <Main />
            </div>
        </>
    );
}
