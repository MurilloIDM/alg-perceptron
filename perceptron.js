const DATA = require("./data_input.json");

const alpha = 1;
const threshold = 0.2;

function handle(operation) {
  // Declaração e inicialização de variáveis
  let fYent = null;
  let generation = 0;
  let WEIGHT = [0, 0, 0];
  let hasWeightVariation = true;
  let weightVariation = [[], [], [], []];
  
  // Captura da tabela verdade e alvos de acordo com a operação (AND, OR ou XOR)
  const { TRUTH_TABLE, TARGET } = DATA[operation];

  while (hasWeightVariation) {
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
    }
    
    const done = noWeightVariation(weightVariation);

    generation += 1;

    if (done) {
      hasWeightVariation = false;
      continue;
    }
  }
  
  console.log(`Operação ${operation} => ${generation} gerações.`);
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

handle("AND");
// handle("OR");
// handle("XOR");
