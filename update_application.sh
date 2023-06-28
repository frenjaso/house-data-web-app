#!/bin/bash

./docker_push_commands.sh && \
aws ecs update-service --cluster house-data-web-app-cluster2 --service house-data-web-app-service2 --force-new-deployment --region us-east-1