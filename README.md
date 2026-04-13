
---

# Desafio Frontend - Gerenciamento de Usuários 🚀

Este projeto é uma aplicação moderna de gerenciamento de usuários desenvolvida com **Angular ^21.2.0**, focada em performance, código limpo e as melhores práticas do mercado.

## 🛠️ Tecnologias e Ferramentas

* **Framework:** Angular 
* **Gerenciamento de Estado:** Angular Signals
* **Estilização:** Angular Material
* **Testes Unitários:** Vitest
* **Reporte de Cobertura:** v8 (Cobertura > 60%)
* **Programação Reativa:** RxJS (operadores avançados)

## 📋 Requisitos Implementados

* **Listagem de Usuários:** Cards responsivos com nome, e-mail e ações de edição.
* **Filtros Inteligentes:** Busca por nome com **debounceTime** de 300ms para otimização de chamadas.
* **Feedback ao Usuário:** Estados de loading e tratamento de erros.
* **Formulários Avançados:** Cadastro e edição via Modal (MatDialog) com validações reativas em tempo real.
* **Arquitetura:** Componentes 100% standalone e injeção de dependências moderna.

## 🧪 Testes e Qualidade

O projeto utiliza **Vitest** como motor de testes para garantir execuções rápidas e confiáveis.

* **Cobertura de Sentenças:** 60.22%
* **Total de Testes:** 14 Passados

Para executar os testes e gerar o relatório de cobertura:
```bash
npx vitest run --coverage
```

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/grGrimales/frontend-attus.git]
    cd desafio-frontend-attus
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx ng serve
    ```

4.  **Acesse a aplicação:**
    Abra o navegador em `http://localhost:4200/`

## 🧠 Decisões Técnicas (Diferenciais)

* **Signals vs RxJS:** Optei por usar **Signals** para o gerenciamento de estado local da lista de usuários devido à sua granularidade na detecção de mudanças, reservando o RxJS para fluxos de dados assíncronos e transformação de eventos.
* **Vitest:** Substituí o Karma tradicional pelo Vitest para ganhar velocidade no ciclo de feedback durante o desenvolvimento e facilitar a configuração de cobertura com v8.
* **Mocks de API:** Implementei uma lógica de serviço que simula interações assíncronas com uma API, incluindo delays propositais para demonstrar o comportamento do estado de Loading.

---

**Desenvolvido por Grediana Rojas** ✨

---
