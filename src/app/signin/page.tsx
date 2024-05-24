'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='max-w-md w-full space-y-8 px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-50'>
            Login
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mt-2'>
            Antes de adicionar músicas à playlist, você precisa fazer login.
          </p>
        </div>
        <div className='space-y-6'>
          <Button
            className='w-full flex items-center justify-center gap-2'
            variant='outline'
            onClick={() =>
              signIn('google', { callbackUrl: `${window.location.origin}/` })
            }
          >
            <ChromeIcon className='h-5 w-5' />
            Faça login com Google
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='12' r='4' />
      <line x1='21.17' x2='12' y1='8' y2='8' />
      <line x1='3.95' x2='8.54' y1='6.06' y2='14' />
      <line x1='10.88' x2='15.46' y1='21.94' y2='14' />
    </svg>
  );
}
