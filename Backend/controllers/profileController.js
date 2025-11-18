import {profileInfoService} from "../services/profileService.js"

export async function getProfileController(req, res) {
    try {  
        
        const result = await profileInfoService(req)

        if (result.ok)
            res.status(200).json({data : result})
        else
            res.status(500).json({data : {...result , ok : false}})

    }
    catch(error) {
        console.log('ERREUR : ', error)
        res.status(500).json({ok: false, message : error})
    }
}