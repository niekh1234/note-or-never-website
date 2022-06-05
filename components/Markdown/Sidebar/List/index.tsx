import { useAppSelector } from 'hooks/redux';
import { Note } from 'interfaces/types';
import { useRouter } from 'next/router';
import SidebarListItem from './Item';

interface SidebarListProps {
  notes: readonly Note[];
}

const SidebarList = ({ notes }: SidebarListProps) => {
  const { selected } = useAppSelector((state) => state.notes);
  const router = useRouter();

  return (
    <div className='flex flex-col space-y-2'>
      {notes?.map((note: Note) => (
        <SidebarListItem
          key={note.id}
          note={note}
          isActive={router.pathname !== '/' && note.id === selected?.id}
        ></SidebarListItem>
      ))}
    </div>
  );
};

export default SidebarList;
