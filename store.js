"use strict";

function getFrequentRenterPoints(rental) {
    let movie = getMovie(rental.movieID);
    if (movie.code === "new" && rental.days > 2) return 2; else return 1;
}

function getAmount(rental) {
    let thisAmount = 0;
    let movie = getMovie(rental.movieID);
    switch (movie.code) {
        case "regular":
            thisAmount = 2;
            if (rental.days > 2) {
                thisAmount += (rental.days - 2) * 1.5;
            }
            break;
        case "new":
            thisAmount = rental.days * 3;
            break;
        case "childrens":
            thisAmount = 1.5;
            if (rental.days > 3) {
                thisAmount += (rental.days - 3) * 1.5;
            }
            break;
    }
    return thisAmount;
}

function getTotalAmount(customer) {
    let totalAmount = 0;
    for (let rental of customer.rentals) {
        totalAmount += getAmount(rental);
    }
    return totalAmount;
}

function getTotalFrequentPoints(customer) {
    let totalFrequentPoints = 0;
    for (let rental of customer.rentals) {
        totalFrequentPoints += getFrequentRenterPoints(rental);
    }
    return totalFrequentPoints;
}

function getMovie(movieID) {
    return movies[movieID];
}

function textStatement(customer) {
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${getMovie(rental.movieID).title}\t${getAmount(rental)}\n`;
    }
    result += `Amount owed is ${getTotalAmount(customer)}\n`;
    result += `You earned ${getTotalFrequentPoints(customer)} frequent renter points\n`;
    return result;
}

function htmlStatement(customer) {
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    for (let rental of customer.rentals) {
        result += `<p>${getMovie(rental.movieID).title}\t${getAmount(rental)}</p>\n`;
    }
    result += `<p>Amount owed is ${getTotalAmount(customer)}</p>\n`;
    result += `<p>You earned ${getTotalFrequentPoints(customer)} frequent renter points</p>\n`;
    return result;
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

console.log(textStatement(customer, movies));
console.log(htmlStatement(customer, movies));