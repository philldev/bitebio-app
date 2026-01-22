export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          About BiteBio
        </h1>
        <p className="text-xl text-muted-foreground">
          Empowering cafes and restaurants to tell their story online.
        </p>
        
        <div className="prose prose-orange dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            BiteBio was born from a simple observation: food businesses need more than just a static link. 
            They need a way to express their visual identity, showcase their menu, and guide customers 
            to the right actions&mdash;whether that&apos;s booking a table, ordering delivery, or following on social media.
          </p>
          <p>
            Inspired by the clean, modular design of modern &quot;link-in-bio&quot; tools, we built BiteBio 
            specifically for the hospitality industry. We believe that your digital presence should be 
            as inviting as your physical space.
          </p>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Mission</h2>
          <p>
            To provide a simple, beautiful, and effective digital home for every cafe, restaurant, 
            and food truck. We strip away the complexity of website building and give you tools that 
            just work.
          </p>
        </div>
      </div>
    </div>
  );
}
