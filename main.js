// 1. Seleção dos elementos do DOM
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");
const contadores = document.querySelectorAll(".contador");


// 2. Definição das datas dos objetivos
const temposObjetivos = [
   new Date("2026-12-31T00:00:00"), // Tempo para a Aba 1
   new Date("2026-08-18T15:37:07"), // Tempo para a Aba 2
   new Date("2026-10-10T10:00:00"), // Tempo para a Aba 3
   new Date("2027-01-01T00:00:00")  // Tempo para a Aba 4
];


// 3. Função para calcular o tempo restante
function calculaTempo(tempoObjetivo) {
   let tempoAtual = new Date();
   let tempoFinal = tempoObjetivo - tempoAtual;


   if (tempoFinal < 0) {
       return "Prazo encerrado";
   }


   let segundos = Math.floor(tempoFinal / 1000);
   let minutos = Math.floor(segundos / 60);
   let horas = Math.floor(minutos / 60);
   let dias = Math.floor(horas / 24);


   // Aplica o resto da divisão para não acumular os valores
   segundos %= 60;
   minutos %= 60;
   horas %= 24;


   return `${dias} dias ${horas} horas ${minutos} minutos ${segundos} segundos`;
}


// 4. Inicializa os contadores assim que a página carrega
function atualizaContadores() {
   for (let i = 0; i < contadores.length; i++) {
       const objetivoAtual = temposObjetivos[i] || temposObjetivos[0];
       // Atualiza apenas a aba que tiver a classe "ativo"
       if (botoes[i].classList.contains("ativo")) {
           contadores[i].textContent = calculaTempo(objetivoAtual);
       }
   }
}


// Executa uma vez no início para não começar em branco
atualizaContadores();


// 5. Lógica de clique das abas
for (let i = 0; i < botoes.length; i++) {
   botoes[i].onclick = function () {
       // Remove a classe "ativo" de todas as abas e conteúdos
       for (let j = 0; j < botoes.length; j++) {
           botoes[j].classList.remove("ativo");
           textos[j].classList.remove("ativo");
       }


       // Adiciona a classe "ativo" apenas no botão e conteúdo clicados
       botoes[i].classList.add("ativo");
       textos[i].classList.add("ativo");


       // Força a atualização imediata ao clicar
       atualizaContadores();
   };
}


// 6. Atualização em tempo real (a cada 1 segundo)
setInterval(atualizaContadores, 1000);
