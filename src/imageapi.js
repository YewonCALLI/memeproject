import { createClient } from "pexels";

const { VITE_PEXELS_API_KEY } = import.meta.env;

const client = createClient(VITE_PEXELS_API_KEY);

document.getElementById("button2").addEventListener("click", () => {
  console.log("search button clicked");
  const query = document.getElementById("firstname").value; // `let`이 필요 없습니다.
  const result = document.getElementById("result");

  if (!result) {
    console.error("Result element not found");
    return;
  }

  client.photos
    .search({ query, per_page: 8 })
    .then((photos) => {
      result.innerHTML = photos.photos
        .map((photo) => `<img src="${photo.src.medium}">`)
        .join("");
    })
    .catch((e) => {
      console.error("error", e);
      // 사용자에게 에러 메시지 표시
      result.innerHTML = "<p>An error occurred while fetching photos.</p>";
    });
});
