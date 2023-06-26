import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  /**
   * Adds a new review for a restaurant.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the API response is sent.
   */
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      await ReviewsDAO.addReview(restaurantId, userInfo, review, date);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  /**
   * Updates an existing review for a restaurant.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the API response is sent.
   */
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, text, date);

      const { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
        return;
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("Unable to update review - user may not be the original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  /**
   * Deletes a review for a restaurant.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {function} next - The next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the API response is sent.
   */
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;

      await ReviewsDAO.deleteReview(reviewId, userId);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
