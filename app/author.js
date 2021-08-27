$("#random-button-author").on('click', function(){
    window.location.href = "./index.html";
});

function getQuotesAuthor(){
    let params = new URLSearchParams(location.search);
    var author = params.get('a');
    $.get("https://quote-garden.herokuapp.com/api/v3/quotes?author="+author, function(data){
        data_string = JSON.stringify(data);    
        var total_quotes = data['totalQuotes'];
        $.get("https://quote-garden.herokuapp.com/api/v3/quotes?author="+author+"&limit="+total_quotes, function(data){
            var quotes = data["data"];
            console.log(quotes[0]["quoteAuthor"]);
            document.getElementById("author-title").innerHTML = quotes[0]["quoteAuthor"];
            for(var i = 0; i < total_quotes; i++){
                document.getElementById("quotes").innerHTML += `
                    <div class="quote">
                        <p class="m-auto border-left border-warning" id="quote-text">
                        ${quotes[i]["quoteText"]}
                        </p>
                    </div>
               `;
            }
        });
    });
}

getQuotesAuthor();