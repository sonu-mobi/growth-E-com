import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";

export default function FeaturedBanners() {
  return (
    <section className="grid laptop:grid-cols-2 desktop:grid-cols-4 desktop:grid-rows-[328px_272px]">
      <article className="order-3 flex flex-col items-center gap-4 bg-white px-4 py-10 tablet-lg:flex-row desktop:order-none desktop:col-start-1 desktop:col-end-3 desktop:row-start-1 desktop:px-12 desktop:pl-[0px]! desktop:pt-[0px]!">
        <img src="/images/bento/playstation.webp" alt="Playstation 5" className="h-[200px] object-contain desktop:h-[328px]" />
        <div className="flex flex-col items-center gap-3 text-center tablet-lg:items-start tablet-lg:text-left">
          <Heading as="h2" variant="bentoPs5">
            Playstation <span className="font-medium">5</span>
          </Heading>
          <Paragraph variant="muted">
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
          </Paragraph>
        </div>
      </article>

      <article className="order-1 flex flex-col items-center gap-4 bg-[#EDEDED] px-4 py-10 tablet-lg:flex-row desktop:order-none desktop:col-start-1 desktop:row-start-2 desktop:px-8 desktop:pl-[0px]!">
        <img src="/images/bento/headphone.png" alt="Apple AirPods Max" className="h-[200px] object-contain desktop:h-[272px]" />
        <div className="flex flex-col items-center gap-2 text-center tablet-lg:items-start tablet-lg:text-left">
          <Heading as="h2" variant="bento">
            Apple AirPods <span className="font-medium">Max</span>
          </Heading>
          <Paragraph variant="muted">Computational audio. Listen, it&apos;s powerful</Paragraph>
        </div>
      </article>

      <article className="order-2 flex flex-col items-center gap-4 bg-[#353535] px-4 py-10 tablet-lg:flex-row desktop:order-none desktop:col-start-2 desktop:row-start-2 desktop:px-8 desktop:pl-[0px]!">
        <img src="/images/bento/image 36.png" alt="Apple Vision Pro" className="h-[180px] object-contain desktop:h-[190px]" />
        <div className="flex flex-col items-center gap-2 text-center tablet-lg:items-start tablet-lg:text-left">
          <Heading as="h2" variant="bento" className="text-white">
            Apple Vision <span className="font-medium">Pro</span>
          </Heading>
          <Paragraph variant="muted">An immersive way to experience entertainment</Paragraph>
        </div>
      </article>

      <article className="order-4 flex flex-col items-center gap-6 bg-[#EDEDED] px-4 py-10 tablet-lg:flex-row-reverse desktop:order-none desktop:col-start-3 desktop:col-end-5 desktop:row-start-1 desktop:row-end-3 desktop:justify-between desktop:px-14">
        <img src="/images/bento/MacBook-Pro-14-copy.png" alt="Macbook Air" className="h-[200px] object-contain desktop:h-[502px]" />
        <div className="flex max-w-[360px] flex-col items-center gap-4 text-center tablet-lg:items-start tablet-lg:text-left">
          <Heading as="h2" variant="bentoMac">
            Macbook <span className="font-medium">Air</span>
          </Heading>
          <Paragraph variant="muted">
            The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
          </Paragraph>
          <Button variant="secondary">Shop Now</Button>
        </div>
      </article>
    </section>
  );
}
