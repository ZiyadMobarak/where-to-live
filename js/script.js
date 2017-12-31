/**
 * Name: Ziyad M. AlGhamdi
 * Udacity - Project #8
 * NY Times API Key : b6f8e26a05424794ac661a13a8a30016
 */

var nytApiKey = "b6f8e26a05424794ac661a13a8a30016";

function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // Get the text in the street and city inputs fields and prepare the address string
  var street = $("#street").val();
  var city = $("#city").val();
  var address = street + ", " + city;

  //----------------------------------------------------------
  // Change the background to the street view of the entered address
  //----------------------------------------------------------
  //Prepare the request URL string
  var imageURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address;

  //Change the greeting message to an appropriate one
  $greeting.text("So, you want to live at " + address + "?");

  //Create and prepare the image tag, and append it to the body
  var $imageTag = $("<img>");
  $imageTag.toggleClass("bgimg");
  $imageTag.attr("src", imageURL)
  $body.append($imageTag);
  //----------------------------------------------------------
  // End of changing the background to the required street view
  //----------------------------------------------------------


  //----------------------------------------------------------
  // Getting NYT Articles
  //----------------------------------------------------------
  // Built by LucyBot. www.lucybot.com
  var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  //Preparing the parameter for the URL request
  nytURL += '?' + $.param({
    'api-key': nytApiKey,
    'q': city
  });

  //Make a GET request and act accordingly
  $.ajax({
    url: nytURL,
    method: 'GET',
  }).done(function(result) {
    console.log(result); //Print the article documents recieved
    var recievedArticles = result.response.docs;

    //Loop through each article, prepare it and append it
    for (var i = 0; i < recievedArticles.length; i++) {
      //Get the i-th article
      var theArticle = recievedArticles[i];

      //Prepare the list item
      var $articleListItem = $("<li></li>");
      $articleListItem.toggleClass("article");

      //Get the article title and url and create a <a> and prepare to be appended to the item list
      var articleTitle = theArticle.headline.main;
      var articleURL = theArticle.web_url;
      var $articleTitle = $("<a></a>");
      $articleTitle.attr("href", articleURL);
      $articleTitle.text(articleTitle);

      //Get the first paragraph in the article and prepare a <p> to be appended to the item list
      var firstParagraph = theArticle.snippet;
      var $articleSnippet = $("<p></p>");
      $articleSnippet.text(firstParagraph);

      //Append the title and the paragraph to the list item
      $articleListItem.append($articleTitle);
      $articleListItem.append($articleSnippet);

      //Append the list item to the unordered list in HTML
      var $theWholeList = $("#nytimes-articles");
      $theWholeList.append($articleListItem);

      //Change the title of the NYT articles section
      var nytNewHeader = "New York Times Articles About " + address;
      $nytHeaderElem.text(nytNewHeader);
    }

  }).fail(function(err) {
    //Change the title of the NYT articles section in case of an error
    var nytNewHeader = "New York Times Articles Could Not Be Loaded";
    $nytHeaderElem.text(nytNewHeader);

    //throw err;
  });
  //----------------------------------------------------------
  // End of getting data from NYT
  //----------------------------------------------------------


  //----------------------------------------------------------
  // Getting Wikipedia Articles
  //----------------------------------------------------------
  var wikiURL = "https://en.wikipedia.org/w/api.php";

  //Wiki Timeout
  var wikiRequestTimeout = setTimeout(function() {
    var errorWikiHeader = "Failed to Get Wikipedia Resources";
    $wikiElem.text(errorWikiHeader);
  }, 8000);

  //Preparing the parameter for the URL request
  wikiURL += '?' + $.param({
    'action': 'opensearch',
    'search': city,
    'format': 'json',
    'callback': 'wikiCallback'
  });

  //Issue a JSONP request to Wikipedia
  $.ajax({
    url: wikiURL,
    dataType: "jsonp",
    success: function(response) {
      var articlesList = response[1];

      for (var i = 0; i < articlesList.length; i++) {
        //Prepare the list item
        var $articleListItem = $("<li></li>");

        //Get the article title and url and create a <a> and prepare to be appended to the item list
        var articleStr = articlesList[i];
        var articleURL = "https://en.wikipedia.org/wiki/" + articleStr;
        var $articleTitle = $("<a></a>");
        $articleTitle.attr("href", articleURL);
        $articleTitle.text(articleStr);

        //Append the link to the list item, then append the item to the Wiki List
        $articleListItem.append($articleTitle);
        $wikiElem.append($articleListItem);

        //Stop Error timeout upon success
        clearTimeout(wikiRequestTimeout);
      }
    }
  });

  //----------------------------------------------------------
  // End of Getting Wikipedia Articles
  //----------------------------------------------------------

  return false;
};

$('#form-container').submit(loadData);