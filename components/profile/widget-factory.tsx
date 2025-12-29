import { Widget } from "@/types/profile";
import { ProfileWidget } from "./widgets/profile-widget";
import { HeadingWidget } from "./widgets/heading-widget";
import { LinkWidget } from "./widgets/link-widget";
import { MenuWidget } from "./widgets/menu-widget";
import { GalleryWidget } from "./widgets/gallery-widget";
import { MapWidget } from "./widgets/map-widget";

export function WidgetFactory({ widget }: { widget: Widget }) {
  switch (widget.type) {
    case "profile":
      return <ProfileWidget data={widget.data} />;
    case "heading":
      return <HeadingWidget data={widget.data} />;
    case "link":
      return <LinkWidget data={widget.data} />;
    case "menu":
      return <MenuWidget data={widget.data} />;
    case "gallery":
      return <GalleryWidget data={widget.data} />;
    case "map":
      return <MapWidget data={widget.data} />;
    default:
      return null;
  }
}
