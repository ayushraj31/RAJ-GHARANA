import category from './category';
import product from './product';
import subcategory from './subcategory';
import siteSettings from './siteSettings'; // 🔥 Naya settings schema import kiya

export const schemaTypes = [
  siteSettings, // 🔥 Old 'hero' hata kar yahan 'siteSettings' register kar diya
  category,
  product,
  subcategory
];