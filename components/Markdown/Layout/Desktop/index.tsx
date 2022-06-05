import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setSelected } from 'store/slices/notes';
import EditorHeader from '../../Header';
import Sidebar from '../../Sidebar';
import MarkdownContentLayout from './Content';

const DesktopMarkdownLayout = () => {
  const router = useRouter();
  const { value: notes, selected } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  // set selected note to query id (if existing) otherwise set to first element
  useEffect(() => {
    if (notes?.items && notes?.items?.length > 0) {
      const activeNote = notes.items.find((note) => note.id === (router.query.handle as string));

      if (activeNote) {
        dispatch(setSelected(activeNote));
      } else {
        router.push('/homepage');
      }
    }
  }, [router, router.query.handle, notes?.items]);

  return (
    <div className='flex'>
      <Sidebar></Sidebar>

      {selected && (
        <main className='h-[calc(100vh-6rem)] bg-gray-800 w-[calc(100vw-20rem)]'>
          <EditorHeader></EditorHeader>

          <MarkdownContentLayout></MarkdownContentLayout>
        </main>
      )}
    </div>
  );
};

export default DesktopMarkdownLayout;
