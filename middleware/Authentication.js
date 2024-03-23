
//

function Authentication(req, res, next){

    const { sign } = require('jsonwebtoken');
    const crypto = require('crypto');
    
    const key_name       = `${process.env.API_KEY_NAME}`;
    const key_secret = `${process.env.PRIVATE_KEY}`;
    const request_method = 'GET';
    const url = 'api.coinbase.com';
    const request_path = '/api/v3/brokerage/products/ETH-USD';
    const service_name = "retail_rest_api_proxy"
    
    const algorithm = 'ES256';
    const uri = request_method + ' ' + url + request_path;
    
    const token = sign(
            {
                aud: [service_name],
                iss: 'coinbase-cloud',
                nbf: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 120,
                sub: key_name,
                uri,
            },
            key_secret,
            {
                algorithm,
                header: {
                    kid: key_name,
                    nonce: crypto.randomBytes(16).toString('hex'),
                },
            }
    );
    req.body.token = token
    next()
   

}


module.exports = Authentication

