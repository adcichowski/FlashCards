import { expressjwt } from "express-jwt";
import JwksRsa from "jwks-rsa";
//TODO: Create validate JWT using Auth0
//https://auth0.com/docs/get-started/architecture-scenarios/spa-api/api-implementation-nodejs
export const checkJwt = expressjwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_DOMAIN/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "{YOUR_API_IDENTIFIER}", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://YOUR_DOMAIN/",
  algorithms: ["RS256"],
});
