// src/app/about/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/page-wrapper"
import { HeartHandshake, Leaf, Gem, Linkedin, Github } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  { name: 'Phindile Sandi', role: 'Founder & CEO', imageUrl: 'https://picsum.photos/seed/phindile/200/200', dataAiHint: "person portrait" },
  { name: 'Morena Mabaso', role: 'Co-Founder', imageUrl: 'https://picsum.photos/seed/morena/200/200', dataAiHint: "person portrait" },
]

const values = [
    {
        icon: <Gem className="h-10 w-10 text-primary" />,
        title: "Quality First",
        description: "We ensure every item is clean, durable, and ready for its next adventure.",
    },
    {
        icon: <HeartHandshake className="h-10 w-10 text-primary" />,
        title: "Community-Focused",
        description: "Connecting parents and building a supportive community is at the heart of what we do.",
    },
    {
        icon: <Leaf className="h-10 w-10 text-primary" />,
        title: "Sustainability",
        description: "By giving clothes a second life, we promote a more sustainable future for our children.",
    }
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* --- Hero Section --- */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">About Tiny Threads</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe that every piece of clothing holds a story, and we're here to help you write the next chapter. Welcome to our community of parents, for parents.
          </p>
        </section>

        {/* --- Our Mission Section --- */}
        <section className="my-16 md:my-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/about-mission/600/600" alt="Happy baby playing" className="object-cover w-full h-full" data-ai-hint="happy baby" />
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Our mission is to make parenting a little easier and a lot more sustainable. We provide a trusted platform for buying and selling gently-used baby clothes, ensuring that quality items find a new home and don't end up in landfills. We're dedicated to building a circular economy for children's fashion, one tiny outfit at a time.
                </p>
                 <Button asChild size="lg">
                    <Link href="/sell">Start Selling</Link>
                </Button>
            </div>
        </section>

        {/* --- Our Values Section --- */}
        <section className="my-16 md:my-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">What We Stand For</h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {values.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {value.icon}
                        <h3 className="text-2xl font-semibold mt-4 mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
        {/* --- Meet the Team Section --- */}
        <section className="my-16 md:my-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4 shadow-md">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
                <div className="flex gap-4 mt-2">
                    <Link href="#"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
                    <Link href="#"><Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageWrapper>
  )
}
