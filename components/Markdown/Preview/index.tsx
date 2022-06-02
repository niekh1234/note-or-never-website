import { Note } from 'interfaces/types';
import { useRef, useState, useEffect, useMemo } from 'react';
import { classNames } from 'utils/classnames';

interface MarkdownPreviewProps {
  value: Note;
  scrollY: number;
}

const MarkdownPreview = ({ value, scrollY }: MarkdownPreviewProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wasmWorkerRef = useRef<Worker | null>();
  const [markdownHtml, setMarkdownHtml] = useState('');

  useMemo(() => {
    wasmWorkerRef.current = new Worker(new URL('../../../workers/wasm.worker.ts', import.meta.url));
    wasmWorkerRef.current.onmessage = (event) => {
      if (event?.data?.type === 'markdownHtmlData') {
        setMarkdownHtml(event.data.data);
      }
    };
  }, []);

  useEffect(() => {
    if (wasmWorkerRef.current) {
      wasmWorkerRef.current.postMessage({ type: 'parse', data: value.content });
    }
  }, [value]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerHeight =
        scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;

      scrollContainerRef.current.scrollTo(0, containerHeight * scrollY);
    }
  }, [scrollY]);

  return (
    <div ref={scrollContainerRef} className='flex flex-1 overflow-auto bg-gray-800'>
      <article
        className={classNames(
          'max-w-5xl w-full mx-auto p-4',
          true ? 'text-gray-300 never-markdown' : 'prose prose-invert',
        )}
        dangerouslySetInnerHTML={{ __html: markdownHtml }}
      ></article>
    </div>
  );
};

export default MarkdownPreview;
