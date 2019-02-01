import { RESTDataSource } from 'apollo-datasource-rest';

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  willSendRequest(request) {
    request.headers.set('User-Agent', 'MusicMindr/1.0 ( marc@immediato.io )');
  }

  // Get one specific artist
  async getArtist(id) {
    const artist = await this.get(
      `artist/${id}${this.formatJSON}&inc=url-rels`
    );
    let spotifyId = null;

    if (artist.relations) {
      const spotifyUrl = artist.relations
        .filter(artist => artist.type === 'streaming music')
        .find(stream => stream.url.resource.includes('spotify'));
      if (spotifyUrl) {
        spotifyId = spotifyUrl.url.resource.split('/').pop();
      }
    }

    return {
      id: artist.id,
      name: artist.name,
      spotifyId
    };
  }

  // Search for artists
  async searchArtists(searchTerm) {
    const results = await this.get(
      `artist/${this.formatJSON}&limit=5&query=artist:${searchTerm}`
    );

    if (results.count === 0) {
      throw new Error('No results found.');
    }

    return results.artists.map(({ id, name, disambiguation, score }) => {
      return {
        id,
        name,
        description: disambiguation,
        score
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

  async getAlbumGroups(artistId) {
    const albumGroups = await this.get(
      `release-group/${this.formatJSON}&artist=${artistId}&type=album|ep`
    );
    //prettier-ignore
    return {
      id: albumGroups.id,
      title: albumGroups.title,
      firstRelease: albumGroups.first-release-date,
      artistId
    };
  }

  async searchAlbums(searchTerm) {
    const results = await this.get(
      `release-group/${
        this.formatJSON
      }&limit=20&query=release-group:${searchTerm}`
    );

    //console.log('ok', results['release-groups'][0]);

    //prettier-ignore
    return results['release-groups'].map(release => {
      const { id, title, score } = release;
      return {
        id,
        title,
        score,
        artistId: release['artist-credit'][0].artist.id
      };
    });
  }
  // async getAlbumsForArtist(id) {
  //   const albums = await this.get(
  //     `release-group/${this.formatJSON}&artist=${id}&type=album|ep`
  //   );

  //   console.log(albums);
  //   //prettier-ignore
  //   return albums.release-groups.map(album => {
  //     return {
  //       id: album.id,
  //       name: album.title
  //       //year: album.date.split('-')[0],
  //       //country: album.country
  //     };
  //   });
  // }
}
