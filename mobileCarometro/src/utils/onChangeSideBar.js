import { useState } from "react";
import SideBar from "../components/SideBar";

export default function useSideBar(navigation) {

    const [open, setOpen] = useState(false);

    function abrirSidebar() {
        setOpen(true);
    }

    function fecharSidebar() {
        setOpen(false);
    }

    let sidebar = null;

    if (open) {
        sidebar = (
            <SideBar
                navigation={navigation}
                onClose={fecharSidebar}
            />
        );
    }

    return {
        sidebar,
        abrirSidebar
    };
}