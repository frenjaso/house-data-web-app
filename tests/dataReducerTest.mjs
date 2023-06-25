import data from './testData.mjs'
import reduceData from "../helpers/dataReducer.mjs";
import { reduceDataParameterized } from "../helpers/dataReducer.mjs";


const reducedData = reduceDataParameterized(data, 3, 20000);
const fiveMinuteData = reduceDataParameterized(reducedData, 5, 80000);

console.log(`data.length: ${data.length}`);
console.log(`reducedData.length: ${reducedData.length}`);
console.log(`fiveMinuteData.length: ${fiveMinuteData.length}`);


console.log(data[0])
console.log(reducedData[0]);
console.log(fiveMinuteData[0]);
console.log(fiveMinuteData[1]);
console.log(fiveMinuteData[2]);