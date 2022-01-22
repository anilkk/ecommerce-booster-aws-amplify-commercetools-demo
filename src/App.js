import { useState, useEffect } from 'react';
import './App.css';

import Amplify from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
import {AmplifyProvider} from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
import { ProductCollection } from './ui-components';

const { createClient } = require('@commercetools/sdk-client')
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
const { createApiBuilderFromCtpClient } = require("@commercetools/typescript-sdk");
  
const fetch = require('node-fetch')
// require('dotenv').config()

console.log('Getting started with commercetools Typescript SDK and GraphQL API');

Amplify.configure(awsconfig);

const { 
  REACT_APP_CTP_PROJECT_KEY,
REACT_APP_CTP_CLIENT_SECRET,
REACT_APP_CTP_CLIENT_ID,
REACT_APP_CTP_AUTH_URL,
REACT_APP_CTP_API_URL,
REACT_APP_CTP_SCOPES
} = process.env;

const projectKey = REACT_APP_CTP_PROJECT_KEY

// Create a httpMiddleware for the your project AUTH URL
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: REACT_APP_CTP_AUTH_URL,
  projectKey,
  credentials: {
      clientId: REACT_APP_CTP_CLIENT_ID,
      clientSecret: REACT_APP_CTP_CLIENT_SECRET,
  },
  scopes: [REACT_APP_CTP_SCOPES],
  fetch,
})

// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
  host: REACT_APP_CTP_API_URL,
  fetch,
})

// Create a client using authMiddleware and httpMiddleware
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

// Create a API root from API builder of commercetools platform client
const apiRoot = createApiBuilderFromCtpClient(client)

// GraphQL query to get commercetools project settings
const productCollectionQuery = `
query {
  products {
    results {
      id, 
      masterData {
        current {
          name ( locale: "en"),
          masterVariant {
            price (currency: "EUR") {
              value {
                centAmount
              }
            },
            images {
              url
            }
          }
        }
      }
    }
  }
}
`


function App() {
  const [productCollectionData, setProductCollectionData] = useState([
    { name: 'product 1', price: '100 EUR'},
    { name: 'product 2'},
  ]);
  useEffect(async () => {
    await apiRoot.withProjectKey({projectKey}).graphql()
            .post({
                body : {
                    query: productCollectionQuery,
                    variables: {}
                }
            })
            .execute()
            .then(data => {
                setProductCollectionData(data.body.data.products.results.map(({id, masterData}) => ({
                  id: id,
                  name: masterData.current.name,
                  price: (masterData.current.masterVariant.price.value.centAmount/100) + " EUR",
                  imageUrl: masterData.current.masterVariant.images[0].url
                })));
            })
            .catch(error => {
                console.log('ERROR --->', error);
            })
  }, []);
  return (
    <AmplifyProvider>
      <div className="App">
      <ProductCollection items={productCollectionData} />
      </div>
    </AmplifyProvider>
  );
}

export default App;
