// css: globals.css -> layout
const TOP_HDEDER_MOBILE = 50 + 40; // global_header + sub_category_tab
const TOP_HEADER_DESKTOP = 50; // global_header

export default function calcScrollAmount(position: number, target?: 'user') {
  if (target === 'user') {
    return (
      position +
      (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HDEDER_MOBILE)
    );
  }
  return (
    position -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HDEDER_MOBILE)
  );
}
