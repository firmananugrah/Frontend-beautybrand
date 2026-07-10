import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({
  input,
  setInput,
  handleSend,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4 md:px-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 shadow-sm">

          <input
            type="text"
            value={input}
            placeholder="Tanyakan apa saja tentang skincare..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              flex-1
              bg-transparent
              px-2
              py-3
              outline-none
              text-sm
              md:text-base
              placeholder:text-gray-400
            "
          />

          <button
            onClick={handleSend}
            className="
              w-11
              h-11
              md:w-12
              md:h-12
              rounded-xl
              bg-[#1A237E]
              text-white
              flex
              items-center
              justify-center
              hover:bg-[#11195E]
              transition
              shrink-0
            "
          >
            <FaPaperPlane />
          </button>

        </div>

        <p className="text-center text-[11px] md:text-xs text-gray-400 mt-3 leading-relaxed px-2">
          BeautyBrain AI dapat membuat kesalahan. Selalu konsultasikan
          kondisi kulit Anda kepada dokter kulit untuk keputusan medis.
        </p>

      </div>

    </div>
  );
};

export default ChatInput;