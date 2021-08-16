import {
  Circuit,
  CircuitErrorFallback,
  CircuitForm,
  fetchCircuit,
  CircuitIdle,
  CircuitLoading,
  CircuitDetails,
} from './circuits'
import {useEffect, useState} from 'react'
import styles from './styles/home.module.scss'
import './styles/global.scss'
import {ErrorBoundary} from './ErrorBoundary'
import {AxiosError} from 'axios'

function CircuitContent({circuitName}: {circuitName: string}) {
  const [state, setState] = useState<{
    status: 'idle' | 'pending' | 'resolved' | 'rejected'
    circuit: Circuit
    error: AxiosError | null
  }>({
    status: 'idle',
    circuit: {} as Circuit,
    error: null,
  })
  const {status, circuit, error} = state

  useEffect(() => {
    if (!circuitName) {
      return
    }
    setState(prevState => ({...prevState, status: 'pending'}))
    fetchCircuit(circuitName).then(
      circuit => {
        setState(prevState => ({...prevState, status: 'resolved', circuit}))
      },
      error => {
        setState(prevState => ({...prevState, status: 'rejected', error}))
      },
    )
  }, [circuitName])

  if (status === 'idle') {
    return <CircuitIdle />
  } else if (status === 'pending') {
    return <CircuitLoading />
  } else if (status === 'rejected') {
    // throw error to be handled by error boundary
    throw error
  } else if (status === 'resolved') {
    return <CircuitDetails circuit={circuit} />
  }

  throw new Error('Something went really wrong.')
}

function App() {
  const [circuitName, setCircuitName] = useState('')

  function handleSubmit(circuitName: string) {
    setCircuitName(circuitName)
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Circuits</h1>
      </div>
      <div className={styles.container}>
        <CircuitForm onSubmit={handleSubmit} />
        <div className={styles.contentWrapper}>
          <ErrorBoundary
            key={circuitName}
            FallbackComponent={CircuitErrorFallback}
          >
            <CircuitContent circuitName={circuitName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default App
