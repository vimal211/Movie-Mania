let frame = document.getElementById('youtube');
let sry = document.getElementsByClassName('sorry')[0];
if(localStorage.getItem('id')){
    let key = localStorage.getItem('id');
    let url = `https://www.youtube.com/embed/${key}?controls=1`;
    console.log(url);
    frame.style.display="inherit";
    sry.style.display="none";
    frame.src=url;
}
else{
    frame.style.display="none";
    sry.style.display="inherit";

}

setTimeout(()=>{localStorage.removeItem('id');},3000)
