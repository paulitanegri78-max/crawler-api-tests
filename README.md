# crawler-api-tests

Este projeto contém testes de API para um endpoint `POST /crawl`.

## Como iniciar o servidor

1. Instale dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node src/crawlerService.js
```

3. Em outro terminal, execute os testes:

```bash
npm test
```

## Como gerar o relatório com mochawesome

```bash
npm run test:report
```

O relatório será criado em `reports/mochawesome-report.html`.
