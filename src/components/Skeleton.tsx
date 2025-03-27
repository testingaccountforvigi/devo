import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-surface/60" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="glass-card p-8">
      <Skeleton className="w-8 h-8 rounded-lg mb-6" />
      <Skeleton className="h-8 w-3/4 rounded-lg mb-4" />
      <Skeleton className="h-20 rounded-lg mb-6" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <Skeleton className="h-20 w-3/4 mx-auto rounded-2xl mb-6" />
      <Skeleton className="h-12 w-2/3 mx-auto rounded-xl mb-12" />
      <div className="flex justify-center gap-4">
        <Skeleton className="w-40 h-14 rounded-full" />
        <Skeleton className="w-40 h-14 rounded-full" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glass-card p-6">
          <Skeleton className="h-8 w-20 rounded-lg mb-2" />
          <Skeleton className="h-4 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  );
} 