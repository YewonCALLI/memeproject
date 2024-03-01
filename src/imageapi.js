// import { createClient } from "pexels";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const { VITE_PEXELS_API_KEY } = import.meta.env;

const API = "W51detNdues2RsdrwvjZRLsnk7xdAwp7zmwRnM4u9ORQHqi4s8VxuBmX";

const query = document.getElementById("firstname").value;

const imageRequest = await fetch(
  `https://api.pexels.com/v1/search?query=${query}&per_page=8&page=1`,
  {
    headers: {
      Authorization: API,
    },
  }
).then((response) => response.json());

const images = [...imageRequest.photos].map((image) => ({
  author: image.photographer,
  url: image.src.large,
  id: crypto.randomUUID(),
}));

document.getElementById("button2").addEventListener("click", () => {
  console.log("search button clicked", query);

  const result = document.getElementById("result");

  if (!result) {
    console.error("Result element not found");
    return;
  }

  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.author;
    result.appendChild(img);
  });
});
