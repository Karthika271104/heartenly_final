export const onboardingData = {
  languages: ["Tamil", "English", "Hindi", "Telugu", "Malayalam", "Kannada"],
  categories: ["Memes", "Music", "Cinema", "Books", "Tech", "Cooking", "Fitness", "Nature", "Art", "Sports", "Gaming"]
};

export const categoryMetadata = {
  Memes: {
    id: "memes",
    label: "Memes & Humour",
    icon: "fa-face-laugh-squint",
    hashtags: ["tamilmemes", "funny", "laugh", "trendingsongs"],
    links: [
      { label: "Trending Tamil Memes", url: "https://www.instagram.com/explore/tags/tamilmemes/" },
      { label: "Daily Dose of Humour", url: "https://9gag.com" }
    ]
  },
  Music: {
    id: "music",
    label: "Music & Beats",
    icon: "fa-music",
    hashtags: ["tamilmusic", "bgm", "feelingsongs", "melody"],
    links: [
      { label: "Peaceful Melodies Playlist", url: "https://youtube.com/results?search_query=peaceful+melody+songs+tamil" },
      { label: "Spotify Top Hits Tamil", url: "https://open.spotify.com/playlist/37i9dQZF1DX48wuvvIG49g" }
    ]
  },
  Cinema: {
    id: "cinema",
    label: "Cinema & Popcorn",
    icon: "fa-film",
    hashtags: ["cinema", "moviereview", "blockbuster", "movieclips"],
    links: [
      { label: "Behindwoods Movie News", url: "https://www.behindwoods.com/" },
      { label: "Galatta Cinema Updates", url: "https://www.galatta.com/" }
    ]
  },
  Books: {
    id: "books",
    label: "Books & Literature",
    icon: "fa-book-open",
    hashtags: ["bookstagram", "booksrecommendations", "reading", "tamilbooks"],
    links: [
      { label: "Goodreads Top Book Recommendations", url: "https://www.goodreads.com" },
      { label: "Tamil Novel Collections", url: "https://www.noolulagam.com" }
    ]
  },
  Tech: {
    id: "tech",
    label: "Tech & Gadgets",
    icon: "fa-laptop-code",
    hashtags: ["tech", "gadgets", "coding", "softwaredevelopment"],
    links: [
      { label: "TechCrunch News", url: "https://techcrunch.com" },
      { label: "AI & Coding Skills", url: "https://coursera.org" }
    ]
  },
  Cooking: {
    id: "cooking",
    label: "Cooking & Recipes",
    icon: "fa-utensils",
    hashtags: ["cooking", "recipes", "foodie", "tamilcooking"],
    links: [
      { label: "Simple Cooking Recipes", url: "https://youtube.com/results?search_query=tamil+recipes+simple" },
      { label: "Venkatesh Bhat Cooking", url: "https://youtube.com/results?search_query=Venkatesh+Bhat+Idhayam+Thotta+Samayal" }
    ]
  },
  Fitness: {
    id: "fitness",
    label: "Fitness & Workouts",
    icon: "fa-person-running",
    hashtags: ["fitnessmotivation", "bodybuilding", "workout", "viralreels"],
    links: [
      { label: "Trending Fitness Workouts", url: "https://youtube.com/results?search_query=trending+fitness+workouts+2024" },
      { label: "Daily Gym Motivation", url: "https://www.instagram.com/explore/tags/gymmotivation/" }
    ]
  },
  Nature: {
    id: "nature",
    label: "Nature & Travel",
    icon: "fa-tree",
    hashtags: ["nature", "travelgram", "scenic", "peacefulnature"],
    links: [
      { label: "Beautiful Nature Videos", url: "https://youtube.com/results?search_query=nature+relaxing+4k" },
      { label: "National Geographic Travel", url: "https://www.nationalgeographic.com/travel" }
    ]
  },
  Art: {
    id: "art",
    label: "Art & Drawing",
    icon: "fa-palette",
    hashtags: ["art", "drawing", "painting", "artistsoninstagram"],
    links: [
      { label: "Art Inspiration Gallery", url: "https://pinterest.com" },
      { label: "Satisfying Painting Videos", url: "https://youtube.com/results?search_query=satisfying+art+painting" }
    ]
  },
  Sports: {
    id: "sports",
    label: "Sports & Games",
    icon: "fa-volleyball",
    hashtags: ["sports", "cricket", "football", "highlights"],
    links: [
      { label: "ESPN Cricinfo Live Scores", url: "https://www.espncricinfo.com" },
      { label: "Sky Sports Highlights", url: "https://youtube.com/@SkySports" }
    ]
  },
  Gaming: {
    id: "gaming",
    label: "Gaming & Esports",
    icon: "fa-gamepad",
    hashtags: ["gaming", "gamer", "esports", "ps5"],
    links: [
      { label: "Twitch Live Streams", url: "https://www.twitch.tv" },
      { label: "IGN Gaming Reviews", url: "https://www.ign.com" }
    ]
  },
  Mental: {
    id: "mental",
    label: "Mental Wellness",
    icon: "fa-brain",
    hashtags: ["mindfulness", "meditation", "anxietyrelief", "mentalhealth"],
    links: [
      { label: "Mindfulness & Peace", url: "https://headspace.com" },
      { label: "Anxiety Relief Journaling", url: "https://dayoneapp.com" }
    ]
  }
};

export const translations = {
  English: { intro: "Welcome. Your AI Emotional Companion.", start: "Let's Begin", scan: "AI Scan", world: "Your World", updates: "My Updates", face: "Face", mic: "Mic", text: "Text", analyze: "Analyze My Emotion", detected: "Detected: ", ready: "Ready" },
  Tamil: { intro: "Heartenly-க்கு வரவேற்கிறோம். உங்கள் AI வழிகாட்டி.", start: "தொடங்கலாம்", scan: "AI ஸ்கேன்", world: "உங்கள் உலகம்", updates: "பதிவுகள்", face: "முகம்", mic: "ஒலி", text: "உரை", analyze: "என் உணர்ச்சியை ஆராய்", detected: "கண்டறியப்பட்டது: ", ready: "தயார்" }
};
