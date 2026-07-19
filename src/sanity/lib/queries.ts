// 🔥 Fetching logo, hero slider, and offline store details in a single query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "logoUrl": logo.asset->url,
  heroTitle,
  heroSubtitle,
  "heroImages": heroImages[].asset->url,
  "storeImages": storeImages[].asset->url
}`;

// 2. Homepage aur listing ke liye items fetch karne ki query (WITH SUB-CATEGORY SLUG RESOLUTION)
export const homeProductsQuery = `*[_type == "product"] | order(_createdAt desc)[0...12] {
  _id,
  title,
  slug,
  price,
  "compareAtPrice": coalesce(originalPrice, mrp, compareAtPrice),
  isNewArrival,
  isBestSeller,
  rating,
  reviewCount,
  description,
  "videoUrl": videoFile.asset->url,
  
  // ✨ FIXED: Product ke andar linked subcategory ka slug resolve kar rahe hain filter lagane ke liye
  "subcategorySlug": subcategory->slug.current,
  "subCategorySlug": subCategory->slug.current,

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

// 3. Home page par saare categories aur unke subcategories ko reverse-mapping se fetch karne ki query
export const homeCategoriesQuery = `*[_type == "category"] {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  
  // ✨ THE ULTIMATE FIX: Sub-category ke andar jo "Belongs to Category" reference hai, ye usse filter karega
  // Agar aapke schema me field ka naam belongsToCategory ya category hai, ye dono ko check karega
  "subcategories": *[_type == "subcategory" && (belongsToCategory._ref == ^._id || category._ref == ^._id || references(^._id))] {
    title,
    "slug": slug.current
  }
}`;

// 4. Ek specific main category aur uske andar ke pure subcategory boxes uthane ki query (REVERSE MAPPED)
export const categoryDetailsQuery = `*[_type == "category" && slug.current == $categorySlug][0] {
  _id,
  title,
  description,
  "imageUrl": image.asset->url,
  
  // ✨ THE ULTIMATE FIX: Subcategory listing page ke liye bhi reverse reference lock kar diya hai
  "subcategories": *[_type == "subcategory" && (belongsToCategory._ref == ^._id || category._ref == ^._id || references(^._id))] {
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
  // ✨ FIXED: Yahan bhi pricing mapping fix kar di hai
  "compareAtPrice": coalesce(originalPrice, mrp, compareAtPrice),
  rating,
  reviewCount,
  description,
  "videoUrl": videoFile.asset->url,
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