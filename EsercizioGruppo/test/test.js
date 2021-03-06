const request = require('supertest')
var chai = require('chai').should()
const app = require('../app.js');

describe('POST', ()=>{ //test: OK
    it('/auth/register', async ()=>{
        const {body,status} = await request(app).post('/auth/register').set('Accept', 'application/json').send({username:'pippo@mail.com',password:'pluto'})
        // console.log(body)
        status.should.equal(200) 
    });
    it('/auth/login (nuovo token)', async ()=>{
        const {body,status} = await request(app).post('/auth/login').set('Accept', 'application/json').set('authorization'," ").send({username:'pippo@mail.com',password:'pluto'})
        console.log(body)
        status.should.equal(201) 
    });
    it('/auth/login', async ()=>{
        const {body,status} = await request(app).post('/auth/login').set('Accept', 'application/json').set('authorization',"LqaDQrAJtHvFVDro7noCr3").send({username:'pippo@mail.com',password:'pluto'})
        // console.log(body)
        status.should.equal(200) 
    });
});

describe('GET',  ()=>{//test: OK
    it('/products ', async () => {
        const {status, body} =  await request(app).get('/products').set('Accept', 'application/json').set('authorization',"LqaDQrAJtHvFVDro7noCr3")
        status.should.equal(200);
    });
    it('/products/:id', async () =>{
        const {status} = await request(app).get('/products/5296').set('Accept', 'application/json').set('authorization',"LqaDQrAJtHvFVDro7noCr3")
        status.should.equal(200)
    }); 
})

describe('DELETE', ()=>{//test: OK
    it('/auth/logout', async () =>{
        const {status} = await request(app).delete('/auth/logout').set('Accept', 'application/json').set('authorization',"LqaDQrAJtHvFVDro7noCr3")
        status.should.equal(200)
    });
})

