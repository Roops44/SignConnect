const apiKey = 'LGYG1qNd1nCgfMhvF3S7yFTZhJwrAgrZ'; // Replace with your Giphy API key
const apiUrl = 'https://api.giphy.com/v1/gifs/search';

const translateButton = document.getElementById('translateButton');
const textInput = document.getElementById('textInput');
const languageSelect = document.getElementById('languageSelect');
const resultContainer = document.getElementById('result');
const noResults = document.getElementById('noResults');
const loadingIndicator = document.getElementById('loading');

const languageMap = {
  en: 'sign language',
  es: 'lengua de señas',
  de: 'Gebärdensprache',
  ko: '수화',
  ta: 'கைத்தொகை மொழி',
  hi: 'संकेत भाषा',
  it: 'lingua dei segni',
  zh: '手语',
  ja: '手話',
};

translateButton.addEventListener('click', async () => {
  const text = textInput.value.trim();
  const language = languageSelect.value;

  if (!text) {
    alert('Please enter text to translate.');
    return;
  }

  resultContainer.innerHTML = '';
  noResults.style.display = 'none';
  loadingIndicator.style.display = 'block';

  const querySuffix = languageMap[language];
  const query = `${text} ${querySuffix}`;

  try {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json();

    loadingIndicator.style.display = 'none';

    if (data.data.length > 0) {
      const gifUrl = data.data[0].images.original.url;
      const img = document.createElement('img');
      img.src = gifUrl;
      img.alt = `Sign Language GIF for ${text}`;
      resultContainer.appendChild(img);
    } else {
      noResults.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching GIF:', error);
    noResults.style.display = 'block';
    loadingIndicator.style.display = 'none';
  }
});