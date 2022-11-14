import express from "express";
import { InsertPlant, ListAllPlants, FilterPlant, UpdatePlantInfo, DeletPlant } from "../controllers/criationController.js";
var router = express.Router();
router.post("/plants", InsertPlant);
router.get("/plants", ListAllPlants);
router.get("/plants/:id", FilterPlant);
router.put("/plants/:id", UpdatePlantInfo);
router["delete"]("/plants/:id", DeletPlant);
export default router;
