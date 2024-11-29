function getImageURL(name: string | undefined) {
  if (!name) return '';
  const apiUrl = process.env.REACT_APP_API_URL;
  const backendURL = `${apiUrl}/uploads`;
  return `${backendURL}/${name}`;
}

export {getImageURL};
