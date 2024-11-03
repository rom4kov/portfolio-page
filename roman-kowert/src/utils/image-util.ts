function getImageURL(name: string | undefined) {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}

export {getImageURL};
