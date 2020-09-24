// const { Image } = require('../models/image.model')
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         // rejects storing a file
//         cb(null, false);
//     }
// }
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

// module.exports = {
//     uploadOne: (req, res, next) => {
//         console.log(req.body);
//         const newImage = new Image({
//             imageName: req.body.imageName,
//             imageData: req.file.path
//         })
//         newImage.save()
//         .then((result) => {
//             console.log(result);
//             res.status(200).json({
//                 success: true,
//                 document: result
//             });
//         })
//         .catch((err) => next(err));
//     }
// }
// ImageRouter.route("/uploadmulter")
//     .post(upload.single('imageData'), (req, res, next) => {
//         console.log(req.body);
//         const newImage = new Image({
//             imageName: req.body.imageName,
//             imageData: req.file.path
//         });

//         newImage.save()
//             .then((result) => {
//                 console.log(result);
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
//     });


// module.exports = {
//     uploadSingle: (req, res, nest) => {
//         Image.create(req.body)
//         const newImage = new Image({
//             imageData: req.file.path
//         })
//         newImage.save()
//         .then(res => {
//             console.log(res)
//             res.status(200).json({sucess: true, document: res})
//         })
//         .catch(err => next(err))

//     }
// }