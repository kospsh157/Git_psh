import React from "react";
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component {
    state = {
      isLoading: true,
      movies: []
    }

    getMovies = async() => {
      const {data : {data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
      this.setState({movies, isLoading: false})
    }
    
    componentDidMount(){
      this.getMovies();  
    }
    
    


  render(){
    const {isLoading, movies} = this.state;

    return <div>
      {isLoading ? "Loading" : movies.map( (movie) => {
        return <Movie 
                    id= {movie.id} 
                    title= {movie.title}
                    year= {movie.year}
                    summary= {movie.summary}
                    poster= {movie.medium_cover_image}
                    key= {movie.id}
                />
      })}
    </div>;
  }
}


export default App;
