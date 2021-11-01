#!/bin/bash

#---Guide to follow first---
#1)Log into fauna cloud locally using fauna shell
#2)Import graphql schema in Fauna Playground for the nwly created db
#3)Run this script

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
fi

#param1 is the secret
#param2 is to a file listing json/body files to execute via curl

authorization=$1
dbName=${2:-Board}
fqlSource=${3:-fql}
jsonSource=${4:-json/body}


printf "\n----------Parameters:---------------------------------------------------\n\n"
echo "Auth token: $authorization"
echo "Database name: $dbName"
echo "FQL source: $fqlSource"
echo "JSON source: $jsonSource"
printf "\n"

#fauna cloud-login --secret=********** -- doesnt work in script!!!

printf "\n 1)----------Import graphql schema----------------------------------------\n"
fauna upload-graphql-schema ./gql/schema.gql #does not work yet

printf "\n 2)----------Execute fql queries-------------------------------------------\n"

for fileName in ./$fqlSource/*; do
  printf "\n----------File: $fileName -----------"
  eval "fauna eval $dbName --file=$fileName"
done

printf "\n\n 3)----------Execute graphql mutations--------------------------------------\n"

for fileName in ./$jsonSource/*; do
  printf "\n\n----------File: $fileName -----------\n"
  curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H "authorization: ${authorization}" -d ${fileName//'./'/'@'}
done

