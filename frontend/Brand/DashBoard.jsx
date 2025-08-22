import React, { useEffect, useState,useRef } from "react";
import api from "./Axios";
import Navbar from "./Navbar";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasProcessedRef = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      const d = JSON.parse(localStorage.getItem("user"));
      if (!d?.brand) {
        console.error("User not found or brand missing");
        setLoading(false);
        return;
      }

      try {
        const res = await api.post("/", { brand: d.brand });

        if (res?.data && Array.isArray(res.data)) {
          console.log(res.data)
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
  if (data.length > 0 && !hasProcessedRef.current) {
    console.log(hasProcessedRef.current)
     const runBackgroundTasks = async () => {
      hasProcessedRef.current = true;
      try {
        const urls = await api.post("/urllist", { data });
        await api.post("/process_chain", { urlList: urls.data });
      } catch (e) {
        console.error("Background processing failed:", e);
      }
    };
    //OFF
    runBackgroundTasks();
  }
}, [data]); 

  const handleDownload = async (imageUrl) => {
    try {
      const response = await api.get(
        `/download-image?url=${encodeURIComponent(imageUrl)}`,
        { responseType: "blob" }
      );

      const blob = response.data;
      const filename = imageUrl.split("/").pop() || "download.jpg";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Brand Feed</h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-lg">No data available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((ele, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
              >
                <h2 className="text-lg font-semibold mb-2">{ele.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {ele.description}
                </p>
                <p className="text-sm mt-2 break-words text-blue-500">
                  {ele.url}
                </p>

                {ele.contains_image && (
                  <div className="mt-4">
                    <img
                      src={ele.url}
                      alt="Ad visual"
                      className="w-full h-auto rounded mb-2"
                    />
                    <button
                      onClick={() => handleDownload(ele.url)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                    >
                      Download Image
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  <span className="font-medium">Sentiment: </span>
                  <span className="italic text-gray-800 dark:text-gray-200">
                    {ele.sentiment?.error ? (
                      <span> {ele.sentiment} </span>
                    ): 
                    <span> Cant process </span>
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;