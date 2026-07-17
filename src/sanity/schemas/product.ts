import { Rule } from 'sanity';

export default {
  name: 'product',
  title: '🛍️ Products Atelier',
  type: 'document',
  
  // Section layout mapping group rules for clean UI
  fieldsets: [
    { name: 'basicInfo', title: '⚜️ Basic Details', options: { collapsible: true, collapsed: false } },
    { name: 'pricing', title: '💰 Pricing & Badges', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: '🎥 Base Media (Direct Video)', options: { collapsible: true, collapsed: true } },
    { name: 'variants', title: '🎨 Color & Fabric Variants', options: { collapsible: true, collapsed: false } },
  ],

  fields: [
    // --- BASIC DETAILS ---
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      fieldset: 'basicInfo',
      validation: (Rule: Rule) => Rule.required().error('Product title is required.'),
    },
    {
      name: 'slug',
      title: '🔄 URL Web Address',
      type: 'slug',
      fieldset: 'basicInfo',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Luxury Product Description',
      type: 'text',
      fieldset: 'basicInfo',
    },

    // --- PRICING & BADGES ---
    {
      name: 'price',
      title: 'Selling Price (₹)',
      type: 'number',
      fieldset: 'pricing',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'compareAtPrice',
      title: 'Original Price / Strike-through (₹)',
      type: 'number',
      fieldset: 'pricing',
      description: 'Keep higher than selling price to show automated discount badge.',
    },
    {
      name: 'isNewArrival',
      title: 'Tag as New Arrival? (Fresh loom)',
      type: 'boolean',
      fieldset: 'pricing',
      initialValue: false,
    },
    {
      name: 'isBestSeller',
      title: 'Tag as Best Seller? (Most Loved)',
      type: 'boolean',
      fieldset: 'pricing',
      initialValue: false,
    },

    // --- BASE MEDIA (DIRECT FILE UPLOAD) ---
    {
      name: 'videoFile',
      title: 'Upload Product Video (.mp4)',
      type: 'file',
      fieldset: 'media',
      description: 'Directly upload video file from your phone/laptop gallery (No links needed).',
      options: {
        accept: 'video/*',
      },
    },

    // --- COLOR & FABRIC VARIANTS (MYNTRA STYLE) ---
    {
      name: 'colorVariants',
      title: 'Color Specific Variants List',
      type: 'array',
      fieldset: 'variants',
      description: 'Add multiple colors/fabrics for this product here.',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Color Variant Package',
          fields: [
            {
              name: 'colorName',
              title: 'Color Name',
              type: 'string',
              description: 'Example: Royal Yellow, Pastel Pink',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'swatchImage',
              title: '📸 Fabric/Texture Swatch (Myntra Style)',
              type: 'image',
              description: 'Upload a small close-up photo of the fabric texture/color to show in the circle.',
              validation: (Rule: Rule) => Rule.required().error('Fabric swatch photo is mandatory.'),
            },
            {
              name: 'images',
              title: '📸 Color Specific Photo Gallery (4-5 Photos)',
              type: 'array',
              description: 'Upload photos of ONLY this color variant here.',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule: Rule) => Rule.required().min(1).error('At least one image is required for this color.'),
            },
            {
              name: 'sizes',
              title: 'Available Sizes & Stock Status',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'sizeLabel', title: 'Size Label (e.g. Free Size, S, M, XL)', type: 'string', validation: (Rule: Rule) => Rule.required() },
                    { 
                      name: 'stockStatus', 
                      title: 'Stock Availability', 
                      type: 'string', 
                      options: { list: ['In Stock', 'Low Stock', 'Out of Stock'] },
                      initialValue: 'In Stock'
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'colorName',
              media: 'swatchImage'
            }
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'colorVariants.0.images.0' // Shows the very first image of the first color as catalog preview
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `₹${subtitle}` : '',
        media: media
      };
    }
  }
};