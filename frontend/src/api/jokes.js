// import axios from "axios";

// const baseUrl = "https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=nsfw,racist,sexist"

export const getAll = () => {
  let data = rawData[Math.round(Math.random() * rawData.length - 1)]
  while (data === undefined) {
    data = rawData[Math.round(Math.random() * rawData.length - 1)];
  }
  return [data.question, data.answer];
}

const rawData = [{
    "question": "What does Santa suffer from if he gets stuck in a chimney?",
    "answer": "Claus-trophobia!"
  },
  {
    "question": "What happened to the man who stole an Advent Calendar?",
    "answer": "He got 25 days!"
  },
  {
    "question": "Who delivers presents to baby sharks at Christmas?",
    "answer": "Santa Jaws!"
  },
  {
    "question": "What do they sing at a snowman’s birthday party?",
    "answer": "Freeze a jolly good fellow!"
  },
  {
    "question": "What do Santa’s little helpers learn at school?",
    "answer": "The elf-abet!"
  },
  {
    "question": "What kind of motorbike does Santa ride?",
    "answer": "A Holly Davidson!"
  },
  {
    "question": "What did Santa do when he went speed dating?",
    "answer": "He pulled a cracker!"
  },
  {
    "question": "Why was the turkey in the pop group?",
    "answer": "Because he was the only one with drumsticks!"
  },
  {
    "question": "What do you get if you cross Santa with a duck?",
    "answer": "A Christmas Quacker!"
  },
  {
    "question": "What goes “Oh, Oh, Oh”?",
    "answer": "Santa walking backwards!"
  },
  {
    "question": "Why was the snowman looking through the carrots?",
    "answer": "He was picking his nose!"
  },
  {
    "question": "Why does Santa have three gardens?",
    "answer": "So he can ‘ho ho ho’!"
  },
  {
    "question": "What is the best Christmas present in the world?",
    "answer": "A broken drum, you just can’t beat it!"
  },
  {
    "question": "What do snowmen wear on their heads?",
    "answer": "Ice caps!"
  },
  {
    "question": "What did Adam say the day before Christmas?",
    "answer": "“It’s Christmas, Eve!”"
  },
  {
    "question": "What do you get when you cross a snowman with a vampire?",
    "answer": "Frostbite!"
  },
  {
    "question": "What did the stamp say to the Christmas card?",
    "answer": "Stick with me and we’ll go places!"
  },
  {
    "question": "Why did no one bid for Rudolph and Blitzen on eBay?",
    "answer": "Because they were two deer!"
  },
  {
    "question": "What does the Queen call her Christmas Broadcast?",
    "answer": "The One Show!"
  },
  {
    "question": "Why don’t you ever see Santa in hospital?",
    "answer": "Because he has private elf care!"
  },
  {
    "question": "How did Mary and Joseph know Jesus’ weight when he was born?",
    "answer": "They had a weigh in a manger!"
  },
  {
    "question": "Why is it getting harder to buy Advent calendars?",
    "answer": "Their days are numbered!"
  },
  {
    "question": "How did Scrooge win the football game?",
    "answer": "The ghost of Christmas passed!"
  },
  {
    "question": "What do angry mice send to each other at Christmas?",
    "answer": "Cross-mouse cards!"
  },
  {
    "question": "What do you call a bunch of chess players bragging about their games in a hotel lobby?",
    "answer": "Chess nuts boasting in an open foyer!"
  },
  {
    "question": "What did the beaver say to the Christmas Tree?",
    "answer": "Nice gnawing you!"
  },
  {
    "question": "What does Miley Cyrus have at Christmas?",
    "answer": "Twerky!"
  },
  {
    "question": "What does Santa do with out of shape elves?",
    "answer": "Sends them to an elf Farm."
  },
  {
    "question": "Why did Santa’s helper see the doctor?",
    "answer": "Because he had a low “elf” esteem!"
  },
  {
    "question": "Who hides in the bakery at Christmas?",
    "answer": "A mince spy!"
  },
  {
    "question": "How do snowmen get around?",
    "answer": "They ride an icicle!"
  },
  {
    "question": "What do snowmen have for breakfast?",
    "answer": "Snowflakes!"
  },
  {
    "question": "What does Santa do when his elves misbehave?",
    "answer": "He gives them the sack!"
  },
  {
    "question": "What did Santa say to the smoker?",
    "answer": "Please don’t smoke, it’s bad for my elf!"
  },
  {
    "question": "What do you get if you eat Christmas decorations?",
    "answer": "Tinsilitis!"
  },
  {
    "question": "What’s the most popular Christmas wine?",
    "answer": "‘But I don’t like Brussels sprouts!’"
  },
  {
    "question": "What’s green, covered in tinsel and goes ribbet ribbet?",
    "answer": "A mistle-toad!"
  },
  {
    "question": "Which famous playwright was terrified of Christmas?",
    "answer": "Noël Coward!"
  },
  {
    "question": "What carol is heard in the desert?",
    "answer": "‘O camel ye faithful!’"
  },
  {
    "question": "How many letters are in the Christmas alphabet?",
    "answer": "Only 25, there’s no L!"
  },
  {
    "question": "What do reindeer hang on their Christmas trees?",
    "answer": "Horn-aments!"
  },
  {
    "question": "Why are Christmas trees so bad at sewing?",
    "answer": "They always drop their needles!"
  },
  {
    "question": "How will Christmas dinner be different after Brexit?",
    "answer": "No Brussels!"
  },
  {
    "question": "How does Christmas Day end?",
    "answer": "With the letter Y!"
  },
  {
    "question": "What happened to the turkey at Christmas?",
    "answer": "It got gobbled!"
  },
  {
    "question": "What do snowmen eat for lunch?",
    "answer": "Icebergers!"
  },
  {
    "question": "When is a boat just like snow?",
    "answer": "When it’s adrift!"
  },
  {
    "question": "Who delivers presents to cats?",
    "answer": "Santa Paws!"
  },
  {
    "question": "Why did the turkey cross the road?",
    "answer": "Because it was the chicken’s day off!"
  },
  {
    "question": "What do you get if you cross Santa with a detective?",
    "answer": "Santa Clues!"
  },
  {
    "question": "What goes Ho Ho Whoosh, Ho Ho Whoosh?",
    "answer": "Santa going through a revolving door!"
  },
  {
    "question": "What is Santa’s favourite place to deliver presents?",
    "answer": "Idaho-ho-ho!"
  },
  {
    "question": "What do you call buying a piano for the holidays?",
    "answer": "Christmas Chopin!"
  },
  {
    "question": "What’s a child’s favourite king at Christmas?",
    "answer": "A stoc-king!"
  },
  {
    "question": "Who is Santa’s favourite singer?",
    "answer": "Elf-is Presley!"
  },
  {
    "question": "Why couldn’t the skeleton go to the Christmas Party?",
    "answer": "Because he had no body to go with!"
  },
  {
    "question": "How does Darth Vader enjoy his Christmas Turkey?",
    "answer": "On the dark side!"
  },
  {
    "question": "Who’s Rudolph’s favourite pop star?",
    "answer": "Beyon-sleigh!"
  },
  {
    "question": "What do monkeys sing at Christmas?",
    "answer": "Jungle bells!"
  },
  {
    "question": "Who do Santa’s helpers call when they’re ill?",
    "answer": "The National Elf Service!"
  },
  {
    "question": "What is white and minty?",
    "answer": "A polo bear!"
  },
  {
    "question": "Why did Scrooge keep a pet lamb?",
    "answer": "Because it would say, “Baaaaahh humbug!”"
  },
  {
    "question": "Who is a Christmas tree’s favorite singer?",
    "answer": "Spruce Springsteen!"
  },
  {
    "question": "What cars do elves drive?",
    "answer": "Toyotas!"
  },
  {
    "question": "What is Santa’s primary language?",
    "answer": "North Polish."
  },
  {
    "question": "What do reindeer say before they tell a joke?",
    "answer": "This one will sleigh you!"
  },
  {
    "question": "How do you lift a frozen car?",
    "answer": "With a Jack Frost!"
  },
  {
    "question": "Which holiday mascot has the least spare change?",
    "answer": "St. Nickel-less!"
  },
  {
    "question": "What would you call an elf who just has won the lottery?",
    "answer": "Welfy!"
  },
  {
    "question": "How did the bauble get addicted to Christmas?",
    "answer": "He was hooked on trees his whole life!"
  },
  {
    "question": "What do you call an obnoxious reindeer?",
    "answer": "Rude-olph!"
  },
  {
    "question": "Why are Christmas trees so fond of the past?",
    "answer": "Because the present’s beneath them!"
  },
  {
    "question": "What do you call a kid who doesn’t believe in Santa?",
    "answer": "A rebel without a Claus!"
  },
  {
    "question": "Why does Santa go down the chimney?",
    "answer": "Because it soots him!"
  },
  {
    "question": "What did Mrs. Claus say to Santa Claus when she looked up in the sky?",
    "answer": "Looks like rain, dear!"
  },
  {
    "question": "Why did Santa get a parking ticket on Christmas Eve?",
    "answer": "He left his sleigh in a snow parking zone!"
  },
  {
    "question": "What do you call Santa living at the South Pole?",
    "answer": "A lost clause!"
  },
  {
    "question": "What part of the body do you only see during Christmas?",
    "answer": "Mistletoe!"
  },
  {
    "question": "What do the elves cook with in the kitchen?",
    "answer": "Utinsels!"
  },
  {
    "question": "What’s the difference between Santa Clause and a knight?",
    "answer": "One slays a dragon, the other drags a sleigh!"
  },
  {
    "question": "What do you call cutting down a Christmas tree?",
    "answer": "Christmas chopping!"
  },
  {
    "question": "Where do Santa and his reindeer go to get hot chocolate while flying in the sky?",
    "answer": "Star-bucks."
  },
  {
    "question": "What do sheep say at Christmas?",
    "answer": "A Merry Christmas to Ewe!"
  },
  {
    "question": "Why is everyone so thirsty at the north pole?",
    "answer": "There’s o well, no well!"
  },
  {
    "question": "Which football team did the baby Jesus support?",
    "answer": "Manger-ster United!"
  },
  {
    "question": "What do you get if you cross a Christmas tree with an apple?",
    "answer": "A pineapple!"
  },
  {
    "question": "Why is winter a snowman’s favourite time of year?",
    "answer": "Because they can camouflage!"
  },
  {
    "question": "What do vampires sing on New Year’s Eve?",
    "answer": "Auld Fang Syne!"
  },
  {
    "question": "What athlete is warmest in winter?",
    "answer": "A long jumper!"
  },
  {
    "question": "What do you get if you cross a bell with a skunk?",
    "answer": "Jingle Smells!"
  },
  {
    "question": "What do you get when you cross a deer with rain?",
    "answer": "A reindeer!"
  },
  {
    "question": "What’s worse than Rudolph with a runny nose?",
    "answer": "Frosty the Snowman with a hot flush!"
  },
  {
    "question": "What is the most competitive season?",
    "answer": "Win-ter!"
  },
  {
    "question": "What type of key do you need for a Nativity play?",
    "answer": "A don-key!"
  },
  {
    "question": "Why don’t penguins fly?",
    "answer": "Because they’re not tall enough to be pilots!"
  },
  {
    "question": "What did the Christmas tree say to the ornament?",
    "answer": "Quit hanging around!"
  },
  {
    "question": "Why wouldn’t the cat climb the Christmas tree?",
    "answer": "It was afraid of the bark."
  },
  {
    "question": "Why was Theresa May sacked as nativity manager?",
    "answer": "She couldn’t run a stable government!"
  },
  {
    "question": "Why don’t Southern Rail train guards share advent calendars?",
    "answer": "They want to open the doors themselves!"
  },
  {
    "question": "What’s the difference between Ryanair and Santa?",
    "answer": "Santa flies at least once a year!"
  },
  {
    "question": "Why is Kim Jong Un playing Santa in the South's annual pantomime this year?",
    "answer": "He said he fancied a Korea change!"
  },
  {
    "question": "Why did Donald Trump continuously decorate the Christmas tree?",
    "answer": "Because people kept saying “moron” to him!"
  },
  {
    "question": "Why was the planned Ryanair TV documentary scrapped?",
    "answer": "They were unable to air a pilot!"
  },
  {
    "question": "Which TV Christmas special is being filmed in Brussels this year?",
    "answer": "Deal Or No Deal!"
  },
  {
    "question": "Theresa May has asked Santa for a home makeover this year. First thing on the list was a new Cabinet!?"
  },
  {
    "question": "What did Bruce Forsyth say when the Christmas pheasant repeated on him?",
    "answer": "“Good game, good game!”"
  },
  {
    "question": "Why did Jeremy Corbyn ask people not to eat sprouts on Christmas Day?",
    "answer": "He wants to give peas a chance!"
  },
  {
    "question": "What does Donald Trump do after he pulls a cracker?",
    "answer": "Pays her off!"
  },
  {
    "question": "Why has Debenhams been forced to cancel its Christmas nativity play?",
    "answer": "No prophet!"
  },
  {
    "question": "Why has Boris Johnson bought mistletoe this year?",
    "answer": "Because he’s tired of being in the single market!"
  }
]