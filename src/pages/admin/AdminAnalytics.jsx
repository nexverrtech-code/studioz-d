import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { fetchDashboardData } from '@/services/analytics.service';
import { formatNumber, formatPercent, formatDelta, formatDuration } from '@/utils/format';
import { cn } from '@/utils/cn';

/** Brand-consistent chart palette. Distinguishable without relying on hue alone. */
const CHART_COLORS = ['#C9A876', '#8E9070', '#B4704F', '#9A8F86', '#C9A4A4', '#554C46'];

const Panel = ({ title, subtitle, children, className }) => (
  <section
    className={cn(
      'flex min-w-0 flex-col gap-5 border border-ivory-100/10 bg-[color:var(--sd-surface-raised)] p-5 sm:p-6',
      className
    )}
  >
    <header className="flex min-w-0 flex-col gap-1">
      <h2 className="font-display text-fluid-lg text-ivory-100">{title}</h2>
      {subtitle && <p className="text-[0.72rem] text-ink-300">{subtitle}</p>}
    </header>
    {children}
  </section>
);

/** Recharts tooltips need explicit styling to match a dark surface. */
const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#0B0908',
    border: '1px solid rgba(248,244,236,0.15)',
    borderRadius: 2,
    fontSize: '0.75rem',
    color: '#F8F4EC',
  },
  labelStyle: { color: '#9A8F86', marginBottom: 4 },
  itemStyle: { color: '#F8F4EC' },
  cursor: { fill: 'rgba(248,244,236,0.05)' },
};

const axisProps = {
  stroke: 'rgba(248,244,236,0.25)',
  tick: { fill: '#9A8F86', fontSize: 11 },
  tickLine: false,
  axisLine: false,
};

export const AdminAnalytics = () => {
  const [range, setRange] = useState('30d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchDashboardData(range).then((result) => {
      // Guard against a late response from a superseded range.
      if (!active) return;
      setData(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [range]);

  return (
    <>
      <Seo title="Analytics — Studio Console" description="Internal analytics." path="/admin/analytics" noindex />

      <div className="flex flex-col gap-6 px-gutter py-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
              Overview
            </p>
            <h1 className="font-display text-fluid-2xl text-ivory-50">Analytics</h1>
          </div>

          <div
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Date range"
          >
            {(data?.ranges ?? []).map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setRange(entry.id)}
                aria-pressed={range === entry.id}
                className={cn(
                  'shrink-0 whitespace-nowrap border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-widest transition-colors',
                  range === entry.id
                    ? 'border-champagne-500 bg-champagne-500 text-ink-950'
                    : 'border-ivory-100/15 text-ink-300 hover:border-ivory-100/40 hover:text-ivory-100'
                )}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </header>

        {loading || !data ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse border border-ivory-100/10 bg-ivory-100/5"
                aria-hidden="true"
              />
            ))}
            <p className="sr-only" role="status">
              Loading analytics
            </p>
          </div>
        ) : (
          <>
            {/* Metric tiles */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-7">
              {data.metrics.map((metric) => {
                const positive = metric.delta >= 0;
                const Icon = positive ? TrendingUp : TrendingDown;
                return (
                  <div
                    key={metric.id}
                    className="flex min-w-0 flex-col gap-2 border border-ivory-100/10 bg-[color:var(--sd-surface-raised)] p-4"
                  >
                    <span className="truncate text-[0.6rem] font-semibold uppercase tracking-widest text-ink-300">
                      {metric.label}
                    </span>
                    <span className="font-display text-fluid-xl tabular-nums text-ivory-50">
                      {metric.format === 'percent'
                        ? formatPercent(metric.value)
                        : formatNumber(metric.value)}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 text-[0.66rem] tabular-nums',
                        positive ? 'text-olive-300' : 'text-terracotta-300'
                      )}
                    >
                      <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                      {formatDelta(metric.delta)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Visitors over time */}
            <Panel title="Visitors over time" subtitle="Daily visitors and sessions">
              <div className="h-64 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.series} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A876" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#C9A876" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(248,244,236,0.07)" vertical={false} />
                    <XAxis dataKey="label" {...axisProps} minTickGap={24} />
                    <YAxis {...axisProps} width={48} />
                    <Tooltip {...tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      name="Visitors"
                      stroke="#C9A876"
                      strokeWidth={2}
                      fill="url(#visitorsFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      name="Sessions"
                      stroke="#8E9070"
                      strokeWidth={1.5}
                      fill="transparent"
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            {/* Sources + devices */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Traffic source" subtitle="Where visitors arrive from">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.trafficSources}
                      layout="vertical"
                      margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                    >
                      <CartesianGrid stroke="rgba(248,244,236,0.07)" horizontal={false} />
                      <XAxis type="number" {...axisProps} />
                      <YAxis
                        type="category"
                        dataKey="source"
                        {...axisProps}
                        width={104}
                        tick={{ fill: '#9A8F86', fontSize: 10 }}
                      />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="visitors" name="Visitors" radius={[0, 2, 2, 0]}>
                        {data.trafficSources.map((entry, index) => (
                          <Cell key={entry.source} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <Panel title="Device distribution" subtitle="Sessions by device type">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="h-52 w-full sm:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.deviceDistribution}
                          dataKey="sessions"
                          nameKey="device"
                          innerRadius="55%"
                          outerRadius="85%"
                          paddingAngle={2}
                          stroke="none"
                        >
                          {data.deviceDistribution.map((entry, index) => (
                            <Cell key={entry.device} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip {...tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <ul className="flex w-full flex-col gap-3 sm:w-1/2">
                    {data.deviceDistribution.map((entry, index) => (
                      <li key={entry.device} className="flex items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0"
                            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                            aria-hidden="true"
                          />
                          <span className="truncate text-fluid-sm text-ivory-200">
                            {entry.device}
                          </span>
                        </span>
                        <span className="shrink-0 text-[0.72rem] tabular-nums text-ink-300">
                          {formatPercent(entry.share)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </div>

            {/* Top pages + conversions */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Top pages" subtitle="Views and average time on page">
                <ul className="flex flex-col">
                  {data.topPages.map((page) => (
                    <li
                      key={page.path}
                      className="flex items-center justify-between gap-4 border-b border-ivory-100/10 py-3 last:border-b-0"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-fluid-sm text-ivory-100">{page.title}</span>
                        <span className="truncate text-[0.66rem] text-ink-400">{page.path}</span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end">
                        <span className="text-fluid-sm tabular-nums text-ivory-100">
                          {formatNumber(page.views)}
                        </span>
                        <span className="text-[0.66rem] tabular-nums text-ink-400">
                          {formatDuration(page.avgSeconds)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="Conversion events" subtitle="Tracked actions in this period">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.conversionEvents}
                      margin={{ top: 4, right: 8, left: -18, bottom: 40 }}
                    >
                      <CartesianGrid stroke="rgba(248,244,236,0.07)" vertical={false} />
                      <XAxis
                        dataKey="label"
                        {...axisProps}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                        height={60}
                        tick={{ fill: '#9A8F86', fontSize: 10 }}
                      />
                      <YAxis {...axisProps} width={48} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="count" name="Events" fill="#C9A876" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            {/* Works + gift categories */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Top works" subtitle="Most-viewed projects">
                <ul className="flex flex-col">
                  {data.topWorks.map((work) => (
                    <li
                      key={work.title}
                      className="flex items-center justify-between gap-4 border-b border-ivory-100/10 py-3 last:border-b-0"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-fluid-sm text-ivory-100">{work.title}</span>
                        <span className="text-[0.66rem] uppercase tracking-widest text-champagne-500">
                          {work.category}
                        </span>
                      </span>
                      <span className="shrink-0 text-fluid-sm tabular-nums text-ivory-100">
                        {formatNumber(work.views)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="Top gift categories" subtitle="Views and resulting enquiries">
                <ul className="flex flex-col">
                  {data.topGiftCategories.map((entry) => (
                    <li
                      key={entry.category}
                      className="flex items-center justify-between gap-4 border-b border-ivory-100/10 py-3 last:border-b-0"
                    >
                      <span className="min-w-0 truncate text-fluid-sm text-ivory-100">
                        {entry.category}
                      </span>
                      <span className="flex shrink-0 items-center gap-4">
                        <span className="text-fluid-sm tabular-nums text-ivory-100">
                          {formatNumber(entry.views)}
                        </span>
                        <span className="min-w-[3.5rem] text-right text-[0.7rem] tabular-nums text-champagne-500">
                          {entry.enquiries} enq.
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminAnalytics;
