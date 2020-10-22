document.getElementById("jokeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  var baseURL = "https://sv443.net/jokeapi/v2";
  var category = document.getElementById("selector").value;
  var params = [
      "blacklistFlags=nsfw,religious,racist,sexist,political",
      "idRange=0-100"
  ];

  var xhr = new XMLHttpRequest();
  xhr.open("GET", baseURL + "/joke/" + category + "?" + params.join("&"));

  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
      {
          var randomJoke = JSON.parse(xhr.responseText);

          if(randomJoke.type == "single")
          {
              var joke = randomJoke.joke;
              if (joke == undefined || joke.search("shit") != -1 || joke.search("amn") != -1 || joke.search("Asian") != -1 || joke.search("Japanese") != -1)
              {
                  return;
              }

              // If type == "single", the joke only has the "joke" property
              //var temp = document.getElementById("jokeResult").innerHTML;
              document.getElementById("jokeResult").innerHTML = "<p>" + randomJoke.joke + "</p>";
              //document.getElementById("jokeResult").innerHTML += temp;
          }
          else
          {
              var joke = randomJoke.setup + randomJoke.delivery;
              if (joke == undefined || joke.search("shit") != -1 || joke.search("amn") != -1 || joke.search("Asian") != -1 || joke.search("Japanese") != -1)
              {
                  return;
              }
              //var temp = document.getElementById("jokeResult").innerHTML;
              document.getElementById("jokeResult").innerHTML = "<p>" + randomJoke.setup + "</p>";
              document.getElementById("jokeResult").innerHTML += "<p>" + randomJoke.delivery + "</p>";
              //document.getElementById("jokeResult").innerHTML += temp;

          }
      }
      else if(xhr.readyState == 4)
      {
          alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
      }
  };

  xhr.send();
});
