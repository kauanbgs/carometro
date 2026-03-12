import { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import api from "../../axios/axios";
import items from "../../utils/itemSideBar";

export default function Home() {
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.getDocentes()
            .then((res) => {
                setDocentes(res.data.docentes);
            })
            .catch(() => {
                setErro("Erro ao carregar docentes.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">

                <h1>HOME</h1>
            </main>
        </div>
    );
}
