let notas = {
  m1: [],
  m2: [],
  m3: [],
};

function adicionarNota(m) {
  let nota = parseFloat(
    document.getElementById(`nota-${m}`).value.replace(",", ".")
  );
  let peso = parseFloat(
    document.getElementById(`peso-${m}`).value.replace(",", ".")
  );
  if (isNaN(nota) || isNaN(peso)) {
    alert("Por favor, insira valores válidos para nota e peso.");
    return;
  }
  notas[m].push({ nota, peso });
  adicionarAoHistorico(m, nota, peso);
  document.getElementById(`nota-${m}`).value = "";
  document.getElementById(`peso-${m}`).value = "";
  exibirResultadoParcial(m);
}

function adicionarAoHistorico(m, nota, peso) {
  const periodo = m.toUpperCase();
  const tbody = document.getElementById("historico-tbody");
  const row = document.createElement("tr");
  const rowIndex = notas[m].length - 1;
  row.innerHTML = `<td>${periodo}</td><td>${nota}</td><td>${peso}</td><td class="media-parcial" id="media-parcial-${m}-${rowIndex}"></td><td><button class="btn btn-danger btn-sm" onclick="deletarNota('${m}', ${rowIndex}, this)">Delete</button></td>`;
  tbody.appendChild(row);
  document.getElementById("historico").style.display = "block";
}

function deletarNota(m, index, button) {
  notas[m].splice(index, 1);
  button.parentElement.parentElement.remove();
  exibirResultadoParcial(m);
}

function proximo(m) {
  exibirResultadoParcial(m);
  document.getElementById(`${m}-container`).style.display = "none";
  document.getElementById(`resultado-${m}`).style.display = "block";
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

function exibirResultadoParcial(m) {
  let totalPontos = 0;
  let totalPesos = 0;
  notas[m].forEach((nota) => {
    totalPontos += nota.nota * nota.peso;
    totalPesos += nota.peso;
  });
  let mediaParcial = totalPesos ? totalPontos / totalPesos : 0;
  document.getElementById(`resultado-${m}`).style.display = "block";
  document.getElementById(
    `resultado-${m}-texto`
  ).innerText = `Média parcial ${m.toUpperCase()}: ${mediaParcial.toFixed(2)}`;

  let rowIndex = notas[m].length - 1;
  document.getElementById(`media-parcial-${m}-${rowIndex}`).innerText =
    mediaParcial.toFixed(2);
}

function calcularMedia() {
  let mediaFinal = 0;
  let totalPesos = 0;

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

  mediaFinal = mediaFinal / 3;
  let resultadoTexto = `Média final: ${mediaFinal.toFixed(2)}\n`;
  if (mediaFinal >= 6) {
    resultadoTexto += "Parabéns! Você foi aprovado na disciplina.";
  } else {
    let pontosFaltantes = 6 - mediaFinal;
    resultadoTexto += `Você precisa de pelo menos ${pontosFaltantes.toFixed(
      2
    )} pontos para atingir a média.`;
  }
  document.getElementById("resultado-texto").innerText = resultadoTexto;
  document.getElementById("resultado").style.display = "block";
  document.getElementById("historico").style.display = "block";
}

function resetarTudo() {
  notas = {
    m1: [],
    m2: [],
    m3: [],
  };
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
