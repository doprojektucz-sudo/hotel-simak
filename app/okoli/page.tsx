import Hero from "@/components/Hero";
import { attractions, activitiesByCategory } from "@/lib/data/attractions";
import {
  Mountain,
  Bike,
  Fish,
  TreePine,
  Waves,
  CircleDot,
  Footprints,
  Camera,
  Compass,
  MapPin,
} from "lucide-react";

const categoryInfo = {
  nature: {
    title: "Přírodní krásy",
    description: "Objevte jedinečnou přírodu Žďárských vrchů",
    icon: Mountain,
    color: "secondary",
  },
  sport: {
    title: "Sportovní vyžití",
    description: "Aktivní odpočinek v nádherné přírodě",
    icon: Bike,
    color: "primary",
  },
  culture: {
    title: "Kultura a památky",
    description: "Zajímavá místa v okolí",
    icon: Camera,
    color: "secondary",
  },
};

export default function OkoliPage() {
  return (
    <>
      <main>
        <Hero
          subtitle="Okolí & Tipy na výlety"
          title="Objevte krásy Žďárských vrchů"
          description="Nádherná příroda, rybníky, naučné stezky, cyklotrasy a mnoho dalšího. Radostín je ideálním výchozím bodem pro výlety po Vysočině."
          primaryCta={{
            text: "Prohlédnout ubytování",
            href: "/ubytovani",
          }}
        />

        {/* Quick Overview */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Mountain className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Žďárské vrchy
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Waves className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Velké Dářko
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Bike className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Cyklotrasy
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <TreePine className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Rašeliniště
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nature Attractions */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Mountain className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {categoryInfo.nature.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {categoryInfo.nature.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activitiesByCategory.nature.map((attraction) => (
                <div
                  key={attraction.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-secondary-200 to-secondary-400 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-secondary-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {attraction.name}
                      </h3>
                      {attraction.distance && (
                        <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                          {attraction.distance}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {attraction.description}
                    </p>
                    <div className="space-y-2">
                      {attraction.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <Compass className="w-4 h-4 text-secondary-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sports Activities */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Bike className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {categoryInfo.sport.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {categoryInfo.sport.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activitiesByCategory.sport.map((attraction) => (
                <div
                  key={attraction.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <Bike className="w-16 h-16 text-primary-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {attraction.name}
                      </h3>
                      {attraction.distance && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                          {attraction.distance}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {attraction.description}
                    </p>
                    <div className="space-y-2">
                      {attraction.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <Compass className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        {activitiesByCategory.culture.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container-custom">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {categoryInfo.culture.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {categoryInfo.culture.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activitiesByCategory.culture.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-amber-700" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {attraction.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {attraction.description}
                      </p>
                      <div className="space-y-2">
                        {attraction.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <Compass className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Activities Grid */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Co můžete v okolí dělat
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Aktivity pro každého, od relaxace až po adrenalinové sporty
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Waves className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Koupání</h3>
                <p className="text-sm text-gray-600">
                  V čistých rybnících
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Fish className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Rybaření</h3>
                <p className="text-sm text-gray-600">Velké Dářko a okolí</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Bike className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Cyklistika
                </h3>
                <p className="text-sm text-gray-600">Značené cyklotrasy</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Footprints className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Turistika</h3>
                <p className="text-sm text-gray-600">Pěší výlety</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <TreePine className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Houbaření
                </h3>
                <p className="text-sm text-gray-600">Bohaté lesy</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <CircleDot className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Tenis</h3>
                <p className="text-sm text-gray-600">Antukový kurt</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Mountain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Lyžování</h3>
                <p className="text-sm text-gray-600">V zimních měsících</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <Camera className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Fotografování
                </h3>
                <p className="text-sm text-gray-600">Krásná příroda</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Kde nás najdete
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ideální výchozí bod pro objevování Žďárských vrchů
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-21/9 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7!2d15.874650!3d49.654744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM5JzE3LjEiTiAxNcKwNTInMjguNyJF!5e0!3m2!1scs!2scz!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Hotel U Šimáka a okolí"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">
              Připraveni objevovat Vysočinu?
            </h2>
            <p className="text-xl text-secondary-100 mb-8">
              Ubytujte se u nás a vyrazte na nezapomenutelné výlety
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ubytovani"
                className="inline-flex items-center justify-center bg-white text-secondary-700 hover:bg-secondary-50 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Rezervovat ubytování
              </a>
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-secondary-700 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Kontaktujte nás
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}