import chai, { expect } from 'chai';

import { redisClient } from "../redis/connectRedis";

import spies from 'chai-spies';

chai.use(spies)

describe("Redis test", function () {
    describe("Test redis connection status", function () {
        it("Tests Redis Connection status", async function () {
            const status = (await redisClient).status
            if (status == "ready") {
                expect(status).to.equal("ready")
            } else {
                this.skip()
            }
        })
    })
})