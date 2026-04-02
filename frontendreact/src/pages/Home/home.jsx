import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import Button from "../../components/button";
import Separator from "../../components/separator";


export default function Home() {
    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">

                <Text variant="megaTitle">Bem vindo ao <a className="text-[var(--azulPrincipal)]">Carometro</a> da <br /> Escola - Franca SP</Text>
                <section className=" w-[80%] bg-white/30 mt-10 justify-center flex gap-3 items-center p-10 shadow-lg shadow-zinc-300 rounded-xl items-center">
                    <div className="flex flex-col">
                        <Text variant="subtitle">Deseja <a className="text-[var(--laranjaSecundario)]">editar</a> uma turma?</Text>
                        <Text variant="text">Alguma nova notificação ou alteração na <br /> turma? gerencie agora!</Text>
                        <Button fill color="laranjaSecundario" className="mt-5" text="Clique aqui e comece" />
                    </div>
                    <Separator horizontal={false} />
                    <div className="flex flex-col">
                        <Text variant="subtitle">Pronto para <a className="text-[var(--laranjaSecundario)]">criar</a> uma turma?</Text>
                        <Text variant="text">Usuários com permissão de administrador <br /> podem editar e ou criar turmas.</Text>
                        <Button fill color="laranjaSecundario" className="mt-5" text="Clique aqui e comece" />
                    </div>
                </section>
            </main>
        </div>
    );
}
