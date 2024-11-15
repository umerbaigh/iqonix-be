"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx) {
      const { id, ...rest } = ctx.request.body;

      // Check if an entry with the same `id` already exists
      const existingCategory = await strapi.db
        .query("api::category.category")
        .findOne({
          where: { id },
        });

      if (existingCategory) {
        // Return an error response if `id` already exists
        return ctx.badRequest("ID already exists");
      }

      // Proceed to create the new entry with `publishedAt` set to the current date to publish it
      const newCategory = await strapi.db
        .query("api::category.category")
        .create({
          data: {
            id,
            ...rest,
            publishedAt: new Date(), // Automatically publish the entry
          },
        });

      return newCategory;
    },

    // You can override or extend core actions here as well, for example:
    // async find(ctx) {
    //   // Call the core action
    //   const { data, meta } = await super.find(ctx);
    //
    //   // Custom logic before or after the core action
    //   return { data, meta };
    // }
  })
);
