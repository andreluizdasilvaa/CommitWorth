# CommitWorth

## Sumário

1. [Descrição Geral](#descrição-geral)
2. [Funcionamento](#funcionamento)
3. [Métricas do Dashboard](#métricas-do-dashboard)
4. [Distintivos de Conquista](#distintivos-de-conquista)
5. [Geração de Card Personalizado](#geração-de-card-personalizado)
6. [Contribuição](#contribuição)

---

## 🟢 Descrição Geral

O **CommitWorth** é uma plataforma gamificada que calcula o "valor agregado" do trabalho de desenvolvedores utilizando dados públicos do GitHub. Basta informar um username válido para acessar um dashboard exclusivo com diversas métricas e conquistas.

- **Entrada:** Username do GitHub.
- **Redirecionamento:**
  - Username válido: `/dashboard/<usernick>`
  - Username inválido/inexistente: Página `not-found` com formulário para correção.

---

## ⚙️ Funcionamento

1. O usuário informa seu username do GitHub.
2. O sistema coleta dados públicos via API do GitHub.
3. As métricas são processadas e exibidas no dashboard.
4. Caso o username não exista, o usuário pode corrigir e tentar novamente.

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
| Commit | R$0,02  |
| Estrela| R$0,50  |
| Fork   | R$0,30  |

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

## 🏅 Distintivos de Conquista

Os distintivos são desbloqueados conforme critérios específicos:

- **Code Warrior:** Mais de 1.000 commits.
- **Império do Código:** Mais de 50 repositórios.
- **Arquiteto do GitHub:** 10 ou mais linguagens diferentes utilizadas.
- **Estrela do GitHub:** Mais de 100 estrelas.
- **Projeto de Ouro:** Possuir ao menos 1 repositório com mais de 500 estrelas.
- **Veterano do Código:** Conta com mais de 10 anos de GitHub.
- **GitHub Old School:** Conta com mais de 5 anos de existência.

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

**Funcionalidades:**
- Download automático da imagem.
- Compartilhamento direto no LinkedIn via modal com botão.

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
