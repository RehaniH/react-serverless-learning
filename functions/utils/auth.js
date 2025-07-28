const jwks = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTH0_AUDIENCE,
});

const { promisify } = require("util");

function getAuthHeader(headers) {
  if (!headers.authorization) {
    return null;
  }

  // Split the header on 'Bearer '
  const authHeaderSections = headers.authorization.split("Bearer ");

  if (authHeaderSections[0] !== "" || authHeaderSections.length !== 2) {
    return null;
  }

  return authHeaderSections[1].trim();
}

const validateToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;
    const alg = decodedToken.header.alg;
    const getSigningKey = promisify(jwksClient.getSigningKey);

    const key = await getSigningKey(kid);
    const signingKey = key.publicKey;
    const options = {
      algorithms: alg,
    };
    jwt.verify(token, signingKey, options);
    return decodedToken.payload;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getAuthHeader,
  validateToken,
};
