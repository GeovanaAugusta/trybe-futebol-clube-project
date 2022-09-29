import * as jwt from 'jsonwebtoken';

// Module '"/home/usuario/sd-020-a-trybe-futebol-clube/app/backend/node_modules/@types/jsonwebtoken/index"' has no default export.

// console.log(process.env.JWT_SECRET);

const jwtConfig: jwt.SignOptions = {
  expiresIn: '9d',
  algorithm: 'HS256',
};

const auth = {
  secret: String(process.env.JWT_SECRET),
};

const getToken = (email: string): string => {
  const token = jwt.sign({ payload: email }, auth.secret, jwtConfig);
  return token;
};

export default getToken;

// SOURCE
// https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/ usei de base essa solução:

// import { sign, SignOptions } from 'jsonwebtoken';
// import * as fs from 'fs';
// import * as path from 'path';

// /**
//  * generates JWT used for local testing
//  */
// export function generateToken() {
//   // information to be encoded in the JWT
//   const payload = {
//     name: 'Andrés Reales',
//     userId: 123,
//     accessTypes: [
//       'getTeams',
//       'addTeams',
//       'updateTeams',
//       'deleteTeams'
//     ]
//   };
//   // read private key value
//   const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));

//   const signInOptions: SignOptions = {
//     // RS256 uses a public/private key pair. The API provides the private key
//     // to generate the JWT. The client gets a public key to validate the
//     // signature
//     algorithm: 'RS256',
//     expiresIn: '1h'
//   };

//   // generate JWT
//   return sign(payload, privateKey, signInOptions);
// };

// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

// https://dev.to/vitordelfino/autenticacao-com-jwt-22o7 usei de base para conseguir pegar a JWT_SECRET do .env, direto dava erro

// export const auth = {
//   secret: String(process.env.SECRET),
//   expires: '1h',
// };

// https://typescript.hotexamples.com/pt/examples/jsonwebtoken/-/verify/typescript-verify-function-examples.html exemplo número 6

// let token = jwt.sign(payload, config.token_secret, options)

// Dia 3 - hello-jwt - arquivo auth do middlewares (24)
