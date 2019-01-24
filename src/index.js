import '@babel/polyfill/noConflict';
import server from './server';

server.start(() => {
  console.log('The music-mindr server is up!');
});
