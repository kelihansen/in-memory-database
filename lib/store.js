const shortid = require('shortid');

module.exports = class Store {
    constructor() {
        this.list = [];
    }

    save(object) {
        object._id = shortid.generate();
        return object;
    }

    // .save(<objectToSave>)
    // creates an _id property on the object
    // returns objectToSave with added _id property

    // reverseWordOrder() {
    //     return this.sentence
    //         .split(' ')
    //         .reverse()
    //         .join(' ');
    // }
};