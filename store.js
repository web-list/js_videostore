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

    get totalAmount() {
        let amount = 0;
        for (let rental of this.rentals) {
            amount += rental.amount;
        }
        return amount;
    }

    get totalFrequentPoints() {
        let frequentPoints = 0;
        for (let rental of this.rentals) {
            frequentPoints += rental.frequentRenterPointsInc;
        }
        return frequentPoints;
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

    get frequentRenterPointsInc() {
        if (this.movie.code === "new" && this.days > 2) return 2; else return 1;
    }

    get amount() {
        let thisAmount = 0;
        switch (this.movie.code) {
            case "regular":
                thisAmount = 2;
                if (this.days > 2) {
                    thisAmount += (this.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = this.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (this.days > 3) {
                    thisAmount += (this.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

}

function textStatement(customerData, movies) {
    let customer = new Customer(customerData, movies);
    let result = `Rental Record for ${customer.name}\n`;

    for (let rental of customer.rentals) {
        let movie = movies[rental.movieID];
        result += `\t${movie.title}\t${rental.amount}\n`;
    }
    // add footer lines
    result += `Amount owed is ${customer.totalAmount}\n`;
    result += `You earned ${customer.totalFrequentPoints} frequent renter points\n`;

    return result;
}

function htmlStatement(customerData, movies) {
    let customer = new Customer(customerData, movies);
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    result += '<ul>\n';

    for (let rental of customer.rentals) {
        let movie = movies[rental.movieID];
        result += `<li>\t${movie.title}\t${rental.amount}</li>\n`;
    }

    result += '</ul>\n';

    // add footer lines
    result += `<p>Amount owed is ${customer.totalAmount}</p>\n`;
    result += `<p>You earned ${customer.totalFrequentPoints} frequent renter points</p>\n`;

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