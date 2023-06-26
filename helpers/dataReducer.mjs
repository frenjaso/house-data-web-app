import { getDateString, getTimeString } from './dateUtils.mjs'

export function getDataByPeriod(data, periodInMinutes) {
    const reducedData = reduceData(data, 3, 50 * 1000);
    if (periodInMinutes <= 1) {
        return reducedData;
    } else {
        return reduceData(reducedData, periodInMinutes, periodInMinutes * 60000 + 40000);
    }
}

export function reduceData(data, maxNumberOfDataPointsPerAverage, maxDataPointTimeSpanMillis) {
    data.forEach(item => {
        item.dateTime = new Date(`${item.date}T${item.time}.000Z`)
    })

    const averagedDataPoints = [];

    let i = 0;
    while (i < data.length) {
        const dataPointsToAverage = [ data[i] ];

        i++;
        while (i < data.length && dataPointsToAverage.length < maxNumberOfDataPointsPerAverage) {
            const nextDataPoint = data[i];
            if (Math.abs(nextDataPoint.dateTime - dataPointsToAverage[0].dateTime) < maxDataPointTimeSpanMillis) {
                dataPointsToAverage.push(nextDataPoint)
            } else {
                break;
            }
            i++;
        }
        averagedDataPoints.push(getAverageDataPoint(dataPointsToAverage))
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