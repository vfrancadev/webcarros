# 🚗 WebCarros

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20DB-FFCA28?style=flat&logo=firebase&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)
![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-blue?style=flat)

**WebCarros** é uma aplicação web para compra e venda de veículos novos e usados, feita para ser rápida, responsiva e simples de usar.  
Com integração ao **Firebase**, gerenciamento de formulários com **React Hook Form** e **Context API**, ela oferece autenticação, cadastro e visualização detalhada dos veículos.

---

## ✨ Funcionalidades

✅ **Login & Registro** com autenticação Firebase  
✅ **Cadastro de veículos** com fotos e descrição  
✅ **Busca inteligente** por nome do carro  
✅ **Página de detalhes** com todas as informações e contato do vendedor  
✅ **Dashboard** para gerenciar anúncios  
✅ **Layout responsivo** para desktop e mobile  

---

## 🛠 Tecnologias Utilizadas

| Tecnologia        | Função |
|-------------------|--------|
| **React.js** ⚛ | Interface do usuário |
| **Firebase** 🔥 | Autenticação e banco de dados |
| **React Hook Form** 📝 | Validação e controle de formulários |
| **Context API** 🌐 | Estado global da aplicação |
| **TailwindCSS** 🎨 | Layout responsivo |

---

## 📷 Screenshots

### 🏠 Página Inicial
![Home](imgs/home.jpg)

### 📄 Detalhes do Carro
![Detalhes](imgs/detalhes.jpg)

### ➕ Cadastrar Carro
![Cadastrar Carro](imgs/cadastrarcar.jpg)

### 🔑 Login
![Login](imgs/login.jpg)

### 🆕 Registro
![Registro](imgs/register.jpg)

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/webcarros.git

# Entre na pasta
cd webcarros

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

🔹 **Importante:** Configure as variáveis de ambiente do Firebase no `src/services/firebaseConnection.ts` antes de rodar o projeto.

---

## 📌 Observações
- O layout foi pensado para ser moderno e responsivo.  
- As informações dos veículos são armazenadas e recuperadas do **Firebase Firestore**.  
- Login e registro usam **Firebase Authentication**.

---

## 📄 Licença
Este projeto está sob a licença **MIT**.  
Sinta-se livre para usá-lo e modificá-lo.
