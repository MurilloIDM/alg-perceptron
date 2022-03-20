const HEADER_TABLE = ["x1", "x2", "1", "t", "ΔW1", "ΔW2", "ΔWB", "W1", "W2", "b", "Yent", "f(Yent)"];


export const createTable = (generation, truthTable, target, allWeights, allYent, allFYent, weightVariation) => {
  const container = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.innerText = `Geração ${generation}`;

  const table = document.createElement("table");
  const thead = createHeaderTable();
  const tbody = createBodyTable(truthTable, target, allWeights, allYent, allFYent, weightVariation);

  table.appendChild(thead);
  table.appendChild(tbody);

  container.classList.add("container-table");
  container.appendChild(h2);
  container.appendChild(table);

  document.getElementById("tables").appendChild(container);
};

const generateColumn = (tr, data, line) => {
  const td = document.createElement("td");
  td.innerText = data[line];
  tr.appendChild(td);
}

const generateColumns = (tr, data, line) => {
  for (let column = 0; column < data.length - 1; column++) {
    const td = document.createElement("td");
    td.innerText = data[line][column];

    tr.appendChild(td);
  }
}

const createHeaderTable = () => {
  const thead = document.createElement("thead");

  HEADER_TABLE.forEach((textTh) => {
    const th = document.createElement("th");
    th.innerText = textTh;

    thead.appendChild(th);
  });

  return thead;
}

const createBodyTable = (truthTable, target, allWeights, allYent, allFYent, weightVariation) => {
  const tbody = document.createElement("tbody");

  for (let line = 0; line < 4; line++) {
    const tr = document.createElement("tr");

    // Geração das colunas da tabela verdade
    generateColumns(tr, truthTable, line);

    // Geração das colunas de alvos
    generateColumn(tr, target, line);

    // Geração das colunas da variação dos deltas
    generateColumns(tr, weightVariation, line);

    // Geração das colunas dos pesos atualizados
    generateColumns(tr, allWeights, line);

    // Geração das colunas de Yent
    generateColumn(tr, allYent, line);

    // Geração das colunas de F(Yent)
    generateColumn(tr, allFYent, line);

    tbody.appendChild(tr);
  }

  return tbody;
}
