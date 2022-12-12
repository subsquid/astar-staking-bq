import fs from 'fs'
import {BigQuery} from '@google-cloud/bigquery'
import { assertNotNull } from '@subsquid/substrate-processor'


if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const keyData = `
  {
    "type": "service_account",
    "project_id": "${assertNotNull(process.env.GOOGLE_PROJECT_ID, 'GOOGLE_PROJECT_ID must be set')}",
    "private_key_id": "${assertNotNull(process.env.GOOGLE_PRIVATE_KEY_ID, 'GOOGLE_PRIVATE_KEY_ID must be set')}",
    "private_key": "-----BEGIN PRIVATE KEY-----\\n${assertNotNull(process.env.GOOGLE_PRIVATE_KEY, 'GOOGLE_PRIVATE_KEY must be set')}\\n-----END PRIVATE KEY-----\\n",
    "client_email": "${assertNotNull(process.env.GOOGLE_CLIENT_EMAIL, 'GOOGLE_CLIENT_EMAIL must be set')}",
    "client_id": "${assertNotNull(process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_ID must be set')}",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "${assertNotNull(process.env.GOOGLE_CLIENT_X509_CERT_URL, 'GOOGLE_CLIENT_X509_CERT_URL must be set')}"
  }  
  `
  fs.writeFileSync(`${__dirname}/../../assets/private-key.json`, keyData)
  process.env.GOOGLE_APPLICATION_CREDENTIALS=`${__dirname}/../../assets/private-key.json` 
}

export const bigQuery = new BigQuery();

