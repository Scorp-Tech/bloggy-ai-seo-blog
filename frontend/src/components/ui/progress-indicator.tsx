import { motion } from 'framer-motion'

const ProgressIndicator = ({
  step,
  steps,
  gap,
  style,
}: {
  step: number
  steps: number
  gap: number
  style?: React.CSSProperties
}) => {
  const totalDuration = 3; // Total animation duration for the progress bar
  const dotAnimDuration = 0.5; // Each dot's animation duration
  const dotDelay = steps > 1 ? totalDuration / (steps + 1) : 0;

  return (
    <div style={style} className="flex flex-col items-center justify-center gap-8 my-8">
      <div style={{ gap: gap }} className="flex items-center relative">
        {Array.from(Array(steps).keys()).map((dot) => (
          <motion.div
            key={dot}
            initial={{ backgroundColor: '#D1D5DB', borderWidth: 0 }}
            animate={{
              backgroundColor: dot < step ? '#fff' : '#D1D5DB',
              borderWidth: dot < step ? 8 : 0,
              borderColor: '#10B981',
            }}
            transition={{
              duration: dotAnimDuration,
              delay: dot * dotDelay,
            }}
            className="w-2 h-2 rounded-full relative z-10"
          />
        ))}
        <div className="absolute h-1 bg-gray-300 rounded-full w-full" />
        {/* Green progress overlay */}
        <motion.div
          initial={{ width: '24px' }}
          animate={{
            width: `${gap * (step - 1) + step * 16}px`,
          }}
          style={{ minWidth: '24px' }}
          className="absolute h-1 bg-green-500 rounded-full"
          transition={{
            duration: totalDuration,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
