var Animal = require('./../js/animal.js').animalModule;

function displayResults(results) {
  console.log(results);
}

function printTaxonomy(name, taxonomy) {
  var htmlString = "<h2>Taxonomy of "+ name +":</h2> <ul>";
  for (var rank in taxonomy) {
    htmlString += "<li><strong>";
    htmlString +=  rank + ": </strong>";
    htmlString +=  taxonomy[rank] + "</li>";
  }
  htmlString += "</ul>";
  console.log(htmlString);
  $('#display').html(htmlString);
}

$(function() {
  $("#animal-search").submit(function(event) {
    event.preventDefault();

    var animal = new Animal();
    var name = $("#animal").val();
    // animal.taxonomy(name, printTaxonomy);
    animal.occurrences(name, displayResults);
  });
});
