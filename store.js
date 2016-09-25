"use strict";

function statement(customer, movies) {
    let result = `Rental Record for ${customer.name}\n`;

    let frequentRenterPointsInc = function (movie, rental) {
        if (movie.code === "new" && rental.days > 2) return 2; else return 1;
    };

    let thisAmountInc = function (movie, rental) {
        let thisAmount = 0;
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
    };

    let getTotalAmount = function(customer, movies) {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            let movie = movies[rental.movieID];
            totalAmount += thisAmountInc(movie, rental);
        }
        return totalAmount;
    };

    let getTotalFrequentPoints = function() {
        let totalFrequentPoints = 0;
        for (let rental of customer.rentals) {
            let movie = movies[rental.movieID];
            totalFrequentPoints += frequentRenterPointsInc(movie, rental);
        }
        return totalFrequentPoints;
    };

    for (let rental of customer.rentals) {
        let movie = movies[rental.movieID];
        result += `\t${movie.title}\t${thisAmountInc(movie, rental)}\n`;
    }
    // add footer lines
    result += `Amount owed is ${getTotalAmount(customer, movies)}\n`;
    result += `You earned ${getTotalFrequentPoints()} frequent renter points\n`;

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

console.log(statement(customer, movies));