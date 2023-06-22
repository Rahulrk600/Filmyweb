import {  getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { movieRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loding, setLoding] = useState(false)
      useEffect(()=>{
           async function getData(){
            setLoding(true);
           const _data =await getDocs(movieRef);
           _data.forEach((doc)=>{
            setData((prv)=>[...prv,{...(doc.data()), id: doc.id}])
           })

            setLoding(false);
           }
           getData();
      },[])


    return (
        <div className='flex flex-wrap justify-between px-3 mt-2'>
             { loding ?<div className='card shadow-lg w-full flex justify-center items-center h-96'> <ThreeDots height={25} color='green'/></div>:
            data.map((e, i) => {
                return (
                 <Link to={`/details/${e.id}`}>   <div key={i} className='card font-medium shadow-lg p-2 cursor-pointer hover:-translate-y-3 mt-5 transition-all duration-500'>
                        <img className='h-65 md:h-72' src={e.image} alt="" />
                        <h1>{e.title}</h1>
                        <h1 className='flex items-center'>Rating:
                            <ReactStars
                                size={20}
                                half={true}
                                value={e.rating/e.rated}
                                edit={false}
                            /></h1>
                        <h1>Year:{e.year}</h1>
                    </div></Link>
                );
                })
               }
        </div>
    )
}

export default Cards
