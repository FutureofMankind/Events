/**
 *
 * @param lastCell
 * @param boardSize
 * @returns
 */
export default function randomСondition(lastCell, boardSize) {
  const rand = () => {
    const random = Math.floor(Math.random() * (boardSize ** 2));

    if (random === lastCell) { return rand(); }
    return random;
  };
  return rand();
}
