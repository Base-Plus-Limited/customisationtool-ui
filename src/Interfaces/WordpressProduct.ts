export interface ISelectableProduct extends IWordpressProduct{
  selected: boolean;
  recentlySelected: boolean;
  smallerSizePrice: string;
}

export default interface IWordpressProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from?: any;
  date_on_sale_from_gmt?: any;
  date_on_sale_to?: any;
  date_on_sale_to_gmt?: any;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity?: any;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: Dimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  purchase_note: string;
  categories: Category[];
  tags: Category[];
  images: Image[];
  attributes: any[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  meta_data: any[];
  composite_layout: string;
  composite_add_to_cart_form_location: string;
  composite_editable_in_cart: boolean;
  composite_sold_individually_context: string;
  composite_shop_price_calc: string;
  composite_components: any[];
  composite_scenarios: any[];
  _links: Links;
}

interface Links {
  self: Self[];
  collection: Self[];
}

interface Self {
  href: string;
}

interface Image {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Dimensions {
  length: string;
  width: string;
  height: string;
}