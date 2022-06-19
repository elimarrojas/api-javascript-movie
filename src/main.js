//migración a axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

//función para lista de películas en tendencia
async function getTrendingMoviesHome() {
    const {data} = await api('/trending/movie/day');
    const movies = data.results;
    console.log({data, movies});

    trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(movie => {   
        const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

//función para lista de categorías
async function getCategoriesMoviesHome() {
    const {data} = await api('/genre/movie/list');
    const categories = data.genres;
    console.log({data, categories});

    //limpiando contenido para solucionar carga duplicada
    categoriesPreviewList.innerHTML = "";

    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('.categoriesPreview-list');

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}

async function getMoviesByCategory(id) {
    const {data} = await api('/discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    console.log({data, movies});

    genericSection.innerHTML = "";

    movies.forEach(movie => {           
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });
}