<div align="center">

# ⚡ **Modernized Todo Application** ⚡

<img src="https://img.shields.io/badge/Status-Active-gold?style=for-the-badge&logo=checkmarx&logoColor=white&labelColor=black" alt="Status">
<img src="https://img.shields.io/badge/Java-17-gold?style=for-the-badge&logo=openjdk&logoColor=white&labelColor=black" alt="Java">
<img src="https://img.shields.io/badge/React-18-gold?style=for-the-badge&logo=react&logoColor=white&labelColor=black" alt="React">
<img src="https://img.shields.io/badge/Spring_Boot-3.x-gold?style=for-the-badge&logo=springboot&logoColor=white&labelColor=black" alt="Spring Boot">

### 🚀 **Uma aplicação Todo moderna migrada de COBOL para Java Spring Boot + React**

---

</div>

## 📋 **Visão Geral**

> **Transformação Digital Completa**: Este projeto representa a modernização de uma aplicação COBOL legada para uma arquitetura moderna full-stack, demonstrando as melhores práticas de migração e desenvolvimento.

<table>
<tr>
<td width="50%">

### 🔧 **Backend (Spring Boot)**
- ☕ **Java 17** - Linguagem robusta
- 🍃 **Spring Boot 3.x** - Framework moderno
- 🗄️ **Spring Data JPA** - Persistência
- 🔐 **Spring Security** - Segurança
- 🌐 **RESTful APIs** - Comunicação
- 💾 **H2 Database** - Desenvolvimento

</td>
<td width="50%">

### ⚛️ **Frontend (React)**
- ⚛️ **React 18** - Interface moderna
- 🎨 **Material-UI** - Componentes elegantes
- 🧭 **React Router** - Navegação
- 📡 **Axios** - Comunicação HTTP
- 📅 **Date-fns** - Manipulação de datas

</td>
</tr>
</table>

---

## ✨ **Funcionalidades Principais**

<div align="center">

| 👥 **Gerenciamento de Usuários** | 📝 **Gerenciamento de Tarefas** | 📊 **Dashboard** |
|:---:|:---:|:---:|
| ✅ Criar, listar, atualizar e deletar | ✅ CRUD completo de tarefas | ✅ Visão geral de usuários |
| ✅ Validação de dados completa | ✅ Atribuição de tarefas | ✅ Acesso rápido a tarefas |
| ✅ Validação de idade (18+) | ✅ Sistema de prioridades | ✅ Estatísticas em tempo real |
| ✅ Campos obrigatórios | ✅ Controle de status | ✅ Interface intuitiva |

</div>

---

## 🚀 **Início Rápido**

### 📋 **Pré-requisitos**

```bash
☕ Java 17+    📦 Node.js & npm    🔨 Maven
```

### 🔧 **Executando o Backend**

```bash
# 📁 Navegar para o diretório backend
cd modernized-todo-app/backend

# 🔨 Build do projeto
mvn clean install

# 🚀 Executar aplicação
mvn spring-boot:run
```

<div align="center">
<img src="https://img.shields.io/badge/Backend_Running-http://localhost:8080-gold?style=for-the-badge&logo=spring&logoColor=white&labelColor=black" alt="Backend">
</div>

### ⚛️ **Executando o Frontend**

```bash
# 📁 Navegar para o diretório frontend
cd modernized-todo-app/frontend

# 📦 Instalar dependências
npm install

# 🚀 Iniciar servidor de desenvolvimento
npm start
```

<div align="center">
<img src="https://img.shields.io/badge/Frontend_Running-http://localhost:3000-gold?style=for-the-badge&logo=react&logoColor=white&labelColor=black" alt="Frontend">
</div>

---

## 🛠️ **API Endpoints**

<details>
<summary><b>👥 Usuários</b></summary>

| Método | Endpoint | Descrição |
|:---:|:---|:---|
| `GET` | `/api/users` | Listar todos os usuários |
| `GET` | `/api/users/{id}` | Buscar usuário específico |
| `POST` | `/api/users` | Criar novo usuário |
| `PUT` | `/api/users/{id}` | Atualizar usuário |
| `DELETE` | `/api/users/{id}` | Deletar usuário |

</details>

<details>
<summary><b>📝 Tarefas</b></summary>

| Método | Endpoint | Descrição |
|:---:|:---|:---|
| `GET` | `/api/tasks` | Listar todas as tarefas |
| `GET` | `/api/tasks/{id}` | Buscar tarefa específica |
| `GET` | `/api/tasks/user/{userId}` | Tarefas de um usuário |
| `GET` | `/api/tasks/tag/{tag}` | Tarefas por tag |
| `POST` | `/api/tasks` | Criar nova tarefa |
| `PUT` | `/api/tasks/{id}` | Atualizar tarefa |
| `PATCH` | `/api/tasks/{id}/status` | Atualizar status |
| `DELETE` | `/api/tasks/{id}` | Deletar tarefa |

</details>

---

## 🏗️ **Arquitetura**

<div align="center">

```mermaid
graph TD
    A[🌐 Frontend - React] --> B[📡 API Layer - Spring Boot]
    B --> C[⚙️ Service Layer - Business Logic]
    C --> D[🗄️ Repository Layer - Spring Data JPA]
    D --> E[💾 Database - H2/PostgreSQL]
    
    style A fill:#FFD700,stroke:#000,stroke-width:2px,color:#000
    style B fill:#000,stroke:#FFD700,stroke-width:2px,color:#FFD700
    style C fill:#FFD700,stroke:#000,stroke-width:2px,color:#000
    style D fill:#000,stroke:#FFD700,stroke-width:2px,color:#FFD700
    style E fill:#FFD700,stroke:#000,stroke-width:2px,color:#000
```

</div>

---

## 🔄 **Migração COBOL → Java**

<table>
<tr>
<th width="50%">🏛️ <b>COBOL Legacy</b></th>
<th width="50%">🚀 <b>Java Modern</b></th>
</tr>
<tr>
<td>

- Arrays em memória
- Código procedural
- Interface de linha de comando
- Validação básica
- Manipulação manual de dados

</td>
<td>

- ✅ Banco de dados relacional
- ✅ Programação orientada a objetos
- ✅ Interface React moderna
- ✅ API RESTful
- ✅ Validação robusta

</td>
</tr>
</table>

---

## 🎯 **Próximos Passos**

<div align="center">

| 🔐 **Segurança** | 📱 **Mobile** | 🔍 **Funcionalidades** |
|:---:|:---:|:---:|
| Autenticação JWT | React Native App | Sistema de busca |
| Autorização RBAC | PWA Support | Paginação avançada |
| OAuth2 Integration | Offline Mode | Notificações email |

</div>

---

<div align="center">

### 🌟 **Desenvolvido com ❤️ para o Hackathon Compass UOL** 🌟

<img src="https://img.shields.io/badge/Made_with-❤️-gold?style=for-the-badge&labelColor=black" alt="Made with Love">
<img src="https://img.shields.io/badge/Hackathon-Compass_UOL-gold?style=for-the-badge&labelColor=black" alt="Hackathon">

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**

</div>
