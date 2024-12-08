const apiKey = "AIzaSyAvN4knlzUhNK967133dBMR1aGemDzd0mY";
const sheetID = "18PytfYVvzmTGQZtgGJdA-cDk9eGtEmMfR_kNgZb4SiA";
const range = "A2:G20";

function getSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      if (rows) {
        const tbody = document.querySelector('#tabela-hierarquia tbody');
        tbody.innerHTML = "";

        rows.forEach(row => {
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell || "";
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      }
    })
    .catch(error => console.error("Erro ao buscar dados da planilha:", error));
}

window.onload = () => {
  getSheetData();
};
