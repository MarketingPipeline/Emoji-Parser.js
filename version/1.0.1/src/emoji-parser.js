///// TO-DO's 
// - if Unicode is loaded (check if Emoji Support) if not supported replace all matches with unicode then load Twemoji (twitter emoji parser) which replaces unicode with images
// - if emoji-s are fetched / load default emojis & replace default EMOJI key names with fetched key names & values.
// - import unicode by default (G-Emojis with attributes)
// - add import for regular



class EmojiParser {
  constructor() {
    // JSON list to hold Emoji's 
    this.emoteList = {};
    this.defaultMessage ="Unicode Emoji Parser Loaded";
    this.emojiType="Unicode"
  }

 

  loadDefaultEmojis(){
 // Load G-Emojis By Default
    emojiParser.fetchEmojiData("https://raw.githubusercontent.com/MarketingPipeline/Emoji-Parser.js/main/version/1.0.0/emojis/g-emojis.json")
   


  }
  
    setEmojiType(type) {
    if (type =="GitHub" || type == "Regular"){
      this.defaultMessage = type + " Emoji Parser Loaded"
      
      // Used to set HTML image
         this.emojiType=type
      
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
  // var value = null;
  // if (this.emojiType == "Unicode"){
   //     var Replace = `${value}`
  // } else {
   //  var Replace = `<img class="emoji" src="${value}" >`
  // }
   
   var EmojisParsed = Object.entries(map).reduce((s, [key, value]) => 
                                                 
                                                 
                               s.replaceAll(`:${key}:`,  `<img class="emoji" src="${value}" >`), str);
    // if Type Unicode (Remove the Image Class) 
  return EmojisParsed
}
  
  
  // Replace all matches in body HTML
  convertEmojisInHTML() { 
    
    
    /// Check if Emojis are Supported First
       // Modernizr Test
     var emojiSupported = (function() { 
  var node = document.createElement('canvas');
  if (!node.getContext || !node.getContext('2d') ||
      typeof node.getContext('2d').fillText !== 'function')
    return false;
  var ctx = node.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('\ud83d\ude03', 0, 0);
  return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
})();
    if (this.emojiType =="Unicode"){
      emojiParser.loadDefaultEmojis();
 // const twemoji = import("https://cdn.skypack.dev/twemoji.maxcdn.com/twemoji.min.js");
  
     /// IF EMOJI NOT SUPPORTED - REPLACE UNICODE EMOJIS WITH TWEMOJI IMAGES 
    //  if (!emojiSupported) {
  //twemoji.parse(document.body);
// }
      
    }
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
