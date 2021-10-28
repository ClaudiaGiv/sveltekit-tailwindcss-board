#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
fi

#param1 is the secret
#param2 is to a file listing json/body files to execute via curl

authorization=$1
fqlSource=$2
jsonSource=$3

printf "\n----------Parameters:---------------------------------------------------\n\n"
echo "Auth token: $authorization"
echo "FQL source: $fqlSource"
echo "JSON source: $jsonSource"
printf "\n"

printf "\n 1)----------Execute fql queries-------------------------------------------\n"

for fileName in ./$fqlSource/*; do
  #  cmd [option] "$file" >> results.out
  printf "\n----------File: $fileName -----------"
  #eval "fauna eval Board --file=$fileName"
  #eval "fauna eval Board --file=./fql/CreateUsers.fql"
done

printf "\n\n 2)----------Execute graphql mutations--------------------------------------\n"

for fileName in ./$jsonSource/*; do
  printf "\n\n----------File: $fileName -----------\n"
#  echo -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H "authorization: ${authorization}" -d ${fileName//'./'/'@'}
  curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H "authorization: ${authorization}" -d ${fileName//'./'/'@'}
done

##or testing, simply replace 'curl' with 'echo'

#while read source; do
#   curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H $authorization -d $source
#done <$source
