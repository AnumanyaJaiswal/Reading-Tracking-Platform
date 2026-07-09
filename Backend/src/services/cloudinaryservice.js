const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = (fileBuffer, folder = "prophecy") => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

module.exports = {
    uploadImage,
};