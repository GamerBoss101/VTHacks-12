import { tunnelmole } from 'tunnelmole';

const url = await tunnelmole({
  port: 11434
});

console.log(`Your localtunnel is available at ${url}`);