import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  icon: ReactNode;
  iconBg?: string;
  valueColor?: string;
  subtitle?: string;
}

export function MetricCard({ title, value, unit, trend, trendLabel, icon, iconBg = '#DEEBFF', valueColor, subtitle }: MetricCardProps) {
  const trendPositive = trend !== undefined && trend > 0;
  const trendNeutral = trend === undefined || trend === 0;

  return (
    <div className="rounded p-4 flex flex-col gap-3" style={{ background: '#fff', border: '1px solid #DFE1E6', boxShadow: '0 1px 2px rgba(9,30,66,0.06)' }}>
      <div className="flex items-center justify-between">
        <span style={{ color: '#5E6C84', fontSize: '12px', fontWeight: 500 }}>{title}</span>
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>
      <div>
        <div className="flex items-end gap-1">
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '26px', fontWeight: 700, lineHeight: 1, color: valueColor || '#172B4D' }}>{value}</span>
          {unit && <span style={{ color: '#5E6C84', fontSize: '13px', marginBottom: '3px' }}>{unit}</span>}
        </div>
        {subtitle && <div style={{ color: '#5E6C84', fontSize: '11px', marginTop: '4px' }}>{subtitle}</div>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1" style={{ color: trendNeutral ? '#5E6C84' : trendPositive ? '#36B37E' : '#FF5630', fontSize: '12px' }}>
          {trendNeutral ? <Minus size={12} /> : trendPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span style={{ fontWeight: 500 }}>{Math.abs(trend)}%</span>
          {trendLabel && <span style={{ color: '#5E6C84', marginLeft: '2px' }}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
