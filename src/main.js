//migración a axios

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
});
  
  
//Helpers  

function createMovies(movies, container) {
    //limpiando el contenido para solucionar carga duplicada
    container.innerHTML = '';
  
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300' + movie.poster_path);
  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
}
  
function createCategories(categories, container) {
    container.innerHTML = "";
  
    categories.forEach(category => {  
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
      });
      const categoryTitleText = document.createTextNode(category.name);
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    });
}
  
// Llamados a la API
//función para lista de películas en tendencia en home  
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)
  
    createMovies(movies, trendingMoviesPreviewList);
}
  
//función para lista de categorías
async function getCategegoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
  
    createCategories(categories, categoriesPreviewList)  ;
}

//función para filtrar películas por categorías   
async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;
  
    createMovies(movies, genericSection);
}

//función para buscar películas 
async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
  
    createMovies(movies, genericSection);
}

//función para listar películar en tendencias
async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
  
    createMovies(movies, genericSection);
}

//función para buscar una película específica
async function getMovieById(id) {    
    const { data: movie } = await api('movie/' + id);
  
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl);
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
  
    createCategories(movie.genres, movieDetailCategoriesList);
  
    getRelatedMoviesId(id);
}

//función para obtener películas similares en la vista de la película específica
async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
  
    createMovies(relatedMovies, relatedMoviesContainer);
}
