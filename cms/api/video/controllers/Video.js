'use strict';

/**
 * Video.js controller
 *
 * @description: A set of functions called "actions" for managing `Video`.
 */

module.exports = {

  /**
   * Retrieve video records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.video.search(ctx.query);
    } else {
      return strapi.services.video.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a video record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.video.fetch(ctx.params);
  },

  /**
   * Count video records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.video.count(ctx.query);
  },

  /**
   * Create a/an video record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.video.add(ctx.request.body);
  },

  /**
   * Update a/an video record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.video.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an video record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.video.remove(ctx.params);
  }
};
