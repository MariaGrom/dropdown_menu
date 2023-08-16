import styles from './DropdownItem.module.css';

interface DropdownItemProps {
    onClick: () => void,
    title: string,
    scrIcon: string,
    alt: string
}

const DropdownItem = ({ onClick, title, scrIcon, alt }: DropdownItemProps) => {
    <li>
        <button className={styles.dropdownItem} onClick={onClick}>
            {title}<img src={scrIcon} alt={alt} className={styles.iconButton} />
        </button>
    </li>

}
export default DropdownItem
