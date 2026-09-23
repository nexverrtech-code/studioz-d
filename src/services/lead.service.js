/**
 * Lead data access.
 *
 * The admin UI talks only to this module. Today it resolves from a local mock
 * dataset with an artificial delay (so loading and error states are real, not
 * theoretical). Point the three functions at an HTTP client and the UI is
 * unchanged.
 */

import { mockLeads, LEAD_STATUSES } from '@/data/leads.mock';

/** Simulated latency, so skeletons and spinners are exercised in development. */
const LATENCY_MS = 260;

const delay = (ms = LATENCY_MS) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * In-memory working copy. Status edits made in the demo UI persist for the
 * session, which is what makes the dashboard feel real to review.
 */
let leads = [...mockLeads];

export const fetchLeads = async ({
  status = 'all',
  source = 'all',
  query = '',
  sort = 'newest',
} = {}) => {
  await delay();

  let result = [...leads];

  if (status !== 'all') result = result.filter((lead) => lead.status === status);
  if (source !== 'all') result = result.filter((lead) => lead.source === source);

  const trimmed = query.trim().toLowerCase();
  if (trimmed) {
    result = result.filter((lead) =>
      [lead.id, lead.name, lead.email, lead.service, lead.giftCategory, lead.notes]
        .join(' ')
        .toLowerCase()
        .includes(trimmed)
    );
  }

  switch (sort) {
    case 'oldest':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
    default:
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return { leads: result, total: leads.length, isDemoData: true };
};

export const updateLeadStatus = async (id, status) => {
  await delay(140);
  if (!LEAD_STATUSES.some((entry) => entry.id === status)) {
    throw new Error(`Unknown lead status: ${status}`);
  }
  leads = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  return leads.find((lead) => lead.id === id) ?? null;
};

export const updateLeadNotes = async (id, notes) => {
  await delay(140);
  leads = leads.map((lead) => (lead.id === id ? { ...lead, notes } : lead));
  return leads.find((lead) => lead.id === id) ?? null;
};

/** Status counts for the pipeline summary strip. */
export const fetchLeadStats = async () => {
  await delay(120);
  const counts = Object.fromEntries(LEAD_STATUSES.map((status) => [status.id, 0]));
  for (const lead of leads) {
    if (counts[lead.status] !== undefined) counts[lead.status] += 1;
  }
  return { counts, total: leads.length, isDemoData: true };
};

/** Distinct sources present in the dataset, for the filter dropdown. */
export const fetchLeadSources = () => [...new Set(leads.map((lead) => lead.source))].sort();

export default fetchLeads;
