const Tender = require("../models/Tender")
const Bid = require("../models/Bid")


exports.getHome = async (req, res) => {
    const allTenders = await Tender.find({ managerId: req.user._id });
    const allBids = await Bid.find();
    const approvedBids = await Bid.find({ status: "PASS" })
    const denieddBids = await Bid.find({ status: "FAIL" })
    const pendingdBids = await Bid.find({ status: "PENDING" })
    const tendersLength = allTenders.length;
    const bidsLength = allBids.length;
    const approvedBidsLength = approvedBids.length
    const deniedBidsLength = denieddBids.length
    const pendingdBidsLength = pendingdBids.length
    res.render("dashboard", {
        // //user accessed after login
        name: req.user.username,
        tendersNumber: tendersLength,
        bidsNumber: bidsLength,
        approvedBidsNumber: approvedBidsLength,
        deniedBidsNumber: deniedBidsLength,
        pendingdBidsNumber: pendingdBidsLength
    });
}