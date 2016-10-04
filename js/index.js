$(document).ready(function() {
  $("#searching").click(startSearch);
  $(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      startSearch();
    }
  });//http://www.mkyong.com/jquery/how-to-check-if-an-enter-key-is-pressed-with-jquery/
});

function startSearch() {
  var searchString = $("#searchWord").val();
  searchWiki(searchString);
}

function searchWiki(myItem) {
  // the url query is 4 lines for readability
  var myUrl = 'http://en.wikipedia.org/w/api.php?format=json';
  myUrl += '&action=query&generator=search&gsrnamespace=0&gsrlimit=10';
  myUrl += '&prop=pageimages|extracts&pilimit=max&exintro&explaintext';
  myUrl += '&exsentences=1&exlimit=max&gsrsearch=' + myItem + '&callback=?';
  //console.log(myUrl);
  $.getJSON(myUrl, function(json) {
    buildHtml(json);
  });
}

function buildHtml(obj) {
  console.log(obj);
  var myKeys = Object.keys(obj.query.pages);
  var myHtml = '';
  for (var i = 0; i < myKeys.length; i++) {
    //console.log(obj.query.pages[myKeys[i]].title);
    myHtml += '<div class="htmlBlock"> <a href="https://en.wikipedia.org/?curid=';
    myHtml += myKeys[i];
    myHtml += '"target="_blank"><h2>' + obj.query.pages[myKeys[i]].title + '</h2></a><br><p>' + obj.query.pages[myKeys[i]].extract + '</p></div>';
  }
  $('#theResult').html(myHtml);
}

// email button at the bottom
$("#email").attr({
  href: ("mailto:gregdd@outlook.com?subject=contact_from_website&body=Hello")
});