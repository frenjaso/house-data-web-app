import { getDateString, getTimeString } from './dateUtils.mjs'

export default function reduceData(data) {
    data.forEach(item => {
        item.dateTime = new Date(`${item.date}T${item.time}`)
    })

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
            if (i === data.length) {
                averagedDataPoints.push(getAverageDataPoint(dataPointsToAverage))
            }
        }
    }
    return averagedDataPoints;
}

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
        epoch: averageDateTime.getTime(),
        date: getDateString(averageDateTime),
        time: getTimeString(averageDateTime),
        pmt10: pmt10Average,
        pmt25: pmt25Average
    }
}