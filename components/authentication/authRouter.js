const { Router } = require('express');
// const { body, header } = require('express-validator');

const router = Router();

router.get('/',(req,res)=>{
    res.json('works');
});

module.exports = router;
