import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import Separator from "../../components/separator";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import StudentList from "../../components/studentList";
import Input from "../../components/input";
import Button from "../../components/button";
import Modal from "../../components/modal";
import api from "../../axios/axios";
import { ChevronLeft } from "lucide-react";
import { Snackbar } from "../../components/snackbar";
import { useNavigate } from "react-router-dom";

export default function VerTurma() {
  const navigate = useNavigate();
  const { id_class } = useParams();
  const [students, setStudents] = useState([]);
  const [nomeDaTurma, setNomeDaTurma] = useState("");
  const [turma, setTurma] = useState({});
  const [aluno, setAluno] = useState({
    name: "",
    email: "",
    phone: "",
    status: 1,
    student_number: "",
    fk_id_class: id_class,
  });
  const [nomeDoAluno, setNomeDoAluno] = useState("");
  const [numeroDoAluno, setNumeroDoAluno] = useState("");
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    api
      .getAlunosByTurma(id_class)
      .then((response) => {
        const data = response.data;
        setStudents(data.students || []);
      })
      .catch(() => setStudents([]));

    api
      .getTurmaById(id_class)
      .then((response) => {
        const data = response.data.class;
        setNomeDaTurma(data?.name_class || "");
        setTurma(data || {});
      })
      .catch(() => {
        setNomeDaTurma("");
        setTurma({});
      });
  }, [id_class]);

  const handleSearch = () => {
    if (nomeDoAluno === "" && numeroDoAluno === "") {
      api
        .getAlunosByTurma(id_class)
        .then((response) => {
          const data = response.data.students;
          setStudents(data || []);
        })
        .catch(() => setStudents([]));
    }
    if (nomeDoAluno !== "" && numeroDoAluno === "") {
      api
        .getAlunosByName(nomeDoAluno)
        .then((response) => {
          const data = response.data.students;
          setStudents(data || []);
        })
        .catch(() => setStudents([]));
    }
    if (nomeDoAluno === "" && numeroDoAluno !== "") {
      api
        .getAlunosByNumber(numeroDoAluno)
        .then((response) => {
          const data = response.data.students;
          setStudents(data || []);
        })
        .catch(() => setStudents([]));
    }
  };

  const handleCreateAluno = async () => {
    await api
      .createStudent({
        ...aluno,
        create_date: new Date().toISOString().split("T")[0],
      })
      .then((response) => {
        setSnackbar({
          isOpen: true,
          message: response?.data?.message || "Aluno criado com sucesso",
          type: "success",
        });
        setAluno({
          name: "",
          email: "",
          phone: "",
          status: 1,
          student_number: "",
          fk_id_class: id_class,
        });
        handleSearch();
      })
      .catch((error) => {
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.error || "Erro ao criar aluno",
          type: "error",
        });
      });
  };

  const handleUpdateTurma = async () => {
    if (nomeDaTurma === turma.name_class || !nomeDaTurma.trim()) {
      return;
    }

    await api
      .updateTurma(id_class, {
        name: nomeDaTurma,
      })
      .then((response) => {
        setSnackbar({
          isOpen: true,
          message: response?.data?.message || "Turma atualizada com sucesso",
          type: "success",
        });
        setTurma({ ...turma, name_class: nomeDaTurma });
      })
      .catch((error) => {
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.error || "Erro ao atualizar turma",
          type: "error",
        });
        setNomeDaTurma(turma.name_class);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleDeleteTurma = async () => {
    await api
      .deleteTurma(id_class)
      .then((response) => {
        setSnackbar({
          isOpen: true,
          message: response?.data?.message || "Turma deletada com sucesso",
          type: "success",
        });
        setTimeout(() => {
          navigate("/editarTurma");
        }, 1000);
      })
      .catch((error) => {
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.error || "Erro ao deletar turma",
          type: "error",
        });
      });
  };

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);

  return (
    <div className="h-screen w-screen bg-back flex">
      <SideBar items={items} />
      <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-background rounded-l-3xl">
        <Modal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          title="Criar Aluno"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Nome do Aluno
              </label>
              <Input
                placeholder="Ex: Kauan Borges Plaza"
                value={aluno.name}
                onChange={(e) => setAluno({ ...aluno, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Numero do Aluno
              </label>
              <Input
                placeholder="Ex: 15"
                value={aluno.student_number}
                onChange={(e) =>
                  setAluno({ ...aluno, student_number: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Email do Aluno
              </label>
              <Input
                placeholder="Ex: kauanbgs13@gmail.com"
                value={aluno.email}
                onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Telefone do Aluno
              </label>
              <Input
                placeholder="Ex: (11) 99999-9999"
                value={aluno.phone}
                onChange={(e) => setAluno({ ...aluno, phone: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <Button
                color="textoPrincipal"
                rounded="lg"
                text="Cancelar"
                type="button"
                onClick={() => setModalAberto(false)}
              />
              <Button
                color="azulPrincipal"
                fill
                rounded="lg"
                text="Criar"
                type="button"
                onClick={handleCreateAluno}
              />
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalDeletarAberto}
          onClose={() => setModalDeletarAberto(false)}
          title="Deletar Turma"
        >
          <div className="flex flex-col gap-4">
            <Text variant="text">
              Tem certeza que deseja excluir a turma{" "}
              <span className="font-bold">{nomeDaTurma}</span>? Esta ação não
              pode ser desfeita.
            </Text>
            <div className="flex justify-end gap-3 mt-2">
              <Button
                color="preto"
                rounded="lg"
                text="Cancelar"
                onClick={() => setModalDeletarAberto(false)}
              />
              <Button
                color="erro"
                fill
                rounded="lg"
                text="Excluir"
                onClick={handleDeleteTurma}
              />
            </div>
          </div>
        </Modal>
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="w-6 h-6 cursor-pointer text-textoPrincipal"
            onClick={() => navigate("/editarTurma")}
          />
          <Input
            className="bg-background border-none p-0 text-textoPrincipal placeholder:text-textoPrincipal text-xl font-bold"
            placeholder="Nome da Turma"
            value={nomeDaTurma}
            onChange={(e) => setNomeDaTurma(e.target.value)}
            onBlur={handleUpdateTurma}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-wrap justify-start gap-5 items-center mt-5">
          <Input
            placeholder="Nome do aluno"
            onChange={(e) => setNomeDoAluno(e.target.value)}
          />
          <Input
            placeholder="Número do aluno"
            onChange={(e) => setNumeroDoAluno(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-textoPrincipal/90 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-textoPrincipal/70 transition-colors"
            onClick={handleSearch}
          >
            <Search className="text-background w-6 h-6" />
          </button>
          <Button
            color="branco"
            text="Adicionar Aluno"
            className="rounded-lg"
            onClick={() => setModalAberto(true)}
          />
          <Button
            color="erro"
            text="Excluir Turma"
            className="rounded-lg"
            onClick={() => setModalDeletarAberto(true)}
          />
        </div>

        <StudentList students={students} onDeleteSuccess={handleSearch} />
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
