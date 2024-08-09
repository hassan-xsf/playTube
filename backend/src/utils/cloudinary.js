import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFile = async(path , filetype = "auto") => {
    if(!path) return null;
    try {
        const uploadResult = await cloudinary.uploader
        .upload(path, 
            {
                resource_type: filetype
            }
        )
        fs.unlinkSync(path)
        return uploadResult;
    }
    catch(error) {
        fs.unlinkSync(path) // removing the file.
        return null;
    }
}
const deleteFile = async(fileURL, filetype = "auto") => {
    if(!fileURL) return null;
    try {
        fileURL = fileURL.replace(`https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}}/image/upload/v1722578996/` , "");
        const publicId = fileURL.substring(0, fileURL.lastIndexOf('.'));
        await cloudinary
        .destroy(publicId, 
            {
                resource_type: filetype
            }
        )
        return true;
    }
    catch(error) {
        console.log(error.message)
        return null;
    } 
}

export {uploadFile,deleteFile}