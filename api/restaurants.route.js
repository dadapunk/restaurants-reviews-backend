import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

/**
 * GET /api/restaurants - Retrieves a list of restaurants based on the provided query parameters.
 */
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

/**
 * GET /api/restaurants/id/:id - Retrieves a restaurant by its ID.
 */
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);

/**
 * GET /api/restaurants/cuisines - Retrieves a list of available restaurant cuisines.
 */
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

/**
 * POST /api/restaurants/review - Creates a new review for a restaurant.
 * PUT /api/restaurants/review - Updates an existing review for a restaurant.
 * DELETE /api/restaurants/review - Deletes a review for a restaurant.
 */
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
