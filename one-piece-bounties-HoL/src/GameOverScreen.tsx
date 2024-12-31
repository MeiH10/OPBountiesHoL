import React from 'react';
import { Character } from './types';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  currentCharacter: Character;
  nextCharacter: Character;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  onRestart, 
  currentCharacter, 
  nextCharacter 
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          window.innerWidth < 768
            ? 'https://i.ibb.co/Hxr6828/one-piece-enel-face.jpg'
            : 'https://i.ibb.co/qJ5CzJQ/Enel-Shocked-Face-2.png'
        })`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="z-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-red-600">Game Over!</h1>
        <p className="text-2xl mb-4 text-white">Your final score: <span className="font-bold">{score}</span></p>
        
        <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-6">
          <p className="text-xl text-white mb-2">
            {currentCharacter.name}'s bounty: <span className="font-bold">{currentCharacter.bounties[0]?.toLocaleString()} Berries</span>
          </p>
          <p className="text-xl text-white mb-2">
            {nextCharacter.name}'s bounty: <span className="font-bold">{nextCharacter.bounties[0]?.toLocaleString()} Berries</span>
          </p>
        </div>

        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;