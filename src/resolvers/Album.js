const Album = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.musicBrainzAPI.getArtist(parent.artist);
  }
};

export { Album as default };
