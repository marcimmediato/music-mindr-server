const Track = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getArtist(parent.artistId);
  },
  async album(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getAlbum(parent.albumId);
  }
};

export { Track as default };
