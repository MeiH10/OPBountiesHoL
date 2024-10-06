import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          window.innerWidth < 768
            ? 'https://i.ibb.co/ckTSJxN/one-piece-enel-face.jpg'
            : 'https://i.ibb.co/NF5ywqL/Enel-Shocked-Face.png'
        })`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <h1 className="text-5xl font-bold mb-6 z-20 text-red-600">Game Over!</h1>
      <p className="text-2xl mb-4 text-white z-20">Your final score: <span className="font-bold">{score}</span></p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white z-20 px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
