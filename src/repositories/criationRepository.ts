import connection from "../db/db.js";
import { Plant } from "../protocols/plant.js";
import { QueryResult } from "pg";

async function getPlantByName (name : string) : Promise<QueryResult> {
    return connection.query(`SELECT * FROM plants WHERE name = $1;`, [name]);
}

async function insertPlants ({name, cientificName, picture} : Plant) : Promise<QueryResult> {
    return connection.query(`
        INSERT INTO plants (name, "cientificName", picture) VALUES ($1, $2, $3);
    `, [name, cientificName, picture]);
}

async function getPlants () : Promise<QueryResult> {
    return connection.query(`SELECT * FROM plants;`);
}

async function getPlantById (id : number) : Promise<QueryResult> {
    return connection.query(`SELECT * FROM plants WHERE id = $1`, [id]); 
}

async function insertPlantsUpdate ({name, cientificName, picture, id} : Plant) : Promise<QueryResult> {
    return connection.query(`
        UPDATE plants SET name = $1, "cientificName" = $2, picture = $3 WHERE id = $4;
    `, [name, cientificName, picture, id]);
}

async function deletePlantById (id : number) : Promise<QueryResult> {
    return connection.query(`DELETE FROM plants WHERE id = $1;`, [id]);
}

export {getPlantByName, insertPlants, getPlants, getPlantById, insertPlantsUpdate, deletePlantById};