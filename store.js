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

    get totalAmount() {
        let totalAmount = 0;
        for (let rental of this.rentals) {
            totalAmount += rental.amount;
        }
        return totalAmount;
    }

    get totalFrequentPoints() {
        let totalFrequentPoints = 0;
        for (let rental of this.rentals) {
            totalFrequentPoints += rental.frequentRenterPoints;
        }
        return totalFrequentPoints;
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

    get frequentRenterPoints() {
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

    get days() {
        return this._data.days;
    }
}

function textStatement(customerParams, moviesParams) {
    const customer = new Customer(customerParams, moviesParams);
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${rental.movie.title}\t${rental.amount}\n`;
    }
    result += `Amount owed is ${customer.totalAmount}\n`;
    result += `You earned ${customer.totalFrequentPoints} frequent renter points\n`;
    return result;
}

function htmlStatement(customerParams, moviesParams) {
    const customer = new Customer(customerParams, moviesParams);
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    for (let rental of customer.rentals) {
        result += `<p>${rental.movie.title}\t${rental.amount}</p>\n`;
    }
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