import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="font-black border text-xl text-center text-emerald-600">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
};

export default Loader;

