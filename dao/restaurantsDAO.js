import { ObjectId } from "mongodb";

let restaurants;

/**
 * Data Access Object for interacting with the restaurants collection.
 */
export default class RestaurantsDAO {
  /**
   * Injects the database connection into the DAO.
   *
   * @param {object} conn - The database connection.
   * @returns {Promise<void>} - A Promise that resolves when the connection is injected.
   */
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants");
    } catch (e) {
      console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`);
    }
  }

  /**
   * Retrieves a list of restaurants based on the provided filters, page, and restaurants per page.
   *
   * @param {object} options - The options for filtering and pagination.
   * @param {object} options.filters - The filters to apply for the query.
   * @param {number} options.page - The page number.
   * @param {number} options.restaurantsPerPage - The number of restaurants per page.
   * @returns {Promise<object>} - A Promise that resolves to an object containing the restaurants list and total number of restaurants.
   */
  static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  /**
   * Retrieves a restaurant by its ID, including its reviews.
   *
   * @param {string} id - The ID of the restaurant.
   * @returns {Promise<object>} - A Promise that resolves to the restaurant object.
   */
  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next();


    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}


