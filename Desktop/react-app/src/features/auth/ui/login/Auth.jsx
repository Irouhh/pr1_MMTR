import { Link } from 'react-router-dom';
import { URL_ENUM } from "../../../../shared/ui/URL/URL_ENUM";
import { ICONS } from '../../../../shared/ui/Icons/Icons';
import { Input } from '../../../../shared/ui/Input';

import styles from './styles.module.scss';

export const Auth = () => {
    return (
        <main>
            <div className={styles.wrap}>
                <form id="loginForm">
                    <h1>Вход</h1>
                    
                    <Input type="email" placeholder="Email адрес" icon={ICONS.EMAIL}/>
                    
                    <Input type="password" placeholder="Пароль" icon={ICONS.PASSWORD}/>
                    
                    <Link to={URL_ENUM.BOARDS} className={styles.btnLogin}>Войти</Link>
                    
                    <div className={styles.reg}>
                        <p>Нет аккаунта? <Link to={URL_ENUM.REGISTER} className={styles.linkHover}>Зарегистрируйтесь</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}