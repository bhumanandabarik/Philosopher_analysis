import { motion } from "framer-motion";

function DebateCard({
  title,
  content,
  critique,
  critiqueTitle,
  critiqueColor,
  delay = 0,
}) {

  const styles = {
    Stoic: "border-blue-500 bg-blue-950",
    Buddhist: "border-green-500 bg-green-950",
    Nietzsche: "border-red-500 bg-red-950",
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 40,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.7,
        delay,
      }}

      whileHover={{
        scale: 1.02,
      }}

      className={`
        p-6 rounded-2xl border-2 shadow-2xl
        flex flex-col justify-between h-full
        ${styles[title]}
      `}
    >

      {/* MAIN CONTENT */}

      <div>

        <h2 className="text-3xl font-bold mb-6">
          {title}
        </h2>

        <p className="whitespace-pre-wrap leading-8 text-zinc-200">
          {typeof content === "string"
            ? content
            : JSON.stringify(content, null, 2)}
        </p>

      </div>

      {/* CRITIQUE */}

      {critique && (

        <div className={`mt-8 p-4 rounded-xl border ${critiqueColor}`}>

          <h3 className="font-bold mb-2 text-lg">
            ⚔️ {critiqueTitle}
          </h3>

          <p className="italic text-zinc-300 leading-7">
            "{critique}"
          </p>

        </div>

      )}

    </motion.div>
  );
}

export default DebateCard;