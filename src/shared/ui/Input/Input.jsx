import cn from 'classnames';

import styles from './styles.module.scss';

export const Input = ({type = 'text', placeholder, className = '',  required, icon, value = '', onChange, name}) => {
    
    return (
        <div className={styles.inputText}>
            <input type={type} placeholder={placeholder} className={cn(styles.input, className)}
            required={required} value={value} onChange={onChange} name={name}/>
            <i className={icon}></i>
        </div>
    );
};