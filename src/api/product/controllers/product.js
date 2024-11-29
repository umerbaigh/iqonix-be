"use strict";

/**
 * product controller
 */
const Fuse = require("fuse.js");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customFind(ctx) {
    try {
      const { search_word, page = 1, pageSize = 35, all = false } = ctx.query; // Default to page 1 and pageSize 35

      // Fetch all records from the 'product' table
      const products = all
        ? await strapi.entityService.findMany("api::product.product", {
            fields: [
              "product_name",
              "short_description",
              "sale_price",
              "regular_price",
              "color",
              "delivery",
              "width",
              "height",
              "depth",
            ], // Specify only the fields to fetch
          })
        : await strapi.entityService.findMany("api::product.product", {
            fields: [
              "product_name",
              "short_description",
              "sale_price",
              "regular_price",
              "product_image1",
              "product_url",
              "slug",
            ], // Specify only the fields to fetch
            populate: {
              shops: {
                fields: ["name", "slug"], // Specify only the fields to fetch from the 'shops' table
              },
              categories: {
                fields: ["name", "slug"], // Specify only the fields to fetch from the 'categories' table
              },
            },
          });

      let filteredEntries = products;

      // Perform Fuse.js search if 'search_word' query is provided
      if (search_word) {
        const fuse = new Fuse(products, {
          keys: ["product_name", "short_description"], // Specify which field to search in
          threshold: 0.5, // Adjust this for sensitivity
        });

        const searchResults = fuse.search(search_word);
        filteredEntries = searchResults.map((result) => result.item);
      }

      // Implement pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + parseInt(pageSize, 10);
      const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

      // Return paginated results with metadata
      return {
        data: all ? filteredEntries : paginatedEntries,
        meta: {
          total: filteredEntries.length,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          pageCount: Math.ceil(filteredEntries.length / pageSize),
        },
      };
    } catch (error) {
      console.error("Error in customFind:", error);
      ctx.throw(500, "Failed to fetch products");
    }
  },
}));
