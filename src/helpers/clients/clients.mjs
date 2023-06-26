import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

export function getDynamoDocumentClient() {
    const client = new DynamoDBClient({
        region: "us-east-1",
        credentials: {
            accessKeyId: "AKIAYYHAN2OAUCUPS65P",
            secretAccessKey: "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"
        }
    });

    return new DynamoDBDocumentClient(client)
}