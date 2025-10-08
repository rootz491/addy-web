import { defineType, defineField } from 'sanity';

export const digitalArt = defineType({
  name: 'digitalArt',
  title: 'Digital Art',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one image is required'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this artwork as featured',
      initialValue: false,
    }),
    defineField({
      name: 'dateOfCreation',
      title: 'Date of Creation',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'orderable',
      title: 'Orderable',
      type: 'boolean',
      description: 'Can customers order this artwork?',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      hidden: ({ document }) => !document?.orderable,
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'JPY (¥)', value: 'JPY' },
          { title: 'CAD ($)', value: 'CAD' },
          { title: 'AUD ($)', value: 'AUD' },
          { title: 'INR (₹)', value: 'INR' },
        ],
      },
      hidden: ({ document }) => !document?.orderable,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, media, featured } = selection;
      return {
        title: title || 'Untitled Digital Art',
        subtitle: featured ? '⭐ Featured' : 'Digital Art',
        media,
      };
    },
  },
});
