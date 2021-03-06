const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)

  res.send(req.user);
});

//PROFILE : fetches user recipes based on user ID
router.get("/recipes", rejectUnauthenticated, (req, res) => {
  let queryText = `
  SELECT recipes.id,
  recipes.name,
  recipes.image,
  recipes.time,
  recipes.overview,
  recipes.ingredients, 
  recipes.instructions,
  COUNT("rating") as review_count,
  AVG(COALESCE(ratings.rating, 0))::NUMERIC(10,1) AS recipe_rating FROM "recipes"
LEFT JOIN "ratings" ON ratings.recipes_id = recipes.id
WHERE "recipes"."user_id" = $1
GROUP BY "recipes"."id", "recipes"."name", "recipes"."time";`;
  pool
    .query(queryText, [req.user.id])
    .then((response) => {
      res.send(response.rows); // response.rows contains all the recipes and their properties
    })
    .catch((error) => {
      console.log(`There was an error with the /api/user GET:`, error);
      res.sendStatus(500); // there was an error
    });
});

router.get("/favorites", rejectUnauthenticated, (req, res) => {
  let queryText = `
      SELECT recipes.id,
      recipes.name,
      recipes.image,
      recipes.time,
      recipes.overview,
      recipes.ingredients, 
      recipes.instructions, 
      AVG(COALESCE(ratings.rating, 0))::NUMERIC(10,1) AS recipe_rating FROM "favorites"
      JOIN "recipes" ON "recipes"."id" = "favorites"."recipe_id"
      JOIN "ratings" ON "ratings"."recipes_id" = "recipes"."id"
      WHERE "favorites"."user_id" = $1
      GROUP BY "recipes"."id";`;
  pool
    .query(queryText, [req.user.id])
    .then((response) => {
      console.log("response in get fave router is", response);
      res.send(response.rows); // response.rows contains all the recipes and their properties
    })
    .catch((error) => {
      console.log(`There was an error with the /api/user GET:`, error);
      res.sendStatus(500); // there was an error
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

router.post("/recipe", (req, res) => {
  console.log("Req.body", req.body);
  console.log("req.user", req.user);

  const insertRecipeQuery = `
  INSERT INTO "recipes" ("image", "name", "time", "overview", "ingredients", "instructions", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  //inserted values from the form
  let values = [
    req.body.image,
    req.body.name,
    req.body.time,
    req.body.overview,
    req.body.ingredients,
    req.body.instructions,
    req.user.id,
  ];

  pool
    .query(insertRecipeQuery, values)
    .then((result) => {
      console.log("Results", result.rows);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in query", error);
      res.sendStatus(500);
    });
});

router.post("/review/:recipeId", (req, res) => {
  console.log("Req.body", req.body);
  console.log("req.user", req.user);
  const recipeId = req.params.recipeId;
  console.log("This is the recipeId in router", recipeId);

  const insertRecipeQuery = `
  INSERT INTO "ratings" ("user_id", "recipes_id", "rating", "review")
  VALUES ($1, $2, $3, $4);`;

  //inserted values from the form
  let values = [
    req.user.id,
    recipeId,
    req.body.newReview.rating,
    req.body.newReview.review,
  ];
  console.log(values);
  pool
    .query(insertRecipeQuery, values)
    .then((result) => {
      console.log("Results", result.rows);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in query", error);
      res.sendStatus(500);
    });
});

router.post("/favorites/:recipeId", (req, res) => {
  console.log("Req.body", req.body);
  console.log("req.user", req.user);
  const recipeId = req.params.recipeId;
  console.log("This is the recipeId in router", recipeId);

  const insertFavoriteQuery = `
  INSERT INTO "favorites" ("user_id", "recipe_id")
  VALUES ($1, $2);`;

  //inserted values from the form
  let values = [req.user.id, recipeId];
  console.log(values);
  pool
    .query(insertFavoriteQuery, values)
    .then((result) => {
      console.log("Results", result.rows);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in query", error);
      res.sendStatus(500);
    });
});

router.put("/edit/:recipeId", (req, res) => {
  console.log("Req.body", req.body);
  console.log("req.user", req.user);
  const recipeId = req.params.recipeId;
  const updateRecipeQuery = `
  UPDATE "recipes" 
  SET "image"=$1, "name"=$2, "time"=$3, "overview"=$4, "ingredients"=$5, "instructions"=$6, "user_id"=$7
  WHERE "id" = $8;`;

  //inserted values from the form
  let values = [
    req.body.image,
    req.body.name,
    req.body.time,
    req.body.overview,
    req.body.ingredients,
    req.body.instructions,
    req.user.id,
    recipeId,
  ];

  pool
    .query(updateRecipeQuery, values)
    .then((result) => {
      console.log("Results", result.rows);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in query", error);
      res.sendStatus(500);
    });
});

router.delete("/deletefavorite:id", (req, res) => {
  console.log("user is", req.user.id);

  console.log("comparing to recipe id", req.params.id);
  console.log(req.params);
  let id = req.params.id; //This our way of identifying the variable 'id' sent along with the route.
  let queryText = `
  DELETE FROM "favorites"
  WHERE recipe_id = $1 AND
  user_id = $2;`;
  //queryText is sql text that we want to transfer over to pool.
  let values = [id, req.user.id];

  //Package the queryText and the id to have pool interact with the database for us
  //and execute the intended goal which in this case is to delete the data at id
  pool
    .query(queryText, values)
    .then((results) => {
      console.log("results is", results);
      if (results.rowCount === 0) {
        //rowCount is a number that represents how many rows were found by query
        //We created a conditional that checks to see if rowCount is equal to 0 if
        //it is we send back a forbidden (403)
        res.sendStatus(403);
      } else {
        res.sendStatus(204); //if completed then we get a '204' which is thumbs up
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500); //if failed we get a '500'
    });
  // endpoint functionality
});
router.delete("/:id", (req, res) => {
  console.log("user is", req.user.id);

  console.log("comparing to recipes.id", req.params.id);
  let id = req.params.id; //This our way of identifying the variable 'id' sent along with the route.
  let queryText = `
  DELETE FROM "recipes"
  WHERE id = $1 AND
  user_id = $2;`;
  //queryText is sql text that we want to transfer over to pool.
  let values = [33, req.user.id];

  //Package the queryText and the id to have pool interact with the database for us
  //and execute the intended goal which in this case is to delete the data at id
  pool
    .query(queryText, values)
    .then((results) => {
      console.log("results is", results);
      if (results.rowCount === 0) {
        res.sendStatus(403);
      } else {
        res.sendStatus(204); //if completed then we get a '204' which is thumbs up
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500); //if failed we get a '500'
    });
  // endpoint functionality
});
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
