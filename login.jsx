import { motion } from 'framer-motion';

const clothesVariants = (duration, delay) => ({
  initial: { y: '100vh', opacity: 0 },
  animate: {
    y: '-100vh',
    opacity: 1,
    transition: {
      duration: duration,
      ease: 'linear',
      repeat: Infinity,
      delay: delay,
    },
  },
});

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const formElementVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Login = () => {
  const clothes = ['👗', '👚', '👖', '👔', '🧥', '👕', '🩳', '🧣', '👜', '👠'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {}
      <div className="fixed inset-0 pointer-events-none">
        {clothes.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            variants={clothesVariants(8 + Math.random() * 4, Math.random() * 5)}
            initial="initial"
            animate="animate"
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      {}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative z-10"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold text-center mb-2 text-gray-800"
          variants={inputVariants}
        >
          Welcome Back 👋
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-6"
          variants={inputVariants}
        >
          Login to your account
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          variants={formElementVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={inputVariants}
          />
          <motion.input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={inputVariants}
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            variants={inputVariants}
          >
            Login
          </motion.button>
        </motion.form>
        <motion.p
          className="text-center text-gray-600 mt-4"
          variants={inputVariants}
        >
          Don't have an account?{' '}
          <a href="signup.html" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;