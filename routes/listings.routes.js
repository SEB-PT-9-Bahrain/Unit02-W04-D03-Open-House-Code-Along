const router = require("express").Router()

router.get('/new',(req,res)=>{
    res.render('create-listing.ejs')
})


module.exports = router;
