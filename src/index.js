import '@babel/polyfill/noConflict';
import server from './server';

server.listen().then(({ url }) => {
  console.log(`💿 Music Mindr server ready at ${url} 🎹`);
});
