export function DataGridLoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        minHeight: '300px',
        background: 'rgba(255, 255, 255, 0.8)',
        color: '#6b7280',
      }}
    >
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          border: '3px solid rgba(59, 130, 246, 0.1)',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1rem',
        }}
      />
      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#374151',
        }}
      >
        Loading data...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default DataGridLoadingSpinner;
