// On call ioredis client will be created and attempt to connect to redis,
// If not availible client will continue redis connection attempts and reject
// Client requests after first attempt so Express() next can be called
// status variable can be called if wanted to check before making call as well
// Express Application can be started even while Redis is unavailible and stay availible...
// If connection lost

import { RedisClientType } from "@node-redis/client";
import Redis from "ioredis";
import Logger from "../config/logger";

var redStat: boolean = true;

// Export function for creating ioredis
async function createRedisClient() {

    const redis = new Redis({
        // Allow Zero Redis retries for quick redirect to next API
        maxRetriesPerRequest: 0,
        // Debugging Error stack, set to False in production 
        showFriendlyErrorStack: true,
    });

    // On Connection error print lastNodeError, and attempt default reconnect
    // Display Client status
    redis.on("error", (lastNodeError: Error) => {
        if (lastNodeError.message == "connect ECONNREFUSED 127.0.0.1:6379") {
            if (redStat == true) {
                Logger.warn("Redis Connection unavailable...Will attempt to reconnect....");
                Logger.debug(lastNodeError)
                Logger.debug(`Redis status is: ${redis.status}`)
                redStat = false;
            }
        };
    });

    // on Ready load redis with test data
    redis.on("ready", () => {
        if (redis.status == "ready") {
            redStat = true
            Logger.debug("Redis Connection established");
            redis.set("mykey", "value").then(() => {
                Logger.debug("Data loaded into Redis {mykey:value}")
                redis.keys("*").then((value) => {
                    Logger.debug(`Redis Keys retreived from new connection: ${value}`);
                })
            })
        }
    });
    return redis;
}

const redisClient = createRedisClient();

export { redisClient };