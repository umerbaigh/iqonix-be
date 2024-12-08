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
        sales = false,
        delivery,
        furniture_color,
        furniture_material,
        breite,
        hoehe,
        tiefe,
        damen_normalgr,
        damen_jeansgr,
        damen_kurzgr,
        damen_langgr,
        cup_gr,
        brustumfang,
        miederhosengr,
        strumpfhosengr,
        sockengr,
        herren_normalgr,
        herren_jeansgr,
        kragenweite,
        herren_untersetztgr,
        herren_schlankgr,
        waschegr,
        herren_bauchgr,
        baby_normalgr,
        kinder_normalg,
        kinder_sockengr,
        schuhgr,
        kinder_schuhgr,
        fashion_material,
        fashion_color,
        shoes_material,
        shoes_color,
        min_sale_price,
        max_sale_price,
        sort,
      } = ctx.query; // Default to page 1 and pageSize 35

      const productFilters = {};

      if (furniture_color)
        productFilters.furniture_color = {
          $eq: furniture_color.split("_").join(" "),
        };
      if (furniture_material)
        productFilters.furniture_material = {
          $eq: furniture_material.split("_").join(" "),
        };
      if (breite) productFilters.breite = { $eq: breite.split("_").join(" ") };
      if (hoehe) productFilters.hoehe = { $eq: hoehe.split("_").join(" ") };
      if (tiefe) productFilters.tiefe = { $eq: tiefe.split("_").join(" ") };
      if (delivery)
        productFilters.delivery = { $eq: delivery.split("_").join(" ") };
      if (damen_normalgr)
        productFilters.damen_normalgr = {
          $eq: damen_normalgr.split("_").join(" "),
        };
      if (damen_jeansgr)
        productFilters.damen_jeansgr = {
          $eq: damen_jeansgr.split("_").join(" "),
        };
      if (damen_kurzgr)
        productFilters.damen_kurzgr = {
          $eq: damen_kurzgr.split("_").join(" "),
        };
      if (damen_langgr)
        productFilters.damen_langgr = {
          $eq: damen_langgr.split("_").join(" "),
        };
      if (cup_gr) productFilters.cup_gr = { $eq: cup_gr.split("_").join(" ") };
      if (brustumfang)
        productFilters.brustumfang = { $eq: brustumfang.split("_").join(" ") };
      if (miederhosengr)
        productFilters.miederhosengr = {
          $eq: miederhosengr.split("_").join(" "),
        };
      if (strumpfhosengr)
        productFilters.strumpfhosengr = {
          $eq: strumpfhosengr.split("_").join(" "),
        };
      if (sockengr)
        productFilters.sockengr = { $eq: sockengr.split("_").join(" ") };
      if (herren_normalgr)
        productFilters.herren_normalgr = {
          $eq: herren_normalgr.split("_").join(" "),
        };
      if (herren_jeansgr)
        productFilters.herren_jeansgr = {
          $eq: herren_jeansgr.split("_").join(" "),
        };
      if (kragenweite)
        productFilters.kragenweite = { $eq: kragenweite.split("_").join(" ") };
      if (herren_untersetztgr)
        productFilters.herren_untersetztgr = {
          $eq: herren_untersetztgr.split("_").join(" "),
        };
      if (herren_schlankgr)
        productFilters.herren_schlankgr = {
          $eq: herren_schlankgr.split("_").join(" "),
        };
      if (waschegr)
        productFilters.waschegr = { $eq: waschegr.split("_").join(" ") };
      if (herren_bauchgr)
        productFilters.herren_bauchgr = {
          $eq: herren_bauchgr.split("_").join(" "),
        };
      if (baby_normalgr)
        productFilters.baby_normalgr = {
          $eq: baby_normalgr.split("_").join(" "),
        };
      if (kinder_normalg)
        productFilters.kinder_normalg = {
          $eq: kinder_normalg.split("_").join(" "),
        };
      if (kinder_sockengr)
        productFilters.kinder_sockengr = {
          $eq: kinder_sockengr.split("_").join(" "),
        };
      if (schuhgr)
        productFilters.schuhgr = { $eq: schuhgr.split("_").join(" ") };
      if (kinder_schuhgr)
        productFilters.kinder_schuhgr = {
          $eq: kinder_schuhgr.split("_").join(" "),
        };
      if (fashion_material)
        productFilters.fashion_material = {
          $eq: fashion_material.split("_").join(" "),
        };
      if (fashion_color)
        productFilters.fashion_color = {
          $eq: fashion_color.split("_").join(" "),
        };
      if (shoes_material)
        productFilters.shoes_material = {
          $eq: shoes_material.split("_").join(" "),
        };
      if (shoes_color)
        productFilters.shoes_color = { $eq: shoes_color.split("_").join(" ") };
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
              "delivery",
              "furniture_color",
              "furniture_material",
              "breite",
              "hoehe",
              "tiefe",
              "damen_normalgr",
              "damen_jeansgr",
              "damen_kurzgr",
              "damen_langgr",
              "cup_gr",
              "brustumfang",
              "miederhosengr",
              "strumpfhosengr",
              "sockengr",
              "herren_normalgr",
              "herren_jeansgr",
              "kragenweite",
              "herren_untersetztgr",
              "herren_schlankgr",
              "waschegr",
              "herren_bauchgr",
              "baby_normalgr",
              "kinder_normalg",
              "kinder_sockengr",
              "schuhgr",
              "kinder_schuhgr",
              "fashion_material",
              "fashion_color",
              "shoes_material",
              "shoes_color",
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

      if (sales === "true") {
        filteredEntries = await filteredEntries.filter(
          (product) => product.sale_price !== product.regular_price
        );
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
