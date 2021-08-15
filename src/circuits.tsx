import {Button} from './components/Button'

import styles from './styles/circuits.module.scss'

export function CircuitForm() {
  return (
    <form className={styles.circuitForm} action="">
      <div>
        <input type="text" placeholder="Circuit name..." />
        <Button color="dark" type="submit">
          Submit
        </Button>
      </div>
      <p>
        Try <button type="button">“interlagos”</button>
        {', '}
        <button type="button">“monza”</button>
        {', '}
        <button type="button">“spa”</button>
        {'or '}
        <button type="button">“silverstone”</button>
        {'.'}
      </p>
    </form>
  )
}

export function CircuitLoading() {
  return (
    <div className={styles.fallBackInfo}>
      <p>Loading circuit info...</p>
    </div>
  )
}

export function CircuitIdle() {
  return (
    <div className={styles.fallBackInfo}>
      <p>Submit a circuit name.</p>
    </div>
  )
}

export function CircuitDetails() {
  return (
    <>
      <div className={styles.infoHeader}>
        <div>
          <strong>Belgium</strong>
          <p>Circuit de Spa-Francorchamps</p>
        </div>
        <div>
          <p>First Grand Prix</p>
          <strong>1950</strong>
        </div>
      </div>
      <img src="/img/interlagos.png" alt="" />
      <div className={styles.infoContent}>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Circuit length</p>
            <div>
              <strong>7.004</strong>
              <small>KM</small>
            </div>
          </div>
          <div className={styles.card}>
            <p>No. of laps</p>
            <div>
              <strong>44</strong>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Race distance</p>
            <div>
              <strong>308.052</strong>
              <small>KM</small>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Lap record</p>
            <div>
              <strong>1:46.286</strong>
              <small>Valteri Bottas (2018)</small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function CircuitErrorFallback() {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h3>Something went wrong...</h3>
      <p>Could not find circuit named “namemmems” try “spa” instead.</p>
      <Button color="red">Try again</Button>
    </div>
  )
}
