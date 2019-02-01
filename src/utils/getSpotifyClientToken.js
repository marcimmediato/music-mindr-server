import fetch from 'node-fetch';

const getSpotifyClientToken = async () => {
  // prettier-ignore
  let postOpts = {
    method: 'POST',
    body: new URLSearchParams("grant_type=client_credentials"),
    headers: {
      'Authorization': process.env.SPOTIFY_CLIENT_AUTH
    }
  };

  const res = await fetch('https://accounts.spotify.com/api/token', postOpts);
  return await res.json();
};

export { getSpotifyClientToken as default };
