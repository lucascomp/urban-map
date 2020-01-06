export const arrayDiff = (
  a1,
  a2,
  comparator,
) => a1.filter((e1) => !a2.find((e2) => comparator(e1, e2)));

export const arrayIntersection = (
  a1,
  a2,
  comparator,
) => a1.filter((e1) => a2.find((e2) => comparator(e1, e2)));
