import '@babel/polyfill/noConflict';
import server from './server';
import getSpotifyClientToken from './utils/getSpotifyClientToken';

const res = getSpotifyClientToken().then(res => {
  console.log(res.access_token);
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`💿 Music Mindr server ready at ${url} 🎹`);
});
