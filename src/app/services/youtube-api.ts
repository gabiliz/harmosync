import axios from 'axios';

export const handleSearchVideo = async (searchTerm: string) => {
  const response = await axios({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      part: 'snippet',
      maxResults: 50,
      q: searchTerm,
      type: 'video',
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
  });
  return response.data.items;
};

export const handleAddVideoToPlaylist = async (
  id: string,
  accessToken: string
) => {
  const response = await axios({
    method: 'POST',
    url: 'https://www.googleapis.com/youtube/v3/playlistItems',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      part: 'snippet',
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
    data: {
      snippet: {
        playlistId: 'PLVgdy33MpOLQRfAC6GmqRELlZ98_u4Dd_',
        resourceId: {
          kind: 'youtube#video',
          videoId: id,
        },
      },
    },
  });
  return response.data;
};

export const handleListPlaylistItems = async () => {
  const response = await axios({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/playlistItems',
    params: {
      part: 'snippet',
      maxResults: 50,
      playlistId: 'PLVgdy33MpOLQRfAC6GmqRELlZ98_u4Dd_',
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    },
  });
  return response.data.items;
};
