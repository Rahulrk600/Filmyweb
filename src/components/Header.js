import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {Appstate} from '../App'

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='text-3xl text-green-500 font-bold p-3 flex justify-between items-center border-b-2 border-gray-500' >
     <Link to={'/'}><span className=''> Filmy<span className='text-red-500'>web</span></span></Link>
     { useAppstate.login ?
    <Link to={'/addmovie'}> <h1 className='text-lg flex items-center'>
       <Button><AddIcon className='mr-2'/>Add New</Button>
     </h1></Link>
     :
     <Link to={'/login'}> <h1 className='text-lg bg-green-500 flex items-center rounded-md'>
     <Button><span className='text-white font-medium  capitalize'>Login</span></Button>
   </h1></Link>
     }
    </div>
  )
}

export default Header
