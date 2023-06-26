import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDataByPeriod } from "../helpers/dataReducer.mjs";


export async function getData(periodInMinutes, daysOfData) {

    const client = new DynamoDBClient({
        region: "us-east-1",
        credentials: {
            accessKeyId: "AKIAYYHAN2OAUCUPS65P",
            secretAccessKey: "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"
        }
    });

    const documentClient = new DynamoDBDocumentClient(client)

    const requests = getRequestArray(documentClient, daysOfData);

    console.info("Waiting on data requests...")
    const responses = await Promise.all(requests);
    const itemsArrays = responses.map(response => response.Items);
    const concatenatedData = itemsArrays.flat(1);
    console.info("Requests complete")

    const start = Date.now();

    // const twoDayData = yesterdayData.Items.concat(todayData.Items);
    const reducedData = getDataByPeriod(concatenatedData, periodInMinutes);
    const end = Date.now();

    console.log(`Data reduction latency: ${(end - start)}`);

    return reducedData;
}

function getRequestArray(documentClient, daysOfData) {
    const requests = [];

    for (let i = daysOfData - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        requests.push(makeRequest(documentClient, date));
    }

    return requests;
}

function getDateString(date) {
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
}

async function makeRequest(documentClient, date) {
    const dateValue = getDateString(date);

    const query = {
        TableName: "ParticulateData",
        Select: "ALL_ATTRIBUTES",
        KeyConditionExpression: "#date = :date_value",
        ExpressionAttributeValues: {
            ":date_value": dateValue
        },
        ExpressionAttributeNames: {
            "#date": "date"
        }
    }

    const queryCommand = new QueryCommand(query)

    const start = Date.now();
    const response = await documentClient.send(queryCommand)
    const end = Date.now();

    console.log(`${dateValue} - Data request latency: ${(end - start)}`);

    return response;
}