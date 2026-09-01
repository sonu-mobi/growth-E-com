import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";
import { POPULAR } from "../../data/home.js";

const COPY =
  "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.";

export default function PopularProducts() {
  return (
    <section className="grid tablet-lg:grid-cols-2 desktop:grid-cols-4">
      {POPULAR.map((item) => (
        <article
          key={item.title}
          className={`flex min-h-[520px] flex-col items-center px-8 py-10 desktop:items-start ${item.bg}`}
        >
          <div className="flex justify-center items-center w-full">
          <img src={item.image} alt={item.title} className="mb-6 h-[240px] w-auto object-contain" />
          </div>
          <Heading as="h3" variant="popular" className={item.dark ? "text-white" : "text-black"}>
            {item.title}
          </Heading>
          <Paragraph variant="muted" className="mt-4 mb-6 max-w-[360px] text-center desktop:text-left">
            {COPY}
          </Paragraph>
          <Button variant={item.dark ? "ghost" : "secondary"} className="mt-auto">
            Shop Now
          </Button>
        </article>
      ))}
    </section>
  );
}
