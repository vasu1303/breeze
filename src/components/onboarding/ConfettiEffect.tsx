import ReactConfetti from "react-confetti";

interface ConfettiEffectProps {
  show: boolean;
  key: number;
  width: number;
  height: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  show,
  key,
  width,
  height,
}) => {
  if (!show) return null;

  return (
    <ReactConfetti
      key={key}
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={300}
      gravity={0.3}
      initialVelocityY={-10}
      confettiSource={{
        x: 0,
        y: 0,
        w: width,
        h: 0,
      }}
    />
  );
};
