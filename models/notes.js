const knex = require("../config/dbConfig");

function createNote(note){
    return knex("Note").insert(note);
};
function getAllNotes(){
    return knex("Note").select("*");
};
function getNotesByUserIdAndId(userId,id){
    return knex("Note").select("*").where("id",id).andWhere("userId",userId);
};
function getAllNotesById(id){
    return knex("Note").select("*").where("id",id);
};
function getAllNotesByUserId(userId){
    return knex("Note").select("*").where("userId",userId);
};
function getUserPublicNotes(userId){
    return knex("Note").select("*").where("visibility", 0).whereNot("userId", userId).orderBy("updated_at", "desc");
};
function getAllPublicNotes(){
    return knex("Note").select("*").where("visibility", 0).orderBy("updated_at", "desc");
};
function deleteNote(id){
    return knex("Note").where("id", id).del();
};

function updateNote(id, note){
    return knex("Note").where("id", id).update({...note, updated_at: knex.fn.now() });
};


module.exports = {
    createNote,
    getAllNotes,
    getAllNotesById,
    getNotesByUserIdAndId,
    getAllNotesByUserId,
    getAllPublicNotes,
    getUserPublicNotes,
    deleteNote,
    updateNote
};