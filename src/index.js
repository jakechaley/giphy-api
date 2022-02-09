import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import GiphyApp from "./giphy.js";

function getElements(response) {
  response.data.forEach((gif) => {
    $(".trendingGifs").append(
      `<img src ="${gif.images.original.url}" alt="trending gifs">`
    );
  });
}
function getSearchElements(response) {
  response.data.forEach((gif) => {
    $(".gif-result").append(
      `<img src="${gif.images.original.url}" alt="firstImage">`
    );
  });
}
function getRandomElements(response) {
  $(".random-result").append(`<img src="${response.data.images.original.url}" alt="firstImage">`);
}


//UI logic
$(document).ready(function () {
  let promise = GiphyApp.trendingGifs();
  promise.then(function (response) {
    const body = JSON.parse(response);
    getElements(body);
  });

  $("#search").click(function () {
    const searchTerm = $("#gif-search").val();
    $("#gif-search").val("");
    let promise = GiphyApp.searchGifs(searchTerm);
    promise.then(function (response) {
      const body = JSON.parse(response);
      getSearchElements(body);
    });
  });

  $("#random-image").click(function () {
    $("#random-result").val("");
    let promise = GiphyApp.randomGif();
    promise.then(function (response) {
      const body = JSON.parse(response);
      getRandomElements(body);
    });
  });
});
