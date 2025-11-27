const ApiUrl = "http://localhost:5000/carometro";  // Defina a URL da sua API

const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("mensagem")


// FORM DO LOGIN - DOCENTES
if (loginForm) {
    // Corrigindo a sintaxe do evento `submit` e usando `async` corretamente
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita o carregamento da página

        // Extrai os dados do formulário e os transforma em um objeto (JSON)
        const dados = Object.fromEntries(new FormData(loginForm));
        console.log("Dados convertidos: ", dados);

        try {
            // Enviar os dados para a API usando `fetch`
            const response = await fetch(`${ApiUrl}/docente/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Definir o tipo de conteúdo como JSON
                },
                body: JSON.stringify(dados),  // Converter os dados para JSON antes de enviar
            });

            // Verifica a resposta da API
            const result = await response.json();
            if (response.ok) {
                console.log("Login bem-sucedido:", result);
                window.location.href = './pages/home.html';  // Redirecionamento (se necessário)
            } else {
                console.error("Erro no login:", result.error);
                msg.textContent = (result.error || 'Erro ao realizar login');
                msg.style.color = "red"
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            msg.textContent = ('Erro ao tentar fazer login: ', error);
            msg.style.color = "red"
        }
    });
}

// CADASTRO DE DOCENTES
const cadastroForm = document.getElementById("cadastroForm");
msgFormDoc = document.getElementById("mensagemCadastroDocente")
if (cadastroForm) {
    cadastroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dados = Object.fromEntries(new FormData(cadastroForm));
        console.log("Dados convertidos: ", dados);

        try {
            const response = await fetch(`${ApiUrl}/docente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Bem-sucedido:", result);
                msgFormDoc.textContent = 'Cadastro realizado com sucesso!';
                msgFormDoc.style.color = "green"
                cadastroForm.reset();
            } else {
                console.error("Erro:", result.error);
                msgFormDoc.textContent = (result.error || 'Erro ao cadastrar');
                msgFormDoc.style.color = "red"
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            msgFormDoc.textContent = ('Erro ao tentar cadastrar: ', error);
            msgFormDoc.style.color = "red"
        }
        onsubmit.window.location.href = '../pages/gerenciarAdmDev.html'
    });
}

// FORM PARA CRIAR ALUNOS
const alunoRegisterForm = document.getElementById("alunoRegisterForm");
if (alunoRegisterForm) {
    alunoRegisterForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dados = {
            nome: alunoRegisterForm.nome.value,
            email: alunoRegisterForm.email.value,
            telefone: alunoRegisterForm.telefone.value,
            status: 1,
            numero_aluno: alunoRegisterForm.numero_aluno.value,
            fk_id_turma: alunoRegisterForm.fk_id_turma.value,
        };
        console.log("Dados convertidos: ", dados);

        try {
            const response = await fetch(`${ApiUrl}/estudante`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Bem-sucedido:", result);
                alunoRegisterForm.reset();
            } else {
                console.error("Erro:", result.error);
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    });
}

// GERENCIAR TURMAS CRIADAS
document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault()
    console.log("chegou aqui")
    const nav = document.getElementById("turmas");
    nav.innerHTML = "";

    try {
        const resposta = await fetch(`http://localhost:5000/carometro/turma`);
        const dados = await resposta.json(); 
        console.log(dados);

        if (resposta.ok) {
            dados.forEach((turma) => {
                const div = document.createElement("div");
                div.classList.add("linha-turma");
                
                div.innerHTML = `
                    <p class="nome-turma">${turma.nome_turma}</p>
                    <p class="nome-professor">${turma.nome_docente || 'Sem professor'}</p>
                    <a href="editarTurma.html">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </a>
                `;
                
                nav.appendChild(div);
            });
        } else {
            console.error("Erro na requisição: ", dados.error);
            nav.innerHTML = "<p>Não foi possível carregar as turmas.</p>";
        }
    } catch (error) {
        console.log("Erro na requisição GET: ", error);
        nav.innerHTML = "<p>Erro interno do servidor.</p>";
    }
});

// DELEÇÃO DOS DOCENTES POR E-MAIL
const formDelecao = document.getElementById("formDelecao")
if(formDelecao){
formDelecao.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const email = formDelecao.email.value
    const msg = document.getElementById("mensagem")
    try {
        if (!email){
            msg.textContent = "Nenhum email informado!"
            msg.style.color = "red"
            return
        }
        const resposta = await fetch(`http://localhost:5000/carometro/docente/${email}`, {
            method: "DELETE"
        })
        const resultado = await resposta.json()
        if(resposta.ok){
        msg.textContent = resultado.message
        msg.style.color = "green"
        formDelecao.reset()
      } else {
        msg.textContent = resultado.error
        msg.style.color = "red"
      }
    } catch (error) {
        msg.textContent = "Erro ao conectar com o servidor"
        msg.style.color = "red"
        console.log("ERRO na requisição DELETE: ", error)
    }
})
}

// GERENCIAR DOCENTES CRIADOS
document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault()
    console.log("chegou aqui")
    const nav = document.getElementById("docentes");
    nav.innerHTML = "";

    try {
        const resposta = await fetch(`http://localhost:5000/carometro/docente`);
        const dados = await resposta.json(); 
        console.log(dados);

        if (resposta.ok) {
            dados.forEach((docente) => {
                const div = document.createElement("div");
                div.classList.add("linha-docente");
                
                div.innerHTML = `
                    <p class="nome-docente">${docente.nome}</p>
                    <p class="id-docente">${docente.id_docente || 'Sem professor'}</p>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                `;
                
                nav.appendChild(div);
            });
        } else {
            console.error("Erro na requisição: ", dados.error);
            nav.innerHTML = "<p>Não foi possível carregar os docentes.</p>";
        }
    } catch (error) {
        console.log("Erro na requisição GET: ", error);
        nav.innerHTML = "<p>Erro interno do servidor.</p>";
    }
});