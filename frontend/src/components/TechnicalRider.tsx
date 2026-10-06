interface RiderNodeProps {
  value: unknown;
}

interface TechnicalRiderProps {
  data: Record<string, unknown>;
}

function RiderNode({ value }: RiderNodeProps) {
  if (typeof value !== "object" || value === null) {
    return <span>{String(value)}</span>;
  }

  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((m, index) => (
          <li key={index}>
            <RiderNode value={m} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {Object.entries(value).map(([key, m]) => (
        <details
          key={key}
          onToggle={(e) => {
            const el = e.currentTarget;
            if (!el.open) {
              el.querySelectorAll("details[open]").forEach((child) => {
                child.removeAttribute("open");
              });
              
            }
          }}
        >
          <summary>{key}</summary>
          <RiderNode value={m} />
        </details>
      ))}
    </>
  );
}

function TechnicalRider({ data }: TechnicalRiderProps) {
  return (
    <details>
      <summary>Rider Técnico</summary>
      <RiderNode value={data} />
    </details>
  );
}

export default TechnicalRider;
