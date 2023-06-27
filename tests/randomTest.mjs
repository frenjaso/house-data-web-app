import {particulateDataRequest} from "../src/helpers/clients/dynamoDbClient.mjs";

import { getTimeString } from "../src/helpers/dateUtils.mjs";
import { getDateString } from "../src/helpers/dateUtils.mjs";

// const foo = [1,2,3,4,5,6];
//
//
// const foo2 = foo.slice(1, foo.length);
//
// console.log(foo);
// console.log(foo2);


// const dates = getRequestArray(2.0)
//
// console.log(dates);
//
// dates.forEach(date => {
//     console.log(`${getDateString(date)}T${getTimeString(date)}`)
// })
//
// function getRequestArray(daysOfData) {
//     const dates = [];
//
//     const currentDate = new Date();
//     for (let i = daysOfData - 1; i >= 0; i--) {
//         const date = new Date(currentDate)
//         date.setDate(date.getDate() - i);
//         // console.log(date);
//         dates.push(date);
//     }
//
//     return dates;
// }
//
// const myDate = new Date('2023-06-26');
//
// console.log(myDate);
//



// const date = new Date(1687896165000)

// console.log("date.getHours(): " + date.getHours())
// console.log("date.getUTCHours(): " + date.getUTCHours())
//
//
// let pstDateStr = date.toLocaleString("en-US", { timeZone: "America/Chicago" });
//
// console.log("pstDateStr: " + pstDateStr)
// let pstDate = new Date(pstDateStr);
//
// console.log("offset: " + pstDate.getTimezoneOffset());
//
//
// console.log("pstDate.getHours(): " + pstDate.getHours())
// console.log("pstDate.getUTCHours(): " + pstDate.getUTCHours())



function getLocalizedDate(epoch, timezone) {
    const date = new Date(epoch);
    return new Date(date.toLocaleString("en-US", { timeZone: timezone }));
}



const date = new Date();

const localDate = getLocalizedDate(date, "America/Chicago");

console.log(localDate.getHours());