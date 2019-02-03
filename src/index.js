import '@babel/polyfill/noConflict';
import server from './server';

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`💿 Music Mindr server ready at ${url} 🎹`);
});
