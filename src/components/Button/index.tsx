import {ButtonHTMLAttributes} from 'react'
import styles from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'red' | 'dark'
}

export function Button({color, type, children, ...rest}: ButtonProps) {
  return (
    <button
      className={styles.primaryButton}
      type={type ?? 'button'}
      style={{backgroundColor: color === 'red' ? 'var(--red)' : 'var(--text)'}}
      {...rest}
    >
      {children}
    </button>
  )
}
