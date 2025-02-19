import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Mic, Volume2 } from "lucide-react";

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="bg-white rounded-full shadow-lg p-3 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-blue-50"
              onClick={() => console.log("Start listening")}
            >
              <Mic className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-blue-50"
              onClick={() => console.log("Start speaking")}
            >
              <Volume2 className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
