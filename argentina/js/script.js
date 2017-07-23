document.querySelector('.hamburger-container').addEventListener('click',function(event) {
    event.target.classList.toggle("change");

    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
});

