interface DataGridEmptyStateProps {
  message: string;
}

export function DataGridEmptyState({ message }: DataGridEmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        minHeight: '300px',
        color: '#6b7280',
      }}
    >
      <div
        style={{
          fontSize: '3.5rem',
          marginBottom: '1.25rem',
          opacity: 0.3,
          filter: 'grayscale(100%)',
        }}
      >
        📊
      </div>
      <div
        style={{
          fontSize: '1rem',
          textAlign: 'center',
          color: '#9ca3af',
          fontWeight: 500,
        }}
      >
        {message}
      </div>
    </div>
  );
}

export default DataGridEmptyState;
