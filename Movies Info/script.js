const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', function() {

    const inputKeyword = document.querySelector('.input-keyword');
    fetch('http://www.omdbapi.com/?apikey=b82ec055&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(json => {
            const movies = json.Search;
            let cards = '';
            movies.forEach(movie => { cards += showCards(movie); });
            const moviesContainer = document.querySelector('.movies-container');
            moviesContainer.innerHTML = cards;

            // when detail button is clicked
            const detailBtn = document.querySelectorAll('.modal-detail-button');
            // add event listener to each detail button
            detailBtn.forEach(btn => {
                btn.addEventListener('click', function() {
                    const imdbid = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=b82ec055&i=' + imdbid)
                        .then(response => response.json())
                        .then(json => {
                            const movieDetails = showMovieDetail(json);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetails;

                        });
                });
            });
        });
});

// render movie cards
function showCards(movie) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="movie-poster">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}

// render movie detail
function showMovieDetail(json) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${json.Poster}" class="img-fluid" alt="modal-img">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${json.Title} (${json.Year})</h4></li>
                            <li class="list-group-item"><strong>Ratings:</strong> ${json.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${json.Director}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${json.Actors}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${json.Writer}</li>
                            <li class="list-group-item"><strong>Plot:</strong><br>${json.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}