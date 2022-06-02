import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import Tooltip from 'components/Tooltip';
import { useAppDispatch } from 'hooks/redux';
import { useRouter } from 'next/router';
import { addNote } from 'store/slices/notes';

const AddNoteButton = () => {
  const dispatch = useAppDispatch();

  const add = async () => {
    dispatch(addNote());
  };

  return (
    <Tooltip position='right' msg='Add a new note'>
      <button onClick={() => add()} className='p-1 rounded hover:bg-gray-700'>
        <PencilAltIcon className='w-5 h-5 text-gray-300'></PencilAltIcon>
      </button>
    </Tooltip>
  );
};

export default AddNoteButton;
