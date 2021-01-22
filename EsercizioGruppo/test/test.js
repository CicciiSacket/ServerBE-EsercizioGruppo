var assert = require('assert')
const request = require('supertest')
var chai = require('chai').should()
const app = require('../app.js');

describe('POST', ()=>{
    it('/register', async ()=>{
        const {body,status} = await request(app).post('/register').set('Accept', 'application/json').send({username:"pippo@mail.com", password:"pluto"})
        status.should.equal(201) 
    });
});