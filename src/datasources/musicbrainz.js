import { RESTDataSource } from 'apollo-datasource-rest';

export default class MusicBrainzAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://musicbrainz.org/ws/2/';
    this.formatJSON = '?fmt=json';
  }

  async getArtist(id) {
    const artist = await this.get(
      `artist/${id}${this.formatJSON}&inc=url-rels`
    );
    let spotifyId = null;

    if (artist.relations) {
      spotifyId = artist.relations
        .filter(artist => artist.type === 'streaming music')
        .find(stream => stream.url.resource.includes('spotify'))
        .url.resource.split('/')
        .pop();
    }

    return {
      id: artist.id,
      name: artist.name,
      mbId: artist.id,
      spotifyId
    };
  }

  async searchArtists(searchTerm) {
    const results = await this.get(
      `artist/${this.formatJSON}&limit=20&query=artist:${searchTerm}`
    );

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

  async getAlbum(id) {
    const album = await this.get(
      `release/${id}${this.formatJSON}&inc=recordings+artists`
    );
    const artistId = album['artist-credit'][0].artist.id;

    // const songs = album.media[0].tracks.map(track => {
    //   return {
    //     id: track.id,
    //     name: track.title,
    //     trackNum: track.number
    //   };
    // });

    return {
      id: album.id,
      name: album.title,
      artistId
    };
  }

  async getAlbums(id) {
    const albums = await this.get(`release/${this.formatJSON}&artist=${id}`);
    return albums.releases.map(album => {
      return {
        id: album.id,
        name: album.title,
        year: album.date.split('-')[0],
        country: album.country
      };
    });
  }
}
