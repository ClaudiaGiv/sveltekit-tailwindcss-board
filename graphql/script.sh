#!/bin/bash
curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H 'authorization: Basic Zm5BRVdqM0ROLUFDUUh4UjYtMTFuRC1mbENQMExIYmp5eEQ3dTlsazpQZXJzb25hbEthbmJhbjphZG1pbg==' -d '@json/body/create-board.json'
curl -X POST 'https://graphql.fauna.com/graphql' -H 'Content-Type: application/json' -H 'authorization: Basic Zm5BRVdqM0ROLUFDUUh4UjYtMTFuRC1mbENQMExIYmp5eEQ3dTlsazpQZXJzb25hbEthbmJhbjphZG1pbg==' -d '@json/body/create-users.json'

