export default class GiphyApp {
  static trendingGifs() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/trending?limit=5&api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  static searchGifs(searchTerm) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=5&api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }


  

  static randomGif() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
