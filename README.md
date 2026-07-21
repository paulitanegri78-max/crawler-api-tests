
# Crawler API Tests

## Objetivo

Framework de automação de testes de API REST desenvolvido em **JavaScript** para validar os endpoints da API **crawler-api**.

## Tecnologias

- Node.js
- JavaScript
- Mocha
- Chai
- Supertest
- Dotenv
- Mochawesome

## Estrutura do projeto

```text
crawler-api-tests
├── helpers/
├── src/
├── tests/
├── reports/
├── package.json
├── package-lock.json
└── README.md
```

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
git clone https://github.com/paulitanegri78-max/crawler-api-tests
cd crawler-api-tests
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=http://localhost:4567
```

A variável `BASE_URL` define a URL base da API que será utilizada durante a execução dos testes.

## Execução dos testes

```bash
npm test
```

Caso exista um script específico para geração de relatório:

```bash
npm run test:report
```

## Relatórios

O projeto utiliza **Mochawesome** para gerar um relatório em HTML.

Após a execução, o relatório é disponibilizado no diretório configurado pelo projeto (por exemplo `reports/` ou `mochawesome-report/`).

Abra o arquivo `.html` gerado em qualquer navegador.

## Dependências

| Biblioteca | Documentação |
|------------|--------------|
| Node.js | https://nodejs.org |
| Mocha | https://mochajs.org |
| Chai | https://www.chaijs.com |
| Supertest | https://github.com/forwardemail/supertest |
| Dotenv | https://github.com/motdotla/dotenv |
| Mochawesome | https://github.com/adamgruber/mochawesome |

## API testada

https://github.com/paulitanegri78-max/crawler-api

## Boas práticas

- Organizar os testes por funcionalidade.
- Centralizar funções reutilizáveis em `helpers`.
- Utilizar variáveis de ambiente para configuração.
- Não versionar o arquivo `.env`.

## Melhorias futuras

- Integração com GitHub Actions.
- Execução por ambientes.
- Publicação automática de relatórios.
- Ampliação da cobertura de testes.

## Autor

**Paula Negri**
