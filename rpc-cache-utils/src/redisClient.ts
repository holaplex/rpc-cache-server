import redis from "redis";

export enum RedisClientUser {
  Reader,
  Writer,
}

export const getRedisClient = (
  clientType: RedisClientUser
): redis.RedisClient => {
  if (process.env.ENV?.toLowerCase() === "aws") {
    const url =
      clientType === RedisClientUser.Reader
        ? `${process.env.REDIS_SERVER_READ_URL}:${process.env.REDIS_SERVER_PORT}`
        : `${process.env.REDIS_SERVER_PRIMARY_URL}:${process.env.REDIS_SERVER_PORT}`;

    console.log(`Connecting to redis via '${url}'...`);

    return redis.createClient(url);
  } else {
    return redis.createClient();
  }
};
