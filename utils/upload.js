const multer = require('multer')
const storage = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname) }  //file k ander object aata. file frontend se ara h
})

exports.upload = multer({ storage }).single('image') //array se multiple images upload ho sakti h