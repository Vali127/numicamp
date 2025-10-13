import {insertPerson} from "../models/registerModel.js";
import bcrypt from "bcrypt";

export async function registerService(data){

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await insertPerson({ ...data, password: hashedPassword });
    return result;
}

