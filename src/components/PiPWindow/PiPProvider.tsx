import React, { useCallback, useMemo, useState } from "react";
import PiPContext from "./PiPContext";

type PiPProviderProps = {
  children: React.ReactNode;
};

export function PiPProvider({ children }: PiPProviderProps) {
  const isSupported = "documentPictureInPicture" in window;
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const closePipWindow = useCallback(() => {
    if (pipWindow != null) {
      pipWindow.close();
      setPipWindow(null);
    }
  }, [pipWindow]);

  const requestPipWindow = useCallback(
    async (width: number, height: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window?.documentPictureInPicture) return;
      if (pipWindow != null) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const pip = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      });

      pip.addEventListener("pagehide", () => {
        setPipWindow(null);
      });

      // 复制样式表到画中画窗口
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          pip.document.head.appendChild(style);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          const link = document.createElement("link");
          if (styleSheet.href == null) return;
          link.rel = "stylesheet";
          link.type = styleSheet.type;
          link.media = styleSheet.media.toString();
          link.href = styleSheet.href;
          pip.document.head.appendChild(link);
        }
      });

      setPipWindow(pip);
    },
    [pipWindow]
  );

  const value = useMemo(
    () => ({
      isSupported,
      pipWindow,
      requestPipWindow,
      closePipWindow,
    }),
    [closePipWindow, isSupported, pipWindow, requestPipWindow]
  );

  return <PiPContext.Provider value={value}>{children}</PiPContext.Provider>;
}
