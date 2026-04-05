'use client'

import { motion } from 'framer-motion'
import { FadeInView } from '@/components/animations/FadeInView'
import Image from 'next/image'

interface HubNode {
  name: string
  logo: string
  angle: number
  delay: number
  whiteBg?: boolean
}

const nodes: HubNode[] = [
  { name: 'SAP', logo: '/logos/SAP_idEDqS_YGr_0.svg', angle: 0, delay: 0 },
  { name: 'SAP Ariba', logo: '/logos/sap-ariba-vector-logo.svg', angle: 60, delay: 0.4, whiteBg: true },
  { name: 'Coupa', logo: '/logos/Coupa_id-reAcX5P_0.svg', angle: 120, delay: 0.8 },
  { name: 'Oracle', logo: '/logos/oracle-1.svg', angle: 180, delay: 1.2 },
  { name: 'Microsoft 365', logo: '/logos/microsoft.svg', angle: 240, delay: 1.6 },
  { name: 'Jaggaer', logo: '/logos/jaggaer-vector-logo.svg', angle: 300, delay: 2.0, whiteBg: true },
]

const RADIUS = 165
const CENTER = 210
const SIZE = 420

function getPos(angle: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  }
}

export function IntegrationHub() {
  return (
    <div className="mb-20">
      <FadeInView>
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          API-Ready Integration
        </h3>
        <p className="text-white/50 text-center mb-12 max-w-lg mx-auto">
          Connect with leading procurement platforms through our API-ready architecture
        </p>
      </FadeInView>

      <div className="relative w-full max-w-[480px] mx-auto">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto">
          <defs>
            <linearGradient id="hub-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(148,210,189,0.5)" />
              <stop offset="100%" stopColor="rgba(0,180,216,0.2)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {nodes.map((node) => {
            const pos = getPos(node.angle)
            return (
              <motion.line
                key={`line-${node.name}`}
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke="url(#hub-line)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: node.delay * 0.4, duration: 0.6 }}
              />
            )
          })}

          {/* Center hub glow */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r="42"
            fill="none"
            stroke="rgba(10,138,173,0.15)"
            strokeWidth="1"
            filter="url(#glow)"
            animate={{ r: [42, 46, 42] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Center hub - positioned over SVG */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center z-10 shadow-[0_0_40px_rgba(10,138,173,0.3)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="Vantixe"
            width={50}
            height={20}
            className="opacity-90"
          />
        </motion.div>

        {/* Integration nodes - positioned over SVG */}
        {nodes.map((node) => {
          const pos = getPos(node.angle)
          const leftPct = (pos.x / SIZE) * 100
          const topPct = (pos.y / SIZE) * 100

          return (
            <motion.div
              key={node.name}
              className={`absolute w-24 h-24 -ml-12 -mt-12 rounded-xl flex items-center justify-center border hover:border-accent-mint/30 hover:shadow-[0_0_20px_rgba(148,210,189,0.15)] transition-all cursor-default p-2 ${
                node.whiteBg
                  ? 'bg-white border-white/20'
                  : 'glass border-white/10 bg-white/5'
              }`}
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay * 0.4, duration: 0.5 }}
              animate={{ y: [0, -6, 0] }}
            >
              <Image
                src={node.logo}
                alt={node.name}
                width={72}
                height={36}
                className="opacity-90 w-full h-auto max-h-16 object-contain"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
