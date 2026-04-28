import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import UsersList from "../../components/usersList";
import Input from "../../components/input";
import api from "../../axios/axios";
import { ChevronLeft } from "lucide-react";
import { Snackbar } from "../../components/snackbar";
import { useNavigate } from "react-router-dom";

export default function VerUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [nomeBusca, setNomeBusca] = useState("");
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "adm") {
      navigate("/home", { state: { error: "Você não tem permissão para acessar esta página." } });
      return;
    }
  }, []);

  const fetchUsers = () => {
    api.getInstructors()
      .then((response) => {
        setUsers(response.data.instructors || []);
      })
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (nomeBusca === "") {
      fetchUsers();
    } else {
      api.getInstructorByName(nomeBusca)
        .then((response) => {
          setUsers(response.data.instructor || []);
        })
        .catch(() => setUsers([]));
    }
  };

  return (
    <div className="h-screen w-screen bg-back flex">
      <SideBar items={items} />
      <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-background rounded-l-3xl custom-scrollbar">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="w-6 h-6 cursor-pointer text-textoPrincipal"
            onClick={() => navigate("/gerenciarDocentes")}
          />
          <Text variant="title">Instrutores</Text>
        </div>

        <div className="flex flex-wrap justify-start gap-5 items-center mt-5">
          <Input
            placeholder="Nome do instrutor"
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
          />
          <button
            className="flex items-center gap-2 bg-textoPrincipal/90 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-textoPrincipal/70 transition-colors"
            onClick={handleSearch}
          >
            <Search className="text-background w-6 h-6" />
          </button>
        </div>

        <UsersList users={users} onDeleteSuccess={fetchUsers} />
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
