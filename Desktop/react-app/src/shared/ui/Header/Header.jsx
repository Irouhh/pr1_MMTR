import { Link } from 'react-router-dom';
import { URL_ENUM } from "../URL/URL_ENUM";
import { ICONS } from '../../../shared/ui/Icons';

import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.head}>
            <Link to={URL_ENUM.BOARDS} className={styles.headerLink}>
                <i className={ICONS.HOME}></i>
            </Link>
        </header>
    );
}