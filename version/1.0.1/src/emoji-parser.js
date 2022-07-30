///// TO-DO's 
// - if Unicode is loaded (check if Emoji Support) if not supported replace all matches with unicode then load Twemoji (twitter emoji parser) which replaces unicode with images
// - if emoji-s are fetched / replace key names with fetched values
// - import unicode by default 
// - add import for regular

class EmojiParser {
  constructor() {
    // JSON list to hold Emoji's 
    this.emoteList = {};
    this.defaultMessage ="Unicode Emoji Parser Loaded";
  }

  
  
  
    setEmojiType(type) {
    if (type =="GitHub" || type == "Regular"){
      this.defaultMessage = type + " Emoji Parser Loaded"
      
      if (type="Regular"){
        // import regular emoji JSON data
      }
      
       if (type="GitHub"){
        // Fetch GitHub emoji JSON data
         emojiParser.fetchEmojiData("https://api.github.com/emojis")
      }
      
    } else {
       // Parser Type Not Found Message
      if (type !== "GitHub" || type == "Regular"){
        this.defaultMessage = "Error: Parser Type Not Found - Loading Unicode Emoji's"
      }
      
      // Default to unicode emoji's if no type chosen (import Unicode JSON)
      
    }
  }
  
  
  
  // Function to to add own Emoji JSON data from URL 
  
   ////// TO-DO : if emoji-s are fetched / replace key names with fetched values. 
  fetchEmojiData(data){
      fetch(data)
            .then(function (response) {
                return response.json();
            })
            .then(function (emojis) {
                for(const emoji in emojis){
                  
               // Add Each Emoji Name + Key Value to JSON List
                  emojiParser.emoteList[emoji] = emojis[emoji]
                };
                  // Then Convert Matches
                 emojiParser.convertEmojisInHTML();
            })
            .catch(function (error) {
                console.log('Error fetching Emoji Data: ' + error.message);
            });
  }
  
  

  
  
  // Add Each Emoji Into List For Usage
  addEmoji(emotes) {
    console.log(emotes)
    for (let emote in emotes) {
     // console.log(emote)
      this.emoteList[emote] = emotes[emote];
    }
    this.convertEmojisInHTML();
  }

  
  
  // Replace all regex matches for :keyname: with JSON keyname value 
 replaceAllMatches(str, map) {
   
    // if Type Unicode (Remove the Image Class) 
  return Object.entries(map).reduce((s, [key, value]) => s.replaceAll(`:${key}:`, `<img class="emoji" src="${value}" >`), str);
}
  
  
  // Replace all matches in body HTML
  convertEmojisInHTML() {   
      document.body.innerHTML = this.replaceAllMatches(document.body.innerHTML, this.emoteList)

  }
}



// Initizalize Emoji Parser 
var emojiParser = new EmojiParser();
window.onload = function () {
  emojiParser.convertEmojisInHTML();
  console.log(emojiParser.defaultMessage);
};



// Demo Usage Examples
emojiParser.setEmojiType("Regular")

// Add Emojis From JSON List 
emojiParser.fetchEmojiData("https://api.github.com/emojis")

// Add Single Emoji By Name + Image 
emojiParser.addEmoji({ "blobhype": "https://cdn.discordapp.com/emojis/833742785198424084.gif" });
