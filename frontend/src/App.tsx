import './App.css'
import FileManager from "./FileManager";
import { ToastContainer} from "react-toastify";


function App() {

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <ToastContainer />

      <FileManager />
    </div>
  )
}

export default App
