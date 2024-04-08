const movieTitle = document.querySelector('.movie-title');
const movieGenres = document.querySelector('.genres');
const movieDuration = document.querySelector('.movie-duration');
const moviePoster = document.querySelector('.movie-poster-container img');
const movieQuote = document.querySelector('.movie-info-quote');
const movieOverview = document.querySelector('.movie-info-overview');
const releaseDate = document.querySelector('.release-date');
const footerYear = document.querySelector('.year');
const btn = document.querySelector('.button');

window.onload = () => {
    let url = 'https://api.themoviedb.org/3/movie/550988?api_key=023b550c882b593e0332bc2b6859ab69';

    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        movieTitle.textContent = data.title;

        let date = new Date(data.release_date);
        releaseDate.textContent = `${date.getFullYear()} ${data.production_countries[0].iso_3166_1}`;
        movieDuration.textContent = `${data.runtime} minutes`;
        movieQuote.textContent = data.tagline;
        movieOverview.textContent = data.overview;

        let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
        moviePoster.src = posterUrl;
        moviePoster.alt = `${data.title} Poster`;

        let genresToDisplay = '';
        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name}, `;
        });
        movieGenres.textContent = genresToDisplay.trim();

        let currentYear = new Date().getFullYear();
        footerYear.textContent = currentYear;
    });

    btn.addEventListener('click', () => {
        const userInputTitle = document.querySelector('.userInputTitle').value;
        const userInputYear = document.querySelector('.userInputYear').value;
        const userInputTitleUrl = document.querySelector('.userInputTitleUrl').value;

        const favouriteMovieTitle = document.querySelector('.favouriteMovieTitle');
        favouriteMovieTitle.textContent = userInputTitle + ' (' + userInputYear + ')';

        const containerFavourite = document.querySelector('.container_Favourite');
        containerFavourite.style.backgroundImage = `linear-gradient(rgba(51, 51, 82, 0.685), rgba(73, 49, 49, 0.582)), url('${userInputTitleUrl}')`;
    });
}
