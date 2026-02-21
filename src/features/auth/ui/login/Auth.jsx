import { Link } from 'react-router-dom';
import { URL_ENUM, ICONS } from '../../../../shared/const';
import { Input } from '../../../../shared/ui/Input';
<<<<<<< HEAD
=======
import { loginUser } from '../../../../entities/user/api/loginApi';
import { Button } from '../../../../shared/ui/Button';
<<<<<<< HEAD
import { getBoards } from '../../../../entities/boards/api/boardsApi';
>>>>>>> 26d95e1 (доски)
=======
>>>>>>> d2cdad7 (бек: листы, борды, таски)

import styles from './styles.module.scss';

export const Auth = () => {
<<<<<<< HEAD
=======

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
        .then(navigate(URL_ENUM.BOARDS))
        .catch(setformError);
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        
        setForm(oldForm => ({
            ...oldForm,
            [name]: value
        }));
    }

>>>>>>> 26d95e1 (доски)
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