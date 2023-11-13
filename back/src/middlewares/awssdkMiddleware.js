import AWS from 'aws-sdk'
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');


AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});

const s3 = new AWS.S3();

const bucketName = 'elice-ajaj2'
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        key: (req, file, callback) => {
            console.log('file', file);
            const uploadDirectory = req.query.directory ?? ''
            
            const extension = path.extname(file.originalname)
            if (!allowedExtensions.includes(extension)){
                return callback(new Error('파일의 확장자가 잘못되었습니다.'))
            }
            console.log('extension', extension);
            callback(null, `${uploadDirectory}/${Date.now()}${extension}`)
        },
        acl: 'public-read-write'
    }),
})

const imageDelete = async (imageUrl) => {
    const imageKey = imageUrl.split('.com/')[1];
    s3.deleteObject({
        Bucket: bucketName,
        Key: imageKey,
      }, (err) => {
           if (err) {
            return callback(new Error('파일이 삭제되지 않았습니다.'))
           } else console.log('삭제 완료');
      });
}

export { imageUploader, imageDelete };
