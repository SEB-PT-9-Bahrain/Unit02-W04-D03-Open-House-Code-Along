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
    const listings = await Listing.find({isDeleted:false})
    res.render('all-listings.ejs',{listings: listings})
})

router.get('/:listingId', async (req,res)=>{
    const foundListing = await Listing.findOne({_id:req.params.listingId, isDeleted:false}).populate('owner')
    res.render('listing-details.ejs',{listing: foundListing})
})

router.delete('/:listingId', isSignedIn, async (req,res)=>{
    const foundListing = await Listing.findById(req.params.listingId)
    if(!foundListing.owner.equals(req.session.user._id)){
        return res.send('You are not the owner')
    }
    const deletedListing = await Listing.findByIdAndUpdate(req.params.listingId,{isDeleted: true})
    res.redirect('/listings')
})


router.get('/:listingId/edit', async (req,res)=>{
    const foundListing = await Listing.findById(req.params.listingId)
    res.render('update-listing.ejs',{listing: foundListing})
})

router.put('/listings/:listingId', async(req,res)=>{
    const updatedListing = await Listing.findByIdAndUpdate(req.params.listingId, req.body)
})

module.exports = router;
