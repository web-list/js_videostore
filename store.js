"use strict";

class Customer {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get name() {
        return this._data.name;
    }

    get rentals() {
        return this._data.rentals.map(rentalParams => new Rental(rentalParams, this._movies));
    }

}

class Rental {
    constructor(data, movies) {
        this._data = data;
        this._movies = movies;
    }

    get movieID() {
        return this._data.movieID;
    }

    get movie() {
        return this._movies[this.movieID];
    }

    get days() {
        return this._data.days;
    }
}

function getFrequentRenterPoints(rental) {
    if (rental.movie.code === "new" && rental.days > 2) return 2; else return 1;
}

function getAmount(rental) {
    let thisAmount = 0;
    switch (rental.movie.code) {
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

function textStatement(customerParams, moviesParams) {
    const customer = new Customer(customerParams, moviesParams);
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${rental.movie.title}\t${getAmount(rental, movies)}\n`;
    }
    result += `Amount owed is ${getTotalAmount(customer, movies)}\n`;
    result += `You earned ${getTotalFrequentPoints(customer, movies)} frequent renter points\n`;
    return result;
}

function htmlStatement(customerParams, moviesParams) {
    const customer = new Customer(customerParams, moviesParams);
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    for (let rental of customer.rentals) {
        result += `<p>${rental.movie.title}\t${getAmount(rental, movies)}</p>\n`;
    }
    result += `<p>Amount owed is ${getTotalAmount(customer, movies)}</p>\n`;
    result += `<p>You earned ${getTotalFrequentPoints(customer, movies)} frequent renter points</p>\n`;
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