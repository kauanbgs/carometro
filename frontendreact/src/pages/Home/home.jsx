import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import Button from "../../components/button";
import Separator from "../../components/separator";
import Logs from "../../components/logs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../axios/axios";



export default function Home() {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    const [occurrences, setOccurrences] = useState([]);
    const handleClick = (criar = false) => {
        criar ? navigate("/editarTurma", { state: { criar } }) : navigate("/editarTurma");
    }
    const getOccurrences = () => {
        api.readOccurrences().then((response) => {
            const data = response.data;
            setOccurrences(data.slice(0, 5));
        }).catch(() => setOccurrences([]));
    }
    const [classes, setClasses] = useState([]);
    const getClasses = () => {
        api.getTurmas().then((response) => {
            const data = response.data.classes;
            setClasses(data.slice(0, 5));
        }).catch(() => setClasses([]));
    }
    useEffect(() => {
        getOccurrences();
        getClasses();
    }, []);
    return (
        <div className="h-screen w-full bg-back flex overflow-hidden">
            <SideBar items={items} />
            <main className="flex-1 ml-16 md:ml-[22%] p-4 md:p-10 overflow-y-auto bg-background rounded-l-3xl flex flex-col items-center">

                <Text variant="megaTitle" className="text-left w-full ml-0 md:ml-10 lg:ml-35 text-3xl md:text-4xl lg:text-5xl mt-5">Bem vindo ao <a className="text-azulPrincipal">Carômetro, </a><br className="hidden md:block" />{JSON.parse(user).name}!</Text>

                <section className="w-full xl:w-[90%] bg-background/40 border border-background mt-8 justify-center flex flex-col lg:flex-row gap-6 p-6 md:p-10 shadow-lg rounded-xl items-center">
                    <div className="flex flex-col text-center lg:text-left items-center lg:items-start w-full lg:w-1/2">
                        <Text variant="subtitle">Deseja <a className="text-laranjaSecundario">editar</a> uma turma?</Text>
                        <Text variant="text" className="mt-2">Alguma nova notificação ou alteração na turma? gerencie agora!</Text>
                        <Button onClick={() => handleClick(false)} fill color="laranjaSecundario" className="mt-5 w-full md:w-max" text="Clique aqui e comece" />
                    </div>
                    <div className="hidden lg:block">
                        <Separator horizontal={false} />
                    </div>
                    <div className="flex flex-col text-center lg:text-left items-center lg:items-start w-full lg:w-1/2 mt-2 lg:mt-0">
                        <Text variant="subtitle">Pronto para <a className="text-laranjaSecundario">criar</a> uma turma?</Text>
                        <Text variant="text" className="mt-2">Usuários com permissão de administrador podem editar e ou criar turmas.</Text>
                        <Button onClick={() => handleClick(true)} fill color="laranjaSecundario" className="mt-5 w-full md:w-max" text="Clique aqui e comece" />
                    </div>
                </section>

                <section className="w-full xl:w-[90%] bg-background/40 border border-back shadow-lg mt-8 justify-center flex flex-col lg:flex-row gap-6 p-6 md:p-10 shadow-lg rounded-xl items-stretch">
                    <div className="flex flex-col w-full lg:w-[65%]">
                        <Text variant="text" className="font-semibold mb-2">Últimas Ocorrências</Text>
                        <div className="flex rounded-3xl gap-3 p-5 flex-col w-full bg-back/40 h-full">
                            {occurrences.map((occurrence) => (
                                <Logs key={occurrence.id_occurrence} type="occurrence">{occurrence.instructor_name} Deu uma ocorrencia em {occurrence.student_name}</Logs>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full lg:w-[35%] mt-4 lg:mt-0">
                        <Text variant="text" className="font-semibold mb-2">Últimos Registros</Text>
                        <div className="flex rounded-3xl gap-3 p-5 flex-col w-full bg-back/40 h-full">
                            {classes.map((classe) => (
                                <Logs key={classe.id_class} type="criacao">Turma {classe.name} de {classe.instructor_name}</Logs>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
