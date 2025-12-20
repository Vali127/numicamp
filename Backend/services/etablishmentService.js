import {getEtablishment} from "../models/etablishmentModel.js";

export async function getEtablishmentService() {
    return await getEtablishment();
}