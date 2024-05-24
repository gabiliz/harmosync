'use client';

import Image from 'next/image';
import { Button } from './ui/button';

interface VideoCardProps {
  videoTitle: string;
  channel: string;
  videoThumbnail: string;
  isPlaylist?: boolean;
  onClick?: () => void;
}

export default function VideoCard({
  videoTitle,
  channel,
  videoThumbnail,
  isPlaylist,
  onClick,
}: VideoCardProps) {
  const truncateTitle = (title: string, length: number) => {
    return title.length > length ? title.substring(0, length) + '...' : title;
  };
  const truncatedTitle = truncateTitle(videoTitle, 50);

  return (
    <div className='group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-950 flex flex-col'>
      <div className='flex-grow'>
        <Image
          alt='Video Thumbnail'
          className='h-48 w-full object-cover'
          height={225}
          src={videoThumbnail}
          style={{
            aspectRatio: '400/225',
            objectFit: 'cover',
          }}
          width={400}
        />
        <div className='p-4'>
          <h3 className='text-lg font-medium text-gray-900 group-hover:text-primary dark:text-gray-50'>
            {truncatedTitle}
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{channel}</p>
        </div>
      </div>
      {!isPlaylist && (
        <div className='p-4 flex justify-end'>
          <Button
            className='text-white hover:text-primary dark:text-gray-400 dark:hover:text-primary'
            onClick={onClick}
          >
            Adicionar a playlist
          </Button>
        </div>
      )}
    </div>
  );
}
