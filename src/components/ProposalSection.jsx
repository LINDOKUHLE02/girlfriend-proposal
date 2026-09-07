import { useState } from "react";
import Confetti from "react-confetti";

export default function ProposalSection() {

  const [yes, setYes] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-pink-950 text-white flex flex-col items-center justify-center">

      {yes && <Confetti />}

      <h1 className="text-6xl font-bold text-center">
        Dimpho ❤️
      </h1>

      <p className="text-2xl mt-10 max-w-xl text-center">
        Will you be my girlfriend?
      </p>

      {!yes ? (
        <button
          onClick={() => setYes(true)}
          className="mt-10 bg-pink-600 px-10 py-4 rounded-2xl text-xl"
        >
          YES ❤️
        </button>
      ) : (
        <div className="text-center">
          <h2 className="text-6xl mt-10">
            🎉 SHE SAID YES 🎉
          </h2>

          <p className="mt-6 text-2xl">
            This is officially one of the happiest moments of my life ❤️
          </p>
        </div>
      )}

    </section>
  );
}