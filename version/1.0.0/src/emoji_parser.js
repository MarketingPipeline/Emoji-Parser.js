class Repository extends HTMLElement {
  constructor() {
    super();

    this.repoDetails = null;

    this.name = this.getAttribute("name");
    
     var SortType= this.getAttribute("sort-type")
     
     
        if (SortType == undefined){
           SortType= ``
         
       } else {
          SortType= SortType
       }  
    this.endpoint = `https://api.github.com/users/${this.name}/repos?sort=`;
    console.log(this.endpoint)
    this.getDetails = this.getDetails.bind(this);
    //
    this.innerHTML = `<h1>Loading</h1>`;
  }

  async connectedCallback() {
    let repo = await this.getDetails();
    this.repoDetails = repo;
    this.initShadowDom();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;
  }

  get style() {
    return `
      <style>
       .github-cards {
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	 display: flex;
	 flex-flow: row;
	 flex-wrap: wrap;
	 width: 900px;
}
 .github-card {
	display: block;
    background-color:white;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;
    margin: 10px;
    padding: 20px;
    color: #555;
    text-decoration: none;
    font-size: 13px;
    flex: 1;
    min-width: 250px;
}
 .github-card > h3 {
	 margin-top: 0;
	 color: #4078c0;
	 font-size: 15px;
}
 .github-card__meta {
	 margin-right: 20px;
}
 .github-card__meta > i {
	 font-size: 16px;
}
 .github-card > p {
	height:50px;
} 
      </style>
    `;
  }

  get template() {
    let repo = this.repoDetails;
    
    let rep = this.html_url;
console.log(repo)
    if (repo.message) {
      return this.style + this.cardError(repo);
    } else {
      return this.style + this.cardTemplate(repo);
    }
  }

  async getDetails() {
    return await fetch(this.endpoint, { mode: "cors" }).then(res => res.json())
        .then(function(data) {
                     return data;
                   });
    
     ; 
    ;
  }

  
  
  cardError({ message }) {
    return `<div class="Card Card--error">Error: ${message}</div>`;
  }

  cardTemplate({repo}) {
  var RepoCount = 0 
  var RepoCards = ""
      var repo = this.repoDetails;
    
    
      var OpenInNewWindow = this.getAttribute("new-window")
        if (OpenInNewWindow == "True"){
           var TargetBlank = `target="_blank"`
         
       } else {
          var TargetBlank = ``
       }  
    
    
        var MaxLength= this.getAttribute("max-repos")
     
     
        if (MaxLength == undefined){
           MaxLength= repo.length
         
       } else {
          MaxLength= MaxLength
       }  
    
   for (var i = 0; i < MaxLength; i++){
     RepoCount = RepoCount + 1    
     
      if (repo[i].language == "PHP"){
         var styleColor = "#4C5E99"
       }
        if (repo[i].language == "Ruby"){
         var styleColor = "#7A0410"
       }
       
        if (repo[i].language == "JavaScript"){
         var styleColor = "#F1E05A"
       }
       
        if (repo[i].language == "HTML"){
         var styleColor = "#F1E05A"
       }
       
        if (repo[i].language == "Java"){
         var styleColor = "#B07219"
       }
       
        if (repo[i].language == "C#"){
         var styleColor = "#178600"
       }
       
       if (repo[i].language == "Python"){
         var styleColor = "#3572A5"
       }
    
     if (repo[i].language == null){
         var Language = ``
       } else { 
       var Language = `<span class="github-card__language-icon" style="color: ${styleColor};">●</span> ${repo[i].language}</span>`
       
       }
    
    if (repo[i].description == undefined){
         var Description = "<br>"
       } else {
         var Description = `${repo[i].description}`
       }
     
     this.classList.add("github-cards");
        RepoCards += `  <a href="${repo[i].html_url}" ${TargetBlank}  class="github-card"> <h3><i class="fa fa-book" style="color:grey;"></i> ${repo[i].name}</h3>
    <p>${Description}</p>
    <span class="github-card__meta">
      
       ${Language}
    <span class="github-card__meta">
      <i class="fa fa-star" aria-hidden="true"></i>
      <span>${repo[i].stargazers_count}</span>
    </span>
    
    <span class="github-card__meta">
      <i class="fa fa-code-fork" aria-hidden="true"></i>
      <span>${repo[i].forks}</span>
    </span>
    </a>
   `
     
         }
     

  
     
	       
   
   
   
  
  

 
    
     
    return `
     ${RepoCards}
    `;
  }
  
  
}

window.customElements.define("github-repo", Repository);

var symbolToEmoji = new Map(Object.entries({ ":+1:": "👍", ":100:": "💯", ":1234:": "🔢", ":8ball:": "🎱", ":a:": "🅰️", ":ab:": "🆎", ":abc:": "🔤", ":abcd:": "🔡", ":accept:": "🉑", ":aerial_tramway:": "🚡", ":airplane:": "✈️", ":alarm_clock:": "⏰", ":alien:": "👽", ":ambulance:": "🚑", ":anchor:": "⚓️", ":angel:": "👼", ":anger:": "💢", ":angry:": "😠", ":anguished:": "😧", ":ant:": "🐜", ":apple:": "🍎", ":aquarius:": "♒️", ":aries:": "♈️", ":arrow_backward:": "◀️", ":arrow_double_down:": "⏬", ":arrow_double_up:": "⏫", ":arrow_down:": "⬇️", ":arrow_down_small:": "🔽", ":arrow_forward:": "▶️", ":arrow_heading_down:": "⤵️", ":arrow_heading_up:": "⤴️", ":arrow_left:": "⬅️", ":arrow_lower_left:": "↙️", ":arrow_lower_right:": "↘️", ":arrow_right:": "➡️", ":arrow_right_hook:": "↪️", ":arrow_up:": "⬆️", ":arrow_up_down:": "↕️", ":arrow_up_small:": "🔼", ":arrow_upper_left:": "↖️", ":arrow_upper_right:": "↗️", ":arrows_clockwise:": "🔃", ":arrows_counterclockwise:": "🔄", ":art:": "🎨", ":articulated_lorry:": "🚛", ":astonished:": "😲", ":athletic_shoe:": "👟", ":atm:": "🏧", ":b:": "🅱️", ":baby:": "👶", ":baby_bottle:": "🍼", ":baby_chick:": "🐤", ":baby_symbol:": "🚼", ":back:": "🔙", ":baggage_claim:": "🛄", ":balloon:": "🎈", ":ballot_box_with_check:": "☑️", ":bamboo:": "🎍", ":banana:": "🍌", ":bangbang:": "‼️", ":bank:": "🏦", ":bar_chart:": "📊", ":barber:": "💈", ":baseball:": "⚾️", ":basketball:": "🏀", ":bath:": "🛀", ":bathtub:": "🛁", ":battery:": "🔋", ":bear:": "🐻", ":bee:": "🐝", ":beer:": "🍺", ":beers:": "🍻", ":beetle:": "🐞", ":beginner:": "🔰", ":bell:": "🔔", ":bento:": "🍱", ":bicyclist:": "🚴", ":bike:": "🚲", ":bikini:": "👙", ":bird:": "🐦", ":birthday:": "🎂", ":black_circle:": "⚫️", ":black_joker:": "🃏", ":black_large_square:": "⬛️", ":black_medium_small_square:": "◾️", ":black_medium_square:": "◼️", ":black_nib:": "✒️", ":black_small_square:": "▪️", ":black_square_button:": "🔲", ":blossom:": "🌼", ":blowfish:": "🐡", ":blue_book:": "📘", ":blue_car:": "🚙", ":blue_heart:": "💙", ":blush:": "😊", ":boar:": "🐗", ":boat:": "⛵️", ":bomb:": "💣", ":book:": "📖", ":bookmark:": "🔖", ":bookmark_tabs:": "📑", ":books:": "📚", ":boom:": "💥", ":boot:": "👢", ":bouquet:": "💐", ":bow:": "🙇", ":bow_and_arrow:": "🏹", ":bowing_man:": "🙇", ":bowing_woman:": "🙇\u200D♀", ":bowling:": "🎳", ":bowtie:": ":bowtie:", ":boy:": "👦", ":bread:": "🍞", ":bride_with_veil:": "👰", ":bridge_at_night:": "🌉", ":briefcase:": "💼", ":broken_heart:": "💔", ":bug:": "🐛", ":bulb:": "💡", ":bullettrain_front:": "🚅", ":bullettrain_side:": "🚄", ":bus:": "🚌", ":busstop:": "🚏", ":bust_in_silhouette:": "👤", ":busts_in_silhouette:": "👥", ":cactus:": "🌵", ":cake:": "🍰", ":calendar:": "📆", ":calling:": "📲", ":camel:": "🐫", ":camera:": "📷", ":canada:": "🇨🇦", ":canary_islands:": "🇮🇨", ":cancer:": "♋️", ":candle:": "🕯", ":candy:": "🍬", ":capital_abcd:": "🔠", ":capricorn:": "♑️", ":car:": "🚗", ":card_index:": "📇", ":carousel_horse:": "🎠", ":cat:": "🐱", ":cat2:": "🐈", ":cd:": "💿", ":chart:": "💹", ":chart_with_downwards_trend:": "📉", ":chart_with_upwards_trend:": "📈", ":checkered_flag:": "🏁", ":cherries:": "🍒", ":cherry_blossom:": "🌸", ":chestnut:": "🌰", ":chicken:": "🐔", ":children_crossing:": "🚸", ":chocolate_bar:": "🍫", ":christmas_tree:": "🎄", ":church:": "⛪️", ":cinema:": "🎦", ":circus_tent:": "🎪", ":city_sunrise:": "🌇", ":city_sunset:": "🌆", ":cl:": "🆑", ":clap:": "👏", ":clapper:": "🎬", ":clipboard:": "📋", ":clock1:": "🕐", ":clock10:": "🕙", ":clock1030:": "🕥", ":clock11:": "🕚", ":clock1130:": "🕦", ":clock12:": "🕛", ":clock1230:": "🕧", ":clock130:": "🕜", ":clock2:": "🕑", ":clock230:": "🕝", ":clock3:": "🕒", ":clock330:": "🕞", ":clock4:": "🕓", ":clock430:": "🕟", ":clock5:": "🕔", ":clock530:": "🕠", ":clock6:": "🕕", ":clock630:": "🕡", ":clock7:": "🕖", ":clock730:": "🕢", ":clock8:": "🕗", ":clock830:": "🕣", ":clock9:": "🕘", ":clock930:": "🕤", ":closed_book:": "📕", ":closed_lock_with_key:": "🔐", ":closed_umbrella:": "🌂", ":cloud:": "☁️", ":clubs:": "♣️", ":cn:": "🇨🇳", ":cocktail:": "🍸", ":coffee:": "☕️", ":cold_sweat:": "😰", ":collision:": "💥", ":computer:": "💻", ":confetti_ball:": "🎊", ":confounded:": "😖", ":confused:": "😕", ":congratulations:": "㊗️", ":construction:": "🚧", ":construction_worker:": "👷", ":convenience_store:": "🏪", ":cookie:": "🍪", ":cool:": "🆒", ":cop:": "👮", ":copyright:": "©️", ":corn:": "🌽", ":couple:": "👫", ":couple_with_heart:": "💑", ":cow:": "🐮", ":cow2:": "🐄", ":credit_card:": "💳", ":crescent_moon:": "🌙", ":crocodile:": "🐊", ":crossed_flags:": "🎌", ":crown:": "👑", ":cry:": "😢", ":crying_cat_face:": "😿", ":crystal_ball:": "🔮", ":cupid:": "💘", ":curly_loop:": "➰", ":currency_exchange:": "💱", ":curry:": "🍛", ":custard:": "🍮", ":customs:": "🛃", ":cyclone:": "🌀", ":dancer:": "💃", ":dancers:": "👯", ":dango:": "🍡", ":dart:": "🎯", ":dash:": "💨", ":date:": "📅", ":de:": "🇩🇪", ":deciduous_tree:": "🌳", ":department_store:": "🏬", ":diamond_shape_with_a_dot_inside:": "💠", ":diamonds:": "♦️", ":disappointed:": "😞", ":disappointed_relieved:": "😥", ":dizzy:": "💫", ":dizzy_face:": "😵", ":do_not_litter:": "🚯", ":dog:": "🐶", ":dog2:": "🐕", ":dollar:": "💵", ":dolls:": "🎎", ":dolphin:": "🐬", ":door:": "🚪", ":doughnut:": "🍩", ":dragon:": "🐉", ":dragon_face:": "🐲", ":dress:": "👗", ":dromedary_camel:": "🐪", ":droplet:": "💧", ":dvd:": "📀", ":e-mail:": "📧", ":ear:": "👂", ":ear_of_rice:": "🌾", ":earth_africa:": "🌍", ":earth_americas:": "🌎", ":earth_asia:": "🌏", ":egg:": "🥚", ":eggplant:": "🍆", ":eight:": "8️⃣", ":eight_pointed_black_star:": "✴️", ":eight_spoked_asterisk:": "✳️", ":electric_plug:": "🔌", ":elephant:": "🐘", ":email:": "✉️", ":end:": "🔚", ":envelope:": "✉️", ":envelope_with_arrow:": "📩", ":es:": "🇪🇸", ":euro:": "💶", ":european_castle:": "🏰", ":european_post_office:": "🏤", ":evergreen_tree:": "🌲", ":exclamation:": "❗️", ":expressionless:": "😑", ":eyeglasses:": "👓", ":eyes:": "👀", ":facepunch:": "👊", ":factory:": "🏭", ":fallen_leaf:": "🍂", ":family:": "👪", ":fast_forward:": "⏩", ":fax:": "📠", ":fearful:": "😨", ":feelsgood:": ":feelsgood:", ":feet:": "🐾", ":ferris_wheel:": "🎡", ":file_folder:": "📁", ":finnadie:": ":finnadie:", ":fire:": "🔥", ":fire_engine:": "🚒", ":fireworks:": "🎆", ":first_quarter_moon:": "🌓", ":first_quarter_moon_with_face:": "🌛", ":fish:": "🐟", ":fish_cake:": "🍥", ":fishing_pole_and_fish:": "🎣", ":fist:": "✊", ":five:": "5️⃣", ":flags:": "🎏", ":flashlight:": "🔦", ":flipper:": "🐬", ":floppy_disk:": "💾", ":flower_playing_cards:": "🎴", ":flushed:": "😳", ":foggy:": "🌁", ":football:": "🏈", ":footprints:": "👣", ":fork_and_knife:": "🍴", ":fountain:": "⛲️", ":four:": "4️⃣", ":four_leaf_clover:": "🍀", ":fr:": "🇫🇷", ":free:": "🆓", ":fried_shrimp:": "🍤", ":fries:": "🍟", ":frog:": "🐸", ":frowning:": "😦", ":fu:": "🖕", ":fuelpump:": "⛽️", ":full_moon:": "🌕", ":full_moon_with_face:": "🌝", ":game_die:": "🎲", ":gb:": "🇬🇧", ":gem:": "💎", ":gemini:": "♊️", ":ghost:": "👻", ":gift:": "🎁", ":gift_heart:": "💝", ":girl:": "👧", ":globe_with_meridians:": "🌐", ":goat:": "🐐", ":goberserk:": ":goberserk:", ":godmode:": ":godmode:", ":golf:": "⛳️", ":grapes:": "🍇", ":green_apple:": "🍏", ":green_book:": "📗", ":green_heart:": "💚", ":grey_exclamation:": "❕", ":grey_question:": "❔", ":grimacing:": "😬", ":grin:": "😁", ":grinning:": "😀", ":guardsman:": "💂", ":guitar:": "🎸", ":gun:": "🔫", ":haircut:": "💇", ":hamburger:": "🍔", ":hammer:": "🔨", ":hamster:": "🐹", ":hand:": "✋", ":handbag:": "👜", ":hankey:": "💩", ":hash:": "#️⃣", ":hatched_chick:": "🐥", ":hatching_chick:": "🐣", ":headphones:": "🎧", ":hear_no_evil:": "🙉", ":heart:": "❤️", ":heart_decoration:": "💟", ":heart_eyes:": "😍", ":heart_eyes_cat:": "😻", ":heartbeat:": "💓", ":heartpulse:": "💗", ":hearts:": "♥️", ":heavy_check_mark:": "✔️", ":heavy_division_sign:": "➗", ":heavy_dollar_sign:": "💲", ":heavy_exclamation_mark:": "❗️", ":heavy_minus_sign:": "➖", ":heavy_multiplication_x:": "✖️", ":heavy_plus_sign:": "➕", ":helicopter:": "🚁", ":herb:": "🌿", ":hibiscus:": "🌺", ":high_brightness:": "🔆", ":high_heel:": "👠", ":hocho:": "🔪", ":honey_pot:": "🍯", ":honeybee:": "🐝", ":horse:": "🐴", ":horse_racing:": "🏇", ":hospital:": "🏥", ":hotel:": "🏨", ":hotsprings:": "♨️", ":hourglass:": "⌛️", ":hourglass_flowing_sand:": "⏳", ":house:": "🏠", ":house_with_garden:": "🏡", ":hurtrealbad:": ":hurtrealbad:", ":hushed:": "😯", ":ice_cream:": "🍨", ":icecream:": "🍦", ":id:": "🆔", ":ideograph_advantage:": "🉐", ":imp:": "👿", ":inbox_tray:": "📥", ":incoming_envelope:": "📨", ":information_desk_person:": "💁", ":information_source:": "ℹ️", ":innocent:": "😇", ":interrobang:": "⁉️", ":iphone:": "📱", ":it:": "🇮🇹", ":izakaya_lantern:": "🏮", ":jack_o_lantern:": "🎃", ":japan:": "🗾", ":japanese_castle:": "🏯", ":japanese_goblin:": "👺", ":japanese_ogre:": "👹", ":jeans:": "👖", ":joy:": "😂", ":joy_cat:": "😹", ":jp:": "🇯🇵", ":key:": "🔑", ":keycap_ten:": "🔟", ":kimono:": "👘", ":kiss:": "💋", ":kissing:": "😗", ":kissing_cat:": "😽", ":kissing_closed_eyes:": "😚", ":kissing_heart:": "😘", ":kissing_smiling_eyes:": "😙", ":koala:": "🐨", ":koko:": "🈁", ":kr:": "🇰🇷", ":lantern:": "🏮", ":large_blue_circle:": "🔵", ":large_blue_diamond:": "🔷", ":large_orange_diamond:": "🔶", ":last_quarter_moon:": "🌗", ":last_quarter_moon_with_face:": "🌜", ":laughing:": "😆", ":leaves:": "🍃", ":ledger:": "📒", ":left_luggage:": "🛅", ":left_right_arrow:": "↔️", ":leftwards_arrow_with_hook:": "↩️", ":lemon:": "🍋", ":leo:": "♌️", ":leopard:": "🐆", ":libra:": "♎️", ":light_rail:": "🚈", ":link:": "🔗", ":lips:": "👄", ":lipstick:": "💄", ":lock:": "🔒", ":lock_with_ink_pen:": "🔏", ":lollipop:": "🍭", ":loop:": "➿", ":loud_sound:": "🔊", ":loudspeaker:": "📢", ":love_hotel:": "🏩", ":love_letter:": "💌", ":low_brightness:": "🔅", ":m:": "Ⓜ️", ":mag:": "🔍", ":mag_right:": "🔎", ":mahjong:": "🀄️", ":mailbox:": "📫", ":mailbox_closed:": "📪", ":mailbox_with_mail:": "📬", ":mailbox_with_no_mail:": "📭", ":man:": "👨", ":man_with_gua_pi_mao:": "👲", ":man_with_turban:": "👳", ":mans_shoe:": "👞", ":maple_leaf:": "🍁", ":mask:": "😷", ":massage:": "💆", ":meat_on_bone:": "🍖", ":mega:": "📣", ":melon:": "🍈", ":memo:": "📝", ":mens:": "🚹", ":metal:": "🤘", ":metro:": "🚇", ":microphone:": "🎤", ":microscope:": "🔬", ":milky_way:": "🌌", ":minibus:": "🚐", ":minidisc:": "💽", ":mobile_phone_off:": "📴", ":money_with_wings:": "💸", ":moneybag:": "💰", ":monkey:": "🐒", ":monkey_face:": "🐵", ":monorail:": "🚝", ":moon:": "🌔", ":mortar_board:": "🎓", ":mount_fuji:": "🗻", ":mountain_bicyclist:": "🚵", ":mountain_cableway:": "🚠", ":mountain_railway:": "🚞", ":mouse:": "🐭", ":mouse2:": "🐁", ":movie_camera:": "🎥", ":moyai:": "🗿", ":muscle:": "💪", ":mushroom:": "🍄", ":musical_keyboard:": "🎹", ":musical_note:": "🎵", ":musical_score:": "🎼", ":mute:": "🔇", ":nail_care:": "💅", ":name_badge:": "📛", ":neckbeard:": ":neckbeard:", ":necktie:": "👔", ":negative_squared_cross_mark:": "❎", ":neutral_face:": "😐", ":new:": "🆕", ":new_moon:": "🌑", ":new_moon_with_face:": "🌚", ":newspaper:": "📰", ":ng:": "🆖", ":night_with_stars:": "🌃", ":nine:": "9️⃣", ":no_bell:": "🔕", ":no_bicycles:": "🚳", ":no_entry:": "⛔️", ":no_entry_sign:": "🚫", ":no_good:": "🙅", ":no_mobile_phones:": "📵", ":no_mouth:": "😶", ":no_pedestrians:": "🚷", ":no_smoking:": "🚭", ":non-potable_water:": "🚱", ":nose:": "👃", ":notebook:": "📓", ":notebook_with_decorative_cover:": "📔", ":notes:": "🎶", ":nut_and_bolt:": "🔩", ":o:": "⭕️", ":o2:": "🅾️", ":ocean:": "🌊", ":octocat:": ":octocat:", ":octopus:": "🐙", ":oden:": "🍢", ":office:": "🏢", ":ok:": "🆗", ":ok_hand:": "👌", ":ok_woman:": "🙆", ":older_man:": "👴", ":older_woman:": "👵", ":on:": "🔛", ":oncoming_automobile:": "🚘", ":oncoming_bus:": "🚍", ":oncoming_police_car:": "🚔", ":oncoming_taxi:": "🚖", ":one:": "1️⃣", ":open_book:": "📖", ":open_file_folder:": "📂", ":open_hands:": "👐", ":open_mouth:": "😮", ":ophiuchus:": "⛎", ":orange_book:": "📙", ":outbox_tray:": "📤", ":ox:": "🐂", ":package:": "📦", ":page_facing_up:": "📄", ":page_with_curl:": "📃", ":pager:": "📟", ":palm_tree:": "🌴", ":panda_face:": "🐼", ":paperclip:": "📎", ":parking:": "🅿️", ":part_alternation_mark:": "〽️", ":partly_sunny:": "⛅️", ":passport_control:": "🛂", ":paw_prints:": "🐾", ":peach:": "🍑", ":pear:": "🍐", ":pencil:": "📝", ":pencil2:": "✏️", ":penguin:": "🐧", ":pensive:": "😔", ":performing_arts:": "🎭", ":persevere:": "😣", ":person_frowning:": "🙍", ":person_with_blond_hair:": "👱", ":person_with_pouting_face:": "🙎", ":phone:": "☎️", ":pig:": "🐷", ":pig2:": "🐖", ":pig_nose:": "🐽", ":pill:": "💊", ":pineapple:": "🍍", ":pisces:": "♓️", ":pizza:": "🍕", ":point_down:": "👇", ":point_left:": "👈", ":point_right:": "👉", ":point_up:": "☝️", ":point_up_2:": "👆", ":police_car:": "🚓", ":poodle:": "🐩", ":poop:": "💩", ":post_office:": "🏣", ":postal_horn:": "📯", ":postbox:": "📮", ":potable_water:": "🚰", ":pouch:": "👝", ":poultry_leg:": "🍗", ":pound:": "💷", ":pouting_cat:": "😾", ":pray:": "🙏", ":princess:": "👸", ":punch:": "👊", ":purple_heart:": "💜", ":purse:": "👛", ":pushpin:": "📌", ":put_litter_in_its_place:": "🚮", ":question:": "❓", ":rabbit:": "🐰", ":rabbit2:": "🐇", ":racehorse:": "🐎", ":radio:": "📻", ":radio_button:": "🔘", ":rage:": "😡", ":rage1:": ":rage1:", ":rage2:": ":rage2:", ":rage3:": ":rage3:", ":rage4:": ":rage4:", ":railway_car:": "🚃", ":rainbow:": "🌈", ":raised_hand:": "✋", ":raised_hands:": "🙌", ":raising_hand:": "🙋", ":ram:": "🐏", ":ramen:": "🍜", ":rat:": "🐀", ":recycle:": "♻️", ":red_car:": "🚗", ":red_circle:": "🔴", ":registered:": "®️", ":relaxed:": "☺️", ":relieved:": "😌", ":repeat:": "🔁", ":repeat_one:": "🔂", ":restroom:": "🚻", ":revolving_hearts:": "💞", ":rewind:": "⏪", ":ribbon:": "🎀", ":rice:": "🍚", ":rice_ball:": "🍙", ":rice_cracker:": "🍘", ":rice_scene:": "🎑", ":ring:": "💍", ":rocket:": "🚀", ":roller_coaster:": "🎢", ":rooster:": "🐓", ":rose:": "🌹", ":rotating_light:": "🚨", ":round_pushpin:": "📍", ":rowboat:": "🚣", ":ru:": "🇷🇺", ":rugby_football:": "🏉", ":runner:": "🏃", ":running:": "🏃", ":running_shirt_with_sash:": "🎽", ":sa:": "🈂️", ":sagittarius:": "♐️", ":sailboat:": "⛵️", ":sake:": "🍶", ":sandal:": "👡", ":santa:": "🎅", ":satellite:": "📡", ":satisfied:": "😆", ":saxophone:": "🎷", ":school:": "🏫", ":school_satchel:": "🎒", ":scissors:": "✂️", ":scorpius:": "♏️", ":scream:": "😱", ":scream_cat:": "🙀", ":scroll:": "📜", ":seat:": "💺", ":secret:": "㊙️", ":see_no_evil:": "🙈", ":seedling:": "🌱", ":seven:": "7️⃣", ":shaved_ice:": "🍧", ":sheep:": "🐑", ":shell:": "🐚", ":ship:": "🚢", ":shipit:": ":shipit:", ":shirt:": "👕", ":shit:": "💩", ":shoe:": "👞", ":shower:": "🚿", ":signal_strength:": "📶", ":six:": "6️⃣", ":six_pointed_star:": "🔯", ":ski:": "🎿", ":skull:": "💀", ":sleeping:": "😴", ":sleepy:": "😪", ":slot_machine:": "🎰", ":small_blue_diamond:": "🔹", ":small_orange_diamond:": "🔸", ":small_red_triangle:": "🔺", ":small_red_triangle_down:": "🔻", ":smile:": "😄", ":smile_cat:": "😸", ":smiley:": "😃", ":smiley_cat:": "😺", ":smiling_imp:": "😈", ":smirk:": "😏", ":smirk_cat:": "😼", ":smoking:": "🚬", ":snail:": "🐌", ":snake:": "🐍", ":snowboarder:": "🏂", ":snowflake:": "❄️", ":snowman:": "⛄️", ":sob:": "😭", ":soccer:": "⚽️", ":soon:": "🔜", ":sos:": "🆘", ":sound:": "🔉", ":space_invader:": "👾", ":spades:": "♠️", ":spaghetti:": "🍝", ":sparkle:": "❇️", ":sparkler:": "🎇", ":sparkles:": "✨", ":sparkling_heart:": "💖", ":speak_no_evil:": "🙊", ":speaker:": "🔈", ":speech_balloon:": "💬", ":speedboat:": "🚤", ":squirrel:": ":shipit:", ":star:": "⭐️", ":star2:": "🌟", ":stars:": "🌠", ":station:": "🚉", ":statue_of_liberty:": "🗽", ":steam_locomotive:": "🚂", ":stew:": "🍲", ":straight_ruler:": "📏", ":strawberry:": "🍓", ":stuck_out_tongue:": "😛", ":stuck_out_tongue_closed_eyes:": "😝", ":stuck_out_tongue_winking_eye:": "😜", ":sun_with_face:": "🌞", ":sunflower:": "🌻", ":sunglasses:": "😎", ":sunny:": "☀️", ":sunrise:": "🌅", ":sunrise_over_mountains:": "🌄", ":surfer:": "🏄", ":sushi:": "🍣", ":suspect:": ":suspect:", ":suspension_railway:": "🚟", ":sweat:": "😓", ":sweat_drops:": "💦", ":sweat_smile:": "😅", ":sweet_potato:": "🍠", ":swimmer:": "🏊", ":symbols:": "🔣", ":syringe:": "💉", ":tada:": "🎉", ":tanabata_tree:": "🎋", ":tangerine:": "🍊", ":taurus:": "♉️", ":taxi:": "🚕", ":tea:": "🍵", ":telephone:": "☎️", ":telephone_receiver:": "📞", ":telescope:": "🔭", ":tennis:": "🎾", ":tent:": "⛺️", ":thought_balloon:": "💭", ":three:": "3️⃣", ":thumbsdown:": "👎", ":thumbsup:": "👍", ":ticket:": "🎫", ":tiger:": "🐯", ":tiger2:": "🐅", ":tired_face:": "😫", ":tm:": "™️", ":toilet:": "🚽", ":tokyo_tower:": "🗼", ":tomato:": "🍅", ":tongue:": "👅", ":top:": "🔝", ":tophat:": "🎩", ":tractor:": "🚜", ":traffic_light:": "🚥", ":train:": "🚋", ":train2:": "🚆", ":tram:": "🚊", ":triangular_flag_on_post:": "🚩", ":triangular_ruler:": "📐", ":trident:": "🔱", ":triumph:": "😤", ":trolleybus:": "🚎", ":trollface:": ":trollface:", ":trophy:": "🏆", ":tropical_drink:": "🍹", ":tropical_fish:": "🐠", ":truck:": "🚚", ":trumpet:": "🎺", ":tshirt:": "👕", ":tulip:": "🌷", ":turtle:": "🐢", ":tv:": "📺", ":twisted_rightwards_arrows:": "🔀", ":two:": "2️⃣", ":two_hearts:": "💕", ":two_men_holding_hands:": "👬", ":two_women_holding_hands:": "👭", ":u5272:": "🈹", ":u5408:": "🈴", ":u55b6:": "🈺", ":u6307:": "🈯️", ":u6708:": "🈷️", ":u6709:": "🈶", ":u6e80:": "🈵", ":u7121:": "🈚️", ":u7533:": "🈸", ":u7981:": "🈲", ":u7a7a:": "🈳", ":uk:": "🇬🇧", ":ukraine:": "🇺🇦", ":umbrella:": "☔️", ":unamused:": "😒", ":underage:": "🔞", ":unlock:": "🔓", ":up:": "🆙", ":us:": "🇺🇸", ":us_virgin_islands:": "🇻🇮", ":v:": "✌️", ":vertical_traffic_light:": "🚦", ":vhs:": "📼", ":vibration_mode:": "📳", ":video_camera:": "📹", ":video_game:": "🎮", ":violin:": "🎻", ":virgo:": "♍️", ":volcano:": "🌋", ":vs:": "🆚", ":walking:": "🚶", ":walking_man:": "🚶", ":walking_woman:": "🚶\u200D♀", ":wallis_futuna:": "🇼🇫", ":waning_crescent_moon:": "🌘", ":waning_gibbous_moon:": "🌖", ":warning:": "⚠️", ":watch:": "⌚️", ":water_buffalo:": "🐃", ":watermelon:": "🍉", ":wave:": "👋", ":wavy_dash:": "〰️", ":waxing_crescent_moon:": "🌒", ":waxing_gibbous_moon:": "🌔", ":wc:": "🚾", ":weary:": "😩", ":wedding:": "💒", ":whale:": "🐳", ":whale2:": "🐋", ":wheel_of_dharma:": "☸️", ":wheelchair:": "♿️", ":white_check_mark:": "✅", ":white_circle:": "⚪️", ":white_flower:": "💮", ":white_large_square:": "⬜️", ":white_medium_small_square:": "◽️", ":white_medium_square:": "◻️", ":white_small_square:": "▫️", ":white_square_button:": "🔳", ":wilted_flower:": "🥀", ":wind_chime:": "🎐", ":wind_face:": "🌬", ":wine_glass:": "🍷", ":wink:": "😉", ":wolf:": "🐺", ":woman:": "👩", ":womans_clothes:": "👚", ":womans_hat:": "👒", ":womens:": "🚺", ":world_map:": "🗺", ":worried:": "😟", ":wrench:": "🔧", ":x:": "❌", ":yellow_heart:": "💛", ":yen:": "💴", ":yum:": "😋", ":zap:": "⚡️", ":zero:": "0️⃣", ":zzz:": "💤" }));
function renderEmoji(str) {
  //   console.log(str)
    var chunks = str.split(/(\s+)/);
 
  
    return chunks
        .map(function (chunk) { return symbolToEmoji.has(chunk) ? symbolToEmoji.get(chunk) : chunk; })
        .join("");
}
 

function EmojiParser(parser){
  
  
  /// To-Do (add more options for parsing in)
  if (parser==null){
    
// https://stackoverflow.com/questions/54338168/js-jquery-replace-inner-text-without-destroy-event
function replaceTextNodes(elm) {
  elm.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      // Text node:
      node.textContent = node.textContent.replace(node.textContent, renderEmoji(node.textContent));
    } else if (node.nodeType === 1) {
      // Element node, recurse:
      replaceTextNodes(node);
    }
  });
}
replaceTextNodes(document.body);
    
  } 
  
 
}


window.addEventListener("load", EmojiParser());
