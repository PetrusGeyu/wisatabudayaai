import { useEffect } from "react";

const DialogflowChat = () => {
  useEffect(() => {
    // Cek kalau script belum ada, baru tambahkan
    if (!document.querySelector('script[src*="df-messenger.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
      script.async = true;
      script.onload = () => {
        console.log("Dialogflow script loaded!");
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div suppressHydrationWarning>
      <df-messenger
        intent="WELCOME"
        chat-title="chatbot"
        agent-id="e745d334-7363-4626-a8cf-ea1aea53ce17"
        language-code="en"
        project-id="chatbot-456100"
      ></df-messenger>
    </div>
  );
};

export default DialogflowChat;
