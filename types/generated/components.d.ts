import type { Attribute, Schema } from '@strapi/strapi';

export interface ImageLinksImageLinks extends Schema.Component {
  collectionName: 'components_image_links_image_links';
  info: {
    displayName: 'image-links';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    link: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'image-links.image-links': ImageLinksImageLinks;
    }
  }
}
