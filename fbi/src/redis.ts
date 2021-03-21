import redis from 'redis';

const client = redis.createClient({
    host:process.env.REDISH_HOST
  });

client.on('error', function(error){
    throw new Error(error);
})

client.on('connect',function() {
    console.info('Connected to redish server')
})

export default client;