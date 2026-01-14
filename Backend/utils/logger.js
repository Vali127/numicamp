import { LogFileManager} from "./logFileManager.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function createLogger() {

    const MANAGER = LogFileManager()
    MANAGER.init()

    function logIn(admin) {
        const action = "has logged in";
        MANAGER.writeLog(admin, action);
    }

    function logOut(admin) {
        const action = "has logged out";
        MANAGER.writeLog(admin, action);
    }

    function removeUser(admin, user) {
        const action = "has removed " + user;
        MANAGER.writeLog(admin, action);
    }

    function blockUser(admin, user) {
        const action = "has blocked " + user;
        MANAGER.writeLog(admin, action);
    }

    function unBlockUser(admin, user) {
        const action = "has unblocked " + user;
        MANAGER.writeLog(admin, action);
    }

    function addResource(admin, resource) {
        const action = "has added resource " + resource ;
        MANAGER.writeLog(admin, action);
    }

    function removeResource(admin, resource) {
        const action = "has removed resource " + resource;
        MANAGER.writeLog(admin, action);
    }

    function addSchool(admin, school) {
        const action = "has added school " + school;
        MANAGER.writeLog(admin, action);
    }

    function removeSchool(admin, school) {
        const action = "has removed school " + school;
        MANAGER.writeLog(admin, action);
    }

    return {
        logIn,
        logOut,
        removeUser,
        blockUser,
        unBlockUser,
        addResource,
        removeResource,
        addSchool,
        removeSchool,
    };
}
