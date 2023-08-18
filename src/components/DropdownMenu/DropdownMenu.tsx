import styles from "./DropdownMenu.module.css";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DropdownItemInfo } from "../DropdownItem/DropdownItem.constants";
import DropdownItem from "../DropdownItem/DropdownItem";

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerPosition: { left: number; top: number };
}

const DropdownMenu = ({
  isOpen,
  onClose,
  triggerPosition,
}: DropdownMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [positionMenu, setPositionMenu] = useState({ top: 32, left: 0 });
  const [height, setHeight] = useState(window.innerHeight);

  // отслеживаем активное открытое окно
  useEffect(() => {
    setMenuVisible(isOpen);
  }, [isOpen]);

  // вызов кастомного хука для закрытия выбранного окна
  useOutsideClick(dropdownRef, () => {
    if (menuVisible) {
      onClose();
    }
  });

  // следим за высотой вьюпорта и закрываем dropdown, если триггер не выходит за границы вьюпорта
  useEffect(() => {
    const handleResize = (event: any) => {
      setHeight(event.target.innerHeight);
      if (isOpen) {
        if (triggerPosition.top > height) {
          onClose();
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [height, isOpen, onClose, triggerPosition.top]);

  // функция по определению свободного места для меню dropdown
  useEffect(() => {
    // определим ширину экрана
    const viewportWidth = window.innerWidth;
    // зададим граничные значения для dropdown
    const menuHeight = 130;
    const menuWidth = 260;
    // условие если справа от триггера нет места
    if (triggerPosition.left + menuWidth >= viewportWidth) {
      // если справа и снизу нет места
      if (triggerPosition.top + menuHeight >= height) {
        setPositionMenu({ top: -114, left: -230 });
      } else {
        setPositionMenu({ top: 32, left: -230 });
      }
      // снизу нет места
    } else if (triggerPosition.top + menuHeight >= height) {
      setPositionMenu({ top: -114, left: 0 });
    }
  }, [triggerPosition, height]);

  return (
    <div
      ref={dropdownRef}
      className={isOpen ? styles.dropdownMenu : styles.dropdownMenu_hide}
      style={positionMenu}
    >
      {DropdownItemInfo.map((item) => (
        <DropdownItem
          key={item.id}
          id={item.id}
          title={item.title}
          scrIcon={item.scrIcon}
          alt={item.alt}
          onClick={() => {
            if (item.onClick) item.onClick();
            onClose();
          }}
        />
      ))}
    </div>
  );
};

export default DropdownMenu;
