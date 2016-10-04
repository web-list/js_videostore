"use strict";

class Customer {
    constructor(data, movies) {
        this._data = data;
        this.movies = movies;
    }

    get name() {
        return this._data.name;
    }

    get rentals() {
        return this._data.rentals.map(rentalData => new Rental(rentalData, this.movies));
    }

}

class Rental {
    constructor(data, movies) {
        this._data = data;
        this.movies = movies;
    }

    get movieID() {
        return this._data.movieID;
    }

    get days() {
        return this._data.days;
    }

    get movie() {
        return this.movies[this.movieID];
    }
}

function statement(customerData, movies) {
    let customer = new Customer(customerData, movies);
    let result = `Rental Record for ${customer.name}\n`;

    let frequentRenterPointsInc = function (movie, rental) {
        if (movie.code === "new" && rental.days > 2) return 2; else return 1;
    };

     function amountFor(movie, rental) {
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
    }

     function getTotalAmount(customer, movies) {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            let movie = movies[rental.movieID];
            totalAmount += amountFor(movie, rental);
        }
        return totalAmount;
    }

    function getTotalFrequentPoints() {
        let totalFrequentPoints = 0;
        for (let rental of customer.rentals) {
            let movie = movies[rental.movieID];
            totalFrequentPoints += frequentRenterPointsInc(movie, rental);
        }
        return totalFrequentPoints;
    }

    for (let rental of customer.rentals) {
        let movie = movies[rental.movieID];
        result += `\t${movie.title}\t${amountFor(movie, rental)}\n`;
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