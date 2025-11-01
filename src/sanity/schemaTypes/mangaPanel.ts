import { defineField, defineType } from "sanity";

export const mangaPanel = defineType({
  name: "mangaPanel",
  title: "Manga Panel",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      media: "images.0",
    },
    prepare({ media }) {
      return {
        title: "Manga Panel",
        media,
      };
    },
  },
});
