# 📤 Guia Completo: Como Subir seu Projeto no GitHub

## 🎯 Objetivo
Fazer upload do seu projeto `crawler-api-tests` para o GitHub com MIT License.

---

## ✅ Pré-requisitos

- [ ] Git instalado (verificar: `git --version`)
- [ ] Conta no GitHub (https://github.com/signup)
- [ ] Projeto com LICENSE criado ✅ (já temos!)

---

## 📝 PASSO 1: Verificar Instalação do Git

No terminal PowerShell:

```powershell
git --version
```

**Se mostrar uma versão** (ex: `git version 2.42.0`) → OK! Continue.

**Se disser "comando não encontrado":**
- Baixe em: https://git-scm.com/
- Instale e reinicie o terminal

---

## 👤 PASSO 2: Configurar Git (Primeira Vez)

Execute apenas uma vez:

```powershell
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu.email@gmail.com"
```

**Substitua:**
- `Seu Nome Completo` → ex: "João Silva"
- `seu.email@gmail.com` → seu email real

**Verificar se funcionou:**
```powershell
git config --global user.name
git config --global user.email
```

---

## 🔑 PASSO 3: Criar Token de Autenticação no GitHub

GitHub não aceita mais senha. Você precisa de um **Personal Access Token**.

### 3.1 - Gerar Token

1. Acesse: https://github.com/settings/tokens/new
2. Clique em "Generate new token (classic)"
3. Preencha:
   - **Note:** "Crawler API Tests Push"
   - **Expiration:** 90 days (ou escolha outro período)
   - **Scopes (marque):**
     - ✅ `repo` (acesso completo a repositórios)
     - ✅ `read:user` (ler informações do usuário)

4. Clique em **"Generate token"**

### 3.2 - Copiar o Token

⚠️ **IMPORTANTE:** Copie o token que aparece (formato: `ghp_xxxxx...`)

**NÃO compartilhe este token com ninguém!** É como sua senha.

Salve em lugar seguro (você precisará dele em 5 minutos).

---

## 📦 PASSO 4: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `crawler-api-tests`
   - **Description:** "Testes automatizados para API de web crawler"
   - **Public** ou **Private:** Escolha (public = todos veem, private = só você)
   - **NÃO marque** "Add a README" (já temos)
   - **NÃO marque** "Add .gitignore" (já temos)
   - **NÃO marque** "Choose a license" (já temos MIT)

3. Clique em **"Create repository"**

### Resultado esperado:
Você verá uma página com instruções e uma URL como:
```
https://github.com/SEUUSERNAME/crawler-api-tests.git
```

**Copie esta URL** - você precisará dela no próximo passo.

---

## 🚀 PASSO 5: Inicializar Git Localmente

Abra o terminal PowerShell **na pasta do projeto**:

```powershell
cd C:\crawler-api-tests
```

**Verifique se está na pasta certa:**
```powershell
pwd  # Deve mostrar: C:\crawler-api-tests
ls   # Deve listar os arquivos do projeto
```

---

## 💾 PASSO 6: Inicializar Repositório Git

Execute **na pasta do projeto**:

```powershell
git init
```

**Resultado esperado:**
```
Initialized empty Git repository in C:\crawler-api-tests\.git/
```

---

## 📄 PASSO 7: Adicionar Todos os Arquivos

```powershell
git add .
```

**Verificar o que será adicionado:**
```powershell
git status
```

**Resultado esperado (exemplo):**
```
On branch master

No commits yet

Changes to be committed:
  new file:   .gitignore
  new file:   LICENSE
  new file:   README.md
  new file:   ROADMAP.md
  new file:   package.json
  ...
```

---

## 📝 PASSO 8: Criar Primeiro Commit

```powershell
git commit -m "Initial commit: Crawler API Tests com MIT License e documentação completa"
```

**Resultado esperado:**
```
[master (root-commit) abc1234] Initial commit: Crawler API Tests...
 10 files changed, 1200 insertions(+)
```

---

## 🔗 PASSO 9: Conectar ao Repositório Remoto

Substitua `SEUUSERNAME` pela sua conta GitHub (a URL que copiou no Passo 4):

```powershell
git remote add origin https://github.com/SEUUSERNAME/crawler-api-tests.git
```

**Exemplo real:**
```powershell
git remote add origin https://github.com/joaosilva/crawler-api-tests.git
```

**Verificar se funcionou:**
```powershell
git remote -v
```

**Resultado esperado:**
```
origin  https://github.com/joaosilva/crawler-api-tests.git (fetch)
origin  https://github.com/joaosilva/crawler-api-tests.git (push)
```

---

## 🌳 PASSO 10: Renomear Branch para `main` (Opcional)

GitHub usa `main` como branch padrão, não `master`:

```powershell
git branch -M main
```

---

## ⬆️ PASSO 11: Fazer Push (Enviar para GitHub)

```powershell
git push -u origin main
```

### Se pedir credenciais:

**Opção 1: Usar o Token (Recomendado)**
- **Username:** Sua conta GitHub
- **Password:** Cole o TOKEN que copiou no Passo 3 (não a senha!)

**Resultado esperado:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (12/12), done.
Writing objects: 100% (15/15), 45.23 KiB | 2.26 MiB/s, done.
Total 15 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/joaosilva/crawler-api-tests.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

---

## ✅ PASSO 12: Verificar no GitHub

1. Abra: https://github.com/SEUUSERNAME/crawler-api-tests
2. Você deve ver:
   - ✅ Todos os arquivos do projeto
   - ✅ LICENSE (MIT)
   - ✅ README.md
   - ✅ ROADMAP.md
   - ✅ GUIA_LINHA_POR_LINHA.md
   - ✅ Pasta `src/`
   - ✅ Pasta `tests/`
   - ✅ Pasta `helpers/`

---

## 🔄 Próximos Commits (Para Futuro)

Quando fizer mudanças no projeto:

```powershell
# 1. Ver o que mudou
git status

# 2. Adicionar arquivos
git add .

# 3. Criar commit
git commit -m "Descrição breve da mudança"

# 4. Fazer push
git push origin main
```

---

## 🐛 Troubleshooting

### Erro: "fatal: not a git repository"
**Solução:**
```powershell
cd C:\crawler-api-tests
git init
```

### Erro: "fatal: pathspec 'main' did not match any files"
**Solução:**
```powershell
git branch -M main
git push -u origin main
```

### Erro: "Permission denied (publickey)"
**Solução:** Você está usando SSH. Use HTTPS em vez disso:
```powershell
git remote set-url origin https://github.com/SEUUSERNAME/crawler-api-tests.git
```

### Erro: "Your branch is ahead of 'origin/main' by 1 commit"
**Solução:** Faça push:
```powershell
git push origin main
```

### Erro: "fatal: 'origin' does not appear to be a 'git' repository"
**Solução:** Verifique a URL:
```powershell
git remote -v
git remote set-url origin https://github.com/SEUUSERNAME/crawler-api-tests.git
```

---

## 🎉 Pronto!

Seu projeto está no GitHub! 

Agora você pode:
- ✅ Compartilhar o link
- ✅ Usar como portfólio
- ✅ Colaborar com outras pessoas
- ✅ Ter histórico de versões

---

## 📚 Referências Rápidas

| Comando | O que faz |
|---------|-----------|
| `git status` | Ver estado do repositório |
| `git log` | Ver histórico de commits |
| `git add .` | Adicionar todos os arquivos |
| `git commit -m "msg"` | Criar commit |
| `git push` | Enviar para GitHub |
| `git pull` | Baixar do GitHub |
| `git clone URL` | Clonar repositório |
| `git branch` | Ver branches |
| `git checkout -b novobrach` | Criar novo branch |

---

## 🤝 Links Úteis

- GitHub Docs: https://docs.github.com
- Git Cheat Sheet: https://github.gitcheatsheet.org/
- Markdown Guide: https://www.markdownguide.org/

---

**Sucesso no upload! 🚀**

Se tiver dúvidas, consulte este guia ou acesse a documentação oficial do GitHub.
