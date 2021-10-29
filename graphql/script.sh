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
dbName=$2
fqlSource=$3
jsonSource=$4


printf "\n----------Parameters:---------------------------------------------------\n\n"
echo "Auth token: $authorization"
echo "FQL source: $fqlSource"
echo "JSON source: $jsonSource"
printf "\n"

printf "\n 1)----------Execute fql queries-------------------------------------------\n"

for fileName in ./$fqlSource/*; do
  #  cmd [option] "$file" >> results.out
  printf "\n----------File: $fileName -----------"
  eval "fauna eval $dbName --file=$fileName"
done

printf "\n\n 2)----------Execute graphql mutations--------------------------------------\n"

for fileName in ./$jsonSource/*; do
  printf "\n\n----------File: $fileName -----------\n"
  curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H "authorization: ${authorization}" -d ${fileName//'./'/'@'}
done
curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H "authorization:Basic Zm5BRVdqM0ROLUFDUUh4UjYtMTFuRC1mbENQMExIYmp5eEQ3dTlsazpQZXJzb25hbEthbmJhbi9Cb2FyZDphZG1pbg==" -d "@json/body/create-team.json"
##or testing, simply replace 'curl' with 'echo'

#while read source; do
#   curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H $authorization -d $source
#done <$source
