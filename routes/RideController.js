const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, RideModel } = require('../db/schema')


//Index Route
router.get('/', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const ride = user.ride
        res.json(ride)
    } catch (err) {
        res.send(err)
    }
})


router.post('/', async (req, res) => {
    try {
        const newRide = new RideModel(req.body.ride)
        console.log(newRide)

        const user = await UserModel.findById(req.params.id)

        user.ride.push(newRide)

        const saved = await user.save()
        res.json(saved)
    } catch (err) {
        res.send(err)
    }
})


router.delete('/:rideId', async (req, res) => {
    try {
        console.log('route hit')
        const user = await UserModel.findById(req.params.id)
        console.log(req.params.rideId)
        user.ride.id(req.params.rideId).remove()
        const saved = await user.save()
        console.log(saved)
        res.json(saved)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;