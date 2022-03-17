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
const threshold = 2;

const hasWeightVariation = true;

function handle() {
  // while (hasWeightVariation) {
    
    for (let line = 0; line < 4; line++) {
      let yent = 0;

      for (let column = 0; column < 3; column++) {
        // console.log(TRUTH_TABLE[line][column] * WEIGHT[column])
        // console.log(WEIGHT[column])
        yent += parseInt(TRUTH_TABLE[line][column] * WEIGHT[column]);
      }
      yent += + TRUTH_TABLE[line][2];
      console.log(yent)

      // functionYent.push(yent);

      // if (functionYent[line] === TARGET[line]) {
      //   hasWeightVariation = false;
      //   break;
      // }

      // WEIGHT[line] = alpha * (TARGET[line] - functionYent[line]) * 
    }
  
  // }
}

handle();
