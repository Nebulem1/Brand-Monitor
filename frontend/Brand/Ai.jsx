import React, { useState } from 'react';
import api from './Axios';
import { Pencil1Icon } from "@radix-ui/react-icons";
import Navbar from './Navbar';

const Ai = () => {
  let [chatHist, setChatHist] = useState([]);
  let [chat, setChat] = useState("");

  let handelAi = async () => {
    if (chat.trim() === "") {
      alert("Please enter a valid query");
      return;
    }

    let res = await api.post("/qa", { "text": chat });
    if (res.data) {
      setChat("");
      let ob = {
        'user': chat,
        'AI': res.data.answer,
        "source": res.data.source
      };
      setChatHist([...chatHist, ob]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F5F6FA] flex flex-col items-center pt-10 px-4">
        {/* Container */}
        <div className="w-full max-w-[1000px] space-y-8">

          {/* Chat History */}
          {chatHist.length > 0 && (
            <>
              {chatHist.map((item, index) => (
                <React.Fragment key={index}>
                  {/* User Message */}
                  <div className="flex items-start space-x-4 my-4">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg"
                      alt="User"
                      className="w-[60px] h-[60px] rounded-full shadow-md object-cover"
                    />
                    <div className="flex-1 bg-white rounded-2xl p-5 shadow-md">
                      <div className="flex justify-between items-center">
                        <p className="text-[#1B2559] font-medium font-['Plus Jakarta Sans']">
                          {item.user}
                        </p>
                        <Pencil1Icon className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRy13MyeQ9a5Txx3-D8MG40xztFfUsI4lnvNU8LPxqARV8AANe"
                      alt="AI"
                      className="w-[60px] h-[60px] rounded-full shadow-md object-cover"
                    />
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-md text-[#1B2559] space-y-2">
                      <p className="leading-7 text-[#4B5563] font-['Plus Jakarta Sans']">
                        {item.AI}
                      </p>
                      <p className="text-xs text-gray-400">Source: {item.source}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}

          {/* Input Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex w-full max-w-[900px] gap-4">
              <input
                type="text"
                placeholder="The advantages of Artificial Intelligence"
                className="flex-1 h-[50px] px-6 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A5AE0]"
                onChange={(e) => setChat(e.target.value)}
                value={chat}
              />
              <button
                className="w-[192px] h-[50px] bg-gradient-to-r from-[#4A25E1] to-[#7B5AFF] text-white rounded-full font-semibold hover:opacity-90 transition shadow-md"
                onClick={handelAi}
              >
                Submit
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Free Research Preview. Gemini may produce inaccurate information.
              <span className="underline ml-1 cursor-pointer hover:text-gray-700">
                Gemini 2.5 Version
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ai;
