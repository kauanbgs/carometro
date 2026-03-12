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

                {/* TIRAR ISSO DPS */}
                <h1 className="text-2xl font-bold text-[var(--azulPrincipal)] mb-8">
                    Docentes
                </h1>

                {loading && (
                    <p className="text-[var(--textoCinzaSuporte)]">Carregando...</p>
                )}

                {erro && (
                    <p className="text-[var(--erro)]">{erro}</p>
                )}

                {!loading && !erro && docentes.length === 0 && (
                    <p className="text-[var(--textoCinzaSuporte)]">Nenhum docente cadastrado.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {docentes.map((docente) => (
                        <div>
                            <h1>{docente.nome}</h1>
                            <p>{docente.email}</p>
                            <p>{docente.tipo}</p>
                        </div>
                    ))}
                </div>
                {/* TIRAR ISSO DPS */}
            </main>
        </div>
    );
}
