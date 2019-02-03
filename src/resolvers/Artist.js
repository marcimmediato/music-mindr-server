const Artist = {
  async albums(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getArtistAlbums(parent.id);
  }
};

export { Artist as default };
