import FadeInSection from "./FadeInSection"

export default function Services() {
  const services = [
    { title: "Telemedicine", description: "Remote consultations", icon: null },
    { title: "Diagnostics", description: "Lab tests online", icon: null },
    { title: "Pharmacy", description: "Medicine delivery", icon: null },
  ]

  return (
    <section id="products" className="py-16 bg-white text-center px-6">
      <FadeInSection>
        <h2 className="text-3xl font-bold text-orange-500">Our Services</h2>
      </FadeInSection>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <FadeInSection key={index}>
            <div className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
