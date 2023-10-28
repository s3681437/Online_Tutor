/*
    This file is only for testing purpose only. Should be synced together with the file server.js 
    before running any npm test.
*/

const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/sept-assignment-testing?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true })

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const serviceSchema = new Schema({
    serviceName: { type: String, required: true },
    dateCreated: {type: Date, default: Date.now}
})

const tutorSchema = new Schema({
    tutorName: { type: String, required: true },
    tutorAge: { type: String, required: true },
    tutorGender: { type: String, required: true },
    tutorNationality: { type: String, required: true },
    tutorSpecialty: { type: String, required: true },
    tutorExperience: { type: String, required: true },
    busyTime: { type: Object },
    tutorImage: {type: String, default: "https://avatars.servers.getgo.com/2205256774854474505_medium.jpg"},
    dateCreated: { type: Date, default: Date.now }

})

const bookingSchema = new Schema({
    tutor: {type: String, required: true},
    booker: {type: String, required: true},
    timeBooking: {type: Object, required: true},
    bookingStatus: {type: String, default: 'pending'},
    dateCreated: {type: Date, default: Date.now},

})

const userSChema = new Schema({
    userEmail: {},
    userPassword: {},
    userContact: {},
    userGender: {},
    userAddress: {},
    dateCreated: {type: Date, default: Date.now}
})



const serviceModel = mongoose.model('services', serviceSchema)
const tutorModel = mongoose.model('tutors', tutorSchema)
const bookingModel = mongoose.model('bookings', bookingSchema)

// CRUD services
app.route('/services')
    .get(function (req, res) {
        serviceModel.find({}, function (err, services) {
            res.json(services)
        })
    })
    .post(function (req, res) {
        serviceModel.create(req.body, function (err, service) {
            if(err){
                res.json(err)
            }else{
            res.json(service)
            }
        })
    })

app.route('/services/:id')
    .put(function (req, res) {
        serviceModel.findByIdAndUpdate(req.params.id, {
            $set: { serviceName: req.body.serviceName },
        }, () => {
            console.log('update successfully')
        })
        serviceModel.findById(req.params.id, function (err, service) {
            res.json(service)
        });
    })
    .delete(function (req, res) {
        serviceModel.findByIdAndRemove(req.params.id, (err, service) => {
            res.json(service)
        })
    })


// CRUD tutors
// this works some how
app.route('/tutors/:id')
    .get(function(req, res){
        tutorModel.findById(req.params.id, function(err, doc){
            console.log(req.params.id)
            console.log(doc)
            console.log(err)
            if(err){
                res.json(err)
            } else{
                res.json(doc)
            }
        })
    })
    .put(function(req, res){
        tutorModel.findByIdAndUpdate(req.params.id, {
            $set: { tutorName: req.body.tutorName,
                    tutorAge: req.body.tutorAge,
                    tutorGender: req.body.tutorGender,
                    tutorExperience: req.body.tutorExperience,
                    tutorNationality: req.body.tutorNationality,
                    tutorSpecialty: req.body.tutorSpecialty,
                    busyTime: req.body.busyTime,

                },
        }, (err, tutor) => {
            console.log('update successfully')
        })
        tutorModel.findById(req.params.id, function (err, tutor) {
            if(err){
                res.json(err);
            } else{
                res.json(tutor)
            }
        });
    })

    .delete(function(req, res){
        tutorModel.findByIdAndRemove(req.params.id, (err, tutor) => {
            if(err){
                res.json(err);
            } else{
                res.json(tutor)
            }
        })
    })
app.route('/tutors')
    .get(function (req, res) {
        tutorModel.find({}, function (err, tutor) {
            res.json(tutor)
        })
    })
    .post(function (req, res) {
        tutorModel.create(req.body, function (err, tutor) {
            if(err){
                res.json(err)
            }else{
            res.json(tutor)
            }
        })
    })

// this doesn't work somehow?!
app.route('tutors/:id')
    .get(function(req, res){
        console.log('hello one tutor')
        tutorModel.findById(req.params.id, function(err, doc){
            console.log(req.params.id)
            console.log(doc)
            console.log(err)
            if(err){
                res.json(err)
            } else{
                res.json(doc)
            }
        })
    })
    .put(function (req, res) {
        tutorModel.findByIdAndUpdate(req.params.id, {
            $set: { tutorName: req.body.tutorName,
                    tutorAge: req.body.tutorAge,
                    tutorGender: req.body.tutorGender,
                    tutorExperience: req.body.tutorExperience,
                    tutorNationality: req.body.tutorNationality,
                    tutorSpecialty: req.body.tutorSpecialty,
                    busyTime: req.body.busyTime,

                },
        }, (err, tutor) => {
            console.log('update successfully')
        })
        tutorModel.findById(req.params.id, function (err, tutor) {
            if(err){
                res.json(err);
            } else{
                res.json(tutor)
            }
        });
    })
    .delete(function (req, res) {
        tutorModel.findByIdAndRemove(req.params.id, (err, tutor) => {
            if(err){
                res.json(err);
            } else{
                res.json(tutor)
            }
        })
    })


// CRUD bookings
app.route('/bookings')
    .get(function (req, res) {
        bookingModel.find({}, function (err, bookings) {
            res.json(bookings)
        })
    })
    .post(function (req, res) {
        bookingModel.create(req.body, function (err, booking) {
            if(err){
                res.json(err)
            }else{
            res.json(booking)
            }
        })
    })

app.route('/bookings/:id')
    .get(function(req, res){
        bookingModel.findById(req.params.id, function(err, doc){
            res.json(doc)
        })
    })
    .put(function (req, res) {
        bookingModel.findByIdAndUpdate(req.params.id, {
            $set: { tutor: req.body.tutor,
                booker: req.body.booker,
                timeBooking: req.body.timeBooking,
            },
        }, () => {
            console.log('update successfully')
        })
        bookingModel.findById(req.params.id, function (err, booking) {
            res.json(booking)
        });
    })
    .delete(function (req, res) {
        bookingModel.findByIdAndRemove(req.params.id, (err, booking) => {
            res.json(booking)
        })
    })

// SPRINT 2
// fetch booking request
app.route('/bookingRequests')
    .get(function(req, res){
        bookingModel.find({bookingStatus: 'pending'}, function(err, bookingReq){
            res.json(bookingReq)
        })
    })

app.route('/declineBookingReq/:id')
    .put(function(req, res){
        bookingModel.updateOne({_id: req.params.id}, {bookingStatus: 'declined'}, function(err, doc){
            if(err){
                res.json(err)
            } else{
                bookingModel.findOne({_id: req.params.id}, function(err, doc){
                    res.json(doc)
                })
            }
        })
    })

app.route('/acceptBookingReq/:id')
    .put(function(req, res){
        bookingModel.updateOne({_id: req.params.id}, {bookingStatus: 'accepted'}, function(err, doc){
            if(err){
                res.json(err)
            } else{
                bookingModel.findOne({_id: req.params.id}, function(err, doc){
                    res.json(doc)
                })
            }
        })
    })
module.exports = {app, serviceModel, bookingModel, tutorModel}; // for testing