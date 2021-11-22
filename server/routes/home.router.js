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
    let queryText = `SELECT recipes.id,
                    recipes.name,
                    recipes.image,
                    recipes.time,
                    recipes.overview,
                    recipes.ingredients, 
                    recipes.instructions, 
                    AVG(COALESCE(ratings.rating, 0))::NUMERIC(10,1) AS recipe_rating FROM "recipes"
                LEFT JOIN "ratings" ON ratings.recipes_id = recipes.id
                GROUP BY recipes.id;`;

    pool
    .query(queryText)
    .then((response) => {
        console.log('This is the home get route',response);
        res.send(response.rows);
    })
    .catch((error) => {
        console.log(`There was an error with the /api/home GET:`, error);
        res.sendStatus(500);
    });
});//end router.get 

module.exports = router;
