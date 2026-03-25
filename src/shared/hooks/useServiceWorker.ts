import { useEffect } from "react";

export default function useServiceWorker(filePath: string) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register(filePath);
          console.log("ServiceWorker зарегистрирован:", registration.scope);
        } catch (error) {
          console.error("Ошибка регистрации ServiceWorker", error);
        }
      });
    }
  }, [filePath]);
}
