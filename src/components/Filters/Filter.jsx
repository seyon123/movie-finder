import React from "react";

import styles from "./Filter.module.css";


const Filter = ({genres, handleGenreChange, handleSortChange, handleYearChange}) => {
    return (
        <div id="filter" className={styles.toolbar}>
            <div>
                Genres:       
                <select className={styles.genres} onChange={(e) => handleGenreChange(e.target.value)} >
                    <option className={styles.genre}>All Genres</option>
                    {genres ? genres.map((genre , i) => (
                        
                        <option key={i} className={styles.genres} value={genre.id}>{genre.name}</option >
                    ))
                     : ""}
                </select>
            </div>
            <div>
                Sort By:      
                <select className={styles.sortby} onChange={(e) => handleSortChange(e.target.value)}>
                    <option className={styles.sort} value="popularity.desc">Popularity ▼</option>
                    <option className={styles.sort} value="popularity.asc">Popularity ▲</option>
                    <option className={styles.sort} value="release_date.desc">Release Date ▼</option>
                    <option className={styles.sort} value="release_date.asc">Release Date ▲</option>
                    <option className={styles.sort} value="revenue.desc">Earnings ▼</option>
                    <option className={styles.sort} value="revenue.asc">Earnings ▲</option>
                </select>
            </div>
            <div>
                Year:      
                <input className={styles.year} name="year" onChange ={(e) => handleYearChange(e.target.value)} type="number" min="1900" max="2099" step="1" placeholder="Year..."/>
            </div>
        </div>
    );    
};

export default Filter;
