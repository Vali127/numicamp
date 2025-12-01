import {profileInfoService, profileUpdateService} from "../services/profileService.js"

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


export async function profileUpdateController(req, res){
    try {
        const result = await profileUpdateService(req,res)
        if (result === true )
            res.status(200).json({message : "profile data updated", ok : true, authorized : true })
        if (result === false )
            res.status(403).json({message : "action non autorisé", ok : false, authorized : false })
    }
    catch(error) {
        console.log('ERREUR : ', error)
        res.status(500).json({ok: false, message : error})
    }
} 