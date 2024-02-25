import { FadingImage } from './FadingImage';
import { FadingImageDisplacement } from './FadingImageDisplacement';

export const Experience = () => {
  return (
    <>
      <FadingImageDisplacement position-x={1.5} />
      <FadingImage position-x={-1.5} />
    </>
  );
};
