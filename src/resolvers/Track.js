const Track = {
  async artist(parent, args, { dataSources }, info) {
    console.log('artist', parent);
    //return await dataSources.spotifyAPI.getArtist(parent.artist);
    return 'test';
  },
  async album(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getAlbums(parent.album);
  }
};
