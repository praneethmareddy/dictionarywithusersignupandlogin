const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
var input = document.getElementById("inp-word");

function searchword()
{
    let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
      
      // Check if the audio source exists
      if (data[0].phonetics[0]?.audio) {
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      } else {
        throw new Error("No audio source available");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
}
function inputLength() {
	return input.value.length;
}
function searchwordforclick() {
	if(inputLength()>0)
    {
        searchword();
    }
}
function searchwordAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13)
     {
		searchword();
	}
}
btn.addEventListener("click", searchwordforclick);

input.addEventListener("keypress", searchwordAfterKeypress);

function playSound() {
  if (sound.src) {
    sound.play()
      .catch((error) => {
        console.log(error);
        // Handle any playback errors
      });
  }
}
