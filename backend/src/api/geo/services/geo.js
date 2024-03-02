'use strict';

/**
 * geo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::geo.geo');
