import personfallgif from "../assets/images/personfallgif.gif";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[#111112] h-full fixed top-0 left-0"
    >
      <img
        src={personfallgif}
        className={`w-full h-full ${window.innerWidth <= 400?"object-cover":"object-contain"}`}
        alt=""
      />
    </motion.div>
  );
};

export default Loading;
