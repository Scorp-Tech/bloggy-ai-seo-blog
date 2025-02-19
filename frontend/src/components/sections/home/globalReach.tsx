"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export function GlobalReach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of content creators from around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=2000"
            alt="Global User Map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Animated Dots for Major Cities */}
          <div className="absolute inset-0">
            {[
              { left: "20%", top: "30%" },
              { left: "60%", top: "20%" },
              { left: "80%", top: "40%" },
              { left: "40%", top: "60%" },
              { left: "70%", top: "70%" }
            ].map((position, index) => (
              <motion.div
                key={index}
                className="absolute w-4 h-4"
                style={position}
                initial={{ scale: 0 }}
                animate={inView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="w-4 h-4 bg-primary rounded-full opacity-75 animate-ping" />
                <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-primary">100K+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">150+</h3>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">1M+</h3>
              <p className="text-muted-foreground">Articles Created</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">5M+</h3>
              <p className="text-muted-foreground">Monthly Readers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}