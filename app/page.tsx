"use client"

import { NewHero } from "@/components/NewHero"
import { WorkCategories } from "@/components/WorkCategories"
import { PinnedScrollSection } from "@/components/PinnedScrollSection"
import { WorkShowcase } from "@/components/WorkShowcase"
import { Clients } from "@/components/Clients"
import { CTASection } from "@/components/CTASection"

export default function HomePage() {
  return (
    <>
      <NewHero />
      <WorkCategories />
      <PinnedScrollSection />
      <WorkShowcase />
      <Clients />
      <CTASection />
    </>
  )
}
