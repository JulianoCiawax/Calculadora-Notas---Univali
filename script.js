// Criado por Juliano Costa
// jctecnologias.com.br
// contato@jctecnologias.com.br
// Projeto Open Source
// Apenas me de créditos.

// Objeto para armazenar as notas e pesos de cada período (M1, M2, M3)
let notas = {
  m1: [],
  m2: [],
  m3: [],
};

// Função para adicionar uma nota e peso a um período específico
function adicionarNota(m) {
  // Obtém a nota e o peso a partir dos inputs, convertendo-os para números de ponto flutuante
  let nota = parseFloat(
    document.getElementById(`nota-${m}`).value.replace(",", ".")
  );
  let peso = parseFloat(
    document.getElementById(`peso-${m}`).value.replace(",", ".")
  );

  // Verifica se os valores inseridos são válidos
  if (isNaN(nota) || isNaN(peso)) {
    alert("Por favor, insira valores válidos para nota e peso.");
    return;
  }

  // Adiciona a nota e peso ao array do período correspondente
  notas[m].push({ nota, peso });

  // Adiciona a entrada ao histórico de notas
  adicionarAoHistorico(m, nota, peso);

  // Limpa os campos de entrada de nota e peso
  document.getElementById(`nota-${m}`).value = "";
  document.getElementById(`peso-${m}`).value = "";

  // Exibe o resultado parcial para o período
  exibirResultadoParcial(m);
}

// Função para adicionar uma entrada ao histórico de notas
function adicionarAoHistorico(m, nota, peso) {
  const periodo = m.toUpperCase(); // Converte o período para maiúsculas (ex: 'm1' para 'M1')
  const tbody = document.getElementById("historico-tbody"); // Obtém o corpo da tabela de histórico
  const row = document.createElement("tr"); // Cria uma nova linha na tabela
  const rowIndex = notas[m].length - 1; // Obtém o índice da nova nota adicionada

  // Preenche a nova linha com os dados da nota e peso, e adiciona um botão para deletar a entrada
  row.innerHTML = `<td>${periodo}</td><td>${nota}</td><td>${peso}</td><td class="media-parcial" id="media-parcial-${m}-${rowIndex}"></td><td><button class="btn btn-danger btn-sm" onclick="deletarNota('${m}', ${rowIndex}, this)">Delete</button></td>`;

  // Adiciona a nova linha ao corpo da tabela
  tbody.appendChild(row);

  // Torna visível a seção de histórico
  document.getElementById("historico").style.display = "block";
}

// Função para deletar uma nota do histórico
function deletarNota(m, index, button) {
  // Remove a nota e peso do array do período correspondente
  notas[m].splice(index, 1);

  // Remove a linha correspondente da tabela
  button.parentElement.parentElement.remove();

  // Atualiza o resultado parcial para o período
  exibirResultadoParcial(m);
}

// Função para exibir a próxima seção de inputs
function proximo(m) {
  // Exibe o resultado parcial para o período atual
  exibirResultadoParcial(m);

  // Oculta a seção atual de inputs e exibe o resultado parcial
  document.getElementById(`${m}-container`).style.display = "none";
  document.getElementById(`resultado-${m}`).style.display = "block";

  // Lógica para navegação entre as seções M1, M2 e M3
  if (m === "m1") {
    document.getElementById("m2-container").style.display = "block";
    document.getElementById("proximo-m2").style.display = "block";
    document.getElementById("proximo-m1").style.display = "none";
  } else if (m === "m2") {
    document.getElementById("m3-container").style.display = "block";
    document.getElementById("proximo-m2").style.display = "none";
    document.getElementById("calcular").style.display = "block";
  }
}

// Função para exibir o resultado parcial de um período
function exibirResultadoParcial(m) {
  let totalPontos = 0;
  let totalPesos = 0;

  // Calcula o total de pontos e pesos para o período
  notas[m].forEach((nota) => {
    totalPontos += nota.nota * nota.peso;
    totalPesos += nota.peso;
  });

  // Calcula a média parcial
  let mediaParcial = totalPesos ? totalPontos / totalPesos : 0;

  // Exibe a média parcial na seção de resultados
  document.getElementById(`resultado-${m}`).style.display = "block";
  document.getElementById(
    `resultado-${m}-texto`
  ).innerText = `Média parcial ${m.toUpperCase()}: ${mediaParcial.toFixed(2)}`;

  // Atualiza a média parcial na tabela de histórico
  let rowIndex = notas[m].length - 1;
  document.getElementById(`media-parcial-${m}-${rowIndex}`).innerText =
    mediaParcial.toFixed(2);
}

// Função para calcular a média final
function calcularMedia() {
  let mediaFinal = 0;
  let totalPesos = 0;

  // Calcula a média de cada período e acumula os resultados
  for (let m in notas) {
    let totalPontos = 0;
    let totalPesosM = 0;

    notas[m].forEach((nota) => {
      totalPontos += nota.nota * nota.peso;
      totalPesosM += nota.peso;
    });

    let mediaM = totalPesosM ? totalPontos / totalPesosM : 0;
    mediaFinal += mediaM;
    totalPesos += totalPesosM;
  }

  // Calcula a média final dividindo pelo número de períodos (3)
  mediaFinal = mediaFinal / 3;

  // Gera o texto do resultado final
  let resultadoTexto = `Média final: ${mediaFinal.toFixed(2)}\n`;
  if (mediaFinal >= 6) {
    resultadoTexto += "Parabéns! Você foi aprovado na disciplina.";
  } else {
    let pontosFaltantes = 6 - mediaFinal;
    resultadoTexto += `Você precisa de pelo menos ${pontosFaltantes.toFixed(
      2
    )} pontos para atingir a média.`;
  }

  // Exibe o resultado final na seção de resultados
  document.getElementById("resultado-texto").innerText = resultadoTexto;
  document.getElementById("resultado").style.display = "block";
  document.getElementById("historico").style.display = "block";
}

// Função para resetar todos os dados e reiniciar a aplicação
function resetarTudo() {
  // Reseta o objeto de notas
  notas = {
    m1: [],
    m2: [],
    m3: [],
  };

  // Reseta a visibilidade das seções e botões
  document.getElementById("m1-container").style.display = "block";
  document.getElementById("m2-container").style.display = "none";
  document.getElementById("m3-container").style.display = "none";
  document.getElementById("proximo-m1").style.display = "block";
  document.getElementById("proximo-m2").style.display = "none";
  document.getElementById("calcular").style.display = "none";
  document.getElementById("resultado").style.display = "none";
  document.getElementById("historico").style.display = "none";
  document.getElementById("historico-tbody").innerHTML = "";
  document.getElementById("resultado-m1").style.display = "none";
  document.getElementById("resultado-m2").style.display = "none";
  document.getElementById("resultado-m3").style.display = "none";
}
