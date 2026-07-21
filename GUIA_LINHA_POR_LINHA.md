# 📚 Guia Completo: Entendendo o Código Linha por Linha
## Para QA Junior - Sem Conhecimento de Programação

---

## 🎓 Introdução: O que é Teste Automatizado?

### Teste Manual vs Teste Automatizado

**Teste Manual (o que você provavelmente faz hoje):**
```
1. Abrir navegador
2. Acessar http://localhost:4567/crawl
3. Digitar "security" no formulário
4. Clicar no botão "Buscar"
5. Verificar se aparece "Found: true" na tela
6. Anotar o resultado em um Excel
7. Repetir para 50 palavras diferentes 😫
```

**Teste Automatizado (o que este projeto faz):**
```
1. Escrever código que AUTOMATICAMENTE faz tudo isso
2. Código executa em 5 segundos ⚡
3. Gera relatório visual
4. Roda todos os dias automaticamente
```

---

# 🛠️ PARTE 1: Entendendo o Servidor (crawlerService.js)

O servidor é como um "garçom" que recebe pedidos (requisições) e devolve respostas.

## Linha por Linha

### **Linha 1: Importar o módulo HTTP**
```javascript
const http = require('http');
```

**O que significa:**
- `const` = Declarar uma variável (não pode mudar depois)
- `http` = Nome da variável que vai guardar o módulo
- `require('http')` = "Me dá o módulo 'http'" do Node.js
- `http` é uma biblioteca que permite criar servidores web

**Analogia:** Você está pegando um "kit para fazer um servidor" da loja de ferramentas do Node.js.

---

### **Linha 3: Definir a porta**
```javascript
const port = 4567;
```

**O que significa:**
- Definir em qual "porta" o servidor vai escutar
- Porta é como um número de telefone para o servidor
- Quando você faz uma requisição para `http://localhost:4567`, está ligando para a porta 4567

**Analogia:** Uma porta é como um "número de sala". Servidor na porta 80 é a "sala 80", porta 4567 é a "sala 4567".

---

### **Linhas 5-13: Criar HTML fictício (dummy)**
```javascript
const dummyHtml = `<!doctype html>
<html>
  <head><title>Test Page</title></head>
  <body>
    <h1>Security in HTML</h1>
    <!-- This is a hidden COMMENT containing secret -->
    <div class="content">Some text about CRAWL and search.</div>
  </body>
</html>`;
```

**O que significa:**
- Criamos um HTML "fake" (fictício) para simular uma página web real
- Usamos as aspas "backtick" (`) para poder escrever múltiplas linhas
- Dentro deste HTML temos:
  - `<h1>Security in HTML</h1>` - Título com a palavra "Security"
  - `<!-- comentário -->` - Comentário HTML que também contém "secret"
  - `<div>Some text about CRAWL and search</div>` - Conteúdo com "CRAWL"

**Por que fazer isso?** 
Para testar se o buscador encontra palavras em diferentes partes da página (título, comentários, conteúdo).

---

### **Linhas 15-22: Criar função para enviar JSON**
```javascript
const sendJson = (res, statusCode, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
};
```

**O que significa:**

`const sendJson = (res, statusCode, payload) => { ... }`
- Criamos uma função chamada `sendJson`
- `(res, statusCode, payload)` são os parâmetros (informações que passamos)
  - `res` = resposta (o que devolvemos ao cliente)
  - `statusCode` = código da resposta (200 = OK, 400 = erro, etc.)
  - `payload` = dados que enviaremos (o JSON)

`const body = JSON.stringify(payload);`
- `JSON.stringify()` converte um objeto JavaScript em texto JSON
- **Exemplo:** 
  ```javascript
  { found: true, urls: [] }  // Objeto JavaScript
  "{"found":true,"urls":[]}"  // Texto JSON (depois de stringify)
  ```

`res.writeHead(statusCode, { ... })`
- Escrever o "cabeçalho" (header) da resposta
- `Content-Type: application/json` = "Estou enviando um JSON"
- `Content-Length` = tamanho em bytes do que vou enviar

`res.end(body);`
- Finalizar a resposta e enviar o JSON

**Analogia:** Esta função é como uma "máquina de empacotar": você coloca os dados e ela cria um pacote JSON pronto para enviar.

---

### **Linha 24: Criar mapa de crawls**
```javascript
const crawls = new Map();
```

**O que significa:**
- `Map()` é como um "dicionário" ou "tabela" que guarda dados
- Usaremos para guardar cada busca que foi feita
- Cada busca terá um ID único como "chave"

**Analogia:** Como um fichário:
```
ID: "abc123" → { keyword: "security", found: true, urls: [...] }
ID: "def456" → { keyword: "network", found: false, urls: [...] }
```

---

### **Linhas 26-44: Criar mapa de sites para buscar**
```javascript
const sitePages = new Map([
  ['https://example.com/index.html', `<!doctype html>...`],
  ['https://example.com/about.html', `<!doctype html>...`],
  ['https://example.com/contact.html', `<!doctype html>...`]
]);
```

**O que significa:**
- `Map([...])` = criar um mapa com dados iniciais
- Cada item é um par: `[URL, conteúdo HTML]`
- Simulamos 3 páginas web diferentes

**Estrutura:**
```javascript
[
  ['URL da página 1', 'HTML da página 1'],
  ['URL da página 2', 'HTML da página 2'],
  ['URL da página 3', 'HTML da página 3']
]
```

**Por que?** Para simular buscas em múltiplos sites, como um web crawler real faria.

---

### **Linhas 46-51: Função para extrair ID da URL**
```javascript
const getIdFromUrl = (url) => {
  if (!url.startsWith('/crawl/')) {
    return null;
  }
  return url.slice('/crawl/'.length);
};
```

**O que significa:**

`if (!url.startsWith('/crawl/'))` 
- `startsWith()` = começa com?
- `!` = NÃO
- Se a URL NÃO começa com `/crawl/`, retornar nulo

**Exemplo:**
```javascript
url = "/crawl/abc123"  → startsWith('/crawl/') = true
url = "/health"        → startsWith('/crawl/') = false
```

`return url.slice('/crawl/'.length);`
- `.slice()` = "fatiar" ou "cortar" a string
- `'/crawl/'.length` = tamanho de "/crawl/" (7 caracteres)
- Remove os primeiros 7 caracteres

**Exemplo:**
```javascript
url = "/crawl/abc123"
url.slice(7)  // Remove "/crawl/" e fica "abc123"
```

---

### **Linhas 53-100: Criar servidor HTTP**
```javascript
const server = http.createServer((req, res) => {
  // Código aqui dentro executa para CADA requisição
});
```

**O que significa:**
- `http.createServer()` = Criar um servidor HTTP
- `(req, res) => { }` = Função que executa para cada requisição
  - `req` = requisição (o que o cliente pede)
  - `res` = resposta (o que devolvemos)

**Analogia:** É como um restaurante. Para cada cliente que chega (requisição), o garçom (nossa função) atende e devolve a comida (resposta).

---

### **Linhas 54-55: Verificar se é POST para /crawl**
```javascript
if (req.method === 'POST' && req.url === '/crawl') {
  // Código do endpoint POST /crawl
}
```

**O que significa:**
- `req.method === 'POST'` = verificar se é uma requisição POST
- `req.url === '/crawl'` = verificar se a URL é exatamente "/crawl"
- Se AMBAS forem verdadeiras, entrar neste bloco

**Métodos HTTP (os mais comuns):**
- `GET` = buscar informações
- `POST` = enviar informações
- `PUT` = atualizar informações
- `DELETE` = deletar informações

---

### **Linhas 56-62: Receber dados do cliente**
```javascript
let rawData = '';
req.on('data', (chunk) => {
  rawData += chunk;
});

req.on('end', () => {
  // Dados recebidos completos
});
```

**O que significa:**
- `let rawData = ''` = variável que pode mudar (diferente de `const`)
- `req.on('data', ...)` = "quando dados chegarem..."
- `chunk` = pedaço de dados (podem chegar em várias partes)
- `rawData += chunk` = adicionar cada chunk ao rawData
- `req.on('end', ...)` = "quando todos os dados chegarem..."

**Analogia:** Como receber uma carta que chega em envelopes diferentes. Aguardamos até todos os envelopes chegarem.

---

### **Linhas 63-68: Validar JSON**
```javascript
let data;
try {
  data = JSON.parse(rawData || '{}');
} catch {
  sendJson(res, 400, { error: 'Invalid JSON' });
  return;
}
```

**O que significa:**
- `JSON.parse()` = converter texto JSON em objeto JavaScript
- `try { } catch { }` = tentar fazer algo, e se der erro, fazer outra coisa
- `rawData || '{}'` = se rawData for vazio, usar "{}" (JSON vazio)

**Exemplo:**
```javascript
JSON.parse('{"keyword":"security"}')  // Converte em objeto
→ { keyword: 'security' }

JSON.parse('isso não é JSON')  // ERRO! → catch ativa
→ Enviar 400 (erro) ao cliente
```

---

### **Linhas 69-74: Validar keyword**
```javascript
const { keyword } = data;
if (!keyword || typeof keyword !== 'string' || keyword.length < 4 || keyword.length > 32) {
  sendJson(res, 400, { error: 'keyword must be between 4 and 32 characters' });
  return;
}
```

**O que significa:**

`const { keyword } = data;`
- "Desestruturação" = extrair a propriedade `keyword` do objeto `data`
- Equivalente a: `const keyword = data.keyword;`

`if (!keyword || typeof keyword !== 'string' || keyword.length < 4 || keyword.length > 32)`
- `!keyword` = keyword vazio/nulo?
- `typeof keyword !== 'string'` = keyword não é texto?
- `keyword.length < 4` = tem menos de 4 caracteres?
- `keyword.length > 32` = tem mais de 32 caracteres?
- Se QUALQUER uma dessas for verdadeira, é erro!

**Exemplo de validação:**
```javascript
{ keyword: "" }           // ❌ Vazio
{ keyword: 123 }         // ❌ Número, não texto
{ keyword: "abc" }       // ❌ 3 caracteres (menos que 4)
{ keyword: "a".repeat(50) }  // ❌ 50 caracteres (mais que 32)
{ keyword: "security" }  // ✅ Válido!
```

---

### **Linhas 75-85: Buscar keyword em todas as páginas**
```javascript
const keywordLower = keyword.toLowerCase();
const urls = [];
for (const [url, html] of sitePages.entries()) {
  if (html.toLowerCase().includes(keywordLower)) {
    urls.push(url);
  }
}
```

**O que significa:**

`const keywordLower = keyword.toLowerCase();`
- `.toLowerCase()` = converter para minúsculas
- **Exemplo:** "SECURITY" → "security"
- Isso permite busca case-insensitive

`const urls = [];`
- Array vazio para guardar URLs encontradas

`for (const [url, html] of sitePages.entries())`
- Loop que vai para cada página em `sitePages`
- Pega `url` e `html` de cada página

`if (html.toLowerCase().includes(keywordLower))`
- Converter HTML para minúsculas
- `.includes()` = contém?
- Se a página contém a palavra, adicionar à lista

`urls.push(url);`
- `.push()` = adicionar ao final do array

**Exemplo completo:**
```javascript
keyword = "SECURITY"
keywordLower = "security"

sitePages:
  "page1.html" contém "Security in HTML" → toLowerCase → "security" contém "security"? ✅ Adicionar
  "page2.html" contém "Contact page"     → toLowerCase → "contact page" contém "security"? ❌ Pular
  
Resultado: urls = ["page1.html"]
```

---

### **Linhas 86-93: Criar resultado da busca**
```javascript
const id = Math.random().toString(36).slice(2, 10).padEnd(8, '0');
const crawl = {
  id,
  keyword,
  status: 'completed',
  found: urls.length > 0,
  urls,
};
```

**O que significa:**

`Math.random().toString(36).slice(2, 10).padEnd(8, '0');`
- `Math.random()` = número aleatório entre 0 e 1 (ex: 0.123456789)
- `.toString(36)` = converter para base 36 (números e letras)
- `.slice(2, 10)` = pegar caracteres do índice 2 ao 10
- `.padEnd(8, '0')` = garantir que tem 8 caracteres, preenchendo com "0" se necessário
- **Resultado:** String aleatória como "abc123xy"

`const crawl = { id, keyword, status: 'completed', found: urls.length > 0, urls }`
- Criar objeto com resultado da busca
- `found: urls.length > 0` = se encontrou algo, true; senão false
- `urls` = lista de URLs encontradas

**Exemplo de resposta:**
```javascript
{
  id: "abc123xy",
  keyword: "security",
  status: "completed",
  found: true,
  urls: ["page1.html", "page2.html"]
}
```

---

### **Linhas 94-96: Salvar e enviar resultado**
```javascript
crawls.set(id, crawl);
sendJson(res, 200, crawl);
```

**O que significa:**
- `crawls.set(id, crawl)` = guardar o resultado no "fichário" (Map)
- `sendJson(res, 200, crawl)` = enviar resposta com status 200 (OK) e o JSON

---

### **Linhas 98-119: Tratar GET /crawl/{id}**
```javascript
if (req.method === 'GET') {
  const id = getIdFromUrl(req.url);
  if (!id) {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }
  
  if (id.length > 32) {
    sendJson(res, 400, { error: 'id cannot exceed 32 characters' });
    return;
  }
  
  const crawl = crawls.get(id);
  if (!crawl) {
    sendJson(res, 404, { error: 'Crawl not found' });
    return;
  }
  
  sendJson(res, 200, crawl);
  return;
}
```

**O que significa:**

Tratamento da requisição GET para recuperar uma busca anterior.

`const id = getIdFromUrl(req.url);`
- Extrair ID da URL (ex: "/crawl/abc123" → "abc123")

`if (!id) { sendJson(res, 404, ...) }`
- Se não conseguir extrair ID, retornar 404 (não encontrado)

`if (id.length > 32) { sendJson(res, 400, ...) }`
- Se ID é muito longo, retornar 400 (requisição inválida)

`const crawl = crawls.get(id);`
- Buscar no "fichário" o resultado com esse ID

`if (!crawl) { sendJson(res, 404, ...) }`
- Se não achou o resultado, retornar 404

`sendJson(res, 200, crawl);`
- Se tudo OK, retornar o resultado com status 200

---

### **Linhas 125-130: Iniciar servidor**
```javascript
if (require.main === module) {
  server.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

module.exports = server;
```

**O que significa:**

`if (require.main === module)`
- "Executar este bloco apenas se este arquivo foi executado diretamente"
- Se foi importado por outro arquivo, pular

`server.listen(port, ...)`
- Colocar o servidor para escutar na porta 4567

`console.log(...)`
- Imprimir mensagem no terminal

`module.exports = server;`
- Exportar o servidor para que outros arquivos usem

---

# 🧪 PARTE 2: Entendendo os Testes (tests/)

Agora vamos entender como escrevemos os testes automatizados.

## setup.js - Preparar o Ambiente

```javascript
const server = require('../src/crawlerService');

before((done) => {
  server.listen(4567, done);
});

after((done) => {
  server.close(done);
});
```

**O que significa:**

`const server = require('../src/crawlerService');`
- Importar o servidor que criamos

`before((done) => { ... })`
- Hook que executa ANTES de todos os testes
- `done` = callback que avisa quando terminou

`server.listen(4567, done);`
- Iniciar o servidor na porta 4567
- Quando terminar, chamar `done()`

`after((done) => { ... })`
- Hook que executa DEPOIS de todos os testes

`server.close(done);`
- Fechar o servidor

**Analogia:** É como preparar um restaurante:
- **before** = Abrir o restaurante, ligar as luzes, preparer a cozinha
- Testes = Atender clientes
- **after** = Fechar o restaurante, desligar tudo

---

## postCrawl.spec.js - Testes do Endpoint POST

```javascript
const request = require('supertest');
const { expect } = require('chai');

const api = request('http://localhost:4567');

describe('POST /crawl', () => {
  // Testes aqui
});
```

**O que significa:**

`const request = require('supertest');`
- `supertest` = biblioteca para fazer requisições HTTP
- Permite fazer requisições como se fosse um navegador

`const { expect } = require('chai');`
- `chai` = biblioteca de "assertions" (afirmações)
- `expect` = função para fazer afirmações como "espero que isso seja verdadeiro"

`const api = request('http://localhost:4567');`
- Criar objeto `api` que faz requisições para localhost:4567

`describe('POST /crawl', () => { ... })`
- Agrupar testes relacionados ao POST /crawl
- "Describe" = descrever um grupo de testes

---

### **Teste 1: Busca com keyword válida**

```javascript
it('Deve iniciar uma busca com keyword válida', async () => {
  const response = await api
    .post('/crawl')
    .send({ keyword: 'security' });

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('keyword', 'security');
  expect(response.body).to.have.property('found', true);
  expect(response.body.urls).to.be.an('array').that.is.not.empty;
});
```

**Linha por linha:**

`it('Deve iniciar uma busca com keyword válida', async () => { ... })`
- `it` = criar um teste
- String = descrição do teste
- `async` = código assincrono (pode ter `await`)

`const response = await api.post('/crawl').send({ keyword: 'security' });`
- Fazer uma requisição POST para /crawl
- Enviar JSON com keyword
- `await` = aguardar a resposta
- Guardar resposta na variável

`expect(response.status).to.equal(200);`
- Afirmar que o status HTTP é 200 (OK)
- Se for diferente, teste falha ❌

**Decodificando o expect:**
```javascript
expect(resposta.status)    // Estou afirmando sobre: o status da resposta
.to.equal(200)             // Deve ser igual a: 200
```

`expect(response.body).to.have.property('keyword', 'security');`
- Afirmar que a resposta tem propriedade 'keyword'
- E essa propriedade é exatamente 'security'

`expect(response.body).to.have.property('found', true);`
- Afirmar que a resposta tem propriedade 'found'
- E essa propriedade é exatamente true

`expect(response.body.urls).to.be.an('array').that.is.not.empty;`
- Afirmar que urls é um array
- E esse array não é vazio (tem pelo menos 1 item)

**Analogia:** É como fazer perguntas:
```
Pergunta 1: "O status é 200?" 
Pergunta 2: "Tem a propriedade 'keyword'?" 
Pergunta 3: "Tem a propriedade 'found'?"
Pergunta 4: "Urls é um array não vazio?"

Se TODAS as perguntas receberem SIM, o teste PASSA ✅
Se QUALQUER pergunta receber NÃO, o teste FALHA ❌
```

---

### **Teste 2: Busca case-insensitive**

```javascript
it('Deve fazer busca case insensitive dentro do HTML', async () => {
  const response = await api
    .post('/crawl')
    .send({ keyword: 'SECRET' });

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('keyword', 'SECRET');
  expect(response.body).to.have.property('found', true);
  expect(response.body.urls).to.be.an('array').that.is.not.empty;
});
```

**O que testa:**
- Enviar "SECRET" (maiúsculas)
- Esperamos que encontre "Security" (no HTML está com maiúsculas e minúsculas diferentes)
- Deve retornar found: true

**Por quê?** Para garantir que a busca funciona independente de maiúsculas/minúsculas.

---

### **Teste 3: Múltiplas buscas simultâneas**

```javascript
it('Deve executar múltiplas buscas simultaneamente', async () => {
  const requests = [
    api.post('/crawl').send({ keyword: 'security' }),
    api.post('/crawl').send({ keyword: 'network' }),
    api.post('/crawl').send({ keyword: 'firewall' })
  ];

  const responses = await Promise.all(requests);

  expect(responses).to.have.length(3);
  responses.forEach((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('keyword');
  });
});
```

**Linha por linha:**

`const requests = [ ... ]`
- Criar um array com 3 requisições
- Não executamos ainda, só criamos

`const responses = await Promise.all(requests);`
- `Promise.all()` = executar TODAS as requisições ao mesmo tempo
- `await` = esperar todas terminarem
- Depois guardar as respostas

`expect(responses).to.have.length(3);`
- Afirmar que recebemos 3 respostas

`responses.forEach((response) => { ... })`
- Loop para cada resposta

`expect(response.status).to.equal(200);`
- Verificar que cada uma tem status 200

`expect(response.body).to.have.property('keyword');`
- Verificar que cada uma tem propriedade 'keyword'

**Por quê?** Para garantir que o servidor consegue processar múltiplas requisições ao mesmo tempo sem causar problemas.

---

## getCrawl.spec.js - Testes do Endpoint GET

```javascript
const request = require("supertest");
const { expect } = require("chai");
const api = require("../helpers/api");

describe("GET /crawl/{id}", () => {

  let id;

  before(async () => {
    const response = await request(api.baseURL)
      .post("/crawl")
      .send({ keyword: "security" });
    
    id = response.body.id;
  });

  it("Consultar busca", async () => {
    const response = await request(api.baseURL)
      .get(`/crawl/${id}`);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(id);
    expect(response.body.urls).to.be.an("array");
  });
});
```

**O que significa:**

`let id;`
- Variável que será usada por múltiplos testes
- `let` = pode mudar (diferente de `const`)

`before(async () => { ... })`
- Executa antes deste describe
- Fazer uma busca POST para ter um ID
- Guardar o ID na variável `id`

`const response = await request(api.baseURL).get(\`/crawl/${id}\`);`
- Fazer requisição GET
- URL é `/crawl/` + o ID que salvamos
- \` (backtick) permite inserir variáveis com ${}

`expect(response.body.id).to.equal(id);`
- Afirmar que o ID retornado é igual ao ID que pedimos

**Por quê?** Para garantir que podemos recuperar uma busca anterior pelo ID.

---

## validation.spec.js - Testes de Validação

```javascript
const request = require("supertest");
const { expect } = require("chai");
const api = require("../helpers/api");
const generator = require("../helpers/generator");

describe("Validação da Keyword", () => {

  it("Keyword menor que 4 caracteres", async () => {
    const response = await request(api.baseURL)
      .post("/crawl")
      .send({ keyword: generator.keywordPequena() });

    expect(response.status).to.equal(400);
  });

  it("Keyword maior que 32 caracteres", async () => {
    const response = await request(api.baseURL)
      .post("/crawl")
      .send({ keyword: generator.keywordGrande() });

    expect(response.status).to.equal(400);
  });
});
```

**O que significa:**

`const generator = require("../helpers/generator");`
- Importar funções que geram dados de teste

`generator.keywordPequena()`
- Gera uma keyword com menos de 4 caracteres
- Para testar se a API rejeita

`expect(response.status).to.equal(400);`
- Afirmar que o servidor retornou erro 400
- (requisição inválida)

**Por quê?** Para garantir que o servidor valida corretamente as entradas.

---

# 📊 PARTE 3: Fluxo Completo - Do Teste até o Resultado

## O que acontece quando você roda `npm test`

```
┌─────────────────────────────────────────────────────────┐
│ 1. Terminal: npm test                                   │
│    ↓                                                     │
│ 2. Mocha lê o arquivo setup.js                          │
│    ↓                                                     │
│ 3. Hook "before" executa                                │
│    └─→ server.listen(4567)                              │
│    └─→ Servidor inicia ✅                               │
│    ↓                                                     │
│ 4. Teste 1: "Deve iniciar uma busca..."                 │
│    └─→ api.post('/crawl').send({ keyword: 'security' })│
│    └─→ Cliente faz requisição HTTP                      │
│    └─→ Servidor recebe POST /crawl                      │
│    └─→ Servidor valida keyword                          │
│    └─→ Servidor busca em 3 páginas HTML                 │
│    └─→ Encontra em 2 páginas                            │
│    └─→ Servidor retorna: { id, keyword, found, urls }  │
│    └─→ Teste faz 4 expect()                             │
│    └─→ Teste PASSA ✅                                    │
│    ↓                                                     │
│ 5. Teste 2: "Deve fazer busca case insensitive..."      │
│    └─→ Mesmo processo                                   │
│    └─→ Teste PASSA ✅                                    │
│    ↓                                                     │
│ 6. Teste 3: "Deve executar múltiplas buscas..."         │
│    └─→ 3 requisições simultâneas                        │
│    └─→ Servidor processa todas                          │
│    └─→ Teste PASSA ✅                                    │
│    ↓                                                     │
│ 7. ... outros testes ...                                │
│    ↓                                                     │
│ 8. Hook "after" executa                                 │
│    └─→ server.close()                                   │
│    └─→ Servidor encerra ✅                              │
│    ↓                                                     │
│ 9. Resultado final:                                      │
│    ✅ 12 passing (250ms)                                 │
│    └─→ Todos os testes PASSARAM!                        │
└─────────────────────────────────────────────────────────┘
```

---

# 🎯 Resumo: Conceitos-Chave para QA

## 1. **Servidor vs Cliente**
- **Servidor:** Código em crawlerService.js - recebe requisições e devolve respostas
- **Cliente:** Código nos testes - faz requisições e valida respostas

## 2. **Requisições HTTP**
- **POST /crawl:** Enviar dados (keyword) e receber resultado
- **GET /crawl/{id}:** Buscar resultado anterior pelo ID

## 3. **Ciclo de um Teste**
```
1. Fazer requisição
2. Receber resposta
3. Fazer múltiplas verificações (expect)
4. Se todas passar → Teste passa ✅
5. Se qualquer falhar → Teste falha ❌
```

## 4. **Validação**
- keyword obrigatório
- keyword entre 4 e 32 caracteres
- keyword deve ser texto
- Busca case-insensitive

## 5. **Resposta da API**
```javascript
{
  id: "abc123",           // ID único
  keyword: "security",    // Palavra buscada
  status: "completed",    // Status da busca
  found: true,            // Encontrou?
  urls: ["url1", "url2"]  // URLs encontradas
}
```

---

# 🔗 Conexão com Testes Manuais

**Teste Manual:**
```
1. Abrir browser
2. Ir para http://localhost:4567/
3. Digitar "security"
4. Clicar "Buscar"
5. Ver resultado
6. Anotar SIM/NÃO
```

**Teste Automatizado:**
```javascript
it('Deve iniciar uma busca com keyword válida', async () => {
  const response = await api.post('/crawl').send({ keyword: 'security' });
  expect(response.status).to.equal(200);  // Passo 5
  expect(response.body.found).to.equal(true);  // Passo 6
});
```

**Vantagens:**
- ✅ Automático - roda sozinho
- ✅ Rápido - 250ms vs 5 minutos manuais
- ✅ Repetível - sempre igual
- ✅ Sem erros - não erra na anotação
- ✅ Relatório - gera automaticamente

---

# 📚 Glossário de Termos

| Termo | Significado | Exemplo |
|-------|-------------|---------|
| **const** | Variável que não muda | `const port = 4567;` |
| **let** | Variável que pode mudar | `let data = '';` |
| **function** | Bloco de código reutilizável | `function sendJson() { }` |
| **async** | Código assincrono (espera respostas) | `async () => { }` |
| **await** | Aguardar uma promessa | `await response;` |
| **Map** | Tipo de dado como dicionário | `new Map();` |
| **Array** | Lista de itens | `[1, 2, 3]` |
| **Object** | Conjunto de propriedades | `{ name: 'John' }` |
| **JSON** | Formato de dados texto | `"{"key":"value"}"` |
| **HTTP** | Protocolo da web | GET, POST, PUT, DELETE |
| **Status Code** | Número que indica resultado | 200=OK, 400=erro, 404=não encontrado |
| **Query** | Informações na URL | `/crawl?id=123` |
| **Body** | Dados no corpo da requisição | `{ keyword: 'security' }` |
| **Callback** | Função que executa depois | `req.on('data', callback)` |
| **Promise** | Resultado futuro | `Promise.all(requests)` |
| **describe** | Agrupar testes | `describe('POST /crawl', () => { })` |
| **it** | Criar um teste | `it('Deve fazer X', () => { })` |
| **expect** | Fazer uma afirmação | `expect(x).to.equal(y)` |
| **before/after** | Hooks antes/depois de testes | `before(() => { })` |

---

# 🎓 Próximas Etapas para Aprender

1. **Entender padrão HTTP:**
   - Métodos: GET, POST, PUT, DELETE
   - Status codes: 200, 201, 400, 404, 500
   - Headers: Content-Type, Authorization

2. **Aprender JavaScript básico:**
   - Variáveis (const, let, var)
   - Tipos de dados (string, number, boolean, object)
   - Arrays e loops
   - Funções

3. **Praticar com este projeto:**
   - Adicionar novos testes
   - Modificar validações
   - Criar novos endpoints

4. **Estudar Mocha e Chai:**
   - Diferentes tipos de expect
   - Hooks (before, after, beforeEach, afterEach)
   - Timeouts e retries

5. **Adicionar coverage:**
   - Medir quantas linhas do código são testadas
   - Almejar 80%+ de cobertura

---

**Agora você entende linha por linha como funciona este projeto de teste automatizado! 🚀**

*Qualquer dúvida, releia este guia focando na seção relevante.*
