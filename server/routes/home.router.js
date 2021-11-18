const express = require('express');
const { resetWarningCache } = require('prop-types');
const { useReducer } = require('react');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in /api/home');
    let queryText = `SELECT * FROM "recipes"
    LEFT JOIN "ratings" ON ratings.recipes_id = recipes.id;`;

    pool
    .query(queryText)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((error) => {
        console.log(`There was an error with the /api/home GET:`, error);
        res.sendStatus(500);
    });
});//end router.get 

router.get('/ratings', rejectUnauthenticated, (req, res) => {
    console.log('in /api/home');
    let queryText = `SELECT * FROM "ratings";`;

    pool
    .query(queryText)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((error) => {
        console.log(`There was an error with the /api/home/ratings GET:`, error);
        res.sendStatus(500);
    });
});//end router.get 

module.exports = router;
