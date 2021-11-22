const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
