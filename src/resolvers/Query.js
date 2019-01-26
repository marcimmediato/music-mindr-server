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
  },
  artists: async (parent, { query }, { dataSources }, info) => {
    const results = await dataSources.musicBrainzAPI.searchArtists(query);

    if (results.count === 0) {
      throw new Error('No results found.');
    }

    return results.artists.map(({ id, name, disambiguation }) => {
      return {
        id,
        name,
        description: disambiguation
      };
    });
  }
};

export { Query as default };
