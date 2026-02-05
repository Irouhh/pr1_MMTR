import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
import { loginUser } from '../../../../entities/user/api/loginApi';
import { Button } from '../../../../shared/ui/Button';

import styles from './styles.module.scss';

export const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setformError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => navigate(URL_ENUM.BOARDS))
        .catch(setformError);
    }

    return (
        <main>
            <div className={styles.wrap}>
                <form id='loginForm' onSubmit={onSubmit}>
                    <h1>Вход</h1>

                    {formError && <div className={styles.error}>{formError}</div>}

                    <Input type='email' value = {email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email адрес' icon={ICONS.EMAIL}/>
                    
                    <Input type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль' icon={ICONS.PASSWORD}/>
                    
                    <Button type='submit' className={styles.btnLogin}>Войти</Button>
                    
                    <div className={styles.reg}>
                        <p>Нет аккаунта? <Link to={URL_ENUM.REGISTER} className={styles.linkHover}>Зарегистрируйтесь</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}