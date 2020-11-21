const express = require("express");
const app = express();

const homeController = require("../controllers/homeController");
const certificateController = require("../controllers/certificateController")
const adminController = require("../controllers/adminController")
const tenderController = require("../controllers/tenderController")
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


app.get("/", ensureAuthenticated, homeController.getHome);
app.get("/add-tender", ensureAuthenticated, tenderController.getAddTender)
app.get("/add-certificate", ensureAuthenticated, certificateController.getAddCertificate)
app.get("/get-login", forwardAuthenticated, adminController.getLogin)
app.get("/get-register", forwardAuthenticated, adminController.getRegister)
app.get("/logout", adminController.getLogout);
app.get("/certificates", ensureAuthenticated, certificateController.getCertificates)
app.get("/tenders", ensureAuthenticated, tenderController.getTenders)
app.get("/get-edit-certificate/:certificateId", ensureAuthenticated, certificateController.getEditCertificate);
app.get("/get-edit-tender/:tenderId", ensureAuthenticated, tenderController.getEditTender);

app.post("/post-add-certificate", ensureAuthenticated, certificateController.postAddCertiificate)
app.post("/post-add-tender", ensureAuthenticated, tenderController.postAddTender)
app.post("/post-edit-certificate", ensureAuthenticated, certificateController.postEditCertificate);
app.post("/post-edit-tender", ensureAuthenticated, tenderController.postEditTender);

app.post("/login", adminController.postLogin)
app.post("/register", adminController.registerAdmin)
app.delete("/delete-certificate/:certificateId", ensureAuthenticated, certificateController.deleteCertificate);
app.delete("/delete-tender/:tenderId", ensureAuthenticated, tenderController.deleteTender);

module.exports = app;
