import { useCallback, useState } from "react";
import PiPWindow from "./PiPWindow";
import { usePiPWindow } from "./PiPWindow/usePiPWindow";

export default function Example() {
  const { isSupported, requestPipWindow, pipWindow, closePipWindow } =
    usePiPWindow();
  const [count, setCount] = useState(0);

  const startPiP = useCallback(() => {
    requestPipWindow(500, 500);
  }, [requestPipWindow]);

  return (
    <div>
      {isSupported ? (
        <>
          <button onClick={pipWindow ? closePipWindow : startPiP}>
            {pipWindow ? "Close PiP" : "Open PiP"}
          </button>
          &nbsp;
          <button
            onClick={() => {
              setCount((count) => count + 1);
            }}>Clicks count is {count}</button>
          {pipWindow && (
            <PiPWindow pipWindow={pipWindow}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <h3>Hello in PiP!</h3>
                <button
                  onClick={() => {
                    setCount((count) => count + 1);
                  }}
                >
                  Clicks count is {count}
                </button>
                &nbsp;
                <button onClick={closePipWindow}>Close PiP</button>
              </div>
            </PiPWindow>
          )}
        </>
      ) : (
        <div className="error">
          Document Picture-in-Picture is not supported in this browser
        </div>
      )}
    </div>
  );
}
