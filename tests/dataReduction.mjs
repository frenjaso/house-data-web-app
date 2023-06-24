import data from './testData.mjs'


// console.log(data);



data.forEach(item => {
    item.dateTime = new Date(`${item.date}T${item.time}`)
})


console.log(data[1]);
console.log(data[0]);

console.log(data[1].dateTime - data[0].dateTime);


const averagedDataPoints = [];


let i = 0;
while (i < data.length) {
    // const dataPoint = data[i];
    const dataPointsToAverage = [ data[i] ];

    i++;
    while (i < data.length) {
        const nextDataPoint = data[i];
        if (Math.abs(nextDataPoint.dateTime - dataPointsToAverage[dataPointsToAverage.length - 1].dateTime) < 20000) {
            dataPointsToAverage.push(nextDataPoint)
        } else {
            averagedDataPoints.push(getAverageDataPoint(dataPointsToAverage))
            break;
        }
        i++;
    }
}

console.log(averagedDataPoints);
console.log(averagedDataPoints.length)
console.log(data.length)


function getAverageDataPoint(dataPointsToAverage) {
    let pmt10Sum = 0;
    let pmt25Sum = 0;
    let epochSum = 0;
    dataPointsToAverage.forEach(dataPoint => {
        pmt10Sum += dataPoint.pmt10;
        pmt25Sum += dataPoint.pmt25;
        epochSum += dataPoint.dateTime.getTime();
    })

    const pmt10Average = pmt10Sum / dataPointsToAverage.length;
    const pmt25Average = pmt25Sum / dataPointsToAverage.length;
    const epochAverage = epochSum / dataPointsToAverage.length;
    const averageDateTime = new Date(epochAverage);

    return {
        date: averageDateTime,
        pmt10: pmt10Average,
        pmt25: pmt25Average
    }
}