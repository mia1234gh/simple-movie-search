createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSrc = movie.Poster === 'A/N' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `;
    },
    onOptionSelect(movie) {
        onMovieSelect(movie);
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData (searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '43c23bb9',
                s: searchTerm
            }
        });
        if (response.data.Error) {
            return [];
        }
        return response.data.Search;
        // return all the data we fetched.
    }
});

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '43c23bb9',
            i: movie.imdbID
        }
    });
    document.querySelector('.summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
    return `
    <article class="media">
        <figure class="media-left">
        <p class="image">
            <img src="${movieDetails.Poster}" />
        </p>
        </figure>

        <div class="media-content">
            <div class="content">
                <h1>${movieDetails.Title}</h1>
                <h4>${movieDetails.Genre}</h4>
                <p>${movieDetails.Plot}</p>
            </div>
        </div>
    </article>

    <article class="notification is-primary">
        <p class="title">
        ${movieDetails.Awards}
        </p>
        <p>Awards</p>
    </article>
    
    <article class="notification is-primary">
    <p class="title">
    ${movieDetails.BoxOffice}
    </p>
    <p>BoxOffice</p>
    </article>

    <article class="notification is-primary">
        <p class="title">
        ${movieDetails.Country}
        </p>
        <p>Country</p>
    </article>

    <article class="notification is-primary">
        <p class="title">
        ${movieDetails.Metascore}
        </p>
        <p>Metascore</p>
    </article>

    <article class="notification is-primary">
        <p class="title">
        ${movieDetails.imdbRating}
        </p>
        <p>IMDB Rating</p>
    </article>

    <article class="notification is-primary">
        <p class="title">
        ${movieDetails.imdbVotes}
        </p>
        <p>IMDB Votes</p>
    </article>
    `;
}