import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
    >
      <div className="relative">
        <AnimatedLogo size="large" />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-4 left-0 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-accent"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-lg text-gray-400"
      >
        Loading amazing things...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen; 