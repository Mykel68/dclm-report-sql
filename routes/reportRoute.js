const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/", reportController.getReports);

router.get("/count", reportController.getReportCount);

router.get("/:id", reportController.getReport);

router.post("/", reportController.submitReport);

router.put("/:id", reportController.editReport);

router.delete("/:id", reportController.deleteReport);


module.exports = router;
