export const getTestimonials = async ({ searchQuery, page, filter }: never) => {
  const response = await fetch(
    `/api/testimonials?page=${page}&search=${searchQuery}&filter=${filter}`
  );
  const data = await response.json();
  return data;
};
