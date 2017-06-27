$(document).ready(function() {

//Initial array of animials
  var animals = ["cat", "dog", "angry-panda", "elephant", "baby-animals", "lizard", "frog", "bear", "polar-bear", "monkey",];
  

  //displayAnimals funciton reenders the HTML to display the contect

  function displayAnimals (){
          
      var animal = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=739fbcca0f7e4fd694a10d1708e3f2f2&limit=10";
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
      
        for (j=0; j<11;j++) {
          
          var animalDiv = $("<div class='animal'>");
          var rating = response.data[j].rating;
          var pOne = $("<p>").text("Rating: " + rating);
          animalDiv.append(pOne);
          $("#animals-view").append(animalDiv);
         
          
          var imageDiv = $("<div>");
          var stillURL = response.data[j].images.original_still.url;
          var animateURL = response.data[j].images.original.url;
          var pTwo = $("<img>").attr("src", stillURL);
          pTwo.attr("data-state","still");
          pTwo.attr("data-still",stillURL);
          pTwo.attr("data-animate",animateURL);
          pTwo.addClass("image");
            
          imageDiv.append(pTwo);
          
          $("#animals-view").append(imageDiv);
        }
      });
      
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      $(document).on('click',".image", function(){
        var state = $(this).attr("data-state");
        if(state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          }else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
    }
    
    //function for displaying animial data
    function renderButtons(){
      $("#buttons-view").empty();

      for (var i = 0; i < animals.length; i++){
        
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").prepend(a);
      }
    }

    // This function handles events where an animial button is clicked

    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      
      var animal = $("#animal-input").val();
      animals.push(animal);
      
      console.log("I am here" + animals);
      renderButtons();
    });

    // Adding a click event listener to all elements with a class of "animal"
    $(document).on("click", ".animal", displayAnimals);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    });