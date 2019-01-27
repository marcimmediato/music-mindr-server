const Query = {
  artist: async (parent, { id }, { dataSources }, info) => {
    return await dataSources.musicBrainzAPI.getArtist(id);
  },
  artists: async (parent, { query }, { dataSources }, info) => {
    return await dataSources.musicBrainzAPI.searchArtists(query);
  },
  album: async (parent, { id }, { dataSources }, info) => {
    return await dataSources.musicBrainzAPI.getAlbum(id);
  },
  albums: async (parent, { query }, { dataSources }, info) => {
    return await dataSources.musicBrainzAPI.getAlbums(query);
  }
};

export { Query as default };
