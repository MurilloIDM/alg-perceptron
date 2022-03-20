import { createTable } from "./createTable.js";
import { DATA } from "./dataInput.js";

const alpha = 1;
const threshold = 0.2;

const button = document.getElementById("execute-button");
button.addEventListener("click", getOptions);

function getOptions() {
  const operation = document.getElementById("operation").value;
  const inputType = document.getElementById("input-type").value;

  handler(operation, inputType);
}

function handler(operation, inputType) {
  console.log("operation -> ", operation);
  // Declaração e inicialização de variáveis
  let fYent = null;
  let generation = 0;
  let WEIGHT = [0, 0, 0];
  let hasWeightVariation = true;
  
  
  // Captura da tabela verdade e alvos de acordo com a operação (AND, OR ou XOR)
  const { TRUTH_TABLE, TARGET } = DATA[operation];
  
  while (hasWeightVariation) {
    const allYent = [];
    const allFYent = [];
    const allWeights = [];
    const allVariations = [];
    let weightVariation = [[], [], [], []];
    
    generation += 1;

    for (let line = 0; line < 4; line++) {
      let yent = 0;

      // Cálculo do Yent
      for (let column = 0; column < 3; column++) {
        yent += parseInt(TRUTH_TABLE[line][column] * WEIGHT[column]);
      }

      // Captura do (f)Yent
      fYent = getFYent(yent);

      let wVariationFirstPart = parseInt(alpha * (TARGET[line] - fYent));

      // Mapeamento das variações dos pesos (matriz(3,4))
      weightVariation[line][0] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][0]);
      weightVariation[line][1] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][1]);
      weightVariation[line][2] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][2]);

      // Atualização dos valores dos pesos
      WEIGHT[0] += parseInt(weightVariation[line][0]);
      WEIGHT[1] += parseInt(weightVariation[line][1]);
      WEIGHT[2] += parseInt(weightVariation[line][2]);

      allYent.push(yent);
      allFYent.push(fYent);
      allWeights.push(WEIGHT);
    }
    
    createTable(generation, TRUTH_TABLE, TARGET, allWeights, allYent, allFYent, weightVariation);

    const done = noWeightVariation(weightVariation);

    if (done) {
      hasWeightVariation = false;
      continue;
    }
  }
}

function getFYent(yent) {
  if (yent > threshold) {
    return 1;
  } else if (yent <= threshold && yent >= -threshold) {
    return 0;
  } else {
    return -1;
  }
}

function noWeightVariation(weightVariation) {
  let done = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (weightVariation[i][j] !== 0) {
        done = false;
        break;
      }
    }

    if (!done) break;
  }

  return done;
}
