import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import Button from './Button';
import { Character } from './types';

interface GameScreenProps {
  currentCharacter: Character;
  nextCharacter: Character;
  onGuess: (guess: 'higher' | 'lower') => void;
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ currentCharacter, nextCharacter, onGuess, score }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleGuess = (guess: 'higher' | 'lower') => {
    setFadeOut(true);
    setTimeout(() => {
      onGuess(guess);
      setFadeIn(true);
      setFadeOut(false);
    }, 500);
    setTimeout(() => {
      setFadeIn(false);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen overflow-hidden">
      <div className={`w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center ${fadeOut ? 'animate-fadeOut' : ''}`}>
        <CharacterCard character={currentCharacter} showBounty={true} />
      </div>

      <div className={`w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center ${fadeIn ? 'animate-fadeIn' : ''}`}>
        <CharacterCard character={nextCharacter} showBounty={false} />
      </div>

      <div className="absolute bottom-4 left-4">
        <p className='text-white text-3xl'>Score: {score}</p>
      </div>

      <div className="absolute bottom-4 right-4 space-x-2">
        <Button label="Higher" onClick={() => handleGuess('higher')} color="green" />
        <Button label="Lower" onClick={() => handleGuess('lower')} color="red" />
      </div>
    </div>
  );
};

export default GameScreen;
