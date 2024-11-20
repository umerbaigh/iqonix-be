'use strict';

/**
 * must-have-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::must-have-product.must-have-product');
