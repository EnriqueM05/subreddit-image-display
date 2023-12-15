document.addEventListener("DOMContentLoaded", () => {
  const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
  const memeImage = document.querySelector(".meme-generator img");
  const memeTitle = document.querySelector(".meme-generator .meme-title");
  const memeAuthor = document.querySelector(".meme-generator .meme-author");
  const memeUrl = document.querySelector(".meme-generator .meme-url");
  const searchTermInput = document.querySelector(".searchTerm");
  

  const updateDetails = (url, title, author) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Image by: ${author}`;
    memeUrl.setAttribute('href', url);
    console.log("Image Source:", url);
  };

  const fetchMeme = (searchQuery) => {
    const apiUrl = `https://meme-api.com/gimme/${searchQuery}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        updateDetails(data.url, data.title, data.author);
      })
      .catch((error) => {
        console.error('Error fetching meme:', error);
        updateDetails('', 'Error', 'Unknown');
      });
  };

  generateMemeBtn.addEventListener("click", () => {
    const searchInput = searchTermInput.value.trim();
    if (searchInput !== '') {
      fetchMeme(searchInput);
    } else {
      fetchMeme('error'); 
    }
  });

  fetchMeme('meme');
});
