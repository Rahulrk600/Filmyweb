
import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import {Appstate} from '../App'
import { useNavigate} from 'react-router-dom'

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loding, setLoding] = useState(false);
  const [reviewloding, setReviewLoding] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded,setNewAdded] = useState(0);

  const sendReview = async () => {
    setLoding(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewsRef, {
        movieid: id,
        name: useAppstate.userName,
        rating: rating,
        though: form,
        timestamp: new Date().getTime()
      })
      const ref = doc(db, 'movies', id)
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1
      })
      setRating(0);
      setForm("");
      setNewAdded(newAdded+1);
      swal({
        title: "Review sent",
        icon: "success",
        buttons: false,
        timer: 3000
      })
    }else{
      navigate('/login');
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoding(false);
  }
  useEffect(() => {
    async function getData() {
      setReviewLoding(true);
      setData([]);
      let qure = query(reviewsRef, where('movieid', '==', id))
      const queryreview = await getDocs(qure);
      queryreview.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      });
      setReviewLoding(false);
    }
    getData();
  },[newAdded])

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
      <ReactStars
        size={25}
        half={true}
        edit={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        className='w-full p-2 outline-none text-black'
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='share your thoughts about this movie'
      />
      <button onClick={sendReview} className='bg-green-600 flex justify-center  p-2 w-full ' >
        {loding ? <TailSpin height={20} color='white' /> : "Share"}
      </button>
      {reviewloding ?
        <div className='mt-4 flex justify-center'><ThreeDots height={8} color='green' />
        </div>:
        <div className='mt-4'>
          {
            data.map((e,i)=>{
              return(
                <div key={i} className='bg-gray-900 border-b border-gray-600 p-2 w-full mt-2'>
                  <p className='text-blue-600'>{e.name}</p>
                  <p>{new Date(e.timestamp).toLocaleString()}</p>
                  <p className='text-red-700'>{e.though}</p>
                  <ReactStars
                         size={20}
                         half={true}
                         value={e.rating}
                         edit={false}
                  />

                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Reviews
