const Query = {
  artist: async (parent, { id }, { dataSources }, info) => {
    let spotifyID = null;

    const artist = await dataSources.musicBrainzAPI.getArtist(id);

    if (artist.relations) {
      spotifyID = artist.relations
        .filter(artist => artist.type === 'streaming music')
        .find(stream => stream.url.resource.includes('spotify'))
        .url.resource.split('/')
        .pop();
    }

    return {
      id: artist.id,
      name: artist.name,
      mbID: artist.id,
      spotifyID
    };
  }
};

export { Query as default };
