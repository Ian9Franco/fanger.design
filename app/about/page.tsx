"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export default function AboutPage() {
  const { lang } = useLanguage()

  const sections = [
    {
      title: lang === "en" ? "We Create" : "Creamos",
      subtitle: lang === "en" ? "Brand moments that earn attention." : "Momentos de marca que captan la atención.",
      description:
        lang === "en"
          ? "People won't take notice unless you give them a genuine reason to. From identity to campaigns, we cut through the noise with purpose—earning brands cultural relevance and lasting, authentic engagement."
          : "La gente no prestará atención a menos que les des una razón genuina. Desde identidad hasta campañas, cortamos el ruido con propósito, ganando relevancia cultural y compromiso auténtico duradero.",
      image: "/creative-team-collaboration.png",
      categories: ["Brand Identity", "PR-Led Ideas", "Social-Led Campaigns", "Creative & Content Development"],
    },
    {
      title: lang === "en" ? "We Design" : "Diseñamos",
      subtitle:
        lang === "en"
          ? "Places that draw people in & keep them coming back."
          : "Lugares que atraen a la gente y los hacen volver.",
      description:
        lang === "en"
          ? "Venues that make an impact have a story to tell. From hotels, to restaurants, to retail—we use our placemaking and branding expertise to craft places and experiences that stay with people."
          : "Los lugares que tienen impacto tienen una historia que contar. Desde hoteles hasta restaurantes y retail, usamos nuestra experiencia en placemaking y branding para crear lugares y experiencias memorables.",
      image: "/design-brainstorming.jpg",
      categories: [
        "Hotels",
        "Bars",
        "Restaurants",
        "Retail",
        "Mixed-Use Property",
        "Hospitality Concepts",
        "Placemaking",
        "Branding",
      ],
    },
    {
      title: lang === "en" ? "We Shape" : "Moldeamos",
      subtitle:
        lang === "en"
          ? "Place culture that keeps destinations relevant."
          : "Cultura de lugares que mantiene los destinos relevantes.",
      description:
        lang === "en"
          ? "Places that last offer more than just a service. We shape the culture of destinations, going beyond what's expected to create venues that truly mean something to their people and community."
          : "Los lugares que perduran ofrecen más que un servicio. Moldeamos la cultura de los destinos, yendo más allá de lo esperado para crear lugares que realmente significan algo para su gente y comunidad.",
      image: "/brand-strategy-meeting.png",
      categories: [
        "Cultural Place Strategy",
        "Precinct Positioning",
        "Art & Music Curation",
        "Community Integration",
        "Seasonal & Cultural Activations",
      ],
    },
    {
      title: lang === "en" ? "We Amplify" : "Amplificamos",
      subtitle:
        lang === "en"
          ? "Brands through experiences that drive influence and demand."
          : "Marcas a través de experiencias que impulsan influencia y demanda.",
      description:
        lang === "en"
          ? "Brands at the top of their game don't just follow culture, but define it. From PR, to sponsorships, to activations, our uniquely creative way of doing things takes brands to the forefront of their industry."
          : "Las marcas en la cima no solo siguen la cultura, sino que la definen. Desde PR hasta patrocinios y activaciones, nuestra forma única y creativa lleva a las marcas al frente de su industria.",
      image: "/creative-workspace.png",
      categories: [
        "Public Relations",
        "Social",
        "Live Events",
        "Collaborations",
        "Media Partnerships",
        "Community Building",
        "Influencer & Creator",
      ],
    },
  ]

  return (
    <main className="bg-white pt-24">
      {/* Hero section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Founded in 2017</p>
            <h1 className="mb-8 text-5xl font-black leading-tight md:text-6xl lg:text-7xl">
              {lang === "en"
                ? "An independently owned earned-led culture agency"
                : "Una agencia de cultura independiente enfocada en resultados ganados"}
            </h1>
            <p className="text-2xl font-bold mb-4">
              {lang === "en" ? "We Create and Amplify" : "Creamos y Amplificamos"}
            </p>
            <p className="text-base text-neutral-600">
              {lang === "en"
                ? "the world's most-talked about brands, destinations and experiences"
                : "las marcas, destinos y experiencias más comentadas del mundo"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats and description section */}
      <section className="py-16 border-t border-neutral-200">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 lg:h-full"
            >
              <Image src="/agency-team-collaboration.jpg" alt="Fanger team" fill className="object-cover" />
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6">
                {lang === "en"
                  ? "Fanger is the premier name in earned-led culture."
                  : "Fanger es el nombre principal en cultura basada en resultados ganados."}
              </h3>
              <div className="space-y-4 mb-8 text-neutral-700">
                <p>We move fast and think ahead.</p>
                <p>We partner with brands to find deeper meaning.</p>
                <p>We're connected in all the right places.</p>
                <p>We don't wait for the brief, we help shape it.</p>
                <p>
                  Backed by strategy, driven by creativity, and powered by people who've led some of the biggest
                  cultural moments in the country.
                </p>
                <p>We set the best example.</p>
                <p>We make brands impossible to forget.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-black mb-1">500+</p>
                  <p className="text-sm text-neutral-600">projects in over five countries</p>
                </div>
                <div>
                  <p className="text-4xl font-black mb-1">100+</p>
                  <p className="text-sm text-neutral-600">venues launched</p>
                </div>
                <div>
                  <p className="text-4xl font-black mb-1">50+</p>
                  <p className="text-sm text-neutral-600">placemaking and design projects</p>
                </div>
                <div>
                  <p className="text-4xl font-black mb-1">20+</p>
                  <p className="text-sm text-neutral-600">years of industry-leading expertise</p>
                </div>
              </div>

              <Link
                href="/what-we-do"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
              >
                What we do →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* We Create / Design / Shape / Amplify sections */}
      {sections.map((section, index) => (
        <section key={section.title} className="py-24 lg:py-32 border-t border-neutral-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left side - sticky */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">0{index + 1}</p>
                <h2 className="mb-6 text-5xl font-black lg:text-6xl">{section.title}</h2>
                <h3 className="mb-6 text-2xl font-bold">{section.subtitle}</h3>
                <p className="mb-8 text-neutral-700">{section.description}</p>
                <Link
                  href="/what-we-do"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:opacity-60 transition-opacity"
                >
                  What we do →
                </Link>
              </motion.div>

              {/* Right side - scrolls */}
              <div className="space-y-12">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative h-96 lg:h-[600px]"
                >
                  <Image src={section.image || "/placeholder.svg"} alt={section.title} fill className="object-cover" />
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {section.categories.map((category, i) => (
                    <div key={category} className="flex items-center gap-4">
                      <span className="text-sm text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-lg font-normal">{category}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
