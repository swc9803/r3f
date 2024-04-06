import { atom, useAtom } from 'jotai';
import './style.scss';

// eslint-disable-next-line react-refresh/only-export-components
export const currentPageAtom = atom('intro');

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  return (
    <div className="ui-container">
      <section className={`ui-section ${currentPage === 'home' ? '' : 'hidden'}`}>
        <button onClick={() => setCurrentPage('store')} className="button-enter">
          ENTER
        </button>
      </section>
    </div>
  );
};
