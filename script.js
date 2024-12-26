const apiKey = "AIzaSyAvN4knlzUhNK967133dBMR1aGemDzd0mY";
const sheetID = "18PytfYVvzmTGQZtgGJdA-cDk9eGtEmMfR_kNgZb4SiA";
const range = "A2:G35";

const textoTitulo = "CORPO ESPECIAL DE REPRESSÃO AO CRIME ORGANIZADO"; // Texto a ser escrito no título
const elementoTitulo = document.getElementById("texto-titulo");
let i = 0; // Contador de caracteres

function escreverTitulo() {
  if (i < textoTitulo.length) {
    elementoTitulo.textContent += textoTitulo.charAt(i); // Adiciona uma letra de cada vez
    i++;
    setTimeout(escreverTitulo, 100); // Define o tempo para adicionar o próximo caractere
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
        const tbodyOperacionalBeta = document.querySelector('#tabela-operacional-beta tbody'); // Nova tabela

        tbodyDelegados.innerHTML = "";
        tbodyEscrivaes.innerHTML = "";
        tbodyInvestigacao.innerHTML = "";
        tbodyInvestigacao2.innerHTML = "";
        tbodyOperacionalAlfa.innerHTML = "";
        tbodyOperacionalBeta.innerHTML = ""; // Limpa a tabela antes de preencher

        let escrivaoAdicionado = false;

        // Adicionando as linhas nas tabelas
        rows.forEach((row, index) => {
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || "";
            tr.appendChild(td);
          });

          // Preenche a aba DELEGADOS (máximo de 3 linhas)
          if (tbodyDelegados.children.length < 3 && row[4]?.toUpperCase().includes("DELEGADO")) {
            tbodyDelegados.appendChild(tr);
          }
          // Adiciona apenas 1 linha para a aba ESCRIVÃO
          else if (!escrivaoAdicionado && row[4]?.toUpperCase().includes("ESCRIVÃO")) {
            tbodyEscrivaes.appendChild(tr);
            escrivaoAdicionado = true;
          }
          // Preenche a aba INVESTIGAÇÃO apenas com as linhas de índice 7 a 13 (linhas 8 a 14 na planilha)
          else if (index >= 7 && index <= 13 && row[4]?.toUpperCase().includes("INVESTIGADOR")) {
            tbodyInvestigacao.appendChild(tr);
          }
          // Preenche a aba INVESTIGAÇÃO 2 com as linhas de índice 15 a 20 (linhas 16 a 21 na planilha)
          else if (index >= 15 && index <= 21 && row[4]?.toUpperCase().includes("INVESTIGADOR")) {
            tbodyInvestigacao2.appendChild(tr);
          }
          // Preenche a aba OPERACIONAL ALFA com as linhas de índice 20 a 26 (linhas 21 a 27 na planilha)
          else if (index >= 20 && index <= 27) {
            tbodyOperacionalAlfa.appendChild(tr);
          }
          // Preenche a aba OPERACIONAL BETA com as linhas de índice 27 a 33 (linhas 28 a 34 na planilha)
          else if (index >= 27 && index <= 34) {
            tbodyOperacionalBeta.appendChild(tr);
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
