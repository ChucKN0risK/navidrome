// This file is to generate a m3u playlist file from
// a list of tracks in JSON.

const { execSync } = require("child_process");

const playlist = [
  {
    "Title": "Strings For Life",
    "Artist": "Oliver Dollar",
    "Album": "Strings For Life",
    "Duration": "06:50"
  },
  {
    "Title": "Dromedary Twist",
    "Artist": "Session Victim",
    "Album": "The Intangibles",
    "Duration": "06:09"
  },
  {
    "Title": "Oldskool",
    "Artist": "Skatman",
    "Album": "Rewarped",
    "Duration": "05:47"
  },
  {
    "Title": "Red D 'Fantasize' (Kiani & His Legion Remix)",
    "Artist": "Red D",
    "Album": "Red D 'Re-Fantasized & Realized'",
    "Duration": "07:21"
  },
  {
    "Title": "Le Chat",
    "Artist": "Pussycat",
    "Album": "Le Chat",
    "Duration": "06:11"
  },
  {
    "Title": "Nothing On Me",
    "Artist": "Maz (BR), APACHE (FR), MAXI MERAKI, Tabia",
    "Album": "Nothing On Me",
    "Duration": "07:25"
  },
  {
    "Title": "I Can't Go For That (Extended Mix)",
    "Artist": "Mark Knight & Gene Farris",
    "Album": "I Can't Go for That",
    "Duration": "06:47"
  },
  {
    "Title": "Carousel (Phil Kieran Mix)",
    "Artist": "Le Carousel",
    "Album": "Carousel EP",
    "Duration": "06:32"
  },
  {
    "Title": "Kos",
    "Artist": "Julian Stetter",
    "Album": "Kos EP",
    "Duration": "06:26"
  },
  {
    "Title": "Majik",
    "Artist": "REj",
    "Album": "Majik EP",
    "Duration": "05:58"
  },
  {
    "Title": "Paris (Original Mix)",
    "Artist": "Meloko, Utli, Mont Rouge",
    "Album": "Paris",
    "Duration": "07:00"
  },
  {
    "Title": "Children Of 95",
    "Artist": "Tal Fussman",
    "Album": "Children Of 95",
    "Duration": "05:58"
  },
  {
    "Title": "4AM Rush",
    "Artist": "Levon Vincent",
    "Album": "So Good!",
    "Duration": "10:04"
  },
  {
    "Title": "Clair de Lune (feat. Christine Hoberg) (Dixon Remix)",
    "Artist": "Flight Facilities, Christine Hoberg, Dixon",
    "Album": "Clair de Lune (feat. Christine Hoberg) [Dixon Remix]",
    "Duration": "06:54"
  },
  {
    "Title": "Prism (Original Mix)",
    "Artist": "Satoshi Fumi",
    "Album": "Prism EP",
    "Duration": "06:09"
  },
  {
    "Title": "Comportamento",
    "Artist": "Frankey & Sandrino",
    "Album": "Comportamento",
    "Duration": "07:04"
  },
  {
    "Title": "Can't Stop",
    "Artist": "Jonathan Kaspar",
    "Album": "Can't Stop",
    "Duration": "11:24"
  },
  {
    "Title": "Can't Stop (Mano Le Tough Remix)",
    "Artist": "Jonathan Kaspar",
    "Album": "Can't Stop",
    "Duration": "06:09"
  },
  {
    "Title": "Peace My Brother Feat. Bam (Jungle Brothers) (Red Mix)",
    "Artist": "Ashley Beedle And Darren Morris",
    "Album": "Zepherin Saint Presents Soulful Culture 2",
    "Duration": "07:08"
  },
  {
    "Title": "More Love (Rampa &ME Remix)",
    "Artist": "Moderat & Keinemusik",
    "Album": "More Love (Rampa &ME Remix)",
    "Duration": "06:12"
  },
  {
    "Title": "Spaghetti Circus",
    "Artist": "Still Going",
    "Album": "Spaghetti Circus / Untitled Love",
    "Duration": "05:47"
  },
  {
    "Title": "Duration",
    "Artist": "Barnt / Michael Mayer",
    "Album": "Speicher 125",
    "Duration": "08:11"
  },
  {
    "Title": "Radha (Whitesquare Remix)",
    "Artist": "The Organism",
    "Album": "Radha EP",
    "Duration": "07:32"
  },
  {
    "Title": "Let It B (Mr Tophat & Art Alfie Remix)",
    "Artist": "Santos",
    "Album": "Snatch! OFF13",
    "Duration": "10:51"
  },
  {
    "Title": "High Speed ft. Fantastic Twins",
    "Artist": "Red Axes",
    "Album": "One More City",
    "Duration": "04:33"
  },
  {
    "Title": "Superstitious Thoughts",
    "Artist": "Skatman",
    "Album": "Superstitious Thoughts EP",
    "Duration": "05:56"
  },
  {
    "Title": "Do You",
    "Artist": "Tal Fussman, Skatman",
    "Album": "Do You EP",
    "Duration": "06:11"
  },
  {
    "Title": "Telepathy",
    "Artist": "Tal Fussman, Skatman",
    "Album": "Do You EP",
    "Duration": "06:26"
  },
  {
    "Title": "Could You Feel The Love? feat. Filippo Nardini",
    "Artist": "Ivory",
    "Album": "Secret Weapons Part 16",
    "Duration": "06:16"
  },
  {
    "Title": "Essentia (Extended Version)",
    "Artist": "Krystal Klear",
    "Album": "Essentia EP",
    "Duration": "07:44"
  },
  {
    "Title": "Silhouette",
    "Artist": "David Bau",
    "Album": "Silhouette",
    "Duration": "06:19"
  },
  {
    "Title": "Energy Bliss",
    "Artist": "Nyra",
    "Album": "Canoe014",
    "Duration": "06:21"
  },
  {
    "Title": "Timber (Maceo Plex Remix)",
    "Artist": "Coldcut",
    "Album": "Timber (Maceo Plex Remix)",
    "Duration": "07:46"
  },
  {
    "Title": "Sacrifice (remastered)",
    "Artist": "BREAK 3000",
    "Album": "Electro Archive 2",
    "Duration": "06:36"
  },
  {
    "Title": "Anything Anytime (Voigt & Voigt Mix)",
    "Artist": "DJ Hell",
    "Album": "Speicher 130",
    "Duration": "06:23"
  },
  {
    "Title": "Depressed",
    "Artist": "Skatman",
    "Album": "Secret Weapons Part 16",
    "Duration": "05:21"
  },
  {
    "Title": "Drone Logic (2023 Redux)",
    "Artist": "Daniel Avery",
    "Album": "Drone Logic (2023 Redux Versions)",
    "Duration": "07:59"
  },
  {
    "Title": "Fences",
    "Artist": "DD3",
    "Album": "Fences ATCX",
    "Duration": "08:26"
  },
  {
    "Title": "String Theory",
    "Artist": "Phil Hent",
    "Album": "String Theory",
    "Duration": "11:45"
  },
  {
    "Title": "Talk To Me (Dino Lenny & Damon Jee Mix)",
    "Artist": "Dino Lenny",
    "Album": "Between My Eyes and Your Lips",
    "Duration": "07:20"
  },
  {
    "Title": "ESC (with Jasnau) Prins Thomas Diskomiks",
    "Artist": "Lauer",
    "Album": "Borndom Remixes",
    "Duration": "07:30"
  }
];

const cleanDuration = (duration) => {
  let dur = duration;
  if (duration.length == 5) {
    dur = `00:${duration}`; // your input string
  }
  const a = dur.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  return seconds;
};

let count = 0;

const m3u = playlist.reduce((acc, track) => {
  console.log(track);
  const cleanTrack = {
    title: track.Title,
    artist: track.Artist,
    album: track.Album,
    duration: cleanDuration(track.Duration),
  };
  const path = execSync(
    `find /Users/lucho/Music/Music -iname "*${cleanTrack.title}.mp3*"`,
    { encoding: "utf8" }
  );
  console.log(path)
  if (path) {
    count++;
    acc += `#EXTINF:${cleanTrack.duration},${cleanTrack.album} - ${cleanTrack.artist}\n${path}`;
  } else {
    console.log(`⛔️⛔️⛔️⛔️ Not Found ${cleanTrack.title}`)
    acc += `#EXTINF:${cleanTrack.duration},${cleanTrack.album} - ${cleanTrack.artist}\n⛔️⛔️⛔️⛔️ Not Found\n`;
  }
  console.log(`find /Users/lucho/Music/Music -iname "${cleanTrack.title}.mp3"`)
  // console.log(JSON.stringify(cleanTrack));
  return acc;
}, '');

console.log(`${count}/${playlist.length}`);
console.log(m3u);
