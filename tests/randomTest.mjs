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


const dates = getRequestArray(2.0)

console.log(dates);

dates.forEach(date => {
    console.log(`${getDateString(date)}T${getTimeString(date)}`)
})

function getRequestArray(daysOfData) {
    const dates = [];

    const currentDate = new Date();
    for (let i = daysOfData - 1; i >= 0; i--) {
        const date = new Date(currentDate)
        date.setDate(date.getDate() - i);
        // console.log(date);
        dates.push(date);
    }

    return dates;
}