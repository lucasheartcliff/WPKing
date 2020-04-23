export const setImageMap = (imageList) => {
  let data = {};
  Array.from(imageList).forEach(image => {
    data = {
      ...data,
      [image.id]: {
        ...image,
      },
    };
  });
  return data;
};
