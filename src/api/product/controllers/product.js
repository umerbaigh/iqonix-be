"use strict";

/**
 * product controller
 */
const Fuse = require("fuse.js");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customFind(ctx) {
    try {
      const { search_word } = ctx.query;
      // Fetch all records from the 'product' table
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          fields: [
            "product_name",
            "slug",
            "regular_price",
            "sale_price",
            "short_description",
          ],
        }
      );

      // Search using Fuse.js if 'name' query is provided
      if (search_word) {
        const fuse = new Fuse(products, {
          keys: ["product_name", "short_description"], // Specify which field to search in
          threshold: 0.5, // Adjust this for sensitivity
        });

        const searchResults = fuse.search(search_word);
        const filteredEntries = searchResults.map((result) => result.item);

        return filteredEntries;
      }

      return products;
    } catch (error) {
      console.log(error);
      ctx.throw(500, "Failed to fetch products");
    }
  },
}));
