import styles from './DropdownMenu.module.css';
import IconShareBtn from '../../assets/icons/share_btn.svg';
import IconEditBtn from '../../assets/icons/edit_btn.svg';
import IconDeleteBtn from '../../assets/icons/delete_btn.svg';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';

interface DropdownMenuProps {
  isOpen: boolean,
  onClose: () => void,
  triggerPosition: { left: number; top: number };
}

const DropdownMenu = ({ isOpen, onClose, triggerPosition }: DropdownMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [positionTrigger, setPositionTrigger] = useState(triggerPosition)
  const [positionMenu, setPositionMenu] = useState({ top: 32, left: 0 });

  const shareInNetworks = () => {
    console.log('поделиться в соц сетях')
    onClose();
  }

  const editContent = () => {
    console.log('редактировать инфу')
    onClose();
  }

  const deleteContent = () => {
    console.log('удалить контент')
    onClose();
  }

  // Отслеживаем активное открытое окно
  useEffect(() => {
    setMenuVisible(isOpen);
  }, [isOpen]);


  useOutsideClick(dropdownRef, () => {
    if (menuVisible) {
      onClose();
    }
  });


  // функция по определению свободного места для меню dropdown

  const determinePosition = () => {
    // определим размер экрана
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    console.log("viewportHeight", viewportHeight);
    console.log("viewportWidth", viewportWidth);
    // зададим граничные значения для дропдаун меню
    const menuHeight = 130;
    const menuWidth = 260;



    // условие если справа от триггера нет места
    if (triggerPosition.left + menuWidth >= viewportWidth) {
      // если справа и снизу нет места
      if (triggerPosition.top + menuHeight >= viewportHeight) {
        setPositionMenu({ top: -114, left: -230 })
      } else {
        setPositionMenu({ top: 32, left: -230 })
      }
      // снизу нет места
    } else if (triggerPosition.top + menuHeight >= viewportHeight) {
      setPositionMenu({ top: -114, left: 0 })
    }
  }

  useEffect(() => {
    determinePosition();
  }, [triggerPosition])


  return (
    // <div ref={dropdownRef} className={`${isOpen ? styles.dropdownMenu : styles.dropdownMenu_hide} ${styles.position_up_left}`} >
    <div ref={dropdownRef} className={isOpen ? styles.dropdownMenu : styles.dropdownMenu_hide} style={positionMenu}>
      <li>
        <button className={styles.dropdownItem} onClick={shareInNetworks}>
          Поделиться в социальных сетях<img src={IconShareBtn} alt='share' className={styles.iconButton} />
        </button>
      </li>
      <li><button className={styles.dropdownItem} onClick={editContent}>
        Редактировать страницу <img src={IconEditBtn} alt='edit' className={styles.iconButton} />
      </button>
      </li>
      <li>
        <button className={styles.dropdownItem} onClick={deleteContent}>
          Удалить страницу
          <img src={IconDeleteBtn} alt='delete' className={styles.iconButton} />
        </button>
      </li>
    </div>
  );
}

export default DropdownMenu;
