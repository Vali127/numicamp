import {insertOrganisation, insertPerson} from "../models/registerModel.js";

export async function registerPersonService(data){

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await insertPerson({ ...data, password: hashedPassword });
    return result;
}

export async function registerOrganisationService(data){
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await insertOrganisation({ ...data, password: hashedPassword });
    return result;
}
