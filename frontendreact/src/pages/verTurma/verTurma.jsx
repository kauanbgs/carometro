import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/axios";

export default function VerTurma() {
    const { id_class } = useParams();
    const [turma, setTurma] = useState(null);

    useEffect(() => {
        api.getAlunosByTurma(id_class).then((response) => {
            const data = response.data;
            console.log(data);
            setTurma(data);
        }).catch(() => setTurma(null));
    }, [id_class]);

    return (
        <div>
            {turma?.students.map((student) => (
                <div key={student.id_student}>
                    <h1>{student.name}</h1>
                </div>
            ))}
        </div>
    );
}