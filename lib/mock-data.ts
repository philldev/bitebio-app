import { Profile } from "@/types/profile";

export const MOCK_PROFILES: Record<string, Profile> = {
  "cool-beans": {
    username: "cool-beans",
    displayName: "Cool Beans Cafe",
    widgets: [
      {
        id: "p1",
        type: "profile",
        size: "full",
        data: {
          name: "Cool Beans Cafe",
          bio: "Specialty coffee, handmade pastries, and a cozy atmosphere in the heart of the city.",
          avatarUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
        },
      },
      {
        id: "h1",
        type: "heading",
        size: "full-sm",
        data: {
          title: "Our Menus",
          subtitle: "Freshly brewed and baked every day",
        },
      },
      {
        id: "m1",
        type: "menu",
        size: "1x1",
        data: {
          name: "Signature Latte",
          price: "$5.50",
          description: "Double shot with oat milk",
          imageUrl: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&w=400&q=80",
        },
      },
      {
        id: "m2",
        type: "menu",
        size: "1x1",
        data: {
          name: "Almond Croissant",
          price: "$4.25",
          imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
        },
      },
      {
        id: "h2",
        type: "heading",
        size: "full-sm",
        data: {
          title: "Connect & Find Us",
        },
      },
      {
        id: "l1",
        type: "link",
        size: "2x1",
        data: {
          title: "Instagram",
          url: "https://instagram.com",
          icon: "InstagramIcon",
          description: "@coolbeanscafe",
        },
      },
      {
        id: "map1",
        type: "map",
        size: "2x2",
        data: {
          location: "123 Coffee Lane, Brewtown",
        },
      },
      {
        id: "l2",
        type: "link",
        size: "1x1",
        data: {
          title: "Website",
          url: "https://example.com",
          icon: "GlobalIcon",
        },
      },
    ],
  },
  "burger-joint": {
    username: "burger-joint",
    displayName: "The Burger Joint",
    widgets: [
      {
        id: "p1",
        type: "profile",
        size: "full",
        data: {
          name: "The Burger Joint",
          bio: "Voted best burgers in town 3 years in a row. No frills, just flame-grilled perfection.",
          avatarUrl: "https://images.unsplash.com/photo-1561758033-d8f3c665b6b6?auto=format&fit=crop&w=400&q=80",
        },
      },
      {
        id: "m1",
        type: "menu",
        size: "2x2",
        data: {
          name: "The Ultimate Cheeseburger",
          price: "$12.99",
          description: "Double patty, secret sauce, and extra cheddar.",
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        },
      },
      {
        id: "l1",
        type: "link",
        size: "1x1",
        data: {
          title: "Order Now",
          url: "https://ubereats.com",
          icon: "ShoppingBag01Icon",
        },
      },
      {
        id: "g1",
        type: "gallery",
        size: "2x1",
        data: {
          images: [
            { url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
            { url: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?auto=format&fit=crop&w=400&q=80" },
          ],
        },
      },
    ],
  },
};