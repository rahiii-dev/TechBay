const multer = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'src/uploads/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});

const categoryStorage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'src/uploads/category/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});

const productStorage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'src/uploads/product/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({ storage })

module.exports = {storage, categoryStorage, productStorage};