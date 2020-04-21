function scorePassword(pass) {
    let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (let i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (let check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

/*function checkPassStrength(pass) {
    let score = scorePassword(pass);
    if (score > 80)
        return "strong";
    if (score > 60)
        return "good";
    if (score >= 30)
        return "weak";

    return "";
}

$(document).ready(function() {
    $("#password").on("keypress keyup keydown", function() {
        let pass = $(this).val();
        $("#strength_human").text(checkPassStrength(pass));
        $("#strength_score").text(scorePassword(pass));
    });
});*/

function checkPassStrength(pass) {
    let score = scorePassword(pass);
    if (score > 80){
        return "green";
    }
    if (score > 60){
        return "orange";
    }
    if (score >= 30){
        return "red";
    }
    return "";
}

$(document).ready(function () {
    $("#password").on("keypress keyup keydown", function () {
        let pass = $(this).val();
        let widthlength = scorePassword(pass);
        let width = widthlength+"%";
        $("#strength").css("background-color", checkPassStrength(pass));
        $("#strength").css("width", width);
    });
});
