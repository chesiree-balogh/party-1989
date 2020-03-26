import React, { useEffect, useState } from 'react'

const Movie = (props) => {
  const posterURL = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${props.poster_path}`

  return (
    <li>
      {/* to have the movie cover as background..... do this */}
      {/* style={{
        backgroundImage: `url("${posterURL}")`,
      }} */}

      {/*  but you have to comment out the <img src={posterURL} /> line */}
      <p class="movieTitle">{props.title}</p>
      <div class="movie-image-and-caption">
        <img src={posterURL} />
        <p class="overview">{props.overview}</p>
      </div>
    </li>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [counter, setCounter] = useState(0)
  const [year, setYear] = useState(1989)

  const fetchMovies = (event) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=popularity.desc&api_key=a6d1cf27a5747141f1db754bed4bc307`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const newMovies = apiData.results
        console.log(newMovies)

        setMovies(newMovies)
        setCounter(counter + 1)
      })
  }

  useEffect(() => {
    fetchMovies()
  }, [year])

  const makeItYear = (event) => {
    setYear(event.target.value)
  }

  return (
    <main>
      <header>
        <h1>Party Like It is {year}</h1>
        <p>Best movies of 1989!</p>
      </header>

      <ul class="movies">
        {movies.map((movie) => {
          return (
            <Movie
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
            />
          )
        })}
      </ul>

      <footer>Thanks to this powerful movie API, you dah real MVP!</footer>
    </main>
  )
}

export default App
