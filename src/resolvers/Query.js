const Query = {
  artist: async (parent, { id }, { dataSources }, info) => {
    return await dataSources.spotifyAPI.getArtist(id);
  },
  artists: async (parent, { query }, { dataSources }, info) => {
    return await dataSources.spotifyAPI.searchArtists(query);
  },
  album: async (parent, { id }, { dataSources }, info) => {
    return await dataSources.spotifyAPI.getAlbum(id);
  },
  albums: async (parent, { query }, { dataSources }, info) => {
    return await dataSources.spotifyAPI.searchAlbums(query);
  },
  tracks: async (parent, { query }, { dataSources }, info) => {
    return await dataSources.spotifyAPI.searchTracks(query);
  }
};

export { Query as default };
