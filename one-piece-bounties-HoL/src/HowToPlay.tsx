import { useState } from 'react';

const HowToPlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg 
          transition-colors duration-300 flex items-center gap-2 text-sm md:text-base z-40"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        How to Play
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-white mb-2">How to Play</h2>
            <p className="text-gray-300 mb-4">
              Compare One Piece character bounties in this higher or lower game!
            </p>

            <div className="space-y-3 text-gray-200">
              <p>1. You'll see two One Piece characters side by side.</p>
              <p>2. The bounty for the character on the left(or top for mobile users) is shown.</p>
              <p>3. Guess if the character on the right(or bottom for mobile users) has a HIGHER or LOWER bounty.</p>
              <p>4. Get it right to continue and score points!</p>
              <p>5. Get it wrong, and it's game over!</p>
              <p className="text-sm text-gray-400 mt-4">
                The bounties shown are the most recent bounties for each character. If the two character have the same bounties, either answer works.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowToPlay;