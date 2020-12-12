export const mirrorOnTablePosition = (positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number] => {
  const transformedPositionX = -positionX + tableWidth;
  const transformedPositionY = -positionY + tableHeight;
  return [transformedPositionX, transformedPositionY];
};

export const inverseMirrorOnTablePosition = (positionX: number, positionY: number, tableWidth: number, tableHeight: number): [number, number] => {
  const transformedPositionX = -positionX + tableWidth;
  const transformedPositionY = -positionY + tableHeight;
  return [transformedPositionX, transformedPositionY];
};
