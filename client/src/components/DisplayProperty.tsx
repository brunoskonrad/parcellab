export type DisplayPropertyProps = {
  sectionTitle: string;
  value: string;
  description?: string;
  className?: string;
};

export function DisplayProperty({
  sectionTitle,
  value,
  description,
  className,
}: DisplayPropertyProps) {
  return (
    <section className={`flex-auto ${className}`}>
      <h4 className="text-gray-600 text-sm">{sectionTitle}</h4>

      <p className="text-gray-900 font-semibold">{value}</p>

      {description ? <p>{description}</p> : null}
    </section>
  );
}
