// Feito por Luiz Felipe
const ApiUrl = "http://localhost:5000/carometro";  // Defina a URL da sua API

const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("mensagem")

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

const cadastroForm = document.getElementById("cadastroForm");
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
                cadastroForm.reset();
            } else {
                console.error("Erro:", result.error);
                msg.textContent = (result.error || 'Erro ao cadastrar');
                msg.style.color = "red"
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            msg.textContent = ('Erro ao tentar cadastrar: ', error);
            msg.style.color = "red"
        }
    });
}
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
document.addEventListener("DOMContentLoaded", async () => {
    const nav = document.getElementById("turmas");
    nav.innerHTML = ""; // Limpa as turmas antes de adicionar novas

    try {
        // Faz a requisição para a API
        const resposta = await fetch(`http://localhost:5000/carometro/turma`);
        const dados = await resposta.json(); // Corrige a chamada da função json()
        console.log(dados);

        // Verifica se a requisição foi bem-sucedida
        if (resposta.ok) {
            dados.forEach((turma) => {
                // Cria uma nova div para cada turma
                const div = document.createElement("div");
                div.classList.add("linha-turma"); // Adiciona a classe 'linha-turma'
                
                // Adiciona o conteúdo dentro da div
                div.innerHTML = `
                    <p class="nome-turma">${turma.nome_turma}</p>
                    <p class="nome-professor">${turma.nome_docente || 'Sem professor'}</p>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                `;
                
                // Adiciona a div ao container
                nav.appendChild(div);
            });
        } else {
            // Se a resposta não for ok, exibe uma mensagem de erro
            console.error("Erro na requisição: ", dados.error);
            nav.innerHTML = "<p>Não foi possível carregar as turmas.</p>";
        }
    } catch (error) {
        // Em caso de erro de requisição
        console.log("Erro na requisição GET: ", error);
        nav.innerHTML = "<p>Erro interno do servidor.</p>";
    }
});