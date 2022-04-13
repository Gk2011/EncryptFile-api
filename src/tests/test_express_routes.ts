import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';

import { startExpress } from '../express/startExpress';

chai.use(chaiHttp);

describe('startExpress.ts', function () {
    describe('Test Express routing', function () {
        it("Test '/' route", async function () {
            return chai.request(startExpress(module))
                .get('/')
                .then(function (res) {
                    expect(res).to.have.a.status(200);

                }, function (err) {
                    console.log("im a fucking error")
                });
        });

        it("Test '/data' route", async function () {
            return chai.request(startExpress(module))
                .get('/')
                .then(function (res) {
                    expect(res).to.have.a.status(200);
                }, function (err) {
                    console.log("im a fucking error")
                });
        });

        it("Test 404 error route", async function () {
            return chai.request(startExpress(module))
                .get('/notARoute')
                .then(function (res) {
                    expect(res).to.have.a.status(404);
                }, function (err) {
                    console.log("im a fucking error")
                });
        });
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