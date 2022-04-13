import chai, { expect } from 'chai';

import chaiHttp from 'chai-http';

import spies from 'chai-spies';

import { startExpress } from '../express/startExpress'

chai.use(spies)
chai.use(chaiHttp);

describe("src/express/controllers/dataController.ts", function () {
    describe("Request Handaler 'getData()'", function () {
        it("Should return Data String", async function () {
            return chai.request(startExpress(module))
                .get('/data')
                .then(function (res) {
                    expect(res.text).to.be.a("String")
                }, function (err) {
                    console.log("im a fucking error")
                });
        }
        )
    })
})
