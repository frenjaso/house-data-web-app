import data from './testData.mjs'
import { reduceData } from "../helpers/dataReducer.mjs";


const reducedData = reduceData(data, 3, 50000);
const fiveMinuteData = reduceData(reducedData, 5, 360000);

console.log(`data.length: ${data.length}`);
console.log(`reducedData.length: ${reducedData.length}`);
console.log(`fiveMinuteData.length: ${fiveMinuteData.length}`);


console.log(data[0])
console.log(reducedData[0]);
console.log(fiveMinuteData[0]);
console.log(fiveMinuteData[1]);
console.log(fiveMinuteData[2]);