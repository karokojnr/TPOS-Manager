const Tender = require("../models/Tender")

exports.getAddTender = async (req, res) => {

    const tenders = await Tender.find();
    const tendersLength = tenders.length;
    res.render("add-tender", {
        editing: false,
        name: req.user.username,
        tendersNumber: tendersLength,
    });
}
exports.postAddTender = (req, res) => {

    const { tenderNumber, title, description, closingTime } = req.body;
    let errors = [];

    if (!tenderNumber || !title || !description || !closingTime) {
        errors.push({ msg: 'Please enter all fields' });
    }


    if (errors.length > 0) {
        res.render('add-tender', {
            editing: false,
            errors,
            tenderNumber,
            title,
            description,
            closingTime
        });
    } else {
        Tender.findOne({ tenderNumber: tenderNumber }).then(existingTender => {
            if (existingTender) {
                errors.push({ msg: 'Tender already exists' });
                res.render('add-tender', {
                    editing: false,
                    errors,
                    tenderNumber,
                    title,
                    description,
                    closingTime
                });
            } else {
                const newTender = new Tender({
                    //destructuring
                    tenderNumber,
                    title,
                    description,
                    closingTime
                });

                newTender
                    .save()
                    .then(tender => {
                        req.flash(
                            'success_msg',
                            'Tender added successfully...'
                        );
                        res.redirect('/tenders');
                    })
                    .catch(err => console.log(err));
            }
        }).catch(err => console.log(err))
    }
}
exports.getTenders = async (req, res) => {
    const tenders = await Tender.find();
    const tendersLength = tenders.length;
    Tender.find({}).then(tenders => {
        res.render("tenders", {
            name: req.user.username,
            tenders: tenders,
            tendersLength: tenders.length,
            tendersNumber: tendersLength,
        })

    }).catch(err => {
        console.log(err);
    });
}
exports.getEditTender = async (req, res, next) => {
    const allTenders = await Tender.find();
    const tendersLength = allTenders.length;
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const tenderId = req.params.tenderId;
    Tender.findById(tenderId)
        .then(tender => {
            if (!tender) {
                return res.redirect("/");
            }
            res.render("add-tender", {
                pageTitle: "Edit Tender",
                path: "add-tender",
                editing: editMode,
                tender: tender,
                hasError: false,
                errorMessage: null,
                validationErrors: [],
                name: req.user.username,
                tendersNumber: tendersLength,
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.postEditTender = (req, res, next) => {
    const { tenderId, tenderNumber, title, description, closingTime } = req.body;

    Tender.findById(tenderId)
        .then(tender => {
            tender.tenderNumber = tenderNumber;
            tender.title = title;
            tender.description = description;
            tender.closingTime = closingTime;
            return tender.save().then(result => {
                console.log("UPDATED Tender!");
                res.redirect("/tenders");
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}
exports.deleteTender = (req, res, next) => {
    const tenderId = req.params.tenderId;
    Tender.findById(tenderId)
        .then(tender => {
            if (!tender) {
                return next(new Error("Tender not found."));
            }
            return Tender.deleteOne({ _id: tenderId });
        })
        .then(() => {
            console.log("DESTROYED TENDER");
            res.redirect("/tenders");
        })
        .catch(err => {
            res.status(500).json({ message: "Deleting certificate failed." });
        });
};
