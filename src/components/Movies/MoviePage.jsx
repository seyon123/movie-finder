import React from "react";
import styles from "./MoviePage.module.css";
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';
import imdb from './imdb.png';
import background from './background.jpg'
import Nullimage from './no-image.webp';
import { findMovie, getRecommended, getCast } from '../../api';

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
        cast: [],
    }

    async componentDidMount() {
        setTimeout(async () => { 
            const movie = await findMovie(this.props.id);
            const recommended = await getRecommended(this.props.id);
            const cast = await getCast(this.props.id);
            document.title = `${movie.title ? movie.title : "Invalid Movie"} | Movie Finder`;
            window.onfocus = function() {
                document.title = `${movie.title ? movie.title : "Invalid Movie"} | Movie Finder`;
            };
            window.onblur = function() {
                setTimeout(() => { 
                    document.title = `👋 Find A Movie | Movie Finder`;
                }, 30000)
            };
            this.setState({ movie, recommended, cast});
        }, 0);
    }


    render() {
        const { movie, recommended, cast } = this.state;
        return (
            <div className={styles.container} >
                <div className={styles.background} style={{ backgroundImage: "url(" + checkBackdropExists(movie.backdrop_path)+ ")" }}></div>
                <div className={styles.foreground}>
                    <div className={styles.back}>
                        <Link onClick={() => this.props.history.goBack()} style={{textDecoration: 'none'}} to='/'><i className="fas fa-arrow-left"></i></Link> Go Back
                    </div>
                    {Object.keys(movie).length !== 0 && movie.constructor === Object ? 
                    <div className={styles.movieContainer}>
                        <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>
                            <div className={styles.movie}>
                                <span className={cx(getClassByRate(movie.vote_average), styles.span)}><i className="fas fa-star"></i> {movie.vote_average}</span>
                                <img className={styles.poster} src={checkImageExists(movie.poster_path)} alt={movie.title}/>
                            </div>
                        </a>
                        <div className={styles.movieContent}>
                            <h1 className={styles.title}>{movie.title}</h1>
                            <h4>{movie.release_date ? movie.release_date : ""} {movie.runtime ? `• ${movie.runtime}m` : ""}</h4>
                            {movie.overview? <h3>Overview:</h3> : ""}
                            <p className={styles.overview}>{movie.overview}</p>
                            {(movie.genres) ? (movie.genres.length) ? <h3>Genre:</h3>:"" : ""}
                            <p>{(movie.genres) ? movie.genres.map((genre , i) => ( <span key={i}> {genre.name}{i === movie.genres.length-1 ? "" : ","}</span>  )) : "" }</p>
                            {movie.imdb_id ? <div><a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${movie.imdb_id}`}><img src={imdb} width="70" alt="imdb"/></a></div> : ""}
                        </div>
                    </div>
                    : "This Movie Does Not Exist 😞"}

                    <div className={styles.castOuter}>
                        {(cast) ? (cast.length) ? <h3 className={styles.castTitle}>Cast:</h3>:"" : ""}
                        <div className={styles.castContainer}>
                            {(cast) ? (cast.length) ? cast.slice(0, 8).map((member , i) => ( 
                            <a key={i} href={`https://www.themoviedb.org/person/${member.id}`} target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>
								<div alt={member.name} title={member.name} className={styles.castMember} >
									<img className={styles.poster} src={checkImageExists( member.profile_path )} alt={member.name}/>
									<div className={styles.movieinfo}>
										<h3>{member.name}</h3>
                                        <h3 className={styles.character}>{member.character}</h3>
									</div>
								</div>
                            </a>
							)) : "" : ""}
                        </div>
                    </div>

                    <div className={styles.recommendedOuter}>
                        {(recommended) ? (recommended.length) ? <h3 className={styles.recommendedTitle}>Recommended:</h3>:"" : ""}
                        <div className={styles.recommendedContainer}>
                            {(recommended) ? (recommended.length) ? recommended.slice(0, 8).map((movie , i) => ( 
                            <Link to={`/movie/${movie.id}`} key={i}  style={{ textDecoration: "none" }}>
								<div alt={movie.title} title={movie.title} className={styles.recommendedMovie} >
                                    <img className={styles.poster} src={checkImageExists( movie.poster_path )} alt={movie.title}/>
									<div className={styles.movieinfo}>
										<h3>{movie.title}</h3>
									</div>
								</div>
							</Link>)) : "" : ""}
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
}

export default withRouter(MoviePage);
