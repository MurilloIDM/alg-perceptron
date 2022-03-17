// AND - Truth Table
const TRUTH_TABLE = [
  [1, 1, 1],
  [1, -1, 1],
  [-1, 1, 1],
  [-1, -1, 1],
];

const TARGET = [1, -1, -1, -1];

const WEIGHT = [0, 0, 0];

let functionYent = [];

let alpha = 1;
const threshold = 0.2;

let hasWeightVariation = true;

let teste = 0;

function handle() {
  while (hasWeightVariation) {
    
    for (let line = 0; line < 4; line++) {
      let yent = 0;

      for (let column = 0; column < 3; column++) {
        yent += parseInt(TRUTH_TABLE[line][column] * WEIGHT[column]);
      }

      yent += + TRUTH_TABLE[line][2];

      functionYent.push(yent);

      if (functionYent[line] === TARGET[line]) {
        hasWeightVariation = false;
        break;
      }

      WEIGHT[0] = alpha * (TARGET[line] - functionYent[line]) * TRUTH_TABLE[line][0];
      WEIGHT[1] = alpha * (TARGET[line] - functionYent[line]) * TRUTH_TABLE[line][1];
      WEIGHT[2] = alpha * (TARGET[line] - functionYent[line]) * TRUTH_TABLE[line][2];
    }
  
    teste += 1;
  }

  console.log('gera -> ', teste);
}

handle();
