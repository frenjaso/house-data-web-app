import { getDynamoDocumentClient } from "./clients/clients.mjs";
import { getDataByPeriod } from "../helpers/dataReducer.mjs";
import { particulateDataRequest } from "./clients/dynamoDbClient.mjs";

export async function getData(periodInMinutes, daysOfData) {
    const documentClient = getDynamoDocumentClient();

    const requests = getRequestArray(documentClient, Math.ceil(daysOfData + 1));

    console.info("Waiting on data requests...")

    const responses = await Promise.all(requests);

    console.info("Requests complete")

    const start = Date.now();

    const itemsArrays = responses.map(response => response.Items);
    const concatenatedData = itemsArrays.flat(1);
    const reducedData = getDataByPeriod(concatenatedData, periodInMinutes, daysOfData);

    const end = Date.now();

    console.log(`Data reduction latency: ${(end - start)}`);

    return reducedData;
}

function getRequestArray(documentClient, daysOfData) {
    const requests = [];

    const currentDate = new Date();
    for (let i = daysOfData - 1; i >= 0; i--) {
        const date = new Date(currentDate)
        date.setDate(date.getDate() - i);
        requests.push(particulateDataRequest(documentClient, date));
    }

    return requests;
}