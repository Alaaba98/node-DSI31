//GET BACK ALL promos
router.get('/', async (req, res) => {
    try {
        const Promo = await Promo.find();

        res.json(Promo);

    }
    catch (err) {
        res.json({ message: err });
    }
});


router.post('/promo', async (req, res) => {
    data = req.body;
    let promo = new Promo({
        codePromo: data.codePromo,
        reduction: data.reduction,
        dateExpiration: data.dateExpiration,
    });
    try {
        const savedPromo = await promo.save()
        res.json(savedPromo);
    }
    catch (err) {
        res.json({ message: err });
    }

});

//SPECIFIC User
router.get('/findpromo/:_id', async (req, res) => {


    console.log(req.params._id);
    try {
        const promo = await Promo.findById(req.params._id)
        res.json(user);
    }
    catch (err) {
        console.log("erreur");
        res.json({ message: err });
    }
});

// repondre au message du client ou le visiteur
router.patch('/modifierpromo/:id', async (req, res) => {
    var item = {
        reduction: req.body.reduction,
        dateExpiration: req.body.dateExpiration
    };
    try {
        const updatedPromo = await Promo.updateOne({ _id: req.params.id }, { $set: item })

        res.json(updatedPromo);
    }
    catch (err) {
        res.json({ message: err });
    }

});


// Supprimer messsage d'un client ou d'un visiteur
router.delete('/deletepromo/:id', async (req, res) => {
 try {
        const removedPromo = await Promo.remove({ _id: req.params.id });
        res.json(removedPromo);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

module.exports = router;