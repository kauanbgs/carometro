// Feito por Luiz Felipe

const ApiUrl = "http://localhost:5000/carometro";  // Defina a URL da sua API

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    // Corrigindo a sintaxe do evento `submit` e usando `async` corretamente
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita o carregamento da página

        // Extrai os dados do formulário e os transforma em um objeto (JSON)
        const dados = Object.fromEntries(new FormData(loginForm));
        console.log("Dados convertidos: ", dados);

        try {
            // Enviar os dados para a API usando `fetch`
            const response = await fetch(ApiUrl, {
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
                // Aqui, você pode redirecionar o usuário ou tratar o resultado
                window.location.href = './pages/home.html';  // Redirecionamento (se necessário)
            } else {
                console.error("Erro no login:", result);
                alert(result.message || 'Erro ao realizar login');
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert('Erro ao tentar fazer login. Tente novamente.');
        }
    });
}