import styles from './styles.module.scss';

export const Input = ({type = 'text', placeholder, className = '',  required, icon}) => {
    
    return (
        <div className={styles.inputText}>
            <input type={type} placeholder={placeholder} className={className} required={required}/>
            <i className={icon}></i>
        </div>
    );
};