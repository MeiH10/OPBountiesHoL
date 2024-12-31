import React, { useState, useEffect } from 'react';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import HowToPlay from './HowToPlay';
import { Character } from './types';
import characterData from '../../data/one_piece_bounties.json';

// simple hash for score validation
const hashScore = (score: number): string => {
  const salt = "op_bounties_v1";
  return btoa(`${score}:${salt}`);
};

const verifyScore = (score: string, hash: string): boolean => {
  try {
    const storedScore = parseInt(score);
    return hash === hashScore(storedScore);
  } catch {
    return false;
  }
};

// preload some images
const preloadImages = (characters: Character[], startIndex: number, batchSize: number = 5) => {
  const endIndex = Math.min(startIndex + batchSize, characters.length);
  for (let i = startIndex; i < endIndex; i++) {
    const img = new Image();
    img.src = characters[i].image_url;
  }
};

const App: React.FC = () => {
  const [indices, setIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // filter valid characters
  const validCharacters = characterData.filter(character =>
    character.bounties && character.bounties[0] !== null
  );

  useEffect(() => {
    const savedHighestScore = localStorage.getItem('highestScore');
    const savedHash = localStorage.getItem('highestScoreHash');

    if (!savedHighestScore || !savedHash || !verifyScore(savedHighestScore, savedHash)) {
      // if no score exists or validation fails, reset to 0
      localStorage.setItem('highestScore', '0');
      localStorage.setItem('highestScoreHash', hashScore(0));
      setHighestScore(0);
    } else {
      setHighestScore(parseInt(savedHighestScore, 10));
    }

    const shuffledIndices = [...Array(validCharacters.length).keys()]
      .sort(() => Math.random() - 0.5);
    setIndices(shuffledIndices);
    setCurrentIndex(0);

    // preload first batch
    const firstBatchCharacters = shuffledIndices
      .slice(0, 5)
      .map(i => validCharacters[i]);
    preloadImages(firstBatchCharacters, 0);
  }, []);

  const handleGuess = (guess: 'higher' | 'lower') => {
    const currentCharacter = validCharacters[indices[currentIndex]];
    const nextCharacter = validCharacters[indices[currentIndex + 1]];
    
    if (!currentCharacter || !nextCharacter) return;

    const currentBounty = currentCharacter.bounties[0];
    const nextBounty = nextCharacter.bounties[0];

    if (currentBounty === nextBounty) {
      setScore(score + 1);
      moveToNext();
    } else {
      const isCorrect =
        guess === 'higher'
          ? nextBounty! > currentBounty!
          : nextBounty! < currentBounty!;

      if (isCorrect) {
        setScore(score + 1);
        moveToNext();
      } else {
        setIsGameOver(true);
      }
    }
  };

  const moveToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < indices.length - 1) {
      setCurrentIndex(nextIndex);
      // preload next batch
      const nextBatchCharacters = indices
        .slice(nextIndex + 1, nextIndex + 6)
        .map(i => validCharacters[i]);
      preloadImages(nextBatchCharacters, 0);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem('highestScore', score.toString());
      localStorage.setItem('highestScoreHash', hashScore(score));
    }

    const shuffledIndices = [...Array(validCharacters.length).keys()]
      .sort(() => Math.random() - 0.5);
    setIndices(shuffledIndices);
    setCurrentIndex(0);

    const firstBatchCharacters = shuffledIndices
      .slice(0, 5)
      .map(i => validCharacters[i]);
    preloadImages(firstBatchCharacters, 0);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const currentCharacter = validCharacters[indices[currentIndex]];
    const nextCharacter = validCharacters[indices[currentIndex + 1]];
    return (
      <GameOverScreen 
        score={score} 
        onRestart={resetGame}
        currentCharacter={currentCharacter}
        nextCharacter={nextCharacter}
      />
    );
  }

  const currentCharacter = validCharacters[indices[currentIndex]];
  const nextCharacter = validCharacters[indices[currentIndex + 1]];

  if (!currentCharacter || !nextCharacter) return null;

  return (
    <div>
      <HowToPlay />
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

export default App;