import { getDynamoDocumentClient } from "./clients/clients.mjs";
import { getDataByPeriod } from "../helpers/dataReducer.mjs";
import { particulateDataRequest } from "./clients/dynamoDbClient.mjs";

export async function getData(periodInMinutes, daysOfData) {
    const documentClient = getDynamoDocumentClient();

    const requests = getRequestArray(documentClient, daysOfData);

    console.info("Waiting on data requests...")

    const responses = await Promise.all(requests);
    const itemsArrays = responses.map(response => response.Items);
    const concatenatedData = itemsArrays.flat(1);

    console.info("Requests complete")

    const start = Date.now();
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
        requests.push(particulateDataRequest(documentClient, date));
    }

    return requests;
}