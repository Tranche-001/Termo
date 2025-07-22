export function GameScreen() {
    const inputs = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <>
            <div className="game-screen-container">
                {inputs.map((index) => (
                    <input
                        key={index}
                        type="text"
                        className="letter-square empty"
                        maxLength={1}
                    />
                ))}
            </div>
         </>
    )
}