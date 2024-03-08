import { Nav, Header } from "@/components";
import { Main } from "@/components/devices/Main";

export default function Devices() {
    return (
        <>
            <Nav current="devices" />
            <div className="ml-40">
                <Header h1="layout.l.dvi_mng" />
                <Main />
            </div>
        </>
    );
}
