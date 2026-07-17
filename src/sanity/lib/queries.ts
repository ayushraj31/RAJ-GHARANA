// 🔥 Fetching logo, hero slider, and offline store details in a single query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "logoUrl": logo.asset->url,
  heroTitle,
  heroSubtitle,
  "heroImages": heroImages[].asset->url,
  "storeImages": storeImages[].asset->url
}`;

// Baaki aapki homeProductsQuery aur homeCategoriesQuery jaisi hain waisi hi rahengi
// 2. Homepage aur listing ke liye video file aur fabric swatch ke sath items fetch karne ki query
export const homeProductsQuery = `*[_type == "product"] | order(_createdAt desc)[0...12] {
  _id,
  title,
  slug,
  price,
  compareAtPrice,
  isNewArrival,
  isBestSeller,
  description,
  "videoUrl": videoFile.asset->url,
  colorVariants[] {
    colorName,
    "swatchUrl": swatchImage.asset->url,
    "images": images[].asset->url,
    sizes[] {
      sizeLabel,
      stockStatus
    }
  }
}`;

// 3. Home page par saare categories ko dynamic gumbad elements render karne ke liye query
export const homeCategoriesQuery = `*[_type == "category"] {
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url
}`;

// 4. Ek specific main category aur uske andar ke pure subcategory boxes uthane ki query
export const categoryDetailsQuery = `*[_type == "category" && slug.current == $categorySlug][0] {
  title,
  description,
  "imageUrl": image.asset->url,
  subcategories[]-> {
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url
  }
}`;

// 5. Single Product Page Details Fetching Query
export const productDetailQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  price,
  compareAtPrice,
  description,
  "videoUrl": videoFile.asset->url,
  colorVariants[] {
    colorName,
    "swatchUrl": swatchImage.asset->url,
    "images": images[].asset->url,
    sizes[] {
      sizeLabel,
      stockStatus
    }
  }
}`;