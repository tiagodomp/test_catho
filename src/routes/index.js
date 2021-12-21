
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Test Catho by Tiago Pereira",
        description: "CRUD Candidate",
        version: "0.0.1"
    });
});

module.exports = router;
