import {CircuitErrorFallback, CircuitForm} from './circuits'
import styles from './styles/home.module.scss'
import './styles/global.scss'

function App() {
  return (
    <div>
      <div className={styles.header}>
        <h1>Circuits</h1>
      </div>
      <div className={styles.container}>
        <CircuitForm />
        <div className={styles.contentWrapper}>
          <CircuitErrorFallback />
        </div>
      </div>
    </div>
  )
}

export default App
