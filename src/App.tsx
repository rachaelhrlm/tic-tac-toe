import React, { useState } from 'react';

import { Game, GameMode, GameSetup } from './components';

const App = () => {
    const [playerMark, setPlayerMark] = useState<number>(1);
    const [gameMode, setGameMode] = useState<GameMode>();

    return (
        <div className="bg-black-600 h-screen w-screen">
            <div className="w-full h-full grid place-items-center">
                <GameSetup
                    isVisible={!gameMode}
                    playerMark={playerMark}
                    onPlayerMarkSelect={(playerMark: number) => setPlayerMark(playerMark)}
                    onGameModeSelect={(gameMode: GameMode) => setGameMode(gameMode)}
                />
                {!!gameMode && (
                    <Game
                        gameMode={gameMode}
                        onClickQuit={() => {
                            setPlayerMark(1);
                            setGameMode(undefined);
                        }}
                        playerMark={playerMark}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
