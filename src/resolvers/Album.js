const Album = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getArtist(parent.artistId);
  },
  async tracks(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getAlbumTracks(parent.id);
  }
};

export { Album as default };
