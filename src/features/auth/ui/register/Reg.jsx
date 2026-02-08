import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
import { registerUser } from '../../../../entities/user/api/regApi';
import { Button } from '../../../../shared/ui/Button';

import styles from './styles.module.scss';

export const Reg = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formError, setformError] = useState('');
    const [form, setForm] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, login } = form;
        dispatch(registerUser({ email, password, name: login }))
        .unwrap()
        .then(() => navigate(URL_ENUM.BOARDS))
        .catch(setformError);
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        
        setForm(oldForm => ({
            ...oldForm,
            [name]: value,
        }));
    }
    
    return (
        <main>
            <div className={styles.wrap}>
                <form id='registerForm' onSubmit={onSubmit}>
                    <h1>Регистрация</h1>

                    {formError && <div className={styles.error}>{formError}</div>}

                    <Input type='text' value={form.login} name = 'login'
                    onChange={updateForm}
                    placeholder='Логин' icon={ICONS.USER}/>
                    
                    <Input type='email' value={form.email} name = 'email'
                    onChange={updateForm}
                    placeholder='Email адрес' icon={ICONS.EMAIL}/>
                    
                    <Input type='password' value={form.password} name = 'password'
                    onChange={updateForm}
                    placeholder='Пароль' icon={ICONS.PASSWORD}/>
        
                    <Input type='password' value={form.confirmPassword} name = 'confirmPassword'
                    onChange={updateForm}
                    placeholder='Повторите пароль' icon={ICONS.ROTATE}/>
                    
                    <Button type='submit' className={styles.btnLogin}
                    >Зарегистрироваться</Button>
                    
                    <div className={styles.log}>
                        <p>Уже есть аккаунт? <Link to={URL_ENUM.ROOT} className={styles.linkHover}>Войдите</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}