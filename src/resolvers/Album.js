const Album = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.musicBrainzAPI.getArtist(parent.artistId);
  }
};

export { Album as default };
