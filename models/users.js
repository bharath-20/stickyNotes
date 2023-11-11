const knex = require("../config/dbConfig");

function getAllUsers(){
    return knex("users").select("*");
};
function promoteUser(id ){
    return knex("users").where("userId", id).update("role" , "ADMIN");
};

module.exports = {
    getAllUsers,
    promoteUser
};