const express = require("express");
const router = express.Router();

router.use(require("./flow/001/01SARBALANCE01TABLE"));
router.use(require("./flow/001/02SARBALANCE01SINGLESHOT"));
router.use(require("./flow/001/03SARBALANCE01CWT"));



// router.use(require("./flow/003/flow003"));
// router.use(require("./flow/004/flow004"));
// router.use(require("./flow/005/flow005"));
router.use(require("./flow/login/login"));
router.use(require("./flow/testflow/testflow"));

module.exports = router;

