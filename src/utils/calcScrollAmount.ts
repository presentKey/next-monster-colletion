const TOP_HDEDER_MOBILE = 50 + 40;
const TOP_HEADER_DESKTOP = 50;

export default function calcScrollAmount(position: number) {
  return (
    position -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HDEDER_MOBILE)
  );
}
