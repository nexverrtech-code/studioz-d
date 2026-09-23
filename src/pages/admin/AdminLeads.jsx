import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, RefreshCw, ChevronDown } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import {
  fetchLeads,
  fetchLeadStats,
  fetchLeadSources,
  updateLeadStatus,
} from '@/services/lead.service';
import { LEAD_STATUSES, getStatusMeta } from '@/data/leads.mock';
import { formatDate, formatRelative, formatNumber } from '@/utils/format';
import { ErrorState } from '@/components/common/States';
import { cn } from '@/utils/cn';

const STATUS_TONE = {
  info: 'border-champagne-500/40 text-champagne-400',
  neutral: 'border-ivory-100/20 text-ivory-200',
  accent: 'border-terracotta-400/50 text-terracotta-300',
  success: 'border-olive-300/50 text-olive-300',
  muted: 'border-ivory-100/10 text-ink-400',
};

const SORTS = [
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'name', label: 'Name' },
];

/** Inline status editor. Used by both the table and the mobile card. */
const StatusSelect = ({ lead, onChange }) => {
  const meta = getStatusMeta(lead.status);

  return (
    <div className="relative inline-flex">
      <select
        value={lead.status}
        onChange={(event) => onChange(lead.id, event.target.value)}
        aria-label={`Status for lead ${lead.id}`}
        className={cn(
          'min-h-[34px] cursor-pointer appearance-none border bg-transparent py-1 pl-2.5 pr-7 text-[0.66rem] font-semibold uppercase tracking-widest outline-none transition-colors focus-visible:border-champagne-500',
          STATUS_TONE[meta.tone] ?? STATUS_TONE.neutral
        )}
      >
        {LEAD_STATUSES.map((status) => (
          <option key={status.id} value={status.id} className="bg-ink-900 text-ivory-100">
            {status.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  );
};

export const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('all');
  const [source, setSource] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sources = useMemo(() => fetchLeadSources(), []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [result, statResult] = await Promise.all([
        fetchLeads({ status, source, query, sort }),
        fetchLeadStats(),
      ]);
      setLeads(result.leads);
      setStats(statResult);
    } catch (caught) {
      setError(caught.message ?? 'Leads could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, [status, source, query, sort]);

  // Debounced so typing in the search box does not fire a request per keypress.
  useEffect(() => {
    const timer = setTimeout(load, query ? 260 : 0);
    return () => clearTimeout(timer);
  }, [load, query]);

  const onStatusChange = async (id, nextStatus) => {
    // Optimistic — the demo service always succeeds, and a reload follows.
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead))
    );
    await updateLeadStatus(id, nextStatus);
    const statResult = await fetchLeadStats();
    setStats(statResult);
  };

  return (
    <>
      <Seo title="Leads — Studio Console" description="Internal lead management." path="/admin/leads" noindex />

      <div className="flex flex-col gap-6 px-gutter py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[0.62rem] font-semibold uppercase tracking-widest-xl text-champagne-500">
              Pipeline
            </p>
            <h1 className="font-display text-fluid-2xl text-ivory-50">Leads</h1>
          </div>

          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2 border border-ivory-100/15 px-4 text-[0.68rem] font-semibold uppercase tracking-widest text-ink-300 transition-colors hover:border-ivory-100/40 hover:text-ivory-100"
          >
            <RefreshCw
              className={cn('h-3.5 w-3.5', loading && 'animate-spin')}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Refresh
          </button>
        </header>

        {/* Pipeline summary — a horizontal rail, never a source of page overflow */}
        {stats && (
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setStatus('all')}
              aria-pressed={status === 'all'}
              className={cn(
                'flex min-w-[7rem] shrink-0 flex-col gap-1 border p-3 text-left transition-colors',
                status === 'all'
                  ? 'border-champagne-500 bg-champagne-500/10'
                  : 'border-ivory-100/10 hover:border-ivory-100/30'
              )}
            >
              <span className="text-[0.6rem] uppercase tracking-widest text-ink-300">All</span>
              <span className="font-display text-fluid-lg tabular-nums text-ivory-50">
                {formatNumber(stats.total)}
              </span>
            </button>

            {LEAD_STATUSES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setStatus(status === entry.id ? 'all' : entry.id)}
                aria-pressed={status === entry.id}
                className={cn(
                  'flex min-w-[7rem] shrink-0 flex-col gap-1 border p-3 text-left transition-colors',
                  status === entry.id
                    ? 'border-champagne-500 bg-champagne-500/10'
                    : 'border-ivory-100/10 hover:border-ivory-100/30'
                )}
              >
                <span className="truncate text-[0.6rem] uppercase tracking-widest text-ink-300">
                  {entry.label}
                </span>
                <span className="font-display text-fluid-lg tabular-nums text-ivory-50">
                  {formatNumber(stats.counts[entry.id] ?? 0)}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-3 border-y border-ivory-100/10 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 lg:max-w-sm lg:flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <label htmlFor="lead-search" className="sr-only">
              Search leads
            </label>
            <input
              id="lead-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, service…"
              className="min-h-[42px] w-full border border-ivory-100/15 bg-transparent py-2 pl-10 pr-4 text-fluid-sm text-ivory-100 outline-none transition-colors placeholder:text-ink-400 focus:border-champagne-500"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex shrink-0 items-center gap-2">
              <label htmlFor="lead-source" className="text-[0.62rem] uppercase tracking-widest text-ink-400">
                Source
              </label>
              <select
                id="lead-source"
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className="min-h-[38px] border border-ivory-100/15 bg-transparent px-3 text-[0.72rem] text-ivory-100 outline-none focus:border-champagne-500"
              >
                <option value="all" className="bg-ink-900">
                  All
                </option>
                {sources.map((entry) => (
                  <option key={entry} value={entry} className="bg-ink-900">
                    {entry}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[0.62rem] uppercase tracking-widest text-ink-400">Sort</span>
              {SORTS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSort(entry.id)}
                  aria-pressed={sort === entry.id}
                  className={cn(
                    'min-h-[38px] whitespace-nowrap border px-3 text-[0.66rem] font-semibold uppercase tracking-widest transition-colors',
                    sort === entry.id
                      ? 'border-champagne-500 text-champagne-400'
                      : 'border-ivory-100/15 text-ink-300 hover:border-ivory-100/40 hover:text-ivory-100'
                  )}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[0.72rem] tabular-nums text-ink-300" aria-live="polite">
          {loading ? 'Loading…' : `${leads.length} ${leads.length === 1 ? 'lead' : 'leads'}`}
        </p>

        {error ? (
          <ErrorState title="Leads could not be loaded." body={error} onRetry={load} />
        ) : (
          <>
            {/* ------------------------------------------- Desktop table
                The table scrolls inside its own wrapper, so a wide row can
                never widen the page. */}
            <div className="hidden overflow-x-auto border border-ivory-100/10 lg:block">
              <table className="w-full min-w-[68rem] border-collapse text-left">
                <caption className="sr-only">
                  Demo leads with contact details, interest, source and status
                </caption>
                <thead>
                  <tr className="border-b border-ivory-100/10 bg-ivory-100/[0.03]">
                    {['Lead', 'Contact', 'Interest', 'Event date', 'Budget', 'Source', 'Attribution', 'Status', 'Date'].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="whitespace-nowrap px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-widest text-ink-300"
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-ivory-100/[0.07] align-top transition-colors last:border-b-0 hover:bg-ivory-100/[0.03]"
                    >
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-fluid-sm text-ivory-100">{lead.name}</span>
                          <span className="text-[0.64rem] tabular-nums text-ink-400">{lead.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="break-anywhere text-[0.74rem] text-ivory-200">
                            {lead.email}
                          </span>
                          <span className="text-[0.7rem] tabular-nums text-ink-400">{lead.phone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[0.74rem] text-ivory-200">
                            {lead.service || '—'}
                          </span>
                          {lead.giftCategory && (
                            <span className="text-[0.68rem] text-champagne-500">
                              {lead.giftCategory}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-[0.74rem] text-ivory-200">
                        {lead.eventDate ? formatDate(lead.eventDate, { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-[0.74rem] text-ink-300">
                        {lead.budget}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-[0.74rem] text-ivory-200">
                        {lead.source}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="break-anywhere text-[0.68rem] text-ink-300">
                            {lead.landingPage}
                          </span>
                          <span className="text-[0.64rem] text-ink-400">
                            {[lead.utmSource, lead.utmCampaign].filter(Boolean).join(' · ') || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusSelect lead={lead} onChange={onStatusChange} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[0.74rem] text-ivory-200">
                            {formatDate(lead.createdAt, { day: 'numeric', month: 'short' })}
                          </span>
                          <span className="text-[0.64rem] text-ink-400">
                            {formatRelative(lead.createdAt)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ----------------------------------------------- Mobile cards */}
            <ul className="flex flex-col gap-3 lg:hidden">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex min-w-0 flex-col gap-3 border border-ivory-100/10 bg-[color:var(--sd-surface-raised)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-fluid-base text-ivory-100">{lead.name}</span>
                      <span className="text-[0.64rem] tabular-nums text-ink-400">{lead.id}</span>
                    </div>
                    <StatusSelect lead={lead} onChange={onStatusChange} />
                  </div>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {[
                      { label: 'Email', value: lead.email, wide: true },
                      { label: 'Phone', value: lead.phone },
                      { label: 'Interest', value: lead.service || lead.giftCategory || '—' },
                      {
                        label: 'Event date',
                        value: lead.eventDate
                          ? formatDate(lead.eventDate, { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—',
                      },
                      { label: 'Budget', value: lead.budget },
                      { label: 'Source', value: lead.source },
                      { label: 'Landing', value: lead.landingPage, wide: true },
                      {
                        label: 'UTM',
                        value: [lead.utmSource, lead.utmCampaign].filter(Boolean).join(' · ') || '—',
                        wide: true,
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className={cn('flex min-w-0 flex-col gap-0.5', row.wide && 'col-span-2')}
                      >
                        <dt className="text-[0.58rem] uppercase tracking-widest text-ink-400">
                          {row.label}
                        </dt>
                        <dd className="break-anywhere text-[0.76rem] text-ivory-200">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {lead.notes && (
                    <p className="border-t border-ivory-100/10 pt-3 text-[0.74rem] leading-relaxed text-ink-300">
                      {lead.notes}
                    </p>
                  )}

                  <p className="text-[0.64rem] text-ink-400">
                    {formatDate(lead.createdAt)} · {formatRelative(lead.createdAt)}
                  </p>
                </li>
              ))}
            </ul>

            {!loading && leads.length === 0 && (
              <div className="border border-dashed border-ivory-100/15 px-6 py-14 text-center">
                <p className="font-display text-fluid-lg text-ivory-100">No leads match that.</p>
                <p className="mt-2 text-[0.76rem] text-ink-300">
                  Try clearing the search or the filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminLeads;
