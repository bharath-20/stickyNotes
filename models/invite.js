const knex = require("../config/dbConfig");

function addInvite(invite) {
  return knex("invites").insert(invite);
}

async function findInviteByToken(token) {
  const node =  await knex("invites").where("token",token).first();
  return node !== undefined;
}

async function findInviteByEmail(email) {
    const node = await knex("invites").where("email", email).first();
    return (node !== undefined);
  }
module.exports = { 
    addInvite, 
    findInviteByToken,
    findInviteByEmail
 };
