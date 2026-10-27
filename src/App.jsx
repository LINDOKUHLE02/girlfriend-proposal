import Hero from "./components/Hero";
import HowWeMet from "./components/HowWeMet";
import MemoryTimeline from "./components/MemoryTimeline";
import LittleThings from "./components/LittleThings";
import Gallery from "./components/Gallery";
import DedicationSongs from "./components/DedicationSongs";
import WhereWeAreNow from "./components/WhereWeAreNow";
import WhereWereGoing from "./components/WhereWereGoing";
import Proposal from "./components/Proposal";
import FloatingHearts from "./components/FloatingHearts";
import Footer from "./components/Footer";
import MusicControl from "./components/MusicControl";
import { MusicProvider } from "./components/MusicContext";

function App() {
  return <MusicProvider><main><FloatingHearts /><MusicControl /><Hero /><HowWeMet /><MemoryTimeline /><LittleThings /><Gallery /><DedicationSongs /><WhereWeAreNow /><WhereWereGoing /><Proposal /><Footer /></main></MusicProvider>;
}

export default App;