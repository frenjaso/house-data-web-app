import { getDateString, getTimeString, getDisplayDateTime } from './dateUtils.mjs'

const millisPerDay = 60 * 60 * 24 * 1000;

export function getDataByPeriod(data, periodInMinutes, daysOfData) {
    const reducedData = getRawReducedDataByPeriod(data, periodInMinutes, daysOfData);
    reducedData.forEach(item => {
        const date = new Date(item.epoch);
        item.date = getDateString(date);
        item.time = getTimeString(date);
        item.datetime = getDisplayDateTime(date)
    })
    return reducedData;
}

export function getSmoothedDataByPeriod(data, periodInMinutes, daysOfData, pointsPerSmoothPoint) {
    const reducedData = getRawReducedDataByPeriod(data, periodInMinutes, daysOfData);
    const smoothedData = [];

    let offset = pointsPerSmoothPoint - 1;
    for (let i = pointsPerSmoothPoint - 1; i < reducedData.length; i++) {

        let pmt10Sum = 0;
        let pmt25Sum = 0;
        for (let j = i - offset; j <= i; j++) {
            pmt10Sum += reducedData[j].pmt10;
            pmt25Sum += reducedData[j].pmt25;
        }

        const pmt10Average = pmt10Sum / pointsPerSmoothPoint;
        const pmt25Average = pmt25Sum / pointsPerSmoothPoint;
        const smoothedDataPoint = {
            epoch: reducedData[i].epoch,
            pmt10: Math.round(pmt10Average * 100) / 100,
            pmt25: Math.round(pmt25Average * 100) / 100
        }
        smoothedData.push(smoothedDataPoint);
    }

    smoothedData.forEach(item => {
        const date = new Date(item.epoch);
        item.date = getDateString(date);
        item.time = getTimeString(date);
        item.datetime = getDisplayDateTime(date)
    })
    return smoothedData;
}

function getRawReducedDataByPeriod(data, periodInMinutes, daysOfData) {
    data.forEach(item => {
        item.epoch = new Date(`${item.date}T${item.time}.000Z`).getTime()
    })

    const truncatedData = getTruncatedData(data, daysOfData);

    const reducedData = reduceData(truncatedData, 3, 50 * 1000);
    if (periodInMinutes <= 1) {
        return reducedData;
    } else {
        return reduceData(reducedData, periodInMinutes, periodInMinutes * 60000 + 40000);
    }
}

export function reduceData(data, maxNumberOfDataPointsPerAverage, maxDataPointTimeSpanMillis) {
    const averagedDataPoints = [];

    let i = 0;
    while (i < data.length) {
        const dataPointsToAverage = [ data[i] ];

        i++;
        while (i < data.length && dataPointsToAverage.length < maxNumberOfDataPointsPerAverage) {
            const nextDataPoint = data[i];
            if (Math.abs(nextDataPoint.epoch - dataPointsToAverage[0].epoch) < maxDataPointTimeSpanMillis) {
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

function getTruncatedData(data, daysOfData) {
    const startEpoch = data[data.length - 1].epoch - (daysOfData * millisPerDay);

    let i = 0;
    while (data[i].epoch < startEpoch) {
        i++;
    }

    return data.slice(i, data.length);
}

function getAverageDataPoint(dataPointsToAverage) {
    let pmt10Sum = 0;
    let pmt25Sum = 0;
    let epochSum = 0;
    dataPointsToAverage.forEach(dataPoint => {
        pmt10Sum += dataPoint.pmt10;
        pmt25Sum += dataPoint.pmt25;
        epochSum += dataPoint.epoch;
    })

    const pmt10Average = pmt10Sum / dataPointsToAverage.length;
    const pmt25Average = pmt25Sum / dataPointsToAverage.length;
    const epochAverage = epochSum / dataPointsToAverage.length;
    const averageDateTime = new Date(epochAverage);

    return {
        epoch: averageDateTime.getTime(),
        pmt10: Math.round(pmt10Average * 100) / 100,
        pmt25: Math.round(pmt25Average * 100) / 100
    }
}