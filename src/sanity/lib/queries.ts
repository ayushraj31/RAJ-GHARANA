// 🔥 Fetching logo, hero slider, and offline store details in a single query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "logoUrl": logo.asset->url,
  heroTitle,
  heroSubtitle,
  "heroImages": heroImages[].asset->url,
  "storeImages": storeImages[].asset->url
}`;

// 2. Homepage aur listing ke liye items fetch karne ki query
export const homeProductsQuery = `*[_type == "product"] | order(_createdAt desc)[0...12] {
  _id,
  title,
  slug,
  price,
  compareAtPrice,
  isNewArrival,
  isBestSeller,
  rating,
  reviewCount,
  description,
  "videoUrl": videoFile.asset->url,
  // ✨ Yahan variants se data nikal kar images[0] ko auto-swatch bana diya hai
  "colorVariants": variants[] {
    colorName,
    "swatchUrl": images[0].asset->url,
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
  rating,
  reviewCount,
  description,
  "videoUrl": videoFile.asset->url,
  // ✨ Same yahan bhi variants se map karke images[0] ko auto-swatch kiya hai
  "colorVariants": variants[] {
    colorName,
    "swatchUrl": images[0].asset->url,
    "images": images[].asset->url,
    sizes[] {
      sizeLabel,
      stockStatus
    }
  },
  reviews[] {
    reviewerName,
    reviewRating,
    comment,
    "realPhotos": realPhotos[].asset->url
  }
}`;