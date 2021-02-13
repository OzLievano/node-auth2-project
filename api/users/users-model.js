const db = require('../../data/db-config');

module.exports = {
    find, 
    findBy,
    findById,
    add
}

function find(){
    return db("users");
}

function findBy(filter){
    return db('users').where(filter)
}

function findById(id){
    return db('users').where({ id });
}

function add(userData){
    return db('users').insert(userData);
}