const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const multer = require('multer');
const multipart = require('connect-multiparty');
const path = require('path');
var fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log("file");
        var fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(new Error('only .jpeg or .png files accepted'), true);

};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});





//GET BACK ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);

    }
    catch (err) {
        res.json({ message: err });
    }

});


router.post('/add', upload.single('image'), async (req, res) => {

    const post = new Post({
        reference: req.body.reference,
        libelle: req.body.libelle,
        description: req.body.description,
        prix: req.body.prix,
        //image: req.body.image,
        image: req.file.path,
        qte: req.body.qte


    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch (err) {
        res.json({ message: err });
    }

});

//SPECIFIC POST
router.get('/find/:reference', async (req, res) => {

    try {
        const post = await Post.findById(req.params.reference)

        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//DELETE POST 
router.delete('/delete/:reference', async (req, res) => {

    try {
        const removedPost = await Post.remove({ _id: req.params.reference });
        res.json(removedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

//UPDATE A POST 
router.patch('/update/:reference', async (req, res) => {
    var item = {
        libelle: req.body.libelle,
        description: req.body.description,
        prix: req.body.prix,
        image: req.body.image,
        qte: req.body.qte
    };
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.reference }, { $set: item })

        res.json(updatedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
}
)

module.exports = router;