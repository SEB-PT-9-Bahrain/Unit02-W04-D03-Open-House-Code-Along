const router = require("express").Router()
const Listing = require('../models/Listing')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn,(req,res)=>{
    res.render('create-listing.ejs')
})

router.post('/', async (req,res)=>{
    const createdListing = await Listing.create({
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        price: req.body.price,
        size: req.body.size,
        owner: req.session.user._id
    })
    res.redirect('/listings')
})


router.get('/', async (req,res)=>{
    const listings = await Listing.find()
    res.render('all-listings.ejs',{listings: listings})
})

module.exports = router;
