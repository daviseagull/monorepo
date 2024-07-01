import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { parsedEnv } from '../config/env.config'

export const cognitoUtils = {
  getVerifier: () => {
    return CognitoJwtVerifier.create({
      userPoolId: parsedEnv.COGNITO_USER_POOL_ID,
      tokenUse: 'id',
      clientId: parsedEnv.COGNITO_CLIENT_ID,
    })
  },

  cognitoServiceProvider: () => {
    return new CognitoIdentityProvider({
      region: parsedEnv.REGION,
    })
  },
}
