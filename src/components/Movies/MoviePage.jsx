import React from "react";
import styles from "./MoviePage.module.css";
import { Link } from 'react-router-dom';
import cx from 'classnames';
import imdb from './imdb.png';
import background from './background.jpg'
import Nullimage from './no-image.webp';
import { findMovie, getRecommended } from '../../api';

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

function checkImageExists(image) {
    if (image != null) {
        return ("https://image.tmdb.org/t/p/w1280" + image);
    }
    return Nullimage;
}

function checkBackdropExists(image) {
    
    if (image != null) {
        return ("https://image.tmdb.org/t/p/w1280" + image);
    }
    return background;
}


class MoviePage extends React.Component {

    state = {
        movie: {},
        recomended: [],
    }

    async componentDidMount() {
        setTimeout(async () => { 
            const movie = await findMovie(this.props.id);
            const recommended = await getRecommended(this.props.id);
            this.setState({ movie, recommended});
        }, 0);
    }


    render() {
        const { movie, recommended } = this.state;
        console.log(movie);
        return (
            <div className={styles.container} >
                {/* <img className={styles.backdrop} src={checkImageExists(movie.backdrop_path)} alt=""/> */}
                <div className={styles.background} style={{ backgroundImage: "url(" + checkBackdropExists(movie.backdrop_path)+ ")" }}></div>
                <div className={styles.foreground}>
                    <div className={styles.back}>
                        <Link style={{textDecoration: 'none'}} to='/'><i className="fas fa-arrow-left"></i></Link> Go Back
                    </div>
                    {Object.keys(movie).length !== 0 && movie.constructor === Object ? 
                    <div className={styles.movieContainer}>
                        <div className={styles.movie}>
                            <span className={cx(getClassByRate(movie.vote_average), styles.span)}><i className="fas fa-star"></i> {movie.vote_average}</span>
                            <img className={styles.poster} src={checkImageExists(movie.poster_path)} alt={movie.title}/>
                        </div>
                        <div className={styles.movieContent}>
                            <h1 className={styles.title}>{movie.title}</h1>
                            <h3>Overview:</h3>
                            <p className={styles.overview}>{movie.overview}</p>
                            {(movie.genres) ? (movie.genres.length) ? <h3>Genre:</h3>:"" : ""}
                            <p>{(movie.genres) ? movie.genres.map((genre , i) => ( <span key={i}> {genre.name}{i === movie.genres.length-1 ? "" : ","}</span>  )) : "No Genres Found" }</p>
                            {movie.imdb_id ? <div><a href={`https://www.imdb.com/title/${movie.imdb_id}`}><img src={imdb} width="70" alt="imdb"/></a></div> : ""}
                            <h3>Recommended:</h3>
                            <p>{(recommended) ? recommended.map((movie , i) => ( <span key={i}> <a href={`/movie/${movie.id}`}>{movie.title}</a>{i === recommended.length-1 ? "" : ","}</span>  )) : "No Genres Found" }</p>
                        </div>
                    </div>
                    : "This Page does not exist"}
                </div>
            </div>
        );  
    }
}

export default MoviePage;
