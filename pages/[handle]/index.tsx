import MarkdownNote from 'components/Markdown';
import { useAppSelector } from 'hooks/redux';
import { NextPage } from 'next';
import Head from 'next/head';

const NoteHandlePage: NextPage = () => {
  const selectedNote = useAppSelector((state) => state.notes.selected);

  return (
    <>
      <Head>
        <title>{selectedNote?.title || 'Note or never'}</title>
      </Head>
      <MarkdownNote></MarkdownNote>
    </>
  );
};

export default NoteHandlePage;
