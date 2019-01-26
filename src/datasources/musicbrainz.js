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
}
