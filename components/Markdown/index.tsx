import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useRouter } from 'next/router';
import MarkdownLayout from './Layout';
import MarkdownLoadingSkeleton from './Skeleton';

const MarkdownNote = () => {
  const { value: notes, status, selected } = useAppSelector((state) => state.notes);

  if (status === 'loading' && !notes?.items) {
    return <MarkdownLoadingSkeleton></MarkdownLoadingSkeleton>;
  }

  return (
    <div className='bg-gray-800'>
      <MarkdownLayout></MarkdownLayout>
    </div>
  );
};

export default MarkdownNote;
