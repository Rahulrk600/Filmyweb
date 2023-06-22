
import Details from './components/Details';
import AddMovies from './components/AddMovies';
import Cards from './components/Cards';
import Header from './components/Header';
import { Route, Routes} from 'react-router-dom';
import { createContext, useState } from 'react'; 
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{login,setLogin,userName,setUserName}}>
    <div>
      <Header/>
       <Routes>
         <Route  path='/' element={<Cards/>}/>
         <Route  path='/addmovie' element={<AddMovies/>}/>
         <Route path='/details/:id' element={<Details/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
       </Routes>
    </div>
    </Appstate.Provider>
  );
}
export default App;
export {Appstate}
