import type { Attribute, Schema } from '@strapi/strapi';

export interface CategoryLinksCategoryLinks extends Schema.Component {
  collectionName: 'components_category_links_category_links';
  info: {
    displayName: 'category-links';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    link: Attribute.Text & Attribute.Required;
    text: Attribute.String & Attribute.Required;
  };
}

export interface HeaderLinksHeaderLinks extends Schema.Component {
  collectionName: 'components_header_links_header_links';
  info: {
    displayName: 'header-links';
  };
  attributes: {
    dropdown_links: Attribute.Component<'text-links.text-links', true> &
      Attribute.Required;
    link: Attribute.Text & Attribute.Required;
    text: Attribute.String & Attribute.Required;
  };
}

export interface IconTextIconText extends Schema.Component {
  collectionName: 'components_icon_text_icon_texts';
  info: {
    displayName: 'icon-text';
  };
  attributes: {
    icon: Attribute.Media<'images'> & Attribute.Required;
    text: Attribute.String & Attribute.Required;
  };
}

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

export interface TextLinksTextLinks extends Schema.Component {
  collectionName: 'components_text_links_text_links';
  info: {
    displayName: 'text-links';
  };
  attributes: {
    link: Attribute.Text & Attribute.Required;
    text: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'category-links.category-links': CategoryLinksCategoryLinks;
      'header-links.header-links': HeaderLinksHeaderLinks;
      'icon-text.icon-text': IconTextIconText;
      'image-links.image-links': ImageLinksImageLinks;
      'text-links.text-links': TextLinksTextLinks;
    }
  }
}
