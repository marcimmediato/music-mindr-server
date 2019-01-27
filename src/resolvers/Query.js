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
  },
  album: async (parent, { id }, { dataSources }, info) => {
    const album = await dataSources.musicBrainzAPI.getAlbum(id);
    const artist = await dataSources.musicBrainzAPI.getArtist(
      album['artist-credit'][0].artist.id
    );
    const songs = album.media[0].tracks.map(track => {
      return {
        id: track.id,
        name: track.title,
        trackNum: track.number
      };
    });

    return {
      id: album.id,
      name: album.title,
      artist: {
        id: artist.id,
        name: artist.name,
        mbID: artist.id
      },
      songs
    };
  },
  albums: async (parent, { query }, { dataSources }, info) => {
    const albums = await dataSources.musicBrainzAPI.getAlbums(query);
    return albums.releases.map(album => {
      return {
        id: album.id,
        name: album.title,
        year: album.date.split('-')[0],
        country: album.country
      };
    });
  }
};

export { Query as default };
