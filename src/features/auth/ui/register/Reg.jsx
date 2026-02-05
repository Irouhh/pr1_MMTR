import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
import { registerUser } from '../../../../entities/user/api/regApi';
import { ButtonLogin } from '../../../../shared/ui/Button';

import styles from './styles.module.scss';

export const Reg = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.user);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let errorInForm = null;

    if (error) {
        errorInForm = <div className={styles.error}>{error}</div>;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password, name: login }))
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
                <form id='registerForm' onSubmit={(e) => {onSubmit(e)}}>
                    <h1>Регистрация</h1>

                    {errorInForm}

                    <Input type='text' value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Логин' icon={ICONS.USER}/>
                    
                    <Input type='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email адрес' icon={ICONS.EMAIL}/>
                    
                    <Input type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль' icon={ICONS.PASSWORD}/>
        
                    <Input type='password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Повторите пароль' icon={ICONS.ROTATE}/>
                    
                    <ButtonLogin type='submit' className={styles.btnLogin}
                    >Зарегистрироваться</ButtonLogin>
                    
                    <div className={styles.log}>
                        <p>Уже есть аккаунт? <Link to={URL_ENUM.ROOT} className={styles.linkHover}>Войдите</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}