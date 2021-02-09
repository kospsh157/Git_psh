import React from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import "./Movie.css";


function Movie({ id, genres, year, title, summary, poster}) {
    return (
        // 이렇게 무브 JSX에다가 링크를 걸어버리면, 해당 콘텐츠를 누르게 되면
        // to로 라우터 이동을 하게 된다. 라우터 이동인건인지 컴포넌트 교체가 되는 것인지는 잘 모르겠다.
        // 다만 내용물에 하이퍼링크를 걸어버리는 것과 같은 효과이다.
        // 또한 to = {{ }}  처럼 객체를 같이 묶어서 props로 보낼 수 있다.
        // 따라서 받는 쪽에서 같이 정보를 받아 같이 보여줄 수 있다.
        // 여기서는 movie가 받는 porps들을 같이 state객체로 묶어서 보낼 것이다.
        // 그럼 "movie-detail" 라우트에서 state정보를 받아 이용할 수 있다.

        // 다만 이렇게 하면 문제점이 생기는데, 사용자가 우리가 원하는데로, 해당 링크 내용물을 클릭해서 
        // 라우트로 들어오면 상관없는데, 만약에 사용자가 링크를 누르지 않고 그냥 주소를 직접 쳐서 들어오거나,
        // 아니면 누르고 들어왔어도 새로고침을 눌르거나, 하면 밑에 state 객체가 undefined로 나오게 될 것이다.
        // 이러한 문제를 해결해야 한다.
        
        <Link to = {{
            pathname: `/movie-detail/:${id}`,
            state: {
                // 이렇게 하면 받는 쪽에서 location.state. 에서 다음 props들에 접근 할 수 있다.
                year,
                title,
                summary,
                poster,
                genres
            }
        }}>
            <div className="movie">
                <img src= {poster} alt={title} title={title} />
                <div className="movie_data">
                    <h3 className="movie_title">{title}</h3>
                    <h5 className="movie_year">{year}</h5>
                    <ul className="genres">
                        {genres.map((genre, index) => (
                            <li className="genres_genres" key={index}>{genre}</li>
                        ))}
                    </ul>
                    <p className="movie_summary">{summary}</p>
                </div>
            </div>
        </Link>
    )
}


Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;