import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../axios/axios";
import items from "../../utils/itemSideBar";
import Alert from "../../components/alert";
import Text from "../../components/text";
import Button from "../../components/button";
import Modal from "../../components/modal";


export default function RemoverDocente() {
    const location = useLocation();
    let email = location.state?.email || "";

    const [user, setUser] = useState({
        email: email,
        password: ""
    })

    const navigate = useNavigate()

    const [feedback, setFeedback] = useState({ message: "", type: "" })

    const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false)

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const handleModalConfirmar = (e) => {
        e.preventDefault()
        setModalConfirmarAberto(true)
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()
        try {
            const response = await api.deleteDocente(user)
            setFeedback({ message: response.data.message, type: "success" })

            const loggedUser = JSON.parse(localStorage.getItem("user"));
            if (loggedUser && loggedUser.email === user.email) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            }

            setUser({ password: "", email: "" })
            setModalConfirmarAberto(false)
        } catch (error) {
            setFeedback({ message: error.response?.data?.error || "Erro ao excluir docente", type: "error" })
            setModalConfirmarAberto(false)
        }
    }
    return (
        <div className="bg-back h-screen w-screen">
            <SideBar items={items} />
            <main className="flex-1 w-78%] ml-[22%] p-10 bg-background h-full rounded-l-3xl">
                <Modal
                    isOpen={modalConfirmarAberto}
                    onClose={() => setModalConfirmarAberto(false)}
                    title="Confirmar Exclusão"
                >
                    <div className="flex flex-col gap-4">
                        <Text variant="text">Tem certeza que deseja excluir o docente? Isso também removerá todas as turmas vinculadas a ele.</Text>
                        <div className="flex gap-3 justify-end mt-2">
                            <Button type="button" color="textoPrincipal" rounded="lg" text="Cancelar" onClick={() => setModalConfirmarAberto(false)} />
                            <Button type="button" fill rounded="lg" text="Confirmar" onClick={handleSubmit} />
                        </div>
                    </div>
                </Modal>
                <div className="flex gap-2">
                    <Link className="flex gap-2" to="/gerenciarDocentes"> <ArrowLeft /> Voltar</Link>
                </div>

                <Alert
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback({ message: "", type: "" })}
                />

                <div className="flex flex-col items-center justify-center mt-7">
                    <Text variant="subtitle">Excluir Docente</Text>
                    <form action="" onSubmit={handleModalConfirmar} className="flex flex-col gap-4 w-[50%] mt-3">
                        <Input type="text" placeholder="Email do Docente" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="text" placeholder="Senha do Docente" onChange={onChange} id="password" name="password" value={user.password} />
                        <Button type="submit" text="Excluir" color="erro" fill className="w-full" />
                    </form>
                </div>
            </main>
        </div>
    )
}