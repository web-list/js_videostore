"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
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

    for (let rental of customer.rentals) {
        let movie = movies[rental.movieID];
        let thisAmount = 0;

        frequentRenterPoints += frequentRenterPointsInc(movie, rental);
        thisAmount = thisAmountInc(movie, rental);

        //print figures for this rental
        result += `\t${movie.title}\t${thisAmount}\n`;
        totalAmount += thisAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points\n`;

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