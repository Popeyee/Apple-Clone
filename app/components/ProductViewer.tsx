"use client";

import clsx from "clsx";
import { MacbookState, useMacbookStore } from "../store";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setScale, setColor }: MacbookState = useMacbookStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px" });
  return (
    <section id="product-viewer">
      <h2>Take a closer look</h2>
      <div className="controls">
        <p className="info">
          MacbookPro | Available in 14&quot; & 16&quot; in Space Grey and Dark
          Grey
        </p>
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#adb5bd")}
              className={clsx("bg-neutral-300", color == "#adb5bd" && "active")}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx("bg-neutral-900", color == "#2e2c2e" && "active")}
            />
          </div>

          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale == 0.06 ? "bg-white text-black" : "bg-transparent"
              )}
            >
              <p>14&quot;</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale == 0.08 ? "bg-white text-black" : "bg-transparent"
              )}
            >
              <p>16&quot;</p>
            </div>
          </div>
        </div>
      </div>

      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />

        <ModelSwitcher
          scale={isMobile ? scale - 0.03 : scale}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
};

export default ProductViewer;

// "use client";

// import { memo, useCallback, useMemo, useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import clsx from "clsx";
// import { MacbookState, useMacbookStore } from "../store";
// import { useMediaQuery } from "react-responsive";

// // Dynamically import Canvas to prevent SSR issues
// const Canvas = dynamic(
//   () => import("@react-three/fiber").then((mod) => mod.Canvas),
//   { ssr: false }
// );

// // Dynamically import Three.js components
// const StudioLights = dynamic(() => import("./three/StudioLights"), {
//   ssr: false,
// });

// const ModelSwitcher = dynamic(() => import("./three/ModelSwitcher"), {
//   ssr: false,
// });

// // Memoized color button component to prevent unnecessary re-renders
// const ColorButton = memo(
//   ({
//     color: buttonColor,
//     currentColor,
//     onClick,
//     className,
//   }: {
//     color: string;
//     currentColor: string;
//     onClick: () => void;
//     className: string;
//   }) => (
//     <div
//       onClick={onClick}
//       className={clsx(className, currentColor === buttonColor && "active")}
//     />
//   )
// );
// ColorButton.displayName = "ColorButton";

// // Memoized size button component
// const SizeButton = memo(
//   ({
//     size,
//     scale,
//     currentScale,
//     onClick,
//   }: {
//     size: string;
//     scale: number;
//     currentScale: number;
//     onClick: () => void;
//   }) => (
//     <div
//       onClick={onClick}
//       className={clsx(
//         currentScale === scale ? "bg-white text-black" : "bg-transparent"
//       )}
//     >
//       <p>{size}</p>
//     </div>
//   )
// );
// SizeButton.displayName = "SizeButton";

// const ProductViewer = () => {
//   const { color, scale, setScale, setColor }: MacbookState = useMacbookStore();

//   // Prevent hydration mismatch for media query
//   const [mounted, setMounted] = useState(false);
//   const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Memoize callbacks to prevent recreation on each render
//   const handleColorChange = useCallback(
//     (newColor: string) => {
//       setColor(newColor);
//     },
//     [setColor]
//   );

//   const handleScaleChange = useCallback(
//     (newScale: number) => {
//       setScale(newScale);
//     },
//     [setScale]
//   );

//   // Memoize the adjusted scale calculation
//   const adjustedScale = useMemo(() => {
//     return isMobile ? scale - 0.03 : scale;
//   }, [isMobile, scale]);

//   // Memoize camera settings
//   const cameraSettings = useMemo(
//     () => ({
//       position: [0, 2, 5] as [number, number, number],
//       fov: 50,
//       near: 0.1,
//       far: 100,
//     }),
//     []
//   );

//   return (
//     <section id="product-viewer">
//       <h2>Take a closer look</h2>
//       <div className="controls">
//         <p className="info">
//           MacbookPro | Available in 14&quot; & 16&quot; in Space Grey and Dark
//           Grey
//         </p>
//         <div className="flex-center gap-5 mt-5">
//           <div className="color-control">
//             <ColorButton
//               color="#adb5bd"
//               currentColor={color}
//               onClick={() => handleColorChange("#adb5bd")}
//               className="bg-neutral-300"
//             />
//             <ColorButton
//               color="#2e2c2e"
//               currentColor={color}
//               onClick={() => handleColorChange("#2e2c2e")}
//               className="bg-neutral-900"
//             />
//           </div>

//           <div className="size-control">
//             <SizeButton
//               size='14"'
//               scale={0.06}
//               currentScale={scale}
//               onClick={() => handleScaleChange(0.06)}
//             />
//             <SizeButton
//               size='16"'
//               scale={0.08}
//               currentScale={scale}
//               onClick={() => handleScaleChange(0.08)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Only render Canvas after component mounts to prevent SSR issues */}
//       {mounted && (
//         <Canvas
//           id="canvas"
//           camera={cameraSettings}
//           dpr={[1, 2]} // Limit pixel ratio for better performance
//           gl={{
//             antialias: true,
//             powerPreference: "high-performance", // Use high-performance GPU
//             alpha: false, // Disable alpha for better performance
//           }}
//           performance={{ min: 0.5 }} // Adaptive performance
//         >
//           <StudioLights />
//           <ModelSwitcher scale={adjustedScale} isMobile={isMobile} />
//         </Canvas>
//       )}
//     </section>
//   );
// };

// export default memo(ProductViewer);
