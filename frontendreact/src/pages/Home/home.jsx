import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import Button from "../../components/button";
import Separator from "../../components/separator";
import Logs from "../../components/logs";
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/editarTurma");
    }
    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">

                <Text variant="megaTitle">Bem vindo ao <a className="text-[var(--azulPrincipal)]">Carometro</a> da <br /> Escola - Franca SP</Text>
                <section className=" w-[90%] bg-white/30 mt-5 justify-center flex gap-3 items-center p-10 shadow-lg shadow-zinc-300 rounded-xl items-center">
                    <div className="flex flex-col">
                        <Text variant="subtitle">Deseja <a className="text-[var(--laranjaSecundario)]">editar</a> uma turma?</Text>
                        <Text variant="text">Alguma nova notificação ou alteração na <br /> turma? gerencie agora!</Text>
                        <Button onClick={() => handleClick()} fill color="laranjaSecundario" className="mt-5" text="Clique aqui e comece" />
                    </div>
                    <Separator horizontal={false} />
                    <div className="flex flex-col">
                        <Text variant="subtitle">Pronto para <a className="text-[var(--laranjaSecundario)]">criar</a> uma turma?</Text>
                        <Text variant="text">Usuários com permissão de administrador <br /> podem editar e ou criar turmas.</Text>
                        <Button fill color="laranjaSecundario" className="mt-5" text="Clique aqui e comece" />
                    </div>
                </section>
                <section className=" w-[90%] bg-white/30 mt-10 justify-center flex gap-3 items-center px-10 py-3 shadow-lg shadow-zinc-300 rounded-xl items-center">
                    <div className="flex flex-col w-[65%]">
                        <Text variant="text">Últimas Ocorrências</Text>
                        <div className="flex rounded-3xl gap-3 p-5 flex-col w-full bg-[var(--textoCinzaSuporte)]/10 h-full p-3">
                            <Logs color="delecao">Euller deletou Kauan</Logs>
                            <Logs color="criacao">Euller criou Turma 1</Logs>
                            <Logs color="ocorrencia">Euller deu ocorrencia para Kauan</Logs>
                            <Logs color="delecao">Euller deletou Kauan</Logs>
                            <Logs color="delecao">Euller deletou Kauan</Logs>
                        </div>
                    </div>
                    <div className="flex flex-col w-[35%] ">
                        <Text variant="text">Últimos Registros</Text>
                        <div className="flex rounded-3xl gap-3 p-5 flex-col w-full bg-[var(--textoCinzaSuporte)]/10 h-full p-3">
                            <Logs color="registro">Turma 2C - DS</Logs>
                            <Logs color="registro">Turma 3B - CDS</Logs>
                            <Logs color="registro">Turma 1A - ADS</Logs>
                            <Logs color="registro">Turma 1B - ADS</Logs>
                            <Logs color="registro">Turma 1A - ADS</Logs>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
