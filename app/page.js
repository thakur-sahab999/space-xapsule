  import CapsuleComponent from "@/Components/CapsuleComponent";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <section className=" w-full  text-gray-100">
        <div class="container w-full flex flex-col-reverse justify-center  mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div class="flex flex-col justify-start p-6 text-left rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 class="text-5xl font-bold leading-none sm:text-6xl">
              <span class="text-primary-yellow">Elevating Humanity</span>{" "}
              Bridging Earth and the Cosmos with Stellar Ascent
            </h1>
            <p class="mt-6 mb-8 text-lg sm:mb-12">
              In 2020, SpaceX restored the U.S. capability to transport NASA
              astronauts to and from the International Space Station using
              American spacecraft, marking the first time since 2011.
            </p>
            <div class="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                class="hover:scale-105 hover:border border border-primary-yellow hover:border-voilet-400 hover:bg-primary-yellow hover:text-primary-blue  transition-all ease-in-out px-8 py-3 text-lg font-semibold rounded bg-violet-500 text-primary-yellow"
                href="/#"
              >
                Learn More
              </a>
              <a
                rel="noopener noreferrer"
                class="hover:scale-105 hover:border hover:bg-violet-400 hover:text-gray-100 hover:border-gray-100 transition-all ease-in-out px-8 py-3 text-lg font-semibold rounded text-gray-100 border "
                href="/#"
              >
                Contact
              </a>
            </div>
          </div>
          <div class="flex items-center lg:flex-grow justify-center lg:p-6  lg:mt-0 h-80 sm:h-80 lg:h-[560px] xl:h-112 2xl:h-128">
            <Image
              src="/assets/spacex-6SbFGnQTE8s-unsplash.jpg"
              alt="Space Xapsule banner"
              width={1500}
              height={1500}
              className="h-full w-full lg:rounded-md object-fill "
            />
          </div>
        </div>
      </section>
      <CapsuleComponent />
    </main>
  );
}
