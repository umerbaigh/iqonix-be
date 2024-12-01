// @ts-nocheck
"use strict";

/**
 * product controller
 */
const Fuse = require("fuse.js");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customFind(ctx) {
    try {
      const {
        search_word,
        page = 1,
        pageSize = 35,
        all = false,
        color,
        width,
        height,
        depth,
        delivery,
        size,
        material,
        min_sale_price,
        max_sale_price,
        sort,
      } = ctx.query; // Default to page 1 and pageSize 35

      const productFilters = {};

      if (color) productFilters.color = { $eq: color.split("_").join(" ") };
      if (width) productFilters.width = { $eq: width.split("_").join(" ") };
      if (height) productFilters.height = { $eq: height.split("_").join(" ") };
      if (depth) productFilters.depth = { $eq: depth.split("_").join(" ") };
      if (delivery)
        productFilters.delivery = { $eq: delivery.split("_").join(" ") };
      if (size) productFilters.size = { $eq: size.split("_").join(" ") };
      if (material)
        productFilters.material = { $eq: material.split("_").join(" ") };
      if (min_sale_price)
        productFilters.sale_price = { $gte: parseFloat(min_sale_price) };
      if (max_sale_price)
        productFilters.sale_price = { $lte: parseFloat(max_sale_price) };
      // Fetch all records from the 'product' table
      const products = all
        ? await strapi.entityService.findMany("api::product.product", {
            filters: productFilters,
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
            ],
          })
        : await strapi.entityService.findMany("api::product.product", {
            filters: productFilters,
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
      if (sort) {
        if (sort === "createdAt") {
          filteredEntries.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        } else if (sort === "-createdAt") {
          filteredEntries.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (sort === "sale_price") {
          filteredEntries.sort((a, b) => a.sale_price - b.sale_price);
        } else if (sort === "-sale_price") {
          filteredEntries.sort((a, b) => b.sale_price - a.sale_price);
        }
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
