import styles from "./DropdownItem.module.css";

interface DropdownItemProps {
  id: number;
  title: string;
  scrIcon: string;
  alt: string;
  onClick: () => void;
}

const DropdownItem = ({
  onClick,
  title,
  scrIcon,
  alt,
  id,
}: DropdownItemProps) => {
  return (
    <li>
      <button className={styles.dropdownItem} onClick={onClick} key={id}>
        {title}
        <img src={scrIcon} alt={alt} className={styles.iconButton} />
      </button>
    </li>
  );
};
export default DropdownItem;
