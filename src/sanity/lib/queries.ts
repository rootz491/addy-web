import { groq } from 'next-sanity';

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
