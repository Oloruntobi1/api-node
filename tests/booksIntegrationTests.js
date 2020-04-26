require('should');

const request = require('supertest');

process.env.ENV = 'Test';
const mongoose = require('mongoose');

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
    it('should allow a book to be posted and retun read and _id', (done) => {
        const bookPost = {title: 'Isheyen', author: 'Jon', genre: 'Fiction'};

        agent.post('/api/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
            // console.log(results);
            // results.body.read.should.not.equal(false);
            results.body.should.have.property('_id');
            done();
        });
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();

    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
      });
    });