var Map = require('./../js/map.js').mapModule;

function Animal() {

}

Animal.prototype.taxonomy = function(name, callback) {
  var url = "http://api.gbif.org/v1/species/search?language=eng&datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q=" + encodeURI(name);

  $.get(url).then(function(response) {

    var name = "";

    response.results[0].vernacularNames.forEach(function(element) {
      if (element.language === "eng") {
        name = element.vernacularName;
      }
    });

    var taxonomy = {
      "kingdom": response.results[0].kingdom,
      "phylum": response.results[0].phylum,
      "class": response.results[0].class,
      "order": response.results[0].order,
      "family": response.results[0].family,
      "genus": response.results[0].genus,
      "species": response.results[0].species
    };

    callback(name, taxonomy);
  });
};

Animal.prototype.parseOccurence = function(response,callback) {
  var data = {
    "count": response.count,
    "results": response.results.length
  };
  callback(data);
}

Animal.prototype.occurrences = function(name, callback) {
  var that = this;
  var url = "http://api.gbif.org/v1/species/search?language=eng&datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q=" + encodeURI(name);

  $.get(url).then(function(response) {
    var key = response.results[0].key;
    var url = "http://api.gbif.org/v1/occurrence/search?limit=300&speciesKey=" + key;
    $.get(url).then(function(response) {
      that.parseOccurence(response,callback);
      locations = [];
      response.results.forEach(function(result) {
        var place = [result.decimalLatitude, result.decimalLongitude];
        locations.push(place);
      });
      var newMap = new Map();
      newMap.draw(locations);
    });
  });
};

exports.animalModule = Animal;
