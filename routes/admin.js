const express = require("express");
const app = express();

const homeController = require("../controllers/homeController");
const adminController = require("../controllers/adminController")
const tenderController = require("../controllers/tenderController")
const bidController = require("../controllers/bidsController")
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


app.get("/", ensureAuthenticated, homeController.getHome);
app.get("/add-tender", ensureAuthenticated, tenderController.getAddTender)
app.get("/get-login", forwardAuthenticated, adminController.getLogin)
app.get("/get-register", forwardAuthenticated, adminController.getRegister)
app.get("/logout", adminController.getLogout);
app.get("/tenders", ensureAuthenticated, tenderController.getTenders)
app.get("/bids", ensureAuthenticated, bidController.getBids)
app.get("/bid/:bidId", ensureAuthenticated, bidController.getBid);

app.get("/get-edit-tender/:tenderId", ensureAuthenticated, tenderController.getEditTender);
app.post("/post-add-tender", ensureAuthenticated, tenderController.postAddTender)
app.post("/post-edit-tender", ensureAuthenticated, tenderController.postEditTender);
app.post("/login", adminController.postLogin)
app.post("/register", adminController.registerAdmin)
app.delete("/delete-tender/:tenderId", ensureAuthenticated, tenderController.deleteTender);
app.put("/accept-bid/:bidId", ensureAuthenticated, bidController.acceptBid);
app.put("/deny-bid/:bidId", ensureAuthenticated, bidController.denyBid);

module.exports = app;
