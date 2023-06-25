#!/bin/bash

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 601766089601.dkr.ecr.us-east-1.amazonaws.com
docker build -t house-data-web-app-repo .
docker tag house-data-web-app-repo:latest 601766089601.dkr.ecr.us-east-1.amazonaws.com/house-data-web-app-repo:latest
docker push 601766089601.dkr.ecr.us-east-1.amazonaws.com/house-data-web-app-repo:latest