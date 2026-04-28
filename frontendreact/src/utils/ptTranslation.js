const API_MESSAGES = {
    // ===== Database =====
    "Unknown database 'sigo'": "Banco de dados 'sigo' não encontrado",

    // ===== Class Controller =====
    "class already registered in the system!":"Classe já registrada no sistema!",
    "ID of class is required!":"ID da classe é obrigatório!",
    "Name of instructor is required!":"Nome do instrutor é obrigatório!",
    "No class found for this instructor.":"Nenhuma classe encontrada para o instrutor.",
    "No class found with this name.":"Nenhuma classe encontrada com esse nome.",
    "class not found!":"Classe não encontrada!",
    "class updated successfully!":"Classe atualizada com sucesso!",
    "class deleted successfully!":"Classe deletada com sucesso!",

    // ===== Instructor Controller =====
    "Internal Server Error":"Erro interno do servidor",
    "Instructor created successfully":"Instrutor criado com sucesso",
    "Instructors retrieved successfully":"Instrutores recuperados com sucesso",
    "Instructor not found":"Instrutor não encontrado",
    "Instructor retrieved successfully":"Instrutor recuperado com sucesso",
    "Instructor updated successfully!":"Instrutor atualizado com sucesso!",
    "Instructor deleted successfully!":"Instrutor deletado com sucesso!",
    "Successful login":"Login realizado com sucesso",
    "Google Classroom disconnected successfully!":"Google Classroom desconectado com sucesso!",
    "Google Classroom não conectado!":"Google Classroom não conectado!",

    // ===== Student Controller =====
    "Student not found!":"Aluno não encontrado!",
    "Student created successfully!":"Aluno criado com sucesso!",
    "Student ID is required":"ID do aluno é obrigatório",
    "Student not found":"Aluno não encontrado",
    "student não encontrado!":"Aluno não encontrado!",
    "Student retrieved successfully":"Aluno recuperado com sucesso",
    "Student updated successfully":"Aluno atualizado com sucesso",
    "Student deleted successfully":"Aluno deletado com sucesso",
    "No students found in this class":"Nenhum aluno encontrado nesta classe",

    // ===== Occurrence Controller =====
    "Occurrence created successfully":"Ocorrência criada com sucesso",
    "Occurrence not found!":"Ocorrência não encontrada!",
    "Occurrence updated successfully!":"Ocorrência atualizada com sucesso!",
    "Occurrence deleted":"Ocorrência deletada",

    // ===== Validators (Services) =====
    "All fields must be filled":"Todos os campos devem ser preenchidos",
    "Invalid Email. Need the '@' symbol":"E-mail inválido. É necessário o símbolo '@'",
    "Email already being used by another user":"E-mail já está sendo usado por outro usuário",
    "Error verifying email":"Erro ao verificar e-mail",
    "All fields must be filled to be able to update it":"Todos os campos devem ser preenchidos para atualizar",
    "All fields must be filled to be able to create it":"Todos os campos devem ser preenchidos para criar",
    "All required fields (name, status, class) must be filled":"Todos os campos obrigatórios (nome, status, classe) devem ser preenchidos",
    "Password incorrect":"Senha incorreta",
    "Email already being used by another user":"E-mail já está sendo usado por outro usuário",

    // ===== Middlewares =====
    "Token não fornecido!":"Token não fornecido!",
    "Expired Token!":"Token expirado!",
    "Falha na autenticação do token.":"Falha na autenticação do token.",
    "Muitas tentativas de login. Tente novamente em 15 minutos.":"Muitas tentativas de login. Tente novamente em 15 minutos.",

    // ===== Global Error Handler =====
    "Erro interno de servidor!":"Erro interno de servidor!"
}

export default function translate(msg) {
  console.log(msg);
  return API_MESSAGES[msg] ?? msg;
}