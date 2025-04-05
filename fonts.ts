import {
  Inter,
  Poppins,
  Montserrat,
  Rubik,
  Raleway,
  Playfair_Display,
  Lora,
  EB_Garamond,
  Caveat,
  Pacifico,
  Dancing_Script,
  Shadows_Into_Light,
  Great_Vibes,
  Yellowtail,
  Courgette,
  Amatic_SC,
  Indie_Flower,
  Gloria_Hallelujah,
  Bebas_Neue,
  Abril_Fatface,
  Anton,
  Fredoka,
  Luckiest_Guy,
  Bungee,
  Press_Start_2P,
  Monoton,
} from "next/font/google";

// Sans-serif
const inter = Inter({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });
const rubik = Rubik({ subsets: ["latin"], weight: ["400"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["400"] });

// Serif
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});
const lora = Lora({ subsets: ["latin"], weight: ["400"] });
const eb_garamond = EB_Garamond({ subsets: ["latin"], weight: ["400"] });

// Manuscrites
const caveat = Caveat({ subsets: ["latin"], display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
const dancing_script = Dancing_Script({ subsets: ["latin"], weight: ["400"] });
const shadows_into_light = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
});
const great_vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: ["400"] });
const courgette = Courgette({ subsets: ["latin"], weight: ["400"] });
const amatic = Amatic_SC({ subsets: ["latin"], weight: ["400"] });
const indie_flower = Indie_Flower({ subsets: ["latin"], weight: ["400"] });
const gloria = Gloria_Hallelujah({ subsets: ["latin"], weight: ["400"] });

// Display / Fantaisie
const bebas_neue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400"] });
const luckiest_guy = Luckiest_Guy({ subsets: ["latin"], weight: ["400"] });
const bungee = Bungee({ subsets: ["latin"], weight: ["400"] });
const press_start = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });
const monoton = Monoton({ subsets: ["latin"], weight: ["400"] });

export const options = [
  // --- Sans-serif ---
  {
    label: "Inter",
    fontFamily: inter.style.fontFamily,
    className: inter.className,
  },
  {
    label: "Poppins",
    fontFamily: poppins.style.fontFamily,
    className: poppins.className,
  },
  {
    label: "Montserrat",
    fontFamily: montserrat.style.fontFamily,
    className: montserrat.className,
  },
  {
    label: "Rubik",
    fontFamily: rubik.style.fontFamily,
    className: rubik.className,
  },
  {
    label: "Raleway",
    fontFamily: raleway.style.fontFamily,
    className: raleway.className,
  },

  // --- Serif ---
  {
    label: "Playfair Display",
    fontFamily: playfair_display.style.fontFamily,
    className: playfair_display.className,
  },
  {
    label: "Lora",
    fontFamily: lora.style.fontFamily,
    className: lora.className,
  },
  {
    label: "EB Garamond",
    fontFamily: eb_garamond.style.fontFamily,
    className: eb_garamond.className,
  },

  // --- Manuscrites ---
  {
    label: "Caveat",
    fontFamily: caveat.style.fontFamily,
    className: caveat.className,
  },
  {
    label: "Pacifico",
    fontFamily: pacifico.style.fontFamily,
    className: pacifico.className,
  },
  {
    label: "Dancing Script",
    fontFamily: dancing_script.style.fontFamily,
    className: dancing_script.className,
  },
  {
    label: "Shadows Into Light",
    fontFamily: shadows_into_light.style.fontFamily,
    className: shadows_into_light.className,
  },
  {
    label: "Great Vibes",
    fontFamily: great_vibes.style.fontFamily,
    className: great_vibes.className,
  },
  {
    label: "Yellowtail",
    fontFamily: yellowtail.style.fontFamily,
    className: yellowtail.className,
  },
  {
    label: "Courgette",
    fontFamily: courgette.style.fontFamily,
    className: courgette.className,
  },
  {
    label: "Amatic SC",
    fontFamily: amatic.style.fontFamily,
    className: amatic.className,
  },
  {
    label: "Indie Flower",
    fontFamily: indie_flower.style.fontFamily,
    className: indie_flower.className,
  },
  {
    label: "Gloria Hallelujah",
    fontFamily: gloria.style.fontFamily,
    className: gloria.className,
  },

  // --- Display / Fantaisie ---
  {
    label: "Bebas Neue",
    fontFamily: bebas_neue.style.fontFamily,
    className: bebas_neue.className,
  },
  {
    label: "Abril Fatface",
    fontFamily: abril_fatface.style.fontFamily,
    className: abril_fatface.className,
  },
  {
    label: "Anton",
    fontFamily: anton.style.fontFamily,
    className: anton.className,
  },
  {
    label: "Fredoka",
    fontFamily: fredoka.style.fontFamily,
    className: fredoka.className,
  },
  {
    label: "Luckiest Guy",
    fontFamily: luckiest_guy.style.fontFamily,
    className: luckiest_guy.className,
  },
  {
    label: "Bungee",
    fontFamily: bungee.style.fontFamily,
    className: bungee.className,
  },
  {
    label: "Press Start 2P",
    fontFamily: press_start.style.fontFamily,
    className: press_start.className,
  },
  {
    label: "Monoton",
    fontFamily: monoton.style.fontFamily,
    className: monoton.className,
  },
];
