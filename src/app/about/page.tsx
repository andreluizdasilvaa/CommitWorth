import { Container } from "@/components/container";
import { Header } from "@/components/header";

export default function About() {
    return (
        <>
            <Header />
            <Container>
                <div
                    className="mx-auto py-10 px-6 rounded-2xl shadow-lg"
                    style={{
                        background: 'var(--color-primaryblue, #1D2D44)',
                        color: 'var(--color-primarybege, #F0EBD8)',
                        border: '1.5px solid var(--color-primarylightblue, #748CAB)',
                    }}
                >
                    <h1 className="text-4xl font-lalezar mb-4 text-primarybege tracking-tight">Sobre o <span className="text-primarylightblue">CommitWorth</span></h1>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Visão Geral do Projeto</h2>
                        <p className="leading-relaxed">
                            O <b className="text-secondaryyellow">CommitWorth</b> é uma plataforma gamificada que calcula o "valor agregado" e outras informações do trabalho de desenvolvedores a partir de dados públicos do GitHub. Basta informar um username válido para acessar um dashboard exclusivo com métricas, análise de stack, detecção de senioridade e conquistas.
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Objetivo</h2>
                        <p className="leading-relaxed">
                            O objetivo do CommitWorth é valorizar e dar visibilidade ao esforço de desenvolvedores, traduzindo sua atividade no GitHub em números, conquistas e um card compartilhável. A plataforma incentiva o crescimento técnico, a colaboração e a construção de um portfólio público relevante.
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Funcionamento</h2>
                        <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>O usuário informa seu username do GitHub.</li>
                            <li>O sistema coleta dados públicos via API do GitHub.</li>
                            <li>As métricas são processadas e a análise de stack é realizada:
                                <ul className="list-disc list-inside ml-6 mt-1">
                                    <li>Identificação da linguagem/stack principal</li>
                                    <li>Cálculo do score de senioridade</li>
                                    <li>Análise de indicadores de complexidade</li>
                                    <li>Determinação do nível de experiência</li>
                                </ul>
                            </li>
                            <li>Os dados são exibidos no dashboard com gráficos e análises.</li>
                            <li>O usuário pode gerar um card personalizado com suas conquistas e stack.</li>
                        </ol>
                        <div className="bg-primarydark text-primarybege rounded-lg px-4 py-2 mt-4 border border-primarylightblue">
                            <b className="text-secondaryyellow">Atenção:</b> Todos os cálculos são realizados a partir de <b>apenas 1 requisição</b> que busca os <b>100 primeiros repositórios</b> públicos do usuário no GitHub. Se você possui mais de 100 repositórios, os dados exibidos podem não refletir todo o seu histórico. Estamos trabalhando para ampliar esse limite em versões futuras!
                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Dados Consultados e Calculados</h2>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li><b className="text-secondaryyellow">Total de Estrelas:</b> Soma das estrelas em todos os repositórios públicos.</li>
                            <li><b className="text-secondaryyellow">Total de Repositórios:</b> Quantidade de repositórios públicos (excluindo forks).</li>
                            <li><b className="text-secondaryyellow">Total de Commits:</b> Soma dos commits em todos os repositórios.</li>
                            <li><b className="text-secondaryyellow">Valor Agregado:</b> Valor fictício calculado com base em commits, estrelas e forks:</li>
                        </ul>
                        <div className="bg-primarydark text-primarybege rounded-lg px-4 py-2 my-3 text-sm border border-primarylightblue w-fit">
                            <span className="block">Commit: <b className="text-secondarygreen">R$2,00</b> | Estrela: <b className="text-secondaryyellow">R$0,50</b> | Fork: <b className="text-secondarypurple">R$1,00</b></span>
                            <span className="block mt-1">Valor Agregado = (Commits x 2,00) + (Estrelas x 0,50) + (Forks x 1,00)</span>
                        </div>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li><b className="text-secondaryyellow">Pontos do Usuário:</b> Sistema de pontuação para gamificação:</li>
                        </ul>
                        <div className="bg-primarydark text-primarybege rounded-lg px-4 py-2 my-3 text-sm border border-primarylightblue w-fit">
                            Commit: <b className="text-secondarygreen">1 ponto</b> | Estrela: <b className="text-secondaryyellow">5 pontos</b> | Fork: <b className="text-secondarypurple">3 pontos</b> | Repo bem estruturado: <b className="text-secondarygreen">10 pontos</b>
                        </div>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li><b className="text-secondaryyellow">Linguagens mais utilizadas:</b> Top 5 linguagens predominantes.</li>
                            <li><b className="text-secondaryyellow">Repositórios bem estruturados:</b> Repositórios com descrição com mais de 50 caracteres, homepage e issues habilitadas.</li>
                            <li><b className="text-secondaryyellow">Popularidade:</b> Top 5 repositórios mais populares por estrelas.</li>
                        </ul>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Diferença entre "Top Linguagens" e "Linguagens mais utilizadas"</h2>
                        <div className="bg-primarydark text-primarybege rounded-lg px-4 py-3 mb-6 border border-primarylightblue">
                            <p className="mb-2">
                                <b className="text-secondaryyellow">Top Linguagens</b> (no card <b>Análise de Stack & Senioridade</b>) mostra as linguagens em que você possui mais experiência e tempo de uso, considerando:
                            </p>
                            <ul className="list-disc list-inside ml-4 mb-2">
                                <li>Anos de experiência em cada linguagem (desde o primeiro repositório)</li>
                                <li>Quantidade de repositórios por linguagem</li>
                                <li>Commits e indicadores de senioridade</li>
                            </ul>
                            <p className="mb-2">
                                Já <b className="text-secondaryyellow">Linguagens mais utilizadas</b> exibe as linguagens mais frequentes nos seus repositórios públicos, baseada apenas na contagem de repositórios que usam cada linguagem.
                            </p>
                            <p className="mb-1">
                                <b>Por isso, os resultados podem ser diferentes:</b> você pode ter muitos repositórios em uma linguagem (mais utilizada), mas ter mais experiência e tempo em outra (top linguagens da stack/senioridade).
                            </p>
                        </div>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Distintivos de Conquista</h2>
                        <p className="leading-relaxed">
                            O sistema desbloqueia distintivos conforme critérios como número de commits, repositórios, linguagens, estrelas, tempo de conta, senioridade e stack. Exemplos:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2 text-primarybege">
                            <li><b className="text-secondarygreen">Code Warrior:</b> Mais de 1.000 commits</li>
                            <li><b className="text-secondarygreen">Império do Código:</b> 50+ repositórios</li>
                            <li><b className="text-secondarygreen">Arquiteto do GitHub:</b> 10+ linguagens</li>
                            <li><b className="text-secondarygreen">Estrela do GitHub:</b> 100+ estrelas</li>
                            <li><b className="text-secondarygreen">Projeto de Ouro:</b> 1 repo com 500+ estrelas</li>
                            <li><b className="text-secondarygreen">Veterano do Código:</b> 10+ anos de GitHub</li>
                            <li><b className="text-secondarygreen">Especialista de Stack:</b> Senioridade 70+ na stack principal</li>
                            <li><b className="text-secondarygreen">Líder Técnico:</b> Nível Tech Lead</li>
                            <li><b className="text-secondarygreen">Poliglota:</b> 15+ linguagens dominadas</li>
                        </ul>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-primarylightblue mb-2">Geração e Compartilhamento do Card</h2>
                        <p className="leading-relaxed">
                            O usuário pode gerar uma imagem personalizada com seu nome, foto, valor agregado, total de commits, pontos, distintivos, stack principal, nível de senioridade, tempo de experiência e número de linguagens. O card pode ser baixado ou compartilhado em suas redes sociais.
                        </p>
                    </section>
                </div>
            </Container>
        </>
    )
}