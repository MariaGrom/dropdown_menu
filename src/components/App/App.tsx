import { useEffect, useRef, useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import styles from "./App.module.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // рефы для трех кнопок-триггеров
  const buttonRef1 = useRef<HTMLButtonElement | null>(null);
  const buttonRef2 = useRef<HTMLButtonElement | null>(null);
  const buttonRef3 = useRef<HTMLButtonElement | null>(null);

  // состояние активного DropdownMenu
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  // переменные состояния позиции кнопок-триггеров
  const [buttonPosition1, setButtonPosition1] = useState({ left: 0, top: 0 });
  const [buttonPosition2, setButtonPosition2] = useState({ left: 0, top: 0 });
  const [buttonPosition3, setButtonPosition3] = useState({ left: 0, top: 0 });

  // определяем выбранную кнопку-триггер по индексу и обрабатываем на ней событие
  const handleTriggerClick = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
    setMenuOpen(!menuOpen);
  };

  // определим координаты кнопки-триггера 1
  useEffect(() => {
    if (buttonRef1.current) {
      const buttonRect = buttonRef1.current.getBoundingClientRect();
      setButtonPosition1({ left: buttonRect.left, top: buttonRect.bottom });
    }
  }, []);

  // определим координаты кнопки-триггера 2
  useEffect(() => {
    if (buttonRef2.current) {
      const buttonRect = buttonRef2.current.getBoundingClientRect();
      setButtonPosition2({ left: buttonRect.left, top: buttonRect.bottom });
    }
  }, []);

  // определим координаты кнопки-триггера 3
  useEffect(() => {
    if (buttonRef3.current) {
      const buttonRect = buttonRef3.current.getBoundingClientRect();
      setButtonPosition3({ left: buttonRect.left, top: buttonRect.bottom });
    }
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.component}>
        <button
          ref={buttonRef1}
          onClick={() => handleTriggerClick(1)}
          className={styles.triggerButton}
        ></button>
        <DropdownMenu
          isOpen={activeMenuIndex === 1}
          onClose={() => setActiveMenuIndex(null)}
          triggerPosition={buttonPosition1}
        />
      </div>
      <div className={styles.component}>
        <button
          ref={buttonRef2}
          onClick={() => handleTriggerClick(2)}
          className={styles.triggerButton}
        ></button>
        <DropdownMenu
          isOpen={activeMenuIndex === 2}
          onClose={() => setActiveMenuIndex(null)}
          triggerPosition={buttonPosition2}
        />
      </div>
      <div className={styles.component}>
        <button
          ref={buttonRef3}
          onClick={() => handleTriggerClick(3)}
          className={styles.triggerButton}
        ></button>
        <DropdownMenu
          isOpen={activeMenuIndex === 3}
          onClose={() => setActiveMenuIndex(null)}
          triggerPosition={buttonPosition3}
        />
      </div>
    </div>
  );
}

export default App;
