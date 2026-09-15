const mongoose = require('mongoose')

// const reviewSchema = new mongoose.Schema({
//     reviewBody: {
//         type: String
//     }
// })

const listingSchema = new mongoose.Schema({
    streetAddress:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted:{
        default: false,
        type: Boolean
    },
    favoritedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {timestamps: true})

const Listing = mongoose.model('Listing',listingSchema)

module.exports = Listing