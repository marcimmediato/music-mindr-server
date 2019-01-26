const Query = {
  artist: async (parent, { id }, { dataSources }, info) => {
    const artist = await dataSources.musicBrainzAPI.getArtist(id);
    console.log(JSON.stringify(artist));
    return 'worked';
  }
};

export { Query as default };
