import { useEffect, useRef, useState } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import styles from './App.module.css';
// import TriggerButton from '../TriggerButton/TriggerButton';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });

  // определяем выбранный триггер по индексу и обрабатываем на нем события
  const handleTriggerClick = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
    setMenuOpen(!menuOpen);
  };

  // определим координаты триггера 
  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      buttonPosition.left = buttonRect.left;
      buttonPosition.top = buttonRect.bottom;
      console.log('Button position:', buttonRect);
    }
  }, [buttonPosition]);

  return (
    <div className={styles.content}>
      <div className={styles.component}>
        {/* <TriggerButton onClick={() => handleTriggerClick(1)} position={buttonPosition} /> */}
        <button ref={buttonRef} onClick={() => handleTriggerClick(1)} className={styles.triggerButton}></button>
        <DropdownMenu isOpen={activeMenuIndex === 1} onClose={() => setActiveMenuIndex(null)} triggerPosition={buttonPosition} />
      </div>
    </div>
  );
}

export default App;
