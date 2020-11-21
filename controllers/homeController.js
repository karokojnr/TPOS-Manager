const Certificate = require("../models/Certificate")
const Tender = require("../models/Tender")

exports.getHome = async (req, res) => {
    const allCertificates = await Certificate.find();
    const allTenders = await Tender.find();
    const tendersLength = allTenders.length;
    const certificatesLength = allCertificates.length;
    res.render("dashboard", {
        // //user accessed after login
        name: req.user.username,
        certificatesNumber: certificatesLength,
        tendersNumber: tendersLength
    });
}