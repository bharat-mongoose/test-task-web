
import './App.css';
import Home from './components/Home';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Loader from './components/Loader/Loader';
import { useSelector } from 'react-redux';

function App() {
  const { isLoading } = useSelector((state) => state.loaderReducer);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Loader isLoading={isLoading} />
    </BrowserRouter>
  );
}

export default App;
