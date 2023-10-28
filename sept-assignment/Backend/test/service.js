var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../testingServer").app;
let should = chai.should();
let serviceModel = require("../testingServer").serviceModel;
chai.use(chaiHttp);


beforeEach(function(done) {
    serviceModel.deleteMany({}, (err, res) => {
        done();
    });
  });

    describe('/GET services', () => {
        it('it should GET all services', (done) => {
            chai.request(server)
                .get('/services')
                .end((err, res) => {
                    res.should.have.status(200);        // success 
                    res.body.should.be.a('array');      // result type should be array 
                    // res.body.length.should.be.eql(0);   // result length should be 0 
                    done();
                })
        })
    })

    describe('/POST services', () => {
        it('it should not post a service without the name field', (done) => {
            let service = {
                notName: ''
            }
            chai.request(server)
                .post('/services')
                .send(service)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('serviceName');
                    res.body.errors.serviceName.should.have.property('kind').eql('required');
                    done();
                })
        })

        it('it should post a service', (done) => {
            let service = {
                serviceName: 'tutor'
            }
            chai.request(server)
                .post('/services')
                .send(service)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql("Book successfully added");
                    res.body.should.have.property('serviceName');
                    done();


                })
        })
    })

    // 
    describe('/PUT services', () => {
        it('it should update a service with given ID', (done) => {
            let serviceUpdate = {
                serviceName: 'not a tutor service'
            }

            // create a new service and update it
            serviceModel.create({ serviceName: 'a new service' }, function (err, service) {
                chai.request(server)
                    .put('/services/' + service._id)
                    .send(serviceUpdate)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('serviceName');
                        done();
                    })
            })
        })
    })

    describe('/DELETE services', () => {
        it('it should delete a service with given ID', (done) => {

            // create a new service and delete it
            serviceModel.create({ serviceName: 'a new service' }, function (err, service) {

                chai.request(server)
                    .delete('/services/' + service._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            })

        })
    })





// describe('/GET tutors')









