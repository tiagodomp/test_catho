const express = require('express');
const router = express.Router();
const candidate = require('../controllers/candidateController');
const { check } = require('express-validator');

const validatorPost = [
    check('*.id')
        .notEmpty()
        .isString(),
    check('*.name')
        .notEmpty()
        .isString(),
    check('*.skills')
        .notEmpty()
        .isArray( {options: [1, 100]} )
]

router.get('/', candidate.get);
router.get('/skills/:skills', candidate.getBySkills);
router.get('/id/:id', candidate.getById);
router.post('/', validatorPost, candidate.post);


module.exports = router;