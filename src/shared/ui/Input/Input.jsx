import cn from 'classnames';

import styles from './styles.module.scss';

export const Input = ({type = 'text', placeholder, className = '',  required, icon, value = '', onChange}) => {
    
    return (
        <div className={styles.inputText}>
            <input type={type} placeholder={placeholder} className={cn(styles.input, className)}
            required={required} value={value} onChange={onChange}/>
            <i className={icon}></i>
        </div>
    );
};