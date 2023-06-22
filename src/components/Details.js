import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars';
import {db} from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'; 
import Reviews from './Reviews';


const Details = () => {
  const {id}=useParams();
    const [data, setData] = useState({
      title:"",
      year:"",
      image:"",
      description:"",
      rating:0,
      rated:0
    });

    useEffect (()=>{
      async function getData(){
      const _doc= doc(db,"movies",id);
      const _data =await getDoc(_doc);
      setData(_data.data()); 
      }
      getData();
    },[])

  return (
    <div className='flex flex-col md:flex-row items-center md:items-start  w-full justify-center p-4'>
    <img className='h-96 block md:sticky top-24' src={data.image} />
    <div className='md:ml-4 ml-0 w-full md:w-1/2'>
      <h1 className='text-3xl font-bold text-gray-400'>{data.title}<span className='text-xl'>({data.year})</span></h1>
      <ReactStars
        size={20}
        half={true}
        value={data.rating/data.rated}
        edit={false}
      />
      <p className='mt-3'>{data.description}</p>
      <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
    </div>

  </div>
  )
}

export default Details
