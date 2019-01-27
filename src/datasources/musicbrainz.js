import { RESTDataSource } from 'apollo-datasource-rest';

export default class MusicBrainzAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://musicbrainz.org/ws/2/';
    this.formatJSON = '?fmt=json';
  }

  async getArtist(id) {
    return this.get(`artist/${id}${this.formatJSON}&inc=url-rels`);
  }

  async searchArtists(searchTerm) {
    return this.get(
      `artist/${this.formatJSON}&limit=20&query=artist:${searchTerm}`
    );
  }

  async getAlbum(id) {
    return this.get(`release/${id}${this.formatJSON}&inc=recordings+artists`);
  }

  async getAlbums(id) {
    return this.get(`release/${this.formatJSON}&artist=${id}`);
  }
}
