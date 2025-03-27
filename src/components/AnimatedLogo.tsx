import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 'medium' }) => {
  const logoSizes = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }}
      className={`font-display font-bold gradient-text ${logoSizes[size]}`}
    >
      Devotize
    </motion.div>
  );
};

export default AnimatedLogo; 