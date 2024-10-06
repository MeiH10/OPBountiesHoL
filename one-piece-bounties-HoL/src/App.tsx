import React, { useState, useEffect } from 'react';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import { Character } from './types';
import characterData from './one_piece_bounties.json';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [nextCharacter, setNextCharacter] = useState<Character | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const savedHighestScore = localStorage.getItem('highestScore');
    if (savedHighestScore) {
      setHighestScore(parseInt(savedHighestScore, 10));
    }
    
    const filteredCharacters = characterData.filter(character => character.bounties && character.bounties[0] !== null);
    const shuffledCharacters = shuffleCharacters([...filteredCharacters]);
    setCharacters(shuffledCharacters);
    setCurrentCharacter(shuffledCharacters[0]);
    setNextCharacter(shuffledCharacters[1]);
  }, []);

  const handleGuess = (guess: 'higher' | 'lower') => {
    if (!currentCharacter || !nextCharacter) return;
  
    const currentBounty = currentCharacter.bounties[0];
    const nextBounty = nextCharacter.bounties[0];
  
    if (currentBounty === nextBounty) {
      setScore(score + 1);
      moveToNextCharacter();
    } else {
      const isCorrect =
        guess === 'higher'
          ? nextBounty! > currentBounty!
          : nextBounty! < currentBounty!;
  
      if (isCorrect) {
        setScore(score + 1);
        moveToNextCharacter();
      } else {
        setIsGameOver(true);
      }
    }
  };
  
  const moveToNextCharacter = () => {
    if (!nextCharacter) return;
    const newIndex = characters.indexOf(nextCharacter) + 1;

    if (newIndex < characters.length) {
      setCurrentCharacter(nextCharacter);
      setNextCharacter(characters[newIndex]);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    const filteredCharacters = characterData.filter(character => character.bounties && character.bounties[0] !== null);
    const shuffledCharacters = shuffleCharacters([...filteredCharacters]);
    setCharacters(shuffledCharacters);
    setCurrentCharacter(shuffledCharacters[0]);
    setNextCharacter(shuffledCharacters[1]);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return <GameOverScreen score={score} onRestart={resetGame} />;
  }

  if (!currentCharacter || !nextCharacter) return null;

  return (
    <div>
      <GameScreen
        currentCharacter={currentCharacter}
        nextCharacter={nextCharacter}
        onGuess={handleGuess}
        score={score}
      />
      <div className="absolute top-4 right-4 text-2xl text-white">
        Highest Score: {highestScore}
      </div>
    </div>
  );
};

function shuffleCharacters(array: Character[]): Character[] {
  return array.sort(() => Math.random() - 0.5);
}

export default App;
