import { atom, useAtom } from 'jotai';
import './style.scss';

export const currentPageAtom = atom('intro');

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  return (
    <div className="ui-container">
      <section className={`ui-section ${currentPage === 'home' ? '' : 'hidden'}`}>
        <div className="h-[66%]"></div>
        <button onClick={() => setCurrentPage('store')} className="button-enter">
          ENTER
        </button>
      </section>
    </div>
  );
};
