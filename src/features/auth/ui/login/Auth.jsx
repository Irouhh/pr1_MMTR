import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
import { loginUser } from '../../../../entities/user/api/loginApi';
import { ButtonLogin } from '../../../../shared/ui/Button';

import styles from './styles.module.scss';

export const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { error } = useSelector(state => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let errorInForm = null;

    if (error) {
        errorInForm = <div className={styles.error}>{error}</div>;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
            navigate(URL_ENUM.BOARDS);
        })
        .catch((error) => {
            console.log('', error);
        });
    }

    return (
        <main>
            <div className={styles.wrap}>
                <form id='loginForm' onSubmit={(e) => {onSubmit(e)}}>
                    <h1>Вход</h1>

                    {errorInForm}

                    <Input type='email' value = {email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email адрес' icon={ICONS.EMAIL}/>
                    
                    <Input type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль' icon={ICONS.PASSWORD}/>
                    
                    <ButtonLogin type='submit' className={styles.btnLogin}>Войти</ButtonLogin>
                    
                    <div className={styles.reg}>
                        <p>Нет аккаунта? <Link to={URL_ENUM.REGISTER} className={styles.linkHover}>Зарегистрируйтесь</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}