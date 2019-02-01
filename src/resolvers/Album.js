const AlbumResult = {
  async artist(parent, args, { dataSources }, info) {
    return await dataSources.musicBrainzAPI.getArtist(parent.artistId);
  }
};

export { AlbumResult as default };
