# 🗺️ Roteiro do Projeto - Crawler API Tests

## 📋 Visão Geral

Este é um projeto de **testes automatizados para uma API de crawling** (extração de dados web). O projeto simula um servidor HTTP que processa requisições para buscar palavras-chave dentro de páginas HTML e retorna os URLs onde essas palavras foram encontradas.

**Tipo de projeto:** Testes de integração com Express/Node.js  
**Ferramentas de teste:** Mocha + Chai + Supertest  
**Ambiente de execução:** Node.js

---

## 📁 Estrutura de Pastas

```
crawler-api-tests/
├── src/                          # Código do servidor
│   └── crawlerService.js        # 🔧 Servidor HTTP que implementa a API
├── tests/                        # 📝 Testes automatizados
│   ├── setup.js                 # 🚀 Configuração: inicia/encerra o servidor
│   ├── postCrawl.spec.js        # ✅ Testes do endpoint POST /crawl
│   ├── getCrawl.spec.js         # ✅ Testes do endpoint GET /crawl/{id}
│   ├── validation.spec.js       # ✅ Testes de validação
│   └── concurrency.spec.js      # ✅ Testes de requisições simultâneas
├── helpers/                      # 🛠️ Funções auxiliares reutilizáveis
│   ├── api.js                   # Configuração da URL base
│   ├── generator.js             # Gera dados de teste
│   └── schema.js                # Valida esquemas de resposta
├── reports/                      # 📊 Relatórios de teste
│   ├── mochawesome-report.html  # Relatório visual (gerado)
│   ├── mochawesome-report.json  # Dados JSON do relatório
│   └── assets/                  # Arquivos CSS/JS do relatório
├── package.json                  # 📦 Dependências e scripts
├── README.md                      # 📖 Documentação básica
└── ROADMAP.md                     # 📋 Este arquivo
```

---

## 🔍 Descrição dos Arquivos Principais

### **src/crawlerService.js** - Servidor da API
**O que faz:** Implementa um servidor HTTP que fornece dois endpoints:

1. **POST /crawl** - Inicia uma busca por palavra-chave
   - Recebe: `{ keyword: "palavra" }`
   - Retorna: `{ keyword, found, urls: [], status }`
   - Faz busca case-insensitive em múltiplos sites

2. **GET /crawl/{id}** - Recupera o status de uma busca anterior
   - Retorna o resultado salvo em memória

**Detalhes técnicos:**
- Porta: `4567`
- Mantém um mapa de crawls em memória
- Simula múltiplos sites HTML para busca

---

### **tests/setup.js** - Configuração dos Testes
**O que faz:** Prepara o ambiente de teste

```javascript
- before(): Inicia o servidor antes de todos os testes
- after(): Encerra o servidor após todos os testes
```

Isso garante que o servidor esteja rodando durante a execução dos testes.

---

### **tests/postCrawl.spec.js** - Testes do Endpoint POST /crawl
**O que testa:**
- ✅ Busca com keyword válida
- ✅ Busca case-insensitive (SECURITY = security)
- ✅ Múltiplas buscas simultâneas
- ✅ Busca em HTML com tags (encontra palavras dentro de comentários, divs, etc.)
- ✅ Tratamento de keywords não encontradas

**Exemplo de teste:**
```javascript
it('Deve iniciar uma busca com keyword válida', async () => {
    const response = await api
        .post('/crawl')
        .send({ keyword: 'security' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('found', true);
});
```

---

### **tests/getCrawl.spec.js** - Testes do Endpoint GET /crawl/{id}
**O que testa:**
- ✅ Recuperação de um crawl anterior pelo ID
- ✅ Dados retornados correspondem ao crawl original
- ✅ Tratamento de IDs inválidos

---

### **tests/validation.spec.js** - Testes de Validação
**O que testa:**
- ✅ Validação de payload (keyword obrigatório)
- ✅ Tipos de dados esperados
- ✅ Formato de resposta da API

---

### **tests/concurrency.spec.js** - Testes de Concorrência
**O que testa:**
- ✅ Múltiplas requisições simultâneas
- ✅ Isolamento de dados (cada busca tem seu próprio resultado)
- ✅ Performance sob carga

---

### **helpers/api.js** - Configuração da URL
**O que faz:**
```javascript
module.exports = {
    baseURL: process.env.BASE_URL || 'http://localhost:4567'
}
```
Define a URL base da API (útil para mudar entre ambientes: local, staging, produção).

---

### **helpers/generator.js** - Geração de Dados de Teste
**O que faz:** Cria dados aleatórios ou predefinidos para testes, evitando hardcoding repetitivo.

---

### **helpers/schema.js** - Validação de Esquemas
**O que faz:** Define e valida a estrutura esperada das respostas da API.

---

### **package.json** - Configuração do Projeto
**Scripts disponíveis:**

```bash
npm test              # Executa os testes (sem relatório)
npm run test:report   # Executa os testes e gera relatório HTML
```

**Dependências:**
- `mocha`: Framework de testes
- `chai`: Biblioteca de assertions (expect, assert)
- `supertest`: Testa APIs HTTP
- `mochawesome`: Gera relatórios HTML visual

---

## 🚀 Como Usar o Projeto

### **1️⃣ Instalação**
```bash
npm install
```

### **2️⃣ Executar o Servidor (em desenvolvimento)**
```bash
node src/crawlerService.js
```
Servidor rodará em `http://localhost:4567`

### **3️⃣ Executar os Testes (em outro terminal)**
```bash
npm test
```

**Saída esperada:**
```
  POST /crawl
    ✓ Deve iniciar uma busca com keyword válida
    ✓ Deve fazer busca case insensitive
    ...
    
  32 passing (250ms)
```

### **4️⃣ Gerar Relatório Visual**
```bash
npm run test:report
```

O relatório é salvo em `reports/mochawesome-report.html`  
Abra no navegador para ver:
- ✅ Testes passando
- ❌ Testes falhando
- ⏱️ Tempo de execução
- 📊 Gráficos e estatísticas

---

## 🧪 Fluxo de Testes Explicado

```
1. setup.js inicia (before hook)
   ↓
2. Servidor crawlerService.js escuta na porta 4567
   ↓
3. Testes executam requisições HTTP para o servidor
   ├── POST /crawl → Inicia uma busca
   ├── GET /crawl/{id} → Recupera resultado
   └── Validações → Verifica respostas
   ↓
4. Testes finalizam (after hook)
   ↓
5. Servidor é encerrado
```

---

## 🔗 Fluxo de Dados - POST /crawl

```
Cliente (teste)
    ↓
    → POST /crawl { keyword: "security" }
    ↓
Servidor (crawlerService.js)
    ├── Recebe keyword
    ├── Busca em múltiplos sites HTML
    ├── Encontra em: example.com/index.html, example.com/security.html
    └── Salva resultado em memória com ID único
    ↓
    ← Responde com { id, keyword, found: true, urls: [...], status: "completed" }
    ↓
Cliente (teste)
    ├── Valida status code 200
    ├── Verifica se found = true
    └── Confirma que urls não está vazio
```

---

## 📊 Tipos de Testes Implementados

| Tipo | Arquivo | Propósito |
|------|---------|----------|
| **Testes Básicos** | postCrawl.spec.js | Validar funcionamento principal |
| **Testes de Recuperação** | getCrawl.spec.js | Validar GET de resultados anteriores |
| **Testes de Validação** | validation.spec.js | Validar entrada/saída |
| **Testes de Concorrência** | concurrency.spec.js | Verificar comportamento sob carga |

---

## 🎯 Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **Node.js** | Runtime JavaScript |
| **Mocha** | Framework de testes |
| **Chai** | Assertions e validações |
| **Supertest** | Testes HTTP |
| **Mochawesome** | Relatórios visuais |

---

## ⚙️ Variáveis de Ambiente

```javascript
BASE_URL = process.env.BASE_URL || 'http://localhost:4567'
```

Para mudar a URL da API:
```bash
BASE_URL=https://api.exemplo.com npm test
```

---

## 🔄 Próximos Passos (Melhorias)

1. ✨ Adicionar testes de timeout
2. ✨ Implementar testes de rate limiting
3. ✨ Adicionar testes de segurança (SQL injection, XSS)
4. ✨ Implementar CI/CD (GitHub Actions, Jenkins)
5. ✨ Adicionar cobertura de código (Istanbul/NYC)
6. ✨ Testes de performance/carga (Artillery, k6)

---

## 📞 Troubleshooting

### Erro: "ECONNREFUSED"
- **Problema:** Servidor não está rodando
- **Solução:** Execute `node src/crawlerService.js` em outro terminal

### Erro: "Port 4567 already in use"
- **Problema:** Outra instância do servidor está rodando
- **Solução:** `lsof -i :4567` (Linux/Mac) ou `netstat -ano` (Windows)

### Testes muito lentos
- **Problema:** Servidor sobrecarregado
- **Solução:** Verifique se o servidor está respondendo com `curl http://localhost:4567/health`

---

## 📚 Recursos Adicionais

- [Documentação Mocha](https://mochajs.org/)
- [Documentação Chai](https://www.chaijs.com/)
- [Documentação Supertest](https://github.com/visionmedia/supertest)
- [Node.js HTTP API](https://nodejs.org/api/http.html)

---

**Versão:** 1.0  
**Última atualização:** 2026-07-20  
**Status:** ✅ Projeto funcional
