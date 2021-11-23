const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.body',req.body);
    // const recipeId = req.body.recipeId;
  // GET route code here
  const {id} = req.query;
  console.log(id);

  const getReviewsQuery = `
    SELECT COUNT("rating") FROM "ratings"
    WHERE ratings.recipes_id = $1;`;

pool
    .query(getReviewsQuery, [id])
    .then((response) => {
        console.log('response.rows', response.rows[0].count);
        res.send(response.rows[0].count);
    })
    .catch((error) => {
        console.log('There was an error with the /api/reviews GET:', error);
        res.sendStatus(500);
    })
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    console.log('This is the recipe id', id);

    const getAllReviewsQuery = `
    SELECT 
    ratings.rating,
    ratings.review,
    username FROM "ratings"
    LEFT JOIN "user" ON "ratings".user_id = "user".id
    WHERE ratings.recipes_id = $1;`;                            

    pool
    .query(getAllReviewsQuery, [id])
    .then((response) => {
        res.send(response.rows); //response.rows will contain all reviews and ratings from the ratings table
    })
    .catch((error) => {
        console.log(`There was an error with the /api/reviews/:id GET`, error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
