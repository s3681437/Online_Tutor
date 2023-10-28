var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./testingServer").app;
let should = chai.should();
let bookingModel = require("./testingServer").bookingModel;
chai.use(chaiHttp);

let newBooking = {
    tutor: ' tutor',
    booker: ' booker',
    timeBooking: '3pm'
}
beforeEach(function(done) {
    bookingModel.deleteMany({}, (err, res) => {
        done();
    });
  });

    describe('/GET Booking', () => {
        it('it should GET all Bookings', (done) => {
            chai.request(server)
                .get('/bookings')
                .end((err, res) => {
                    res.should.have.status(200);        // success 
                    res.body.should.be.a('array');      // result type should be array 
                    // res.body.length.should.be.eql(0);   // result length should be 0 
                    done();
                })
        })
    })

    describe('/POST booking', () => {
        it('it should not create a booking without the any field', (done) => {
            let booking = {
                notName: ''
            }
            chai.request(server)
                .post('/bookings')
                .send(booking)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('tutor');
                    res.body.errors.should.have.property('booker');
                    res.body.errors.should.have.property('timeBooking');
                    res.body.errors.tutor.should.have.property('kind').eql('required');
                    res.body.errors.booker.should.have.property('kind').eql('required');
                    res.body.errors.timeBooking.should.have.property('kind').eql('required');

                    done();
                })
        })

        it('it should create a booking', (done) => {
            let booking = {
                tutor: 'tutor',
                booker: 'booker',
                timeBooking: '5pm'
            }
            chai.request(server)
                .post('/bookings')
                .send(booking)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql("Book successfully added");
                    res.body.should.have.property('tutor');
                    res.body.should.have.property('booker');
                    res.body.should.have.property('timeBooking');
                    res.body.should.have.property('dateCreated');
                    done();
                })
        })
    })

    // 
    describe('/PUT booking', () => {
        it('it should update a booking with given ID', (done) => {
            let bookingUpdate = {
                tutor: 'another tutor',
                booker: 'another booker',
                timeBooking: '6pm'
            }
            
            // create a new service and update it
            bookingModel.create(newBooking, function (err, booking) {
                chai.request(server)
                    .put('/bookings/' + booking._id)
                    .send(bookingUpdate)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('tutor');
                        res.body.should.have.property('booker');
                        res.body.should.have.property('timeBooking');
                        done();
                    })
            })
        })
    })

    describe('/DELETE booking', () => {
        it('it should delete a booking with given ID', (done) => {

            // create a new booking and delete it
            bookingModel.create(newBooking, function (err, booking) {

                chai.request(server)
                    .delete('/bookings/' + booking._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            })

        })
    })

    describe('/acceptBookingReq', ()=>{
        it('it should accept a booking request', (done) =>{
            bookingModel.create(newBooking, function(err, booking){

                chai.request(server)
                    .put('/acceptBookingReq/' + booking._id)
                    .end((err, res) =>{
                        console.log(err)
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        res.body.should.have.property('bookingStatus').eql('accepted') // edit success
                        done()
                    })
            })
        })
    })

    describe('/declineBookingReq', ()=>{
        it('it should decline a booking request', (done) =>{
            bookingModel.create(newBooking, function(err, booking){

                chai.request(server)
                    .put('/declineBookingReq/' + booking._id)
                    .end((err, res) =>{
                        console.log(err)
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        res.body.should.have.property('bookingStatus').eql('declined') // edit success
                        done()
                    })
            })
        })
    })


    describe('/bookingRequests', ()=>{
        it('it should fetch all booking requests', (done) =>{
            chai.request(server)
            .get('/bookingRequests')
            .end((err, res) => {
                res.should.have.status(200);        // success 
                res.body.should.be.a('array');      // result type should be array 
                // res.body.length.should.be.eql(0);   // result length should be 0 
                done();
            })
        })
    })





// describe('/GET tutors')









