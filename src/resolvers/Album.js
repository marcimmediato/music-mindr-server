const Album = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.spotifyAPI.getArtist(parent.artistId);
  }
};

export { Album as default };
