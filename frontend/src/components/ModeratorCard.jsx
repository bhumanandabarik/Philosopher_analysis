import { motion } from "framer-motion";

function ModeratorCard({ content }) {

  const winnerMatch =
  content.match(/WINNER:\s*(.*)/i);

  const reasonMatch =
    content.match(/REASON:\s*(.*)/i);

  const adviceMatch =
    content.match(/FINAL ADVICE:\s*(.*)/i);

  const winner =
    winnerMatch?.[1] || "Unknown";

  const reason =
    reasonMatch?.[1] || "";

  const advice =
    adviceMatch?.[1] || "";

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
        duration: 0.8,
        delay: 1,
      }}

      className="
        mt-10
        p-8
        rounded-2xl
        border
        border-yellow-500
        bg-gradient-to-br
        from-zinc-900
        to-yellow-950
        shadow-2xl
      "
    >

      <h2 className="text-4xl font-bold mb-6 text-yellow-400">
        🏆 Moderator Verdict
      </h2>

      <div className="space-y-6">

        <div>

          <h3 className="text-2xl font-semibold text-yellow-300">
            Winner
          </h3>

          <p className="text-xl mt-2">
            {winner}
          </p>

        </div>

        <div>

          <h3 className="text-2xl font-semibold text-yellow-300">
            Reason
          </h3>

          <p className="text-zinc-300 mt-2 leading-7">
            {reason}
          </p>

        </div>

        <div>

          <h3 className="text-2xl font-semibold text-yellow-300">
            Final Advice
          </h3>

          <p className="text-zinc-300 mt-2 leading-7">
            {advice}
          </p>

        </div>

      </div>

    </motion.div>
  );
}

export default ModeratorCard;