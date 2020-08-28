const express = require("express");
const router  = express.Router();

// import user controller.
const { JobController }= require("../controllers/index");
const { authenticateToken } = require("../middlewares/authenticate");

router.post("/jobs", authenticateToken, JobController.AddJob);
router.get("/jobs" ,JobController.GetJobs);
router.get("/jobs/:id",JobController.GetJobWithId);

module.exports = router;