**Agendador de Transferência Financeira**

🏛 **Arquitetura e Decisões**

**Backend**

-Framework: Spring Boot 2
-Linguagem: Java 11

**Organização:**

-Camadas separadas: entities, repositories, services, resources (controllers)

-DTOs e mappers para separar modelo de domínio e payloads

-Regras de negócio isoladas em services

-Exceções customizadas (TaxaNaoAplicavelException) para validações de regra de negócio

-Dados iniciais populados via classe de configuração DataInicializaConfig

**Frontend**

-Framework: Angular 17

-Componentes: Standalone Components

-Validação: Reactive Forms

-UI: Angular Material para formulários, tabelas e snackbars

-Mensagens: Snackbars customizados para sucesso e erro

-Datas: Formatação com Moment.js (DD/MM/YYYY)

**Banco de Dados**

-H2 para desenvolvimento e testes

🛠 **Tecnologias e Versões**

-Java: 11

-Spring Boot: 2

-JPA

-Maven

-MapStruct

-H2 Database

-Angular

-Angular Material

🚀 **Executando o Backend**

**Clone o repositório:**

git clone https://github.com/diegomarquesf/agendador-transferencia-financeira-spring.git

-Abra no IDE de sua preferência (IntelliJ, Eclipse ou VS Code)

-Execute como Spring Boot Application

-API disponível em: http://localhost:8080

🚀 **Executando o Frontend**

**Clone o repositório:**

git clone https://github.com/diegomarquesf/agendador-transferencia-financeira-frontend.git

Instale as dependências:
npm install

**Execute o projeto:**

ng serve

Acesse: http://localhost:4200
Certifique-se que o backend está rodando em http://localhost:8080

💾 **Dados Iniciais**

-Taxas e agendamentos são populados automaticamente ao iniciar o backend

-As regras de taxa seguem o padrão definido na tabela de negócio, garantindo consistência em testes e demonstrações.
