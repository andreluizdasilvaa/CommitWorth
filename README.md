# CommitWorth

## Sumário

1. [Descrição Geral](#descrição-geral)
2. [Funcionamento](#funcionamento)
3. [Métricas do Dashboard](#métricas-do-dashboard)
4. [Análise de Stack & Senioridade](#análise-de-stack--senioridade)
5. [Distintivos de Conquista](#distintivos-de-conquista)
6. [Geração de Card Personalizado](#geração-de-card-personalizado)
7. [Contribuição](#contribuição)

---

## 🟢 Descrição Geral

O **CommitWorth** é uma plataforma gamificada que calcula o "valor agregado" do trabalho de desenvolvedores utilizando dados públicos do GitHub. Basta informar um username válido para acessar um dashboard exclusivo com diversas métricas, análise de stack tecnológica, detecção de senioridade e conquistas.

**✨ Principais Funcionalidades:**
- 📊 **Análise completa** de repositórios e atividade no GitHub
- 🎯 **Detecção automática** da stack principal do desenvolvedor
- 🏆 **Classificação de senioridade** em 4 níveis (Junior → Tech Lead)
- 💰 **Cálculo de valor agregado** baseado em contribuições
- 🏅 **Sistema de achievements** com distintivos exclusivos
- 🖼️ **Geração de cards** personalizados para compartilhamento

- **Entrada:** Username do GitHub.
- **Redirecionamento:**
  - Username válido: `/dashboard/<usernick>`
  - Username inválido/inexistente: Página `not-found` com formulário para correção.

---

## ⚙️ Funcionamento

1. O usuário informa seu username do GitHub.
2. O sistema coleta dados públicos via API do GitHub.
3. **As métricas são processadas e a análise de stack é realizada:**
   - Identificação da linguagem/stack principal
   - Cálculo do score de senioridade
   - Análise de indicadores de complexidade
   - Determinação do nível de experiência
4. **Os dados são exibidos no dashboard** com métricas, gráficos e análises.
5. **O usuário pode gerar um card personalizado** com suas conquistas e stack.
6. Caso o username não exista, o usuário pode corrigir e tentar novamente.

---

## 🧠 Métricas do Dashboard

O dashboard apresenta as seguintes métricas:

- **Total de Estrelas:** Soma das estrelas em todos os repositórios públicos.
- **Total de Repositórios:** Quantidade de repositórios públicos.
- **Total de Commits:** Total de commits somados de todos os repositórios.
- **Valor Agregado:** Valor fictício calculado com base na atividade no GitHub.

### Tabela de Valores

| Tipo    | Valor   |
|--------|---------|
| Commit | R$2,00  |
| Estrela| R$0,50  |
| Fork   | R$1,00  |

- **Linguagens mais utilizadas:** Linguagens predominantes nos repositórios.
- **Pontos do usuário:** Calculados conforme critérios abaixo:

| Tipo                      | Pontos |
|---------------------------|--------|
| Commit                    | 1      |
| Estrela                   | 5      |
| Fork                      | 3      |
| Repositório bem estruturado| 10     |

- **Repositórios bem estruturados:** Repositórios que possuem descrição, página inicial e issues habilitadas.
- **Total de Forks:** Soma dos forks dos repositórios públicos.

---

## 🎯 Análise de Stack & Senioridade

O **CommitWorth** possui um sistema inteligente de análise que determina automaticamente a **stack principal** do desenvolvedor e seu **nível de senioridade** baseado em múltiplos fatores.

### 📊 Detecção de Stack Principal

O sistema analisa todos os repositórios públicos e identifica a linguagem mais utilizada, mapeando-a para categorias de stack:

| Linguagem | Stack Identificada |
|-----------|-------------------|
| JavaScript, TypeScript, React, Vue, Angular | Frontend/Fullstack |
| Python | Backend/Data Science |
| Java | Backend/Enterprise |
| C# | Backend/.NET |
| Go | Backend/Cloud |
| Swift | Mobile/iOS |
| Kotlin | Mobile/Android |
| Rust, C++, C | Systems/Performance |
| PHP, Ruby | Backend/Web |
| R, MATLAB | Data Science |
| Shell, Docker | DevOps/Infrastructure |

### 🏆 Níveis de Senioridade

O sistema classifica desenvolvedores em **4 níveis** baseado em um score de 0-100:

#### **Junior (0-34 pontos)**
- Menos de 3 anos de experiência
- Poucos projetos ou sem indicadores de complexidade
- Foco em aprendizado e projetos pessoais

#### **Pleno (35-59 pontos)**
- 3-5 anos de experiência
- Projetos com alguma complexidade
- Início de contribuições colaborativas

#### **Senior (60-79 pontos)**
- 5-8 anos de experiência
- Projetos complexos e bem documentados
- Colaboração ativa e projetos populares

#### **Tech Lead (80-100 pontos)**
- 8+ anos de experiência
- Múltiplos projetos complexos e populares
- Liderança técnica evidente pelos projetos

### 🧮 Cálculo do Score de Senioridade

O score é calculado através de uma fórmula ponderada considerando:

| Fator | Peso | Descrição |
|-------|------|-----------|
| **Anos de Experiência** | 30% | Tempo desde o primeiro repositório da linguagem principal |
| **Número de Repositórios** | 20% | Quantidade de projetos na stack principal |
| **Média de Estrelas** | 20% | Popularidade média dos repositórios |
| **Total de Commits** | 15% | Atividade e consistência no desenvolvimento |
| **Indicadores de Complexidade** | 15% | Projetos colaborativos, bem documentados e populares |

### 🔍 Indicadores de Complexidade

O sistema identifica automaticamente:

- **Projetos Complexos:** Repositórios com 10+ estrelas ou 5+ colaboradores
- **Projetos Colaborativos:** Repositórios com múltiplos contributors
- **Projetos Bem Documentados:** Repos com descrição detalhada, homepage e issues habilitadas

### 📈 Métricas Exibidas

No dashboard, você visualiza:

- **Stack Principal:** Categoria dominante baseada na linguagem mais usada
- **Nível de Senioridade:** Classificação com score detalhado
- **Tempo de Experiência:** Faixa de experiência calculada
- **Top 3 Linguagens:** Ranking com anos de experiência em cada uma
- **Linguagens Dominadas:** Total de linguagens utilizadas

---

## 🏅 Distintivos de Conquista

Os distintivos são desbloqueados conforme critérios específicos:

### 🎯 Achievements Tradicionais
- **Code Warrior:** Mais de 1.000 commits.
- **Império do Código:** Mais de 50 repositórios.
- **Arquiteto do GitHub:** 10 ou mais linguagens diferentes utilizadas.
- **Estrela do GitHub:** Mais de 100 estrelas.
- **Projeto de Ouro:** Possuir ao menos 1 repositório com mais de 500 estrelas.
- **Veterano do Código:** Conta com mais de 10 anos de GitHub.
- **GitHub Old School:** Conta com mais de 5 anos de existência.

### 🚀 Achievements de Stack & Senioridade
- **Especialista de Stack:** Score de senioridade 70+ na stack principal.
- **Líder Técnico:** Atingir o nível Tech Lead de senioridade.
- **Desenvolvedor Sênior:** Alcançar o nível Sênior ou superior.
- **Poliglota:** Dominar 15 ou mais linguagens de programação.

---

## 🖼️ Geração de Card Personalizado

Na parte inferior do dashboard, há um botão para gerar uma imagem personalizada contendo:

- Nome do usuário
- Username
- Foto do GitHub
- Valor agregado
- Total de commits
- Total de pontos
- Distintivos conquistados
- **Stack principal**
- **Nível de senioridade com score**
- **Tempo de experiência**
- **Número de linguagens dominadas**

**Funcionalidades:**
- Download automático da imagem.
- Compartilhamento direto no LinkedIn via modal com botão.
- **Novo:** Informações de stack e senioridade para destacar expertise técnica.

---

## 🚀 Como Testar

Para testar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/leticiaviana/CommitWorth.git
   cd CommitWorth
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o token do GitHub:**
   - Crie um arquivo `.env.local`
   - Adicione: `GITHUB_TOKEN_FOR_REQUESTS=seu_token_aqui`
   - Obtenha seu token em: https://github.com/settings/tokens

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```

5. **Acesse:** http://localhost:3000

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Styling:** TailwindCSS 4 + CSS personalizado
- **API:** GraphQL + GitHub API
- **Gráficos:** Recharts
- **UI Components:** Radix UI + Lucide React
- **3D Effects:** OGL
- **Geração de Imagens:** html-to-image

---

## 🤝 Contribuição

Qualquer desenvolvedor pode contribuir com o projeto. Para isso:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção.
3. Envie um pull request detalhando sua proposta.

**Sugestões de melhoria, correções e novas métricas são bem-vindas!**

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
