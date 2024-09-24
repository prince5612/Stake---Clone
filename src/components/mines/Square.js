// import './Square.css';
// import hoverEffect from './assets/Sound/hover.wav';
// import DiamondEffect from './assets/Sound/gold.wav';
// import diamondIcon from './assets/diamond.png';
// import bombIcon from './assets/bomb.png';
// import { useEffect, useState } from 'react';

// function Square({ mine, setGameOver, gameOver, setScore }) {

//     let [image, setImage] = useState(null);

//     useEffect(() => {
//         if (gameOver) {
//             if (mine) {
//                 setImage(bombIcon);
//             }
//             else {
//                 setImage(diamondIcon);
//             }
//         }
//     }, [gameOver, mine])

//     function mouseEnterHandle() {
//         if (!image) {
//             // const sound = new Audio(hoverEffect);
//             // sound.play();
//         }
//     }

//     function clickHandler() {

//         if(gameOver) return;

//         if (!mine) {
//             setScore((prevValue) => {
//                 return prevValue * 2;
//             });
//             setImage(diamondIcon);
//             const sound = new Audio(DiamondEffect);
//             sound.play();
//         } else {
//             alert("You Loose The Game");
//             setGameOver(true);
//         }
//     }

//     return <>
//         <div
//             className='square-item'
//             onMouseEnter={mouseEnterHandle}
//             onClick={clickHandler}
//         >
//             {image && <img style={{"height": "85px" , "width" : "85px"}} src={image} />}
//         </div>
//     </>
// }

// export default Square;
import './Square.css';
import diamondIcon from './assets/diamond.png';
import bombIcon from './assets/bomb.png';
import { useEffect, useState } from 'react';

function Square({ mine, setGameOver, gameOver, setScore, setMultiplier, multiplier, resetFlag , betAmount }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            setImage(mine ? bombIcon : diamondIcon);
        }
    }, [gameOver, mine]);

    // Reset the image whenever resetFlag changes
    useEffect(() => {
        setImage(null); // Reset the image when the reset flag changes
    }, [resetFlag]);

    const clickHandler = () => {
        if (gameOver || image) return;

        if (mine) {
            setGameOver(true);
            setImage(bombIcon);
            // alert("You hit a bomb! Game Over.");
            
        } else {
            setImage(diamondIcon);
            setScore(betAmount * multiplier);
            setMultiplier(prevMultiplier => prevMultiplier + 0.5);
        }
    };

    return (
        <div className="square-item" onClick={clickHandler}>
            {image && <img style={{ height: '85px', width: '85px' }} src={image} alt="icon" />}
        </div>
    );
}

export default Square;
