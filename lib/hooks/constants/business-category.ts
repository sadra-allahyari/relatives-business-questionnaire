export function useBusinessCategories() {
  const business = [
    [1, "sdsd"],
    [2, "ddd"],
  ];

  return business.map((it) => ({ value: it[0], label: it[1] }));
}
