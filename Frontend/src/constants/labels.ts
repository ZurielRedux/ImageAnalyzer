export type INavbarLinks = {
  url: string;
  title: string;
}[];

export type IHeaderInfo = {
  title: string;
  description: string;
};

export const navbarLinks: INavbarLinks = [
  {
    url: "/",
    title: "Dashboard",
  },
  {
    url: "/analyze",
    title: "Analyze",
  },
  {
    url: "/collection",
    title: "Collection",
  },
];

export const AnalyzeHeaderInfo: IHeaderInfo = {
  title: "Analyze Image",
  description:
    "Upload your image to view various visual stats and features like categories, colors, objects, and information tags",
};

export const DashboardHeaderInfo: IHeaderInfo = {
  title: "Dashboard",
  description: "",
};
