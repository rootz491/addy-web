export interface ImageAsset {
  _id: string;
  url: string;
  metadata: {
    lqip: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface SketchImage {
  asset: ImageAsset;
  alt?: string;
}

export interface BaseSketch {
  _id: string;
  title?: string;
  description?: string;
  featured?: boolean;
  dateOfCreation?: string;
  categories?: string[];
  orderable?: boolean;
  price?: number;
  currency?: string;
  images: SketchImage[];
}

export interface DigitalArt extends BaseSketch {
  _type: 'digitalArt';
}

export interface TraditionalArt extends BaseSketch {
  _type: 'traditionalArt';
}

export type Sketch = DigitalArt | TraditionalArt;
