/* ==========================================
   AGRO FORTE, FUTURO SUSTENTÁVEL 2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarAcessibilidade();
    iniciarDarkMode();

    iniciarSimulador();

    iniciarMapa();

    iniciarQuiz();

    iniciarDesafio();

    iniciarCertificado();

    iniciarAnimacoes();

});

/* ==========================================
   ACESSIBILIDADE
========================================== */

function iniciarAcessibilidade() {

    const increaseBtn = document.getElementById("increaseFont");
    const decreaseBtn = document.getElementById("decreaseFont");
    const contrastBtn = document.getElementById("contrastBtn");

    let tamanhoFonte = 16;

    increaseBtn?.addEventListener("click", () => {

        if (tamanhoFonte < 24) {

            tamanhoFonte += 2;

            document.body.style.fontSize =
                tamanhoFonte + "px";

        }

    });

    decreaseBtn?.addEventListener("click", () => {

        if (tamanhoFonte > 12) {

            tamanhoFonte -= 2;

            document.body.style.fontSize =
                tamanhoFonte + "px";

        }

    });

    contrastBtn?.addEventListener("click", () => {

        document.body.classList.toggle("high-contrast");

    });

}

/* ==========================================
   DARK MODE
========================================== */

function iniciarDarkMode() {

    const btn =
        document.getElementById("darkModeBtn");

    btn?.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );

    });

    if (localStorage.getItem("darkMode") === "true") {

        document.body.classList.add("dark-mode");

    }

}

/* ==========================================
   SIMULADOR AGROTECH
========================================== */

let graficoBarra;
let graficoRadar;

function iniciarSimulador() {

    const agua =
        document.getElementById("agua");

    const fertilizante =
        document.getElementById("fertilizante");

    const drones =
        document.getElementById("drones");

    const sensores =
        document.getElementById("sensores");

    const solar =
        document.getElementById("solar");

    const atualizar = () => {

        const vAgua =
            parseInt(agua.value);

        const vFert =
            parseInt(fertilizante.value);

        const vDrones =
            parseInt(drones.value);

        const vSensores =
            parseInt(sensores.value);

        const vSolar =
            parseInt(solar.value);

        const producao =
            Math.round(
                (vDrones + vSensores + vFert) / 3
            );

        const consumoAgua =
            100 - Math.round(
                (vSensores * 0.4)
            );

        const carbono =
            100 - Math.round(
                (vSolar * 0.6)
            );

        const lucro =
            Math.round(
                (producao + (100 - carbono))
                / 2
            );

        document.getElementById("producaoValor")
            .innerText = producao + "%";

        document.getElementById("aguaValor")
            .innerText = consumoAgua + "%";

        document.getElementById("carbonoValor")
            .innerText = carbono + "%";

        document.getElementById("lucroValor")
            .innerText = lucro + "%";

        atualizarGraficos(
            producao,
            consumoAgua,
            carbono,
            lucro
        );

        verificarConquistaSimulador(
            producao,
            consumoAgua,
            carbono,
            lucro
        );

    };

    [agua, fertilizante, drones, sensores, solar]
        .forEach(slider => {

            slider?.addEventListener(
                "input",
                atualizar
            );

        });

    criarGraficos();

    atualizar();

}

/* ==========================================
   CHARTS
========================================== */

function criarGraficos() {

    const barra =
        document.getElementById(
            "graficoProducao"
        );

    const radar =
        document.getElementById(
            "graficoSustentabilidade"
        );

    graficoBarra =
        new Chart(barra, {

            type: "bar",

            data: {

                labels: [
                    "Produção",
                    "Água",
                    "Carbono",
                    "Lucro"
                ],

                datasets: [{

                    label:
                        "Indicadores",

                    data: [50,50,50,50]

                }]

            }

        });

    graficoRadar =
        new Chart(radar, {

            type: "radar",

            data: {

                labels: [

                    "Produção",
                    "Eficiência",
                    "Água",
                    "Carbono",
                    "Lucro"

                ],

                datasets: [{

                    data: [50,50,50,50,50]

                }]

            }

        });

}

function atualizarGraficos(
    producao,
    agua,
    carbono,
    lucro
) {

    graficoBarra.data.datasets[0].data = [

        producao,
        agua,
        carbono,
        lucro

    ];

    graficoBarra.update();

    graficoRadar.data.datasets[0].data = [

        producao,
        100 - carbono,
        agua,
        carbono,
        lucro

    ];

    graficoRadar.update();

}

/* ==========================================
   MAPA INTERATIVO
========================================== */

function iniciarMapa() {

    const dados = {

        sul:
            "🌱 Agricultura familiar, cooperativas e agricultura de precisão.",

        sudeste:
            "☀️ Produção tecnológica de café, cana-de-açúcar e hortifrúti.",

        centro:
            "🚜 Grandes áreas mecanizadas e agricultura digital.",

        norte:
            "🌳 Sistemas agroflorestais e manejo sustentável.",

        nordeste:
            "💧 Irrigação inteligente e convivência com o semiárido."

    };

    const botoes =
        document.querySelectorAll(".region-btn");

    const info =
        document.getElementById("regionInfo");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const regiao =
                botao.dataset.region;

            info.innerHTML = `
                <h3>${botao.innerText}</h3>
                <p>${dados[regiao]}</p>
            `;

        });

    });

}

/* ==========================================
   QUIZ
========================================== */

const perguntas = [

    {

        pergunta:
            "Qual tecnologia ajuda a identificar pragas rapidamente?",

        respostas: [

            "Drone",
            "Silo",
            "Arado",
            "Celeiro"

        ],

        correta: 0

    },

    {

        pergunta:
            "O que reduz o consumo de água?",

        respostas: [

            "Queimada",
            "Sensores",
            "Desmatamento",
            "Lixo"

        ],

        correta: 1

    },

    {

        pergunta:
            "Qual energia é renovável?",

        respostas: [

            "Carvão",
            "Diesel",
            "Solar",
            "Gasolina"

        ],

        correta: 2

    }

];

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {

    mostrarPergunta();

    document
        .getElementById("nextQuestion")
        ?.addEventListener(
            "click",
            proximaPergunta
        );

}

function mostrarPergunta() {

    const pergunta =
        perguntas[perguntaAtual];

    document.getElementById("question")
        .innerText = pergunta.pergunta;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    pergunta.respostas.forEach(
        (texto, indice) => {

            const btn =
                document.createElement("button");

            btn.className =
                "answer-btn";

            btn.innerText = texto;

            btn.onclick = () =>
                verificarResposta(
                    indice
                );

            answers.appendChild(btn);

        }
    );

}

function verificarResposta(indice) {

    const pergunta =
        perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".answer-btn");

    botoes.forEach(btn =>
        btn.disabled = true
    );

    if (
        indice === pergunta.correta
    ) {

        botoes[indice]
            .classList.add("correct");

        pontuacao++;

        document.getElementById("score")
            .innerText = pontuacao;

        desbloquear("achievement1");

    } else {

        botoes[indice]
            .classList.add("wrong");

        botoes[pergunta.correta]
            .classList.add("correct");

    }

}

function proximaPergunta() {

    perguntaAtual++;

    if (
        perguntaAtual >= perguntas.length
    ) {

        document.getElementById("question")
            .innerText =
            "Quiz concluído!";

        document.getElementById("answers")
            .innerHTML = "";

        if (pontuacao >= 3) {

            desbloquear("achievement3");

        }

        return;

    }

    mostrarPergunta();

}

/* ==========================================
   CONQUISTAS
========================================== */

function desbloquear(id) {

    const card =
        document.getElementById(id);

    if(card){

        card.classList.add("unlocked");

    }

}

function verificarConquistaSimulador(
    producao,
    agua,
    carbono,
    lucro
){

    if(
        producao > 70 &&
        agua < 60 &&
        carbono < 50 &&
        lucro > 60
    ){

        desbloquear("achievement2");

    }

}

/* ==========================================
   DESAFIO FINAL
========================================== */

function iniciarDesafio() {

    document
        .getElementById("checkChallenge")
        ?.addEventListener(
            "click",
            () => {

                const producao =
                    parseInt(
                        document.getElementById("producaoValor")
                        .innerText
                    );

                const agua =
                    parseInt(
                        document.getElementById("aguaValor")
                        .innerText
                    );

                const carbono =
                    parseInt(
                        document.getElementById("carbonoValor")
                        .innerText
                    );

                const lucro =
                    parseInt(
                        document.getElementById("lucroValor")
                        .innerText
                    );

                const resultado =
                    document.getElementById(
                        "challengeResult"
                    );

                if(
                    producao > 80 &&
                    agua < 40 &&
                    carbono < 30 &&
                    lucro > 70
                ){

                    resultado.innerHTML =
                        "🏆 Parabéns! Desafio concluído.";

                    desbloquear(
                        "achievement4"
                    );

                }else{

                    resultado.innerHTML =
                        "❌ Continue ajustando a fazenda.";

                }

            }
        );

}

/* ==========================================
   CERTIFICADO
========================================== */

function iniciarCertificado() {

    document
        .getElementById(
            "generateCertificate"
        )
        ?.addEventListener(
            "click",
            () => {

                const nome =
                    document.getElementById(
                        "studentName"
                    ).value;

                if(!nome){

                    alert(
                        "Digite seu nome."
                    );

                    return;

                }

                const data =
                    new Date()
                    .toLocaleDateString(
                        "pt-BR"
                    );

                const texto = `
CERTIFICADO

Certificamos que

${nome}

concluiu com sucesso a jornada educacional

AGRO FORTE, FUTURO SUSTENTÁVEL

Data: ${data}

Pontuação: ${pontuacao}/${perguntas.length}
                `;

                const janela =
                    window.open();

                janela.document.write(
                    `<pre style="font-size:20px">${texto}</pre>`
                );

                janela.print();

            }
        );

}

/* ==========================================
   ANIMAÇÕES DE SCROLL
========================================== */

function iniciarAnimacoes() {

    const elementos =
        document.querySelectorAll(
            ".section"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );

    elementos.forEach(el => {

        el.classList.add("reveal");

        observer.observe(el);

    });

}