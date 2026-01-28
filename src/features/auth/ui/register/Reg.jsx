import { Link } from 'react-router-dom';
import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';

import styles from './styles.module.scss';

export const Reg = () => {
    
    return (
        <main>
            <div className={styles.wrap}>
                <form id="registerForm">
                    <h1>Регистрация</h1>

                    <Input type="text" placeholder="Логин" icon={ICONS.USER}/>
                    
                    <Input type="email" placeholder="Email адрес" icon={ICONS.EMAIL}/>
                    
                    <Input type="password" placeholder="Пароль" icon={ICONS.PASSWORD}/>
        
                    <Input type="password" placeholder="Повторите пароль" icon={ICONS.ROTATE}/>
                    
                    <Link to={URL_ENUM.BOARDS} className={styles.btnLogin}>Зарегистрироваться</Link>
                    
                    <div className={styles.log}>
                        <p>Уже есть аккаунт? <Link to={URL_ENUM.ROOT} className={styles.linkHover}>Войдите</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}