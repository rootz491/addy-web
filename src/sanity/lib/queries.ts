import { groq } from 'next-sanity';

// Query to fetch all digital art sketches
export const DIGITAL_ART_QUERY = groq`
  *[_type == "digitalArt"] | order(dateOfCreation desc, _createdAt desc) {
    _id,
    title,
    description,
    featured,
    dateOfCreation,
    categories,
    orderable,
    price,
    currency,
    images[] {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
  }
`;

// Query to fetch all traditional art sketches
export const TRADITIONAL_ART_QUERY = groq`
  *[_type == "traditionalArt"] | order(dateOfCreation desc, _createdAt desc) {
    _id,
    title,
    description,
    featured,
    dateOfCreation,
    categories,
    orderable,
    price,
    currency,
    images[] {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
  }
`;
