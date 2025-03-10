import './App.css'
import FileManager from "./FileManager";
import { ToastContainer} from "react-toastify";


function App() {

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <ToastContainer />
      <FileManager />
    </div>
  )
}

export default App
