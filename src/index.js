import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

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


  makeAPICall(`trending?`,"trendingGifs");

  $('#random-image').click(function() {
    makeAPICall('random?',"random-result");
  });
  $('#search').click(function() {
    const searchTerm = $("#gif-search").val();
    $('#gif-search').val("");
    makeAPICall(`search?q=${searchTerm}&`,"gif-result");
  });

});