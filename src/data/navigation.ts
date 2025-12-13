export interface NavItem {
    label: string;
    href: string;
    iconSrc: string;
}

export const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/dashboard", iconSrc: "/icons/home.svg" },
    { label: "Discover", href: "/dashboard/discover", iconSrc: "/icons/discover.svg" },
    { label: "Forum", href: "/dashboard/forum", iconSrc: "/icons/forum.svg" },
    { label: "Bookings", href: "/dashboard/bookings", iconSrc: "/icons/bookings.svg" },
    { label: "Bookmarks", href: "/dashboard/bookmarks", iconSrc: "/icons/bookmarks.svg" },
    { label: "Account", href: "/dashboard/account", iconSrc: "/icons/account.svg" },
];
