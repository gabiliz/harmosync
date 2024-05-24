'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/video-card';
import { useState } from 'react';
import {
  handleAddVideoToPlaylist,
  handleListPlaylistItems,
  handleSearchVideo,
} from './services/youtube-api';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import LoadingPage from './loading/page';
import { useRouter } from 'next/navigation';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    videoOwnerChannelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

export default function Home() {
  const { data: sessionData, status } = useSession();
  const [videoData, setVideoData] = useState<Video[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [playlistData, setPlaylistData] = useState<Video[] | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (sessionData === null) {
      router.push('/signin');
      return;
    }

    const videoData = await handleSearchVideo(searchTerm);
    setVideoData(videoData);
    console.log(videoData);
    console.log(sessionData);
    setShowPlaylist(false);
  };

  const handleAddToPlaylist = async (id: string) => {
    const response = await handleAddVideoToPlaylist(
      id,
      sessionData?.accessToken!
    );
    console.log(response);
    toast({
      title: 'Video adicionado à playlist',
      description: 'O video foi adicionado à playlist com sucesso.',
    });
  };

  const handleListPlaylist = async () => {
    const response = await handleListPlaylistItems();
    console.log(response);
    setPlaylistData(response);
    setShowPlaylist(true);
  };

  const decodeHtml = (html: string) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (status === 'loading') return <LoadingPage />;
  // if (sessionData === null) {
  //   return <SignIn />;
  // }

  return (
    <main className='flex flex-col items-center justify-center bg-gray-100 min-h-screen dark:bg-gray-800 py-8 sm:py-12 md:py-16 lg:py-20'>
      <div className='text-center space-y-4 mb-8 px-4 sm:px-6 md:px-8 lg:px-10'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50'>
          Harmosync
        </h1>
      </div>
      <div className='w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Input
            className='w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-primary'
            placeholder='Pesquise por videos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className='w-full sm:w-auto' onClick={handleSearch}>
            Pesquisar
          </Button>
        </div>
        <div className='flex items-center justify-center mt-6'>
          <Button variant={'ghost'} onClick={handleListPlaylist}>
            Visualizar playlist
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl mt-8'>
        {!showPlaylist &&
          videoData &&
          videoData.map((video) => (
            <VideoCard
              key={video.id.videoId}
              channel={video.snippet.channelTitle}
              videoThumbnail={video.snippet.thumbnails.high.url}
              videoTitle={decodeHtml(video.snippet.title)}
              onClick={() => handleAddToPlaylist(video.id.videoId)}
            />
          ))}
        {showPlaylist &&
          playlistData &&
          playlistData.map((video) => (
            <VideoCard
              key={video.id.videoId}
              channel={video.snippet.videoOwnerChannelTitle}
              videoThumbnail={video.snippet.thumbnails.high.url}
              videoTitle={decodeHtml(video.snippet.title)}
              isPlaylist
            />
          ))}
      </div>
    </main>
  );
}
