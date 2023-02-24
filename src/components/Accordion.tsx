export function AccordionMenu({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        {children}
      </div>
    </section>
  );
}

export function AccordionItem({
  title,
  children,
}: {
  children: React.ReactNode;
  title: string;
}): JSX.Element {
  return (
    <details className="w-full border rounded-lg" open>
      <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
        {title}
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
