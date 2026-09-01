import Heading from "../ui/Heading.jsx";
import Paragraph from "../ui/Paragraph.jsx";
import Button from "../ui/Button.jsx";

export default function SummerSale() {
  return (
    <section
      className="flex min-h-[440px] items-center justify-center bg-[url('/images/sale/mobile.jpg')] bg-cover bg-center px-4 py-16 tablet:bg-[url('/images/sale/desktop.jpg')]"
    >
      <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
        <Heading as="h2" variant="sale">
          Big Summer <span className="font-medium">Sale</span>
        </Heading>
        <Paragraph variant="muted" className="text-[#787878]">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </Paragraph>
        <Button variant="ghost">Shop Now</Button>
      </div>
    </section>
  );
}
