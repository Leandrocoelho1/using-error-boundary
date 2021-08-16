import axios, {AxiosError} from 'axios'
import {ChangeEvent, FormEvent, useState} from 'react'
import styles from './styles/circuits.module.scss'

export interface Circuit {
  name: string
  location: string
  officialName: string
  image: string
  firstGP: string
  lapLength: number
  laps: number
  totalLength: number
  lapRecord: {
    time: number
    driver: string
    year: string
  }
}

export function fetchCircuit(name: string) {
  return axios
    .get<Circuit>(`https://api.backend.com/circuits/${name.toLowerCase()}`)
    .then(res => res.data)
}

export function CircuitForm({onSubmit}: {onSubmit: (name: string) => void}) {
  const [circuitName, setCircuitName] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCircuitName(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(circuitName)
  }

  function handleSelect(newCircuitName: string) {
    setCircuitName(newCircuitName)
    onSubmit(newCircuitName)
  }

  return (
    <form className={styles.circuitForm} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Circuit name..."
          value={circuitName}
          onChange={handleChange}
        />
        <button className={styles.primaryButton} type="submit">
          Submit
        </button>
      </div>
      <p>
        Try{' '}
        <button onClick={() => handleSelect('Interlagos')} type="button">
          “interlagos”
        </button>
        {', '}
        <button onClick={() => handleSelect('Monza')} type="button">
          “monza”
        </button>
        {', '}
        <button onClick={() => handleSelect('Spa')} type="button">
          “spa”
        </button>
        {'or '}
        <button onClick={() => handleSelect('Silverstone')} type="button">
          “silverstone”
        </button>
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

export function CircuitDetails({circuit}: {circuit: Circuit}) {
  return (
    <>
      <div className={styles.infoHeader}>
        <div>
          <strong>{circuit.location}</strong>
          <p>{circuit.officialName}</p>
        </div>
        <div>
          <p>First Grand Prix</p>
          <strong>{circuit.firstGP}</strong>
        </div>
      </div>
      <img src={circuit.image} alt={circuit.name} />
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
              <strong>{circuit.laps}</strong>
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
              <small>{`${circuit.lapRecord.driver} (${circuit.lapRecord.year})`}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function CircuitErrorFallback({error}: {error: AxiosError}) {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h3>Something went wrong...</h3>
      {error.response ? (
        <p>{error.response.data.message}</p>
      ) : (
        <p>{error.message}</p>
      )}
      <button className={`${styles.primaryButton} ${styles.redButton}`}>
        Try again
      </button>
    </div>
  )
}
