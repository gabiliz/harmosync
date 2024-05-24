export default function LoadingPage() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent' />
      </div>
    </div>
  );
}
