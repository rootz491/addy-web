import { groq } from "next-sanity";

export const DIGITAL_ART_QUERY = groq`
  *[_type == "digitalArt"] | order(featured desc, dateOfCreation desc, _createdAt desc) {
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
  *[_type == "traditionalArt"] | order(featured desc, dateOfCreation desc, _createdAt desc) {
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

export const DIGITAL_ART_PAGINATED_QUERY = groq`
  *[_type == "digitalArt"] | order(featured desc, dateOfCreation desc, _createdAt desc) [$start...($start + $limit)] {
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

export const TRADITIONAL_ART_PAGINATED_QUERY = groq`
  *[_type == "traditionalArt"] | order(featured desc, dateOfCreation desc, _createdAt desc) [$start...($start + $limit)] {
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

export const DIGITAL_ART_COUNT_QUERY = groq`count(*[_type == "digitalArt"])`;
export const TRADITIONAL_ART_COUNT_QUERY = groq`count(*[_type == "traditionalArt"])`;
