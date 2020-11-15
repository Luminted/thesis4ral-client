export const calculateAdjacentAngle = (adjacent, hypotenuse) => {
    return radianToDegrees(Math.acos(adjacent / hypotenuse));
  }

export const calculateDistance = (a: [number, number], b: [number, number]) => 
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

const radianToDegrees = (r: number) => r * 180 / Math.PI;