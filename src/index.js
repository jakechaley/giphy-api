import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import *** from './js/*** */.js';

//UI logic
function makeAPICall (apiParam, divToUpdate) {
  let request = new XMLHttpRequest();
  const functionUrl = `http://api.giphy.com/v1/gifs/${apiParam}limit=5&rating=PG&api_key=${process.env.API_KEY}`;


  console.log(functionUrl);
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", functionUrl, true);
  request.send();

  function getElements(response) {

    if (apiParam === "random?") {
      $(`.${divToUpdate}`).html(`<img src ="${response.data.images.original.url}" alt="random gif">`);
    } else {
      response.data.forEach((gif) => {
        $(`.${divToUpdate}`).append(`<img src ="${gif.images.original.url}" alt="trending gifs">`);
      });
    }
  }
}

$(document).ready(function() {
  // let request = new XMLHttpRequest();
  // const url2 = `http://api.giphy.com/v1/gifs/trending?limit=5&api_key=${process.env.API_KEY}`;

  // request.onreadystatechange = function() {
  //   if (this.readyState === 4 && this.status === 200) {
  //     const response = JSON.parse(this.responseText);
  //     getElements(response);
  //   }
  // };

  // request.open("GET", url2, true);
  // request.send();

  // function getElements(response) {
  //   response.data.forEach((gif) => {
  //     $('.trendingGifs').append(`<img src ="${gif.images.original.url}" alt="trending gifs">`);
  //   });
  // }

  makeAPICall(`trending?`,"trendingGifs");

  $('#random-image').click(function() {
    makeAPICall('random?',"random-result");
  });
  $('#search').click(function() {
    const searchTerm = $("#gif-search").val();
    $('#gif-search').val("");
    makeAPICall(`search?q=${searchTerm}&`,"gif-result");
  });

  // $('#search').click(function() {
  //   const searchTerm = $("#gif-search").val();
  //   $('#gif-search').val("");


  //   let request = new XMLHttpRequest();
  //   const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=5&api_key=${process.env.API_KEY}`;


  //   //http://api.giphy.com/v1/gifs/search?q=Portland Timbers&limit=5&api_key=uYeMyz3NtOwM3Dz9bqMDKJEUEJmALo8w

  //   //http://api.giphy.com/v1/gifs/trending?q=&limit=5&api_key=uYeMyz3NtOwM3Dz9bqMDKJEUEJmALo8w

  //   request.onreadystatechange = function() {
  //     if (this.readyState === 4 && this.status === 200) {
  //       const response = JSON.parse(this.responseText);
  //       getElements(response);
  //     }
  //   };

  //   request.open("GET", url, true);
  //   request.send();

  //   function getElements(response) {
  //     response.data.forEach((gif) => { 
  //     $('.gif-result').append(`<img src="${gif.images.original.url}" alt="firstImage">`);
  //     });
  //   }

    
  // });
});



  // array.forEach((thing) => {
  //   this.stuff.push(thing);
  // });
