export type DisplayPropertyProps = {
  sectionTitle: string;
  value: string;
  description?: string;
};

export function DisplayProperty({
  sectionTitle,
  value,
  description,
}: DisplayPropertyProps) {
  return (
    <section>
      <h4>{sectionTitle}</h4>

      <p>{value}</p>

      {description ? <p>{description}</p> : null}
    </section>
  );
}
