const axios = require('axios')
const router = require('express').Router()

router.get('/:tradingPair', (req, res)=>{    
    let config = {
    method: 'get',
    url: `https://api.coinbase.com/api/v3/brokerage/products/${req.params.tradingPair}`,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${req.body.token}`
    },

    };

    axios(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    res.send(JSON.stringify(response.data))
    })
    .catch((error) => {
    console.log(error);
    });   
})


module.exports = router