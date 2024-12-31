// JavaScript Atualizado
const apiKey = "AIzaSyDJncvzGpK9lFURvCeAqgJzYUhJcXG3aKQ";
const sheetID = "18mGCwsjmw-rw8Or-CXGW6H6rzY7BVnmG2o5WL7xcD_0";
const range = "A2:G60";

const textoTitulo = "CORPO ESPECIAL DE REPRESSÃO AO CRIME ORGANIZADO";
const elementoTitulo = document.getElementById("texto-titulo");
let i = 0;

function escreverTitulo() {
  if (i < textoTitulo.length) {
    elementoTitulo.textContent += textoTitulo.charAt(i);
    i++;
    setTimeout(escreverTitulo, 100);
  }
}

function getSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      if (rows) {
        const tbodyDelegados = document.querySelector('#tabela-delegados tbody');
        const tbodyEscrivaes = document.querySelector('#tabela-escrivaes tbody');
        const tbodyInvestigacao = document.querySelector('#tabela-investigacao tbody');
        const tbodyInvestigacao2 = document.querySelector('#tabela-investigacao2 tbody');
        const tbodyOperacionalAlfa = document.querySelector('#tabela-operacional-alfa tbody');
        const tbodyOperacionalBeta = document.querySelector('#tabela-operacional-beta tbody');
        const tbodyEstagiarios = document.querySelector('#tabela-estagiarios tbody');

        tbodyDelegados.innerHTML = "";
        tbodyEscrivaes.innerHTML = "";
        tbodyInvestigacao.innerHTML = "";
        tbodyInvestigacao2.innerHTML = "";
        tbodyOperacionalAlfa.innerHTML = "";
        tbodyOperacionalBeta.innerHTML = "";
        tbodyEstagiarios.innerHTML = "";

        let escrivaoAdicionado = false;

        rows.forEach((row, index) => {
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || "";
            tr.appendChild(td);
          });

          if (tbodyDelegados.children.length < 3 && row[4]?.toUpperCase().includes("DELEGADO")) {
            tbodyDelegados.appendChild(tr);
          } else if (!escrivaoAdicionado && row[4]?.toUpperCase().includes("ESCRIVÃO")) {
            tbodyEscrivaes.appendChild(tr);
            escrivaoAdicionado = true;
          } else if (index >= 7 && index <= 13 && row[4]?.toUpperCase().includes("INVESTIGADOR")) {
            tbodyInvestigacao.appendChild(tr);
          } else if (index >= 15 && index <= 21 && row[4]?.toUpperCase().includes("INVESTIGADOR")) {
            tbodyInvestigacao2.appendChild(tr);
          } else if (index >= 20 && index <= 28) {
            tbodyOperacionalAlfa.appendChild(tr);
          } else if (index >= 27 && index <= 35) {
            tbodyOperacionalBeta.appendChild(tr);
          } else if (index >= 40 && index <= 47) {
            tbodyEstagiarios.appendChild(tr);
          }
        });
      }
    })
    .catch(error => console.error("Erro ao buscar dados da planilha:", error));
}

window.onload = () => {
  escreverTitulo();
  getSheetData();
};
