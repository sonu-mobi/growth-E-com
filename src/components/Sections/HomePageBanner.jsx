import Container from "../Container.jsx";
import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";

export default function HomePageBanner() {
  return (
    <section
      id="home"
      className="bg-[linear-gradient(90.7deg,#211C24_0.64%,#211C24_101%)] laptop:h-[632px]"
    >
      <Container
        padded={false}
        className="flex min-h-[600px] flex-col items-center justify-between gap-8 pt-[88px] tablet-lg:min-h-[632px] tablet-lg:flex-row tablet-lg:pt-0"
      >
        <div className="flex max-w-[430px] flex-col items-center gap-6 text-center tablet-lg:items-start tablet-lg:text-left">
          <Paragraph variant="eyebrow">Pro.Beyond.</Paragraph>
          <Heading as="h1" variant="hero">
            IPhone 14 <span className="font-semibold">Pro</span>
          </Heading>
          <Paragraph variant="heroSub">
            Created to change everything for the better. For everyone
          </Paragraph>
          <Button variant="ghost" className="border-[1px] border" href="/categories">
            Shop Now
          </Button>
        </div>
        <img
          src="/images/hero/iphone-desktop.webp"
          alt="iPhone 14 Pro"
          className="hidden max-h-[632px] w-auto tablet-lg:block"
        />
        <img
          src="/images/hero/iphone-mobile.webp"
          alt="iPhone 14 Pro"
          className="mb-[-8px] max-h-[340px] w-auto tablet-lg:hidden"
        />
      </Container>
    </section>
  );
}
