const apikey = "324fce0873d95bf5d638904c01772ebf";
let movieContainer = document.getElementsByClassName("movie_container")[0];
let language = document.getElementById("lang");
let category = 'popular';
let popular = document.getElementById('popular');
let upcoming = document.getElementById('upcoming');
let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=en&page=1`;


language.addEventListener("change", function () {
  url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=${language.value}&page=1`;
  console.log(url);
  event.preventDefault();
  fetchMovie();
});

popular.addEventListener('click',()=>{
    category="popular";
    url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=${language.value}&page=1`;
    fetchMovie();
})

upcoming.addEventListener('click',()=>{
    category="upcoming";
    url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=${language.value}&page=1`;
    fetchMovie();
})



function fetchMovie() {
  movieContainer.innerHTML = "";
  let fragment = `
    <div onclick="showTrailer(this)" class='movie_box'>
       <p class="title"></p>
       <p class="release_date"></p>
       <img class="poster" src="" alt="">
       <div class="like_view">
          <span><i style="color:red;" class="fas fa-heart"></i><span class="likes"></span></span>
          <span><i style="color:blue;" class="fas fa-eye"></i><span class="popularity"></span></span>
       </div>
    </div>
    `;

  axios(url).then((data) => {
    // console.log(data)
    let res = data.data.results.length;
    for (let i = 0; i < res; i++) {
      movieContainer.innerHTML += fragment;
      let title = document.getElementsByClassName("title")[i];
      let release = document.getElementsByClassName("release_date")[i];
      let img = document.getElementsByClassName("poster")[i];
      let popularity = document.getElementsByClassName("popularity")[i];
      let likes = document.getElementsByClassName("likes")[i];

      document.getElementsByClassName('movie_box')[i].setAttribute('id',(data.data.results[i].id));
      title.innerHTML = data.data.results[i].original_title;
      release.innerHTML = `Released : ${data.data.results[i].release_date}`;
      img.src = `https://image.tmdb.org/t/p/w500${data.data.results[i].poster_path}`;
      popularity.innerHTML = data.data.results[i].popularity;
      likes.innerHTML = data.data.results[i].vote_average * 10;
    }
  });
}

function showTrailer(movie){
  let videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apikey}`
  axios(videoUrl).then(data=>{
    let obj = data.data.results[0];
    if(obj.hasOwnProperty('key')){
      let videoKey = obj.key;
      console.log(videoKey)
     localStorage.setItem('id',videoKey);
    }
  })
  
 window.location.href="./trailer/trailer.html"
}

fetchMovie();
