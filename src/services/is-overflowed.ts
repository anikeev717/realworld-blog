export const isOverflowed = (refItem: React.MutableRefObject<HTMLElement | null>) => {
  if (refItem.current !== null) return refItem?.current.scrollWidth > refItem?.current.offsetWidth;
  return false;
};
