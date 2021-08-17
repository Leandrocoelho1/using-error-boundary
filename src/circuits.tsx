import axios from 'axios'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
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
    time: string
    driver: string
    year: string
  }
}

const api = axios.create({baseURL: 'https://api.backend.com'})
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message) {
      error.message = error.response.data.message
    }
    return Promise.reject(error)
  },
)

export function fetchCircuit(name: string) {
  return api
    .get<Circuit>(`/circuits/${name.toLowerCase()}`)
    .then(res => res.data)
}

interface CircuitFormProps {
  onSubmit: (name: string) => void
  externalCircuitName: string
}

export function CircuitForm({onSubmit, externalCircuitName}: CircuitFormProps) {
  const [circuitName, setCircuitName] = useState(externalCircuitName)

  useEffect(() => {
    setCircuitName(externalCircuitName)
  }, [externalCircuitName])

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
              <strong>
                {new Intl.NumberFormat().format(circuit.lapLength)}
              </strong>
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
              <strong>
                {new Intl.NumberFormat().format(circuit.totalLength)}
              </strong>
              <small>KM</small>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Lap record</p>
            <div>
              <strong>{circuit.lapRecord.time}</strong>
              <small>{`${circuit.lapRecord.driver} (${circuit.lapRecord.year})`}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function CircuitErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h3>Something went wrong...</h3>
      <p>{error.message}</p>
    </div>
  )
}
