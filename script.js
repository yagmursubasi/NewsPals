const apiKey = "852c6935c5e0453f9208a6d2f34a3572";
const blogContainer = document.getElementById("news-cards-container");

// Haberleri getir
async function fetchNews(query, category = "general") {
  const url = query
    ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Blogları göster
function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  if (articles.length > 0) {
    articles.forEach((article) => {
      const card = `
        <div class="blog-card">
          <img src="${article.urlToImage || "default-image.jpg"}" alt="${
        article.title
      }">
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>`;
      blogContainer.innerHTML += card;
    });
  } else {
    blogContainer.innerHTML = "<p>No news found.</p>";
  }
}

// Kategoriye göre yükle
document.querySelectorAll(".category-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const category = event.target.dataset.category;
    fetchNews(null, category).then(displayBlogs);
  });
});

// Arama butonu
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  fetchNews(query).then(displayBlogs);
});

// Varsayılan haberleri yükle
fetchNews().then(displayBlogs);
