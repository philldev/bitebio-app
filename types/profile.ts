export type WidgetType = 'profile' | 'link' | 'menu' | 'gallery' | 'map' | 'heading';
export type WidgetSize = '1x1' | '2x1' | '2x2' | 'full';

export interface BaseWidget {
  id: string;
  type: WidgetType;
  size: WidgetSize;
}

export interface ProfileWidgetData extends BaseWidget {
  type: 'profile';
  data: {
    name: string;
    bio: string;
    avatarUrl?: string;
  };
}

export interface HeadingWidgetData extends BaseWidget {
  type: 'heading';
  data: {
    title: string;
    subtitle?: string;
  };
}

export interface LinkWidgetData extends BaseWidget {
  type: 'link';
  data: {
    title: string;
    url: string;
    icon?: string; // Icon name from Hugeicons
    description?: string;
  };
}

export interface MenuWidgetData extends BaseWidget {
  type: 'menu';
  data: {
    name: string;
    price: string;
    description?: string;
    imageUrl?: string;
  };
}

export interface GalleryWidgetData extends BaseWidget {
  type: 'gallery';
  data: {
    images: { url: string; alt?: string }[];
  };
}

export interface MapWidgetData extends BaseWidget {
  type: 'map';
  data: {
    location: string;
    lat?: number;
    lng?: number;
  };
}

export type Widget = 
  | ProfileWidgetData 
  | HeadingWidgetData 
  | LinkWidgetData 
  | MenuWidgetData 
  | GalleryWidgetData 
  | MapWidgetData;

export interface Profile {
  username: string;
  displayName: string;
  themeColor?: string;
  widgets: Widget[];
}
