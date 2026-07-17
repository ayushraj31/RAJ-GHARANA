export default {
  name: 'siteSettings',
  title: 'Global Site Settings',
  type: 'document',
  fields: [
    // 👑 BRANDING SECTION
    {
      name: 'logo',
      title: 'Boutique Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload your Raj Gharana Saree Centre logo here.'
    },
    // 🖼️ HERO BANNER SECTION (MULTIPLE IMAGES)
    {
      name: 'heroTitle',
      title: 'Hero Banner Title',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Banner Subtitle',
      type: 'string',
    },
    {
      name: 'heroImages',
      title: 'Hero Auto-Scroll Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple images for the home page auto-scrolling slider.'
    },
    // 📸 OFFLINE STORE SECTION (MULTIPLE IMAGES)
    {
      name: 'storeImages',
      title: 'Offline Store Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple photos of your physical store for the bottom section.'
    }
  ]
}