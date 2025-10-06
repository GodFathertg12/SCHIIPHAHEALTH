import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Products from "@/components/Products"
import EcoCommitment from "@/components/EcoCommitment"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Products />
      <EcoCommitment />
      <Footer />
    </div>
  )
}
