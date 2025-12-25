
import React from 'react';
import { SavedBuild } from '../types';

interface SavedBuildsListProps {
  builds: SavedBuild[];
  onLoad: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const SavedBuildsList: React.FC<SavedBuildsListProps> = ({ builds, onLoad, onDelete, onDeleteAll }) => {
  if (builds.length === 0) {
    return (
        <div>
            <h2 className="text-3xl font-title text-yellow-500 border-b-2 border-yellow-500/30 pb-2 mb-4">Saved Builds</h2>
            <p className="text-gray-400">You haven't saved any builds yet. Create a build above and save it to see it here.</p>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 border-b-2 border-yellow-500/30 pb-2">
        <h2 className="text-3xl font-title text-yellow-500">Saved Builds</h2>
        <button
            onClick={onDeleteAll}
            className="text-sm text-[#F83C32] hover:text-[#FA5C54] font-semibold transition-colors pr-1"
            aria-label="Delete all saved builds"
        >
            Delete All
        </button>
      </div>
      <div className="space-y-3">
        {builds.map((build) => (
          <div key={build.id} className="bg-gray-900/60 p-4 rounded-lg flex items-center justify-between transition-shadow hover:shadow-lg hover:shadow-purple-500/10">
            <div>
                <p className="font-bold text-lg text-white">{build.name}</p>
                <p className="text-sm text-gray-400">
                    {build.village || 'No Village'} &bull; {build.firstMastery || 'No Mastery'} &bull; {build.secondMastery || 'No Mastery'} &bull; {build.corporation || 'No Corp'} &bull; {build.weapon || build.weaponGroup || 'No Weapon'}
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => onLoad(build.id)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-sm"
                >
                    Load
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(build.id);
                    }}
                    className="p-2 bg-[#F83C32] hover:bg-[#FA5C54] text-white rounded-full transition-colors duration-200"
                    aria-label={`Delete build ${build.name}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
