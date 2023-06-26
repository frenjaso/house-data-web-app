import { getDateString } from "../dateUtils.mjs";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function particulateDataRequest(documentClient, date) {
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