import data from './testData.mjs'
import reduceData from "../helpers/dataReducer.mjs";


const reducedData = reduceData(data);

console.log(`data.length: ${data.length}`);
console.log(`reducedData.length: ${reducedData.length}`);


console.log(data[0])
console.log(reducedData[0]);