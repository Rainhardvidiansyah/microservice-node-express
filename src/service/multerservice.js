const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));;
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + path.extname(file.originalname));
    }
});


function filter(req, file, cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error('Only.jpg and.png files are allowed!'));
    }
}

const upload = multer({ storage: storage, fileFilter: filter });

module.exports = upload;