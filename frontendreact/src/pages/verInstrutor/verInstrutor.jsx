import { useParams, useNavigate } from "react-router-dom"
import api from "../../axios/axios"
import { useEffect, useState } from "react"
import SideBar from "../../components/sideBar"
import items from "../../utils/itemSideBar"
import Text from "../../components/text"
import Input from "../../components/input"
import Button from "../../components/button"
import { ChevronLeft, Pencil } from "lucide-react"
import { Snackbar } from "../../components/snackbar"
import Modal from "../../components/modal"

export default function Instrutor() {
    const { id_instructor } = useParams();
    const navigate = useNavigate();
    const [instructor, setInstructor] = useState({});
    const [formData, setFormData] = useState({ name: instructor.name, email: instructor.email, role: instructor.role || "" });
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
    const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: "", type: "success" });



    useEffect(() => {
        api.getInstructorById(id_instructor)
            .then((response) => {
                const data = response.data.instructor[0];
                setInstructor(data);
                setFormData({ name: data.name, email: data.email, role: data.role || "" });
            })
            .catch(() => {
                setSnackbar({ isOpen: true, message: "Erro ao carregar dados do instrutor", type: "error" });
            });
    }, [id_instructor]);

    const handleSave = async () => {
        try {
            const payload = { ...formData };
            if (passwordData.newPassword) {
                payload.password = passwordData.newPassword;
            }
            await api.updateInstructor(id_instructor, payload);
            
            const loggedUser = JSON.parse(localStorage.getItem("user"));
            if (loggedUser && String(loggedUser.id_instructor) === String(id_instructor)) {
                const updatedUser = { ...loggedUser, name: formData.name, role: formData.role };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                if (formData.role === "inst") {
                    navigate("/home");
                    return;
                }
            }

            setSnackbar({ isOpen: true, message: "Instrutor atualizado com sucesso!", type: "success" });
            setInstructor({ ...instructor, name: formData.name, role: formData.role });
            setPasswordData({ newPassword: "", confirmPassword: "" });
            
        } catch (error) {
            setSnackbar({ isOpen: true, message: error.response?.data?.error || "Erro ao salvar alterações", type: "error" });
        }
    };

    const handleDelete = async () => {
        navigate("/removerDocente", { state: { email: instructor.email } })
    };

    return (
        <div className="h-screen w-screen bg-back flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-background rounded-l-3xl custom-scrollbar">

                <Modal
                    isOpen={modalExcluirAberto}
                    onClose={() => setModalExcluirAberto(false)}
                    title="Confirmar Exclusão"
                >
                    <div className="flex flex-col gap-4">
                        <Text variant="text" className="mb-2">
                            Para confirmar a exclusão do instrutor <span className="font-bold">{instructor.name}</span>, digite a senha do usuário na próxima página.
                        </Text>
                        <div className="flex gap-3 justify-end mt-2">
                            <Button color="textoPrincipal" rounded="lg" text="Cancelar" onClick={() => setModalExcluirAberto(false)} />
                            <Button fill rounded="lg" text="Confirmar" onClick={handleDelete} />
                        </div>
                    </div>
                </Modal>

                <div className="flex items-center gap-4">
                    <ChevronLeft className="w-6 h-6 cursor-pointer text-textoPrincipal" onClick={() => navigate("/verUsers")} />
                    <div className="flex flex-col">
                        <Text variant="megaTitle" className="font-bold">{instructor.name}</Text>
                        <Text variant="text" className="text-textoPrincipal/50 text-sm">{instructor.email}</Text>
                    </div>
                    <Button color="erro" rounded="lg" text="Excluir perfil" className="ml-auto mr-4" onClick={() => setModalExcluirAberto(true)} />
                </div>

                <div className="grid grid-cols-[3fr_1fr] gap-4 mt-8 w-[80%] items-end">
                    <Input
                        label="Nome do docente"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
                    />
                    <div className="flex flex-col">
                        <Text variant="text" className="text-textoPrincipal text-sm">Tipo</Text>
                        <select
                            className="w-full p-2 h-12 rounded-lg text-sm text-textoPrincipal border border-zinc-300 bg-back focus:outline-none focus:border-azulPrincipal"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="inst">Instrutor</option>
                            <option value="adm">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr_auto] gap-4 mt-4 w-[80%] items-end">
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full"
                    />
                    <div className="flex flex-col">
                        <Text variant="text" className="text-textoPrincipal text-sm">Email</Text>
                        <input
                            className="w-full p-2 h-12 rounded-lg text-sm text-textoPrincipal border border-zinc-300 bg-back focus:outline-none focus:border-azulPrincipal"
                            value={formData.email}
                            disabled
                        />
                    </div>
                    <button
                        className="h-12 w-12 flex items-center justify-center bg-textoPrincipal/80 rounded-lg cursor-pointer hover:bg-textoPrincipal/60 transition-colors"
                        onClick={handleSave}
                    >
                        <Pencil className="w-5 h-5 text-background" />
                    </button>
                </div>

            </main>

            <Snackbar
                isOpen={snackbar.isOpen}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
            />
        </div>
    );
}
