import React from 'react';
import { Character } from './types';

interface CharacterCardProps {
  character: Character;
  showBounty: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, showBounty }) => {
  const { name, image_url, bounties } = character;
  const latestBounty = bounties && bounties.length > 0 && bounties[0] !== null ? bounties[0] : null;

  return (
    <div
      className="w-full h-full bg-cover bg-top relative flex items-center justify-center"
      style={{ backgroundImage: `url(${image_url})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative text-center text-white p-6">
        <h2 className="text-2xl font-bold">{name}</h2>
        {showBounty && latestBounty !== null && (
          <p className="text-lg mt-2">
            Bounty: <span className="font-semibold">{latestBounty?.toLocaleString()} Berries</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
