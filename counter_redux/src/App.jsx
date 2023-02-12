import './App.css'
import {store} from './app/store'
import { Provider } from 'react-redux'
import Counter from './Counter/Counter'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Counter/>
      </Provider>
    </div>
  )
}

export default App
