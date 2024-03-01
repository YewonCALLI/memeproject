// import { createClient } from "pexels";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const { VITE_PEXELS_API_KEY } = import.meta.env;

const API = "W51detNdues2RsdrwvjZRLsnk7xdAwp7zmwRnM4u9ORQHqi4s8VxuBmX";

document.getElementById("button2").addEventListener("click", async () => {
  // Move the retrieval of the query inside the click handler to get the current value
  const query = document.getElementById("firstname").value;
  console.log("search button clicked", query);

  try {
    // Move the fetch request inside the click handler
    const imageRequest = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=8&page=1`,
      {
        headers: {
          Authorization: API, // Replace 'API_KEY' with your actual API key
        },
      }
    ).then((response) => response.json());

    if (!imageRequest.photos) {
      console.error("Photos property not found in response");
      return;
    }

    // Process the images right after fetching them
    const images = imageRequest.photos.map((image) => ({
      author: image.photographer,
      url: image.src.large,
      id: crypto.randomUUID(),
    }));

    const result = document.getElementById("result");
    if (!result) {
      console.error("Result element not found");
      return;
    }

    // Clear previous results
    result.innerHTML = "";

    // Append new images
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.url;
      img.alt = image.author;
      result.appendChild(img);
    });
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
});
