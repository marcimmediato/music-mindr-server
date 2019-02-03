import { RESTDataSource } from 'apollo-datasource-rest';
import getSpotifyClientToken from '../utils/getSpotifyClientToken';

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async willSendRequest(request) {
    const { access_token, token_type } = await getSpotifyClientToken();
    request.headers.set('Authorization', `${token_type} ${access_token}`);
  }

  async getArtist(id) {
    const artist = await this.get(`artists/${id}`);

    return {
      id: artist.id,
      name: artist.name
    };
  }

  async searchArtists(searchTerm, limit = 10) {
    const results = await this.get(
      `search?query=${searchTerm}&type=artist&limit=${limit}`
    );

    console.log(results.artists);

    if (results.count === 0) {
      throw new Error('No results found.');
    }

    return results.artists.items.map(({ id, name }) => {
      return {
        id,
        name
      };
    });
  }

  async getAlbum(id) {
    const album = await this.get(`albums/${id}`);

    return {
      id: album.id,
      name: album.name,
      artistId: album.artists[0].id
    };
  }

  async getArtistAlbums(id) {
    const artistAlbums = await this.get(`artists/${id}/albums`);
    console.log(artistAlbums);
    return artistAlbums.items
      .filter(({ album_type }) => album_type === 'album')
      .map(({ id, name }) => {
        return {
          id,
          name
        };
      });
  }

  async searchAlbums(searchTerm, limit = 10) {
    const results = await this.get(
      `search?query=${searchTerm}&type=album&limit=${limit}`
    );

    if (results.count === 0) {
      throw new Error('No results found.');
    }

    return results.albums.items.map(({ id, name, artists }) => {
      return {
        id,
        name,
        artistId: artists[0].id
      };
    });
  }

  async searchTracks(searchTerm, limit = 20) {
    const results = await this.get(
      `search?query=${searchTerm}&type=track&limit=${limit}`
    );

    if (results.count === 0) {
      throw new Error('No results found.');
    }

    return results.tracks.items.map(({ id, name, album, artists }) => {
      return {
        id,
        name,
        albumId: album.id,
        artistId: artists[0].id
      };
    });
  }
}
