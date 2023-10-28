var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()


app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/sept-assignment?retryWrites=true";

var client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true })

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var serviceSchema = new Schema({
    serviceName: { type: String, required: true }
})

var tutorSchema = new Schema({
    tutorName: { type: String, required: true },
    tutorAge: { type: String, required: true },
    tutorGender: { type: String, required: true },
    tutorNationality: { type: String, required: true },
    tutorSpecialty: { type: String, required: true },
    tutorExperience: { type: String, required: true },
    busyTime: { type: Array },
    dateCreated: { type: Date, default: Date.now }

})

var bookingSchema = new Schema({
    tutor: { type: String, required: true },
    booker: { type: String, required: true },
    timeBooking: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },

})



var serviceModel = mongoose.model('services', serviceSchema)
var tutorModel = mongoose.model('tutors', tutorSchema)
var bookingModel = mongoose.model('bookings', bookingSchema)

// CRUD services
app.route('/services')
    .get(function (req, res) {
        serviceModel.find({}, function (err, services) {
            res.json(services)
        })
    })
    .post(function (req, res) {
        serviceModel.create(req.body, function (err, service) {
            if (err) {
                res.json(err)
            } else {
                res.json(service)
            }
        })
    })

app.route('/services/:id')
    .put(function (req, res) {
        serviceModel.findByIdAndUpdate(req.params.id, {
            $set: { serviceName: req.body.serviceName },
        }, function () {
        })
        serviceModel.findById(req.params.id, function (err, service) {
            res.json(service)
        });
    })
    .delete(function (req, res) {
        serviceModel.findByIdAndRemove(req.params.id, function (err, service) {
            res.json(service)
        })
    })


// CRUD tutors
app.route('/tutors')
    .get(function (req, res) {
        tutorModel.find({}, function (err, services) {
            res.json(services)
        })
    })
    .post(function (req, res) {
        tutorModel.create(req.body, function (err, service) {
            res.json(service)
        })
    })

app.route('tutors/:id')
    .get(function (req, res) {
        tutorModel.findById(req.params.id, function (err, doc) {
            res.json(doc)
        })
    })
    .put(function (req, res) {
        tutorModel.findByIdAndUpdate(req.params.id, {
            $set: {
                tutorName: req.body.tutorName,
                tutorAge: req.body.tutorAge,
                tutorGender: req.body.tutorGender,
                tutorExperience: req.body.tutorExperience,
                tutorNationality: req.body.tutorNationality,
                tutorSpecialty: req.body.tutorSpecialty,
                busyTime: req.body.busyTime,

            },
        }, function () {
            console.log('update successfully')
        })
        tutorModel.findById(req.params.id, function (err, tutor) {
            res.json(tutor)
        });
    })
    .delete(function (req, res) {
        tutorModel.findByIdAndRemove(req.params.id, function (err, tutor) {
            res.json(tutor)
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
            if (err) {
                res.json(err)
            } else {
                res.json(booking)
            }
        })
    })

app.route('/bookings/:id')
    .get(function (req, res) {
        bookingModel.findById(req.params.id, function (err, doc) {
            res.json(doc)
        })
    })
    .put(function (req, res) {
        bookingModel.findByIdAndUpdate(req.params.id, {
            $set: { serviceName: req.body.serviceName },
        }, function () {
            console.log('update successfully')
        })
        bookingModel.findById(req.params.id, function (err, booking) {
            res.json(booking)
        });
    })
    .delete(function (req, res) {
        bookingModel.findByIdAndRemove(req.params.id, function (err, booking) {
            res.json(booking)
        })
    })

app.listen(3001)

// module.exports = {app, serviceModel}; // for testing