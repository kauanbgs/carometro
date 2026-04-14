import { useParams } from "react-router-dom"
import api from "../../axios/axios"
import { useEffect, useState } from "react"
import SideBar from "../../components/sideBar"
import items from "../../utils/itemSideBar"
import Text from "../../components/text"
import Input from "../../components/input"
import Button from "../../components/button"
import { ChevronLeft } from "lucide-react"
import { Pencil } from "lucide-react"


export default function Aluno() {
    const { id_student } = useParams();
    const [student, setStudent] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "",
        student_number: "",
        fk_id_class: "",
        });
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const searchStudent = async () => {
            try {
                const response = await api.getAlunoById(id_student);
                const data = response.data.students[0];
                setStudent(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    status: data.status,
                    student_number: data.student_number,
                    fk_id_class: data.fk_id_class,
                });
            } catch (error) {
                console.log(error);
            }
        };
        searchStudent()
    }, [id_student]);

    const handleSave = async () => {
        try {
            console.log("Sending data:", formData);
            const response = await api.updateStudent(id_student, formData);
            if(response.status === 200) {
                alert("Aluno atualizado com sucesso!");
                setStudent({ ...student, name: formData.name });
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar aluno: " + (error.response?.data?.error || error.message));
        }
    }

    useEffect(() => {
        const searchClasses = async () => {
            try {
                const response = await api.getTurmas();
                setClasses(response.data.classes);
            } catch (error) {
                console.log(error);
            }
        };
        searchClasses()
    }, []);

    const handleDelete = async () => {
        try {
            const response = await api.deleteStudent(id_student);
            if(response.status === 200) {
                alert("Aluno excluído com sucesso!");
                window.history.back();
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao excluir aluno: " + (error.response?.data?.error || error.message));
        }
    }

    const [modalAberto, setModalAberto] = useState(false);

    const Modal = () => {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg">
                    <Text variant="text" className="text-zinc-500 text-sm mb-1">Tem certeza que deseja excluir o aluno?</Text>
                    <div className="flex gap-3 mt-6">
                        <Button color="preto" rounded="lg" fill text="Cancelar" onClick={() => setModalAberto(false)} />
                        <Button color="erro" rounded="lg" fill text="Excluir" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                {modalAberto && <Modal />}
                <div className="flex items-center gap-2">
                    <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />
                    <Text variant="megaTitle" className="font-bold">{student.name}</Text>
                    <Button color="erro" rounded="lg" text="Excluir Aluno" className="ml-auto mr-46" onClick={() => setModalAberto(true)} />
                </div>
                
                <div className="grid grid-cols-[3fr_2fr_1fr] gap-4 mt-5 w-[80%]">
                    <Input label="Nome do aluno" placeholder="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <div>
                        <Text variant="text" className="text-zinc-500 text-sm">Turma</Text>
                        <select className="w-full p-2 h-12 rounded-lg text-sm border border-zinc-300 focus:outline-none focus:border-[var(--azulPrincipal)]" 
                                value={formData.fk_id_class} 
                                onChange={(e) => setFormData({ ...formData, fk_id_class: e.target.value })}>
                            <option value="">Selecione uma turma</option>
                            {classes.map((classe) => (
                                <option key={classe.id_class} value={classe.id_class}>{classe.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Número" placeholder="Número" value={formData.student_number} onChange={(e) => setFormData({ ...formData, student_number: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                </div>

                 <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 mt-4 w-[80%] items-center">
                    <div>
                        <Text variant="text" className="text-zinc-500 text-sm mb-1">Status</Text>
                        <select className="w-full p-2 h-12 rounded-lg text-sm border border-zinc-300 focus:outline-none focus:border-[var(--azulPrincipal)]" 
                                value={formData.status} 
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>
                    <Input label="Email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <Input label="Telefone" placeholder="Telefone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <button className="w-full h-12 mt-5 flex items-center justify-center bg-[var(--azulPrincipal)] rounded-lg cursor-pointer hover:bg-[var(--azulSecundario)] transition-colors" onClick={handleSave}>
                        <Pencil className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="flex gap-3 mt-6">
                </div>
            </main>
        </div>
    )
}