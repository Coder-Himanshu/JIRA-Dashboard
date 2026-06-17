interface LozengeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'blue' | 'purple' | 'cyan' | 'default' | 'inprogress';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, { bg: string; color: string }> = {
  success: { bg: '#E3FCEF', color: '#006644' },
  warning: { bg: '#FFFAE6', color: '#172B4D' },
  danger: { bg: '#FFEBE6', color: '#BF2600' },
  blue: { bg: '#DEEBFF', color: '#0747A6' },
  purple: { bg: '#EAE6FF', color: '#403294' },
  cyan: { bg: '#E6FCFF', color: '#006680' },
  inprogress: { bg: '#DEEBFF', color: '#0052CC' },
  default: { bg: '#F4F5F7', color: '#5E6C84' },
};

export function JiraLozenge({ label, variant = 'default', size = 'sm' }: LozengeProps) {
  const style = variantStyles[variant] || variantStyles.default;
  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 700,
        padding: size === 'sm' ? '2px 6px' : '3px 8px',
        borderRadius: '3px',
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        lineHeight: 1.4,
      }}
    >
      {label}
    </span>
  );
}

export function healthToVariant(health: string): LozengeProps['variant'] {
  switch (health) {
    case 'On Track': case 'Healthy': return 'success';
    case 'At Risk': case 'Watch': return 'warning';
    case 'Delayed': case 'Blocked': return 'danger';
    case 'Completed': return 'cyan';
    case 'In Progress': return 'inprogress';
    default: return 'default';
  }
}
