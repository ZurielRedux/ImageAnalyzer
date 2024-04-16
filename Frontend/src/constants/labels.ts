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
    url: "/collections",
    title: "Collections",
  },
];

export const AnalyzeHeaderInfo: IHeaderInfo = {
  title: "Analyze Image",
  description:
    "Upload an image to view various visual stats and features such as categories, colors, objects, and information tags",
};

export const DashboardHeaderInfo: IHeaderInfo = {
  title: "Dashboard",
  description: "",
};

export const CollectionsHeaderInfo: IHeaderInfo = {
  title: "Collections",
  description: "View, and group your Collections of analyzed image data",
};
