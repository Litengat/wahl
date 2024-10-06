import md5 from "md5";

export function getWikiDataImageURL(imagename: string) {
  const name = imagename.replace(" ", "_");
  const hash = md5(name);
  return `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash[0]}${hash[1]}/${name}`;
}
