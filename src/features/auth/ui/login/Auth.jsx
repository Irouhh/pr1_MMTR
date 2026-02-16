import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
import { loginUser } from '../../../../entities/user/api/loginApi';
import { Button } from '../../../../shared/ui/Button';
import { getBoards } from '../../../../entities/boards/api/boardsApi';

import styles from './styles.module.scss';

export const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formError, setformError] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => { 
            navigate(URL_ENUM.BOARDS)
            dispatch(getBoards());
        })
        .catch(setformError);
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        
        setForm(oldForm => ({
            ...oldForm,
            [name]: value
        }));
    }

    return (
        <main>
            <div className={styles.wrap}>
                <form id='loginForm' onSubmit={onSubmit}>
                    <h1>Вход</h1>

                    {formError && <div className={styles.error}>{formError}</div>}

                    <Input type='email' value = {form.email} name= 'email'
                    onChange={updateForm} 
                    placeholder='Email адрес' icon={ICONS.EMAIL} required />
                    
                    <Input type='password' value={form.password} name= 'password'
                    onChange={updateForm}
                    placeholder='Пароль' icon={ICONS.PASSWORD} required/>
                    
                    <Button type='submit' className={styles.btnLogin}>Войти</Button>
                    
                    <div className={styles.reg}>
                        <p>Нет аккаунта? <Link to={URL_ENUM.REGISTER} className={styles.linkHover}>Зарегистрируйтесь</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}