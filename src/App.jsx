import { useEffect, useState } from 'react'
import './App.css'
import Films from './components/Films'

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() { 

  const [movies, setmovies] = useState([]);
  const [search, setsearch] = useState("");

  const changeTheSearch= (event) =>{
   setsearch(event.target.value);
  }


  const getAllMovies = ()=>{

    fetch(APIURL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not get data");
      }
      return res.json();
    })
    .then((data) => {
      setmovies(data.results);
  
    })
    .catch((e) => {
      console.log(e);
    });

  }

  const getSearchMovies= () =>{
    fetch(SEARCHAPI+search)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not get data");
      }
      return res.json();
    })
    .then((data) => {
      setmovies(data.results);
  
    })
    .catch((e) => {
      console.log(e);
    });
  }


  useEffect(() => {
   
    if (search === "") {
      getAllMovies();
    }
    else{
      getSearchMovies();
    }

  }, [search])
  

  return (
  
      <div className='max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3'>
        <input type="search" placeholder='Search Movies Here' value={search} onChange={changeTheSearch} className='w-full border border-black outline-none rounded text-slate-500 p-4' />
        {
          movies.length === 0 ? <div className='text-5xl font-bold text-center mt-5'>Loding...</div> : <Films movies={movies}/>
      
        }

      </div>
  
  )
}

export default App
