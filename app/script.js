//GLOBALS
var str = JSON.stringify;

$("#random-button").on('click', function(){
    generate();
});

$("#button-author").on('click', function(){
    window.location.href = "./author.html?a=" + $('#author').attr('data-value');
});

function generate(){
    $.get("https://quote-garden.herokuapp.com/api/v3/quotes", function(data){
        data_string = JSON.stringify(data);    
        var total_quotes = data['totalQuotes'];
        $.get("https://quote-garden.herokuapp.com/api/v3/quotes?limit=1&page="+ Math.random() * (total_quotes - 0) + 0, function(data){
            var quote = data['data'];
            document.getElementById("quote-text").innerHTML = str(quote[0]["quoteText"]);
            document.getElementById("author").innerHTML = str(quote[0]["quoteAuthor"]).replace(/['"]+/g, '');
            $("#author").attr("data-value", str(quote[0]["quoteAuthor"]).replace(/['"]+/g, ''));
            document.getElementById("genre").innerHTML = str(quote[0]["quoteGenre"]).replace(/['"]+/g, '');
        });
    });
}

generate();