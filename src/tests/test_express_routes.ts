import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';

import { startExpress } from '../express/startExpress';

import Logger from "../config/logger";

chai.use(chaiHttp);

describe('startExpress.ts', function () {
    describe('Test 404 Express routing', function () {
        it("Should return 404 status Test '/' route", async function () {
            return chai.request(startExpress(module))
                .get('/')
                .then(function (res) {
                    expect(res).to.have.a.status(404);

                }, function (err) {
                    Logger.error(err)
                });
        });

        it("Test 404 error route", async function () {
            return chai.request(startExpress(module))
                .get('/notARoute')
                .then(function (res) {
                    expect(res).to.have.a.status(404);
                }, function (err) {
                    Logger.error(err)
                });
        });    
    })
    describe("Users routing", function () {
        it("Should return status 200 /users/", async function (){
            return chai.request(startExpress(module))
            .get('/users/')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /users/login", async function (){
            return chai.request(startExpress(module))
            .get('/users/login')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /users/logout", async function (){
            return chai.request(startExpress(module))
            .get('/users/logout')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /users/delete", async function (){
            return chai.request(startExpress(module))
            .get('/users/delete')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /users/create", async function (){
            return chai.request(startExpress(module))
            .get('/users/create')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
    })

    describe("Encryption routing", function () {
        it("Should return status 200 /encrypt", async function (){
            return chai.request(startExpress(module))
            .get('/encrypt')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /encrypt/encrypt", async function (){
            return chai.request(startExpress(module))
            .post('/encrypt/encrypt')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
        it("Should return status 200 /encrypt/decrypt", async function (){
            return chai.request(startExpress(module))
            .post('/encrypt/decrypt')
            .then(function (res) {
                expect(res).to.have.a.status(200);
            }, function (err) {
                Logger.error(err)
            });
        })
    })
});

// describe('dataController', function() {
//     describe('getData()', async function() {
//         it("Should return data string", (done) => {
//             this.timeout(0)
//             chai.request(startApp)
//                 .get('/')
//                 .then(function (res) {
//                     expect(res).to.have.status(200);
//                 })
//                 .catch(function (err) {
//                     throw err
//                 })
//                 done();
//                 })
//         });
//     })