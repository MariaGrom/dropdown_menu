import { useEffect, useRef } from "react";
import styles from "./TriggerButton.module.css";

interface TriggerButtonProps {
  onClick: () => void;
  position: { left: number; top: number };
}

const TriggerButton = ({ onClick, position }: TriggerButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // определим координаты триггера
  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      position.left = buttonRect.left;
      position.top = buttonRect.bottom;
      console.log("Button position:", buttonRect);
    }
  }, [position]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={styles.triggerButton}
    ></button>
  );
};

export default TriggerButton;
