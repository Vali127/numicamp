import {profileInfoService, profileUpdateService} from "../services/profileService.js"

export async function getProfileController(req, res) {
    try {
        const result = await profileInfoService(req)
        res.status(200).json({data : result.data || null, ok : result.ok})
    }
    catch(error) {
        console.log('ERREUR : ', error)
        res.status(500).json({ok: false, message : error})
    }
}


export async function profileUpdateController(req, res){
    try {
        const result = await profileUpdateService(req,res)
        res.status(200).json({message : (result) ? "profile data updated" : "an error occurred", ok : result, authorized : true })
    }
    catch(error) {
        console.log('ERREUR : ', error)
        res.status(500).json({ok: false, message : error})
    }
} 