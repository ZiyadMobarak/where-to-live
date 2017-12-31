function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  //----------------------------------------------------------
  // Change the background to the street view of the entered address
  //----------------------------------------------------------
  // Get the text in the street and city inputs fields
  var street = $("#street").val();
  var city = $("#city").val();

  //Prepare the address and the request URL string
  var address = street + ", " + city;
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



  //Make the image background of the page

  // YOUR CODE GOES HERE!

  return false;
};

$('#form-container').submit(loadData);