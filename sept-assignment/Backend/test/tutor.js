var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../testingServer").app;
let should = chai.should();
let tutorModel = require("../testingServer").tutorModel;
chai.use(chaiHttp);

let newTutor = {
    tutorName: 'tutor name',
    tutorAge:'tutor sample data',
    tutorGender: 'tutor sample data',
    tutorNationality: 'tutor sample data',
    tutorSpecialty: 'tutor sample data',
    tutorExperience: 'tutor sample data',
    busyTime: ['tutor sample data'],
}
beforeEach(function(done) {
    tutorModel.deleteMany({}, (err, res) => {
        done();
    });
  });

    describe('/GET tutors', () => {
        it('it should GET all tutors', (done) => {
            chai.request(server)
                .get('/tutors')
                .end((err, res) => {
                    res.should.have.status(200);        // success 
                    res.body.should.be.a('array');      // result type should be array 
                    // res.body.length.should.be.eql(0);   // result length should be 0 
                    done();
                })
        })
    })

    describe('/POST tutor', () => {
        it('it should not create a tutor without the tutor name field', (done) => {
            let tutor = {
                noTutorName: '',
                tutorAge:'tutor sample data',
                tutorGender: 'tutor sample data',
                tutorNationality: 'tutor sample data',
                tutorSpecialty: 'tutor sample data',
                tutorExperience: 'tutor sample data',
                busyTime: 'tutor sample data',
            }
            chai.request(server)
                .post('/tutors')
                .send(tutor)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('tutorName');
                    res.body.errors.tutorName.should.have.property('kind').eql('required');
                   

                    done();
                })
        })

        it('it should create a tutor', (done) => {
          
            chai.request(server)
                .post('/tutors')
                .send(newTutor)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql("Book successfully added");
                    res.body.should.have.property('tutorName');
                    res.body.should.have.property('tutorAge');
                    res.body.should.have.property('tutorGender');
                    res.body.should.have.property('tutorNationality');
                    res.body.should.have.property('tutorSpecialty');
                    res.body.should.have.property('tutorExperience');
                    res.body.should.have.property('busyTime');
                    res.body.should.have.property('dateCreated');
                    done();
                })
        })
    })

    // 
    describe('/PUT tutor', () => {
        it('it should update a tutor with given ID', (done) => {
            let tutorUpdate = {
                tutorName: 'new tutor name',
                tutorAge:'new tutor sample data',
                tutorGender: 'new tutor sample data',
                tutorNationality: 'new tutor sample data',
                tutorSpecialty: 'new tutor sample data',
                tutorExperience: 'new tutor sample data',
                busyTime: ['new tutor sample data'],
                dateCreated: "2019-06-29T17:58:42.856+00:00"
            }
            
            // create a new service and update it
            tutorModel.create(newTutor, function (err, tutor) {
                chai.request(server)
                    .put('/tutors/' + tutor._id)
                    .send(tutorUpdate)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('tutorName');
                        res.body.should.have.property('tutorAge');
                        res.body.should.have.property('tutorGender');
                        res.body.should.have.property('tutorNationality');
                        res.body.should.have.property('tutorSpecialty');
                        res.body.should.have.property('tutorExperience');
                        res.body.should.have.property('busyTime');
                        res.body.should.have.property('dateCreated');
                        done();
                    })
            })
        })
    })

    describe('/DELETE tutor', () => {
        it('it should delete a tutor with given ID', (done) => {

            // create a new tutor and delete it
            tutorModel.create(newTutor, function (err, tutor) {
                chai.request(server)
                    .delete('/tutors/' + tutor._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            })

        })
    })





// describe('/GET tutors')









