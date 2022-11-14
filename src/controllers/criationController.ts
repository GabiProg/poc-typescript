import { Request, Response } from 'express';
import {Plant} from '../protocols/plant.js';
import * as criationRepository from "../repositories/criationRepository.js";

export async function InsertPlant (req: Request, res: Response) {
    const { name, cientificName, picture } : Plant = req.body;
   
    if(!name || !cientificName || !picture) {
        return res.status(422).send("Please, complet the fields correctly.");
    }
    try {
        const alreadyRegistered = criationRepository.getPlantByName(name);

        const getPlant = (await alreadyRegistered).rows.map(item => item.name);
        if(getPlant[0]) {
            return res.status(409).send("The has been already registered.");
        }

        await criationRepository.insertPlants({name, cientificName, picture});

        res.status(201).send("The plant was registered.");

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function ListAllPlants (req: Request, res: Response) {
    try {
        const displayAllPlants = await criationRepository.getPlants();
       
        res.status(200).send(displayAllPlants.rows);

    } catch (error) {
        res.sendStatus(500);  
    }
}

export async function FilterPlant (req: Request, res: Response) {
    const { id } = req.params;

    try {
        const filterPlant = await criationRepository.getPlantById(Number(id));
       
        if (filterPlant.rows.length <= 0) {
            return res.status(404).send("Sorry, the plant couldn't be found.")
        }

        res.status(200).send(filterPlant.rows);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function UpdatePlantInfo (req: Request, res: Response) {
    const { ID } = req.params;
    const { name, cientificName, picture } : Plant = req.body;

    if(name === "" || cientificName === "" || picture === ""){
        return res.status(422).send("Please, complet the fields correctly.");
    }
    const id = Number(ID);
    try {
        const getPlant = await criationRepository.getPlantById(id);

        if (getPlant.rows.length <= 0) {
            return res.status(404).send("Sorry, the plant couldn't be found.")
        }
        
        await criationRepository.insertPlantsUpdate({name, cientificName, picture, id});
        res.status(200).send("Plant was updated.");

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function DeletPlant (req: Request, res: Response) {
    const { id } = req.params;

    try {
        const getPlant = await criationRepository.getPlantById(Number(id));

        if (getPlant.rows.length <= 0) {
            return res.status(404).send("Sorry, the plant couldn't be found.")
        }

        await criationRepository.deletePlantById(Number(id));

        res.status(200).send("Plant deleted.");

    } catch (error) {
        res.sendStatus(500);
    }
}