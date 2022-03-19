// AND - Truth Table
const TRUTH_TABLE = [
  [1, 1, 1],
  [1, -1, 1],
  [-1, 1, 1],
  [-1, -1, 1],
];

const TARGET = [1, -1, -1, -1];

let WEIGHT = [0, 0, 0];

let functionYent;

const alpha = 1;
const threshold = 0.2;

let hasWeightVariation = true;

let weightVariation = [[], [], [], []];

let teste = 0;

function handle() {
  while (hasWeightVariation) {

    for (let line = 0; line < 4; line++) {
      let yent = 0;

      for (let column = 0; column < 3; column++) {
        yent += parseInt(TRUTH_TABLE[line][column] * WEIGHT[column]);
      }


      console.log('yent ->', yent);

      if (yent > threshold) functionYent = 1;
      else if (yent <= threshold && yent >= threshold * -1) functionYent = 0;
      else functionYent = -1;

      console.log('fyent -> ', functionYent);

      let wVariationFirstPart = parseInt(alpha * (TARGET[line] - functionYent));

      weightVariation[line][0] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][0]);
      weightVariation[line][1] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][1]);
      weightVariation[line][2] = parseInt(wVariationFirstPart * TRUTH_TABLE[line][2]);

      WEIGHT[0] += parseInt(weightVariation[line][0]);
      WEIGHT[1] += parseInt(weightVariation[line][1]);
      WEIGHT[2] += parseInt(weightVariation[line][2]);  

    }
    console.log('-----------Fim da época-----------')

    let done = true;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        console.log('variacao -> ', weightVariation[i][j]);
        if (weightVariation[i][j] !== 0) {
          done = false;
          break;
        }
      }
      if (!done) break;
    }


    if (!done) {
      teste += 1;
    }
    else {
      teste += 1;
      hasWeightVariation = false;
    }
  }
  
  console.log('gera -> ', teste);
}

handle();
