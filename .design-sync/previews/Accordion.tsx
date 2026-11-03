import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "buzzards-soft-ui";

const FAQ = [
  {
    value: "duration",
    question: "Ile to trwa?",
    answer:
      "Realizacja pakietu Basic zajmuje zwykle od kilku dni do około tygodnia. Full to około jeden do dwóch tygodni, a większe wdrożenia ustalamy osobno. Szacowany czas realizacji podaję na pierwszym spotkaniu.",
  },
  {
    value: "selfEdit",
    question: "A co z późniejszymi zmianami na stronie?",
    answer:
      "W trakcie pracy nad stroną masz wliczone rundy dopracowania. Po publikacji treści — teksty i zdjęcia — aktualizujesz samodzielnie w panelu, który dostajesz w cenie każdej strony.",
  },
  {
    value: "security",
    question: "Czy moja strona jest bezpieczna?",
    answer:
      "Tak. Strona działa przez szyfrowane połączenie HTTPS, więc dane z formularza i ruch odwiedzających są chronione. Hosting opiera się na infrastrukturze Google.",
  },
  {
    value: "gdpr",
    question: "Czy strona jest zgodna z RODO?",
    answer:
      "Tak. W każdej stronie dostajesz baner zgód na cookies oraz politykę prywatności dopasowaną do danych, które faktycznie zbierasz.",
  },
];

const TRIGGER = "px-1 py-4 font-heading text-base font-medium text-foreground hover:no-underline";
const CONTENT = "px-1 text-sm leading-relaxed text-muted-foreground";

export function OfferFaq() {
  return (
    <div className="p-6" style={{ width: 540 }}>
      <h2 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground">
        Najczęstsze pytania
      </h2>
      <Accordion defaultValue={["duration"]} className="mt-6">
        {FAQ.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className={TRIGGER}>{item.question}</AccordionTrigger>
            <AccordionContent keepMounted className={CONTENT}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function Collapsed() {
  return (
    <div className="p-6" style={{ width: 540 }}>
      <Accordion>
        {FAQ.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className={TRIGGER}>{item.question}</AccordionTrigger>
            <AccordionContent className={CONTENT}>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function MultipleOpen() {
  return (
    <div className="p-6" style={{ width: 540 }}>
      <Accordion multiple defaultValue={["security", "gdpr"]}>
        {FAQ.slice(2).map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className={TRIGGER}>{item.question}</AccordionTrigger>
            <AccordionContent className={CONTENT}>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function DefaultStyling() {
  return (
    <div className="p-6" style={{ width: 540 }}>
      <Accordion defaultValue={["duration"]}>
        {FAQ.slice(0, 2).map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="disabled" disabled>
          <AccordionTrigger>Pakiet sklepowy (wkrótce)</AccordionTrigger>
          <AccordionContent>Sklep internetowy wyceniam indywidualnie.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
